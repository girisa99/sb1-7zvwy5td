import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, FileCheck, Network, FlaskRound, ShieldCheck, UserPlus, Building2, FileText } from 'lucide-react';

export function ManufacturerPortal() {
  const features = [
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: 'Case Management',
      description: 'Track and manage patient cases throughout the manufacturing process.'
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: 'Quality Control',
      description: 'Maintain rigorous quality standards with comprehensive tracking and documentation.'
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: 'Supply Chain Integration',
      description: 'Seamless integration with treatment centers and distribution networks.'
    },
    {
      icon: <FlaskRound className="w-6 h-6" />,
      title: 'Product Management',
      description: 'Manage cell and gene therapy products throughout their lifecycle.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Compliance Management',
      description: 'Ensure regulatory compliance with automated tracking and reporting.'
    },
    {
      icon: <UserPlus className="w-6 h-6" />,
      title: 'User Management',
      description: 'Control access and permissions for manufacturing personnel.'
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Facility Management',
      description: 'Monitor and manage manufacturing facilities and equipment.'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Documentation',
      description: 'Maintain comprehensive documentation for regulatory compliance.'
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
            Manufacturer Portal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Streamline your cell and gene therapy manufacturing process with our comprehensive platform.
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