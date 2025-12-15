import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { CourseCard } from '../components/CourseCard';
import { useApp } from '../context/AppContext';
import { Search, Filter } from 'lucide-react';

const Courses = () => {
  const { courses } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Beginner', 'Technical Analysis', 'Options', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="bg-slate-50 py-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Explore Our Courses</h1>

          {/* Search & Filter */}
          <div className="bg-white p-4 rounded-xl shadow-sm mb-10 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
               {categories.map(cat => (
                 <button
                   key={cat}
                   onClick={() => setSelectedCategory(cat)}
                   className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                     selectedCategory === cat 
                       ? 'bg-secondary text-white' 
                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>

          {/* Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl text-gray-500">No courses found matching your criteria.</h3>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All')}}
                className="mt-4 text-secondary hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;