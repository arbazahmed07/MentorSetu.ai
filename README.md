# MentorSetu.ai 🚀

A modern mentorship platform connecting ambitious professionals with world-class mentors. Built with React, TypeScript, and Tailwind CSS.

![MentorSetu.ai](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop)

## ✨ Features

### For Mentees
- **Browse Expert Mentors** - Discover verified professionals from top companies
- **Smart Filtering** - Find mentors by expertise, rating, price, and availability
- **Flexible Booking** - Schedule 1:1 sessions with video, chat, or phone options
- **Dashboard Management** - Track bookings, reschedule sessions, and view history
- **Secure Payments** - Integrated payment processing with multiple options

### For Mentors
- **Easy Application** - Streamlined mentor application process
- **Profile Management** - Showcase expertise and set availability
- **Flexible Scheduling** - Control when and how you mentor
- **Earnings Tracking** - Monitor sessions and revenue

### Platform Features
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Real-time Updates** - Live booking status and notifications
- **Search & Discovery** - Advanced filtering and search capabilities
- **User Experience** - Modern UI with smooth animations and transitions

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: Tailwind CSS, shadcn/ui components
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner toast notifications

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mentee-bridge-ai.git
   cd mentee-bridge-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── BookingModal.tsx
│   └── RescheduleModal.tsx
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── MentorDirectory.tsx
│   ├── MentorProfile.tsx
│   ├── StudentDashboard.tsx
│   └── BecomeMentor.tsx
├── utils/              # Utility functions
│   └── api.ts         # API simulation layer
├── data/              # Mock data and types
│   └── mentors.ts
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries
└── styles/            # Global styles
```

## 🎯 Key Components

### API Layer (`src/utils/api.ts`)
- Simulates backend API with localStorage persistence
- Handles mentors, bookings, and applications
- Includes realistic delays and error simulation

### Pages
- **LandingPage**: Marketing homepage with features and testimonials
- **MentorDirectory**: Browse and filter mentors
- **MentorProfile**: Detailed mentor information and booking
- **StudentDashboard**: Manage bookings and view session history
- **BecomeMentor**: Application form for new mentors

### Components
- **BookingModal**: Multi-step booking process (form → payment → confirmation)
- **RescheduleModal**: Reschedule existing bookings
- **UI Components**: Consistent design system using shadcn/ui

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_APP_NAME=MentorSetu.ai
VITE_API_URL=http://localhost:3001
```

### Tailwind Configuration

The project uses a custom Tailwind configuration with:
- Custom color palette
- Gradient utilities
- Animation utilities
- Typography styles

## 📊 Data Management

The application uses localStorage to simulate a backend:

- **Mentors**: Static data with detailed profiles
- **Bookings**: User session bookings with status tracking
- **Applications**: Mentor applications with approval workflow

Data persists across browser sessions and includes:
- Booking management (create, cancel, reschedule)
- Application submissions
- Session history

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Green (#10B981)
- **Accent**: Purple gradients
- **Neutral**: Gray scale

### Typography
- **Headers**: Bold, gradient text effects
- **Body**: Readable font sizes with proper contrast
- **UI Elements**: Consistent spacing and sizing

### Components
- Consistent button styles and variants
- Card-based layouts with hover effects
- Responsive grid systems
- Smooth animations and transitions

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🌟 Features in Detail

### Booking System
- Multi-step booking process
- Payment integration simulation
- Session type selection (video/chat/phone)
- Calendar-based scheduling
- Confirmation and email notifications

### Dashboard
- Upcoming and past sessions
- Session statistics
- Quick actions (reschedule, cancel)
- Real-time updates

### Search and Filtering
- Text search across mentor profiles
- Filter by expertise, rating, price
- Sort by relevance and rating
- Responsive results grid

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/mentee-bridge-ai/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🎯 Roadmap

- [ ] Real backend API integration
- [ ] User authentication system
- [ ] Video calling integration
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] AI-powered mentor matching
- [ ] Multi-language support

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the icon library
- [Unsplash](https://unsplash.com/) for the beautiful images

---
