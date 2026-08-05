import React, { useState, useEffect } from 'react';
import { Download, WifiOff, CheckCircle } from 'lucide-react';
import { Button } from './Button';

export const PwaInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setInstalled(true);
        }
        setDeferredPrompt(null);
      });
    } else {
      setInstalled(true);
    }
  };

  if (!deferredPrompt && !isOffline && !installed) return null;

  return (
    <div className="fixed top-4 right-4 z-40 max-w-md animate-slide-up">
      {isOffline && (
        <div className="flex items-center gap-3 p-3 bg-rose-950/90 border border-rose-700/80 rounded-lg text-rose-200 text-xs shadow-xl backdrop-blur-md">
          <WifiOff className="w-4 h-4 shrink-0 text-rose-400" />
          <span>You are currently offline. Local cache enabled for PWA mode.</span>
        </div>
      )}

      {installed && (
        <div className="flex items-center gap-3 p-3 bg-emerald-950/90 border border-emerald-700/80 rounded-lg text-emerald-200 text-xs shadow-xl backdrop-blur-md">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Apex Events V3 PWA Installed Successfully!</span>
        </div>
      )}

      {deferredPrompt && !installed && (
        <div className="flex items-center justify-between gap-4 p-3 bg-slate-900/90 border border-amber-500/40 rounded-lg text-slate-100 text-xs shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/20 rounded-md text-amber-400">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-100">Install Apex Events V3 App</div>
              <div className="text-slate-400">Offline mode, fast loading & push alerts</div>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={handleInstall}>
            Install
          </Button>
        </div>
      )}
    </div>
  );
};
