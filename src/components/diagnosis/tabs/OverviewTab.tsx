
import { motion } from 'framer-motion';
import { Calendar, Microscope, Activity, ChevronRight, Clock, FileText, Stethoscope } from 'lucide-react';
import { DiagnosisResult } from '@/types/diagnosis';

interface OverviewTabProps {
  result: DiagnosisResult;
}

const OverviewTab = ({ result }: OverviewTabProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="relative rounded-xl overflow-hidden border border-white/20"
        >
          <img
            src={result.imageUrl}
            alt="Analyzed skin"
            className="w-full object-cover h-[300px]"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="text-white text-sm flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Uploaded on {new Date(result.date).toLocaleDateString()}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
              <Microscope className="w-5 h-5 mr-2 text-diagnosphere-primary" />
              Primary Diagnosis
            </h2>
            
            <div className="space-y-3">
              {result.conditions.slice(0, 1).map((condition, index) => (
                <div key={index} className="bg-diagnosphere-primary/10 p-4 rounded-lg border border-diagnosphere-primary/30">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white text-lg">{condition.name}</h3>
                    <span 
                      className="text-sm font-medium px-3 py-1 rounded-full bg-diagnosphere-primary/30 text-diagnosphere-primary"
                    >
                      {condition.probability}% Match
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mt-2 text-sm">{condition.description}</p>
                  
                  {condition.severity && (
                    <div className="mt-4 flex items-center">
                      <span className="text-white text-sm font-medium">Severity:</span>
                      <span className={`ml-2 text-sm px-2 py-0.5 rounded ${
                        condition.severity === 'Severe' 
                          ? 'bg-red-500/20 text-red-400' 
                          : condition.severity === 'Moderate'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {condition.severity}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-lg font-medium text-white mb-2 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-diagnosphere-primary" />
              Recommended Next Steps
            </h3>
            <ul className="space-y-2 text-gray-300">
              {result.conditions[0].nextSteps.map((step, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <ChevronRight className="w-4 h-4 text-diagnosphere-primary mt-0.5 mr-2 flex-shrink-0" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
      
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Secondary Potential Conditions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {result.conditions.slice(1).map((condition, index) => (
            <div 
              key={index} 
              className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-white">{condition.name}</h3>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                  {condition.probability}% match
                </span>
              </div>
              <p className="text-gray-400 text-sm line-clamp-2">{condition.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="font-medium text-white mb-3 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-diagnosphere-primary" />
            Patient Information
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-400">Age:</span>
              <span className="text-white">{result.patientInfo?.age || 'Not provided'}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Gender:</span>
              <span className="text-white">{result.patientInfo?.gender || 'Not provided'}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Skin Type:</span>
              <span className="text-white">{result.patientInfo?.skinType || 'Not provided'}</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="font-medium text-white mb-3 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-diagnosphere-primary" />
            Condition Timeline
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-400">Duration:</span>
              <span className="text-white">{result.analysisDetails?.duration || 'Not provided'}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Area Affected:</span>
              <span className="text-white">{result.analysisDetails?.areaAffected || 'Not provided'}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Diagnosis Date:</span>
              <span className="text-white">{new Date(result.date).toLocaleDateString()}</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="font-medium text-white mb-3 flex items-center">
            <Stethoscope className="w-5 h-5 mr-2 text-diagnosphere-primary" />
            Medical History
          </h3>
          {result.patientInfo?.medicalHistory && result.patientInfo.medicalHistory.length > 0 ? (
            <ul className="space-y-1 text-sm">
              {result.patientInfo.medicalHistory.map((item, idx) => (
                <li key={idx} className="text-gray-300 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-diagnosphere-primary mt-1.5 mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm">No relevant medical history provided</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
