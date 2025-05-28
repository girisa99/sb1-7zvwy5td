import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function CookiePolicy() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600">
                  This Cookie Policy explains how MediGen ("we," "us," or "our") uses cookies and similar technologies on our demonstration platform. This platform is for educational and experimental purposes only.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. What Are Cookies</h2>
                <p className="text-gray-600">
                  Cookies are small text files stored on your device when you visit our platform. They help us provide and improve our services by:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mt-4">
                  <li>Remembering your preferences</li>
                  <li>Understanding how you use our platform</li>
                  <li>Providing a more personalized experience</li>
                  <li>Analyzing platform performance</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900">Essential Cookies</h3>
                    <p className="text-gray-600">Required for basic platform functionality and security.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900">Analytics Cookies</h3>
                    <p className="text-gray-600">Help us understand how visitors interact with our platform.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900">Functionality Cookies</h3>
                    <p className="text-gray-600">Remember your preferences and settings.</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
                <p className="text-gray-600">
                  We use services from these providers that may place cookies on your device:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mt-4">
                  <li>Google Analytics (analytics)</li>
                  <li>Supabase (authentication and database)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Cookie Management</h2>
                <p className="text-gray-600 mb-4">
                  You can control cookies through your browser settings. However, disabling certain cookies may limit platform functionality.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    Note: This is a demonstration platform. Cookie settings are simplified for educational purposes.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Data Collection</h2>
                <p className="text-gray-600">
                  Information collected through cookies is used only for platform demonstration and educational purposes. We do not sell or share this data with third parties.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Updates to This Policy</h2>
                <p className="text-gray-600">
                  We may update this Cookie Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
                <p className="text-gray-600">
                  For questions about our Cookie Policy, please contact: dasikasaigiridhar@gmail.com
                </p>
              </section>

              <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <p className="text-sm text-gray-500">
                  Disclaimer: This cookie policy is for a demonstration platform and should not be used as a template for actual medical or healthcare services. Consult legal professionals for cookie policies in production environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}