import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/ui/Button';
import { useUserOnboarding } from '../UserOnboardingContext';

export function AccountSetup() {
  const navigate = useNavigate();
  const { userData, updateUserData, isStepComplete } = useUserOnboarding();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepComplete(1)) {
      navigate('/user-onboarding/personal-info');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={userData.firstName}
          onChange={(e) => updateUserData({ firstName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          value={userData.lastName}
          onChange={(e) => updateUserData({ lastName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={userData.email}
          onChange={(e) => updateUserData({ email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={userData.password}
          onChange={(e) => updateUserData({ password: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
          minLength={8}
        />
        <p className="mt-1 text-sm text-gray-500">
          Password must be at least 8 characters long
        </p>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!isStepComplete(1)}
          className="w-full sm:w-auto"
        >
          Continue
        </Button>
      </div>
    </form>
  );
}