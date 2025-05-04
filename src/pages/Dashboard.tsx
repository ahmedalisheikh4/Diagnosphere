import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { diagnosisAPI } from "@/services/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { History, CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface DiagnosisHistory {
  id: string;
  imageUrl: string;
  date: string;
  hasResults: boolean;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<DiagnosisHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const data = await diagnosisAPI.getUserHistory();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
        toast.error("Failed to load your diagnosis history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Welcome back, {user?.name}
                </h1>
                <p className="text-gray-400">
                  Track your skin health and view your previous diagnoses
                </p>
              </div>

              <Button
                className="mt-4 md:mt-0 bg-diagnosphere-primary hover:bg-diagnosphere-primary/90"
                asChild
              >
                <Link to="/skin-check">New Diagnosis</Link>
              </Button>
            </motion.div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-diagnosphere-primary/20 rounded-full flex items-center justify-center">
                  <History className="w-5 h-5 text-diagnosphere-primary" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Your Diagnosis History
                </h2>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-white/5 rounded-lg overflow-hidden"
                    >
                      <Skeleton className="h-44 w-full bg-white/10" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-5 w-3/4 bg-white/10" />
                        <Skeleton className="h-4 w-1/2 bg-white/10" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : history.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-white/60" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    No diagnoses yet
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    You haven't performed any skin diagnoses yet. Start your
                    first analysis to track your skin health.
                  </p>
                  <Button
                    className="bg-diagnosphere-primary hover:bg-diagnosphere-primary/90"
                    asChild
                  >
                    <Link to="/skin-check">Start Your First Diagnosis</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {history.map((item) => (
                    <Link
                      key={item.id}
                      to={`/diagnosis-results/${item.id}`}
                      className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-diagnosphere-primary/50 transition-colors"
                    >
                      <div className="relative h-44">
                        <img
                          src={item.imageUrl}
                          alt="Skin diagnosis"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center">
                          <span className="text-white text-sm">
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                          {item.hasResults ? (
                            <span className="flex items-center text-green-400 text-xs font-medium px-2 py-1 rounded-full bg-green-500/20">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Complete
                            </span>
                          ) : (
                            <span className="flex items-center text-yellow-400 text-xs font-medium px-2 py-1 rounded-full bg-yellow-500/20">
                              <Clock className="w-3 h-3 mr-1" />
                              Processing
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-white">
                          View Diagnosis Results
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                          Click to see detailed analysis
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg col-span-1">
                <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/10 text-white hover:bg-white/5"
                    asChild
                  >
                    <Link to="/skin-check">New Diagnosis</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/10 text-white hover:bg-white/5"
                    asChild
                  >
                    <Link to="/skin-disease">Skin Disease Library</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/10 text-white hover:bg-white/5"
                    asChild
                  >
                    <Link to="/contact">Contact a Specialist</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg col-span-2">
                <h3 className="font-semibold text-white mb-4">
                  Skin Health Tips
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-diagnosphere-primary mt-2 mr-3"></span>
                    <span className="text-white/80 text-sm">
                      Moisturize daily to maintain your skin's protective
                      barrier and prevent dryness.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-diagnosphere-primary mt-2 mr-3"></span>
                    <span className="text-white/80 text-sm">
                      Apply sunscreen with at least SPF 30 every day, even when
                      it's cloudy.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-diagnosphere-primary mt-2 mr-3"></span>
                    <span className="text-white/80 text-sm">
                      Stay hydrated by drinking 8-10 glasses of water daily for
                      naturally glowing skin.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-diagnosphere-primary mt-2 mr-3"></span>
                    <span className="text-white/80 text-sm">
                      Get 7-8 hours of sleep each night to allow your skin to
                      repair and regenerate.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
