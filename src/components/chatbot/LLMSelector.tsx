import React, { useState } from 'react';
import { CheckSquare, Square, SplitSquareHorizontal, FileText, Brain, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { LLMModel, ModelSelectionMode } from '../../types/chat';

interface LLMSelectorProps {
  selectionMode: ModelSelectionMode;
  selectedModels: LLMModel[];
  onModeSelect: (mode: ModelSelectionMode) => void;
  onModelSelect: (models: LLMModel[]) => void;
  onComparisonEnabled: (models: [LLMModel, LLMModel]) => void;
  onConfirm: () => void;
}

const modelOptions: LLMModel[] = ['gemini', 'gpt', 'claude'];

export function LLMSelector({ 
  selectionMode,
  selectedModels,
  onModeSelect,
  onModelSelect,
  onComparisonEnabled,
  onConfirm
}: LLMSelectorProps) {
  const [isValid, setIsValid] = useState(false);
  const [leftModel, setLeftModel] = useState<LLMModel>('gemini');
  const [rightModel, setRightModel] = useState<LLMModel>('gpt');

  const handleModeSelect = (mode: ModelSelectionMode) => {
    onModeSelect(mode);
    if (mode === 'multi') {
      onComparisonEnabled([leftModel, rightModel]);
    } else if (mode === 'single') {
      onModelSelect([modelOptions[0]]);
    } else if (mode === 'system') {
      onModelSelect(['gemini', 'gpt', 'claude']);
    }
    setIsValid(mode === 'system' || mode === 'medical' || mode === 'publication' || 
      (mode === 'single' && selectedModels.length === 1) || 
      (mode === 'multi' && selectedModels.length > 0));
  };

  const handleModelChange = (position: 'left' | 'right', model: LLMModel) => {
    if (position === 'left') {
      setLeftModel(model);
    } else {
      setRightModel(model);
    }
    if (selectionMode === 'multi') {
      onComparisonEnabled([position === 'left' ? model : leftModel, position === 'right' ? model : rightModel]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {(['system', 'single', 'multi', 'medical', 'publication'] as ModelSelectionMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => handleModeSelect(mode)}
              className={cn(
                "flex items-center space-x-2 px-2 py-1.5 rounded-lg transition-colors text-sm",
                selectionMode === mode ? "bg-primary-100 text-primary-900" : "bg-gray-100 text-gray-700"
              )}
            >
              {mode === 'system' ? (
                <CheckSquare className="w-4 h-4" />
              ) : mode === 'single' ? (
                <Square className="w-4 h-4" />
              ) : mode === 'multi' ? (
                <SplitSquareHorizontal className="w-4 h-4" />
              ) : mode === 'medical' ? (
                <Brain className="w-4 h-4" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
              <span className="capitalize">{mode}</span>
            </button>
          ))}
        </div>

        {selectionMode === 'multi' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Left Model</label>
              <select
                value={leftModel}
                onChange={(e) => handleModelChange('left', e.target.value as LLMModel)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                {modelOptions.map((model) => (
                  <option key={model} value={model}>{model.toUpperCase()}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Right Model</label>
              <select
                value={rightModel}
                onChange={(e) => handleModelChange('right', e.target.value as LLMModel)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                {modelOptions.map((model) => (
                  <option key={model} value={model}>{model.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {selectionMode === 'single' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Model</label>
            <select
              value={selectedModels[0] || ''}
              onChange={(e) => onModelSelect([e.target.value as LLMModel])}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              {modelOptions.map((model) => (
                <option key={model} value={model}>{model.toUpperCase()}</option>
              ))}
            </select>
          </div>
        )}

        {selectionMode === 'system' && (
          <div className="bg-primary-50 border-l-4 border-primary-400 p-4">
            <p className="text-sm text-primary-700">
              <strong>System Mode:</strong> Utilizes all available models (Gemini, GPT, and Claude) for comprehensive and optimized responses.
            </p>
          </div>
        )}

        {selectionMode === 'medical' && (
          <div>
            <p className="text-xs text-gray-500 mb-2">
              Search medical information, billing codes, and competitor products.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-sm text-blue-700">
                <strong>Medical Mode:</strong> Access to FDA data, ICD codes, and HCPCS codes. 
                Responses are enriched with medical references and regulatory information.
              </p>
            </div>
          </div>
        )}

        {selectionMode === 'publication' && (
          <p className="text-xs text-gray-500">
            Generate content for review and publication in the knowledge base.
          </p>
        )}

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-sm text-yellow-700">
            <strong>Disclaimer:</strong> This is an AI assistant for demonstration purposes. 
            The responses generated should not be considered as medical advice. Always consult 
            qualified healthcare professionals for medical decisions.
          </p>
        </div>
      </div>

      <button
        onClick={onConfirm}
        disabled={!isValid}
        className={cn(
          "w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors",
          isValid
            ? "bg-primary-600 text-white hover:bg-primary-700"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
      >
        Start Chat
      </button>
    </div>
  );
}