import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Reholife transformed our church leadership team. The practical frameworks and personalized coaching helped us navigate complex challenges with confidence.",
    name: "Pastor Michael Chen",
    role: "Senior Pastor, Grace Community Church"
  },
  {
    quote: "The training program exceeded our expectations. Our administrative team is now more aligned, motivated, and effective than ever before.",
    name: "Dr. Sarah Williams",
    role: "Principal, Lincoln High School"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Leaders <span className="text-gold">Say</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Real results from real leaders
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative p-8 bg-black border border-gold/20 rounded-lg hover:border-gold transition-all duration-300"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.4 }}
              >
                <Quote className="absolute top-6 right-6 w-12 h-12 text-gold/20" />
              </motion.div>
              <div className="relative z-10">
                <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-gold/20 pt-4">
                  <p className="text-white font-bold">{testimonial.name}</p>
                  <p className="text-gold text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}