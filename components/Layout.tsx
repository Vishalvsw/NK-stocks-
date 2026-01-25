import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, MessageCircle, ChevronRight, AlertTriangle } from 'lucide-react';
import { DisclaimerModal } from './DisclaimerModal';

const Navbar = ({ offset = 0 }: { offset?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <nav 
      style={{ top: `${offset}px` }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-primary/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl' 
          : 'bg-primary/80 backdrop-blur-md border-b border-white/5 py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
            <div className="bg-white/10 p-2 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm">
              <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white">
              NKSTOCK<span className="text-secondary">.</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {[
              { label: 'Home', path: '/' },
              { label: 'Services', path: '/services' },
              { label: 'Courses', path: '/courses' },
              { label: 'Contact', path: '/contact' },
            ].map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 ${
                  isActive(link.path) 
                    ? 'text-secondary' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <Link to="/courses" className="bg-secondary text-primary px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg shadow-secondary/20">
              Enroll Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors z-[60]">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <div className={`lg:hidden fixed inset-0 bg-primary/98 backdrop-blur-2xl z-50 transition-all duration-500 transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="flex flex-col h-full items-center justify-center p-6 text-center space-y-8">
          {[
            { label: 'Home', path: '/' },
            { label: 'Services', path: '/services' },
            { label: 'Courses', path: '/courses' },
            { label: 'Contact', path: '/contact' },
          ].map((link, idx) => (
             <Link 
              key={link.path}
              to={link.path} 
              style={{ transitionDelay: `${idx * 100}ms` }}
              className={`block text-4xl font-black capitalize transform transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${
                isActive(link.path) ? 'text-secondary' : 'text-white hover:text-secondary'
              }`} 
              onClick={() => setIsOpen(false)}
             >
              {link.label}
             </Link>
          ))}
          <Link 
            to="/courses" 
            onClick={() => setIsOpen(false)}
            className={`mt-12 bg-secondary text-primary px-10 py-5 rounded-2xl text-xl font-black uppercase tracking-widest shadow-2xl transition-all duration-500 delay-500 ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
          >
            Enroll Now
          </Link>
          
          <div className="absolute bottom-10 flex space-x-6 text-slate-400">
             <Facebook className="h-6 w-6" />
             <Twitter className="h-6 w-6" />
             <Instagram className="h-6 w-6" />
             <Linkedin className="h-6 w-6" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
               <div className="bg-secondary p-2 rounded-xl">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tighter">NK STOCK SOLUTIONS<span className="text-secondary">.</span></span>
            </div>
            <p className="text-slate-400 text-base md:text-lg max-w-md mb-10 leading-relaxed">
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
                <li key={link}><Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="text-slate-400 font-bold hover:text-white transition-colors block py-1">{link}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-secondary mb-8">Official Support</h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                <span className="text-slate-400 font-medium text-sm">Headquarters: Bengaluru, Karnataka, India</span>
              </li>
              <li className="flex items-start space-x-4">
                <Phone className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                <span className="text-slate-400 font-medium text-sm">9900691748, 8904528316</span>
              </li>
              <li className="flex items-start space-x-4">
                <Mail className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                <span className="text-slate-400 font-medium text-sm break-all">support@nkstocksolutions.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 text-center">
          <p className="text-slate-500 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.4em]">© 2024 NK STOCK SOLUTIONS. WE ARE NOT SEBI REGISTERED.</p>
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
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-secondary text-primary p-4 md:p-5 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 flex items-center justify-center"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
    </a>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Height of the marquee is approximately 44px
  const marqueeHeight = 44;

  return (
    <div className="flex flex-col min-h-screen selection:bg-secondary selection:text-primary overflow-x-hidden w-full">
      <DisclaimerModal />
      
      {/* Top Regulatory Marquee (Above Header) */}
      <div className="fixed top-0 w-full z-[60] bg-slate-950 text-white py-2.5 md:py-3 border-b border-white/10 shadow-xl overflow-hidden">
        <div className="flex items-center">
          <div className="bg-red-600 text-white text-[8px] md:text-[9px] font-black uppercase px-2 py-1 absolute left-0 z-20 animate-pulse shadow-md whitespace-nowrap">LATEST</div>
          {/* @ts-ignore */}
          <marquee direction="left" scrollamount="7" className="font-bold text-[10px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.15em] opacity-90 pl-16">
            <span className="text-secondary">● REGULATORY DISCLOSURE:</span> WE ARE NOT SEBI REGISTERED. INVESTING IS SUBJECT TO MARKET RISK. <span className="text-secondary ml-8">● OFFICIAL DOMAIN:</span> WWW.NKSTOCKSOLUTIONS.COM <span className="text-secondary ml-8">● SUPPORT HOTLINE:</span> 9900691748, 8904528316 <span className="text-secondary ml-8">● SECURITY ALERT:</span> NEVER SHARE BROKING OR BANKING CREDENTIALS.
          {/* @ts-ignore */}
          </marquee>
        </div>
      </div>

      <Navbar offset={marqueeHeight} />

      <div className="flex-grow flex flex-col w-full">
        <main className="flex-grow pt-[108px] md:pt-[128px]">
          {children}
        </main>
      </div>
      
      <WhatsAppButton />
      <Footer />
    </div>
  );
};