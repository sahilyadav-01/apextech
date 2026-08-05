export interface Product {
  id: string;
  name: string;
  sku: string;
  brand: string;
  category: 'computing' | 'sensors' | 'daq' | 'interface-cards' | 'test-measurement' | 'industrial';
  subcategory: string;
  shortDescription: string;
  description: string;
  image: string;
  price: string;
  availability: 'In Stock' | '3-4 Weeks' | '6-8 Weeks' | 'Contact Partner';
  specifications: Record<string, string | number>;
  features: string[];
  tags: string[];
  datasheet?: string;
  brochure?: string;
  usedInSolutions: string[];
  usedInIndustries: string[];
}

export interface CaseStudy {
  title: string;
  client: string;
  challenge: string;
  implementation: string;
  results: string;
  image?: string;
}

export interface Solution {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  problem: string;
  solutionText: string;
  image: string;
  workflow: string[];
  productsUsed: string[];
  industries: string[];
  caseStudies: CaseStudy[];
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  image: string;
  solutions: string[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'datasheet' | 'brochure' | 'whitepaper' | 'video' | 'news';
  category: string;
  description: string;
  fileUrl: string;
  date: string;
}

export interface QuoteItem {
  productId: string;
  quantity: number;
}

export interface QuoteRequest {
  id: string;
  name: string;
  company: string;
  designation?: string;
  email: string;
  phone: string;
  country: string;
  application: string;
  projectDetails: string;
  timeline: string;
  items: QuoteItem[];
  date: string;
  status: 'Pending' | 'Reviewed' | 'Approved' | 'Declined';
}
