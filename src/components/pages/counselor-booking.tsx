import { Calendar as CalendarIcon, Clock, Video, MapPin, User, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar } from '../ui/calendar';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface CounselorBookingProps {
  onNavigate: (page: string) => void;
}

interface Counselor {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  experience: string;
  availability: string[];
  avatar: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export function CounselorBooking({ onNavigate }: CounselorBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [sessionType, setSessionType] = useState<'video' | 'phone' | 'in-person'>('video');
  const [notes, setNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const counselors: Counselor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Mitchell',
      title: 'Licensed Clinical Psychologist',
      specialties: ['Anxiety', 'Academic Stress', 'Depression'],
      rating: 4.9,
      experience: '8 years',
      availability: ['morning', 'afternoon'],
      avatar: '👩‍⚕️',
    },
    {
      id: '2',
      name: 'Dr. James Chen',
      title: 'Licensed Marriage & Family Therapist',
      specialties: ['Relationship Issues', 'Social Anxiety', 'Life Transitions'],
      rating: 4.8,
      experience: '12 years',
      availability: ['afternoon', 'evening'],
      avatar: '👨‍⚕️',
    },
    {
      id: '3',
      name: 'Dr. Maria Rodriguez',
      title: 'Licensed Professional Counselor',
      specialties: ['ADHD', 'Academic Performance', 'Self-Esteem'],
      rating: 4.9,
      experience: '6 years',
      availability: ['morning', 'evening'],
      avatar: '👩‍⚕️',
    },
  ];

  const timeSlots: { [key: string]: TimeSlot[] } = {
    morning: [
      { time: '9:00 AM', available: true },
      { time: '9:30 AM', available: false },
      { time: '10:00 AM', available: true },
      { time: '10:30 AM', available: true },
      { time: '11:00 AM', available: false },
      { time: '11:30 AM', available: true },
    ],
    afternoon: [
      { time: '1:00 PM', available: true },
      { time: '1:30 PM', available: true },
      { time: '2:00 PM', available: false },
      { time: '2:30 PM', available: true },
      { time: '3:00 PM', available: true },
      { time: '3:30 PM', available: false },
    ],
    evening: [
      { time: '5:00 PM', available: true },
      { time: '5:30 PM', available: true },
      { time: '6:00 PM', available: true },
      { time: '6:30 PM', available: false },
      { time: '7:00 PM', available: true },
      { time: '7:30 PM', available: true },
    ],
  };

  const getAvailableSlots = () => {
    if (!selectedCounselor) return [];
    
    return selectedCounselor.availability.flatMap(period => 
      timeSlots[period] || []
    );
  };

  const bookAppointment = () => {
    // In a real app, this would send data to the backend
    console.log('Booking appointment:', {
      counselor: selectedCounselor,
      date: selectedDate,
      time: selectedTime,
      type: sessionType,
      notes,
    });
    setShowConfirmation(true);
  };

  const resetBooking = () => {
    setSelectedCounselor(null);
    setSelectedTime('');
    setNotes('');
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {showConfirmation ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </motion.div>
                <h1 className="text-2xl font-medium mb-4">Appointment Confirmed!</h1>
                <div className="space-y-4 text-left bg-muted p-6 rounded-lg mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{selectedCounselor?.avatar}</span>
                    <div>
                      <p className="font-medium">{selectedCounselor?.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedCounselor?.title}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{selectedDate?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{selectedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {sessionType === 'video' && <Video className="h-4 w-4" />}
                      {sessionType === 'phone' && <Clock className="h-4 w-4" />}
                      {sessionType === 'in-person' && <MapPin className="h-4 w-4" />}
                      <span className="capitalize">{sessionType} Session</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  You'll receive a confirmation email with session details and a calendar invite. 
                  If you need to reschedule, you can do so up to 24 hours before your appointment.
                </p>
                <div className="flex gap-3">
                  <Button onClick={() => onNavigate('dashboard')} className="flex-1">
                    Go to Dashboard
                  </Button>
                  <Button onClick={resetBooking} variant="outline" className="flex-1">
                    Book Another
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-medium">Book a Counseling Session</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Connect with licensed mental health professionals who understand the unique challenges of college life.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Counselor Selection */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>1. Choose a Counselor</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {counselors.map((counselor, index) => (
                        <motion.div
                          key={counselor.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => setSelectedCounselor(counselor)}
                          className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                            selectedCounselor?.id === counselor.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <span className="text-3xl">{counselor.avatar}</span>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-medium">{counselor.name}</h3>
                                  <p className="text-sm text-muted-foreground">{counselor.title}</p>
                                </div>
                                <div className="text-right text-sm">
                                  <div className="flex items-center gap-1">
                                    ⭐ {counselor.rating}
                                  </div>
                                  <p className="text-muted-foreground">{counselor.experience} exp.</p>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {counselor.specialties.map((specialty) => (
                                  <Badge key={specialty} variant="secondary" className="text-xs">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Date and Time Selection */}
                  {selectedCounselor && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>2. Select Date & Time</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium mb-3">Choose Date</h4>
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                                className="rounded-md border"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-3">Available Times</h4>
                              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                                {getAvailableSlots().map((slot, index) => (
                                  <motion.button
                                    key={slot.time}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => slot.available && setSelectedTime(slot.time)}
                                    disabled={!slot.available}
                                    className={`p-2 text-sm rounded-md border transition-all ${
                                      selectedTime === slot.time
                                        ? 'border-primary bg-primary text-primary-foreground'
                                        : slot.available
                                        ? 'border-border hover:border-primary/50 hover:bg-muted'
                                        : 'border-border/50 bg-muted/50 text-muted-foreground cursor-not-allowed'
                                    }`}
                                  >
                                    {slot.time}
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Session Details */}
                  {selectedCounselor && selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>3. Session Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Session Type</label>
                            <Select value={sessionType} onValueChange={(value: any) => setSessionType(value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">
                                  <div className="flex items-center gap-2">
                                    <Video className="h-4 w-4" />
                                    Video Call
                                  </div>
                                </SelectItem>
                                <SelectItem value="phone">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Phone Call
                                  </div>
                                </SelectItem>
                                <SelectItem value="in-person">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    In-Person (Campus)
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              What would you like to discuss? (Optional)
                            </label>
                            <Textarea
                              placeholder="Share any specific topics or concerns you'd like to address..."
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              rows={3}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </div>

                {/* Booking Summary */}
                <div>
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Booking Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedCounselor ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{selectedCounselor.avatar}</span>
                            <div>
                              <p className="font-medium">{selectedCounselor.name}</p>
                              <p className="text-xs text-muted-foreground">{selectedCounselor.title}</p>
                            </div>
                          </div>
                          {selectedDate && (
                            <div className="flex items-center gap-2 text-sm">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{selectedDate.toLocaleDateString()}</span>
                            </div>
                          )}
                          {selectedTime && (
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4" />
                              <span>{selectedTime}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm">
                            {sessionType === 'video' && <Video className="h-4 w-4" />}
                            {sessionType === 'phone' && <Clock className="h-4 w-4" />}
                            {sessionType === 'in-person' && <MapPin className="h-4 w-4" />}
                            <span className="capitalize">{sessionType} Session</span>
                          </div>
                          <div className="pt-4 border-t border-border">
                            <p className="text-lg font-medium">Free for Students</p>
                            <p className="text-xs text-muted-foreground">
                              Covered by your student health plan
                            </p>
                          </div>
                          {selectedTime && (
                            <Button onClick={bookAppointment} className="w-full">
                              Confirm Booking
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <User className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">
                            Select a counselor to start booking
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}