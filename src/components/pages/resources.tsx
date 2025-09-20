import { Search, Filter, BookOpen, Video, Phone, ExternalLink, Clock, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ResourcesProps {
  onNavigate: (page: string) => void;
}

export function Resources({ onNavigate }: ResourcesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Resources', count: 24 },
    { id: 'anxiety', label: 'Anxiety & Stress', count: 8 },
    { id: 'depression', label: 'Depression', count: 6 },
    { id: 'academic', label: 'Academic Stress', count: 5 },
    { id: 'social', label: 'Social Connection', count: 3 },
    { id: 'crisis', label: 'Crisis Support', count: 2 },
  ];

  const selfHelpModules = [
    {
      title: 'Managing Academic Stress',
      description: 'Learn effective strategies to handle exam anxiety and academic pressure.',
      duration: '15 min',
      type: 'Interactive Module',
      category: 'academic',
      rating: 4.8,
      completions: 1234,
    },
    {
      title: 'Mindfulness for Students',
      description: 'Simple mindfulness exercises designed for busy college schedules.',
      duration: '10 min',
      type: 'Guided Exercise',
      category: 'anxiety',
      rating: 4.9,
      completions: 2156,
    },
    {
      title: 'Building Social Connections',
      description: 'Overcome social anxiety and build meaningful relationships in college.',
      duration: '20 min',
      type: 'Workshop',
      category: 'social',
      rating: 4.7,
      completions: 987,
    },
    {
      title: 'Sleep Hygiene Essentials',
      description: 'Improve your sleep quality with evidence-based techniques.',
      duration: '12 min',
      type: 'Video Guide',
      category: 'anxiety',
      rating: 4.6,
      completions: 1543,
    },
  ];

  const articles = [
    {
      title: 'Understanding College-Related Anxiety',
      author: 'Dr. Sarah Johnson',
      readTime: '8 min read',
      category: 'anxiety',
      summary: 'A comprehensive guide to recognizing and managing anxiety specific to college life.',
    },
    {
      title: 'The Science of Stress and How to Combat It',
      author: 'Dr. Michael Chen',
      readTime: '12 min read',
      category: 'academic',
      summary: 'Learn about the physiological effects of stress and proven methods to reduce it.',
    },
    {
      title: 'Creating Healthy Study Habits',
      author: 'Dr. Emily Rodriguez',
      readTime: '6 min read',
      category: 'academic',
      summary: 'Practical tips for developing study routines that support mental wellness.',
    },
  ];

  const helplines = [
    {
      name: 'Crisis Text Line',
      description: 'Free, 24/7 support via text message',
      contact: 'Text HOME to 741741',
      available: '24/7',
      type: 'Crisis Support',
    },
    {
      name: 'National Suicide Prevention Lifeline',
      description: 'Free and confidential emotional support',
      contact: 'Call or chat 988',
      available: '24/7',
      type: 'Crisis Support',
    },
    {
      name: 'SAMHSA National Helpline',
      description: 'Treatment referral and information service',
      contact: '1-800-662-4357',
      available: '24/7',
      type: 'Information & Referral',
    },
    {
      name: 'Campus Counseling Center',
      description: 'Your university\'s counseling services',
      contact: 'Check your student portal',
      available: 'Business Hours',
      type: 'Professional Counseling',
    },
  ];

  const filteredModules = selfHelpModules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl font-medium">Mental Health Resources</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore curated self-help materials, articles, and support resources designed specifically for college students.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.label}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="modules">Self-Help Modules</TabsTrigger>
            <TabsTrigger value="articles">Articles & Guides</TabsTrigger>
            <TabsTrigger value="helplines">Support Helplines</TabsTrigger>
          </TabsList>

          {/* Self-Help Modules */}
          <TabsContent value="modules" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((module, index) => (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                    <CardHeader className="space-y-3">
                      <div className="flex items-start justify-between">
                        <Badge variant="secondary">{module.type}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {module.rating}
                        </div>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {module.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {module.duration}
                        </div>
                        <span>{module.completions.toLocaleString()} completed</span>
                      </div>
                      <Button className="w-full group-hover:bg-primary/90 transition-colors">
                        Start Module
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Articles */}
          <TabsContent value="articles" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {articles.map((article, index) => (
                  <motion.div
                    key={article.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{categories.find(c => c.id === article.category)?.label}</Badge>
                          <span className="text-sm text-muted-foreground">{article.readTime}</span>
                        </div>
                        <h3 className="text-xl font-medium group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">By {article.author}</p>
                        <p className="text-muted-foreground">{article.summary}</p>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          Read Article
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Featured Resource</h3>
                  <div className="space-y-4">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1561993629-67302018480e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjByZXNvdXJjZXMlMjBib29rc3xlbnwxfHx8fDE3NTgxNzEzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Mental health resources"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div className="space-y-2">
                      <h4 className="font-medium">The College Student's Guide to Mental Wellness</h4>
                      <p className="text-sm text-muted-foreground">
                        A comprehensive handbook covering everything from stress management to building resilience during your college years.
                      </p>
                      <Button className="w-full">
                        Download Free Guide
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                  <h3 className="text-lg font-medium mb-4">Quick Tips</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p>Take breaks every 25-30 minutes while studying to reduce mental fatigue.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <p>Practice deep breathing exercises before exams to manage anxiety.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p>Maintain a regular sleep schedule, even on weekends.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <p>Stay connected with friends and family for emotional support.</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Helplines */}
          <TabsContent value="helplines" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {helplines.map((helpline, index) => (
                <motion.div
                  key={helpline.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="text-lg font-medium">{helpline.name}</h3>
                          <Badge variant="outline">{helpline.type}</Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          {helpline.available}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{helpline.description}</p>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium text-sm">{helpline.contact}</p>
                      </div>
                      <Button variant="outline" className="w-full">
                        Get Support
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
                <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-4">Emergency Resources</h3>
                <div className="space-y-3">
                  <p className="text-sm text-red-700 dark:text-red-300">
                    If you or someone you know is in immediate danger or having thoughts of self-harm:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Button variant="destructive" size="sm">
                      Call 911 (Emergency)
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-300 text-red-700 dark:text-red-300">
                      Call 988 (Crisis Line)
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}