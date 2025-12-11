import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { Star, Users, BookOpen } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      <div className="relative">
        <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
          {course.category}
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-1 text-yellow-500 text-sm">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-semibold">{course.rating}</span>
            <span className="text-gray-400">({course.students})</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="mt-auto">
           <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-4">
             <div className="flex items-center space-x-2 text-sm text-gray-500">
               <Users className="h-4 w-4" />
               <span>{course.students} students</span>
             </div>
             <div className="flex items-center space-x-2 text-sm text-gray-500">
                <BookOpen className="h-4 w-4" />
                <span>{course.curriculum.length} modules</span>
             </div>
           </div>

           <div className="flex items-center justify-between">
             <div>
               <span className="text-lg font-bold text-secondary">₹{course.price}</span>
               <span className="text-sm text-gray-400 line-through ml-2">₹{course.originalPrice}</span>
             </div>
             <Link to={`/courses/${course.id}`} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors">
               View Details
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
};