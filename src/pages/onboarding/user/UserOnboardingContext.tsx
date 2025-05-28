import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  existingConditions: string[];
  medications: string[];
  allergies: string[];
  familyHistory: Record<string, boolean>;
  healthGoals: string[];
  preferredContactMethod: string;
  termsAccepted: boolean;
};

type UserOnboardingContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  isStepComplete: (step: number) => boolean;
};

const defaultUserData: UserData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  dateOfBirth: '',
  gender: '',
  phoneNumber: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  existingConditions: [],
  medications: [],
  allergies: [],
  familyHistory: {
    diabetes: false,
    heartDisease: false,
    cancer: false,
    highBloodPressure: false,
    stroke: false,
    mentalHealth: false,
  },
  healthGoals: [],
  preferredContactMethod: 'email',
  termsAccepted: false,
};

const UserOnboardingContext = createContext<UserOnboardingContextType | undefined>(undefined);

export function UserOnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1: // Basic information
        return !!(
          userData.firstName && 
          userData.lastName && 
          userData.email && 
          userData.password
        );
      case 2: // Personal details
        return !!(
          userData.dateOfBirth && 
          userData.gender && 
          userData.phoneNumber
        );
      case 3: // Address
        return !!(
          userData.address && 
          userData.city && 
          userData.state && 
          userData.zipCode
        );
      case 4: // Medical history
        return userData.existingConditions.length > 0 || userData.medications.length > 0;
      case 5: // Family history
        return Object.values(userData.familyHistory).some(Boolean);
      case 6: // Health goals
        return userData.healthGoals.length > 0;
      case 7: // Review and terms
        return userData.termsAccepted;
      default:
        return false;
    }
  };

  return (
    <UserOnboardingContext.Provider value={{
      currentStep,
      setCurrentStep,
      userData,
      updateUserData,
      isStepComplete,
    }}>
      {children}
    </UserOnboardingContext.Provider>
  );
}

export function useUserOnboarding() {
  const context = useContext(UserOnboardingContext);
  if (context === undefined) {
    throw new Error('useUserOnboarding must be used within a UserOnboardingProvider');
  }
  return context;
}