import React, { useState } from 'react';
import { Shield, Lock } from 'lucide-react';
import { GlassCard } from '../../../components/v3/ui/GlassCard';


export const RolesSettings: React.FC = () => {
  const [twoFactor, setTwoFactor] = useState(true);
  const [rateLimiting, setRateLimiting] = useState(true);


  return (
    <div className="space-y-6 animate-fade-in font-inter">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-slate-100">Security, RBAC &amp; System Configuration</h2>
        <p className="text-xs text-slate-400">JWT Token rotation, 2-Factor Authentication, Role-based access &amp; rate-limiting controls.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security Overview */}
        <GlassCard goldBorder hoverEffect={false} className="space-y-4">
          <h3 className="text-base font-heading font-semibold text-slate-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" /> JWT Auth &amp; Encryption Matrix
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div>
                <div className="font-bold text-slate-100">JWT Refresh Token Rotation</div>
                <div className="text-slate-400">Automatic 15-min token expiration with HTTPS HttpOnly cookies</div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded font-bold text-[10px]">ACTIVE</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div>
                <div className="font-bold text-slate-100">Two-Factor Authentication (2FA)</div>
                <div className="text-slate-400">Authenticator TOTP app verification</div>
              </div>
              <button
                onClick={() => setTwoFactor(!twoFactor)}
                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                  twoFactor ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {twoFactor ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div>
                <div className="font-bold text-slate-100">API Rate Limiting (Redis Backed)</div>
                <div className="text-slate-400">Max 100 requests / minute per IP address</div>
              </div>
              <button
                onClick={() => setRateLimiting(!rateLimiting)}
                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                  rateLimiting ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {rateLimiting ? 'ENFORCED' : 'OFF'}
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Roles & Permissions Matrix */}
        <GlassCard hoverEffect={false} className="space-y-4">
          <h3 className="text-base font-heading font-semibold text-slate-100 flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-400" /> Role-Based Access Control (RBAC)
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400 uppercase">Super Admin</div>
              <div className="text-slate-300">Full system control, pricing override, staff management &amp; revenue reports.</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <div className="font-bold text-purple-400 uppercase">Event Director</div>
              <div className="text-slate-300">Manage bookings, venue walkthroughs, assign tasks &amp; WhatsApp coordination.</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <div className="font-bold text-blue-400 uppercase">Employee / Specialist</div>
              <div className="text-slate-300">View assigned tasks, update site status &amp; record attendance logs.</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-400 uppercase">Customer</div>
              <div className="text-slate-300">View booking progress, pay advance/balance &amp; download PDF invoices.</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
