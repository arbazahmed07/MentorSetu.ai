import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, Calendar, Clock, User, Video, MessageCircle, 
  Phone, CheckCircle, XCircle, AlertCircle, Plus,
  TrendingUp, Star, DollarSign, RefreshCw, Menu, X
} from "lucide-react";
import { api } from "@/utils/api";
import { type BookingSession } from "@/data/mentors";
import { useToast } from "@/hooks/use-toast";
import RescheduleModal from "@/components/RescheduleModal";

// Consistent student email across the app
const CURRENT_USER_EMAIL = "john@example.com";

const StudentDashboard = () => {
  const [bookings, setBookings] = useState<BookingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState<{
    isOpen: boolean;
    booking: BookingSession | null;
  }>({
    isOpen: false,
    booking: null
  });
  const { toast } = useToast();

  // Use the consistent email
  const studentEmail = CURRENT_USER_EMAIL;

  useEffect(() => {
    loadBookings();
  }, []);

  // Add a window focus listener to refresh data when user comes back to dashboard
  useEffect(() => {
    const handleFocus = () => {
      loadBookings();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const loadBookings = async () => {
    try {
      const data = await api.getBookings(studentEmail);
      setBookings(data);
    } catch (error) {
      console.error("Failed to load bookings:", error);
      toast({
        title: "Error",
        description: "Failed to load your bookings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const result = await api.cancelBooking(bookingId);
      if (result.success) {
        setBookings(prev => 
          prev.map(booking => 
            booking.id === bookingId 
              ? { ...booking, status: 'cancelled' }
              : booking
          )
        );
        toast({
          title: "Success",
          description: "Booking cancelled successfully.",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openRescheduleModal = (booking: BookingSession) => {
    setRescheduleModal({
      isOpen: true,
      booking
    });
  };

  const closeRescheduleModal = () => {
    setRescheduleModal({
      isOpen: false,
      booking: null
    });
  };

  const handleRescheduleSuccess = (bookingId: string, newDate: string, newTime: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, date: newDate, time: newTime }
          : booking
      )
    );
  };

  const getStatusIcon = (status: BookingSession['status']) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="h-4 w-4 text-primary" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-secondary" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: BookingSession['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'completed':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSessionTypeIcon = (type: BookingSession['sessionType']) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'chat':
        return <MessageCircle className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      default:
        return <Video className="h-4 w-4" />;
    }
  };

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');
  const totalSpent = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.amount, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                MentorSetu.ai
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/mentors">
                <Button variant="outline" size="sm">Browse Mentors</Button>
              </Link>
              <Link to="/become-mentor">
                <Button variant="ghost" size="sm">Become a Mentor</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4 space-y-2">
              <Link to="/mentors" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Browse Mentors
                </Button>
              </Link>
              <Link to="/become-mentor" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Become a Mentor
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold">My Dashboard</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Track your mentorship sessions and progress
            </p>
          </div>
          
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 xs:gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => loadBookings()}
              disabled={loading}
              className="flex items-center justify-center gap-2 order-2 xs:order-1"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden xs:inline">Refresh</span>
            </Button>
            <Link to="/mentors" className="order-1 xs:order-2">
              <Button variant="cta" size="sm" className="w-full xs:w-auto flex items-center justify-center gap-2">
                <Plus className="h-4 w-4" />
                <span className="xs:hidden sm:inline">Book New Session</span>
                <span className="hidden xs:inline sm:hidden">Book Session</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    Total Sessions
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">
                    {bookings.length}
                  </p>
                </div>
                <Calendar className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary flex-shrink-0 ml-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    Upcoming
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
                    {upcomingBookings.length}
                  </p>
                </div>
                <Clock className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary flex-shrink-0 ml-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    Completed
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary">
                    {completedBookings.length}
                  </p>
                </div>
                <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-secondary flex-shrink-0 ml-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    Total Spent
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">
                    ${totalSpent}
                  </p>
                </div>
                <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary flex-shrink-0 ml-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {bookings.length === 0 ? (
          <Card className="text-center py-8 sm:py-12">
            <CardContent className="px-4">
              <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">No sessions yet</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md mx-auto">
                Start your mentorship journey by booking your first session
              </p>
              <Link to="/mentors">
                <Button variant="cta" size="lg" className="w-full sm:w-auto">
                  Browse Mentors
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6 xl:gap-8">
            {/* Upcoming Sessions */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold">Upcoming Sessions</h2>
              {upcomingBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-4 sm:p-6 text-center">
                    <p className="text-muted-foreground">No upcoming sessions</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-medium transition-all duration-300">
                      <CardHeader className="pb-2 sm:pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-base sm:text-lg leading-tight truncate flex-1">
                            {booking.mentorName}
                          </CardTitle>
                          <Badge className={`${getStatusColor(booking.status)} flex-shrink-0 text-xs`}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1 capitalize hidden xs:inline">
                              {booking.status}
                            </span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-0">
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                            <span className="truncate">{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                            <span className="truncate">{booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getSessionTypeIcon(booking.sessionType)}
                            <span className="capitalize truncate">{booking.sessionType} call</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                            <span className="truncate">${booking.amount}</span>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Session topic:</p>
                          <p className="text-xs sm:text-sm line-clamp-2 leading-relaxed">
                            {booking.reason}
                          </p>
                        </div>
                        
                        <div className="flex flex-col xs:flex-row gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 text-xs sm:text-sm"
                            onClick={() => openRescheduleModal(booking)}
                          >
                            Reschedule
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            className="flex-1 text-xs sm:text-sm"
                            onClick={() => cancelBooking(booking.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Past Sessions */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold">Past Sessions</h2>
              {[...completedBookings, ...cancelledBookings].length === 0 ? (
                <Card>
                  <CardContent className="p-4 sm:p-6 text-center">
                    <p className="text-muted-foreground">No past sessions</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {[...completedBookings, ...cancelledBookings]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((booking) => (
                    <Card key={booking.id} className="opacity-75 hover:opacity-100 transition-opacity">
                      <CardHeader className="pb-2 sm:pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-base sm:text-lg leading-tight truncate flex-1">
                            {booking.mentorName}
                          </CardTitle>
                          <Badge className={`${getStatusColor(booking.status)} flex-shrink-0 text-xs`}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1 capitalize hidden xs:inline">
                              {booking.status}
                            </span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-0">
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                            <span className="truncate">{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                            <span className="truncate">{booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getSessionTypeIcon(booking.sessionType)}
                            <span className="capitalize truncate">{booking.sessionType} call</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                            <span className="truncate">${booking.amount}</span>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Session topic:</p>
                          <p className="text-xs sm:text-sm line-clamp-2 leading-relaxed">
                            {booking.reason}
                          </p>
                        </div>
                        
                        {booking.status === 'completed' && (
                          <div className="flex flex-col xs:flex-row gap-2">
                            <Button size="sm" variant="outline" className="flex-1 text-xs sm:text-sm">
                              <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                              <span className="hidden xs:inline">Rate Session</span>
                              <span className="xs:hidden">Rate</span>
                            </Button>
                            <Link to={`/mentor/${booking.mentorId}`} className="flex-1">
                              <Button size="sm" variant="ghost" className="w-full text-xs sm:text-sm">
                                <span className="hidden xs:inline">Book Again</span>
                                <span className="xs:hidden">Rebook</span>
                              </Button>
                            </Link>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <RescheduleModal
        booking={rescheduleModal.booking}
        isOpen={rescheduleModal.isOpen}
        onClose={closeRescheduleModal}
        onRescheduleSuccess={handleRescheduleSuccess}
      />
      
      {/* Add some bottom padding for mobile scroll */}
      <div className="h-4 sm:h-0"></div>
    </div>
  );
};

export default StudentDashboard;