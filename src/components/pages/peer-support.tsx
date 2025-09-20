import { Users, MessageCircle, Plus, Lock, Clock, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface PeerSupportProps {
  onNavigate: (page: string) => void;
}

interface SupportGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  unreadMessages: number;
  lastActivity: string;
  isPrivate: boolean;
  moderator: string;
  tags: string[];
}

interface ChatPreview {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isAnonymous: boolean;
}

export function PeerSupport({ onNavigate }: PeerSupportProps) {
  const [selectedGroup, setSelectedGroup] = useState<SupportGroup | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const supportGroups: SupportGroup[] = [
    {
      id: '1',
      name: 'Academic Stress Warriors',
      description: 'A supportive space for students dealing with academic pressure, exam anxiety, and study-related stress.',
      category: 'Academic',
      memberCount: 342,
      unreadMessages: 5,
      lastActivity: '2 min ago',
      isPrivate: false,
      moderator: 'Dr. Sarah Chen',
      tags: ['Exam Anxiety', 'Study Tips', 'Time Management'],
    },
    {
      id: '2',
      name: 'Social Anxiety Support Circle',
      description: 'Connect with others who understand the challenges of social situations and building friendships in college.',
      category: 'Social',
      memberCount: 198,
      unreadMessages: 12,
      lastActivity: '15 min ago',
      isPrivate: false,
      moderator: 'Alex M.',
      tags: ['Social Skills', 'Friendship', 'Confidence'],
    },
    {
      id: '3',
      name: 'Motivation & Goal Setting',
      description: 'Share goals, celebrate wins, and support each other through challenges. Weekly check-ins and accountability.',
      category: 'Motivation',
      memberCount: 267,
      unreadMessages: 3,
      lastActivity: '1 hour ago',
      isPrivate: false,
      moderator: 'Jordan K.',
      tags: ['Goal Setting', 'Accountability', 'Personal Growth'],
    },
    {
      id: '4',
      name: 'First-Year Experience',
      description: 'For freshmen navigating the transition to college life. Share experiences and get advice from upperclassmen.',
      category: 'Transition',
      memberCount: 156,
      unreadMessages: 8,
      lastActivity: '30 min ago',
      isPrivate: false,
      moderator: 'Campus Counselor',
      tags: ['Freshman', 'College Life', 'Adjustment'],
    },
    {
      id: '5',
      name: 'Graduate Student Support',
      description: 'For grad students dealing with research stress, imposter syndrome, and work-life balance.',
      category: 'Graduate',
      memberCount: 89,
      unreadMessages: 2,
      lastActivity: '3 hours ago',
      isPrivate: true,
      moderator: 'Dr. Patricia Wong',
      tags: ['Research', 'PhD Life', 'Imposter Syndrome'],
    },
    {
      id: '6',
      name: 'Mindfulness & Self-Care',
      description: 'Daily mindfulness practices, self-care tips, and meditation sessions. Focus on mental wellness.',
      category: 'Wellness',
      memberCount: 423,
      unreadMessages: 7,
      lastActivity: '45 min ago',
      isPrivate: false,
      moderator: 'Maya P.',
      tags: ['Mindfulness', 'Meditation', 'Self-Care'],
    },
  ];

  const recentChats: ChatPreview[] = [
    {
      id: '1',
      sender: 'Anonymous Student',
      message: 'Just wanted to say thanks to everyone for the study tips! Finally got through my calculus exam.',
      timestamp: '2 min ago',
      isAnonymous: true,
    },
    {
      id: '2',
      sender: 'Alex',
      message: 'Anyone else feeling overwhelmed with midterms coming up? Could use some motivation.',
      timestamp: '15 min ago',
      isAnonymous: false,
    },
    {
      id: '3',
      sender: 'Sam',
      message: 'The breathing exercises we discussed really helped with my presentation anxiety today!',
      timestamp: '1 hour ago',
      isAnonymous: false,
    },
  ];

  const filteredGroups = supportGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const joinGroup = (group: SupportGroup) => {
    // In a real app, this would send a request to join the group
    console.log('Joining group:', group.name);
  };

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl font-medium">Peer Support Groups</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect with fellow students in moderated support groups. Share experiences, get advice, and build meaningful connections.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto"
        >
          <div className="relative">
            <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        <Tabs defaultValue="groups" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="groups">Browse Groups</TabsTrigger>
            <TabsTrigger value="my-groups">My Groups</TabsTrigger>
          </TabsList>

          {/* Browse Groups */}
          <TabsContent value="groups" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="grid gap-6">
                  {filteredGroups.map((group, index) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300 group">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <CardTitle className="group-hover:text-primary transition-colors">
                                  {group.name}
                                </CardTitle>
                                {group.isPrivate && (
                                  <Lock className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {group.memberCount} members
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {group.lastActivity}
                                </span>
                              </div>
                            </div>
                            <Badge variant="secondary">{group.category}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-muted-foreground">{group.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {group.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              Moderated by <span className="font-medium">{group.moderator}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {group.unreadMessages > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {group.unreadMessages} new
                                </Badge>
                              )}
                              <Button
                                size="sm"
                                onClick={() => joinGroup(group)}
                                className="group-hover:scale-105 transition-transform"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Join Group
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Community Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-medium">1,475</p>
                          <p className="text-xs text-muted-foreground">Active Members</p>
                        </div>
                        <div>
                          <p className="text-2xl font-medium">24</p>
                          <p className="text-xs text-muted-foreground">Support Groups</p>
                        </div>
                        <div>
                          <p className="text-2xl font-medium">98%</p>
                          <p className="text-xs text-muted-foreground">Positive Feedback</p>
                        </div>
                        <div>
                          <p className="text-2xl font-medium">24/7</p>
                          <p className="text-xs text-muted-foreground">Moderation</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Guidelines */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Community Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <p>Be respectful and supportive of all members</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <p>Share experiences, not advice unless requested</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <p>Maintain confidentiality of shared information</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <p>Use anonymous mode if you prefer privacy</p>
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
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {recentChats.map((chat, index) => (
                        <motion.div
                          key={chat.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="p-3 rounded-lg bg-muted/50 space-y-2"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {chat.isAnonymous ? '?' : chat.sender.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{chat.sender}</span>
                            <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{chat.message}</p>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </TabsContent>

          {/* My Groups */}
          <TabsContent value="my-groups" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No Groups Joined Yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start by joining some support groups that match your interests and needs. You can find them in the Browse Groups tab.
              </p>
              <Button onClick={() => setSearchQuery('')}>
                <Plus className="h-4 w-4 mr-2" />
                Browse Groups
              </Button>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Emergency Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <h3 className="font-medium text-orange-800 dark:text-orange-200">
                  Need Immediate Support?
                </h3>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  While our peer support groups are great for ongoing support, if you're experiencing a crisis or need immediate help, please contact professional resources.
                </p>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" size="sm" className="border-orange-300 text-orange-800 dark:text-orange-200">
                    Crisis Text Line: 741741
                  </Button>
                  <Button variant="outline" size="sm" className="border-orange-300 text-orange-800 dark:text-orange-200">
                    Call 988
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}