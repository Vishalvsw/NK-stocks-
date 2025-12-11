import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-secondary font-bold' : 'text-gray-600 hover:text-secondary';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-secondary p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">NK Stock<span className="text-secondary"> Solutions</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/services" className={isActive('/services')}>Services</Link>
            <Link to="/courses" className={isActive('/courses')}>Courses</Link>
            <Link to="/blog" className={isActive('/blog')}>Blog</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            <Link to="/admin" className={isActive('/admin')}>Admin</Link>
          </div>

          <div className="hidden md:flex">
             <Link to="/contact" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-slate-800 transition-colors">
               Get Started
             </Link>
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
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/services" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="/courses" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Courses</Link>
            <Link to="/blog" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link to="/contact" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link to="/admin" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Admin Panel</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
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

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};