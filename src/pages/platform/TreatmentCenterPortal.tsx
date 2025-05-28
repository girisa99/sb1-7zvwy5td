import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Stethoscope, ClipboardCheck, Calendar,
  FileCheck, UserPlus, HeartPulse, FileText 
} from 'lucide-react';

export function TreatmentCenterPortal() {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Patient Management',
      description: 'Comprehensive patient tracking and care coordination.'
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: 'Treatment Planning',
      description: 'Create and manage detailed treatment plans for each patient.'
    },
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: 'Case Management',
      description: 'Track patient cases from referral through follow-up care.'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Scheduling',
      description: 'Coordinate appointments and treatment schedules.'
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: 'Quality Assurance',
      description: 'Maintain treatment quality standards and documentation.'
    },
    {
      icon: <UserPlus className="w-6 h-6" />,
      title: 'Staff Management',
      description: 'Manage healthcare provider access and responsibilities.'
    },
    {
      icon: <HeartPulse className="w-6 h-6" />,
      title: 'Outcome Tracking',
      description: 'Monitor and document treatment outcomes and patient progress.'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Documentation',
      description: 'Maintain comprehensive patient and treatment records.'
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
            Treatment Center Portal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Optimize your treatment center operations and enhance patient care delivery.
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