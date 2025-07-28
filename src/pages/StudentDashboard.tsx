import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, Calendar, Clock, User, Video, MessageCircle, 
  Phone, CheckCircle, XCircle, AlertCircle, Plus,
  TrendingUp, Star, DollarSign, RefreshCw
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
      <div className="min-h-screen flex items-center justify-center">
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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              MentorSetu.ai
            </h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/mentors">
              <Button variant="outline">Browse Mentors</Button>
            </Link>
            <Link to="/become-mentor">
              <Button variant="ghost">Become a Mentor</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">Track your mentorship sessions and progress</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => loadBookings()}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Link to="/mentors">
              <Button variant="cta" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Book New Session
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                  <p className="text-2xl font-bold">{bookings.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold text-primary">{upcomingBookings.length}</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-secondary">{completedBookings.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">${totalSpent}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {bookings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No sessions yet</h3>
              <p className="text-muted-foreground mb-6">
                Start your mentorship journey by booking your first session
              </p>
              <Link to="/mentors">
                <Button variant="cta" size="lg">
                  Browse Mentors
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Sessions */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
              {upcomingBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No upcoming sessions</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-medium transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{booking.mentorName}</CardTitle>
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1 capitalize">{booking.status}</span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getSessionTypeIcon(booking.sessionType)}
                            <span className="capitalize">{booking.sessionType} call</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>${booking.amount}</span>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Session topic:</p>
                          <p className="text-sm">{booking.reason}</p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => openRescheduleModal(booking)}
                          >
                            Reschedule
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            className="flex-1"
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
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Past Sessions</h2>
              {[...completedBookings, ...cancelledBookings].length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No past sessions</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {[...completedBookings, ...cancelledBookings]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((booking) => (
                    <Card key={booking.id} className="opacity-75 hover:opacity-100 transition-opacity">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{booking.mentorName}</CardTitle>
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1 capitalize">{booking.status}</span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getSessionTypeIcon(booking.sessionType)}
                            <span className="capitalize">{booking.sessionType} call</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>${booking.amount}</span>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Session topic:</p>
                          <p className="text-sm">{booking.reason}</p>
                        </div>
                        
                        {booking.status === 'completed' && (
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Star className="h-4 w-4 mr-1" />
                              Rate Session
                            </Button>
                            <Link to={`/mentor/${booking.mentorId}`} className="flex-1">
                              <Button size="sm" variant="ghost" className="w-full">
                                Book Again
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
    </div>
  );
};

export default StudentDashboard;