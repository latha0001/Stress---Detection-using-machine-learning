# StressDetect ML - Advanced Stress Analysis System
A sophisticated web-based machine learning application for real-time stress detection and analysis using physiological and behavioral data patterns.

### Overview
StressDetect ML is an advanced stress detection system that leverages machine learning algorithms to analyze multiple data points and provide comprehensive stress assessments. The application processes both physiological metrics (heart rate, blood pressure, respiratory patterns) and behavioral indicators (sleep quality, activity levels, social interactions) to deliver personalized stress analysis and actionable recommendations.

### Core Functionality
- **Real-time Stress Analysis**: Instant ML-powered stress level calculation
- **Multi-factor Assessment**: Combines physiological and behavioral data
- **Personalized Recommendations**: Tailored advice based on individual patterns
- **Risk Factor Identification**: Automatic detection of stress-contributing factors
- **Historical Tracking**: Trend analysis with 15-day historical data

### Data Processing
- **Physiological Metrics**:
  - Heart Rate (BPM)
  - Blood Pressure (Systolic/Diastolic)
  - Respiratory Rate
  - Skin Conductance
  - Body Temperature

- **Behavioral Indicators**:
  - Sleep Hours & Quality
  - Physical Activity Level
  - Screen Time Usage
  - Social Interactions
  - Work Hours

### Visualization & Analytics
- **Interactive Charts**: Real-time data visualization using Chart.js
- **Stress Trend Analysis**: Historical pattern recognition
- **Physiological Metrics Dashboard**: Bar charts for current readings
- **Behavioral Wellness Wheel**: Doughnut chart for lifestyle factors
- **Stress Level Gauge**: Circular progress indicator with color coding

### Frontend Framework
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for responsive, utility-first styling

### Data Visualization
- **Chart.js** with React-ChartJS-2 for interactive charts
- **Custom SVG Components** for stress level gauges
- **Responsive Design** with mobile-first approach

### Machine Learning Simulation
- **Custom ML Algorithm** with weighted scoring system
- **Multi-parameter Analysis** using research-based coefficients
- **Real-time Processing** with instant feedback

### UI/UX Design
- **Lucide React Icons** for consistent iconography
- **Gradient Backgrounds** for modern aesthetic
- **Smooth Animations** with CSS transitions
- **Accessibility Features** with proper ARIA labels

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stress-detection-ml
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Machine Learning Algorithm
### Stress Calculation Model
The application uses a sophisticated weighted scoring system that mimics real ML stress detection models:

### Physiological Scoring (60% weight)
- **Heart Rate**: Normalized against resting rate (60-100 BPM optimal)
- **Blood Pressure**: Systolic/Diastolic pressure analysis
- **Respiratory Rate**: Breathing pattern assessment (12-20 breaths/min normal)
- **Skin Conductance**: Autonomic nervous system indicator
- **Body Temperature**: Stress-induced temperature variations

### Behavioral Scoring (40% weight)
- **Sleep Quality**: Duration and quality assessment (7-9 hours optimal)
- **Activity Level**: Physical exercise correlation with stress
- **Screen Time**: Digital wellness impact analysis
- **Social Interactions**: Social support system evaluation
- **Work Hours**: Work-life balance assessment

### Stress Categories
- **Low (0-25%)**: Minimal stress indicators
- **Moderate (25-50%)**: Some stress factors present
- **High (50-75%)**: Multiple stress indicators
- **Severe (75-100%)**: Critical stress levels requiring attention

### Data Flow Architecture
```
User Input → Data Validation → ML Processing → Analysis Generation → Visualization Update
     ↓              ↓              ↓              ↓                    ↓
Physiological   Behavioral    Weighted      Risk Factors      Chart.js Rendering
   Data           Data        Scoring      Identification     + SVG Components
```

### Future Enhancements
### Advanced Features
- **Machine Learning Integration**: Real TensorFlow.js models
- **Wearable Device Support**: API integration for fitness trackers
- **Historical Data Export**: CSV/JSON data export functionality
- **Personalized Baselines**: Individual normal range calibration
---

**Built with ❤️ for advancing digital health technology**