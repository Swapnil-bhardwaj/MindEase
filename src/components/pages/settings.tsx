import { User, Bell, Shield, Download, Trash2, Eye, EyeOff, Save } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { ThemeToggle } from '../theme-toggle';
import { useTheme } from '../theme-provider';

interface SettingsProps {
  onNavigate: (page: string) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  const { theme } = useTheme();
  const [profile, setProfile] = useState({
    fullName: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    university: 'Stanford University',
    graduationYear: '2025',
    major: 'Computer Science',
  });

  const [notifications, setNotifications] = useState({
    dailyCheckIn: true,
    weeklyProgress: true,
    groupMessages: true,
    appointmentReminders: true,
    emergencyAlerts: true,
    marketingEmails: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    shareProgressData: false,
    anonymousMode: true,
    dataCollection: true,
  });

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const saveProfile = () => {
    // In a real app, this would save to the backend
    console.log('Saving profile:', profile);
  };

  const saveNotifications = () => {
    // In a real app, this would save to the backend
    console.log('Saving notifications:', notifications);
  };

  const savePrivacy = () => {
    // In a real app, this would save to the backend
    console.log('Saving privacy:', privacy);
  };

  const exportData = () => {
    // In a real app, this would generate and download user data
    console.log('Exporting user data...');
  };

  const deleteAccount = () => {
    // In a real app, this would delete the account
    console.log('Deleting account...');
    setShowDeleteDialog(false);
  };

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-medium">Settings</h1>
          <p className="text-lg text-muted-foreground">
            Manage your account, privacy, and notification preferences.
          </p>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profile.fullName}
                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="university">University</Label>
                      <Input
                        id="university"
                        value={profile.university}
                        onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="graduationYear">Graduation Year</Label>
                      <Input
                        id="graduationYear"
                        value={profile.graduationYear}
                        onChange={(e) => setProfile({ ...profile, graduationYear: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="major">Major/Field of Study</Label>
                      <Input
                        id="major"
                        value={profile.major}
                        onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button onClick={saveProfile} className="w-full sm:w-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Theme</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose between light and dark mode
                      </p>
                    </div>
                    <ThemeToggle />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Currently using {theme} mode
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Daily Check-in Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Get reminded to log your daily mood
                        </p>
                      </div>
                      <Switch
                        checked={notifications.dailyCheckIn}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, dailyCheckIn: checked })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Weekly Progress Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive summaries of your mental health progress
                        </p>
                      </div>
                      <Switch
                        checked={notifications.weeklyProgress}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, weeklyProgress: checked })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Support Group Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Notifications for new messages in your groups
                        </p>
                      </div>
                      <Switch
                        checked={notifications.groupMessages}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, groupMessages: checked })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Appointment Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Reminders for upcoming counseling sessions
                        </p>
                      </div>
                      <Switch
                        checked={notifications.appointmentReminders}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, appointmentReminders: checked })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Emergency Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Critical safety and crisis support notifications
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emergencyAlerts}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emergencyAlerts: checked })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Updates about new features and wellness tips
                        </p>
                      </div>
                      <Switch
                        checked={notifications.marketingEmails}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, marketingEmails: checked })
                        }
                      />
                    </div>
                  </div>
                  <Button onClick={saveNotifications} className="w-full sm:w-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy & Data Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Anonymous Mode in Groups</Label>
                        <p className="text-sm text-muted-foreground">
                          Show as "Anonymous Student" in support groups
                        </p>
                      </div>
                      <Switch
                        checked={privacy.anonymousMode}
                        onCheckedChange={(checked) =>
                          setPrivacy({ ...privacy, anonymousMode: checked })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Share Progress Data</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow anonymized data to help improve mental health research
                        </p>
                      </div>
                      <Switch
                        checked={privacy.shareProgressData}
                        onCheckedChange={(checked) =>
                          setPrivacy({ ...privacy, shareProgressData: checked })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Data Collection for Personalization</Label>
                        <p className="text-sm text-muted-foreground">
                          Use your data to provide personalized recommendations
                        </p>
                      </div>
                      <Switch
                        checked={privacy.dataCollection}
                        onCheckedChange={(checked) =>
                          setPrivacy({ ...privacy, dataCollection: checked })
                        }
                      />
                    </div>
                  </div>
                  <Button onClick={savePrivacy} className="w-full sm:w-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Save Privacy Settings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Data Rights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    You have full control over your data. You can export or delete your information at any time.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Button variant="outline" onClick={exportData} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export My Data
                    </Button>
                    <Button variant="outline" onClick={() => onNavigate('privacy-policy')} className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Privacy Policy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  <Button className="w-full sm:w-auto">
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Account Active</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Your account is in good standing. You have access to all MindEase features.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Member since: September 2024
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total sessions: 12
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Mood entries: 45
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  {!showDeleteDialog ? (
                    <Button
                      variant="destructive"
                      onClick={() => setShowDeleteDialog(true)}
                      className="w-full sm:w-auto"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 p-4 bg-destructive/10 rounded-lg border border-destructive/20"
                    >
                      <p className="text-sm font-medium">Are you sure you want to delete your account?</p>
                      <p className="text-sm text-muted-foreground">
                        This action cannot be undone. All your data will be permanently deleted.
                      </p>
                      <div className="space-y-2">
                        <Label>Type "DELETE" to confirm:</Label>
                        <Input placeholder="DELETE" />
                      </div>
                      <div className="flex gap-3">
                        <Button variant="destructive" onClick={deleteAccount}>
                          Yes, Delete Account
                        </Button>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                          Cancel
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}