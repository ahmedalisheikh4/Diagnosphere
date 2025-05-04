
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface DiagnosisErrorProps {
  error: string;
}

const DiagnosisError = ({ error }: DiagnosisErrorProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
        <div className="text-center p-8 bg-white/5 border border-white/10 rounded-xl max-w-md">
          <AlertTriangle className="h-12 w-12 text-diagnosphere-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Diagnosis Not Found</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link to="/skin-check">
            <Button>
              Try a New Diagnosis
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosisError;
