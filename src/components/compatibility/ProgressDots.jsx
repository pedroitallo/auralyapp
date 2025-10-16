import React from 'react';
import { motion } from 'framer-motion';

const ProgressDots = ({ current, total }) => (
  <div className="flex items-center justify-center space-x-2">
    {[...Array(total)].map((_, i) => (
      <motion.div
        key={i}
        className={`h-2 rounded-full transition-all duration-300 ${i + 1 === current ? 'w-6 bg-purple-500' : 'w-2 bg-gray-600'}`}
        animate={{
          scale: i + 1 === current ? 1.1 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      />
    ))}
  </div>
);

export default ProgressDots;