import React from 'react';
import { motion } from 'framer-motion';

interface GenieIconProps {
  className?: string;
}

export function GenieIcon({ className }: GenieIconProps) {
  const bottleVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const smokeVariants = {
    initial: { scale: 0, opacity: 0, y: 10 },
    animate: { 
      scale: [0.8, 1.2, 0.8],
      opacity: [0, 0.8, 0],
      y: [-5, -15, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: [0, 1, 0],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        delay: 0.5
      }
    }
  };

  const genieVariants = {
    initial: { scale: 0.8, opacity: 0, y: 5 },
    animate: { 
      scale: 1, 
      opacity: 1,
      y: [0, -5, 0],
      transition: {
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        },
        scale: {
          duration: 0.5,
          delay: 0.2,
          ease: "easeOut"
        },
        opacity: {
          duration: 0.5,
          delay: 0.2
        }
      }
    }
  };

  return (
    <div className={className}>
      <div className="relative w-full h-full">
        {/* Magical glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-400/50 to-accent-400/50 rounded-full blur-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Bottle base */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-br from-primary-600 to-primary-800 rounded-b-lg"
          variants={bottleVariants}
          initial="initial"
          animate="animate"
        />

        {/* Bottle neck */}
        <motion.div
          className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-1/3 h-1/4 bg-gradient-to-br from-primary-600 to-primary-800"
          variants={bottleVariants}
          initial="initial"
          animate="animate"
        />

        {/* Magical smoke */}
        <motion.div
          className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-full h-full"
          variants={smokeVariants}
          initial="initial"
          animate="animate"
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-accent-400/40 to-primary-400/40 rounded-full blur-sm" />
            
            {/* Animated text in smoke */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
              variants={textVariants}
              initial="initial"
              animate="animate"
            >
              <span className="text-[8px] font-medium text-white text-opacity-80">
                Gene & Cell
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Genie character */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={genieVariants}
          initial="initial"
          animate="animate"
        >
          <div className="relative w-3/4 h-3/4">
            {/* Genie body */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500 to-primary-600 rounded-full shadow-lg overflow-hidden">
              {/* Genie face */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Eyes */}
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 rounded-full bg-white"></div>
                    <div className="w-1 h-1 rounded-full bg-white"></div>
                  </div>
                  {/* Smile */}
                  <div className="w-2 h-1 mt-0.5 mx-auto border-t border-white rounded-t-full"></div>
                </div>
              </div>
              
              {/* Decorative swirls */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-white rounded-full transform rotate-45"></div>
                <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border-2 border-white rounded-full transform -rotate-45"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}