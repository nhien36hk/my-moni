const { getGoals } = require('../controllers/goalController');
const Goal = require('../models/Goal');
const Transaction = require('../models/Transaction');

jest.mock('../models/Goal');
jest.mock('../models/Transaction');

describe('getGoals Auto-Close Logic', () => {
  let mockReq;
  let mockRes;
  
  beforeEach(() => {
    mockReq = {
      query: { budgetId: 'test-budget-id' }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    jest.clearAllMocks();
  });

  it('should auto close past monthly goals and calculate actualAmount based on carry over', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-06-15T00:00:00Z'));
    
    const mockPastGoal = {
      _id: 'goal-1',
      monthKey: '2026-05',
      status: 'ongoing',
      type: 'monthly',
      targetAmount: 1000,
      actualAmount: 0,
      save: jest.fn().mockResolvedValue(true)
    };

    const mockCurrentGoal = {
      _id: 'goal-2',
      monthKey: '2026-06',
      status: 'ongoing',
      type: 'monthly',
      targetAmount: 500,
      actualAmount: 0,
      save: jest.fn().mockResolvedValue(true)
    };

    Goal.find
      .mockReturnValueOnce({ sort: jest.fn().mockResolvedValue([mockCurrentGoal, mockPastGoal]) })
      .mockReturnValueOnce([]) // For prevGoals (no goals before May)
      .mockReturnValueOnce({ sort: jest.fn().mockResolvedValue([mockCurrentGoal, mockPastGoal]) }); // After update

    // Simulate transactions UP TO May 2026 (Income: 2000, Expense: 500 -> Balance: 1500)
    Transaction.find.mockResolvedValue([
      { amount: 2000, isIncome: true },
      { amount: 500, isIncome: false }
    ]);

    await getGoals(mockReq, mockRes);

    expect(mockPastGoal.save).toHaveBeenCalled();
    // Balance = 1500, Target = 1000 => actualAmount = 1000 (Target reached)
    expect(mockPastGoal.actualAmount).toBe(1000); 
    expect(mockPastGoal.status).toBe('success'); 

    expect(mockCurrentGoal.save).not.toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('should mark past goal as failed if availableBalance < targetAmount', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-06-15T00:00:00Z'));
    
    const mockPastGoal = {
      _id: 'goal-1',
      monthKey: '2026-05',
      status: 'ongoing',
      type: 'monthly',
      targetAmount: 1000,
      actualAmount: 0,
      save: jest.fn().mockResolvedValue(true)
    };

    Goal.find
      .mockReturnValueOnce({ sort: jest.fn().mockResolvedValue([mockPastGoal]) })
      .mockReturnValueOnce([]); // prevGoals

    // Simulate transactions: Income 500, Expense 100 -> Balance: 400 < 1000
    Transaction.find.mockResolvedValue([
      { amount: 500, isIncome: true },
      { amount: 100, isIncome: false }
    ]);

    await getGoals(mockReq, mockRes);
    
    expect(mockPastGoal.save).toHaveBeenCalled();
    // Balance = 400 => actualAmount = 400
    expect(mockPastGoal.actualAmount).toBe(400); 
    expect(mockPastGoal.status).toBe('failed'); 
    
    jest.useRealTimers();
  });
});
