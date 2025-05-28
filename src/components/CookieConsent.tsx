import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookieConsent');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-gray-600 text-sm">
                  We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                  Read our{' '}
                  <Link to="/cookie-policy" className="text-primary-600 hover:text-primary-700 underline">
                    Cookie Policy
                  </Link>
                  ,{' '}
                  <Link to="/privacy-policy" className="text-primary-600 hover:text-primary-700 underline">
                    Privacy Policy
                  </Link>
                  , and{' '}
                  <Link to="/terms-of-service" className="text-primary-600 hover:text-primary-700 underline">
                    Terms of Service
                  </Link>
                  .
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleReject}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={handleReject}
                  className="p-1 text-gray-400 hover:text-gray-600 sm:hidden"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}