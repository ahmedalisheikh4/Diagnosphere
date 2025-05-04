
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DiagnosisLoading = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-3/4 mx-auto mb-4 bg-white/5" />
            <Skeleton className="h-4 w-1/2 mx-auto mb-12 bg-white/5" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-[300px] w-full rounded-xl bg-white/5" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4 bg-white/5" />
                <Skeleton className="h-4 w-full bg-white/5" />
                <Skeleton className="h-4 w-full bg-white/5" />
                <Skeleton className="h-4 w-2/3 bg-white/5" />
                
                <div className="pt-4">
                  <Skeleton className="h-6 w-1/2 bg-white/5" />
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Skeleton className="h-10 w-full bg-white/5" />
                    <Skeleton className="h-10 w-full bg-white/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosisLoading;
