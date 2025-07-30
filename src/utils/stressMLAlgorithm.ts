import { PhysiologicalData, BehavioralData, StressAnalysis } from '../types';

export class StressMLModel {
  private physiologicalWeights = {heartRate: 0.25, bloodPressure: 0.20, respiratoryRate: 0.15, skinConductance: 0.20, bodyTemperature: 0.20};
  private behavioralWeights = {sleepHours: 0.25, sleepQuality: 0.20, activityLevel: 0.15, screenTime: 0.15, socialInteractions: 0.15, workHours: 0.10};
  analyzeStress(physiological: PhysiologicalData, behavioral: BehavioralData): StressAnalysis {
    const physScore = this.calculatePhysiologicalScore(physiological);
    const behavScore = this.calculateBehavioralScore(behavioral);
    const overallScore = (physScore * 0.6) + (behavScore * 0.4);
    const category = this.categorizeStress(overallScore);
    const recommendations = this.generateRecommendations(overallScore, physiological, behavioral);
    const riskFactors = this.identifyRiskFactors(physiological, behavioral);
    return {overallStressLevel: Math.round(overallScore * 100) / 100, stressCategory: category, physiologicalScore: Math.round(physScore * 100) / 100, behavioralScore: Math.round(behavScore * 100) / 100, recommendations, riskFactors};
  }
  private calculatePhysiologicalScore(data: PhysiologicalData): number {
    const hrScore = this.normalizeHeartRate(data.heartRate);
    const bpScore = this.normalizeBloodPressure(data.bloodPressureSystolic, data.bloodPressureDiastolic);
    const rrScore = this.normalizeRespiratoryRate(data.respiratoryRate);
    const scScore = this.normalizeSkinConductance(data.skinConductance);
    const tempScore = this.normalizeBodyTemperature(data.bodyTemperature);
    return (
      hrScore * this.physiologicalWeights.heartRate +
      bpScore * this.physiologicalWeights.bloodPressure +
      rrScore * this.physiologicalWeights.respiratoryRate +
      scScore * this.physiologicalWeights.skinConductance +
      tempScore * this.physiologicalWeights.bodyTemperature
    );
  }
  private calculateBehavioralScore(data: BehavioralData): number {
    const sleepHoursScore = this.normalizeSleepHours(data.sleepHours);
    const sleepQualityScore = 1 - (data.sleepQuality / 10); // Invert: lower quality = higher stress
    const activityScore = 1 - Math.min(data.activityLevel / 10, 1); // Lower activity = higher stress
    const screenTimeScore = Math.min(data.screenTime / 12, 1); // Higher screen time = higher stress
    const socialScore = 1 - Math.min(data.socialInteractions / 10, 1); // Less social = higher stress
    const workHoursScore = Math.max(0, (data.workHours - 8) / 8); // Over 8 hours = stress
    return (
      sleepHoursScore * this.behavioralWeights.sleepHours +
      sleepQualityScore * this.behavioralWeights.sleepQuality +
      activityScore * this.behavioralWeights.activityLevel +
      screenTimeScore * this.behavioralWeights.screenTime +
      socialScore * this.behavioralWeights.socialInteractions +
      workHoursScore * this.behavioralWeights.workHours
    );
  }
  private normalizeHeartRate(hr: number): number {
    if (hr < 60) return Math.max(0, (60 - hr) / 20); // Too low
    if (hr > 100) return Math.min(1, (hr - 100) / 50); // Too high
    return 0; // Normal range
  }
  private normalizeBloodPressure(systolic: number, diastolic: number): number {
    const systolicScore = Math.max(0, (systolic - 120) / 40);
    const diastolicScore = Math.max(0, (diastolic - 80) / 20);
    return Math.min(1, Math.max(systolicScore, diastolicScore));
  }
  private normalizeRespiratoryRate(rr: number): number {
    if (rr < 12) return (12 - rr) / 8;
    if (rr > 20) return (rr - 20) / 10;
    return 0;
  }
  private normalizeSkinConductance(sc: number): number {
    return Math.min(sc / 10, 1);
  }
  private normalizeBodyTemperature(temp: number): number {
    const normal = 98.6;
    const deviation = Math.abs(temp - normal);
    return Math.min(deviation / 2, 1);
  }
  private normalizeSleepHours(hours: number): number {
    if (hours >= 7 && hours <= 9) return 0;
    if (hours < 7) return (7 - hours) / 7;
    return Math.min((hours - 9) / 6, 1);
  }
  private categorizeStress(score: number): 'Low' | 'Moderate' | 'High' | 'Severe' {
    if (score < 0.25) return 'Low';
    if (score < 0.5) return 'Moderate';
    if (score < 0.75) return 'High';
    return 'Severe';
  }
  private generateRecommendations(score: number, phys: PhysiologicalData, behav: BehavioralData): string[] {
    const recommendations: string[] = [];
    if (score > 0.5) {
      recommendations.push('Consider consulting with a healthcare professional');
      recommendations.push('Practice deep breathing exercises for 10 minutes daily');
    }
    if (behav.sleepHours < 7) {
      recommendations.push('Aim for 7-9 hours of sleep per night');
    }
    if (behav.activityLevel < 5) {
      recommendations.push('Increase physical activity - aim for 30 minutes daily');
    }
    if (behav.screenTime > 8) {
      recommendations.push('Reduce screen time, especially before bedtime');
    }
    if (phys.heartRate > 100) {
      recommendations.push('Practice relaxation techniques to lower heart rate');
    }
    if (behav.workHours > 10) {
      recommendations.push('Consider work-life balance and time management strategies');
    }
    if (recommendations.length === 0) {
      recommendations.push('Maintain current healthy lifestyle habits');
      recommendations.push('Continue regular exercise and good sleep hygiene');
    }
    return recommendations;
  }
  private identifyRiskFactors(phys: PhysiologicalData, behav: BehavioralData): string[] {
    const risks: string[] = [];
    if (phys.heartRate > 100) risks.push('Elevated heart rate');
    if (phys.bloodPressureSystolic > 140) risks.push('High blood pressure');
    if (behav.sleepHours < 6) risks.push('Sleep deprivation');
    if (behav.workHours > 12) risks.push('Work overload');
    if (behav.activityLevel < 3) risks.push('Sedentary lifestyle');
    if (behav.screenTime > 10) risks.push('Excessive screen time');
    return risks;
  }
}