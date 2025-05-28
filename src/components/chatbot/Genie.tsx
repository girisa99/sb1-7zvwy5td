import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, MessageCircle, X, Minimize2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useChatStore } from '../../stores/chat.store';
import { LLMSelector } from './LLMSelector';
import { Message } from './Message';
import { GenieIcon } from './GenieIcon';
import { ContentReview } from './ContentReview';
import { GenieRegistration } from './GenieRegistration';
import userService from '../../services/api/user.service';

interface UserPreferences {
  selectionMode: 'system' | 'single' | 'multi' | 'medical' | 'publication';
  selectedModels: string[];
  firstName: string;
  lastName: string;
  email: string;
}

export function Genie() {
  const {
    messages,
    isLoading,
    error,
    selectionMode,
    selectedModels,
    comparisonView,
    setSelectionMode,
    setSelectedModels,
    enableComparisonView,
    disableComparisonView,
    sendMessage,
    clearMessages,
  } = useChatStore();

  const [isRegistered, setIsRegistered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [showModelSelect, setShowModelSelect] = useState(true);
  const [userPrefs, setUserPrefs] = useState<UserPreferences | null>(null);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedUser = userService.getStoredUser();
    const storedPrefs = localStorage.getItem('geniePreferences');
    
    if (storedUser) {
      const prefs = storedPrefs ? JSON.parse(storedPrefs) : null;
      setIsRegistered(true);
      setUserPrefs({ ...storedUser, ...prefs });
      
      if (isOpen) {
        setShowWelcomeBack(true);
        setTimeout(() => setShowWelcomeBack(false), 3000);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await sendMessage(input.trim());
    setInput('');
  };

  const handleModelSelectConfirm = () => {
    setShowModelSelect(false);
    if (userPrefs) {
      const updatedPrefs = {
        ...userPrefs,
        selectionMode,
        selectedModels
      };
      localStorage.setItem('geniePreferences', JSON.stringify(updatedPrefs));
      setUserPrefs(updatedPrefs);
    }
  };

  const handleRegistrationComplete = () => {
    setIsRegistered(true);
    setShowModelSelect(true);
    const storedUser = userService.getStoredUser();
    if (storedUser) {
      setUserPrefs(storedUser);
    }
  };

  const handleNewConversation = () => {
    clearMessages();
    setShowModelSelect(true);
  };

  const handleContinueConversation = () => {
    setShowModelSelect(false);
    if (userPrefs) {
      setSelectionMode(userPrefs.selectionMode);
      setSelectedModels(userPrefs.selectedModels as any[]);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 p-4 bg-primary-600 text-white",
          "rounded-full shadow-lg hover:bg-primary-700 transition-all z-50",
          "flex flex-col items-center gap-2",
          isOpen ? "hidden" : "flex"
        )}
        initial={false}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        <GenieIcon className="w-8 h-8" />
        <span className="text-xs font-medium whitespace-nowrap">
          {userPrefs ? `Hi, ${userPrefs.firstName}!` : "Hi, I'm Genie!"}
        </span>
      </motion.button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 w-[800px] h-[600px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden z-50"
          >
            <div className="flex items-center justify-between p-4 bg-primary-600 text-white">
              <div className="flex items-center space-x-3">
                <GenieIcon className="w-8 h-8" />
                <div>
                  <span className="font-medium">Genie</span>
                  <p className="text-xs text-white/80">Built with Cell & Gene</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-primary-700 rounded transition-colors"
                  title="Minimize"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    clearMessages();
                    setShowModelSelect(true);
                  }}
                  className="p-1 hover:bg-primary-700 rounded transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              {!isRegistered ? (
                <GenieRegistration onComplete={handleRegistrationComplete} />
              ) : showModelSelect ? (
                <div className="h-full flex flex-col items-center justify-center p-4 space-y-4">
                  {showWelcomeBack && userPrefs && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="bg-primary-50 text-primary-800 p-4 rounded-lg mb-4"
                    >
                      <h3 className="font-medium">Welcome back, {userPrefs.firstName}!</h3>
                      <div className="mt-4 flex space-x-4">
                        <button
                          onClick={handleContinueConversation}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          Continue Previous Conversation
                        </button>
                        <button
                          onClick={handleNewConversation}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          Start New Conversation
                        </button>
                      </div>
                    </motion.div>
                  )}
                  
                  <GenieIcon className="w-8 h-8" />
                  <div className="text-center space-y-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      {userPrefs ? `How can I help you today, ${userPrefs.firstName}?` : 'Welcome to Genie!'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Choose how you'd like me to assist you:
                    </p>
                  </div>
                  <LLMSelector
                    selectionMode={selectionMode}
                    selectedModels={selectedModels}
                    onModeSelect={setSelectionMode}
                    onModelSelect={setSelectedModels}
                    onComparisonEnabled={enableComparisonView}
                    onConfirm={handleModelSelectConfirm}
                  />
                  {selectionMode === 'publication' && (
                    <div className="w-full mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Content Review Queue
                      </h4>
                      <ContentReview />
                    </div>
                  )}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  {renderMessages()}
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-xs">
                      {error}
                    </div>
                  )}
                  {isLoading && (
                    <div className="flex justify-center">
                      <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t bg-gray-50">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  disabled={isLoading || showModelSelect}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim() || showModelSelect}
                  className={cn(
                    "px-3 py-1.5 bg-primary-600 text-white rounded-lg",
                    "hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-colors"
                  )}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  function renderMessages() {
    if (comparisonView.isEnabled) {
      return (
        <div className="grid grid-cols-2 gap-2 h-full">
          {comparisonView.models.map((model, index) => (
            <div key={model} className="flex flex-col h-full border-r last:border-r-0">
              <div className="text-xs font-medium text-gray-700 px-2 py-1 bg-gray-50">
                {model.toUpperCase()}
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {messages
                  .filter(msg => msg.role === 'user' || msg.model === model)
                  .map((message, msgIndex) => (
                    <Message key={`${model}-${msgIndex}`} message={message} />
                  ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    );
  }
}