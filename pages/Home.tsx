import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { CourseCard } from '../components/CourseCard';
import { useApp } from '../context/AppContext';
import { ArrowRight, ShieldCheck, Award, TrendingUp, MonitorPlay, ChevronRight, Play, MessageCircle } from 'lucide-react';

const Home = () => {
  const { courses } = useApp();
  const topCourses = courses.slice(0, 3);

  const openWhatsApp = () => {
    window.open("https://wa.me/919900691748?text=Hello%20Finstock%20Solutions,%20I%20am%20interested%20in%20joining%20your%20trading%20academy.", "_blank");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative mesh-bg text-white py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Official Channel: Finstock Solutions</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                Master Trading with <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Finstock.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
                Expert-led stock market education designed for the modern Indian trader. Data-driven strategies, live analysis, and lifelong support.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
                <Link to="/courses" className="bg-secondary text-primary px-10 py-4 rounded-xl text-lg font-bold hover:bg-white hover:scale-105 transition-all flex items-center justify-center">
                  Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/services" className="bg-white/5 border border-white/10 backdrop-blur-md text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-all flex items-center justify-center">
                  Our Services
                </Link>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
               <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/20 to-accent/20 blur-3xl rounded-full"></div>
               <div className="relative glass rounded-3xl p-4 overflow-hidden shadow-2xl border border-white/20">
                  <img src="https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&w=800&q=80" alt="Market Dashboard" className="rounded-2xl shadow-inner" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-secondary text-primary h-20 w-20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 fill-current" />
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-6 relative z-20">
        <div className="bg-primary shadow-2xl rounded-2xl overflow-hidden border border-white/5 py-3">
          {/* @ts-ignore */}
          <marquee direction="left" scrollamount="6" className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
            <span className="text-amber-500">SECURITY PROTOCOL:</span> WE DO NOT ASK FOR BROKING CREDENTIALS ● NO ASSURED PROFITS ● NO GUARANTEED RETURNS ● PAYMENTS ONLY IN REGISTERED BANK ACCOUNTS ● CHECK OUR PAYMENT PAGE FOR DETAILS ● FINSTOCK SOLUTIONS IS NOT SEBI REGISTERED.
          {/* @ts-ignore */}
          </marquee>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="bg-white border border-slate-200 shadow-2xl rounded-[2.5rem] p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Students Trained', val: '12K+' },
              { label: 'Live Sessions', val: '800+' },
              { label: 'Market Rating', val: '4.9/5' },
              { label: 'Experts', val: '15+' },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-4xl font-extrabold text-primary mb-2 group-hover:text-secondary transition-colors tracking-tighter">{stat.val}</div>
                <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-4">Core Philosophy</h2>
            <h3 className="text-4xl md:text-5xl font-black text-primary leading-tight">Beyond just charts. <br/><span className="text-slate-400">Trading with a systems mindset.</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: MonitorPlay, 
                color: 'bg-emerald-50 text-emerald-600', 
                title: 'Institutional Grade Tools', 
                desc: 'Access the same frameworks used by professional proprietary trading desks in Dalal Street.' 
              },
              { 
                icon: ShieldCheck, 
                color: 'bg-indigo-50 text-indigo-600', 
                title: 'Risk First approach', 
                desc: 'We prioritize capital preservation over speculative returns. Learn to trade for the long term.' 
              },
              { 
                icon: Award, 
                color: 'bg-purple-50 text-purple-600', 
                title: 'Global Certifications', 
                desc: 'Earn industry-standard certifications that validate your proficiency in technical analysis.' 
              },
            ].map((feature, i) => (
              <div key={i} className="group p-10 rounded-3xl border border-slate-100 bg-white hover:border-secondary transition-all shadow-sm hover:shadow-xl">
                <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h4 className="text-2xl font-bold text-primary mb-4">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-32 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-4">Learn</h2>
              <h3 className="text-4xl font-black text-primary">Featured Curriculums</h3>
              <p className="mt-4 text-slate-500 text-lg">Meticulously crafted learning paths for every stage of your trading career.</p>
            </div>
            <Link to="/courses" className="inline-flex items-center space-x-2 text-primary font-bold border-b-2 border-secondary hover:text-secondary transition-colors pb-1">
              <span>View Course Catalog</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {topCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-16 italic">"A paradigm shift in how I look at market volatility."</h3>
              <div className="flex flex-col items-center">
                 <img src="https://picsum.photos/100/100?random=15" alt="Student" className="w-24 h-24 rounded-full border-4 border-white/10 p-1 mb-6" />
                 <h4 className="text-xl font-bold text-white">Vikram Rathod</h4>
                 <p className="text-secondary font-semibold">Pro Options Trader</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-primary mb-8 leading-tight">Join the path to financial <span className="text-secondary">sovereignty.</span></h2>
          <p className="text-xl text-slate-500 mb-12">Connect with our consultants directly via WhatsApp for instant enrollment support.</p>
          <button 
            onClick={openWhatsApp}
            className="inline-flex items-center bg-primary text-white px-12 py-5 rounded-2xl text-xl font-bold hover:bg-secondary hover:text-primary transition-all shadow-2xl group"
          >
            <MessageCircle className="h-6 w-6 mr-3 group-hover:scale-125 transition-transform" /> Chat to Enroll
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Home;