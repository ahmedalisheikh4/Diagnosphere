
import { ArrowRight } from 'lucide-react';
import { DiagnosisResult } from '@/types/diagnosis';

interface DetailsTabProps {
  result: DiagnosisResult;
}

const DetailsTab = ({ result }: DetailsTabProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 h-full">
            <h3 className="font-medium text-white mb-4">Reported Symptoms</h3>
            <div className="space-y-3">
              {Object.entries(result.symptoms).filter(([key]) => key !== 'duration').map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-300 capitalize">{key}:</span>
                  <span className="text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="font-medium text-white mb-4">Condition Characteristics</h3>
            
            {result.analysisDetails?.characteristics && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.analysisDetails.characteristics.map((characteristic, idx) => (
                  <div key={idx} className="flex items-start bg-white/5 p-3 rounded-lg">
                    <span className="inline-block w-2 h-2 rounded-full bg-diagnosphere-primary mt-1.5 mr-2"></span>
                    <span className="text-gray-300 text-sm">{characteristic}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 mt-6">
            <h3 className="font-medium text-white mb-4">Analysis Methodology</h3>
            <p className="text-gray-300 text-sm mb-4">
              This analysis uses artificial intelligence to evaluate the uploaded image and reported symptoms. 
              The system compares the data against a database of known skin conditions and provides confidence 
              percentages based on visual and symptomatic similarities.
            </p>
            
            <div className="bg-diagnosphere-primary/10 border border-diagnosphere-primary/20 rounded-lg p-4">
              <h4 className="text-diagnosphere-primary text-sm font-medium mb-2">Confidence Assessment</h4>
              <p className="text-gray-300 text-sm">
                The primary diagnosis has a high confidence level ({result.conditions[0].probability}%) based on 
                consistent presentation with typical {result.conditions[0].name} cases. Secondary conditions are 
                listed for differential diagnosis consideration.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <h3 className="font-medium text-white mb-4">Detailed Diagnosis Explanation</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-white font-medium mb-2">{result.conditions[0].name}</h4>
            <p className="text-gray-300 text-sm mb-3">
              Based on the analysis of your skin image and reported symptoms, the AI model has identified patterns 
              consistent with {result.conditions[0].name}. The presentation shows typical characteristics including
              {result.analysisDetails?.characteristics?.slice(0, 2).join(', ')}. 
              These features, combined with your reported symptoms of
              {Object.entries(result.symptoms)
                .filter(([key, value]) => key !== 'duration' && value.toString().toLowerCase() !== 'none' && value.toString().toLowerCase() !== 'none reported')
                .map(([key]) => ` ${key}`)
                .join(', ')}, 
              strongly suggest this diagnosis.
            </p>
            
            <div className="bg-white/5 p-4 rounded-lg mt-3">
              <h5 className="text-white text-sm font-medium mb-2">Key Diagnostic Indicators:</h5>
              <ul className="space-y-1">
                <li className="text-gray-300 text-sm flex items-start">
                  <ArrowRight className="w-3 h-3 text-diagnosphere-primary mt-1 mr-2 flex-shrink-0" />
                  Visual presentation in the affected areas matches known patterns
                </li>
                <li className="text-gray-300 text-sm flex items-start">
                  <ArrowRight className="w-3 h-3 text-diagnosphere-primary mt-1 mr-2 flex-shrink-0" />
                  Symptom profile aligns with typical patient experiences
                </li>
                <li className="text-gray-300 text-sm flex items-start">
                  <ArrowRight className="w-3 h-3 text-diagnosphere-primary mt-1 mr-2 flex-shrink-0" />
                  Duration and progression are consistent with condition development
                </li>
                <li className="text-gray-300 text-sm flex items-start">
                  <ArrowRight className="w-3 h-3 text-diagnosphere-primary mt-1 mr-2 flex-shrink-0" />
                  Affected areas ({result.analysisDetails?.areaAffected}) are common sites for this condition
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-2">Differential Diagnoses</h4>
            <p className="text-gray-300 text-sm mb-3">
              While the primary diagnosis shows strong probability, these alternative conditions 
              should be considered due to some overlapping symptoms:
            </p>
            
            <div className="space-y-2 mt-3">
              {result.conditions.slice(1).map((condition, idx) => (
                <div key={idx} className="bg-white/5 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h5 className="text-white text-sm font-medium">{condition.name}</h5>
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-white/70">
                      {condition.probability}% match
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{condition.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;
