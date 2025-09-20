import { Calendar, MessageCircle, BookOpen, Users, TrendingUp, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MoodSlider } from '../mood-slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [todayMood, setTodayMood] = useState(3);
  const [showMoodTracker, setShowMoodTracker] = useState(false);

  // Mock data for mood chart
  const moodData = [
    { day: 'Mon', mood: 3 },
    { day: 'Tue', mood: 4 },
    { day: 'Wed', mood: 2 },
    { day: 'Thu', mood: 4 },
    { day: 'Fri', mood: 5 },
    { day: 'Sat', mood: 4 },
    { day: 'Sun', mood: 3 },
  ];

  const quickActions = [
    {
      icon: MessageCircle,
      title: 'Chat with Assistant',
      description: 'Get instant support and guidance',
      color: 'from-blue-500 to-blue-600',
      action: () => onNavigate('chat'),
    },
    {
      icon: BookOpen,
      title: 'Find Resources',
      description: 'Explore self-help materials',
      color: 'from-green-500 to-green-600',
      action: () => onNavigate('resources'),
    },
    {
      icon: Calendar,
      title: 'Book Counselor',
      description: 'Schedule a session',
      color: 'from-purple-500 to-purple-600',
      action: () => onNavigate('counselor-booking'),
    },
    {
      icon: Users,
      title: 'Join Community',
      description: 'Connect with peers',
      color: 'from-orange-500 to-orange-600',
      action: () => onNavigate('peer-support'),
    },
  ];

  const saveMood = () => {
    setShowMoodTracker(false);
    // In a real app, this would save to the backend
  };

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-medium">Hi, Alex 👋</h1>
          <p className="text-lg text-muted-foreground">
            How are you feeling today? Let's check in on your wellness journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mood Check-in Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                <CardHeader className="relative">
                  <CardTitle className="flex items-center justify-between">
                    <span>Daily Mood Check-in</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowMoodTracker(!showMoodTracker)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Check-in
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  {showMoodTracker ? (
                    <div className="space-y-6">
                      <MoodSlider value={todayMood} onChange={setTodayMood} />
                      <div className="flex gap-3">
                        <Button onClick={saveMood} className="flex-1">
                          Save Mood
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowMoodTracker(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">😊</div>
                      <p className="text-muted-foreground">
                        You haven't checked in today yet. How are you feeling?
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={action.title}
                        onClick={action.action}
                        className="group relative p-4 rounded-xl border border-border hover:border-transparent transition-all duration-300 text-left"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-xl`}></div>
                        <div className="relative">
                          <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                            <action.icon className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="font-medium mb-1">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Weekly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={moodData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis domain={[1, 5]} />
                          <Line 
                            type="monotone" 
                            dataKey="mood" 
                            stroke="#8b5cf6" 
                            strokeWidth={2}
                            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-medium">3.7</p>
                        <p className="text-xs text-muted-foreground">Avg Mood</p>
                      </div>
                      <div>
                        <p className="text-2xl font-medium">6</p>
                        <p className="text-xs text-muted-foreground">Check-ins</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm">Completed anxiety management module</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm">Mood check-in: Feeling better</p>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm">Joined Academic Stress support group</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Activity
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Emergency Resources */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
                <CardHeader>
                  <CardTitle className="text-orange-800 dark:text-orange-200">Need Immediate Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    If you're in crisis or need immediate support, these resources are available 24/7.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Crisis Text Line: Text HOME to 741741
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Call 988 - Suicide & Crisis Lifeline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}