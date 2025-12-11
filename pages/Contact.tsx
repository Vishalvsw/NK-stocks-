import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <div className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Have questions about our services or need career guidance? Fill out the form below or reach us directly.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="bg-slate-900 text-white p-10 rounded-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-secondary rounded-full opacity-20 blur-2xl"></div>
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                 <div className="space-y-8">
                   <div className="flex items-start space-x-4">
                     <div className="bg-white/10 p-3 rounded-lg"><Phone className="h-6 w-6 text-secondary" /></div>
                     <div>
                       <p className="text-slate-400 text-sm mb-1">Phone</p>
                       <p className="font-semibold">+91 98765 43210</p>
                       <p className="text-sm text-slate-500 mt-1">Mon-Fri 9am to 6pm</p>
                     </div>
                   </div>
                   
                   <div className="flex items-start space-x-4">
                     <div className="bg-white/10 p-3 rounded-lg"><Mail className="h-6 w-6 text-secondary" /></div>
                     <div>
                       <p className="text-slate-400 text-sm mb-1">Email</p>
                       <p className="font-semibold">support@nkstocksolutions.com</p>
                       <p className="text-sm text-slate-500 mt-1">Online support 24/7</p>
                     </div>
                   </div>

                   <div className="flex items-start space-x-4">
                     <div className="bg-white/10 p-3 rounded-lg"><MapPin className="h-6 w-6 text-secondary" /></div>
                     <div>
                       <p className="text-slate-400 text-sm mb-1">Office</p>
                       <p className="font-semibold">123 Market Street, Dalal Zone<br/>Mumbai, India - 400001</p>
                     </div>
                   </div>
                 </div>

                 <div className="mt-12">
                   <p className="mb-4 text-slate-300">Connect with us on WhatsApp</p>
                   <a 
                    href="https://wa.me/1234567890" 
                    className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors"
                   >
                     <MessageCircle className="h-5 w-5 mr-2" /> Chat Now
                   </a>
                 </div>
               </div>
            </div>

            {/* Enquiry Form */}
            <div className="bg-white p-10 rounded-2xl shadow-sm">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" required className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-secondary/50 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input type="email" required className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-secondary/50 outline-none transition-all" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input type="tel" required className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-secondary/50 outline-none transition-all" placeholder="+91" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Interest</label>
                    <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-secondary/50 outline-none transition-all bg-white">
                      <option>Select a service</option>
                      <option>Equity Services</option>
                      <option>Derivative Services</option>
                      <option>Index Options</option>
                      <option>MCX / Commodities</option>
                      <option>Stock Market Courses</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea required rows={4} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-secondary/50 outline-none transition-all" placeholder="How can we help you?"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-slate-800 transition-colors flex items-center justify-center">
                    <Send className="h-5 w-5 mr-2" /> Send Enquiry
                  </button>
                </form>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Send className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">Thank you for contacting us. Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="text-secondary font-semibold hover:underline">Send another message</button>
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