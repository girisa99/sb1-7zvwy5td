import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { ChatMessage } from '../../types/chat';
import { GenieIcon } from './GenieIcon';
import { AlertTriangle, Activity, FileText, Package, DollarSign, BookOpen, FlaskRound as Flask } from 'lucide-react';

interface MessageProps {
  message: ChatMessage;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';

  const renderSources = () => {
    if (!message.sources) return null;

    const { fda, clinical, commercial, publications, hcpcs, icd, competitors } = message.sources;

    return (
      <div className="mt-2 space-y-2 text-[10px]">
        {fda && (
          <div className="bg-gray-50 p-2 rounded">
            <h4 className="font-medium mb-1 flex items-center">
              <Package className="w-4 h-4 mr-1 text-primary-600" />
              FDA Information:
            </h4>
            {fda.map((product: any, idx: number) => (
              <div key={idx} className="mb-1">
                <p>Brand: {product.openfda?.brand_name?.join(', ')}</p>
                <p>NDC: {product.openfda?.product_ndc?.join(', ')}</p>
                <p>Manufacturer: {product.openfda?.manufacturer_name?.join(', ')}</p>
              </div>
            ))}
          </div>
        )}

        {clinical && (
          <div className="bg-gray-50 p-2 rounded">
            <h4 className="font-medium mb-1 flex items-center">
              <Flask className="w-4 h-4 mr-1 text-primary-600" />
              Clinical Data:
            </h4>
            {clinical.map((data: any, idx: number) => (
              <div key={idx} className="mb-1">
                <p>Study: {data.study_type}</p>
                <p>Phase: {data.phase}</p>
                <p>Status: {data.status}</p>
              </div>
            ))}
          </div>
        )}

        {commercial && (
          <div className="bg-gray-50 p-2 rounded">
            <h4 className="font-medium mb-1 flex items-center">
              <DollarSign className="w-4 h-4 mr-1 text-primary-600" />
              Commercial Information:
            </h4>
            <p>WAC: ${commercial.wac}</p>
            <p>340B: ${commercial['340b']}</p>
            <p>FSS: ${commercial.fss}</p>
          </div>
        )}

        {publications && (
          <div className="bg-gray-50 p-2 rounded">
            <h4 className="font-medium mb-1 flex items-center">
              <BookOpen className="w-4 h-4 mr-1 text-primary-600" />
              Publications:
            </h4>
            {publications.map((pub: any, idx: number) => (
              <div key={idx} className="mb-1">
                <p>Title: {pub.title}</p>
                <p>Authors: {pub.authors.join(', ')}</p>
                <p>Journal: {pub.journal}</p>
              </div>
            ))}
          </div>
        )}

        {hcpcs && (
          <div className="bg-gray-50 p-2 rounded">
            <h4 className="font-medium mb-1 flex items-center">
              <FileText className="w-4 h-4 mr-1 text-primary-600" />
              HCPCS Codes:
            </h4>
            {Object.entries(hcpcs).map(([code, desc]: [string, any]) => (
              <p key={code}>{code}: {desc}</p>
            ))}
          </div>
        )}

        {icd && (
          <div className="bg-gray-50 p-2 rounded">
            <h4 className="font-medium mb-1 flex items-center">
              <Activity className="w-4 h-4 mr-1 text-primary-600" />
              ICD-10 Codes:
            </h4>
            {icd[3].map((code: any, idx: number) => (
              <p key={idx}>{code[0]}: {code[1]}</p>
            ))}
          </div>
        )}

        {competitors && competitors.length > 0 && (
          <div className="bg-gray-50 p-2 rounded">
            <h4 className="font-medium mb-1 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1 text-primary-600" />
              Competitor Products:
            </h4>
            {competitors.map((product: any, idx: number) => (
              <p key={idx}>{product.openfda?.brand_name?.join(', ')} by {product.openfda?.manufacturer_name?.join(', ')}</p>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "flex",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "flex items-start space-x-1.5",
        isUser && "flex-row-reverse space-x-reverse"
      )}>
        {!isUser && (
          <GenieIcon className="w-6 h-6 mt-0.5 flex-shrink-0" />
        )}
        <div className={cn(
          "rounded-lg p-2 max-w-[280px]",
          isUser
            ? "bg-primary-600 text-white"
            : "bg-gray-100 text-gray-900"
        )}>
          <p className="whitespace-pre-wrap text-xs">{message.content}</p>
          {!isUser && renderSources()}
          {message.model && (
            <p className={cn(
              "text-[10px] mt-1",
              isUser
                ? "text-primary-200"
                : "text-gray-500"
            )}>
              via {message.model}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}