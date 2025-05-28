import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Patient',
    image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: `MediGen completely changed my treatment experience. After years of trial and error with medications that weren't working for me, their personalized approach identified treatments that actually work with my genetic makeup. I'm now managing my condition better than ever before.`,
    rating: 5,
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Cardiologist',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: `As a physician, I've seen firsthand how personalized medicine can transform patient outcomes. MediGen provides my patients with tailored treatments based on their genetic profiles, resulting in fewer side effects and better overall response rates. It's revolutionizing how we practice medicine.`,
    rating: 5,
  },
  {
    name: 'Robert Williams',
    role: 'Patient',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: `After struggling with medication side effects for years, MediGen helped my doctor find a treatment that works perfectly with my body. The difference has been night and day - fewer side effects and better symptom control. I wish I had discovered this technology years ago.`,
    rating: 4,
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Oncologist',
    image: 'https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: `MediGen has given my cancer patients access to precision medicine that was previously only available at major research hospitals. Their genetic profiling helps me target treatments specifically to each patient's cancer, improving efficacy while reducing unnecessary treatments.`,
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-accent-900 to-primary-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white text-sm font-medium mb-4 backdrop-blur-sm">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Changing Lives Through Personalized Medicine
          </h2>
          <p className="text-lg text-gray-100">
            Hear from patients and doctors who've experienced the transformative power of our approach.
          </p>
        </div>

        {/* Large screens - display multiple testimonials */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-8">
            {[0, 1].map((offset) => {
              const idx = (currentIndex + offset) % testimonials.length;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex space-x-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < testimonials[idx].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <blockquote className="text-lg text-gray-100 italic mb-6 flex-grow">
                      "{testimonials[idx].content}"
                    </blockquote>
                    <div className="flex items-center">
                      <img
                        src={testimonials[idx].image}
                        alt={testimonials[idx].name}
                        className="h-12 w-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <p className="font-semibold">{testimonials[idx].name}</p>
                        <p className="text-sm text-gray-300">{testimonials[idx].role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Small screens - display single testimonial */}
        <div className="lg:hidden">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < testimonials[currentIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <blockquote className="text-lg text-gray-100 italic mb-6 flex-grow">
                "{testimonials[currentIndex].content}"
              </blockquote>
              <div className="flex items-center">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonials[currentIndex].name}</p>
                  <p className="text-sm text-gray-300">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/40"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}