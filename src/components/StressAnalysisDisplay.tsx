import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { StressAnalysis } from '../types';
interface StressAnalysisDisplayProps { analysis: StressAnalysis;}
export const StressAnalysisDisplay: React.FC<StressAnalysisDisplayProps> = ({ analysis }) => {
  const getStressColor = (category: string) => {
    switch (category) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Severe': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  const getStressIcon = (category: string) => {
    switch (category) {
      case 'Low': return <CheckCircle className="w-6 h-6" />;
      case 'Moderate': return <AlertCircle className="w-6 h-6" />;
      case 'High': return <AlertTriangle className="w-6 h-6" />;
      case 'Severe': return <XCircle className="w-6 h-6" />;
      default: return <AlertCircle className="w-6 h-6" />;
    }
  };
  const stressPercentage = (analysis.overallStressLevel * 100).toFixed(1);
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Stress Analysis Results</h3>
      <div className="mb-8">
        <div className={`flex items-center gap-3 p-4 rounded-lg ${getStressColor(analysis.stressCategory)}`}>
          {getStressIcon(analysis.stressCategory)}
          <div>
            <h4 className="text-xl font-semibold">
              {analysis.stressCategory} Stress Level
            </h4>
            <p className="text-lg">Score: {stressPercentage}%</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-semibold text-blue-800 mb-2">Physiological Score</h5>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-blue-200 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full transition-all duration-500" style={{ width: `${analysis.physiologicalScore * 100}%` }}></div>
            </div>
            <span className="text-blue-800 font-medium">
              {(analysis.physiologicalScore * 100).toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h5 className="font-semibold text-green-800 mb-2">Behavioral Score</h5>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-green-200 rounded-full h-3">
              <div className="bg-green-600 h-3 rounded-full transition-all duration-500" style={{ width: `${analysis.behavioralScore * 100}%` }}></div>
            </div>
            <span className="text-green-800 font-medium">
              {(analysis.behavioralScore * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
      {analysis.riskFactors.length > 0 && (
        <div className="mb-6">
          <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Risk Factors Identified
          </h5>
          <div className="flex flex-wrap gap-2">
            {analysis.riskFactors.map((risk, index) => (
              <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                {risk}
              </span>
            ))}
          </div>
        </div>
      )}
      <div>
        <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Personalized Recommendations
        </h5>
        <ul className="space-y-2">
          {analysis.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};