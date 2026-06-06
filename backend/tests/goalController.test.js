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

  it('should auto close past monthly goals and update actualAmount and status', async () => {
    // Mock the current Date to be "2026-06-15"
    jest.useFakeTimers().setSystemTime(new Date('2026-06-15T00:00:00Z'));
    
    // Simulate a past goal (2026-05) that is ongoing
    const mockPastGoal = {
      _id: 'goal-1',
      monthKey: '2026-05',
      status: 'ongoing',
      type: 'monthly',
      targetAmount: 1000,
      actualAmount: 0,
      save: jest.fn().mockResolvedValue(true)
    };
    
    // Simulate a current goal (2026-06) that is ongoing
    const mockCurrentGoal = {
      _id: 'goal-2',
      monthKey: '2026-06',
      status: 'ongoing',
      type: 'monthly',
      targetAmount: 500,
      actualAmount: 0,
      save: jest.fn().mockResolvedValue(true)
    };

    Goal.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([mockCurrentGoal, mockPastGoal])
    });

    // Simulate transactions in 2026-05 (Income: 2000, Expense: 500 -> Actual: 1500)
    Transaction.find.mockResolvedValue([
      { amount: 2000, isIncome: true },
      { amount: 500, isIncome: false }
    ]);

    await getGoals(mockReq, mockRes);

    // Goal.find is called twice (initial + after update)
    expect(Goal.find).toHaveBeenCalledTimes(2);
    
    // Check if Transaction.find was called for the past month (May 2026)
    expect(Transaction.find).toHaveBeenCalledTimes(1);
    
    // Check if past goal was updated
    expect(mockPastGoal.save).toHaveBeenCalled();
    expect(mockPastGoal.actualAmount).toBe(1500); // 2000 - 500
    expect(mockPastGoal.status).toBe('success'); // 1500 >= 1000

    // Check if current goal was NOT updated
    expect(mockCurrentGoal.save).not.toHaveBeenCalled();
    
    jest.useRealTimers();
  });

  it('should mark past goal as failed if actualAmount < targetAmount', async () => {
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

    Goal.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([mockPastGoal])
    });

    // Simulate transactions: Income 500, Expense 100 -> Actual: 400 < 1000
    Transaction.find.mockResolvedValue([
      { amount: 500, isIncome: true },
      { amount: 100, isIncome: false }
    ]);

    await getGoals(mockReq, mockRes);
    
    expect(mockPastGoal.save).toHaveBeenCalled();
    expect(mockPastGoal.actualAmount).toBe(400); 
    expect(mockPastGoal.status).toBe('failed'); // 400 < 1000
    
    jest.useRealTimers();
  });
});
