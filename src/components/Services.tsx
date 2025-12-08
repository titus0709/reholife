import { Briefcase, GraduationCap, Church, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Church,
    title: "Church Leadership",
    description: "Equip ministry leaders with tools to build thriving, mission-driven communities"
  },
  {
    icon: GraduationCap,
    title: "Educational Leadership",
    description: "Transform school and college administrators into visionary educational leaders"
  },
  {
    icon: Building2,
    title: "Corporate Training",
    description: "Develop executive teams that drive innovation and organizational excellence"
  },
  {
    icon: Briefcase,
    title: "Custom Programs",
    description: "Tailored leadership solutions designed for your unique organizational needs"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 }
};

export default function Services() {
  return (
    <section id="services" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-gold">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive leadership training programs for every sector
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group p-6 bg-gray-900 border border-gray-800 rounded-lg hover:border-gold transition-all duration-300 cursor-pointer"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-14 h-14 bg-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors"
              >
                <service.icon className="w-7 h-7 text-gold" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}