import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Dna, Bell as Cells, Workflow, Brain } from 'lucide-react';

const therapyRoutes = [
  {
    path: '/therapies/gene-therapy',
    label: 'Gene Therapy',
    icon: <Dna className="w-5 h-5" />
  },
  {
    path: '/therapies/cell-therapy',
    label: 'Cell Therapy',
    icon: <Cells className="w-5 h-5" />
  },
  {
    path: '/therapies/rna-therapeutics',
    label: 'RNA Therapeutics',
    icon: <Workflow className="w-5 h-5" />
  },
  {
    path: '/therapies/advanced-therapeutics',
    label: 'Advanced Therapeutics',
    icon: <Brain className="w-5 h-5" />
  }
];

export function TherapyNav() {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center overflow-x-auto">
          {therapyRoutes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                "flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors",
                location.pathname === route.path
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <span className="mr-2">{route.icon}</span>
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}