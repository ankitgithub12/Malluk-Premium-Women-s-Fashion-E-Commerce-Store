import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const InstagramIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Top gradient border */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            
            {/* Brand & Narrative */}
            <motion.div className="flex flex-col space-y-6" variants={itemVariants}>
              <div>
                <Link to="/" className="flex items-center gap-2 group">
                  <span className="font-heading text-3xl tracking-widest uppercase text-gradient-gold font-medium">
                    Malluk
                  </span>
                </Link>
                <p className="mt-4 text-xs tracking-wider leading-relaxed text-white/60 font-body">
                  Malluk is an editorial-inspired luxury fashion atelier dedicated to fluid, elegant, and timeless apparel for the modern woman. Spun from organic silks, Mongolian cashmere, and fine Italian virgin wool.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {[
                  { Icon: InstagramIcon, href: "https://instagram.com" },
                  { Icon: FacebookIcon, href: "https://facebook.com" },
                  { Icon: TwitterIcon, href: "https://twitter.com" },
                ].map(({ Icon, href }, idx) => (
                  <motion.a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-white/10 rounded-full hover:border-accent hover:text-accent transition-all duration-300 social-glow"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Boutique Navigation */}
            <motion.div variants={itemVariants}>
              <h4 className="font-heading text-sm uppercase tracking-widest text-accent mb-6 font-medium">Shop Collection</h4>
              <ul className="space-y-3 font-body text-xs tracking-wider text-white/70">
                {[
                  { label: 'Silk Dresses', to: '/shop?category=Dresses' },
                  { label: 'Virgin Wool Outerwear', to: '/shop?category=Outerwear' },
                  { label: 'Cashmere Knits', to: '/shop?category=Matching%20Sets' },
                  { label: 'Premium Leather Bags', to: '/shop?category=Accessories' },
                  { label: 'Browse All', to: '/shop' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link to={item.to} className="hover:text-accent hover:pl-1 transition-all duration-300">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Concierge Services */}
            <motion.div variants={itemVariants}>
              <h4 className="font-heading text-sm uppercase tracking-widest text-accent mb-6 font-medium">Concierge</h4>
              <ul className="space-y-3 font-body text-xs tracking-wider text-white/70">
                {[
                  { label: 'Size Guide & Fit', to: '/faq' },
                  { label: 'Shipping & Custom Duties', to: '/faq' },
                  { label: 'Returns & Exchanges', to: '/faq' },
                  { label: 'Virtual Styling Appointment', to: '/contact' },
                  { label: 'FAQs', to: '/faq' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link to={item.to} className="hover:text-accent hover:pl-1 transition-all duration-300">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div className="flex flex-col space-y-6" variants={itemVariants}>
              <div>
                <h4 className="font-heading text-sm uppercase tracking-widest text-accent mb-6 font-medium">Newsletter</h4>
                <p className="text-xs tracking-wider text-white/60 mb-4 font-body leading-relaxed">
                  Subscribe to receive seasonal lookbooks, early access to new edits, and atelier notes.
                </p>
                
                <form onSubmit={handleSubscribe} className="flex border-b border-white/20 pb-2 group">
                  <input
                    type="email"
                    placeholder="YOUR EMAIL..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-none outline-none text-white text-xs tracking-wider placeholder-white/30 w-full font-body py-1"
                    required
                  />
                  <motion.button
                    type="submit"
                    className="p-1 hover:text-accent transition-colors duration-300"
                    aria-label="Subscribe"
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowRight size={16} />
                  </motion.button>
                </form>
                
                {subscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-accent font-medium tracking-wider mt-2"
                  >
                    ✦ Welcome to the Atelier. Exclusive entry details sent.
                  </motion.p>
                )}
              </div>

              <div className="space-y-2 font-body text-[11px] tracking-wider text-white/50">
                <div className="flex items-center space-x-2">
                  <MapPin size={12} className="text-accent" />
                  <span>Atelier Flagship: Sector 74, Mohali, Chandigarh</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={12} className="text-accent" />
                  <span>Concierge Call: +1 (800) 942-0199</span>
                </div>
              </div>
            </motion.div>

          </motion.div>

          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] tracking-widest text-white/40 font-body uppercase">
            <p>© {new Date().getFullYear()} Malluk Atelier Inc. All Rights Reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link to="/faq" className="hover:text-accent transition-colors duration-300">Privacy Policy</Link>
              <Link to="/faq" className="hover:text-accent transition-colors duration-300">Terms of Service</Link>
              <Link to="/faq" className="hover:text-accent transition-colors duration-300">Accessibility Statement</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
