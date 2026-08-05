import { create } from 'zustand';
import type {
  User,
  CustomerCRM,
  Booking,
  EventPackage,
  EventService,
  GalleryItem,
  BlogPost,
  Review,
  Employee,
  PaymentTransaction,
  AppNotification,
  Invoice,
  AiRecommendationRequest,
  AiRecommendationResult,
  DailyTask
} from '../types/v3';


interface V3State {
  // Current Auth User
  currentUser: User;
  
  // Data lists
  customers: CustomerCRM[];
  bookings: Booking[];
  packages: EventPackage[];
  services: EventService[];
  galleryItems: GalleryItem[];
  blogs: BlogPost[];
  reviews: Review[];
  employees: Employee[];
  payments: PaymentTransaction[];
  notifications: AppNotification[];
  invoices: Invoice[];
  
  // Modals & UI Controls
  isSearchOpen: boolean;
  isAiModalOpen: boolean;
  isInvoiceModalOpen: boolean;
  activeInvoice: Invoice | null;
  activeBookingForPayment: Booking | null;
  isPaymentModalOpen: boolean;

  // Real-time socket simulation
  socketConnected: boolean;
  unreadNotificationCount: number;

  // Search
  searchQuery: string;

  // Actions
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setAiModalOpen: (open: boolean) => void;
  setPaymentModalOpen: (open: boolean, booking?: Booking | null) => void;
  setInvoiceModalOpen: (open: boolean, invoice?: Invoice | null) => void;

  // Employee Management
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  removeEmployee: (id: string) => void;
  updateEmployeeSalary: (id: string, newSalary: number) => void;
  toggleAttendance: (id: string) => void;
  assignTaskToEmployee: (employeeId: string, taskTitle: string, priority: 'High' | 'Medium' | 'Low') => void;

  // CRM Actions
  addCustomerNote: (customerId: string, note: string) => void;
  updateWhatsappStatus: (customerId: string, status: CustomerCRM['whatsappStatus']) => void;

  // Booking Actions
  createBooking: (newBooking: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>) => Booking;
  updateBookingStatus: (id: string, status: Booking['status']) => void;

  // Invoice & Payment
  generateInvoiceForBooking: (bookingId: string) => Invoice;
  processPayment: (bookingId: string, amount: number, gateway: 'Razorpay' | 'Stripe' | 'UPI QR Code') => void;

  // AI Planner
  generateAiRecommendation: (req: AiRecommendationRequest) => AiRecommendationResult;

  // Notifications
  addNotification: (title: string, message: string, type: AppNotification['type']) => void;
  markNotificationsAsRead: () => void;
}

const INITIAL_USER: User = {
  id: 'usr-1',
  name: 'Victoria Vance',
  email: 'victoria@apexevents.com',
  role: 'super_admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  phone: '+1 (555) 019-2834',
  twoFactorEnabled: true,
};

const INITIAL_PACKAGES: EventPackage[] = [
  {
    id: 'pkg-1',
    name: 'Royal Heritage Wedding',
    category: 'Wedding',
    tagline: 'Palatial luxury decor, 3D mapping lights & 5-tier royal stage',
    price: 25000,
    rating: 4.9,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    popular: true,
    features: ['Palace Glass Stage Architecture', 'Imported Dutch Floral Accents', 'DMX Synchronized Intelligent Lighting', 'Dedicated Royal Butler Concierge'],
    includedServices: ['Stage Setup', 'Lighting', 'Floral Arch', 'Sound System', 'VIP Dining Layout']
  },
  {
    id: 'pkg-2',
    name: 'Tesla Executive Gala',
    category: 'Corporate',
    tagline: 'Ultra-modern glassmorphic staging with kinetic LED screens',
    price: 18500,
    rating: 4.8,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    popular: false,
    features: ['4K Curved Seamless LED Video Wall', 'Wireless Conference Audio Array', 'Branded Laser Light Show', 'Executive Lounge Pods'],
    includedServices: ['LED Screens', 'Stage Setup', 'Laser Show', 'Audio Visual', 'VIP Seating']
  },
  {
    id: 'pkg-3',
    name: 'Starlight Symphony Concert',
    category: 'Concert Stage',
    tagline: 'Stadium-grade trussing, haze cannons & line-array acoustics',
    price: 32000,
    rating: 5.0,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    popular: true,
    features: ['Line Array 40kW Sound Rig', 'CO2 & Pyrotechnic Effects', 'Heavy Duty Aluminum Stage Trussing', 'Backstage Artist Suite'],
    includedServices: ['Audio Systems', 'Trussing', 'Pyrotechnics', 'Stage Setup', 'Security Barriers']
  },
  {
    id: 'pkg-4',
    name: 'Opulent Milestone Soirée',
    category: 'Private Luxury Party',
    tagline: 'Custom champagne fountain, floral ceiling canopy & live jazz lounge',
    price: 12000,
    rating: 4.9,
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    popular: false,
    features: ['Overhead Hanging Floral Cloud', 'Ambient Candlelight & Fairy Lights', 'Mixologist Bar Setup', 'Photo Booth Mirror'],
    includedServices: ['Floral Canopy', 'Bar Setup', 'Ambient Lights', 'Photobooth']
  }
];

const INITIAL_SERVICES: EventService[] = [
  {
    id: 'srv-1',
    name: 'Architectural Lighting & DMX Lasers',
    category: 'Lighting',
    description: 'Custom programmable mood lighting, moving heads, wireless uplighting and laser displays.',
    startingPrice: 2500,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    highlights: ['DMX Controllers', 'Custom Color Palettes', 'Architectural Facade Illumination']
  },
  {
    id: 'srv-2',
    name: 'Exotic Floral Sculptures & Canopies',
    category: 'Decoration',
    description: 'Fresh orchid, rose, and hydrangea installs with crystal chandeliers and silk draping.',
    startingPrice: 3500,
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80',
    highlights: ['Hydrated Fresh Cut Flowers', 'Custom Color Match', 'Overhead Installations']
  },
  {
    id: 'srv-3',
    name: 'Acoustic Sound Rigs & Concert Audio',
    category: 'Audio Visual',
    description: 'Crystal-clear acoustic systems tuned by professional audio engineers.',
    startingPrice: 2800,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
    highlights: ['Digital Mixing Consoles', 'Wireless Shure Mics', 'Subwoofer Array']
  },
  {
    id: 'srv-4',
    name: 'Gourmet Artisanal Catering & Bar',
    category: 'Catering',
    description: '5-star culinary experiences with live live cooking stations and signature mocktails/cocktails.',
    startingPrice: 6500,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
    highlights: ['Michelin-trained Chefs', 'Customized Menus', 'Molecular Mixology']
  }
];

const INITIAL_CUSTOMERS: CustomerCRM[] = [
  {
    id: 'cust-1',
    name: 'Alexander Sterling',
    email: 'alexander.sterling@sterlingcorp.com',
    phone: '+1 (555) 234-8901',
    whatsappStatus: 'connected',
    totalBookings: 4,
    totalSpent: 84000,
    status: 'VIP',
    lastContactDate: '2026-08-01',
    contactHistory: [
      { id: 'ch-1', date: '2026-08-01', type: 'whatsapp', summary: 'Sent V3 Quotation for Annual Gala', byEmployee: 'Victoria Vance' },
      { id: 'ch-2', date: '2026-07-28', type: 'meeting', summary: 'Site walkthrough at Grand Hyatt Ballroom', byEmployee: 'Marcus Vance' }
    ],
    followUpNotes: [
      { id: 'fn-1', date: '2026-08-02', note: 'Prefers champagne gold lighting and velvet seating.', author: 'Victoria Vance' }
    ],
    paymentStatus: 'clear'
  },
  {
    id: 'cust-2',
    name: 'Sophia Montgomery',
    email: 'sophia.mont@luxuryweddings.io',
    phone: '+1 (555) 987-6543',
    whatsappStatus: 'connected',
    totalBookings: 2,
    totalSpent: 45000,
    status: 'VIP',
    lastContactDate: '2026-08-04',
    contactHistory: [
      { id: 'ch-3', date: '2026-08-04', type: 'call', summary: 'Confirmed flower canopy arrangements.', byEmployee: 'Elena Rostova' }
    ],
    followUpNotes: [
      { id: 'fn-2', date: '2026-08-04', note: 'Advance paid via Razorpay UPI. Needs invoice PDF copy.', author: 'Elena Rostova' }
    ],
    paymentStatus: 'advance_paid'
  },
  {
    id: 'cust-3',
    name: 'David & Rachel Miller',
    email: 'rmiller@techpulse.org',
    phone: '+1 (555) 456-7890',
    whatsappStatus: 'pending',
    totalBookings: 1,
    totalSpent: 18500,
    status: 'Regular',
    lastContactDate: '2026-07-20',
    contactHistory: [
      { id: 'ch-4', date: '2026-07-20', type: 'email', summary: 'Inquired about corporate product release.', byEmployee: 'David Chen' }
    ],
    followUpNotes: [],
    paymentStatus: 'pending'
  }
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-1',
    bookingCode: 'APX-2026-8801',
    customerId: 'cust-1',
    customerName: 'Alexander Sterling',
    customerPhone: '+1 (555) 234-8901',
    customerEmail: 'alexander.sterling@sterlingcorp.com',
    eventType: 'Corporate',
    eventDate: '2026-09-15',
    venueName: 'The Plaza Grand Ballroom',
    venueAddress: '767 5th Ave, New York, NY 10153',
    guestCount: 450,
    packageId: 'pkg-2',
    packageName: 'Tesla Executive Gala',
    totalAmount: 28500,
    advancePaid: 15000,
    remainingAmount: 13500,
    paymentStatus: 'advance_paid',
    status: 'In Progress',
    assignedEmployees: ['Marcus Vance', 'Elena Rostova'],
    customRequirements: 'Includes 4K curved LED walls and custom branded staging.',
    createdAt: '2026-07-25'
  },
  {
    id: 'bk-2',
    bookingCode: 'APX-2026-8802',
    customerId: 'cust-2',
    customerName: 'Sophia Montgomery',
    customerPhone: '+1 (555) 987-6543',
    customerEmail: 'sophia.mont@luxuryweddings.io',
    eventType: 'Wedding',
    eventDate: '2026-10-10',
    venueName: 'Belmond Hotel Splendido',
    venueAddress: 'Salita Baratta 16, Portofino, Italy',
    guestCount: 300,
    packageId: 'pkg-1',
    packageName: 'Royal Heritage Wedding',
    totalAmount: 42000,
    advancePaid: 42000,
    remainingAmount: 0,
    paymentStatus: 'paid',
    status: 'Confirmed',
    assignedEmployees: ['Victoria Vance', 'David Chen', 'Sarah Jenkins'],
    customRequirements: 'Fresh white orchid waterfall and DMX synchronized chandeliers.',
    createdAt: '2026-08-01'
  },
  {
    id: 'bk-3',
    bookingCode: 'APX-2026-8803',
    customerId: 'cust-3',
    customerName: 'David & Rachel Miller',
    customerPhone: '+1 (555) 456-7890',
    customerEmail: 'rmiller@techpulse.org',
    eventType: 'Private Luxury Party',
    eventDate: '2026-08-25',
    venueName: 'Skyline Penthouse 88',
    venueAddress: '432 Park Ave, New York, NY 10022',
    guestCount: 120,
    packageId: 'pkg-4',
    packageName: 'Opulent Milestone Soirée',
    totalAmount: 14500,
    advancePaid: 5000,
    remainingAmount: 9500,
    paymentStatus: 'advance_paid',
    status: 'In Progress',
    assignedEmployees: ['Sarah Jenkins'],
    createdAt: '2026-08-03'
  }
];

const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'Marcus Vance',
    role: 'Event Director',
    email: 'marcus@apexevents.com',
    phone: '+1 (555) 301-4492',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    status: 'On Event Site',
    salary: 9500,
    attendanceRate: 99,
    assignedEventsCount: 12,
    dailyTasks: [
      { id: 't-1', title: 'Inspect stage trussing at Plaza Ballroom', priority: 'High', status: 'In Progress', assignedTo: 'Marcus Vance', dueDate: 'Today' },
      { id: 't-2', title: 'Client briefing for Sterling Corp', priority: 'Medium', status: 'Todo', assignedTo: 'Marcus Vance', dueDate: 'Tomorrow' }
    ]
  },
  {
    id: 'emp-2',
    name: 'Elena Rostova',
    role: 'Lead Decorator',
    email: 'elena@apexevents.com',
    phone: '+1 (555) 602-1188',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    status: 'Active',
    salary: 8200,
    attendanceRate: 97,
    assignedEventsCount: 9,
    dailyTasks: [
      { id: 't-3', title: 'Order fresh orchids from Dutch importer', priority: 'High', status: 'Done', assignedTo: 'Elena Rostova', dueDate: 'Today' }
    ]
  },
  {
    id: 'emp-3',
    name: 'David Chen',
    role: 'Lighting Architect',
    email: 'david@apexevents.com',
    phone: '+1 (555) 773-9901',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    status: 'Active',
    salary: 7800,
    attendanceRate: 98,
    assignedEventsCount: 14,
    dailyTasks: [
      { id: 't-4', title: 'Test DMX wireless lighting rig', priority: 'Medium', status: 'In Progress', assignedTo: 'David Chen', dueDate: 'Today' }
    ]
  },
  {
    id: 'emp-4',
    name: 'Sarah Jenkins',
    role: 'Sound Specialist',
    email: 'sarah@apexevents.com',
    phone: '+1 (555) 441-2099',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    status: 'On Event Site',
    salary: 7500,
    attendanceRate: 95,
    assignedEventsCount: 8,
    dailyTasks: []
  }
];

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Grand Palace Chandelier Stage',
    category: 'Wedding',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    webpUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    compressedSize: '184 KB (WebP)',
    likes: 342,
    date: '2026-07-15',
    venue: 'Belmond Hotel Splendido'
  },
  {
    id: 'gal-2',
    title: 'Cyberpunk Corporate LED Arena',
    category: 'Corporate',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
    webpUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
    compressedSize: '210 KB (WebP)',
    likes: 289,
    date: '2026-06-20',
    venue: 'The Plaza Grand Ballroom'
  },
  {
    id: 'gal-3',
    title: 'Starlight Symphony Open Air Stage',
    category: 'Stage',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=80',
    webpUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=80',
    compressedSize: '195 KB (WebP)',
    likes: 412,
    date: '2026-05-10',
    venue: 'Central Park Outdoor Arena'
  },
  {
    id: 'gal-4',
    title: 'Rose & Gold Cascading Floral Canopy',
    category: 'Floral',
    imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=80',
    webpUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=80',
    compressedSize: '162 KB (WebP)',
    likes: 520,
    date: '2026-07-28',
    venue: 'Skyline Penthouse 88'
  }
];

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: '10 Secrets to Planning a Royal Palace Wedding in 2026',
    slug: 'secrets-royal-palace-wedding-2026',
    category: 'Wedding Tips',
    summary: 'Discover how top event architects design crystal chandeliers, 3D mapping lights, and floral waterfalls.',
    content: 'Planning a royal wedding requires precision lighting, spatial geometry, and acoustics. In this comprehensive guide, we cover structural stage design, imported floral hydration techniques, and ambient DMX lighting synchronization.',
    author: 'Victoria Vance',
    date: '2026-08-01',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    tags: ['Wedding', 'Luxury Decor', 'Palace Venue', 'Royal Staging'],
    seoKeywords: ['royal wedding decor 2026', 'luxury event planning', 'palace stage decoration'],
    views: 1420
  },
  {
    id: 'blog-2',
    title: 'Transforming Corporate Galas with Kinetic LED & Lasers',
    slug: 'corporate-galas-kinetic-led-lasers',
    category: 'Lighting',
    summary: 'Learn how Tesla and Apple style staging creates unforgettable product unveilings and gala evenings.',
    content: 'Corporate events in 2026 demand ultra-high resolution LED screens, synchronized haze cannons, and custom laser branding. We break down the technical setup behind our signature galas.',
    author: 'David Chen',
    date: '2026-07-22',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    tags: ['Corporate', 'LED Wall', 'Laser Lighting', 'Product Launch'],
    seoKeywords: ['corporate gala tech', 'stage LED video wall', 'event lighting architecture'],
    views: 980
  },
  {
    id: 'blog-3',
    title: 'Sustainable Floral Design: Hydration & Freshness Masterclass',
    slug: 'sustainable-floral-design-masterclass',
    category: 'Flower Decoration',
    summary: 'How to keep thousands of imported roses and orchids blooming for 48+ hours in warm climates.',
    content: 'Floral preservation is both an art and a biochemical science. Discover eco-friendly water retention foam, stem sealing, and humidity management for massive ceiling installations.',
    author: 'Elena Rostova',
    date: '2026-06-30',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
    tags: ['Floral Decor', 'Sustainability', 'Hydrangea', 'Ceiling Canopy'],
    seoKeywords: ['wedding floral arrangements', 'fresh flower preservation event', 'sustainable decor'],
    views: 1150
  }
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Countess Eleanor de Valois',
    customerRole: 'Destination Wedding Client',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '2026-07-29',
    eventCategory: 'Royal Heritage Wedding',
    comment: 'Apex Events turned our Portofino estate into a fairy tale. The 3D lighting mapping and fresh floral waterfall took our guests’ breath away!',
    isGoogleVerified: true
  },
  {
    id: 'rev-2',
    customerName: 'Marcus Vance Sr.',
    customerRole: 'VP Communications, Sterling Corp',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '2026-07-18',
    eventCategory: 'Corporate Gala',
    comment: 'Flawless execution. The 4K curved video wall and instant WhatsApp live coordination kept 500 executives seamless from start to finish.',
    isGoogleVerified: true
  }
];

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'New Booking Request',
    message: 'Sophia Montgomery confirmed advance payment for Royal Heritage Wedding.',
    time: '10 mins ago',
    type: 'booking',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Razorpay Payment Received',
    message: '₹15,000 received for Invoice APX-INV-2026-901.',
    time: '1 hour ago',
    type: 'payment',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Staff On Site',
    message: 'Marcus Vance marked status: "On Event Site" at Plaza Ballroom.',
    time: '2 hours ago',
    type: 'employee',
    read: true
  }
];

const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'APX-INV-2026-901',
    bookingId: 'bk-1',
    customerName: 'Alexander Sterling',
    customerEmail: 'alexander.sterling@sterlingcorp.com',
    customerPhone: '+1 (555) 234-8901',
    customerAddress: '767 5th Ave, New York, NY 10153',
    gstNumber: '18AAACA12341Z9',
    companyLogoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80',
    issueDate: '2026-08-01',
    dueDate: '2026-08-15',
    lineItems: [
      { description: 'Tesla Executive Gala Staging & Curved LED Wall', quantity: 1, unitPrice: 18500, amount: 18500 },
      { description: 'DMX Synchronized Laser & Haze System', quantity: 1, unitPrice: 5000, amount: 5000 },
      { description: 'VIP Executive Lounge Pods Installation', quantity: 1, unitPrice: 5000, amount: 5000 }
    ],
    subtotal: 28500,
    gstAmount: 5130, // 18%
    discount: 1000,
    totalAmount: 32630,
    advancePaid: 15000,
    amountDue: 17630,
    paymentMethod: 'Razorpay UPI / Bank Wire',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=apexevents@upi&pn=ApexEvents&am=17630',
    signatureUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=200&q=80',
    status: 'Partially Paid'
  }
];

export const useV3Store = create<V3State>((set, get) => ({
  currentUser: INITIAL_USER,
  customers: INITIAL_CUSTOMERS,
  bookings: INITIAL_BOOKINGS,
  packages: INITIAL_PACKAGES,
  services: INITIAL_SERVICES,
  galleryItems: INITIAL_GALLERY,
  blogs: INITIAL_BLOGS,
  reviews: INITIAL_REVIEWS,
  employees: INITIAL_EMPLOYEES,
  payments: [
    {
      id: 'pay-1',
      bookingId: 'bk-1',
      customerName: 'Alexander Sterling',
      amount: 15000,
      paymentType: 'Advance',
      gateway: 'Razorpay',
      transactionRef: 'pay_RZP_99812401',
      date: '2026-07-26',
      status: 'Success',
      receiptUrl: '#receipt-pdf'
    }
  ],
  notifications: INITIAL_NOTIFICATIONS,
  invoices: INITIAL_INVOICES,

  isSearchOpen: false,
  isAiModalOpen: false,
  isInvoiceModalOpen: false,
  activeInvoice: null,
  activeBookingForPayment: null,
  isPaymentModalOpen: false,

  socketConnected: true,
  unreadNotificationCount: 2,
  searchQuery: '',

  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setAiModalOpen: (open) => set({ isAiModalOpen: open }),
  setPaymentModalOpen: (open, booking = null) => set({ isPaymentModalOpen: open, activeBookingForPayment: booking }),
  setInvoiceModalOpen: (open, invoice = null) => set({ isInvoiceModalOpen: open, activeInvoice: invoice }),

  addEmployee: (newEmpData) => {
    const id = `emp-${Date.now()}`;
    const newEmp: Employee = {
      ...newEmpData,
      id,
      attendanceRate: 100,
      assignedEventsCount: 0,
      dailyTasks: []
    };
    set((state) => ({
      employees: [newEmp, ...state.employees]
    }));
    get().addNotification('New Employee Added', `${newEmp.name} joined as ${newEmp.role}.`, 'employee');
  },

  removeEmployee: (id) => {
    const emp = get().employees.find(e => e.id === id);
    set((state) => ({
      employees: state.employees.filter((e) => e.id !== id)
    }));
    if (emp) {
      get().addNotification('Employee Removed', `${emp.name} has been removed from staff list.`, 'employee');
    }
  },

  updateEmployeeSalary: (id, newSalary) => {
    set((state) => ({
      employees: state.employees.map((e) => e.id === id ? { ...e, salary: newSalary } : e)
    }));
  },

  toggleAttendance: (id) => {
    set((state) => ({
      employees: state.employees.map((e) => {
        if (e.id === id) {
          const nextStatus = e.status === 'Active' ? 'On Event Site' : e.status === 'On Event Site' ? 'On Leave' : 'Active';
          return { ...e, status: nextStatus };
        }
        return e;
      })
    }));
  },

  assignTaskToEmployee: (employeeId, taskTitle, priority) => {
    const taskId = `task-${Date.now()}`;
    set((state) => ({
      employees: state.employees.map((emp) => {
        if (emp.id === employeeId) {
          const newTask: DailyTask = {
            id: taskId,
            title: taskTitle,
            priority,
            status: 'Todo',
            assignedTo: emp.name,
            dueDate: 'Today'
          };
          return { ...emp, dailyTasks: [newTask, ...emp.dailyTasks] };
        }
        return emp;
      })
    }));
  },

  addCustomerNote: (customerId, note) => {
    const noteObj = {
      id: `note-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      note,
      author: get().currentUser.name
    };
    set((state) => ({
      customers: state.customers.map((c) => c.id === customerId ? { ...c, followUpNotes: [noteObj, ...c.followUpNotes] } : c)
    }));
  },

  updateWhatsappStatus: (customerId, status) => {
    set((state) => ({
      customers: state.customers.map((c) => c.id === customerId ? { ...c, whatsappStatus: status } : c)
    }));
  },

  createBooking: (newBookingData) => {
    const id = `bk-${Date.now()}`;
    const bookingCode = `APX-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      ...newBookingData,
      id,
      bookingCode,
      createdAt: new Date().toISOString().split('T')[0]
    };
    set((state) => ({
      bookings: [newBooking, ...state.bookings]
    }));

    get().addNotification('New Booking Created', `Booking ${bookingCode} for ${newBooking.customerName} created.`, 'booking');

    // Auto generate invoice
    get().generateInvoiceForBooking(id);

    return newBooking;
  },

  updateBookingStatus: (id, status) => {
    set((state) => ({
      bookings: state.bookings.map((b) => b.id === id ? { ...b, status } : b)
    }));
  },

  generateInvoiceForBooking: (bookingId) => {
    const booking = get().bookings.find((b) => b.id === bookingId);
    const existing = get().invoices.find((i) => i.bookingId === bookingId);
    if (existing) return existing;

    const invId = `inv-${Date.now()}`;
    const invNum = `APX-INV-2026-${Math.floor(100 + Math.random() * 900)}`;

    const subtotal = booking ? booking.totalAmount : 20000;
    const gstAmount = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + gstAmount;
    const advancePaid = booking ? booking.advancePaid : 0;
    const amountDue = totalAmount - advancePaid;

    const newInvoice: Invoice = {
      id: invId,
      invoiceNumber: invNum,
      bookingId,
      customerName: booking ? booking.customerName : 'Valued Customer',
      customerEmail: booking ? booking.customerEmail : 'customer@example.com',
      customerPhone: booking ? booking.customerPhone : '+1 555-000-0000',
      customerAddress: booking ? booking.venueAddress : 'Executive Suite Venue',
      gstNumber: '18AAACA99991Z5',
      companyLogoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      lineItems: [
        { description: booking?.packageName || 'Custom Enterprise Event Package', quantity: 1, unitPrice: subtotal, amount: subtotal }
      ],
      subtotal,
      gstAmount,
      discount: 0,
      totalAmount,
      advancePaid,
      amountDue,
      paymentMethod: 'Razorpay UPI / Stripe',
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=apexevents@upi&pn=ApexEvents&am=${amountDue}`,
      signatureUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=200&q=80',
      status: advancePaid >= totalAmount ? 'Paid' : advancePaid > 0 ? 'Partially Paid' : 'Overdue'
    };

    set((state) => ({
      invoices: [newInvoice, ...state.invoices]
    }));

    return newInvoice;
  },

  processPayment: (bookingId, amount, gateway) => {
    const booking = get().bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const newAdvance = booking.advancePaid + amount;
    const newRemaining = Math.max(0, booking.totalAmount - newAdvance);
    const newStatus: Booking['paymentStatus'] = newRemaining === 0 ? 'paid' : 'advance_paid';

    set((state) => ({
      bookings: state.bookings.map((b) => b.id === bookingId ? { ...b, advancePaid: newAdvance, remainingAmount: newRemaining, paymentStatus: newStatus } : b),
      payments: [
        {
          id: `pay-${Date.now()}`,
          bookingId,
          customerName: booking.customerName,
          amount,
          paymentType: newRemaining === 0 ? 'Full Payment' : 'Advance',
          gateway,
          transactionRef: `tx_${gateway.toLowerCase()}_${Math.random().toString(36).substring(2, 9)}`,
          date: new Date().toISOString().split('T')[0],
          status: 'Success',
          receiptUrl: '#receipt-pdf'
        },
        ...state.payments
      ]
    }));

    // Update corresponding invoice
    set((state) => ({
      invoices: state.invoices.map((inv) => {
        if (inv.bookingId === bookingId) {
          const updatedAdvance = inv.advancePaid + amount;
          const updatedDue = Math.max(0, inv.totalAmount - updatedAdvance);
          return {
            ...inv,
            advancePaid: updatedAdvance,
            amountDue: updatedDue,
            status: updatedDue === 0 ? 'Paid' : 'Partially Paid'
          };
        }
        return inv;
      })
    }));

    get().addNotification(
      'Payment Received',
      `₹${amount.toLocaleString()} received via ${gateway} for ${booking.customerName}.`,
      'payment'
    );
  },

  generateAiRecommendation: (req) => {
    const budget = req.budget || 20000;
    const guests = req.guests || 250;
    
    let style = 'Modern Luxury Glassmorphic & Crystal Elegance';
    let lighting = 'DMX Synchronized Warm Amber & Gold Halo Uplighting';
    let flowers = 'Imported Avalanche Roses, White Hydrangeas & Hanging Eucalyptus';
    let stage = 'Elevated Hexagonal Glass Stage with 3D Holographic Backdrop';
    let packageName = 'Royal Heritage Wedding';
    let estPrice = 25000;

    if (req.eventType === 'Corporate Gala') {
      style = 'Futuristic High-Tech Executive Staging';
      lighting = 'Laser Projection & Kinetic Moving Head Beam Arrays';
      flowers = 'Minimalist Orchid Stems with Brushed Metal Vases';
      stage = 'Curved 4K Seamless Video Wall with LED Floor Tiles';
      packageName = 'Tesla Executive Gala';
      estPrice = 18500;
    } else if (req.eventType === 'Concert Stage') {
      style = 'Stadium Power Acoustic & Lighting Array';
      lighting = 'Heavy Truss Strobes, Laser Cannons & Haze FX';
      flowers = 'Architectural Pampas Grass & Industrial Mesh Accents';
      stage = 'Heavy Duty Aluminum concert Trussing (12m Height)';
      packageName = 'Starlight Symphony Concert';
      estPrice = 32000;
    } else if (req.eventType === 'Luxury Birthday') {
      style = 'Opulent Candlelight & Rose Gold Soirée';
      lighting = 'Warm Edison Bulbs, Candle Clusters & Fairy Canopy';
      flowers = 'Blush Pink Peonies, Spray Roses & Hanging Wisteria';
      stage = 'Velvet Curved Lounge Pods & Mirror Photo Backdrop';
      packageName = 'Opulent Milestone Soirée';
      estPrice = 12000;
    }

    if (budget < estPrice) {
      estPrice = Math.max(budget, 8000);
    }

    return {
      suggestedStyle: style,
      lightingTheme: lighting,
      floralArrangement: flowers,
      stageArchitecture: stage,
      recommendedPackageName: packageName,
      estimatedPrice: estPrice,
      matchScore: 98,
      keyFeatures: [
        `Tailored specifically for ${guests} guests at ${req.venueType}`,
        'Includes DMX smart light control and real-time color shifts',
        'Automatic temperature-controlled fresh flower hydration',
        'Dedicated event director and WhatsApp live support'
      ],
      aiReasoning: `Based on your budget of $${budget.toLocaleString()} and guest count of ${guests}, our AI recommendation matrix selected ${packageName} as the optimal fit. It provides maximum visual impact per square foot for ${req.venueType}.`
    };
  },

  addNotification: (title, message, type) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      type,
      read: false
    };
    set((state) => ({
      notifications: [newNotif, ...state.notifications],
      unreadNotificationCount: state.unreadNotificationCount + 1
    }));
  },

  markNotificationsAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadNotificationCount: 0
    }));
  }
}));
