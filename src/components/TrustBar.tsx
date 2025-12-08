import { motion } from "framer-motion";

const clients = [
  { name: "Grace Community Church", logo: "GCC" },
  { name: "Lincoln High School", logo: "LHS" },
  { name: "State University", logo: "SU" },
  { name: "TechCorp Inc", logo: "TC" },
  { name: "Global Ministries", logo: "GM" },
  { name: "Education Alliance", logo: "EA" }
];

export default function TrustBar() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-gray-400 mb-8 text-sm uppercase tracking-wider"
        >
          Trusted by Leading Organizations
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex items-center justify-center"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-24 h-24 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center grayscale group-hover:grayscale-0 group-hover:border-gold transition-all duration-300"
              >
                <span className="text-2xl font-bold text-gray-600 group-hover:text-gold transition-colors">
                  {client.logo}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}