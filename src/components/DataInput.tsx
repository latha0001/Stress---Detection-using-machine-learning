import React from 'react';
import { Activity, Heart, Moon, Clock, Users, Smartphone } from 'lucide-react';
import { PhysiologicalData, BehavioralData } from '../types';

interface DataInputProps { physiological: PhysiologicalData; behavioral: BehavioralData; onPhysiologicalChange: (data: PhysiologicalData) => void; onBehavioralChange: (data: BehavioralData) => void;}
export const DataInput: React.FC<DataInputProps> = ({ physiological, behavioral, onPhysiologicalChange, onBehavioralChange}) => {
  const updatePhysiological = (field: keyof PhysiologicalData, value: number) => {
    onPhysiologicalChange({ ...physiological, [field]: value });
  };
  const updateBehavioral = (field: keyof BehavioralData, value: number) => {
    onBehavioralChange({ ...behavioral, [field]: value });
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-red-500" />
          <h3 className="text-xl font-semibold text-gray-800">Physiological Data</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Heart Rate (bpm)</label>
            <input type="number" value={physiological.heartRate} onChange={(e) => updatePhysiological('heartRate', Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" min="40" max="200"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Systolic BP</label>
              <input type="number" value={physiological.bloodPressureSystolic} onChange={(e) => updatePhysiological('bloodPressureSystolic', Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" min="80" max="200"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diastolic BP</label>
              <input type="number" value={physiological.bloodPressureDiastolic} onChange={(e) => updatePhysiological('bloodPressureDiastolic', Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" min="40" max="120"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Respiratory Rate (breaths/min)</label>
            <input type="number" value={physiological.respiratoryRate} onChange={(e) => updatePhysiological('respiratoryRate', Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" min="8" max="40"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skin Conductance (0-10)</label>
            <input type="number" step="0.1" value={physiological.skinConductance} onChange={(e) => updatePhysiological('skinConductance', Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" min="0" max="10"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Body Temperature (°F)</label>
            <input type="number" step="0.1" value={physiological.bodyTemperature} onChange={(e) => updatePhysiological('bodyTemperature', Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" min="95" max="105"/>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-semibold text-gray-800">Behavioral Data</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Moon className="w-4 h-4 inline mr-2" />
              Sleep Hours
            </label>
            <input type="number" step="0.5" value={behavioral.sleepHours} onChange={(e) => updateBehavioral('sleepHours', Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" min="0" max="16"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sleep Quality (1-10)</label>
            <input type="number" value={behavioral.sleepQuality} onChange={(e) => updateBehavioral('sleepQuality', Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" min="1" max="10"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level (1-10)</label>
            <input type="number" value={behavioral.activityLevel} onChange={(e) => updateBehavioral('activityLevel', Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" min="1" max="10"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Smartphone className="w-4 h-4 inline mr-2" />
              Screen Time (hours/day)
            </label>
            <input type="number" step="0.5" value={behavioral.screenTime} onChange={(e) => updateBehavioral('screenTime', Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" min="0" max="20"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-2" />
              Social Interactions (1-10)
            </label>
            <input type="number" value={behavioral.socialInteractions} onChange={(e) => updateBehavioral('socialInteractions', Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" min="1" max="10"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Work Hours/Day
            </label>
            <input type="number" step="0.5" value={behavioral.workHours} onChange={(e) => updateBehavioral('workHours', Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" min="0" max="20"/>
          </div>
        </div>
      </div>
    </div>
  );
};