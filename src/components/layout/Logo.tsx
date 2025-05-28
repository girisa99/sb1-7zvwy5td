import React from 'react';
import { Activity } from 'lucide-react';

export function Logo() {
  return (
    <div className="relative w-8 h-8">
      <Activity className="w-8 h-8 text-primary-600" strokeWidth={2.5} />
      <div className="absolute inset-0 bg-accent-500 rounded-full w-3 h-3 top-auto -bottom-1 left-1/2 transform -translate-x-1/2"></div>
    </div>
  );
}