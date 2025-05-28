import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Microscope, ArrowRight, ChevronLeft, ChevronRight, Dna, Bell as Cells, 
  FlaskRound, Brain, CheckCircle2, Target, Shield, Activity,
  Beaker, Workflow, FileText, Download, ExternalLink, Info, Link
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { therapies } from './data';

export function InnovationSection() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('highlights');
  const [expandedInfo, setExpandedInfo] = useState<number | null>(null);
  const [expandedApplication, setExpandedApplication] = useState<number | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % therapies.length);
    setExpandedInfo(null);
    setExpandedApplication(null);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + therapies.length) % therapies.length);
    setExpandedInfo(null);
    setExpandedApplication(null);
  };

  const handleLearnMore = () => {
    navigate(therapies[currentSlide].link, {
      state: { 
        fromInnovation: true,
        showDocumentation: true
      }
    });
  };

  const IconComponent = therapies[currentSlide].icon;

  return (
    <section id="innovation" className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex justify-center mb-6">
            <Microscope className="w-12 h-12 text-primary-600" />
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Pioneering Advanced Therapeutics
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600"
          >
            Revolutionizing patient care through cutting-edge cell and gene therapies, 
            RNA therapeutics, and advanced therapeutic solutions.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute top-1/2 -left-12 transform -translate-y-1/2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-12 transform -translate-y-1/2">
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="lg:flex">
              <div className="lg:w-1/2 p-6">
                <div className="mb-4">
                  <div className="w-14 h-14 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                    <IconComponent size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {therapies[currentSlide].title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {therapies[currentSlide].description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                    <button
                      onClick={() => setActiveTab('highlights')}
                      className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap text-sm ${
                        activeTab === 'highlights'
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Key Highlights
                    </button>
                    <button
                      onClick={() => setActiveTab('applications')}
                      className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap text-sm ${
                        activeTab === 'applications'
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Applications
                    </button>
                    <button
                      onClick={() => setActiveTab('differentiators')}
                      className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap text-sm ${
                        activeTab === 'differentiators'
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Differentiators
                    </button>
                  </div>

                  <div className="h-[400px] overflow-y-auto pr-2">
                    {activeTab === 'highlights' && (
                      <div className="grid grid-cols-1 gap-3">
                        {therapies[currentSlide].highlights.map((highlight, index) => {
                          const HighlightIcon = highlight.icon;
                          return (
                            <div 
                              key={index}
                              className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer"
                              onClick={() => setExpandedInfo(expandedInfo === index ? null : index)}
                            >
                              <div className="flex items-center mb-2">
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3">
                                  <HighlightIcon size={16} />
                                </div>
                                <h4 className="font-medium text-gray-900">{highlight.title}</h4>
                              </div>
                              <p className="text-sm text-gray-600">{highlight.description}</p>
                              {expandedInfo === index && (
                                <div className="mt-2 p-2 bg-white rounded-lg border border-primary-100">
                                  <p className="text-sm text-primary-700">{highlight.details}</p>
                                  {therapies[currentSlide].resources?.publications?.find(r => 
                                    r.title.toLowerCase().includes(highlight.title.toLowerCase())
                                  ) && (
                                    <div className="mt-2 flex items-center text-sm text-primary-600">
                                      <Download size={14} className="mr-1" />
                                      <span>Related resources available</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {activeTab === 'applications' && (
                      <div className="space-y-3">
                        {therapies[currentSlide].applications.map((app, index) => (
                          <div 
                            key={index}
                            className="bg-accent-50 rounded-lg p-3"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <Target size={16} className="text-accent-600 mr-2" />
                                <h4 className="font-medium text-gray-900">{app.condition}</h4>
                              </div>
                              <span className="text-accent-600 text-sm font-medium px-2 py-0.5 bg-accent-100 rounded-full">
                                {app.effectiveness}
                              </span>
                            </div>
                            <div className="bg-white rounded p-2 mb-2">
                              <p className="text-sm text-gray-700">{app.approach}</p>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <p className="text-gray-600">{app.details}</p>
                              <button 
                                onClick={() => setExpandedApplication(expandedApplication === index ? null : index)}
                                className="text-accent-600 hover:text-accent-700 flex items-center ml-2 flex-shrink-0"
                              >
                                <Info size={14} className="mr-1" />
                                Details
                              </button>
                            </div>
                            {expandedApplication === index && (
                              <div className="mt-3 p-3 bg-white rounded-lg border border-accent-200">
                                <div className="mb-2">
                                  <h5 className="text-sm font-medium text-gray-900">Related Resources:</h5>
                                  {therapies[currentSlide].resources?.publications
                                    ?.filter(pub => 
                                      pub.title.toLowerCase().includes(app.condition.toLowerCase()) ||
                                      pub.title.toLowerCase().includes(app.approach.toLowerCase())
                                    )
                                    .map((pub, idx) => (
                                      <div key={idx} className="mt-2 p-2 bg-accent-50 rounded-lg">
                                        <p className="text-sm font-medium text-gray-900">{pub.title}</p>
                                        <div className="flex items-center mt-1">
                                          <ExternalLink size={14} className="text-accent-600 mr-1" />
                                          <a 
                                            href={pub.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-accent-600 hover:text-accent-700"
                                          >
                                            View Publication
                                          </a>
                                        </div>
                                      </div>
                                    ))
                                  }
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'differentiators' && (
                      <div className="space-y-3">
                        {therapies[currentSlide].differentiators.map((diff, index) => (
                          <div 
                            key={index}
                            className="bg-primary-50 rounded-lg p-3"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{diff.feature}</h4>
                              <span className="text-primary-600 text-sm font-medium px-2 py-0.5 bg-primary-100 rounded-full">
                                {diff.benefit}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{diff.comparison}</p>
                            <div className="space-y-1.5">
                              {diff.vsCART && (
                                <div className="flex items-center bg-white rounded p-2">
                                  <Shield size={14} className="text-primary-600 mr-2" />
                                  <p className="text-sm text-gray-700">
                                    <span className="font-medium">vs CAR-T:</span> {diff.vsCART}
                                  </p>
                                </div>
                              )}
                              {diff.vsmRNA && (
                                <div className="flex items-center bg-white rounded p-2">
                                  <Activity size={14} className="text-primary-600 mr-2" />
                                  <p className="text-sm text-gray-700">
                                    <span className="font-medium">vs mRNA:</span> {diff.vsmRNA}
                                  </p>
                                </div>
                              )}
                              {diff.vsGeneTherapy && (
                                <div className="flex items-center bg-white rounded p-2">
                                  <Dna size={14} className="text-primary-600 mr-2" />
                                  <p className="text-sm text-gray-700">
                                    <span className="font-medium">vs Gene:</span> {diff.vsGeneTherapy}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={handleLearnMore}
                  variant="primary"
                  className="w-full sm:w-auto"
                  icon={<ArrowRight size={20} />}
                  iconPosition="right"
                >
                  View Full Details
                </Button>
              </div>

              <div className="lg:w-1/2 relative h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20" />
                <img
                  src={therapies[currentSlide].image}
                  alt={therapies[currentSlide].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-6 space-x-2">
            {therapies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "w-8 bg-primary-600" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}