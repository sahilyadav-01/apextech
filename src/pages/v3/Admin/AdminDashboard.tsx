import React from 'react';
import { DollarSign, Calendar, Users, Briefcase, TrendingUp, Sparkles } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { GlassCard } from '../../../components/v3/ui/GlassCard';
import { Button } from '../../../components/v3/ui/Button';
import { WhatsAppActionBtn } from '../../../components/v3/ui/WhatsAppActionBtn';


export const AdminDashboard: React.FC = () => {
  const { bookings, customers, employees, invoices, setAiModalOpen, setPaymentModalOpen, setInvoiceModalOpen } = useV3Store();

  const totalRevenue = bookings.reduce((acc, b) => acc + b.advancePaid, 0);
  const totalPending = bookings.reduce((acc, b) => acc + b.remainingAmount, 0);

  return (
    <div className="space-y-8 animate-fade-in font-inter">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 p-6 rounded-2xl border border-amber-500/30">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> Enterprise SaaS Control Center V3.0
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-slate-100">Welcome Back, Victoria Vance</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time system pulse, CRM activities, and luxury staging operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setAiModalOpen(true)} icon={<Sparkles className="w-4 h-4" />}>
            AI Decor Architect
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <GlassCard goldBorder hoverEffect={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Total Revenue Collected</span>
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100 mt-2">${totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" /> +24.8% vs last month
          </div>
        </GlassCard>

        <GlassCard hoverEffect={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Active Bookings</span>
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100 mt-2">{bookings.length} Events</div>
          <div className="text-xs text-slate-400 mt-1">
            ${totalPending.toLocaleString()} pending balance
          </div>
        </GlassCard>

        <GlassCard hoverEffect={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">VIP CRM Contacts</span>
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100 mt-2">{customers.length} Accounts</div>
          <div className="text-xs text-emerald-400 mt-1 font-medium">
            100% WhatsApp Sync Active
          </div>
        </GlassCard>

        <GlassCard hoverEffect={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Staff On Event Site</span>
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100 mt-2">{employees.filter(e => e.status === 'On Event Site').length} / {employees.length} Staff</div>
          <div className="text-xs text-purple-300 mt-1 font-medium">
            98.5% Average Attendance
          </div>
        </GlassCard>
      </div>

      {/* Main Grid: Recent Bookings & Staff Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings Live Ticker */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-semibold text-slate-100">Live Booking &amp; Event Operations</h3>
            <span className="text-xs text-amber-400 font-medium">{bookings.length} Total Registered</span>
          </div>

          <div className="space-y-3">
            {bookings.map((b) => (
              <GlassCard key={b.id} hoverEffect={true} className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 rounded text-[10px] font-bold text-amber-400 uppercase">
                        {b.bookingCode}
                      </span>
                      <span className="text-sm font-semibold text-slate-100">{b.customerName}</span>
                      <span className="text-xs text-slate-400">({b.eventType})</span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-3">
                      <span>Venue: <strong className="text-slate-200">{b.venueName}</strong></span>
                      <span>Date: <strong className="text-amber-400">{b.eventDate}</strong></span>
                      <span>Guests: <strong className="text-slate-200">{b.guestCount}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right text-xs">
                      <div className="font-bold text-slate-100">${b.totalAmount.toLocaleString()}</div>
                      <div className="text-[10px] text-emerald-400">Paid: ${b.advancePaid.toLocaleString()}</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPaymentModalOpen(true, b)}
                    >
                      Payment
                    </Button>
                    <WhatsAppActionBtn phone={b.customerPhone} customerName={b.customerName} bookingCode={b.bookingCode} type="chat" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Staff Radar & Quick Invoices */}
        <div className="space-y-6">
          {/* Employee Status Radar */}
          <GlassCard className="space-y-4">
            <h3 className="text-base font-heading font-semibold text-slate-100 flex items-center justify-between">
              <span>Employee Site Status</span>
              <span className="text-xs text-emerald-400 font-normal">Socket Live</span>
            </h3>
            <div className="space-y-3">
              {employees.map((emp) => (
                <div key={emp.id} className="flex items-center justify-between text-xs p-2 rounded bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-slate-100">{emp.name}</div>
                      <div className="text-slate-400">{emp.role}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    emp.status === 'On Event Site' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {emp.status}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quick Invoice Dispatch */}
          <GlassCard className="space-y-4">
            <h3 className="text-base font-heading font-semibold text-slate-100">Generated Invoices</h3>
            <div className="space-y-2">
              {invoices.map((inv) => (
                <div
                  key={inv.id}
                  onClick={() => setInvoiceModalOpen(true, inv)}
                  className="flex items-center justify-between p-2.5 bg-slate-950/60 hover:bg-slate-900 border border-slate-800 rounded-lg cursor-pointer text-xs"
                >
                  <div>
                    <div className="font-semibold text-amber-400">{inv.invoiceNumber}</div>
                    <div className="text-slate-400">{inv.customerName}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-100">${inv.totalAmount.toLocaleString()}</div>
                    <div className="text-[10px] text-amber-400">{inv.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
