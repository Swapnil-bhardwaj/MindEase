import { Calendar, Download, TrendingUp, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { MoodSlider } from '../mood-slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface MoodTrackerProps {
  onNavigate: (page: string) => void;
}

export function MoodTracker({ onNavigate }: MoodTrackerProps) {
  const [currentMood, setCurrentMood] = useState(3);
  const [journalEntry, setJournalEntry] = useState('');
  const [activeTab, setActiveTab] = useState('weekly');

  const weeklyData = [
    { day: 'Mon', mood: 3, date: '18' },
    { day: 'Tue', mood: 4, date: '19' },
    { day: 'Wed', mood: 2, date: '20' },
    { day: 'Thu', mood: 4, date: '21' },
    { day: 'Fri', mood: 5, date: '22' },
    { day: 'Sat', mood: 4, date: '23' },
    { day: 'Sun', mood: 3, date: '24' },
  ];

  const monthlyData = [
    { week: 'Week 1', mood: 3.2 },
    { week: 'Week 2', mood: 3.8 },
    { week: 'Week 3', mood: 2.9 },
    { week: 'Week 4', mood: 3.7 },
  ];

  const moodHistory = [
    { date: 'Today', mood: 3, note: 'Feeling okay, a bit stressed about exams' },
    { date: 'Yesterday', mood: 4, note: 'Good day! Completed all assignments' },
    { date: '2 days ago', mood: 2, note: 'Anxious about presentation' },
    { date: '3 days ago', mood: 4, note: 'Great workout, feeling energized' },
    { date: '4 days ago', mood: 3, note: 'Normal day, nothing special' },
  ];

  const moodEmojis = ['😢', '😟', '😐', '🙂', '😄'];

  const saveMoodEntry = () => {
    // In a real app, this would save to the backend
    console.log('Saving mood:', currentMood, 'Journal:', journalEntry);
    setJournalEntry('');
  };

  const exportData = () => {
    // In a real app, this would generate and download a CSV/PDF
    console.log('Exporting mood data...');
  };

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-medium">Mood Tracker</h1>
            <p className="text-lg text-muted-foreground">
              Track your emotional patterns and gain insights into your mental wellness.
            </p>
          </div>
          <Button onClick={exportData} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Mood Entry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Check-in
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <MoodSlider value={currentMood} onChange={setCurrentMood} />
                
                <div className="space-y-3">
                  <label className="text-sm font-medium">What's on your mind? (Optional)</label>
                  <Textarea
                    placeholder="Share your thoughts, feelings, or what influenced your mood today..."
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button onClick={saveMoodEntry} className="w-full">
                  Save Entry
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts and History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Charts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Mood Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="weekly">Weekly View</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly View</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="weekly" className="space-y-4">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weeklyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis domain={[1, 5]} />
                          <Line 
                            type="monotone" 
                            dataKey="mood" 
                            stroke="#8b5cf6" 
                            strokeWidth={3}
                            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 5 }}
                            activeDot={{ r: 7, stroke: '#8b5cf6', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-medium">3.6</p>
                        <p className="text-sm text-muted-foreground">Average</p>
                      </div>
                      <div>
                        <p className="text-2xl font-medium">5</p>
                        <p className="text-sm text-muted-foreground">Highest</p>
                      </div>
                      <div>
                        <p className="text-2xl font-medium">2</p>
                        <p className="text-sm text-muted-foreground">Lowest</p>
                      </div>
                      <div>
                        <p className="text-2xl font-medium">7</p>
                        <p className="text-sm text-muted-foreground">Entries</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="monthly" className="space-y-4">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="week" />
                          <YAxis domain={[1, 5]} />
                          <Bar dataKey="mood" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-medium">3.4</p>
                        <p className="text-sm text-muted-foreground">Monthly Avg</p>
                      </div>
                      <div>
                        <p className="text-2xl font-medium">85%</p>
                        <p className="text-sm text-muted-foreground">Consistency</p>
                      </div>
                      <div>
                        <p className="text-2xl font-medium">↗️</p>
                        <p className="text-sm text-muted-foreground">Trend</p>
                      </div>
                      <div>
                        <p className="text-2xl font-medium">28</p>
                        <p className="text-sm text-muted-foreground">Total Entries</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Mood History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Recent Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moodHistory.map((entry, index) => (
                    <motion.div
                      key={entry.date}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="text-3xl">{moodEmojis[entry.mood - 1]}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{entry.date}</p>
                          <span className="text-sm text-muted-foreground">
                            Mood: {entry.mood}/5
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{entry.note}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Load More Entries
                </Button>
              </CardContent>
            </Card>

            {/* Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Insights & Patterns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                      Best Day Pattern
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Your mood tends to be highest on Fridays. Consider what makes Fridays special for you.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                      Progress Trend
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Your average mood has improved by 15% over the past month. Keep it up!
                    </p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => onNavigate('resources')}>
                  Get Personalized Resources
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}