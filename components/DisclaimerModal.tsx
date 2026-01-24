import React, { useState, useEffect } from 'react';
import { ShieldAlert, X, CheckCircle2, AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react';

export const DisclaimerModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenDisclaimer = sessionStorage.getItem('hasSeenDisclaimer');
    if (!hasSeenDisclaimer) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('hasSeenDisclaimer', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-primary/90 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl relative overflow-hidden border border-slate-200">
        {/* Warning Header */}
        <div className="bg-amber-500 p-8 text-primary relative">
          <div className="absolute top-0 right-0 p-8">
            <button onClick={handleClose} className="text-primary/60 hover:text-primary transition-colors">
              <X className="h-8 w-8" />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 bg-primary text-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
              <ShieldAlert className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-1">Important Safety Notice</h2>
              <h3 className="text-3xl font-black tracking-tighter">Regulatory Disclaimer</h3>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 sm:p-12 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* SEBI Warning */}
          <div className="flex items-start space-x-4 bg-red-50 p-6 rounded-3xl border border-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
            <p className="text-red-900 font-bold leading-relaxed italic">
              "We are not SEBI Registered. Investing in the market is subject to market risk. Read all our Disclaimers and T&C carefully before investing."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Official Channels</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-sm font-bold text-primary">
                  <ExternalLink className="h-4 w-4 mr-2 text-secondary" /> www.nkstocksolutions.com
                </li>
                <li className="flex items-center text-sm font-bold text-primary">
                  <ShieldCheck className="h-4 w-4 mr-2 text-secondary" /> support@nkstocksolutions.com
                </li>
                <li className="flex items-start text-sm font-bold text-primary">
                  <ExternalLink className="h-4 w-4 mr-2 text-secondary mt-1 flex-shrink-0" />
                  <span>9900691748, 8904528316</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Zero Tolerance</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-xs font-medium text-slate-600">
                  <CheckCircle2 className="h-3 w-3 mr-2 text-secondary" /> No Assured / Guaranteed Profits
                </li>
                <li className="flex items-center text-xs font-medium text-slate-600">
                  <CheckCircle2 className="h-3 w-3 mr-2 text-secondary" /> No Profit Sharing Services
                </li>
                <li className="flex items-center text-xs font-medium text-slate-600">
                  <CheckCircle2 className="h-3 w-3 mr-2 text-secondary" /> No Broking / PMS Services
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
            <h4 className="text-sm font-black text-primary flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-secondary" /> Security & Credential Protection
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Clients are never asked for their <span className="text-primary font-bold">Banking or Broking Credentials</span> at NK Stock Solutions. 
              Do not share your Credit Card / Debit Card / Netbanking / Demat Account credentials with any of our employees.
            </p>
            <p className="text-xs text-secondary font-bold bg-secondary/5 p-4 rounded-2xl border border-secondary/10">
              Report suspicious requests immediately: 9900691748 or support@nkstocksolutions.com
            </p>
          </div>

          <div className="flex items-start space-x-4 text-xs text-slate-400">
            <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
            <p>
              We accept payments only in registered <span className="text-primary font-bold">BANK ACCOUNTS</span>. Please check the "Payment" section on our website for details.
            </p>
          </div>

          <button 
            onClick={handleClose}
            className="w-full bg-primary text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-secondary hover:text-primary transition-all active:scale-95"
          >
            I Accept & Understand
          </button>
        </div>
      </div>
    </div>
  );
};