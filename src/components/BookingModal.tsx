import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import { api } from "@/utils/api";
import { type Mentor } from "@/data/mentors";
import { useToast } from "@/hooks/use-toast";

interface BookingForm {
  studentName: string;
  studentEmail: string;
  date: string;
  time: string;
  reason: string;
  sessionType: 'video' | 'chat' | 'phone';
}

interface BookingModalProps {
  mentor: Mentor;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess?: () => void;
}

const CURRENT_USER_EMAIL = "john@example.com";

const BookingModal = ({ mentor, isOpen, onClose, onBookingSuccess }: BookingModalProps) => {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<BookingForm>({
    studentName: '',
    studentEmail: CURRENT_USER_EMAIL,
    date: '',
    time: '',
    reason: '',
    sessionType: 'video',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && form.studentEmail !== CURRENT_USER_EMAIL) {
      setForm(prev => ({ ...prev, studentEmail: CURRENT_USER_EMAIL }));
    }
  }, [isOpen, form.studentEmail]);

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!form.studentName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return false;
    }

    if (!form.studentEmail.trim() || !form.studentEmail.includes('@')) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    if (!form.date) {
      toast({
        title: "Error",
        description: "Please select a date",
        variant: "destructive",
      });
      return false;
    }

    if (!form.time) {
      toast({
        title: "Error",
        description: "Please select a time",
        variant: "destructive",
      });
      return false;
    }

    if (!form.reason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for the session",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFormSubmit = () => {
    if (!validateForm()) return;
    setStep('payment');
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast({
        title: "Error",
        description: "Please select a payment method",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const paymentResult = await api.processPayment(mentor.price, paymentMethod);
      if (!paymentResult.success) {
        throw new Error(paymentResult.error);
      }

      const bookingResult = await api.bookSession({
        mentorId: mentor.id,
        mentorName: mentor.name,
        studentName: form.studentName,
        studentEmail: form.studentEmail,
        date: form.date,
        time: form.time,
        reason: form.reason,
        amount: mentor.price,
        sessionType: form.sessionType,
      });

      if (bookingResult.success) {
        setStep('success');
        onBookingSuccess?.();
        toast({
          title: "Success!",
          description: "Your session has been booked successfully. Visit your dashboard to view it.",
        });
      } else {
        throw new Error(bookingResult.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Booking failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('form');
    setForm({
      studentName: '',
      studentEmail: CURRENT_USER_EMAIL,
      date: '',
      time: '',
      reason: '',
      sessionType: 'video',
    });
    setPaymentMethod('');
    onClose();
  };

  const handleViewDashboard = () => {
    handleClose();
    navigate('/dashboard');
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 17) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-[90vw] sm:max-w-md max-h-[85vh] overflow-y-auto p-4 sm:p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-base sm:text-lg font-semibold">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Book Session with {mentor.name}</span>
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Select your preferred date, time, and session type
          </DialogDescription>
        </DialogHeader>

        {step === 'form' && (
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium text-sm sm:text-base">{mentor.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{mentor.expertise[0]}</p>
              </div>
              <div className="text-right">
                <p className="text-lg sm:text-xl font-bold text-primary">${mentor.price}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">60 minutes</p>
              </div>
            </div>

            <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs sm:text-sm">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={form.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                  className="h-10 sm:h-11 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.studentEmail}
                  onChange={(e) => handleInputChange('studentEmail', e.target.value)}
                  className="h-10 sm:h-11 text-sm"
                />
              </div>
            </div>

            <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-xs sm:text-sm">Preferred Date</Label>
                <Input
                  id="date"
                  type="date"
                  min={getMinDate()}
                  value={form.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="h-10 sm:h-11 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-xs sm:text-sm">Preferred Time</Label>
                <Select value={form.time} onValueChange={(value) => handleInputChange('time', value)}>
                  <SelectTrigger className="h-10 sm:h-11 text-sm">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateTimeSlots().map(time => (
                      <SelectItem key={time} value={time} className="text-sm">
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionType" className="text-xs sm:text-sm">Session Type</Label>
              <Select 
                value={form.sessionType} 
                onValueChange={(value: 'video' | 'chat' | 'phone') => handleInputChange('sessionType', value)}
              >
                <SelectTrigger className="h-10 sm:h-11 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video" className="text-sm">Video Call</SelectItem>
                  <SelectItem value="chat" className="text-sm">Chat</SelectItem>
                  <SelectItem value="phone" className="text-sm">Phone Call</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason" className="text-xs sm:text-sm">What would you like to discuss?</Label>
              <Textarea
                id="reason"
                placeholder="Briefly describe what you'd like to cover in this session..."
                rows={4}
                value={form.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                className="text-sm"
              />
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" onClick={handleClose} className="flex-1 h-10 sm:h-11 text-sm">
                Cancel
              </Button>
              <Button onClick={handleFormSubmit} className="flex-1 h-10 sm:h-11 text-sm" variant="cta">
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-4 sm:space-y-5">
            <div className="p-3 bg-muted rounded-lg">
              <h3 className="font-medium text-sm sm:text-base mb-3">Session Summary</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span>Mentor:</span>
                  <span>{mentor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{form.date ? new Date(form.date).toLocaleDateString() : 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span>{form.time || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>60 minutes</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${mentor.price}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs sm:text-sm">Payment Method</Label>
              <div className="space-y-2">
                <Button
                  variant={paymentMethod === 'razorpay' ? 'default' : 'outline'}
                  className="w-full justify-start h-10 sm:h-11 text-sm"
                  onClick={() => setPaymentMethod('razorpay')}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Razorpay (Card, UPI, Wallet)
                </Button>
                <Button
                  variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
                  className="w-full justify-start h-10 sm:h-11 text-sm"
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  PayPal
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" onClick={() => setStep('form')} className="flex-1 h-10 sm:h-11 text-sm">
                Back
              </Button>
              <Button 
                onClick={handlePayment} 
                disabled={loading}
                className="flex-1 h-10 sm:h-11 text-sm" 
                variant="success"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Complete Booking'
                )}
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center space-y-4 sm:space-y-5">
            <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-secondary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-secondary" />
            </div>
            
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Booking Confirmed!</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Your session with {mentor.name} has been successfully booked for{' '}
                {form.date ? new Date(form.date).toLocaleDateString() : 'Not selected'} at {form.time || 'Not selected'}.
              </p>
            </div>

            <div className="p-3 bg-muted rounded-lg text-left">
              <h4 className="font-medium text-sm sm:text-base mb-2">What's Next?</h4>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                <li className="flex items-start"><span className="mr-2">•</span> You'll receive a confirmation email shortly</li>
                <li className="flex items-start"><span className="mr-2">•</span> Calendar invite will be sent 24 hours before the session</li>
                <li className="flex items-start"><span className="mr-2">•</span> You can reschedule or cancel up to 24 hours in advance</li>
                <li className="flex items-start"><span className="mr-2">•</span> Check your dashboard for session details</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" onClick={handleClose} className="flex-1 h-10 sm:h-11 text-sm">
                Close
              </Button>
              <Button variant="cta" onClick={handleViewDashboard} className="flex-1 h-10 sm:h-11 text-sm">
                View Dashboard
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;