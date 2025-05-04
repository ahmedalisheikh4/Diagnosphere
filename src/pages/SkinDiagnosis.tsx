
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiagnosisHeader from '@/components/diagnosis/DiagnosisHeader';
import MedicalDisclaimer from '@/components/diagnosis/MedicalDisclaimer';
import DiagnosisTabs from '@/components/diagnosis/DiagnosisTabs';
import DiagnosisActions from '@/components/diagnosis/DiagnosisActions';
import DiagnosisLoading from '@/components/diagnosis/DiagnosisLoading';
import DiagnosisError from '@/components/diagnosis/DiagnosisError';
import OverviewTab from '@/components/diagnosis/tabs/OverviewTab';
import DetailsTab from '@/components/diagnosis/tabs/DetailsTab';
import TreatmentsTab from '@/components/diagnosis/tabs/TreatmentsTab';
import { diagnosisAPI } from '@/services/api';
import { DiagnosisResult } from '@/types/diagnosis';

// Mock data for demo purposes
const mockDiagnosisData: DiagnosisResult = {
  id: "diag-12345",
  imageUrl: "https://images.unsplash.com/photo-1612776780584-bdf3855a4e80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
  date: new Date().toISOString(),
  conditions: [
    {
      name: "Eczema (Atopic Dermatitis)",
      probability: 87,
      severity: "Moderate",
      description: "A chronic inflammatory skin condition characterized by dry, itchy, and inflamed skin. It often appears in patches and can cause significant discomfort.",
      nextSteps: [
        "Consult with a dermatologist for proper evaluation and treatment plan",
        "Avoid triggers such as harsh soaps, certain fabrics, and extreme temperatures",
        "Keep skin moisturized with fragrance-free emollients",
        "Apply prescribed topical medications as directed"
      ],
      treatments: [
        "Topical corticosteroids to reduce inflammation",
        "Calcineurin inhibitors (tacrolimus, pimecrolimus)",
        "Moisturizers and emollients to maintain skin hydration",
        "Antihistamines for itching relief",
        "Phototherapy for severe cases"
      ]
    },
    {
      name: "Contact Dermatitis",
      probability: 42,
      severity: "Mild",
      description: "An inflammatory skin condition resulting from contact with allergens or irritants. It causes redness, itching, and sometimes blistering at the site of contact.",
      nextSteps: [
        "Identify and avoid potential allergens or irritants",
        "Use hypoallergenic products for skin care and cleaning",
        "Apply cool compresses to relieve symptoms",
        "Consider patch testing to identify specific allergens"
      ],
      treatments: [
        "Topical corticosteroids for inflammation reduction",
        "Barrier creams to protect skin from irritants",
        "Oral antihistamines for itching",
        "Calamine lotion for symptom relief"
      ]
    },
    {
      name: "Psoriasis",
      probability: 23,
      severity: "Low probability",
      description: "A chronic autoimmune condition that causes rapid skin cell turnover, resulting in thick, red patches with silvery scales. It can affect various body areas.",
      nextSteps: [
        "Monitor for changes in skin condition",
        "Maintain good skin hygiene and moisturizing routine",
        "Consider evaluation if symptoms worsen or change"
      ],
      treatments: [
        "Currently not indicated due to low probability",
        "General skin care with gentle cleansers and moisturizers is recommended"
      ]
    }
  ],
  symptoms: {
    itching: "Moderate to severe",
    redness: "Present in patches",
    flaking: "Mild",
    swelling: "Minimal",
    pain: "None reported",
    duration: "2 weeks"
  },
  patientInfo: {
    age: 34,
    gender: "Female",
    skinType: "Sensitive/Dry",
    medicalHistory: ["Seasonal allergies", "No previous skin conditions"]
  },
  analysisDetails: {
    areaAffected: "Inner elbow, neck",
    duration: "Approximately 2 weeks",
    characteristics: ["Red patches", "Dry, flaky skin", "Intense itching at night", "Worsens with stress"]
  }
};

const SkinDiagnosis = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchDiagnosisResult = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        // For demo/development, use mock data instead of API call
        // In production, uncomment the API call and remove the mock data
        // const data = await diagnosisAPI.getResults(id);
        setTimeout(() => {
          setResult(mockDiagnosisData);
          setIsLoading(false);
        }, 1500); // Simulate loading delay
      } catch (error) {
        console.error('Error fetching diagnosis result:', error);
        setError('Failed to load the diagnosis results. Please try again later.');
        toast.error('Error loading diagnosis results');
        setIsLoading(false);
      }
    };

    fetchDiagnosisResult();
  }, [id]);

  const handleDownloadPDF = () => {
    toast.success('Your PDF report is being generated and will download shortly.');
    // In a real implementation, this would call an API endpoint to generate and download a PDF
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handlePrint = () => {
    window.print();
    toast.success('Print dialog opened.');
  };

  if (isLoading) {
    return <DiagnosisLoading />;
  }

  if (error) {
    return <DiagnosisError error={error} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <DiagnosisHeader 
              id={result?.id || ''} 
              date={result?.date || ''} 
              onShare={handleShare}
              onPrint={handlePrint}
              onDownload={handleDownloadPDF}
            />

            <MedicalDisclaimer />

            <DiagnosisTabs 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />

            {activeTab === 'overview' && result && (
              <OverviewTab result={result} />
            )}

            {activeTab === 'details' && result && (
              <DetailsTab result={result} />
            )}

            {activeTab === 'treatments' && result && (
              <TreatmentsTab result={result} />
            )}

            <DiagnosisActions />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SkinDiagnosis;
