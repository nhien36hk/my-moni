/**
 * Định dạng số tiền sang chuẩn Việt Nam (VND)
 */
export const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
};
