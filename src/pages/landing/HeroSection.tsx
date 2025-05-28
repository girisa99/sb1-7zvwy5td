import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Clock, AlertTriangle, CheckCircle2, Activity, HeartPulse, Building2, Users, Search, Shield, Package, MapPin, Pill, Beaker, Stethoscope, Bell as Cells, FlaskRound, Brain, Target } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const slides = [
  {
    title: "Advanced Cell & Gene Therapy Solutions",
    subtitle: "Research & Development",
    description: "Pioneering breakthrough treatments through innovative cell and gene therapy research, development, and manufacturing solutions.",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
    stats: [
      { icon: <Shield className="w-6 h-6" />, label: 'Success Rate', value: '94% Efficacy' },
      { icon: <Activity className="w-6 h-6" />, label: 'Clinical Trials', value: '50+ Active' },
      { icon: <Users className="w-6 h-6" />, label: 'Patients Treated', value: '1000+' }
    ],
    popups: [
      {
        icon: <FlaskRound className="w-6 h-6 text-primary-600" />,
        title: "Research Progress",
        subtitle: "Gene Therapy Development",
        detail: "Phase III Trial",
        metric: "Success Rate: 94%"
      },
      {
        icon: <Brain className="w-6 h-6 text-accent-600" />,
        title: "Innovation Metrics",
        subtitle: "Treatment Development",
        detail: "New Therapy Pipeline",
        metric: "12 Candidates"
      }
    ]
  },
  {
    title: "State-of-the-Art Manufacturing",
    subtitle: "GMP Production",
    description: "Advanced manufacturing facilities ensuring the highest quality standards for cell and gene therapy production.",
    image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg",
    stats: [
      { icon: <Shield className="w-6 h-6" />, label: 'GMP Compliance', value: '100%' },
      { icon: <Activity className="w-6 h-6" />, label: 'Batch Success', value: '99.9%' },
      { icon: <Building2 className="w-6 h-6" />, label: 'Global Sites', value: '12 Facilities' }
    ],
    popups: [
      {
        icon: <Target className="w-6 h-6 text-primary-600" />,
        title: "Production Status",
        subtitle: "Manufacturing Metrics",
        detail: "Current Capacity",
        metric: "Utilization: 92%"
      },
      {
        icon: <CheckCircle2 className="w-6 h-6 text-accent-600" />,
        title: "Quality Control",
        subtitle: "Batch Analysis",
        detail: "Latest Production",
        metric: "All Tests Passed"
      }
    ]
  },
  {
    title: "Clinical Excellence Network",
    subtitle: "Treatment Centers",
    description: "Global network of specialized treatment centers delivering advanced therapeutic solutions to patients worldwide.",
    image: "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg",
    stats: [
      { icon: <Building2 className="w-6 h-6" />, label: 'Treatment Centers', value: '200+' },
      { icon: <HeartPulse className="w-6 h-6" />, label: 'Patient Care', value: '98% Satisfaction' },
      { icon: <Users className="w-6 h-6" />, label: 'Specialists', value: '500+ Experts' }
    ],
    popups: [
      {
        icon: <Stethoscope className="w-6 h-6 text-primary-600" />,
        title: "Patient Care",
        subtitle: "Treatment Progress",
        detail: "Active Patients",
        metric: "Success Rate: 96%"
      },
      {
        icon: <Users className="w-6 h-6 text-accent-600" />,
        title: "Specialist Network",
        subtitle: "Medical Team",
        detail: "Expert Coverage",
        metric: "24/7 Support"
      }
    ]
  },
  {
    title: "Advanced Supply Chain Solutions",
    subtitle: "Distribution Excellence",
    description: "Innovative cold chain and logistics solutions ensuring safe and timely delivery of cell and gene therapies globally.",
    image: "https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg",
    stats: [
      { icon: <Shield className="w-6 h-6" />, label: 'Chain of Identity', value: '100% Tracked' },
      { icon: <Activity className="w-6 h-6" />, label: 'On-Time Delivery', value: '99.8%' },
      { icon: <MapPin className="w-6 h-6" />, label: 'Global Coverage', value: '40+ Countries' }
    ],
    popups: [
      {
        icon: <Package className="w-6 h-6 text-primary-600" />,
        title: "Logistics Status",
        subtitle: "Supply Chain",
        detail: "Active Shipments",
        metric: "100% On Track"
      },
      {
        icon: <AlertTriangle className="w-6 h-6 text-accent-600" />,
        title: "Quality Assurance",
        subtitle: "Temperature Control",
        detail: "Cold Chain Status",
        metric: "All Parameters Met"
      }
    ]
  },
  {
    title: "Breakthrough Therapeutic Development",
    subtitle: "Innovation Pipeline",
    description: "Cutting-edge research and development pipeline delivering next-generation cell and gene therapy solutions.",
    image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
    stats: [
      { icon: <Beaker className="w-6 h-6" />, label: 'Pipeline Projects', value: '25+ Active' },
      { icon: <Brain className="w-6 h-6" />, label: 'Novel Targets', value: '15 Identified' },
      { icon: <Cells className="w-6 h-6" />, label: 'Success Rate', value: '92% Progress' }
    ],
    popups: [
      {
        icon: <Search className="w-6 h-6 text-primary-600" />,
        title: "Research Progress",
        subtitle: "Development Pipeline",
        detail: "Active Programs",
        metric: "15 in Phase III"
      },
      {
        icon: <Pill className="w-6 h-6 text-accent-600" />,
        title: "Clinical Progress",
        subtitle: "Trial Status",
        detail: "Patient Enrollment",
        metric: "Ahead of Schedule"
      }
    ]
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleExploreClick = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleGetStartedClick = () => {
    const innovationSection = document.getElementById('innovation');
    if (innovationSection) {
      innovationSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] pt-20 pb-16 md:pb-24 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 opacity-95">
            <div 
              className="absolute inset-0 mix-blend-overlay opacity-20"
              style={{
                backgroundImage: `url(${slides[currentSlide].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-500/30 blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-accent-500/30 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6"
            >
              <Activity className="w-4 h-4 mr-2" />
              {slides[currentSlide].subtitle}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.h1
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                {slides[currentSlide].title}
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                {slides[currentSlide].description}
              </motion.p>
            </AnimatePresence>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Button 
                onClick={handleGetStartedClick}
                size="lg"
                className="w-full sm:w-auto bg-white text-primary-600 hover:bg-gray-50"
                icon={<ArrowRight size={20} />}
                iconPosition="right"
              >
                Get Started
              </Button>
              <Button 
                onClick={handleExploreClick}
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10"
              >
                Explore Platform
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto lg:mx-0"
            >
              {slides[currentSlide].stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/30 to-accent-500/30 rounded-2xl rotate-6 transform-gpu" />
              <div className="absolute inset-0 bg-white rounded-2xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={slides[currentSlide].image}
                    alt="Cell & Gene Therapy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -left-8 top-1/4 bg-white rounded-lg shadow-xl p-4 w-64"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    {slides[currentSlide].popups[0].icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{slides[currentSlide].popups[0].title}</div>
                    <div className="text-xs text-gray-500">{slides[currentSlide].popups[0].metric}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-8 bottom-1/4 bg-white rounded-lg shadow-xl p-4 w-64"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                    {slides[currentSlide].popups[1].icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{slides[currentSlide].popups[1].title}</div>
                    <div className="text-xs text-gray-500">{slides[currentSlide].popups[1].metric}</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex space-x-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentSlide(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? "w-8 bg-white" : "bg-white/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}