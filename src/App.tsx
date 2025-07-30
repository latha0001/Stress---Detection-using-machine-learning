import React, { useState, useEffect } from 'react';
import { Brain, Activity } from 'lucide-react';
import { DataInput } from './components/DataInput';
import { StressAnalysisDisplay } from './components/StressAnalysisDisplay';
import { VisualizationCharts } from './components/VisualizationCharts';
import { StressMLModel } from './utils/stressMLAlgorithm';
import { PhysiologicalData, BehavioralData, StressAnalysis, HistoricalDataPoint } from './types';

function App() {
  const [physiological, setPhysiological] = useState<PhysiologicalData>({heartRate: 75, bloodPressureSystolic: 120, bloodPressureDiastolic: 80, respiratoryRate: 16, skinConductance: 3.5, bodyTemperature: 98.6,});
  const [behavioral, setBehavioral] = useState<BehavioralData>({sleepHours: 7.5, sleepQuality: 7, activityLevel: 6, screenTime: 6, socialInteractions: 5, workHours: 8,});
  const [analysis, setAnalysis] = useState<StressAnalysis | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [mlModel] = useState(new StressMLModel());

  useEffect(() => {
    const generateHistoricalData = () => {
      const data: HistoricalDataPoint[] = [];
      const today = new Date();
      for (let i = 14; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const baseStress = 0.3 + Math.random() * 0.4;
        const weekendReduction = date.getDay() === 0 || date.getDay() === 6 ? -0.1 : 0;
        const stressLevel = Math.max(0, Math.min(1, baseStress + weekendReduction));
        const category = stressLevel < 0.25 ? 'Low' : 
                        stressLevel < 0.5 ? 'Moderate' : 
                        stressLevel < 0.75 ? 'High' : 'Severe';
        
        data.push({timestamp: date, stressLevel, category,});
      }
      setHistoricalData(data);
    };
    generateHistoricalData();
  }, []);
  useEffect(() => {
    const newAnalysis = mlModel.analyzeStress(physiological, behavioral);
    setAnalysis(newAnalysis);
  }, [physiological, behavioral, mlModel]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">StressDetect ML</h1>
              <p className="text-gray-600">Advanced Machine Learning Stress Analysis</p>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-500" />
              Input Health Data
            </h2>
            <p className="text-gray-600 mt-2">
              Enter your current physiological and behavioral metrics for real-time stress analysis
            </p>
          </div>
          <DataInput physiological={physiological} behavioral={behavioral} onPhysiologicalChange={setPhysiological} onBehavioralChange={setBehavioral}/>
        </section>
        {analysis && (
          <section>
            <StressAnalysisDisplay analysis={analysis} />
          </section>
        )}
        {analysis && (
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Data Visualizations</h2>
              <p className="text-gray-600 mt-2">
                Interactive charts showing your stress patterns and health metrics
              </p>
            </div>
            <VisualizationCharts physiological={physiological} behavioral={behavioral} historicalData={historicalData} currentStressLevel={analysis.overallStressLevel}/>
          </section>
        )}
        <footer className="bg-white rounded-xl shadow-lg p-6 mt-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">About This Analysis</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              This stress detection system uses machine learning algorithms to analyze physiological and behavioral data patterns. 
              The model weights multiple factors including heart rate variability, sleep quality, activity levels, and social interactions 
              to provide comprehensive stress assessment and personalized recommendations.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              <strong>Disclaimer:</strong> This tool is for educational purposes and should not replace professional medical advice.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
export default App;