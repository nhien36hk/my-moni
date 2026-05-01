import React from 'react';

export default function TransactionChart() {
  // Giả lập dữ liệu chi tiêu cho 30 ngày trong tháng
  const daysInMonth = 30;
  const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    amount: Math.floor(Math.random() * 1000000) + 200000, // Random từ 200k - 1.2tr
    isHigh: false
  }));

  // Tìm ngày tiêu nhiều nhất để highlight
  const maxAmount = Math.max(...dailyData.map(d => d.amount));
  dailyData.forEach(d => { if(d.amount === maxAmount) d.isHigh = true; });

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h3 className="text-sm font-bold text-white">Chi tiêu theo ngày</h3>
          <p className="text-[10px] text-[var(--text-secondary)]">Tháng 05/2026</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2 py-1 rounded-md">
            Max: {Math.floor(maxAmount / 1000)}k
          </span>
        </div>
      </div>

      {/* Container cuộn ngang */}
      <div className="overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
        <div className="flex items-end gap-1.5 min-w-[600px] h-32 border-b border-white/5 pb-2">
          {dailyData.map((data) => (
            <div key={data.day} className="flex-1 flex flex-col items-center gap-2 group">
              {/* Tooltip nhỏ khi hover */}
              <div className="relative w-full flex justify-center">
                 <div 
                  className={`w-3 rounded-t-sm transition-all duration-300 relative
                    ${data.isHigh 
                      ? 'bg-gradient-to-t from-[var(--accent-secondary)] to-[var(--accent-primary)] opacity-100 shadow-[0_0_15px_rgba(244,114,182,0.4)]' 
                      : 'bg-white/10 group-hover:bg-white/20'}`}
                  style={{ height: `${(data.amount / maxAmount) * 100}%` }}
                >
                  {/* Ngày trên đầu cột nếu là ngày max */}
                  {data.isHigh && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[var(--accent-primary)] whitespace-nowrap">
                       Peak!
                    </div>
                  )}
                </div>
              </div>
              <span className={`text-[9px] font-medium ${data.isHigh ? 'text-white' : 'text-white/20'}`}>
                {data.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white/10"></div>
          <span className="text-[10px] text-[var(--text-secondary)]">Bình thường</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]"></div>
          <span className="text-[10px] text-[var(--text-secondary)]">Ngày tiêu nhiều</span>
        </div>
      </div>
    </div>
  );
}
