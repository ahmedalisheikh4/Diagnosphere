import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link
              to="/"
              className="text-white text-2xl font-bold flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-diagnosphere-primary rounded flex items-center justify-center">
                <span className="font-bold text-white">D</span>
              </div>
              <span>iagnosphere</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Combining AI with healthcare to enhance diagnostic accuracy for
              skin diseases.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-diagnosphere-primary transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-diagnosphere-primary transition-colors duration-300"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-diagnosphere-primary transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-diagnosphere-primary transition-colors duration-300"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-medium text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-diagnosphere-primary text-sm transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-diagnosphere-primary text-sm transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/skin-disease"
                  className="text-gray-400 hover:text-diagnosphere-primary text-sm transition-colors duration-300"
                >
                  Skin Disease
                </Link>
              </li>
              <li>
                <Link
                  to="/skin-check"
                  className="text-gray-400 hover:text-diagnosphere-primary text-sm transition-colors duration-300"
                >
                  Check My Skin
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-medium text-lg">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-diagnosphere-primary text-sm transition-colors duration-300"
                >
                  Research
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-diagnosphere-primary text-sm transition-colors duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-diagnosphere-primary text-sm transition-colors duration-300"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-diagnosphere-primary text-sm transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-medium text-lg">Contact</h3>
            <p className="text-gray-400 text-sm flex items-start">
              <Mail size={16} className="mr-2 mt-1" />
              <span>contact@diagnosphere.com</span>
            </p>
            <p className="text-gray-400 text-sm">
              Let's discuss how we can help you with skin disease detection.
            </p>
            <Link
              to="/contact"
              className="inline-block text-diagnosphere-primary hover:text-diagnosphere-primary/80 text-sm transition-colors duration-300"
            >
              Get in touch →
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} Diagnosphere. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-diagnosphere-primary text-xs transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-diagnosphere-primary text-xs transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-diagnosphere-primary text-xs transition-colors duration-300"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
