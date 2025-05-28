import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { Logo } from './Logo';

type NavLink = {
  label: string;
  href: string;
  submenu?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { 
    label: 'Platform', 
    href: '#',
    submenu: [
      { label: 'Manufacturer', href: '/platform/manufacturer' },
      { label: 'Treatment Centers', href: '/platform/treatment-centers' },
      { label: 'Distribution Centers', href: '/platform/distribution-centers' },
    ]
  },
  { 
    label: 'Blog', 
    href: '/blog',
    submenu: [
      { label: 'All Posts', href: '/blog' },
      { label: 'Categories', href: '/blog/categories' }
    ]
  },
  { label: 'About Me', href: '/about' },
  { 
    label: 'Contact', 
    href: 'mailto:geniecellgene@gmail.com',
    submenu: [
      { label: 'Email Us', href: 'mailto:geniecellgene@gmail.com' },
      { label: 'Call Us', href: 'tel:+17323060648' }
    ]
  }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const toggleSubmenu = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || location.pathname !== '/' ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <Link to="/" className="flex items-center">
              <Logo />
              <span className={cn(
                'ml-3 font-semibold text-xl transition-colors duration-300',
                scrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-primary-600'
              )}>
                MediGen
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => 
                link.submenu ? (
                  <div key={link.label} className="relative group">
                    <button 
                      onClick={() => toggleSubmenu(link.label)}
                      className={cn(
                        'flex items-center font-medium transition-colors whitespace-nowrap',
                        scrolled || location.pathname !== '/' ? 'text-gray-800 hover:text-primary-600' : 'text-gray-100 hover:text-white'
                      )}
                    >
                      {link.label}
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                    <div className={cn(
                      'absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-left',
                      activeSubmenu === link.label ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    )}>
                      <div className="py-1">
                        {link.submenu.map((sublink) => (
                          <Link
                            key={sublink.label}
                            to={sublink.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                          >
                            {sublink.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={cn(
                      'font-medium transition-colors whitespace-nowrap',
                      scrolled || location.pathname !== '/' ? 'text-gray-800 hover:text-primary-600' : 'text-gray-100 hover:text-white'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>
          
          <div className="hidden md:flex items-center">
            <Button 
              variant="outline" 
              href="/login"
              className={cn(
                'whitespace-nowrap ml-8',
                scrolled || location.pathname !== '/' ? 'border-gray-300 text-gray-800' : 'border-white text-white'
              )}
            >
              Log in
            </Button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={cn(
                'p-2 rounded-md focus:outline-none transition-colors',
                scrolled || location.pathname !== '/' ? 'text-gray-800 hover:text-primary-600' : 'text-gray-200 hover:text-white'
              )}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      <div className={cn(
        'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
        isOpen ? 'max-h-screen bg-white' : 'max-h-0'
      )}>
        <div className="px-4 pt-2 pb-3 space-y-1 sm:px-6">
          {navLinks.map((link) => 
            link.submenu ? (
              <div key={link.label}>
                <button
                  onClick={() => toggleSubmenu(link.label)}
                  className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  {link.label}
                  <ChevronDown size={16} className={cn(
                    'transition-transform duration-200',
                    activeSubmenu === link.label ? 'rotate-180' : ''
                  )} />
                </button>
                <div className={cn(
                  'pl-4 space-y-1 transition-all duration-200',
                  activeSubmenu === link.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                )}>
                  {link.submenu.map((sublink) => (
                    <Link
                      key={sublink.label}
                      to={sublink.href}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md"
                    >
                      {sublink.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-primary-600 rounded-md"
              >
                {link.label}
              </Link>
            )
          )}
          <div className="pt-4">
            <Button variant="outline" href="/login" className="w-full justify-center whitespace-nowrap">
              Log in
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}