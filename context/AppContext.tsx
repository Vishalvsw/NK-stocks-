import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course, BlogPost } from '../types';

interface AppContextType {
  courses: Course[];
  blogs: BlogPost[];
  addCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  updateCourse: (course: Course) => void;
  addBlog: (blog: BlogPost) => void;
}

const defaultCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Stock Market Bootcamp',
    description: 'From zero to hero. Learn everything about equity, derivatives, and fundamental analysis.',
    price: 4999,
    originalPrice: 9999,
    category: 'Beginner',
    image: 'https://picsum.photos/800/600?random=1',
    instructor: 'Rajesh Kumar',
    rating: 4.8,
    students: 1250,
    curriculum: ['Basics of Stock Market', 'Fundamental Analysis', 'Technical Analysis', 'Futures & Options'],
    features: ['Lifetime Access', 'Certificate of Completion', 'Live Q&A']
  },
  {
    id: '2',
    title: 'Master Technical Analysis',
    description: 'Learn to read charts like a pro. Candlesticks, indicators, and price action mastery.',
    price: 2499,
    originalPrice: 4999,
    category: 'Technical Analysis',
    image: 'https://picsum.photos/800/600?random=2',
    instructor: 'Sneha Gupta',
    rating: 4.9,
    students: 850,
    curriculum: ['Candlestick Patterns', 'Support & Resistance', 'Indicators (RSI, MACD)', 'Trading Strategies'],
    features: ['20+ Hours Video', 'Practice Assignments']
  },
  {
    id: '3',
    title: 'Options Trading Strategies',
    description: 'Advanced strategies for hedging and income generation using Call and Put options.',
    price: 7999,
    originalPrice: 15000,
    category: 'Options',
    image: 'https://picsum.photos/800/600?random=3',
    instructor: 'Amit Verma',
    rating: 4.7,
    students: 500,
    curriculum: ['Option Greeks', 'Hedging Strategies', 'Expiry Day Trading', 'Risk Management'],
    features: ['Live Trading Sessions', 'Strategy Builder Tool']
  }
];

const defaultBlogs: BlogPost[] = [
  {
    id: '1',
    title: '5 Rules of Risk Management',
    excerpt: 'Protect your capital with these essential risk management rules every trader must know.',
    content: 'Risk management is the key to survival in the stock market...',
    author: 'Finstock Team',
    date: 'Oct 12, 2023',
    image: 'https://picsum.photos/800/600?random=4',
    category: 'Education'
  },
  {
    id: '2',
    title: 'Nifty 50: Market Outlook for 2024',
    excerpt: 'An in-depth analysis of where the Indian benchmark index is heading in the next fiscal year.',
    content: 'The Nifty 50 has shown resilience despite global headwinds...',
    author: 'Rajesh Kumar',
    date: 'Nov 05, 2023',
    image: 'https://picsum.photos/800/600?random=5',
    category: 'Analysis'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>(defaultCourses);
  const [blogs, setBlogs] = useState<BlogPost[]>(defaultBlogs);

  const addCourse = (course: Course) => {
    setCourses([...courses, course]);
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  const addBlog = (blog: BlogPost) => {
    setBlogs([blog, ...blogs]);
  };

  return (
    <AppContext.Provider value={{ courses, blogs, addCourse, deleteCourse, updateCourse, addBlog }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};