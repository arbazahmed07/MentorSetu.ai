import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock } from "lucide-react";
import { api } from "@/utils/api";
import { type BookingSession } from "@/data/mentors";
import { useToast } from "@/hooks/use-toast";

interface RescheduleModalProps {
  booking: BookingSession | null;
  isOpen: boolean;
  onClose: () => void;
  onRescheduleSuccess: (bookingId: string, newDate: string, newTime: string) => void;
}

const RescheduleModal = ({ booking, isOpen, onClose, onRescheduleSuccess }: RescheduleModalProps) => {
  const [loading, setLoading] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const { toast } = useToast();

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

  const handleReschedule = async () => {
    if (!booking) return;

    if (!newDate) {
      toast({
        title: "Error",
        description: "Please select a new date",
        variant: "destructive",
      });
      return;
    }

    if (!newTime) {
      toast({
        title: "Error", 
        description: "Please select a new time",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const result = await api.rescheduleBooking(booking.id, newDate, newTime);
      
      if (result.success) {
        onRescheduleSuccess(booking.id, newDate, newTime);
        toast({
          title: "Success",
          description: "Booking rescheduled successfully.",
        });
        handleClose();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to reschedule booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setNewDate('');
    setNewTime('');
    onClose();
  };

  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Reschedule Session</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-3">Current Session</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Mentor:</span>
                <span>{booking.mentorName}</span>
              </div>
              <div className="flex justify-between">
                <span>Current Date:</span>
                <span>{new Date(booking.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Current Time:</span>
                <span>{booking.time}</span>
              </div>
              <div className="flex justify-between">
                <span>Topic:</span>
                <span className="text-right max-w-32 truncate">{booking.reason}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Select New Date & Time</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newDate">New Date</Label>
                <Input
                  id="newDate"
                  type="date"
                  min={getMinDate()}
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newTime">New Time</Label>
                <Select value={newTime} onValueChange={setNewTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateTimeSlots().map(time => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Rescheduling is free up to 24 hours before your current session time.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleReschedule} 
              disabled={loading}
              className="flex-1" 
              variant="cta"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  <span>Rescheduling...</span>
                </div>
              ) : (
                'Confirm Reschedule'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleModal;
