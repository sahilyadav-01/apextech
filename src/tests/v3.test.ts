// Apex Events V3 Logic Verification Matrix

export function calculateGST(subtotal: number): { subtotal: number; gstAmount: number; totalAmount: number } {
  const gstAmount = Math.round(subtotal * 0.18);
  return {
    subtotal,
    gstAmount,
    totalAmount: subtotal + gstAmount
  };
}

export function calculateRemainingBalance(totalAmount: number, advancePaid: number): number {
  return Math.max(0, totalAmount - advancePaid);
}
