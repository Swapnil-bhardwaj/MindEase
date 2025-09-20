import { Send, Bot, User, AlertTriangle, Smile, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';

interface ChatProps {
  onNavigate: (page: string) => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export function Chat({ onNavigate }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your MindEase AI assistant. I'm here to provide support, resources, and a listening ear whenever you need it. How are you feeling today?",
      sender: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const promptSuggestions = [
    "I'm feeling anxious about exams",
    "I'm having trouble sleeping",
    "I feel overwhelmed with coursework",
    "I'm struggling to make friends",
    "I need help with motivation"
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(content),
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('anxious') || message.includes('anxiety')) {
      return "I understand that anxiety can feel overwhelming. Remember that you're not alone in this. Here are some quick techniques that might help: try the 4-7-8 breathing technique (breathe in for 4, hold for 7, exhale for 8), or ground yourself by naming 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. Would you like me to guide you through a longer relaxation exercise, or would you prefer to explore some resources about managing academic anxiety?";
    }
    
    if (message.includes('sleep') || message.includes('insomnia')) {
      return "Sleep troubles are really common among students. Creating a consistent sleep routine can make a big difference. Try avoiding screens 1 hour before bed, keeping your room cool and dark, and maybe try some calming activities like reading or light stretching. I can share some guided sleep meditations or connect you with resources about sleep hygiene. Are you finding it hard to fall asleep, or do you wake up frequently during the night?";
    }
    
    if (message.includes('overwhelmed') || message.includes('stress')) {
      return "Feeling overwhelmed is a sign that you're taking on a lot, and it's completely valid to feel that way. Let's break this down together. Sometimes organizing our thoughts and tasks can help reduce that overwhelming feeling. Would you like to talk about what specifically is making you feel this way? I can also suggest some stress management techniques or help you prioritize what needs your attention first.";
    }
    
    if (message.includes('friends') || message.includes('social') || message.includes('lonely')) {
      return "Making connections in college can be challenging, but you're taking a positive step by acknowledging this. Many students feel the same way! Consider joining clubs related to your interests, attending campus events, or even just starting small conversations with classmates. Remember, meaningful friendships often take time to develop. Would you like some specific suggestions for meeting people, or would you prefer to talk about what makes social situations feel difficult for you?";
    }
    
    if (message.includes('motivation') || message.includes('procrastination')) {
      return "Motivation can be tricky - it often comes and goes, and that's completely normal. Sometimes starting with really small tasks can help build momentum. Try the '2-minute rule' - if something takes less than 2 minutes, do it right away. For bigger tasks, break them into smaller, manageable chunks. What's one small thing you could accomplish today? I can also share some techniques for maintaining motivation over longer periods.";
    }
    
    return "Thank you for sharing that with me. It sounds like you're going through something important. I'm here to listen and support you. Can you tell me a bit more about what you're experiencing? Together we can explore some strategies that might help, or I can connect you with additional resources if you'd like.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-2 p-3"
    >
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        <Bot className="h-4 w-4 text-white" />
      </div>
      <div className="flex space-x-1">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          className="w-2 h-2 bg-muted-foreground rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          className="w-2 h-2 bg-muted-foreground rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          className="w-2 h-2 bg-muted-foreground rounded-full"
        />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-6rem)] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-medium">AI Support Assistant</h1>
              <p className="text-sm text-muted-foreground">Available 24/7 for support and guidance</p>
            </div>
          </div>
        </motion.div>

        {/* Chat Container */}
        <Card className="flex-1 flex flex-col">
          {/* Messages */}
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[calc(100vh-16rem)] p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'assistant' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 px-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {message.sender === 'user' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
                
                <AnimatePresence>
                  {isTyping && <TypingIndicator />}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </CardContent>

          {/* Input Area */}
          <div className="border-t border-border p-4 space-y-4">
            {/* Suggested Prompts */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <p className="text-xs text-muted-foreground">Try asking about:</p>
                <div className="flex flex-wrap gap-2">
                  {promptSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => sendMessage(suggestion)}
                      className="text-xs px-3 py-1.5 bg-muted hover:bg-accent rounded-full transition-colors"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Type your message here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Emergency Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4"
        >
          <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    <strong>Important:</strong> This AI assistant provides general support and resources. 
                    For crisis situations or urgent mental health needs, please contact professional help immediately.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-orange-800 dark:text-orange-200 border-orange-300">
                      Crisis Text Line: 741741
                    </Button>
                    <Button variant="outline" size="sm" className="text-orange-800 dark:text-orange-200 border-orange-300">
                      Call 988
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}