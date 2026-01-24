import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Mail, Phone, MapPin, Send, MessageCircle, AlertTriangle } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <div className="bg-surface py-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-4">Official Helpdesk</h2>
            <h1 className="text-4xl md:text-6xl font-black text-primary mb-6">Get in Touch</h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Have questions about our educational modules or need support? Reach out to our official support team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="bg-primary text-white p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
               <div className="relative z-10 space-y-12">
                 <div>
                   <h3 className="text-2xl font-black mb-8">Official Channels</h3>
                   <div className="space-y-10">
                     <div className="flex items-start space-x-6">
                       <div className="bg-white/5 p-4 rounded-2xl border border-white/10"><Phone className="h-6 w-6 text-secondary" /></div>
                       <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Support Contacts</p>
                         <p className="text-xl font-bold">9900691748, 8904528316</p>
                       </div>
                     </div>
                     
                     <div className="flex items-start space-x-6">
                       <div className="bg-white/5 p-4 rounded-2xl border border-white/10"><Mail className="h-6 w-6 text-secondary" /></div>
                       <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">E-Mail Identity</p>
                         <p className="text-xl font-bold">support@finstocksolutions.com</p>
                       </div>
                     </div>

                     <div className="flex items-start space-x-6">
                       <div className="bg-white/5 p-4 rounded-2xl border border-white/10"><MapPin className="h-6 w-6 text-secondary" /></div>
                       <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Regional Presence</p>
                         <p className="text-xl font-bold">Bengaluru, Karnataka, India</p>
                       </div>
                     </div>
                   </div>
                 </div>

                 <div className="pt-8 border-t border-white/10">
                   <div className="flex items-center p-6 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-500 mb-8">
                     <AlertTriangle className="h-6 w-6 mr-4 flex-shrink-0" />
                     <p className="text-xs font-bold uppercase tracking-wider leading-relaxed">
                       Caution: Never share OTP or Banking Credentials with anyone claiming to be our employee.
                     </p>
                   </div>
                   <a 
                    href="https://wa.me/919900691748" 
                    className="flex items-center justify-center bg-secondary text-primary px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-secondary/10"
                   >
                     <MessageCircle className="h-6 w-6 mr-3" /> Connect via WhatsApp
                   </a>
                 </div>
               </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Full Identity</label>
                    <input type="text" required className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold focus:ring-2 ring-secondary transition-all" placeholder="Enter your full name" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Email Address</label>
                      <input type="email" required className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold focus:ring-2 ring-secondary transition-all" placeholder="email@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Phone Connection</label>
                      <input type="tel" required className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold focus:ring-2 ring-secondary transition-all" placeholder="+91" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Strategic Interest</label>
                    <select className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold focus:ring-2 ring-secondary transition-all appearance-none cursor-pointer">
                      <option>Academic Courses</option>
                      <option>Advisory Services</option>
                      <option>LMS Partnership</option>
                      <option>General Support</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Inquiry Brief</label>
                    <textarea required rows={4} className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold focus:ring-2 ring-secondary transition-all" placeholder="How can we assist you today?"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all flex items-center justify-center shadow-xl shadow-primary/10">
                    <Send className="h-5 w-5 mr-3" /> Transmit Enquiry
                  </button>
                </form>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
                  <div className="w-24 h-24 bg-emerald-50 text-secondary rounded-[2rem] flex items-center justify-center shadow-inner">
                    <Send className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-primary mb-4">Enquiry Received</h3>
                    <p className="text-slate-500 font-medium">Our official helpdesk will reach out within 24 business hours.</p>
                  </div>
                  <button onClick={() => setSubmitted(false)} className="text-secondary font-black uppercase tracking-widest text-xs border-b-2 border-secondary hover:text-primary hover:border-primary transition-all pb-1">Submit New Request</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;