import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { Star, Users, ArrowUpRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group bg-white rounded-3xl border border-slate-200 overflow-hidden card-hover flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
            {course.category}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex items-center space-x-1 text-secondary mb-4">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-bold text-primary">{course.rating}</span>
          <span className="text-slate-400 text-sm font-medium">({course.students} enrolled)</span>
        </div>

        <h3 className="text-2xl font-extrabold text-primary mb-3 leading-tight group-hover:text-secondary transition-colors">
          {course.title}
        </h3>
        <p className="text-slate-500 text-sm mb-8 line-clamp-2 leading-relaxed font-medium">
          {course.description}
        </p>
        
        <div className="mt-auto border-t border-slate-100 pt-8 flex items-center justify-between">
           <div>
             <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pricing</div>
             <div className="flex items-center space-x-2">
               <span className="text-2xl font-black text-primary">₹{course.price}</span>
               <span className="text-sm text-slate-300 line-through">₹{course.originalPrice}</span>
             </div>
           </div>
           
           <Link 
            to={`/courses/${course.id}`} 
            className="h-14 w-14 bg-slate-950 text-white rounded-2xl flex items-center justify-center hover:bg-secondary hover:text-primary transition-all shadow-lg"
           >
             <ArrowUpRight className="h-6 w-6" />
           </Link>
        </div>
      </div>
    </div>
  );
};