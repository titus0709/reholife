import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gold/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gold mb-4">Reholife</h3>
            <p className="text-gray-400">
              Empowering leaders to create lasting impact in their organizations and communities.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-gold transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-gold transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-gold transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-gold transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-gold" />
                reholife@gmail.com
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-gold" />
                <a href="tel:+918807552013" className="hover:text-gold">
                  +91-88075 52013
                </a>
              </li>

              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-gold" />
                Leadership Training Center
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gold/20 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Reholife Leadership Training. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
