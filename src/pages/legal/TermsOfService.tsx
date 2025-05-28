import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function TermsOfService() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600">
                  By accessing or using MediGen ("the Platform"), you agree to be bound by these Terms of Service. This platform is provided for demonstration, educational, and experimental purposes only.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Platform Purpose</h2>
                <p className="text-gray-600 mb-4">The Platform is designed to:</p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Demonstrate the potential of advanced technologies in healthcare</li>
                  <li>Provide educational content about personalized medicine</li>
                  <li>Showcase rapid development capabilities using modern tools</li>
                  <li>Experiment with AI and automation in healthcare information systems</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Important Disclaimers</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <p className="text-yellow-700 font-medium">Educational Purpose Only</p>
                  <p className="text-yellow-600">
                    This platform is for demonstration and educational purposes only. It is not intended to provide medical advice, diagnosis, or treatment recommendations.
                  </p>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-yellow-700 font-medium">No Medical Advice</p>
                  <p className="text-yellow-600">
                    Content on this platform, including AI-generated responses, should not be considered medical advice. Always consult qualified healthcare professionals for medical decisions.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  By using the Platform, you agree that:
                </p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>The Platform is provided "as is" without any warranties</li>
                  <li>We are not liable for any decisions made based on Platform content</li>
                  <li>We are not responsible for accuracy of AI-generated content</li>
                  <li>You waive any claims against us related to Platform use</li>
                  <li>This is a personal project not associated with any organization</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
                <p className="text-gray-600">
                  All content on the Platform, including AI-generated content, is for demonstration purposes. Any resemblance to actual products, services, or medical information is coincidental.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">6. User Responsibilities</h2>
                <p className="text-gray-600 mb-4">Users must:</p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Understand this is a demonstration platform</li>
                  <li>Not rely on the Platform for medical decisions</li>
                  <li>Not submit sensitive personal or medical information</li>
                  <li>Use the Platform for educational purposes only</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Changes to Terms</h2>
                <p className="text-gray-600">
                  We reserve the right to modify these terms at any time. Continued use of the Platform constitutes acceptance of updated terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
                <p className="text-gray-600">
                  For questions about these terms, please contact: geniecellgene@gmail.com
                </p>
              </section>

              <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <p className="text-sm text-gray-500">
                  Note: These terms are for a demonstration platform only. They should not be used as a template for actual medical or healthcare services. Consult legal professionals for terms of service in production environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}