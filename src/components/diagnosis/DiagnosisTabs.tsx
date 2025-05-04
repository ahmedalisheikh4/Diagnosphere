
import { Button } from '@/components/ui/button';

interface DiagnosisTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DiagnosisTabs = ({ activeTab, onTabChange }: DiagnosisTabsProps) => {
  return (
    <div className="border-b border-white/10 mb-8">
      <div className="flex space-x-1 overflow-x-auto scrollbar-none">
        <Button 
          variant={activeTab === 'overview' ? 'default' : 'ghost'} 
          className={activeTab === 'overview' ? '' : 'text-white/70 hover:text-white hover:bg-white/5'}
          onClick={() => onTabChange('overview')}
        >
          Overview
        </Button>
        <Button 
          variant={activeTab === 'details' ? 'default' : 'ghost'} 
          className={activeTab === 'details' ? '' : 'text-white/70 hover:text-white hover:bg-white/5'} 
          onClick={() => onTabChange('details')}
        >
          Analysis Details
        </Button>
        <Button 
          variant={activeTab === 'treatments' ? 'default' : 'ghost'} 
          className={activeTab === 'treatments' ? '' : 'text-white/70 hover:text-white hover:bg-white/5'} 
          onClick={() => onTabChange('treatments')}
        >
          Treatment Options
        </Button>
      </div>
    </div>
  );
};

export default DiagnosisTabs;
