import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-8">
            <Link to="/" className="flex items-center text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600">
                  This Privacy Policy describes how MediGen ("we," "us," or "our") collects, uses, and shares your information when you use our educational platform and services. This platform is designed for demonstration and educational purposes only.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Information Collection</h2>
                <p className="text-gray-600 mb-4">We collect information that you provide directly to us, including:</p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Email address for newsletter subscription</li>
                  <li>Contact information when using our contact forms</li>
                  <li>Usage data and interaction with our platform</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Use of Information</h2>
                <p className="text-gray-600 mb-4">We use the collected information for:</p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Providing educational content and updates</li>
                  <li>Improving our platform and user experience</li>
                  <li>Communicating with you about our services</li>
                  <li>Research and demonstration purposes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Protection</h2>
                <p className="text-gray-600">
                  While we implement reasonable security measures, this platform is primarily for demonstration purposes. Do not submit sensitive personal or medical information through this platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. AI and Automated Systems</h2>
                <p className="text-gray-600">
                  Our platform utilizes artificial intelligence and automated systems for content generation and interactions. Users should be aware that responses and content may be AI-generated and should not be considered medical advice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Third-Party Services</h2>
                <p className="text-gray-600">
                  We may use third-party services for analytics, hosting, and other functions. These services have their own privacy policies and data collection practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
                <p className="text-gray-600 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Access your personal information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of communications</li>
                  <li>Update your preferences</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
                <p className="text-gray-600">
                  For privacy-related questions or concerns, please contact us at: geniecellgene@gmail.com
                </p>
              </section>

              <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <p className="text-sm text-gray-500">
                  Disclaimer: This privacy policy is for a demonstration platform and should not be used as a template for actual medical or healthcare services. Consult legal professionals for privacy policies in production environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}