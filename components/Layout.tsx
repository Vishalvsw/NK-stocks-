import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, TrendingUp, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, MessageCircle, LogOut, User, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TopMarquee = () => {
  return (
    <div className="bg-slate-900 text-white py-2 overflow-hidden whitespace-nowrap border-b border-slate-700">
      <div className="inline-block animate-marquee hover:pause-marquee">
        <span className="mx-4 text-xs font-medium uppercase tracking-widest flex items-center">
          <AlertTriangle className="h-3 w-3 mr-2 text-yellow-500" />
          Disclaimer: We are not SEBI registered. All courses and services are for educational purposes only. Trading involves significant risk.
          <AlertTriangle className="h-3 w-3 ml-8 mr-2 text-yellow-500" />
          Disclaimer: We are not SEBI registered. All courses and services are for educational purposes only. Trading involves significant risk.
          <AlertTriangle className="h-3 w-3 ml-8 mr-2 text-yellow-500" />
          Disclaimer: We are not SEBI registered. All courses and services are for educational purposes only. Trading involves significant risk.
        </span>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        .hover\:pause-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path ? 'text-secondary font-bold' : 'text-gray-600 hover:text-secondary';

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-secondary p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">NK Stock<span className="text-secondary"> Solutions</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/services" className={isActive('/services')}>Services</Link>
            <Link to="/courses" className={isActive('/courses')}>Courses</Link>
            <Link to="/blog" className={isActive('/blog')}>Blog</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            
            {user ? (
               <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                  <span className="text-sm font-semibold text-slate-700 flex items-center">
                    <User className="h-4 w-4 mr-1" /> {user.name}
                  </span>
                  <Link to="/admin" className="text-secondary font-semibold hover:text-green-700">Dashboard</Link>
                  <button onClick={handleLogout} className="text-gray-500 hover:text-red-500" title="Logout">
                    <LogOut className="h-5 w-5" />
                  </button>
               </div>
            ) : (
               <Link to="/login" className={isActive('/login')}>Login</Link>
            )}
          </div>

          <div className="hidden md:flex">
             {!user && (
                <Link to="/contact" className="ml-4 bg-primary text-white px-6 py-2 rounded-full hover:bg-slate-800 transition-colors">
                  Get Started
                </Link>
             )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t absolute w-full left-0 top-20 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/services" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="/courses" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Courses</Link>
            <Link to="/blog" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link to="/contact" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Contact</Link>
            {user ? (
              <>
                <Link to="/admin" className="block py-2 font-bold text-secondary" onClick={() => setIsOpen(false)}>Dashboard ({user.username})</Link>
                <button onClick={handleLogout} className="block w-full text-left py-2 text-red-500">Logout</button>
              </>
            ) : (
                <Link to="/login" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
               <div className="bg-secondary p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">NK Stock Solutions</span>
            </div>
            <p className="text-slate-400 mb-4">
              Empowering individuals with financial literacy and expert stock market training.
            </p>
            <p className="text-slate-500 text-xs italic mb-4">We are not SEBI registered.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-slate-700 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-400 hover:text-secondary">Home</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-secondary">Our Services</Link></li>
              <li><Link to="/courses" className="text-slate-400 hover:text-secondary">All Courses</Link></li>
              <li><Link to="/blog" className="text-slate-400 hover:text-secondary">Market News</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-secondary">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-slate-700 pb-2 inline-block">Courses</h3>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-slate-400 hover:text-secondary">Technical Analysis</Link></li>
              <li><Link to="/courses" className="text-slate-400 hover:text-secondary">Options Trading</Link></li>
              <li><Link to="/courses" className="text-slate-400 hover:text-secondary">Fundamental Analysis</Link></li>
              <li><Link to="/courses" className="text-slate-400 hover:text-secondary">Intraday Strategies</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-slate-700 pb-2 inline-block">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-secondary mt-1" />
                <span className="text-slate-400">123 Market Street, Dalal Zone, Mumbai, India - 400001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary" />
                <span className="text-slate-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary" />
                <span className="text-slate-400">info@nkstocksolutions.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} NK Stock Solutions. All rights reserved.</p>
          <p className="mt-2 text-[10px] uppercase tracking-widest text-slate-600">Educational Portal - Not a SEBI Registered Entity</p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
    </a>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopMarquee />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};
