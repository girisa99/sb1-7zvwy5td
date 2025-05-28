```typescript
export type LLMModel = 'gemini' | 'gpt' | 'claude';
export type ModelSelectionMode = 'system' | 'single' | 'multi' | 'medical' | 'publication';

export interface MedicalSearchParams {
  manufacturer?: string;
  brandName?: string;
  therapy?: string;
  indication?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  model?: LLMModel;
  sources?: {
    fda?: any[];
    clinical?: any[];
    commercial?: any;
    publications?: any[];
    hcpcs?: any;
    icd?: any;
    competitors?: any[];
    therapy?: string;
  };
}

export interface ComparisonView {
  isEnabled: boolean;
  models: [LLMModel, LLMModel];
}

export interface RAGContent {
  id: string;
  query: string;
  response: string;
  context: {
    fda: any;
    icd: any;
    clinical?: any;
    commercial?: any;
    publications?: any;
  };
  status: 'pending_review' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  title?: string;
  slug?: string;
  summary?: string;
  category_id?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface MedicalSource {
  type: 'fda' | 'clinical' | 'commercial' | 'publication';
  data: any;
  timestamp: string;
}

export interface CommercialData {
  wac?: number;
  awp?: number;
  asp?: number;
  '340b'?: number;
  fss?: number;
  ndc?: string;
  gtin?: string;
  packageSize?: string;
}
```