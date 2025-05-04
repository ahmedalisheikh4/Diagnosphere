
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SkinDisease = () => {
  const diseases = [
    {
      name: "Acne",
      description: "A skin condition that occurs when hair follicles plug with oil and dead skin cells, causing pimples, blackheads, and whiteheads.",
      symptoms: ["Whiteheads", "Blackheads", "Pimples", "Nodules", "Cystic lesions"],
      commonAreas: ["Face", "Forehead", "Chest", "Upper back", "Shoulders"]
    },
    {
      name: "Eczema",
      description: "A condition that makes your skin red and itchy. It's common in children but can occur at any age.",
      symptoms: ["Dry, scaly skin", "Itching", "Red to brownish-gray patches", "Small, raised bumps", "Thickened, cracked skin"],
      commonAreas: ["Hands", "Feet", "Ankles", "Wrists", "Neck", "Upper chest", "Eyelids", "Inside the bend of elbows and knees"]
    },
    {
      name: "Psoriasis",
      description: "A skin disease that causes red, itchy scaly patches, most commonly on the knees, elbows, trunk and scalp.",
      symptoms: ["Red patches of skin covered with thick, silvery scales", "Small scaling spots", "Dry, cracked skin that may bleed", "Itching, burning or soreness", "Thickened, pitted or ridged nails"],
      commonAreas: ["Scalp", "Elbows", "Knees", "Lower back"]
    },
    {
      name: "Rosacea",
      description: "A common skin condition that causes redness and visible blood vessels in your face. It may also produce small, red, pus-filled bumps.",
      symptoms: ["Facial redness", "Swollen red bumps", "Eye problems", "Enlarged nose"],
      commonAreas: ["Cheeks", "Nose", "Forehead", "Chin"]
    },
    {
      name: "Melanoma",
      description: "The most serious type of skin cancer, developing in the cells that produce melanin, the pigment that gives your skin its color.",
      symptoms: ["A change in an existing mole", "Development of a new pigmented or unusual-looking growth on your skin"],
      commonAreas: ["Face", "Neck", "Arms", "Trunk", "Legs"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Common Skin Diseases</h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Learn about various skin conditions, their symptoms, and affected areas
              </p>
            </div>
            
            <div className="grid gap-8 md:gap-10 max-w-5xl mx-auto">
              {diseases.map((disease, index) => (
                <motion.div
                  key={disease.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 + 0.2 }
                  }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8"
                >
                  <h2 className="text-2xl font-semibold text-diagnosphere-primary mb-4">{disease.name}</h2>
                  <p className="text-white/80 mb-6">{disease.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Common Symptoms</h3>
                      <ul className="space-y-2">
                        {disease.symptoms.map((symptom, i) => (
                          <li key={i} className="flex items-center text-white/70">
                            <span className="w-2 h-2 bg-diagnosphere-primary rounded-full mr-2"></span>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Common Areas</h3>
                      <div className="flex flex-wrap gap-2">
                        {disease.commonAreas.map((area, i) => (
                          <span 
                            key={i} 
                            className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-diagnosphere-primary/20 border border-diagnosphere-primary/30 rounded-xl p-6 mt-12 max-w-5xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="bg-diagnosphere-primary/30 p-3 rounded-full text-diagnosphere-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-1">Important Disclaimer</h3>
                  <p className="text-white/80">
                    This information is provided for educational purposes only and is not intended to be a substitute for 
                    professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare 
                    provider with any questions you may have regarding a medical condition.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SkinDisease;
