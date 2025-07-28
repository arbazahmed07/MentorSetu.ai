import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock, CheckCircle, ArrowRight, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                MentorSetu.ai
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/mentors">
                <Button variant="ghost" className="text-sm">Browse Mentors</Button>
              </Link>
              <Link to="/become-mentor">
                <Button variant="outline" className="text-sm">Become a Mentor</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" className="text-sm">Dashboard</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col gap-2">
                <Link to="/mentors" className="w-full">
                  <Button variant="ghost" className="w-full justify-start text-sm">Browse Mentors</Button>
                </Link>
                <Link to="/become-mentor" className="w-full">
                  <Button variant="outline" className="w-full justify-start text-sm">Become a Mentor</Button>
                </Link>
                <Link to="/dashboard" className="w-full">
                  <Button variant="outline" className="w-full justify-start text-sm">Dashboard</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:30px_30px] sm:bg-[size:50px_50px]" />
        <div className="container mx-auto text-center relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
              Connect with World-Class Mentors
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Accelerate your career with personalized guidance from industry experts. 
              Book 1:1 sessions with top professionals from leading companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg sm:max-w-none mx-auto">
              <Link to="/mentors" className="w-full sm:w-auto">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Find a Mentor
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Link to="/mentors" className="w-full sm:w-auto">
                <Button variant="cta" size="lg" className="w-full sm:w-auto">
                  Become a Mentor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">1,000+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Expert Mentors</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">50,000+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Sessions Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">4.9/5</div>
              <div className="text-sm sm:text-base text-muted-foreground">Average Rating</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">24h</div>
              <div className="text-sm sm:text-base text-muted-foreground">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Why Choose MentorSetu.ai?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              We connect you with the right mentors to accelerate your professional growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center space-y-4 p-4 sm:p-6 rounded-lg border bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Verified Experts</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                All mentors are thoroughly vetted professionals from top companies like Google, Netflix, and Airbnb
              </p>
            </div>
            
            <div className="text-center space-y-4 p-4 sm:p-6 rounded-lg border bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="mx-auto w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Flexible Scheduling</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Book sessions that fit your schedule with mentors across different time zones
              </p>
            </div>
            
            <div className="text-center space-y-4 p-4 sm:p-6 rounded-lg border bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="mx-auto w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Personalized Matching</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Our AI matches you with mentors based on your goals, experience, and industry preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 sm:py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Get started in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center space-y-4">
              <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Browse Mentors</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Explore our curated list of industry experts and find the perfect mentor for your needs
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Book a Session</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Schedule a 1:1 session at your convenience and make secure payment through our platform
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gradient-hero text-primary-foreground rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Grow Your Career</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Get personalized guidance, actionable insights, and accelerate your professional growth
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-soft border">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                "Sarah helped me transition from engineering to product management. Her insights were invaluable!"
              </p>
              <div className="text-sm sm:text-base font-semibold">Alex Chen, PM at Startup</div>
            </div>
            
            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-soft border">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                "Marcus's system design guidance got me the senior engineer role at my dream company."
              </p>
              <div className="text-sm sm:text-base font-semibold">Lisa Park, Senior SWE</div>
            </div>
            
            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-soft border">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                "The personalized career advice from Dr. Patel was exactly what I needed to break into ML."
              </p>
              <div className="text-sm sm:text-base font-semibold">Michael Rodriguez, Data Scientist</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with expert mentorship
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg sm:max-w-none mx-auto">
            <Link to="/mentors" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 bg-card border-t">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-4 col-span-1 sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <span className="text-base sm:text-lg font-bold">MentorSetu.ai</span>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                Connecting ambitious professionals with world-class mentors
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm sm:text-base font-semibold">For Mentees</h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div><Link to="/mentors" className="text-muted-foreground hover:text-primary">Browse Mentors</Link></div>
                <div><Link to="#" className="text-muted-foreground hover:text-primary">How it Works</Link></div>
                <div><Link to="#" className="text-muted-foreground hover:text-primary">Pricing</Link></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm sm:text-base font-semibold">For Mentors</h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div><Link to="#" className="text-muted-foreground hover:text-primary">Become a Mentor</Link></div>
                <div><Link to="#" className="text-muted-foreground hover:text-primary">Mentor Resources</Link></div>
                <div><Link to="#" className="text-muted-foreground hover:text-primary">Success Stories</Link></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm sm:text-base font-semibold">Company</h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div><Link to="#" className="text-muted-foreground hover:text-primary">About Us</Link></div>
                <div><Link to="#" className="text-muted-foreground hover:text-primary">Contact</Link></div>
                <div><Link to="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></div>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-muted-foreground">
            <p className="text-xs sm:text-sm">&copy; 2025 MentorSetu.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
