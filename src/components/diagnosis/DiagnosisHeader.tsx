
import { motion } from 'framer-motion';
import { Download, Share2, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DiagnosisHeaderProps {
  id: string;
  date: string;
  onShare: () => void;
  onPrint: () => void;
  onDownload: () => void;
}

const DiagnosisHeader = ({ id, date, onShare, onPrint, onDownload }: DiagnosisHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-8"
    >
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Medical Diagnosis Report
        </h1>
        <p className="text-gray-400 mt-2">
          Report ID: {id} • Generated on {new Date(date || "").toLocaleDateString()}
        </p>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onPrint}
        >
          <Printer className="w-4 h-4 mr-1" />
          Print
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onShare}
        >
          <Share2 className="w-4 h-4 mr-1" />
          Share
        </Button>
        <Button 
          size="sm" 
          onClick={onDownload}
        >
          <Download className="w-4 h-4 mr-1" />
          Download
        </Button>
      </div>
    </motion.div>
  );
};

export default DiagnosisHeader;
