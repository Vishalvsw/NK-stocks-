
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  avatar: string;
}

/**
 * Interface for educational courses offered by the platform.
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  students: number;
  instructor: string;
  features: string[];
  curriculum: string[];
}

/**
 * Lead status types for CRM functionality.
 */
export type LeadStatus = 'New' | 'Follow Up' | 'Free Trial' | 'Closed Won' | 'Closed Lost';

/**
 * Interface for lead management in the Admin dashboard.
 */
export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  owner: string;
  status: LeadStatus;
  source: string;
  state: string;
  date: string;
}

/**
 * Interface for sales records.
 */
export interface Sale {
  id: string;
  leadId: string;
  amount: number;
  date: string;
  courseId: string;
}

/**
 * Interface for authenticated users (Admin/Agents).
 */
export interface User {
  username: string;
  name: string;
  role: 'admin' | 'agent';
}

/**
 * Interface for blog posts, including AI-generated ones.
 */
export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
}
