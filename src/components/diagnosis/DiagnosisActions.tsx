
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DiagnosisActions = () => {
  return (
    <div className="mt-12 flex justify-center">
      <Link to="/skin-check">
        <Button 
          variant="outline" 
          className="mr-4"
        >
          Start a New Diagnosis
        </Button>
      </Link>
      <Button asChild>
        <Link to="/dashboard">View Your History</Link>
      </Button>
    </div>
  );
};

export default DiagnosisActions;
