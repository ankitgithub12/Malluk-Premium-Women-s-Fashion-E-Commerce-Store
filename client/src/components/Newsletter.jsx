import React, { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section className="py-24 bg-brand-bg border-b border-surface relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="bg-white border border-primary/5 p-10 sm:p-16 shadow-lg">
          <div className="max-w-xl mx-auto space-y-6">
            
            <div className="inline-flex p-3 bg-surface text-accent rounded-full mb-2">
              <Mail size={20} strokeWidth={1.5} />
            </div>

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
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-surface border border-surface text-primary placeholder-brand-text/30 text-xs tracking-wider px-6 py-4 outline-none font-body"
                required
              />
              <button
                type="submit"
                className="bg-primary text-white hover:bg-accent hover:text-primary transition-all duration-300 px-8 py-4 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-3 shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight size={14} />
              </button>
            </form>

            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-emerald-800 font-semibold tracking-wider animate-bounce"
              >
                Invitation has been sent. Welcome to Malluk.
              </motion.p>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
