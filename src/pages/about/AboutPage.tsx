import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              {/* Important Notice */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                <p className="text-yellow-700">
                  <strong>Please Note:</strong> This website is generated through AI and is intended for informational and experimental purposes only. The information provided here is for educational purposes and to showcase rapid AI-driven innovation in the Cell & Gene Therapy ecosystem. This platform demonstrates how quickly AI can be leveraged to develop and deploy solutions addressing critical industry needs.
                </p>
              </div>

              {/* Profile Section */}
              <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
                <div className="w-48 flex-shrink-0">
                  <img 
                    src="sai-dasika.jpg" 
                    alt="Sai Dasika" 
                    className="w-full rounded-lg shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/200x200?text=Sai+Dasika';
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">About Me - Sai Dasika</h1>
                  <p className="text-gray-600 mb-4">
                    As a technology innovator with 19 years of experience across pharmaceutical, life science, and biotech industries, I specialize in bridging the gap between advanced technology solutions and complex business challenges in the therapeutic development landscape.
                  </p>
                </div>
              </div>

              {/* Professional Journey */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Journey</h2>
                <p className="text-gray-600 mb-4">
                  My career spans technology leadership roles at industry giants including Novartis, Bayer, Conduent, Amgen, and Pfizer, where I've led digital transformation initiatives across commercial operations, clinical R&D, regulatory affairs, and supply chain management. I've consistently focused on implementing innovative technology solutions to streamline operations and accelerate therapeutic development.
                </p>
                <p className="text-gray-600 mb-4">
                  With an MBA from Cornell University's Johnson School and successful launches of three SaaS products—including a pioneering platform for animal agriculture—I combine deep technical expertise with strategic business acumen to drive technological innovation in healthcare.
                </p>
              </section>

              {/* Future Outlook */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology-Enabled Future</h2>
                <p className="text-gray-600 mb-4">
                  The convergence of AI, machine learning, and advanced therapeutics is creating unprecedented opportunities for innovation. We're entering an era where technology will not only accelerate therapeutic development but fundamentally transform how we approach treatment personalization, manufacturing efficiency, and patient outcomes.
                </p>
                <p className="text-gray-600 mb-4">
                  Key technological advances on the horizon include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>AI-driven therapeutic design and optimization</li>
                  <li>Automated, continuous manufacturing processes</li>
                  <li>Integrated digital supply chain solutions</li>
                  <li>Real-time patient monitoring and response prediction</li>
                </ul>
                <p className="text-gray-600">
                  Through this platform, we're demonstrating how rapidly emerging technologies can be harnessed to address critical industry challenges and accelerate the development of life-changing therapies.
                </p>
              </section>

              {/* Personal Life */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Personal Life & Community Engagement</h2>
                <p className="text-gray-600 mb-4">
                  Based in Cary, NC, I balance my passion for technology and innovation with a rich family life. Married for 22 years with two children, I find joy in exploring new technologies, motorcycling adventures, and international travel. My commitment to fostering innovation extends beyond my professional work—I actively mentor startup communities through technology incubators and university programs, helping the next generation of entrepreneurs leverage emerging technologies to solve complex healthcare challenges.
                </p>
                <p className="text-gray-600">
                  This platform represents my vision of democratizing access to advanced therapeutic knowledge while showcasing how rapidly evolving technologies can transform the healthcare landscape. It's a testament to the power of combining deep industry expertise with cutting-edge technological innovation.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}