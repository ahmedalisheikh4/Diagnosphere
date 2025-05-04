
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Check } from 'lucide-react';

interface DiagnosisFormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  duration: string;
  itchLevel: number;
  painLevel: number;
  hasRedness: boolean;
  hasSwelling: boolean;
  hasBlisters: boolean;
  isScaly: boolean;
  hasSpread: string;
  previousTreatments: string[];
  additionalInfo: string;
}

const DiagnosisForm = ({ onSubmit }: DiagnosisFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    duration: '',
    itchLevel: 0,
    painLevel: 0,
    hasRedness: false,
    hasSwelling: false,
    hasBlisters: false,
    isScaly: false,
    hasSpread: '',
    previousTreatments: [],
    additionalInfo: '',
  });

  const updateFormData = (key: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleTreatment = (treatment: string) => {
    setFormData((prev) => {
      const current = [...prev.previousTreatments];
      if (current.includes(treatment)) {
        return {
          ...prev,
          previousTreatments: current.filter((t) => t !== treatment),
        };
      } else {
        return {
          ...prev,
          previousTreatments: [...current, treatment],
        };
      }
    });
  };

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const symptomOptions = [
    { id: 'hasRedness', label: 'Redness' },
    { id: 'hasSwelling', label: 'Swelling' },
    { id: 'hasBlisters', label: 'Blisters or bumps' },
    { id: 'isScaly', label: 'Scaling or flaky skin' },
  ];

  const treatmentOptions = [
    'Over-the-counter creams',
    'Prescription medication',
    'Natural remedies',
    'None',
  ];

  const durationOptions = [
    { value: 'lessThanWeek', label: 'Less than a week' },
    { value: '1-4weeks', label: '1-4 weeks' },
    { value: '1-3months', label: '1-3 months' },
    { value: '3-6months', label: '3-6 months' },
    { value: 'moreThan6months', label: 'More than 6 months' },
  ];

  const spreadOptions = [
    { value: 'no', label: 'No, it has remained in one area' },
    { value: 'slightly', label: 'Yes, it has spread slightly' },
    { value: 'significantly', label: 'Yes, it has spread significantly' },
  ];

  const formSteps = [
    {
      title: 'Duration & Intensity',
      description: "Tell us how long you've had these symptoms and their intensity",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-lg text-white">How long have you had this skin condition?</Label>
            <RadioGroup
              value={formData.duration}
              onValueChange={(value) => updateFormData('duration', value)}
              className="space-y-3"
            >
              {durationOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 bg-white/5 p-3 rounded-md border border-white/10 hover:border-white/20 transition-colors">
                  <RadioGroupItem id={option.value} value={option.value} />
                  <Label htmlFor={option.value} className="text-white cursor-pointer w-full">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-lg text-white">How itchy is the affected area?</Label>
            <div className="flex space-x-2 items-center">
              <span className="text-white/60 text-sm">Not itchy</span>
              <Slider
                value={[formData.itchLevel]}
                onValueChange={(value) => updateFormData('itchLevel', value[0])}
                max={10}
                step={1}
                className="flex-1"
              />
              <span className="text-white/60 text-sm">Very itchy</span>
            </div>
            <div className="text-center text-diagnosphere-primary font-semibold">
              {formData.itchLevel} / 10
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-lg text-white">How painful is the affected area?</Label>
            <div className="flex space-x-2 items-center">
              <span className="text-white/60 text-sm">No pain</span>
              <Slider
                value={[formData.painLevel]}
                onValueChange={(value) => updateFormData('painLevel', value[0])}
                max={10}
                step={1}
                className="flex-1"
              />
              <span className="text-white/60 text-sm">Very painful</span>
            </div>
            <div className="text-center text-diagnosphere-primary font-semibold">
              {formData.painLevel} / 10
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Visual Symptoms',
      description: 'Select the visual symptoms you are experiencing',
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-lg text-white">Which of the following symptoms do you have? (Select all that apply)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {symptomOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center space-x-3 p-4 rounded-md border transition-all cursor-pointer ${
                    formData[option.id as keyof FormData]
                      ? 'bg-diagnosphere-primary/20 border-diagnosphere-primary'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => updateFormData(option.id as keyof FormData, !formData[option.id as keyof FormData])}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                    formData[option.id as keyof FormData]
                      ? 'bg-diagnosphere-primary text-white'
                      : 'bg-white/10'
                  }`}>
                    {formData[option.id as keyof FormData] && <Check className="w-3 h-3" />}
                  </div>
                  <span className="text-white">{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-lg text-white">Has the condition spread since it first appeared?</Label>
            <RadioGroup
              value={formData.hasSpread}
              onValueChange={(value) => updateFormData('hasSpread', value)}
              className="space-y-3"
            >
              {spreadOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 bg-white/5 p-3 rounded-md border border-white/10 hover:border-white/20 transition-colors">
                  <RadioGroupItem id={`spread-${option.value}`} value={option.value} />
                  <Label htmlFor={`spread-${option.value}`} className="text-white cursor-pointer w-full">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      ),
    },
    {
      title: 'Treatment History',
      description: "Tell us about any treatments you've tried",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-lg text-white">Have you tried any of these treatments? (Select all that apply)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {treatmentOptions.map((treatment) => (
                <div
                  key={treatment}
                  className={`flex items-center space-x-3 p-4 rounded-md border transition-all cursor-pointer ${
                    formData.previousTreatments.includes(treatment)
                      ? 'bg-diagnosphere-primary/20 border-diagnosphere-primary'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => toggleTreatment(treatment)}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                    formData.previousTreatments.includes(treatment)
                      ? 'bg-diagnosphere-primary text-white'
                      : 'bg-white/10'
                  }`}>
                    {formData.previousTreatments.includes(treatment) && <Check className="w-3 h-3" />}
                  </div>
                  <span className="text-white">{treatment}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-lg text-white">Additional information</Label>
            <Textarea
              value={formData.additionalInfo}
              onChange={(e) => updateFormData('additionalInfo', e.target.value)}
              placeholder="Please share any other details that might be helpful for diagnosis (e.g., allergies, medical conditions, etc.)"
              className="min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
        </div>
      ),
    },
  ];

  const currentFormStep = formSteps[currentStep];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between mb-8">
        {formSteps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            style={{ width: `${100 / formSteps.length}%` }}
          >
            <div className="relative w-full mb-2">
              <div
                className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-white/10"
                style={{
                  right: index === formSteps.length - 1 ? '50%' : 0,
                  left: index === 0 ? '50%' : 0,
                }}
              />
              <div
                className={`absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-diagnosphere-primary transition-all duration-300 ${
                  index < currentStep ? 'right-0' : index === currentStep ? 'right-1/2' : 'right-full'
                }`}
                style={{
                  right: index === formSteps.length - 1 ? '50%' : 0,
                  left: index === 0 ? '50%' : 0,
                }}
              />
              <div
                className={`relative z-10 mx-auto w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-diagnosphere-primary border-diagnosphere-primary text-white'
                    : index === currentStep
                    ? 'bg-diagnosphere-primary/20 border-diagnosphere-primary text-white'
                    : 'bg-white/5 border-white/20 text-white/50'
                }`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
            </div>
            <span
              className={`text-xs text-center mt-1 ${
                index === currentStep ? 'text-diagnosphere-primary font-medium' : 'text-white/50'
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg">
        <h2 className="text-2xl font-semibold text-white mb-2">{currentFormStep.title}</h2>
        <p className="text-white/70 mb-6">{currentFormStep.description}</p>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {currentFormStep.content}
        </motion.div>

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            onClick={handleBack}
            variant="outline"
            className="border-white/10 text-white hover:bg-white/5"
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            className="bg-diagnosphere-primary hover:bg-diagnosphere-primary/90"
          >
            {currentStep === formSteps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisForm;
