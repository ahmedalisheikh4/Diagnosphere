
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Diagnosphere</h1>
              <p className="text-xl text-white/70">Transforming skin disease diagnosis with AI</p>
            </div>
            
            <div className="grid gap-12">
              <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
                <p className="text-white/80 leading-relaxed">
                  Diagnosphere is dedicated to making advanced skin disease diagnosis accessible to everyone. 
                  By leveraging artificial intelligence and machine learning algorithms, we aim to provide 
                  quick, accurate, and reliable skin condition assessments that can help users identify potential 
                  issues early and seek appropriate medical care.
                </p>
              </section>
              
              <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-4">How It Works</h2>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="bg-diagnosphere-primary/20 p-4 rounded-full text-diagnosphere-primary font-bold text-xl">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl text-white font-medium mb-2">Upload a Photo</h3>
                      <p className="text-white/80">
                        Take a clear photo of your skin condition or upload an existing image.
                        Our system works best with well-lit, focused images that clearly show the affected area.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="bg-diagnosphere-primary/20 p-4 rounded-full text-diagnosphere-primary font-bold text-xl">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl text-white font-medium mb-2">Answer a Few Questions</h3>
                      <p className="text-white/80">
                        Provide additional information about your symptoms to help our AI make a more accurate assessment.
                        Details about duration, pain levels, and other symptoms greatly improve diagnostic accuracy.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="bg-diagnosphere-primary/20 p-4 rounded-full text-diagnosphere-primary font-bold text-xl">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl text-white font-medium mb-2">Get Your Results</h3>
                      <p className="text-white/80">
                        Receive a detailed analysis of potential skin conditions that match your symptoms.
                        Our report includes recommendations for next steps and when to consult a healthcare professional.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Important Disclaimer</h2>
                <p className="text-white/80 leading-relaxed">
                  Diagnosphere is designed to be an informational tool only and is not a substitute for professional 
                  medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified 
                  health provider with any questions you may have regarding a medical condition. Never disregard 
                  professional medical advice or delay in seeking it because of something you have read on this website.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
