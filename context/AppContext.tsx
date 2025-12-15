import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course, BlogPost, Lead, Sale } from '../types';

// Define User Interface
export interface User {
  username: string; // Used for matching Lead Owner
  role: 'admin' | 'agent';
  name: string; // Display name
}

interface AppContextType {
  courses: Course[];
  blogs: BlogPost[];
  leads: Lead[];
  sales: Sale[];
  user: User | null; // Auth State
  addCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  updateCourse: (course: Course) => void;
  addBlog: (blog: BlogPost) => void;
  addLead: (lead: Lead) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  deleteLead: (id: string) => void;
  addSale: (sale: Sale) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
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

const defaultLeads: Lead[] = [
  { id: '1', owner: 'Admin', name: 'Rahul Sharma', phone: '9876543210', email: 'rahul@test.com', status: 'New', source: 'Website', state: 'Maharashtra', date: '2023-10-25', interestedIn: 'Options Trading' },
  { id: '2', owner: 'Admin', name: 'Priya Singh', phone: '9876543211', email: 'priya@test.com', status: 'Interested', source: 'Facebook', state: 'Delhi', date: '2023-10-24', interestedIn: 'Technical Analysis' },
  { id: '3', owner: 'Sales1', name: 'Amit Patel', phone: '9876543212', email: 'amit@test.com', status: 'Closed Won', source: 'Referral', state: 'Gujarat', date: '2023-10-23', interestedIn: 'Bootcamp' },
  { id: '4', owner: 'Admin', name: 'Sneha Reddy', phone: '9876543213', email: 'sneha@test.com', status: 'Follow Up', source: 'Instagram', state: 'Karnataka', date: '2023-10-22', interestedIn: 'Options Trading', followUpDate: '2025-12-15' },
  { id: '5', owner: 'Sales2', name: 'Vikram Malhotra', phone: '9876543214', email: 'vikram@test.com', status: 'Free Trial', source: 'Website', state: 'Punjab', date: '2023-10-25', interestedIn: 'Swing Trading', followUpDate: '2025-12-15' },
];

const defaultSales: Sale[] = [
  { id: '101', leadId: '3', customerName: 'Amit Patel', courseTitle: 'Complete Stock Market Bootcamp', amount: 4999, date: new Date().toISOString().split('T')[0], paymentMethod: 'UPI' }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(defaultCourses);
  const [blogs, setBlogs] = useState<BlogPost[]>(defaultBlogs);
  const [leads, setLeads] = useState<Lead[]>(defaultLeads);
  const [sales, setSales] = useState<Sale[]>(defaultSales);
  const [user, setUser] = useState<User | null>(null);

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

  const addLead = (lead: Lead) => {
    setLeads([lead, ...leads]);
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
  };

  const deleteLead = (id: string) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  const addSale = (sale: Sale) => {
    setSales([sale, ...sales]);
  };

  // --- Auth Logic ---
  const login = (u: string, p: string): boolean => {
    // Hardcoded credentials for Demo
    if (u === 'admin' && p === 'admin123') {
      setUser({ username: 'Admin', role: 'admin', name: 'Administrator' });
      return true;
    }
    if (u === 'agent' && p === 'agent123') {
      // Mapping 'agent' login to 'Sales1' owner data for demo
      setUser({ username: 'Sales1', role: 'agent', name: 'Sales Agent 1' });
      return true;
    }
    if (u === 'agent2' && p === 'agent123') {
       setUser({ username: 'Sales2', role: 'agent', name: 'Sales Agent 2' });
       return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ 
      courses, blogs, leads, sales, user,
      addCourse, deleteCourse, updateCourse, addBlog,
      addLead, updateLeadStatus, deleteLead, addSale,
      login, logout
    }}>
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