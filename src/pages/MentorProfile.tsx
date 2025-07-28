import { useState, useEffect, useCallback } from "react";
  import { useParams, Link } from "react-router-dom";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Separator } from "@/components/ui/separator";
  import { 
    Sparkles, Star, MapPin, Clock, DollarSign, Users, 
    Calendar, MessageCircle, Phone, Video, ArrowLeft,
    CheckCircle, Globe, Award, Menu, X
  } from "lucide-react";
  import { api } from "@/utils/api";
  import { type Mentor } from "@/data/mentors";
  import BookingModal from "@/components/BookingModal";

  const MentorProfile = () => {
    const { id } = useParams<{ id: string }>();
    const [mentor, setMentor] = useState<Mentor | null>(null);
    const [loading, setLoading] = useState(true);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showMobileBooking, setShowMobileBooking] = useState(false);

    useEffect(() => {
      if (id) {
        loadMentor(id);
      }
    }, [id]);

    const loadMentor = async (mentorId: string) => {
      try {
        const data = await api.getMentorById(mentorId);
        setMentor(data);
      } catch (error) {
        console.error("Failed to load mentor:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleBookingSuccess = useCallback(() => {
      // This will be useful if we want to update mentor stats after booking
      // For now, it's a placeholder for future functionality
    }, []);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading mentor profile...</p>
          </div>
        </div>
      );
    }

    if (!mentor) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-4 max-w-md mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold">Mentor Not Found</h2>
            <p className="text-muted-foreground">The mentor you're looking for doesn't exist.</p>
            <Link to="/mentors" className="inline-block">
              <Button variant="outline">Back to Directory</Button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent truncate">
                MentorSetu.ai
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/mentors">
                <Button variant="ghost" className="flex items-center gap-2" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Directory
                </Button>
              </Link>
              <Link to="/become-mentor">
                <Button variant="ghost" size="sm">Become a Mentor</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
            </div>

            {/* Mobile/Tablet Navigation */}
            <div className="flex items-center space-x-2 lg:hidden">
              <Link to="/mentors" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t bg-background">
              <div className="container mx-auto px-4 py-3 space-y-2">
                <Link to="/mentors" className="block sm:hidden">
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Directory
                  </Button>
                </Link>
                <Link to="/become-mentor" className="block">
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    Become a Mentor
                  </Button>
                </Link>
                <Link to="/dashboard" className="block">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </nav>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-4 sm:space-y-6">
              {/* Profile Header */}
              <Card className="bg-gradient-card shadow-medium">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-soft flex-shrink-0"
                    />
                    <div className="flex-1 space-y-3 text-center sm:text-left min-w-0">
                      <div>
                        <h1 className="text-2xl sm:text-3xl font-bold truncate">{mentor.name}</h1>
                        <p className="text-base sm:text-lg text-muted-foreground truncate">{mentor.company}</p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-primary text-primary flex-shrink-0" />
                          <span className="font-medium">{mentor.rating}</span>
                          <span className="text-muted-foreground">({mentor.reviewCount})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{mentor.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                          <span>{mentor.sessions} sessions</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 sm:gap-2 justify-center sm:justify-start">
                        {mentor.expertise.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs px-2 py-1">
                            {skill}
                          </Badge>
                        ))}
                        {mentor.expertise.length > 4 && (
                          <Badge variant="outline" className="text-xs px-2 py-1">
                            +{mentor.expertise.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mobile Booking Button */}
              <div className="xl:hidden">
                <Button 
                  className="w-full" 
                  variant="hero" 
                  size="lg"
                  onClick={() => setShowMobileBooking(true)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Session - ${mentor.price}
                </Button>
              </div>

              {/* About Section */}
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl">About</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-4">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {mentor.aboutFull}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Experience & Education */}
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl">Experience & Education</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm sm:text-base">Professional Experience</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{mentor.experience} in {mentor.expertise[0]}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm sm:text-base">Education</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{mentor.education}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm sm:text-base">Languages</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{mentor.languages.join(", ")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews Section */}
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl">Recent Reviews</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-3 sm:pl-4">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-primary text-primary" />
                            ))}
                          </div>
                          <span className="text-xs sm:text-sm font-medium">Alex Chen</span>
                        </div>
                        <span className="text-xs sm:text-sm text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        "Incredibly insightful session! {mentor.name} provided actionable advice that I implemented immediately. Highly recommend!"
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-secondary pl-3 sm:pl-4">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-primary text-primary" />
                            ))}
                          </div>
                          <span className="text-xs sm:text-sm font-medium">Lisa Park</span>
                        </div>
                        <span className="text-xs sm:text-sm text-muted-foreground">1 week ago</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        "Great mentor with deep industry knowledge. The session was well-structured and very helpful for my career growth."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden xl:block space-y-6">
              {/* Booking Card */}
              <Card className="sticky top-24 shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Book a Session</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">${mentor.price}</div>
                      <div className="text-sm text-muted-foreground">per session</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Response time:</span>
                      <span className="font-medium">{mentor.responseTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Session duration:</span>
                      <span className="font-medium">60 minutes</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total sessions:</span>
                      <span className="font-medium">{mentor.sessions}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Session options:</p>
                    <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Video className="h-4 w-4" />
                        <span>Video call</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>Chat</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>Phone</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant="hero" 
                    size="lg"
                    onClick={() => setShowBookingModal(true)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Session
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    You can cancel or reschedule up to 24 hours before the session
                  </p>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-medium">{mentor.rating}/5.0</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Experience</span>
                    <span className="font-medium">{mentor.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Sessions</span>
                    <span className="font-medium">{mentor.sessions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Response time</span>
                    <span className="font-medium">{mentor.responseTime}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Mobile Booking Bottom Sheet */}
        {showMobileBooking && (
          <div className="fixed inset-0 bg-black/50 z-50 xl:hidden flex items-end">
            <div className="w-full bg-background rounded-t-xl shadow-lg max-h-[85vh] flex flex-col">
              <div className="flex-shrink-0 p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold">Book a Session</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileBooking(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">${mentor.price}</div>
                    <div className="text-sm text-muted-foreground">per session</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Response time:</span>
                      <span className="font-medium">{mentor.responseTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Session duration:</span>
                      <span className="font-medium">60 minutes</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total sessions:</span>
                      <span className="font-medium">{mentor.sessions}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Session options:</p>
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <div className="flex flex-col items-center space-y-1 p-2 border rounded">
                        <Video className="h-4 w-4" />
                        <span>Video</span>
                      </div>
                      <div className="flex flex-col items-center space-y-1 p-2 border rounded">
                        <MessageCircle className="h-4 w-4" />
                        <span>Chat</span>
                      </div>
                      <div className="flex flex-col items-center space-y-1 p-2 border rounded">
                        <Phone className="h-4 w-4" />
                        <span>Phone</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 p-4 border-t">
                <Button 
                  className="w-full" 
                  variant="hero" 
                  size="lg"
                  onClick={() => {
                    setShowMobileBooking(false);
                    setShowBookingModal(true);
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Session
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-3">
                  You can cancel or reschedule up to 24 hours before the session
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Booking Modal */}
        <BookingModal
          mentor={mentor}
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      </div>
    );
  };

  export default MentorProfile;