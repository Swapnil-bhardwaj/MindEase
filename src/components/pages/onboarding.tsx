import { ArrowRight, ArrowLeft, Shield, Users, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface OnboardingProps {
  onNavigate: (page: string) => void;
}

export function Onboarding({ onNavigate }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Heart,
      title: 'Welcome to MindEase',
      subtitle: 'Your Mental Wellness Companion',
      description: 'MindEase is designed specifically for college students to support your mental health journey with privacy, compassion, and understanding.',
      features: [
        'Track your mood patterns',
        '24/7 AI support assistant',
        'Connect with licensed counselors',
        'Join peer support communities'
      ]
    },
    {
      icon: Shield,
      title: 'Your Privacy Comes First',
      subtitle: 'Safe & Secure Platform',
      description: 'We understand that mental health is deeply personal. Your data is encrypted, private, and you have complete control over what you share.',
      features: [
        'End-to-end encrypted data',
        'HIPAA compliant platform',
        'You control your information',
        'Anonymous peer interactions'
      ]
    },
    {
      icon: Users,
      title: 'Built for Students, By Students',
      subtitle: 'Understanding Your Journey',
      description: 'Created with input from college students and mental health professionals who understand the unique challenges of academic life.',
      features: [
        'Academic stress support',
        'Exam anxiety management',
        'Social connection tools',
        'Career pressure guidance'
      ]
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onNavigate('auth');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <Card className="w-full max-w-4xl p-8 sm:p-12">
        <div className="relative">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'w-2 bg-muted'
                  }`}
                  initial={false}
                  animate={{
                    width: index === currentSlide ? 32 : 8,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Slide Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-8"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="flex justify-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  {(() => {
                    const IconComponent = slides[currentSlide].icon;
                    return <IconComponent className="h-10 w-10 text-white" />;
                  })()}
                </div>
              </motion.div>

              {/* Content */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl sm:text-4xl font-medium"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-primary/80"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-muted-foreground max-w-2xl mx-auto"
                >
                  {slides[currentSlide].description}
                </motion.p>
              </div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
              >
                {slides[currentSlide].features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center space-x-3 text-left"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-between items-center mt-12"
          >
            <Button
              variant="ghost"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Previous
            </Button>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onNavigate('landing')}>
                Skip
              </Button>
              <Button onClick={nextSlide} className="group">
                {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </Card>
    </div>
  );
}