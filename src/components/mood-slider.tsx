import { motion } from 'motion/react';
import { useState } from 'react';
import { Slider } from './ui/slider';

interface MoodSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const moodEmojis = [
  { emoji: '😢', label: 'Very Sad', color: '#ef4444' },
  { emoji: '😟', label: 'Sad', color: '#f97316' },
  { emoji: '😐', label: 'Neutral', color: '#eab308' },
  { emoji: '🙂', label: 'Happy', color: '#22c55e' },
  { emoji: '😄', label: 'Very Happy', color: '#10b981' }
];

export function MoodSlider({ value, onChange }: MoodSliderProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  const currentMood = moodEmojis[value - 1];

  return (
    <div className="space-y-6">
      {/* Current Mood Display */}
      <div className="text-center space-y-4">
        <motion.div
          animate={{ 
            scale: isHovering ? 1.1 : 1,
            rotate: isHovering ? [0, -5, 5, 0] : 0
          }}
          transition={{ duration: 0.3 }}
          className="text-6xl cursor-pointer select-none"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {currentMood.emoji}
        </motion.div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">{currentMood.label}</h3>
          <p className="text-sm text-muted-foreground">How are you feeling today?</p>
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-4">
        <Slider
          value={[value]}
          onValueChange={([newValue]) => onChange(newValue)}
          max={5}
          min={1}
          step={1}
          className="w-full"
        />
        
        {/* Emoji Scale */}
        <div className="flex justify-between items-center px-2">
          {moodEmojis.map((mood, index) => (
            <motion.button
              key={index}
              onClick={() => onChange(index + 1)}
              className={`text-2xl transition-all duration-200 ${
                value === index + 1 ? 'scale-125' : 'scale-100 opacity-60'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {mood.emoji}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}