import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, Map, Thermometer, BarChart,
  Clock, ShieldCheck, Package, FileText 
} from 'lucide-react';

export function DistributionCenterPortal() {
  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Logistics Management',
      description: 'Coordinate product transportation and delivery tracking.'
    },
    {
      icon: <Map className="w-6 h-6" />,
      title: 'Route Optimization',
      description: 'Optimize delivery routes for efficient distribution.'
    },
    {
      icon: <Thermometer className="w-6 h-6" />,
      title: 'Temperature Monitoring',
      description: 'Real-time temperature tracking throughout transport.'
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: 'Analytics',
      description: 'Track and analyze distribution metrics and performance.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Time Management',
      description: 'Monitor delivery times and schedule adherence.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Quality Control',
      description: 'Ensure product integrity throughout distribution.'
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Inventory Management',
      description: 'Track and manage product inventory levels.'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Documentation',
      description: 'Maintain comprehensive shipping and handling records.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Distribution Center Portal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Streamline your distribution operations with real-time tracking and monitoring.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-primary-600 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}