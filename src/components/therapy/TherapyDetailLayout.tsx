import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';
import { getVideoIdFromUrl } from '../../services/youtubeService';
import { VideoSection } from './VideoSection';
import { TherapyJourney } from './TherapyJourney';
import { TherapyDocumentation } from './TherapyDocumentation';
import { Button } from '../ui/Button';

export interface TherapyDetailLayoutProps {
  title: string;
  description: string;
  highlights: any[];
  applications: any[];
  journey: any[];
  totalDuration: string;
  clinicalTrials: {
    phase: string;
    name: string;
    status: string;
    details: string;
    reference: string;
    sponsor: string;
    locations: string[];
    competitors: {
      name: string;
      trial: string;
      phase: string;
    }[];
  }[];
  resources: {
    publications: any[];
    videos: any[];
    casestudies: any[];
    guidelines?: any[];
    presentations?: any[];
    technicalDocs?: any[];
  };
  requirements: {
    medical: string[];
    practical: string[];
  };
}

export function TherapyDetailLayout({ 
  title,
  description,
  highlights,
  applications,
  journey,
  totalDuration,
  clinicalTrials,
  resources,
  requirements,
}: TherapyDetailLayoutProps) {
  const [activeTab, setActiveTab] = useState('highlights');
  const [expandedResource, setExpandedResource] = useState<string | null>(null);
  const [showDocumentation, setShowDocumentation] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);

  const therapyType = title.includes('CAR-T') ? 'CAR-T' :
                     title.includes('Gene') ? 'Gene' :
                     title.includes('RNA') ? 'RNA' : 'Advanced';

  useEffect(() => {
    window.scrollTo(0, 0);
    // Show documentation if coming from innovation section
    if (location.state?.showDocumentation) {
      setShowDocumentation(true);
    }
  }, [location.state]);

  const handleBackClick = () => {
    if (location.state?.fromInnovation) {
      navigate('/', { 
        state: { scrollToInnovation: true }
      });
    } else {
      navigate(-1);
    }
  };

  const handleViewDocumentation = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setShowDocumentation(true), 500);
  };

  const tabs = [
    { id: 'highlights', label: 'Key Highlights' },
    { id: 'applications', label: 'Clinical Applications' },
    { id: 'journey', label: 'Treatment Journey' },
    { id: 'requirements', label: 'Treatment Requirements' },
    { id: 'trials', label: 'Clinical Trials' },
    { id: 'resources', label: 'Additional Resources' }
  ];

  const renderResourceCard = (resource: any, index: number) => (
    <div key={index} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-lg font-semibold text-gray-900">{resource.title}</h4>
        <div className="flex items-center space-x-2">
          {resource.url && (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 flex items-center"
            >
              {resource.type === 'Link' ? (
                <ExternalLink size={16} className="ml-1" />
              ) : (
                <Download size={16} className="ml-1" />
              )}
            </a>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
      {resource.source && (
        <div className="text-xs text-gray-500">Source: {resource.source}</div>
      )}
      {resource.datePublished && (
        <div className="text-xs text-gray-500">
          Published: {new Date(resource.datePublished).toLocaleDateString()}
        </div>
      )}
      {resource.size && (
        <div className="text-xs text-gray-500">Size: {resource.size}</div>
      )}
      {resource.tags && resource.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {resource.tags.map((tag: string, tagIndex: number) => (
            <span
              key={tagIndex}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" ref={mainRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={handleBackClick}
              className="mr-4 hover:bg-gray-100"
              icon={<ArrowLeft size={20} />}
            >
              Back
            </Button>
            <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
          </div>
          
          <div className="prose prose-lg max-w-none mb-8">
            <p>{description}</p>
          </div>

          <div className="mb-8 flex justify-end">
            <Button
              variant="primary"
              onClick={handleViewDocumentation}
              className="bg-primary-600 text-white"
            >
              View Documentation
            </Button>
          </div>

          <AnimatePresence>
            {showDocumentation && (
              <TherapyDocumentation
                therapy={therapyType}
                onClose={() => setShowDocumentation(false)}
              />
            )}
          </AnimatePresence>

          <div className="mb-8 border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-b-2 border-primary-500 text-primary-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {activeTab === 'highlights' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {highlights.map((highlight, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-4">
                        {highlight.icon}
                      </div>
                      <h3 className="text-lg font-semibold">{highlight.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{highlight.description}</p>
                    <div className="bg-white rounded p-4 text-sm text-primary-700">
                      {highlight.details}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-6">
                {applications.map((app, index) => (
                  <div key={index} className="border-l-4 border-primary-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">{app.condition}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 rounded p-4">
                        <p className="font-medium text-gray-700">Approach</p>
                        <p className="text-gray-600">{app.approach}</p>
                      </div>
                      <div className="bg-gray-50 rounded p-4">
                        <p className="font-medium text-gray-700">Effectiveness</p>
                        <p className="text-primary-600">{app.effectiveness}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded">{app.details}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'journey' && (
              <TherapyJourney 
                journeySteps={journey}
                therapyType={title}
                totalDuration={totalDuration}
              />
            )}

            {activeTab === 'requirements' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Medical Requirements</h3>
                  <div className="space-y-3">
                    {requirements.medical.map((req, index) => (
                      <div key={index} className="flex items-center bg-gray-50 p-3 rounded">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2" />
                        <span className="text-gray-700">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Practical Requirements</h3>
                  <div className="space-y-3">
                    {requirements.practical.map((req, index) => (
                      <div key={index} className="flex items-center bg-gray-50 p-3 rounded">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2" />
                        <span className="text-gray-700">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'trials' && (
              <div className="space-y-6">
                {clinicalTrials.map((trial, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{trial.name}</h3>
                        <p className="text-gray-600 mt-1">{trial.details}</p>
                        <p className="text-sm text-gray-500 mt-2">Sponsor: {trial.sponsor}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          trial.status === 'Recruiting' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {trial.status}
                        </span>
                        <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                          {trial.phase}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-4">
                      {trial.locations && trial.locations.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Trial Locations</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {trial.locations.map((location, idx) => (
                              <li key={idx} className="flex items-center text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2"></div>
                                {location}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {trial.competitors && trial.competitors.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Competing Trials</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {trial.competitors.map((competitor, idx) => (
                              <div key={idx} className="bg-gray-50 rounded p-3">
                                <p className="font-medium text-gray-800">{competitor.name}</p>
                                <p className="text-sm text-gray-600">Trial: {competitor.trial}</p>
                                <p className="text-sm text-gray-600">Phase: {competitor.phase}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t border-gray-200">
                        <a
                          href={trial.reference}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 flex items-center text-sm"
                        >
                          View Full Trial Details
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-8">
                {/* Publications Section */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Scientific Publications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resources.publications.map((pub, index) => (
                      <div key={index} className="bg-white rounded-lg shadow p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{pub.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {pub.authors.join(', ')}
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                          {pub.journal} ({pub.year})
                        </p>
                        {pub.abstract && (
                          <div className="mb-2">
                            <button
                              onClick={() => setExpandedResource(expandedResource === `pub-${index}` ? null : `pub-${index}`)}
                              className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                            >
                              {expandedResource === `pub-${index}` ? 'Hide' : 'Show'} Abstract
                            </button>
                            {expandedResource === `pub-${index}` && (
                              <p className="mt-2 text-sm text-gray-600">{pub.abstract}</p>
                            )}
                          </div>
                        )}
                        <div className="flex space-x-2">
                          {pub.doi && (
                            <a
                              href={`https://doi.org/${pub.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                            >
                              DOI
                              <ExternalLink size={14} className="ml-1" />
                            </a>
                          )}
                          {pub.url && (
                            <a
                              href={pub.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                            >
                              View Paper
                              <ExternalLink size={14} className="ml-1" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Documentation */}
                {resources.technicalDocs && resources.technicalDocs.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Technical Documentation
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {resources.technicalDocs.map((doc, index) => renderResourceCard(doc, index))}
                    </div>
                  </div>
                )}

                {/* Guidelines */}
                {resources.guidelines && resources.guidelines.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Clinical Guidelines
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {resources.guidelines.map((guide, index) => renderResourceCard(guide, index))}
                    </div>
                  </div>
                )}

                {/* Presentations */}
                {resources.presentations && resources.presentations.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Presentations & Slides
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {resources.presentations.map((pres, index) => renderResourceCard(pres, index))}
                    </div>
                  </div>
                )}

                {/* Videos Section */}
                {resources.videos && resources.videos.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Educational Videos
                    </h3>
                    <VideoSection videos={resources.videos} />
                  </div>
                )}

                {/* Case Studies */}
                {resources.casestudies && resources.casestudies.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Case Studies
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resources.casestudies.map((study, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{study.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{study.summary}</p>
                          <a
                            href={study.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                          >
                            Read Full Case Study
                            <ExternalLink size={14} className="ml-1" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}