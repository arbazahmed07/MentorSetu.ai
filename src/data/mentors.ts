export interface Mentor {
  id: string;
  name: string;
  expertise: string[];
  bio: string;
  rating: number;
  reviewCount: number;
  price: number;
  experience: string;
  avatar: string;
  company: string;
  location: string;
  sessions: number;
  responseTime: string;
  languages: string[];
  aboutFull: string;
  education: string;
}

export const mentors: Mentor[] = [
  {
    id: "1",
    name: "Sarah Chen",
    expertise: ["Product Management", "Startup Strategy", "User Research"],
    bio: "Ex-Google PM with 8+ years helping startups scale from 0 to 100M users.",
    aboutFull: "I'm a seasoned Product Manager with over 8 years of experience at companies like Google, Stripe, and various early-stage startups. I've led product teams through hypergrowth phases, launched products used by millions, and helped numerous entrepreneurs validate and scale their ideas.\n\nMy expertise spans across product strategy, user research, go-to-market planning, and team building. I'm passionate about helping the next generation of product leaders navigate the challenges of building products people love.",
    rating: 4.9,
    reviewCount: 127,
    price: 150,
    experience: "8 years",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    company: "Ex-Google, Current Startup Advisor",
    location: "San Francisco, CA",
    sessions: 245,
    responseTime: "2 hours",
    languages: ["English", "Mandarin"],
    education: "MBA Stanford, BS Computer Science"
  },
  {
    id: "2", 
    name: "Marcus Rodriguez",
    expertise: ["Software Engineering", "System Design", "Career Growth"],
    bio: "Senior Software Engineer at Netflix with expertise in distributed systems and mentoring junior developers.",
    aboutFull: "I'm a Senior Software Engineer at Netflix with 10+ years of experience building scalable systems that serve millions of users globally. I've worked across the full stack, from frontend React applications to backend microservices and distributed systems.\n\nI'm passionate about mentoring developers at all stages of their careers, from bootcamp graduates to senior engineers looking to level up to staff+ roles. I can help with technical skills, system design, career planning, and navigating the tech industry.",
    rating: 4.8,
    reviewCount: 89,
    price: 120,
    experience: "10 years",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    company: "Netflix",
    location: "Los Angeles, CA",
    sessions: 156,
    responseTime: "4 hours",
    languages: ["English", "Spanish"],
    education: "MS Computer Science, BS Software Engineering"
  },
  {
    id: "3",
    name: "Dr. Priya Patel",
    expertise: ["Data Science", "Machine Learning", "AI Strategy"],
    bio: "Data Science Director at Uber with PhD in Machine Learning. Specializes in ML strategy and team leadership.",
    aboutFull: "I'm a Data Science Director at Uber with a PhD in Machine Learning from MIT. I lead a team of 20+ data scientists and ML engineers working on recommendation systems, demand forecasting, and autonomous vehicle algorithms.\n\nI love helping aspiring data scientists break into the field and supporting experienced practitioners transition into leadership roles. My mentoring covers technical skills, career strategy, and the business side of ML.",
    rating: 4.9,
    reviewCount: 203,
    price: 180,
    experience: "12 years",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    company: "Uber",
    location: "Seattle, WA", 
    sessions: 189,
    responseTime: "6 hours",
    languages: ["English", "Hindi", "Gujarati"],
    education: "PhD Machine Learning MIT, MS Statistics"
  },
  {
    id: "4",
    name: "James Thompson",
    expertise: ["UX Design", "Design Systems", "Design Leadership"],
    bio: "Head of Design at Airbnb, leading design for core product experiences with 15+ years in design.",
    aboutFull: "I'm the Head of Design at Airbnb where I lead design for our core host and guest experiences. With 15+ years in design, I've worked at companies like Apple, IDEO, and several successful startups.\n\nI'm passionate about helping designers at all levels improve their craft, from junior designers learning the fundamentals to senior designers transitioning into leadership roles. I can help with portfolio reviews, design strategy, user research, and design team management.",
    rating: 4.7,
    reviewCount: 156,
    price: 160,
    experience: "15 years",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    company: "Airbnb",
    location: "San Francisco, CA",
    sessions: 234,
    responseTime: "3 hours",
    languages: ["English"],
    education: "MFA Design Stanford, BA Fine Arts"
  },
  {
    id: "5",
    name: "Angela Kim",
    expertise: ["Marketing", "Growth Hacking", "Content Strategy"],
    bio: "VP of Growth at Shopify, expert in performance marketing and scaling e-commerce brands.",
    aboutFull: "I'm the VP of Growth at Shopify where I lead our global marketing efforts and growth initiatives. I've helped scale multiple e-commerce companies from startup to IPO, with expertise in performance marketing, content strategy, and conversion optimization.\n\nI mentor marketing professionals, entrepreneurs, and business owners on growth strategies, digital marketing, brand building, and team scaling. Whether you're launching your first campaign or optimizing existing funnels, I can help accelerate your growth.",
    rating: 4.8,
    reviewCount: 142,
    price: 140,
    experience: "9 years",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    company: "Shopify",
    location: "Toronto, Canada",
    sessions: 187,
    responseTime: "5 hours",
    languages: ["English", "Korean"],
    education: "MBA Marketing, BS Business Administration"
  },
  {
    id: "6",
    name: "David Wilson",
    expertise: ["DevOps", "Cloud Architecture", "Infrastructure"],
    bio: "Principal DevOps Engineer at AWS, specializing in cloud infrastructure and automation at scale.",
    aboutFull: "I'm a Principal DevOps Engineer at AWS with 12+ years of experience building and managing cloud infrastructure at massive scale. I've helped hundreds of companies migrate to the cloud and optimize their infrastructure for performance, security, and cost.\n\nI mentor engineers looking to break into DevOps, cloud architecture, and site reliability engineering. I can help with AWS/Azure/GCP certifications, infrastructure as code, monitoring and observability, and DevOps culture transformation.",
    rating: 4.9,
    reviewCount: 98,
    price: 170,
    experience: "12 years",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    company: "Amazon Web Services",
    location: "Austin, TX",
    sessions: 123,
    responseTime: "4 hours",
    languages: ["English"],
    education: "MS Computer Engineering, BS Electrical Engineering"
  }
];

export interface BookingSession {
  id: string;
  mentorId: string;
  mentorName: string;
  studentName: string;
  studentEmail: string;
  date: string;
  time: string;
  reason: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  amount: number;
  sessionType: 'video' | 'chat' | 'phone';
}

export const mockBookings: BookingSession[] = [
  {
    id: "booking-1",
    mentorId: "1",
    mentorName: "Sarah Chen",
    studentName: "John Doe",
    studentEmail: "john@example.com",
    date: "2024-02-15",
    time: "14:00",
    reason: "Product strategy for my SaaS startup",
    status: "upcoming",
    amount: 150,
    sessionType: "video"
  },
  {
    id: "booking-2", 
    mentorId: "2",
    mentorName: "Marcus Rodriguez",
    studentName: "John Doe",
    studentEmail: "john@example.com",
    date: "2024-02-10",
    time: "16:00",
    reason: "System design interview preparation",
    status: "completed",
    amount: 120,
    sessionType: "video"
  },
  {
    id: "booking-3",
    mentorId: "3",
    mentorName: "Dr. Priya Patel",
    studentName: "John Doe", 
    studentEmail: "john@example.com",
    date: "2024-02-20",
    time: "10:00",
    reason: "Career transition to data science",
    status: "upcoming",
    amount: 180,
    sessionType: "video"
  }
];

export interface MentorApplication {
  id: string;
  name: string;
  email: string;
  company: string;
  position: string;
  experience: string;
  expertise: string[];
  bio: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  hourlyRate: number;
  availability: string;
  languages: string[];
  timezone: string;
  motivation: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
}

export const mockApplications: MentorApplication[] = [
  {
    id: "app-1",
    name: "Alex Johnson",
    email: "alex@example.com",
    company: "Microsoft",
    position: "Senior Software Engineer",
    experience: "7 years",
    expertise: ["React", "Node.js", "TypeScript", "System Design"],
    bio: "Passionate full-stack developer with experience in building scalable web applications.",
    linkedinUrl: "https://linkedin.com/in/alexjohnson",
    hourlyRate: 130,
    availability: "Weekends and evenings",
    languages: ["English"],
    timezone: "PST",
    motivation: "I want to help junior developers navigate their careers and avoid common pitfalls.",
    status: "pending",
    appliedAt: "2024-02-01"
  }
];