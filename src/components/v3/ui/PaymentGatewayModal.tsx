import React, { useState } from 'react';
import { CreditCard, QrCode, ShieldCheck, CheckCircle2, X, ArrowRight } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { Button } from './Button';


export const PaymentGatewayModal: React.FC = () => {
  const { isPaymentModalOpen, setPaymentModalOpen, activeBookingForPayment, processPayment } = useV3Store();
  const [gateway, setGateway] = useState<'Razorpay' | 'Stripe' | 'UPI QR Code'>('Razorpay');
  const [paymentOption, setPaymentOption] = useState<'advance' | 'full'>('advance');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isPaymentModalOpen || !activeBookingForPayment) return null;

  const totalAmount = activeBookingForPayment.totalAmount;
  const advanceAmount = activeBookingForPayment.advancePaid > 0 ? activeBookingForPayment.remainingAmount : Math.min(5000, totalAmount);
  const payAmount = paymentOption === 'advance' ? advanceAmount : activeBookingForPayment.remainingAmount;

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      processPayment(activeBookingForPayment.id, payAmount, gateway);
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setPaymentModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-luxury overflow-hidden animate-zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2 text-slate-100 font-heading font-semibold">
            <CreditCard className="w-5 h-5 text-amber-400" />
            <span>Apex Payment Checkout - {activeBookingForPayment.bookingCode}</span>
          </div>
          <button onClick={handleClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-100">Payment Successful!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                ₹{payAmount.toLocaleString()} processed via {gateway}. Transaction ID: tx_{gateway.toLowerCase()}_{Math.random().toString(36).substring(2,8)}.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <Button variant="primary" size="md" onClick={handleClose}>
                  Back to Dashboard
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Payment Summary */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Customer:</span>
                  <span className="text-slate-100 font-medium">{activeBookingForPayment.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Event:</span>
                  <span className="text-slate-100 font-medium">{activeBookingForPayment.packageName || activeBookingForPayment.eventType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Event Cost:</span>
                  <span className="text-slate-100 font-bold">${totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold text-amber-400">
                  <span>Pay Amount:</span>
                  <span>${payAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Type Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Payment Option</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentOption('advance')}
                    className={`p-3 rounded-lg border text-xs text-left transition-all ${
                      paymentOption === 'advance' ? 'border-amber-500 bg-amber-500/10 text-amber-300' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <div className="font-semibold">Pay Advance / Installment</div>
                    <div className="text-[11px] opacity-80">${payAmount.toLocaleString()} due now</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentOption('full')}
                    className={`p-3 rounded-lg border text-xs text-left transition-all ${
                      paymentOption === 'full' ? 'border-amber-500 bg-amber-500/10 text-amber-300' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <div className="font-semibold">Pay Remaining Balance</div>
                    <div className="text-[11px] opacity-80">${activeBookingForPayment.remainingAmount.toLocaleString()} total due</div>
                  </button>
                </div>
              </div>

              {/* Gateway Tabs */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Select Gateway</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Razorpay', 'Stripe', 'UPI QR Code'] as const).map((gw) => (
                    <button
                      key={gw}
                      type="button"
                      onClick={() => setGateway(gw)}
                      className={`p-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                        gateway === gw ? 'border-amber-500 bg-amber-500/10 text-amber-300 shadow-glow-gold' : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      {gw}
                    </button>
                  ))}
                </div>
              </div>

              {/* UPI QR Display if selected */}
              {gateway === 'UPI QR Code' && (
                <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=apexevents@upi&pn=ApexEvents&am=${payAmount}`}
                    alt="UPI QR Code"
                    className="w-20 h-20 rounded bg-white p-1"
                  />
                  <div className="text-xs space-y-1">
                    <div className="font-bold text-amber-400 flex items-center gap-1">
                      <QrCode className="w-3.5 h-3.5" /> Instant UPI QR Scanner
                    </div>
                    <p className="text-slate-400">Scan with Google Pay, PhonePe, Paytm or BHIM UPI.</p>
                    <div className="text-slate-300">VPA: <span className="font-mono text-slate-100">apexevents@upi</span></div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handlePayNow}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 animate-spin" /> Securing SSL Transaction...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Pay ${payAmount.toLocaleString()} via {gateway} <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                256-Bit Encrypted Secure SSL Checkout
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
