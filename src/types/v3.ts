export type UserRole = 'super_admin' | 'event_manager' | 'employee' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  phone?: string;
  twoFactorEnabled?: boolean;
}

export interface CustomerCRM {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsappStatus: 'connected' | 'opted_out' | 'pending';
  totalBookings: number;
  totalSpent: number;
  status: 'VIP' | 'Regular' | 'Lead' | 'Churned';
  lastContactDate: string;
  contactHistory: {
    id: string;
    date: string;
    type: 'call' | 'whatsapp' | 'email' | 'meeting';
    summary: string;
    byEmployee: string;
  }[];
  followUpNotes: {
    id: string;
    date: string;
    note: string;
    author: string;
  }[];
  paymentStatus: 'clear' | 'advance_paid' | 'overdue' | 'pending';
}

export interface Booking {
  id: string;
  bookingCode: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  eventType: 'Wedding' | 'Corporate' | 'Concert' | 'Birthday' | 'Private Luxury Party';
  eventDate: string;
  venueName: string;
  venueAddress: string;
  guestCount: number;
  packageId?: string;
  packageName?: string;
  totalAmount: number;
  advancePaid: number;
  remainingAmount: number;
  paymentStatus: 'paid' | 'advance_paid' | 'pending' | 'overdue';
  status: 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled' | 'Lead';
  assignedEmployees: string[];
  customRequirements?: string;
  createdAt: string;
}

export interface EventPackage {
  id: string;
  name: string;
  category: string;
  tagline: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  popular?: boolean;
  features: string[];
  includedServices: string[];
}

export interface EventService {
  id: string;
  name: string;
  category: 'Decoration' | 'Lighting' | 'Audio Visual' | 'Catering' | 'Photography' | 'Stage Design';
  description: string;
  startingPrice: number;
  image: string;
  highlights: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Wedding' | 'Stage' | 'Lighting' | 'Floral' | 'Corporate';
  imageUrl: string;
  webpUrl: string;
  compressedSize: string;
  likes: number;
  date: string;
  venue: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Wedding Tips' | 'Decoration Ideas' | 'Lighting' | 'Event Planning' | 'Flower Decoration';
  summary: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  seoKeywords: string[];
  views: number;
}

export interface Review {
  id: string;
  customerName: string;
  customerRole?: string;
  avatar?: string;
  rating: number;
  date: string;
  eventCategory: string;
  comment: string;
  isGoogleVerified?: boolean;
}

export interface DailyTask {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Todo' | 'In Progress' | 'Done';
  assignedTo: string;
  dueDate: string;
}

export interface Employee {
  id: string;
  name: string;
  role: 'Event Director' | 'Lead Decorator' | 'Sound Specialist' | 'Lighting Architect' | 'Client Success';
  email: string;
  phone: string;
  avatar: string;
  status: 'Active' | 'On Event Site' | 'On Leave';
  salary: number;
  attendanceRate: number; // percentage e.g. 98
  assignedEventsCount: number;
  dailyTasks: DailyTask[];
}

export interface PaymentTransaction {
  id: string;
  bookingId: string;
  customerName: string;
  amount: number;
  paymentType: 'Advance' | 'Remaining Balance' | 'Full Payment';
  gateway: 'Razorpay' | 'Stripe' | 'UPI QR Code';
  transactionRef: string;
  date: string;
  status: 'Success' | 'Processing' | 'Failed';
  receiptUrl: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'booking' | 'payment' | 'crm' | 'employee' | 'system';
  read: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  gstNumber: string;
  companyLogoUrl: string;
  issueDate: string;
  dueDate: string;
  lineItems: {
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }[];
  subtotal: number;
  gstAmount: number;
  discount: number;
  totalAmount: number;
  advancePaid: number;
  amountDue: number;
  paymentMethod: string;
  qrCodeUrl: string;
  signatureUrl: string;
  status: 'Paid' | 'Partially Paid' | 'Overdue';
}

export interface AiRecommendationRequest {
  budget: number;
  guests: number;
  eventType: 'Wedding' | 'Corporate Gala' | 'Concert Stage' | 'Luxury Birthday';
  venueType: 'Indoor Banquet' | 'Outdoor Lawn' | 'Beachfront Resort' | 'Palace Courtyard';
  colorPreference?: string;
}

export interface AiRecommendationResult {
  suggestedStyle: string;
  lightingTheme: string;
  floralArrangement: string;
  stageArchitecture: string;
  recommendedPackageName: string;
  estimatedPrice: number;
  matchScore: number;
  keyFeatures: string[];
  aiReasoning: string;
}
