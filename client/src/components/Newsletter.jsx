import React, { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section className="py-24 bg-brand-bg border-b border-surface relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <motion.div
          className="bg-white border border-primary/5 p-10 sm:p-16 shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Shimmer sweep across the card */}
          <div className="absolute inset-0 shimmer-effect pointer-events-none" />

          <div className="max-w-xl mx-auto space-y-6 relative z-10">
            
            <motion.div
              className="inline-flex p-3 bg-surface text-accent rounded-full mb-2"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Mail size={20} strokeWidth={1.5} />
            </motion.div>

            <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block">
              Atelier Circular
            </span>
            
            <h2 className="text-3xl font-light tracking-wide text-primary uppercase">
              Join the <span className="font-serif italic font-normal text-accent normal-case">Circle</span>
            </h2>
            
            <p className="text-xs text-brand-text/50 tracking-wider leading-relaxed font-body">
              Receive updates on seasonal runway arrivals, early lookbook previews, private boutique exhibitions, and exclusive atelier communications.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="YOUR EMAIL ADDRESS..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full bg-surface border border-surface text-primary placeholder-brand-text/30 text-xs tracking-wider px-6 py-4 outline-none font-body input-glow transition-all duration-400"
                  required
                />
                {/* Animated underline on focus */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-accent"
                  initial={{ width: '0%' }}
                  animate={{ width: isFocused ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <motion.button
                type="submit"
                className="bg-primary text-white hover:bg-accent hover:text-primary transition-all duration-400 px-8 py-4 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-3 shrink-0 btn-shimmer"
                whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(91,15,18,0.2)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Subscribe</span>
                <ArrowRight size={14} />
              </motion.button>
            </form>

            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="text-xs text-emerald-800 font-semibold tracking-wider"
              >
                ✦ Invitation has been sent. Welcome to Malluk. ✦
              </motion.p>
            )}

          </div>
        </motion.div>

      </div>
    </section>
  );
}
