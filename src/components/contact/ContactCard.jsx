import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ContactCard = ({ icon, title, info, link, linkText }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-secondary/20 backdrop-blur-sm border border-secondary/20 rounded-2xl p-6 hover:border-primary/20 transition-all hover:shadow-lg hover:shadow-primary/5 flex flex-col items-center text-center"
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70 mb-4">{info}</p>
      {link && (
        <a href={link} className="inline-flex items-center text-primary font-medium hover:underline">
          {linkText} <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      )}
    </motion.div>
  );
};

export default ContactCard; 