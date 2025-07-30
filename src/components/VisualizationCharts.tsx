import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement,} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { PhysiologicalData, BehavioralData, HistoricalDataPoint } from '../types';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

interface VisualizationChartsProps { physiological: PhysiologicalData; behavioral: BehavioralData; historicalData: HistoricalDataPoint[]; currentStressLevel: number;}

export const VisualizationCharts: React.FC<VisualizationChartsProps> = ({ physiological, behavioral, historicalData, currentStressLevel}) => {
  const trendData = {
    labels: historicalData.map(point => 
      point.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
    datasets: [
      {
        label: 'Stress Level',
        data: historicalData.map(point => point.stressLevel * 100),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };
  const physiologicalData = {
    labels: ['Heart Rate', 'Systolic BP', 'Diastolic BP', 'Respiratory Rate', 'Skin Conductance', 'Body Temp'],
    datasets: [
      {
        label: 'Current Values',
        data: [ physiological.heartRate, physiological.bloodPressureSystolic, physiological.bloodPressureDiastolic, physiological.respiratoryRate, physiological.skinConductance, physiological.bodyTemperature,],
        backgroundColor: ['rgba(239, 68, 68, 0.8)', 'rgba(245, 101, 101, 0.8)', 'rgba(248, 113, 113, 0.8)', 'rgba(34, 197, 94, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(168, 85, 247, 0.8)',],
        borderRadius: 8,
      },
    ],
  };
  const behavioralData = {
    labels: ['Sleep Quality', 'Activity Level', 'Social Interactions', 'Work Balance', 'Screen Time Impact'],
    datasets: [
      {
        data: [
          behavioral.sleepQuality,
          behavioral.activityLevel,
          behavioral.socialInteractions,
          Math.max(0, 10 - behavioral.workHours / 2), 
          Math.max(0, 10 - behavioral.screenTime / 2), 
        ],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Stress Level Trend</h4>
        <div className="h-64">
          <Line data={trendData} options={chartOptions} />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Physiological Metrics</h4>
        <div className="h-64">
          <Bar data={physiologicalData} options={chartOptions} />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Behavioral Wellness Factors</h4>
        <div className="h-64">
          <Doughnut data={behavioralData} options={doughnutOptions} />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Current Stress Level</h4>
        <div className="flex items-center justify-center h-64">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="transparent"/>
              <circle cx="50" cy="50" r="40" stroke={currentStressLevel > 0.75 ? '#ef4444' : currentStressLevel > 0.5 ? '#f59e0b' : currentStressLevel > 0.25 ? '#eab308' : '#10b981'} strokeWidth="8" fill="transparent" strokeDasharray={`${currentStressLevel * 251.2} 251.2`} strokeLinecap="round" className="transition-all duration-1000 ease-out"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">
                  {(currentStressLevel * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600">Stress Level</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};