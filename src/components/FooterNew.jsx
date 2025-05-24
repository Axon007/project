import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Facebook, Twitter, Linkedin, Instagram, Github, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient";

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export function FooterLinks({ className }) {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Testimonials", href: "#" },
        { name: "FAQ", href: "#" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Web Development", href: "/web-development" },
        { name: "App Development", href: "/app-development" },
        { name: "Game Development", href: "/game-development" },
        { name: "Logo Design", href: "/logo-design" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Cookies", href: "/cookies" }
      ]
    }
  ];

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {footerLinks.map((column, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="space-y-4"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {column.title}
            </h3>
            <ul className="space-y-3">
              {column.links.map((link, j) => (
                <motion.li key={j} variants={itemVariants}>
                  <Link 
                    to={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function FooterNewsletter({ onSubscribe, isSubscribed, className }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubscribe) onSubscribe();
  };

  return (
    <div className={className}>
      <motion.div variants={itemVariants} className="mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          Stay Updated
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Subscribe to our newsletter for the latest updates, articles, and resources.
        </p>
      </motion.div>

      {isSubscribed ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900/30 text-green-600 dark:text-green-400"
        >
          <Check className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">Thank you for subscribing!</p>
        </motion.div>
      ) : (
        <motion.form variants={itemVariants} onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-primary transition-colors"
                required
              />
            </div>
            <Button type="submit" className="sm:w-auto">
              Subscribe <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </motion.form>
      )}
    </div>
  );
}

export function FooterSocial({ className }) {
  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="w-5 h-5" />, href: "#" },
    { name: "Twitter", icon: <Twitter className="w-5 h-5" />, href: "#" },
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "#" },
    { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "#" },
    { name: "GitHub", icon: <Github className="w-5 h-5" />, href: "#" }
  ];

  return (
    <motion.div variants={itemVariants} className={className}>
      <div className="flex gap-4">
        {socialLinks.map((social, i) => (
          <motion.a
            key={i}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary hover:border-primary hover:text-white dark:hover:text-white transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Follow us on ${social.name}`}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

export default function Footer({ isSubscribed = false, onSubscribe }) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={footerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Brand section */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block">
              <GradientText className="text-2xl font-bold">
                JASON
              </GradientText>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm">
              Creating exceptional digital experiences with cutting-edge technology and innovative design.
            </p>

            <FooterSocial />
          </motion.div>

          {/* Links section */}
          <div className="lg:col-span-5">
            <FooterLinks />
          </div>

          {/* Newsletter section */}
          <div className="lg:col-span-3">
            <FooterNewsletter 
              isSubscribed={isSubscribed} 
              onSubscribe={onSubscribe} 
            />
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {currentYear} Jason. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
