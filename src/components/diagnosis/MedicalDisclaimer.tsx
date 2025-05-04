
import { AlertCircle } from 'lucide-react';

const MedicalDisclaimer = () => {
  return (
    <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-8 flex items-start">
      <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
      <div>
        <h3 className="text-yellow-400 font-medium">Important Medical Disclaimer</h3>
        <p className="text-yellow-200/70 text-sm mt-1">
          This AI-generated diagnosis is provided for informational purposes only and does not constitute professional medical advice. 
          Always consult with a qualified healthcare provider for proper evaluation, diagnosis, and treatment recommendations.
        </p>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;
