import { mentors, type Mentor, type BookingSession, type MentorApplication } from '@/data/mentors';

// localStorage keys
const BOOKINGS_STORAGE_KEY = 'mentorsetu_bookings';
const APPLICATIONS_STORAGE_KEY = 'mentorsetu_applications';

// Initialize localStorage with mock data if empty
const initializeLocalStorage = () => {
  const existingBookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);
  if (!existingBookings) {
    const mockBookings: BookingSession[] = [
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
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(mockBookings));
  }
};

// Initialize localStorage with mock application data if empty
const initializeApplicationStorage = () => {
  const existingApplications = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
  if (!existingApplications) {
    const mockApplications: MentorApplication[] = [
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
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(mockApplications));
  }
};

// Initialize on module load
initializeLocalStorage();
initializeApplicationStorage();

// Helper functions for localStorage operations
const getBookingsFromStorage = (): BookingSession[] => {
  const bookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);
  return bookings ? JSON.parse(bookings) : [];
};

const saveBookingsToStorage = (bookings: BookingSession[]) => {
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
};

// Helper functions for application storage
const getApplicationsFromStorage = (): MentorApplication[] => {
  const applications = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
  return applications ? JSON.parse(applications) : [];
};

const saveApplicationsToStorage = (applications: MentorApplication[]) => {
  localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Mentor endpoints
  async getMentors(): Promise<Mentor[]> {
    await delay(500);
    return mentors;
  },

  async getMentorById(id: string): Promise<Mentor | null> {
    await delay(300);
    return mentors.find(mentor => mentor.id === id) || null;
  },

  async searchMentors(filters: {
    category?: string;
    minRating?: number;
    maxPrice?: number;
    query?: string;
  }): Promise<Mentor[]> {
    await delay(400);
    
    let filtered = [...mentors];
    
    if (filters.category) {
      filtered = filtered.filter(mentor => 
        mentor.expertise.some(exp => 
          exp.toLowerCase().includes(filters.category!.toLowerCase())
        )
      );
    }
    
    if (filters.minRating) {
      filtered = filtered.filter(mentor => mentor.rating >= filters.minRating!);
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(mentor => mentor.price <= filters.maxPrice!);
    }
    
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(mentor => 
        mentor.name.toLowerCase().includes(query) ||
        mentor.bio.toLowerCase().includes(query) ||
        mentor.expertise.some(exp => exp.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  },

  // Booking endpoints
  async bookSession(booking: Omit<BookingSession, 'id' | 'status'>): Promise<{ success: boolean; bookingId?: string; error?: string }> {
    await delay(800);
    
    // Simulate validation
    if (!booking.studentName || !booking.studentEmail || !booking.date || !booking.time) {
      return { success: false, error: 'Missing required fields' };
    }
    
    // Simulate random failure (10% chance)
    if (Math.random() < 0.1) {
      return { success: false, error: 'Booking slot is no longer available' };
    }
    
    const newBooking: BookingSession = {
      ...booking,
      id: `booking-${Date.now()}`,
      status: 'upcoming'
    };
    
    // Get current bookings from localStorage and add new one
    const currentBookings = getBookingsFromStorage();
    currentBookings.push(newBooking);
    saveBookingsToStorage(currentBookings);
    
    return { success: true, bookingId: newBooking.id };
  },

  async getBookings(studentEmail: string): Promise<BookingSession[]> {
    await delay(400);
    const allBookings = getBookingsFromStorage();
    return allBookings.filter(booking => booking.studentEmail === studentEmail);
  },

  async cancelBooking(bookingId: string): Promise<{ success: boolean; error?: string }> {
    await delay(500);
    
    const allBookings = getBookingsFromStorage();
    const bookingIndex = allBookings.findIndex(booking => booking.id === bookingId);
    
    if (bookingIndex === -1) {
      return { success: false, error: 'Booking not found' };
    }
    
    allBookings[bookingIndex].status = 'cancelled';
    saveBookingsToStorage(allBookings);
    
    return { success: true };
  },

  async rescheduleBooking(bookingId: string, newDate: string, newTime: string): Promise<{ success: boolean; error?: string }> {
    await delay(500);
    
    const allBookings = getBookingsFromStorage();
    const bookingIndex = allBookings.findIndex(booking => booking.id === bookingId);
    
    if (bookingIndex === -1) {
      return { success: false, error: 'Booking not found' };
    }
    
    if (allBookings[bookingIndex].status !== 'upcoming') {
      return { success: false, error: 'Only upcoming bookings can be rescheduled' };
    }
    
    allBookings[bookingIndex].date = newDate;
    allBookings[bookingIndex].time = newTime;
    saveBookingsToStorage(allBookings);
    
    return { success: true };
  },

  // Payment simulation
  async processPayment(amount: number, paymentMethod: string): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    await delay(1000);
    
    // Simulate payment failure (5% chance)
    if (Math.random() < 0.05) {
      return { success: false, error: 'Payment failed. Please try again.' };
    }
    
    return { 
      success: true, 
      transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` 
    };
  },

  // Mentor application endpoints
  async submitMentorApplication(application: Omit<MentorApplication, 'id' | 'status' | 'appliedAt'>): Promise<{ success: boolean; applicationId?: string; error?: string }> {
    await delay(1000);
    
    // Simulate validation
    if (!application.name || !application.email || !application.company || !application.position) {
      return { success: false, error: 'Missing required fields' };
    }
    
    // Simulate random failure (5% chance)
    if (Math.random() < 0.05) {
      return { success: false, error: 'Application submission failed. Please try again.' };
    }
    
    const newApplication: MentorApplication = {
      ...application,
      id: `app-${Date.now()}`,
      status: 'pending',
      appliedAt: new Date().toISOString().split('T')[0]
    };
    
    const currentApplications = getApplicationsFromStorage();
    currentApplications.push(newApplication);
    saveApplicationsToStorage(currentApplications);
    
    return { success: true, applicationId: newApplication.id };
  },

  async getMentorApplications(): Promise<MentorApplication[]> {
    await delay(400);
    return getApplicationsFromStorage();
  },

  async updateApplicationStatus(applicationId: string, status: 'approved' | 'rejected'): Promise<{ success: boolean; error?: string }> {
    await delay(500);
    
    const applications = getApplicationsFromStorage();
    const applicationIndex = applications.findIndex(app => app.id === applicationId);
    
    if (applicationIndex === -1) {
      return { success: false, error: 'Application not found' };
    }
    
    applications[applicationIndex].status = status;
    saveApplicationsToStorage(applications);
    
    return { success: true };
  }
};