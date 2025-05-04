import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  ShieldCheck,
  Brain,
  Microscope,
  WashingMachine,
  AtomIcon,
  BrainIcon,
} from "lucide-react";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-diagnosphere-primary" />,
      title: "Accurate Diagnosis",
      description:
        "Our advanced AI algorithms analyze skin images with high precision to identify potential skin conditions.",
    },
    {
      icon: <Brain className="w-12 h-12 text-diagnosphere-primary" />,
      title: "Machine Learning",
      description:
        "The system continually learns and improves with each diagnosis, increasing its accuracy over time.",
    },
    {
      icon: <Microscope className="w-12 h-12 text-diagnosphere-primary" />,
      title: "Detailed Analysis",
      description:
        "Get comprehensive information about potential skin conditions and recommended next steps.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center py-20 overflow-hidden"
        style={{ opacity, scale, y }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
          <img
            src="/lovable-uploads/bg1.png"
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="bg-diagnosphere-primary/20 text-diagnosphere-primary px-4 py-1.5 rounded-full text-sm font-medium">
                01 / Our Mission
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Skin Diseases detection and diagnosis.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-gray-300 text-lg max-w-xl"
            >
              Creativity drives this project, combining AI with healthcare to
              enhance diagnostic accuracy. Our machine learning models
              continuously evolve, improving with data and iterations. The goal
              is to push the boundaries of automated skin disease detection,
              constantly refining the model to provide better, more reliable
              results for healthcare professionals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link to="/skin-check">
                <Button className="bg-diagnosphere-primary hover:bg-diagnosphere-primary/90 text-white w-full sm:w-auto">
                  Check Your Skin Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5 w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-6 bg-black/40 p-6 rounded-xl backdrop-blur-sm border border-white/10"
          >
            <ProgressBar progress={65} label="UI/UX Design / Frontend" />
            <ProgressBar progress={70} label="Backend / CNN models" />
            <ProgressBar progress={80} label="Database" />
          </motion.div> */}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-8 h-14 rounded-full border-2 border-white/30 flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-white/60 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Advanced Skin Disease Detection
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-lg"
            >
              Our technology combines computer vision with dermatological
              expertise to provide accurate assessments
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-diagnosphere-primary/30 hover:bg-diagnosphere-primary/5 transition-all duration-300"
              >
                <div className="bg-white/5 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-diagnosphere-primary/20 to-black border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to check your skin?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Upload a photo of your skin concern and get an instant assessment
              powered by our advanced AI technology.
            </p>
            <Link to="/skin-check">
              <Button
                size="lg"
                className="bg-diagnosphere-primary hover:bg-diagnosphere-primary/90 text-white text-lg px-8 py-6 h-auto"
              >
                Check Your Skin Type
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
