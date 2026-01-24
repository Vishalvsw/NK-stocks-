import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Clock, BarChart, Award, CheckCircle, PlayCircle, Lock, MessageCircle } from 'lucide-react';

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { courses } = useApp();
  const navigate = useNavigate();

  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl font-bold text-primary">Course not found</h2>
          <button onClick={() => navigate('/courses')} className="mt-4 text-secondary hover:underline font-bold">Back to courses</button>
        </div>
      </Layout>
    );
  }

  const handleEnrollWhatsApp = () => {
    const phoneNumber = "919900691748";
    const message = `Hello Finstock Solutions, I am interested in enrolling for the "${course.title}" course (Price: ₹${course.price}). Please guide me with the enrollment process.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen pb-20">
        {/* Header */}
        <div className="bg-slate-900 text-white py-12 md:py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="max-w-4xl">
               <span className="bg-secondary text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">{course.category}</span>
               <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">{course.title}</h1>
               <p className="text-slate-400 text-lg md:text-xl mb-8 max-w-2xl leading-relaxed">{course.description}</p>
               
               <div className="flex flex-wrap gap-8 text-xs font-black uppercase tracking-widest text-slate-500">
                 <div className="flex items-center"><Clock className="h-4 w-4 mr-2 text-secondary" /> 10 Weeks</div>
                 <div className="flex items-center"><BarChart className="h-4 w-4 mr-2 text-secondary" /> {course.category}</div>
                 <div className="flex items-center"><Award className="h-4 w-4 mr-2 text-secondary" /> Certfied</div>
               </div>
             </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10 order-2 lg:order-1">
              {/* Features */}
              <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-slate-100">
                <h2 className="text-2xl font-black mb-8 text-primary uppercase tracking-tight">Academic Scope</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start bg-slate-50 p-5 rounded-2xl border border-slate-100">
                      <CheckCircle className="h-5 w-5 text-secondary mr-4 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 font-bold">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-slate-100">
                <h2 className="text-2xl font-black mb-8 text-primary uppercase tracking-tight">Module Roadmap</h2>
                <div className="space-y-4">
                  {course.curriculum.map((item, idx) => (
                    <div key={idx} className="group border border-slate-100 rounded-2xl p-6 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer">
                      <div className="flex items-center">
                        <div className="bg-secondary/10 text-secondary p-3 rounded-xl mr-5 group-hover:bg-secondary group-hover:text-primary transition-colors">
                           <PlayCircle className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-slate-800 text-lg">{item}</span>
                      </div>
                      <Lock className="h-4 w-4 text-slate-300" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div className="bg-primary text-white rounded-[2.5rem] shadow-xl p-10 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 blur-[60px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
                <h2 className="text-2xl font-black mb-8 relative z-10">Chief Academic Officer</h2>
                <div className="flex items-center relative z-10">
                   <div className="h-20 w-20 bg-secondary rounded-3xl flex items-center justify-center text-3xl font-black text-primary mr-6 shadow-2xl">
                     {course.instructor.charAt(0)}
                   </div>
                   <div>
                     <h3 className="text-2xl font-black tracking-tight">{course.instructor}</h3>
                     <p className="text-secondary font-bold uppercase tracking-widest text-[10px]">Senior Market Strategist</p>
                   </div>
                </div>
                <p className="mt-8 text-slate-400 font-medium leading-relaxed relative z-10">
                  With deep institutional domain expertise in the Indian equity markets, {course.instructor} has mentored over 12,000 students toward disciplined trading proficiency.
                </p>
              </div>
            </div>

            {/* Enrollment Card - Direct WhatsApp Integration */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 sticky top-32 border border-slate-100">
                <div className="mb-8">
                  <span className="text-slate-400 text-sm font-bold line-through block mb-1">Standard Fee: ₹{course.originalPrice}</span>
                  <div className="flex items-end space-x-3">
                    <span className="text-5xl font-black text-primary tracking-tighter">₹{course.price}</span>
                    <span className="mb-2 bg-emerald-100 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Early Bird Offer</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleEnrollWhatsApp}
                  className="w-full bg-secondary text-primary py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-primary hover:text-white transition-all shadow-xl shadow-secondary/20 mb-6 flex items-center justify-center group"
                >
                  <MessageCircle className="h-5 w-5 mr-3 group-hover:scale-125 transition-transform" /> Enroll via WhatsApp
                </button>
                
                <div className="bg-slate-50 p-5 rounded-2xl mb-8 border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-1">Security Guarantee</p>
                  <p className="text-[9px] text-slate-500 text-center leading-relaxed">
                    Once you message us, our academic coordinators will provide the official banking details for registration.
                  </p>
                </div>
                
                <div className="space-y-4 border-t border-slate-100 pt-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Knowledge Access</span>
                    <span className="text-sm font-bold text-primary">Lifetime Support</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Medium</span>
                    <span className="text-sm font-bold text-primary">English / Hindi</span>
                  </div>
                   <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Certification</span>
                    <span className="text-sm font-bold text-primary">ISO Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetails;