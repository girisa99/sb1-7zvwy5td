import React from 'react';
import { motion } from 'framer-motion';
import { Dna, Microscope, Brain, HeartPulse, Pill, FlaskRound, Bell as Cells, Syringe, Workflow, Zap, Target, Brush as Virus } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const therapies = [
  {
    icon: <Dna className="w-8 h-8" />,
    title: 'Gene Therapy',
    description: 'Direct modification of genetic material to treat diseases',
    types: [
      'AAV-based gene therapy',
      'Lentiviral vectors',
      'Gene editing (CRISPR)',
      'RNA therapeutics'
    ],
    image: 'https://images.pexels.com/photos/8460421/pexels-photo-8460421.jpeg'
  },
  {
    icon: <Cells className="w-8 h-8" />,
    title: 'Cell Therapy',
    description: 'Using cellular material for therapeutic applications',
    types: [
      'CAR-T cell therapy',
      'Stem cell treatments',
      'NK cell therapy',
      'TIL therapy'
    ],
    image: 'https://images.pexels.com/photos/8460473/pexels-photo-8460473.jpeg'
  },
  {
    icon: <FlaskRound className="w-8 h-8" />,
    title: 'Tissue Engineering',
    description: 'Creating functional tissues for regenerative medicine',
    types: [
      'Bioprinted tissues',
      'Organoid development',
      'Scaffold-based engineering',
      'Cell-matrix constructs'
    ],
    image: 'https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg'
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Targeted Therapy',
    description: 'Precision treatments targeting specific molecular pathways',
    types: [
      'Monoclonal antibodies',
      'Small molecule inhibitors',
      'Antibody-drug conjugates',
      'Protein degraders'
    ],
    image: 'https://images.pexels.com/photos/8460589/pexels-photo-8460589.jpeg'
  }
];

export function TherapyModalities() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4"
          >
            Advanced Treatment Modalities
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Revolutionary Approaches in Modern Medicine
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600"
          >
            Discover our comprehensive suite of advanced therapeutic approaches
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {therapies.map((therapy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 to-transparent z-10" />
                <img 
                  src={therapy.image} 
                  alt={therapy.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 z-20">
                  <div className="text-primary-600">
                    {therapy.icon}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {therapy.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {therapy.description}
                </p>
                <div className="space-y-2">
                  {therapy.types.map((type, typeIndex) => (
                    <div 
                      key={typeIndex}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2" />
                      {type}
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-6 pb-6">
                <Button 
                  variant="outline"
                  className="w-full justify-center hover:bg-primary-50"
                >
                  Learn More About {therapy.title}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button 
            href="/therapies"
            variant="primary"
            size="lg"
            className="inline-flex items-center"
          >
            Explore All Treatment Modalities
          </Button>
        </motion.div>
      </div>
    </section>
  );
}