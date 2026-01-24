import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, MessageCircle, ChevronRight, AlertTriangle } from 'lucide-react';
import { DisclaimerModal } from './DisclaimerModal';

const Navbar = ({ offset = 0 }: { offset?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  // We set the top based on the height of the marquee to ensure it stays "above the header"
  return (
    <nav 
      style={{ top: `${offset}px` }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-primary p-2.5 rounded-xl shadow-lg border border-white/10">
              <TrendingUp className="h-6 w-6 text-secondary" />
            </div>
            <span className={`text-2xl font-black tracking-tighter ${scrolled || location.pathname !== '/' ? 'text-primary' : 'text-white'}`}>
              NKSTOCK<span className="text-secondary">.</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {[
              { label: 'Home', path: '/' },
              { label: 'Services', path: '/services' },
              { label: 'Courses', path: '/courses' },
              { label: 'Contact', path: '/contact' },
            ].map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  isActive(link.path) 
                    ? 'text-secondary' 
                    : scrolled || location.pathname !== '/' ? 'text-slate-600 hover:text-primary' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <Link to="/courses" className="bg-secondary text-primary px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-secondary/20">
              Enroll Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 rounded-xl ${scrolled || location.pathname !== '/' ? 'text-primary' : 'text-white'}`}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-2xl animate-fade-in fixed inset-0 top-[72px] z-50">
          <div className="p-8 space-y-8">
            {[
              { label: 'Home', path: '/' },
              { label: 'Services', path: '/services' },
              { label: 'Courses', path: '/courses' },
              { label: 'Contact', path: '/contact' },
            ].map(link => (
               <Link 
                key={link.path}
                to={link.path} 
                className="block text-4xl font-black text-primary capitalize hover:text-secondary transition-colors" 
                onClick={() => setIsOpen(false)}
               >
                {link.label}
               </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
               <div className="bg-secondary p-2.5 rounded-xl">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <span className="text-3xl font-black tracking-tighter">NK STOCK SOLUTIONS<span className="text-secondary">.</span></span>
            </div>
            <p className="text-slate-400 text-lg max-w-sm mb-10 leading-relaxed">
              Premium stock market advisory and educational frameworks for the dedicated investor. We prioritize capital protection and systematic learning.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-secondary mb-8">Navigation</h3>
            <ul className="space-y-4">
              {['Home', 'Services', 'Courses', 'Contact'].map(link => (
                <li key={link}><Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="text-slate-400 font-bold hover:text-white transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-secondary mb-8">Official Support</h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                <span className="text-slate-400 font-medium">Headquarters: Bengaluru, Karnataka, India</span>
              </li>
              <li className="flex items-start space-x-4">
                <Phone className="h-5 w-5 text-secondary mt-1" />
                <span className="text-slate-400 font-medium">9900691748, 8904528316</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-secondary" />
                <span className="text-slate-400 font-medium">support@nkstocksolutions.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 text-center">
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.4em]">© 2024 NK STOCK SOLUTIONS. WE ARE NOT SEBI REGISTERED.</p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919900691748"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-secondary text-primary p-5 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 flex items-center justify-center"
    >
      <MessageCircle className="h-8 w-8" />
    </a>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Height of the marquee is approximately 44px
  const marqueeHeight = 44;

  return (
    <div className="flex flex-col min-h-screen selection:bg-secondary selection:text-primary overflow-x-hidden">
      <DisclaimerModal />
      
      {/* Top Regulatory Marquee (Above Header) */}
      <div className="fixed top-0 w-full z-[60] bg-slate-950 text-white py-3 border-b border-white/10 shadow-xl overflow-hidden">
        <div className="flex items-center">
          <div className="bg-red-600 text-white text-[9px] font-black uppercase px-2 py-1 absolute left-0 z-20 animate-pulse shadow-md">LATEST</div>
          {/* @ts-ignore */}
          <marquee direction="left" scrollamount="7" className="font-bold text-[11px] uppercase tracking-[0.15em] opacity-90 pl-16">
            <span className="text-secondary">● REGULATORY DISCLOSURE:</span> WE ARE NOT SEBI REGISTERED. INVESTING IS SUBJECT TO MARKET RISK. <span className="text-secondary ml-8">● OFFICIAL DOMAIN:</span> WWW.NKSTOCKSOLUTIONS.COM <span className="text-secondary ml-8">● SUPPORT HOTLINE:</span> 9900691748, 8904528316 <span className="text-secondary ml-8">● SECURITY ALERT:</span> NEVER SHARE BROKING OR BANKING CREDENTIALS.
          {/* @ts-ignore */}
          </marquee>
        </div>
      </div>

      <Navbar offset={marqueeHeight} />

      <div style={{ paddingTop: `${marqueeHeight}px` }} className="md:pt-0">
        <main className="flex-grow pt-20 md:pt-24">{children}</main>
      </div>
      
      <WhatsAppButton />
      <Footer />
    </div>
  );
};