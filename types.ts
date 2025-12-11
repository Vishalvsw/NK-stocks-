export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  category: 'Beginner' | 'Intermediate' | 'Advanced' | 'Options' | 'Technical Analysis';
  image: string;
  instructor: string;
  rating: number;
  students: number;
  curriculum: string[];
  features: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  avatar: string;
}

export enum PaymentMethod {
  UPI = 'UPI',
  CARD = 'CARD',
  NETBANKING = 'NETBANKING'
}