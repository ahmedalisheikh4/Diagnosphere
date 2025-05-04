
import { Link } from 'react-router-dom';
import { Pill, ThumbsUp, Stethoscope, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DiagnosisResult } from '@/types/diagnosis';

interface TreatmentsTabProps {
  result: DiagnosisResult;
}

const TreatmentsTab = ({ result }: TreatmentsTabProps) => {
  return (
    <div className="space-y-8">
      <div className="bg-diagnosphere-primary/10 border border-diagnosphere-primary/30 rounded-xl p-6">
        <div className="flex items-start">
          <Pill className="w-6 h-6 text-diagnosphere-primary mr-3 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold text-white">Treatment Options for {result.conditions[0].name}</h2>
            <p className="text-gray-300 mt-2">
              The following treatment approaches are commonly recommended for this condition. Your healthcare 
              provider will determine the most appropriate treatment plan based on your specific case.
            </p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.conditions[0].treatments?.map((treatment, idx) => (
            <div key={idx} className="bg-white/10 p-4 rounded-lg border border-white/5">
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-diagnosphere-primary/20 text-diagnosphere-primary text-xs font-medium mr-3 flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="text-white text-sm">{treatment}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="font-medium text-white mb-4">Lifestyle Recommendations</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <ThumbsUp className="w-4 h-4 text-diagnosphere-primary mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">Skin Care Routine</p>
                <p className="text-gray-400 text-sm">Use gentle, fragrance-free cleansers and apply moisturizer regularly to maintain skin hydration.</p>
              </div>
            </li>
            <li className="flex items-start">
              <ThumbsUp className="w-4 h-4 text-diagnosphere-primary mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">Avoid Triggers</p>
                <p className="text-gray-400 text-sm">Identify and avoid potential irritants such as harsh soaps, certain fabrics, and extreme temperatures.</p>
              </div>
            </li>
            <li className="flex items-start">
              <ThumbsUp className="w-4 h-4 text-diagnosphere-primary mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">Stress Management</p>
                <p className="text-gray-400 text-sm">Practice stress-reduction techniques like meditation or yoga, as stress can exacerbate symptoms.</p>
              </div>
            </li>
            <li className="flex items-start">
              <ThumbsUp className="w-4 h-4 text-diagnosphere-primary mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">Dietary Considerations</p>
                <p className="text-gray-400 text-sm">Maintain a balanced diet rich in anti-inflammatory foods and consider keeping a food diary to identify potential triggers.</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="font-medium text-white mb-4">When to Seek Medical Attention</h3>
          <div className="space-y-3">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h4 className="text-red-400 text-sm font-medium mb-1">Urgent Symptoms</h4>
              <p className="text-gray-300 text-sm">
                Seek immediate medical attention if you experience severe swelling, difficulty breathing, 
                spreading infection, or fever with your skin condition.
              </p>
            </div>
            
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <h4 className="text-yellow-500 text-sm font-medium mb-1">Follow-up Care</h4>
              <p className="text-gray-300 text-sm">
                Schedule a follow-up appointment with a dermatologist to:
              </p>
              <ul className="mt-2 space-y-1">
                <li className="text-gray-300 text-sm flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 mr-2"></span>
                  Confirm this AI diagnosis
                </li>
                <li className="text-gray-300 text-sm flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 mr-2"></span>
                  Establish a personalized treatment plan
                </li>
                <li className="text-gray-300 text-sm flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 mr-2"></span>
                  Monitor your response to treatment
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              size="sm" 
              className="w-full bg-diagnosphere-primary hover:bg-diagnosphere-primary/90"
              asChild
            >
              <Link to="/contact">
                <Stethoscope className="w-4 h-4 mr-2" />
                Find a Specialist
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <h3 className="font-medium text-white mb-4">Additional Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-white/10 bg-white/5">
            <h4 className="font-medium text-white text-sm mb-2">American Academy of Dermatology</h4>
            <p className="text-gray-400 text-xs mb-3">
              Comprehensive information on skin conditions, treatment options, and finding a dermatologist.
            </p>
            <Button variant="link" size="sm" className="text-diagnosphere-primary p-0 h-auto flex items-center">
              Visit Website <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="p-4 rounded-lg border border-white/10 bg-white/5">
            <h4 className="font-medium text-white text-sm mb-2">National Eczema Association</h4>
            <p className="text-gray-400 text-xs mb-3">
              Resources for understanding and managing eczema and related skin conditions.
            </p>
            <Button variant="link" size="sm" className="text-diagnosphere-primary p-0 h-auto flex items-center">
              Visit Website <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentsTab;
