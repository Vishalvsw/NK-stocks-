import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { CourseCard } from '../components/CourseCard';
import { useApp } from '../context/AppContext';
import { ArrowRight, ShieldCheck, Award, TrendingUp, MonitorPlay } from 'lucide-react';

const Home = () => {
  const { courses } = useApp();
  const topCourses = courses.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1611974765270-ca12586343bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Master the Stock Market with <span className="text-secondary">NK Stock Solutions</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl">
              Learn practical strategies, technical analysis, and risk management from expert traders. Start your journey to financial freedom today.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/courses" className="bg-secondary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors text-center">
                Explore Courses
              </Link>
              <Link to="/services" className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/20 transition-colors text-center">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-white shadow-lg -mt-10 relative z-20 container mx-auto rounded-xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8 border border-gray-100">
        <div className="text-center">
          <div className="text-3xl font-bold text-slate-900">10k+</div>
          <div className="text-gray-500 text-sm">Students Trained</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-slate-900">50+</div>
          <div className="text-gray-500 text-sm">Expert Courses</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-slate-900">4.8/5</div>
          <div className="text-gray-500 text-sm">Average Rating</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-slate-900">24/7</div>
          <div className="text-gray-500 text-sm">Support</div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-wider uppercase">Why Us</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">Why Choose NK Stock Solutions?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <MonitorPlay className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Live Market Training</h3>
              <p className="text-gray-600">Don't just learn theory. Watch our mentors trade live in the market and learn practical execution.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
               <div className="w-14 h-14 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Curriculum</h3>
              <p className="text-gray-600">Our courses are designed by NISM certified professionals with years of experience.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
               <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Certification</h3>
              <p className="text-gray-600">Get industry-recognized certificates upon completion to boost your resume and career.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Courses */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-secondary font-bold tracking-wider uppercase">Start Learning</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2">Popular Courses</h2>
            </div>
            <Link to="/courses" className="hidden md:flex items-center text-secondary font-semibold hover:text-green-700">
              View All Courses <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/courses" className="inline-flex items-center bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold">
              View All Courses <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mt-2">What Our Students Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
              <div className="flex text-yellow-500 mb-4">★★★★★</div>
              <p className="text-slate-300 mb-6 italic">"I was losing money consistently until I took the Technical Analysis course. Now I trade with logic, not emotion."</p>
              <div className="flex items-center">
                <img src="https://picsum.photos/50/50?random=10" alt="Student" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h4 className="font-bold">Rohan Mehta</h4>
                  <span className="text-xs text-slate-400">Delhi, India</span>
                </div>
              </div>
            </div>
             <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
              <div className="flex text-yellow-500 mb-4">★★★★★</div>
              <p className="text-slate-300 mb-6 italic">"The Options hedging strategies are a game changer. Worth every penny. The live support is excellent."</p>
              <div className="flex items-center">
                <img src="https://picsum.photos/50/50?random=11" alt="Student" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h4 className="font-bold">Sarah Williams</h4>
                  <span className="text-xs text-slate-400">Mumbai, India</span>
                </div>
              </div>
            </div>
             <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
              <div className="flex text-yellow-500 mb-4">★★★★★</div>
              <p className="text-slate-300 mb-6 italic">"Complete beginner to confident investor in 3 months. The step-by-step approach is perfect."</p>
              <div className="flex items-center">
                <img src="https://picsum.photos/50/50?random=12" alt="Student" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h4 className="font-bold">Arjun Singh</h4>
                  <span className="text-xs text-slate-400">Bangalore, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-secondary to-green-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Trading Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">Join 10,000+ students and start learning the skills that matter.</p>
          <Link to="/courses" className="bg-white text-green-600 px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all">
            Browse All Courses
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;