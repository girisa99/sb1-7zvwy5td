import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, HeartPulse, Users, Truck, Package } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function CTASection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: 'For Healthcare Providers',
                description: 'Streamline patient care coordination and treatment delivery with our comprehensive platform.',
                icon: <HeartPulse size={24} className="text-primary-600" />,
                link: '/platform/provider-portal'
              },
              {
                title: 'For Biotech Companies',
                description: 'Ensure product quality and compliance while managing the entire therapy supply chain.',
                icon: <Building2 size={24} className="text-primary-600" />,
                link: '/platform/biotech-solutions'
              },
              {
                title: 'For Treatment Centers',
                description: 'Optimize operations and enhance patient care with our integrated management system.',
                icon: <Users size={24} className="text-primary-600" />,
                link: '/platform/treatment-center'
              },
              {
                title: 'For Specialty Pharmacies',
                description: 'Manage complex therapies with advanced inventory and patient management tools.',
                icon: <Package size={24} className="text-primary-600" />,
                link: '/platform/specialty-pharmacy'
              },
              {
                title: 'For Distribution Networks',
                description: 'Ensure seamless cold chain management and therapy tracking with real-time monitoring.',
                icon: <Truck size={24} className="text-primary-600" />,
                link: '/platform/distribution'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Button
                  href={item.link}
                  variant="link"
                  className="text-primary-600 p-0"
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                >
                  Learn More
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}