import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, MessageCircle, Tag, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Logo } from './Logo';
import { supabase, checkSupabaseHealth } from '../../lib/supabase';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    fetchSubscriberCount();
  }, []);

  const fetchSubscriberCount = async () => {
    try {
      const isHealthy = await checkSupabaseHealth();
      setIsConnected(isHealthy);

      if (!isHealthy) {
        setError('Unable to connect to database');
        return;
      }

      const { count, error: countError } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact' });

      if (countError) {
        throw countError;
      }

      if (count !== null) {
        setSubscriberCount(count);
      }
    } catch (error) {
      console.error('Error fetching subscriber count:', error);
      setError('Error fetching subscriber count');
      setIsConnected(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;

    setLoading(true);
    setError('');

    try {
      const isHealthy = await checkSupabaseHealth();
      if (!isHealthy) {
        setError('Unable to connect to database. Please try again later.');
        return;
      }

      const { error: upsertError } = await supabase
        .from('newsletter_subscribers')
        .upsert([{ email }], { 
          onConflict: 'email'
        });

      if (upsertError) throw upsertError;

      setSubscribed(true);
      setEmail('');
      fetchSubscriberCount();
    } catch (error) {
      console.error('Error subscribing:', error);
      setError('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Logo />
              <span className="ml-2 font-semibold text-xl text-white">MediGen</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Revolutionizing healthcare through personalized medicine, genetic analysis, and tailored treatment plans for optimal patient outcomes.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/medigen-ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com/medigen_ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/medigen.ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition">Home</Link>
              </li>
              <li>
                <Link to="/therapies/gene-therapy" className="text-gray-400 hover:text-primary-400 transition">Gene Therapy</Link>
              </li>
              <li>
                <Link to="/therapies/cell-therapy" className="text-gray-400 hover:text-primary-400 transition">Cell Therapy</Link>
              </li>
              <li>
                <Link to="/therapies/rna-therapeutics" className="text-gray-400 hover:text-primary-400 transition">RNA Therapeutics</Link>
              </li>
              <li>
                <Link to="/therapies/advanced-therapeutics" className="text-gray-400 hover:text-primary-400 transition">Advanced Therapeutics</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary-400 transition">Blog</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="group flex items-start hover:bg-gray-800/50 p-3 rounded-lg transition-colors">
                <MapPin size={20} className="text-primary-500 mr-3 mt-1 flex-shrink-0 group-hover:text-primary-400 transition-colors" />
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  936 Villageview lane, Cary, NC, 27519
                </span>
              </li>
              <li className="group flex items-center hover:bg-gray-800/50 p-3 rounded-lg transition-colors">
                <Phone size={20} className="text-primary-500 mr-3 flex-shrink-0 group-hover:text-primary-400 transition-colors" />
                <a href="tel:+17323060648" className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  (732) 306-0648
                </a>
              </li>
              <li className="group flex items-center hover:bg-gray-800/50 p-3 rounded-lg transition-colors">
                <Mail size={20} className="text-primary-500 mr-3 flex-shrink-0 group-hover:text-primary-400 transition-colors" />
                <a href="mailto:geniecellgene@gmail.com" className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  geniecellgene@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="max-w-xl mx-auto text-center">
            <h4 className="text-lg font-semibold mb-3">Subscribe to Our Newsletter</h4>
            {isConnected ? (
              <>
                <p className="text-sm text-gray-400 mb-4">
                  Join {subscriberCount.toLocaleString()} subscribers for updates on personalized medicine and advanced therapeutics
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2.5 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    required
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className={`bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
                {error && (
                  <p className="mt-2 text-sm text-red-400">
                    {error}
                  </p>
                )}
                {subscribed && (
                  <p className="mt-2 text-sm text-green-400">
                    Thank you for subscribing! Please check your email.
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-yellow-400 mb-4">
                Newsletter subscription is temporarily unavailable. Please try again later.
              </p>
            )}
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} MediGen. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-primary-400 transition">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-primary-400 transition">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-gray-500 hover:text-primary-400 transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}