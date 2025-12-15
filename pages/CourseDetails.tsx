import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Clock, BarChart, Award, CheckCircle, PlayCircle, Lock, CreditCard } from 'lucide-react';

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { courses } = useApp();
  const navigate = useNavigate();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'method' | 'processing' | 'success'>('method');

  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl font-bold">Course not found</h2>
          <button onClick={() => navigate('/courses')} className="mt-4 text-secondary hover:underline">Back to courses</button>
        </div>
      </Layout>
    );
  }

  const handleEnroll = () => {
    setIsPaymentModalOpen(true);
    setPaymentStep('method');
  };

  const processPayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
    }, 2000);
  };

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen pb-20">
        {/* Header */}
        <div className="bg-slate-900 text-white py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="max-w-4xl">
               <span className="bg-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 inline-block">{course.category}</span>
               <h1 className="text-3xl md:text-5xl font-bold mb-4">{course.title}</h1>
               <p className="text-slate-300 text-lg mb-6 max-w-2xl">{course.description}</p>
               
               <div className="flex flex-wrap gap-6 text-sm text-slate-400">
                 <div className="flex items-center"><Clock className="h-4 w-4 mr-2" /> 10 Weeks Duration</div>
                 <div className="flex items-center"><BarChart className="h-4 w-4 mr-2" /> {course.category} Level</div>
                 <div className="flex items-center"><Award className="h-4 w-4 mr-2" /> Certificate Included</div>
               </div>
             </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
              {/* Features */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-6 text-slate-900">What you'll learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  <div className="flex items-start"><CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5" /><span>Risk Management Masterclass</span></div>
                  <div className="flex items-start"><CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5" /><span>Live Market Sessions</span></div>
                </div>
              </div>

              {/* Curriculum */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-6 text-slate-900">Course Curriculum</h2>
                <div className="space-y-4">
                  {course.curriculum.map((item, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center">
                        <div className="bg-secondary/10 text-secondary p-2 rounded-full mr-4">
                           <PlayCircle className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-slate-800">{item}</span>
                      </div>
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-6 text-slate-900">Your Instructor</h2>
                <div className="flex items-center">
                   <div className="h-16 w-16 bg-slate-200 rounded-full flex items-center justify-center text-xl font-bold text-slate-500 mr-4">
                     {course.instructor.charAt(0)}
                   </div>
                   <div>
                     <h3 className="text-xl font-bold">{course.instructor}</h3>
                     <p className="text-gray-500">Senior Market Analyst & Trader</p>
                   </div>
                </div>
                <p className="mt-4 text-gray-600">
                  With over 10 years of experience in the Indian Stock Market, {course.instructor} has trained thousands of students to become profitable traders.
                </p>
              </div>
            </div>

            {/* Sidebar Pricing - Appears first on mobile */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-gray-100">
                <div className="mb-6">
                  <span className="text-gray-500 text-sm line-through block">₹{course.originalPrice}</span>
                  <div className="flex items-center">
                    <span className="text-4xl font-bold text-slate-900">₹{course.price}</span>
                    <span className="ml-3 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">50% OFF</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleEnroll}
                  className="w-full bg-secondary text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-500/20 mb-4"
                >
                  Enroll Now
                </button>
                
                <p className="text-center text-xs text-gray-500 mb-6">30-Day Money-Back Guarantee</p>
                
                <div className="space-y-3 border-t border-gray-100 pt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Access</span>
                    <span className="font-medium">Lifetime</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Language</span>
                    <span className="font-medium">English / Hindi</span>
                  </div>
                   <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Certificate</span>
                    <span className="font-medium">Yes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative animate-fade-in">
            <button 
              onClick={() => setIsPaymentModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>

            {paymentStep === 'method' && (
              <>
                <h3 className="text-xl font-bold mb-6">Select Payment Method</h3>
                <div className="space-y-3">
                  <button onClick={processPayment} className="w-full border border-gray-200 p-4 rounded-xl flex items-center justify-between hover:border-secondary hover:bg-green-50 transition-all">
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-2 rounded-lg mr-3"><span className="font-bold text-purple-600">UPI</span></div>
                      <span className="font-medium">PhonePe / GPay / Paytm</span>
                    </div>
                  </button>
                  <button onClick={processPayment} className="w-full border border-gray-200 p-4 rounded-xl flex items-center justify-between hover:border-secondary hover:bg-green-50 transition-all">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3"><CreditCard className="h-5 w-5 text-blue-600"/></div>
                      <span className="font-medium">Credit / Debit Card</span>
                    </div>
                  </button>
                </div>
                <div className="mt-6 flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                   <span className="text-sm text-gray-600">Total Payable:</span>
                   <span className="text-lg font-bold">₹{course.price}</span>
                </div>
              </>
            )}

            {paymentStep === 'processing' && (
              <div className="text-center py-10">
                <div className="animate-spin h-12 w-12 border-4 border-secondary border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold">Processing Payment...</h3>
                <p className="text-gray-500 text-sm">Please do not close this window.</p>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="text-center py-6">
                <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h3>
                <p className="text-gray-600 mb-6">Welcome to the course. You will receive an email shortly.</p>
                <button 
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CourseDetails;