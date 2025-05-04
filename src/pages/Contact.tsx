import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Send } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success(
        "Your message has been sent! We will get back to you soon."
      );
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Contact Us
              </h1>
              <p className="text-xl text-white/70">
                Get in touch with the Diagnosphere team
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 h-full">
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    Reach Out
                  </h2>

                  <div className="space-y-6 text-white/80">
                    <p>
                      Have questions about our technology, need help with the
                      app, or want to explore partnership opportunities? We'd
                      love to hear from you.
                    </p>

                    <div>
                      <h3 className="text-white font-medium mb-1">Email</h3>
                      <p className="text-diagnosphere-primary">
                        contact@diagnosphere.com
                      </p>
                    </div>

                    <div>
                      <h3 className="text-white font-medium mb-1">Location</h3>
                      <p>
                        123 Health Tech Plaza
                        <br />
                        Pakistan, KA 75400
                      </p>
                    </div>

                    <div>
                      <h3 className="text-white font-medium mb-1">Hours</h3>
                      <p>
                        Monday - Friday: 9am - 6pm PT
                        <br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    Send a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Your Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we help you?"
                        className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-white/40"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-diagnosphere-primary hover:bg-diagnosphere-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
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

export default Contact;
