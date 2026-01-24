
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course, Lead, Sale, User, Blog, LeadStatus } from '../types';

interface AppContextType {
  courses: Course[];
  leads: Lead[];
  sales: Sale[];
  user: User | null;
  blogs: Blog[];
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  addLead: (lead: Lead) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  deleteLead: (id: string) => void;
  addBlog: (blog: Blog) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const defaultCourses: Course[] = [
  { 
    id: '1', 
    title: 'Mastering Technical Analysis', 
    description: 'Learn to identify trends, chart patterns, and technical indicators for profitable trading.', 
    price: 4999, 
    originalPrice: 9999, 
    image: 'https://images.unsplash.com/photo-1611974717535-7c8022d99d4e?auto=format&fit=crop&w=800&q=80', 
    category: 'Technical Analysis', 
    rating: 4.8, 
    students: 1540, 
    instructor: 'Narendra Kumar', 
    features: ['Live Charting Sessions', 'Risk Management Focus', 'Cheat Sheets Included'], 
    curriculum: ['Intro to Market Dynamics', 'Mastering Support & Resistance', 'Indicator Deep Dive'] 
  },
  { 
    id: '2', 
    title: 'Options Alpha Strategies', 
    description: 'Advanced hedging and non-directional strategies for consistent monthly income.', 
    price: 8499, 
    originalPrice: 16999, 
    image: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&w=800&q=80', 
    category: 'Options', 
    rating: 4.9, 
    students: 920, 
    instructor: 'Narendra Kumar', 
    features: ['Iron Condor Mastery', 'Adjustment Logic', 'Expiry Special Setup'], 
    curriculum: ['Understanding Option Greeks', 'Delta Neutral Trading', 'Firefighting Adjustments'] 
  },
  { 
    id: '3', 
    title: 'Price Action Pro', 
    description: 'Naked chart trading strategies for modern Indian markets.', 
    price: 5999, 
    originalPrice: 12000, 
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80', 
    category: 'Advanced', 
    rating: 4.7, 
    students: 450, 
    instructor: 'Narendra Kumar', 
    features: ['Scalping Techniques', 'Gap Analysis', 'Institutional Flows'], 
    curriculum: ['The Psychology of Price', 'Supply and Demand Zones', 'Traps and Reversals'] 
  }
];

// Default demo data for leads and sales
const defaultLeads: Lead[] = [
  { id: 'l1', name: 'Amit Sharma', phone: '9876543210', email: 'amit@example.com', owner: 'admin', status: 'Closed Won', source: 'Facebook Ads', state: 'Maharashtra', date: new Date().toISOString().split('T')[0] },
  { id: 'l2', name: 'Priya Singh', phone: '9123456789', email: 'priya@example.com', owner: 'agent', status: 'Follow Up', source: 'Website Enquiry', state: 'Delhi', date: new Date().toISOString().split('T')[0] },
  { id: 'l3', name: 'Rahul Verma', phone: '9988776655', email: 'rahul@example.com', owner: 'admin', status: 'New', source: 'Google Search', state: 'Karnataka', date: new Date().toISOString().split('T')[0] }
];

const defaultSales: Sale[] = [
  { id: 's1', leadId: 'l1', amount: 4999, date: new Date().toISOString().split('T')[0], courseId: '1' }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(defaultCourses);
  const [leads, setLeads] = useState<Lead[]>(defaultLeads);
  const [sales, setSales] = useState<Sale[]>(defaultSales);
  const [user, setUser] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const addCourse = (course: Course) => setCourses([course, ...courses]);
  const updateCourse = (course: Course) => setCourses(courses.map(c => c.id === course.id ? course : c));
  const deleteCourse = (id: string) => setCourses(courses.filter(c => c.id !== id));

  const addLead = (lead: Lead) => setLeads([lead, ...leads]);
  const updateLeadStatus = (id: string, status: LeadStatus) => 
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
  const deleteLead = (id: string) => setLeads(leads.filter(l => l.id !== id));

  const addBlog = (blog: Blog) => setBlogs([blog, ...blogs]);

  // Handle user authentication
  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin123') {
      setUser({ username: 'admin', name: 'Narendra Kumar', role: 'admin' });
      return true;
    }
    if (username === 'agent' && password === 'agent123') {
      setUser({ username: 'agent', name: 'Sales Associate', role: 'agent' });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{ 
      courses, leads, sales, user, blogs,
      addCourse, updateCourse, deleteCourse,
      addLead, updateLeadStatus, deleteLead,
      addBlog, login, logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
