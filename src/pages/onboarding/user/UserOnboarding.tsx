import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingSteps } from './OnboardingSteps';
import { AccountSetup } from './steps/AccountSetup';
import { useUserOnboarding } from './UserOnboardingContext';

export function UserOnboarding() {
  const { currentStep } = useUserOnboarding();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Create Your Account
          </h1>
          <OnboardingSteps />
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <Routes>
              <Route index element={<Navigate to="account-setup" replace />} />
              <Route path="account-setup" element={<AccountSetup />} />
              {/* Add other step components here */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}