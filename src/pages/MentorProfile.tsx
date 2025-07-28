import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, Star, MapPin, Clock, DollarSign, Users, 
  Calendar, MessageCircle, Phone, Video, ArrowLeft,
  CheckCircle, Globe, Award
} from "lucide-react";
import { api } from "@/utils/api";
import { type Mentor } from "@/data/mentors";
import BookingModal from "@/components/BookingModal";

const MentorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading mentor profile...</p>
        </div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Mentor Not Found</h2>
          <p className="text-muted-foreground">The mentor you're looking for doesn't exist.</p>
          <Link to="/mentors">
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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              MentorSetu.ai
            </h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/mentors">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Directory
              </Button>
            </Link>
            <Link to="/become-mentor">
              <Button variant="ghost">Become a Mentor</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="bg-gradient-card shadow-medium">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full object-cover shadow-soft"
                  />
                  <div className="flex-1 space-y-3">
                    <div>
                      <h1 className="text-3xl font-bold">{mentor.name}</h1>
                      <p className="text-lg text-muted-foreground">{mentor.company}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-medium">{mentor.rating}</span>
                        <span className="text-muted-foreground">({mentor.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{mentor.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{mentor.sessions} sessions</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {mentor.aboutFull}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Experience & Education */}
            <Card>
              <CardHeader>
                <CardTitle>Experience & Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Professional Experience</h4>
                    <p className="text-sm text-muted-foreground">{mentor.experience} in {mentor.expertise[0]}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Education</h4>
                    <p className="text-sm text-muted-foreground">{mentor.education}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Languages</h4>
                    <p className="text-sm text-muted-foreground">{mentor.languages.join(", ")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section (Mock) */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <span className="text-sm font-medium">Alex Chen</span>
                      <span className="text-sm text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Incredibly insightful session! {mentor.name} provided actionable advice that I implemented immediately. Highly recommend!"
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-secondary pl-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <span className="text-sm font-medium">Lisa Park</span>
                      <span className="text-sm text-muted-foreground">1 week ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Great mentor with deep industry knowledge. The session was well-structured and very helpful for my career growth."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Video className="h-4 w-4" />
                      <span>Video call</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>Chat</span>
                    </div>
                    <div className="flex items-center space-x-1">
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