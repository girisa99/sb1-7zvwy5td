import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { emailService } from '../../services/email.service';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import userService from '../../services/api/user.service';

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  acceptTerms: boolean;
  newsletterOptIn: boolean;
}

export function GenieRegistration({ onComplete }: { onComplete: () => void }) {
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    acceptTerms: false,
    newsletterOptIn: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Store user data in local storage first
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      };
      
      localStorage.setItem('genieRegistered', 'true');
      localStorage.setItem('genieUser', JSON.stringify(userData));

      // Add user to genie_users table
      const { error: userError } = await supabase
        .from('genie_users')
        .upsert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          newsletter_opt_in: formData.newsletterOptIn
        }, {
          onConflict: 'email'
        });

      if (userError) {
        console.error('Error inserting user:', userError);
        // Don't throw here - continue with local storage data
      }

      // Add to newsletter subscribers if opted in
      if (formData.newsletterOptIn) {
        const { error: subscribeError } = await supabase
          .from('newsletter_subscribers')
          .upsert({ 
            email: formData.email 
          }, {
            onConflict: 'email'
          });

        if (subscribeError) {
          console.error('Newsletter subscription error:', subscribeError);
          // Don't throw - continue with registration
        }

        try {
          await emailService.sendNewsletterWelcome(formData.email);
        } catch (emailError) {
          console.error('Newsletter welcome email error:', emailError);
          // Don't throw - continue with registration
        }
      }

      try {
        await emailService.sendWelcomeEmail(formData.email, {
          firstName: formData.firstName
        });
      } catch (emailError) {
        console.error('Welcome email error:', emailError);
        // Don't throw - continue with registration
      }

      setSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration completed but some features may be limited. You can continue using Genie.');
      
      // Still complete registration if we have local storage data
      if (localStorage.getItem('genieUser')) {
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-lg mx-auto"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to Genie</h2>
        <p className="text-gray-600">
          Your AI assistant for personalized medicine insights
        </p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
        </div>

        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                required
                checked={formData.acceptTerms}
                onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
              />
            </div>
            <div className="ml-3">
              <label className="text-sm font-medium text-gray-700">
                I accept the <Link to="/terms-of-service" className="text-primary-600 hover:text-primary-700 underline">Terms of Service</Link>
              </label>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={formData.newsletterOptIn}
                onChange={(e) => setFormData(prev => ({ ...prev, newsletterOptIn: e.target.checked }))}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
              />
            </div>
            <div className="ml-3">
              <label className="text-sm font-medium text-gray-700">
                Subscribe to newsletter
              </label>
              <p className="text-sm text-gray-500 mt-0.5">
                Stay updated with medical insights and features
              </p>
            </div>
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg"
          >
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <p className="ml-3 text-sm text-yellow-700">{error}</p>
            </div>
          </motion.div>
        )}

        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg"
          >
            <div className="flex">
              <Check className="h-5 w-5 text-green-400" />
              <p className="ml-3 text-sm text-green-700">
                Registration successful! Preparing your AI assistant...
              </p>
            </div>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={loading || success}
          className={cn(
            'w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white',
            'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
            'transition-all duration-200 transform hover:scale-[1.02]',
            (loading || success) && 'opacity-50 cursor-not-allowed'
          )}
          whileHover={{ scale: loading || success ? 1 : 1.02 }}
          whileTap={{ scale: loading || success ? 1 : 0.98 }}
        >
          {loading ? 'Setting up your account...' : success ? 'Success!' : 'Complete Registration'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}