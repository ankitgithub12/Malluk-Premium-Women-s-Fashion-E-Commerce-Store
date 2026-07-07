import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <div className="pt-28 pb-24 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-3">
            Atelier Concierge
          </span>
          <h1 className="text-4xl font-light tracking-wide text-primary uppercase mb-4">
            Contact <span className="font-serif italic font-normal text-accent normal-case">Us</span>
          </h1>
          <div className="h-[1px] w-20 bg-accent/40 mx-auto mt-4" />
          <p className="text-xs text-brand-text/50 tracking-wider leading-relaxed font-body">
            Reach out to our customer care team for queries regarding sizing, returns, shipping, or to schedule a private styling session.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info Columns */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-10 border border-primary/5 shadow-sm space-y-10">
            <div>
              <h2 className="font-heading text-xl uppercase tracking-widest text-primary font-semibold mb-6">Concierge Desk</h2>
              <div className="space-y-6 font-body text-xs tracking-wider text-brand-text/80">
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-surface text-accent rounded-full shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary uppercase mb-1">Email Concierge</h4>
                    <a href="mailto:concierge@malluk.com" className="hover:text-accent transition-colors">concierge@malluk.com</a>
                    <p className="text-[10px] text-brand-text/40 mt-1 font-body">Inquiries are answered within 24 hours.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-surface text-accent rounded-full shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary uppercase mb-1">Call Styling Desk</h4>
                    <a href="tel:+18009420199" className="hover:text-accent transition-colors">+1 (800) 942-0199</a>
                    <p className="text-[10px] text-brand-text/40 mt-1 font-body">Mon - Fri: 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-surface text-accent rounded-full shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary uppercase mb-1">Atelier Flagship</h4>
                    <p>Phase 8B, Sector 74, Mohali, Chandigarh, India</p>
                    <Link to="/about" className="text-[10px] text-accent hover:text-primary transition-colors font-semibold uppercase mt-1 inline-block">View Location details</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Private Appointments info */}
            <div className="pt-6 border-t border-surface space-y-4">
              <h3 className="font-heading text-md uppercase tracking-wider text-primary font-semibold">Private Styling Session</h3>
              <p className="text-xs text-brand-text/60 leading-relaxed font-body">
                We offer bespoke private showings at our flagship in Chandigarh, Mohali. Please indicate your desired date and style preferences in your message.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-primary/5 shadow-sm">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 space-y-4"
              >
                <div className="inline-flex p-3 bg-emerald-50 text-emerald-800 rounded-full">
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-heading text-2xl uppercase tracking-widest text-primary font-semibold">Message Received</h3>
                <p className="text-xs text-brand-text/50 font-body max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting the Malluk Atelier. A representative from our concierge desk will reach out shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-body">
                <h2 className="font-heading text-xl uppercase tracking-widest text-primary font-semibold">Send a message</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-semibold text-brand-text/50">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="ENTER YOUR NAME..."
                      className="bg-brand-bg border border-surface text-xs tracking-wider px-4 py-3.5 outline-none w-full"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-semibold text-brand-text/50">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ENTER YOUR EMAIL..."
                      className="bg-brand-bg border border-surface text-xs tracking-wider px-4 py-3.5 outline-none w-full"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-semibold text-brand-text/50">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="E.G. VIRTUAL STYLING APPOINTMENT..."
                    className="bg-brand-bg border border-surface text-xs tracking-wider px-4 py-3.5 outline-none w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-semibold text-brand-text/50">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="DESCRIBE YOUR REQUEST..."
                    rows="5"
                    className="bg-brand-bg border border-surface text-xs tracking-wider px-4 py-3.5 outline-none w-full resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-primary text-white py-4 px-8 uppercase text-xs font-semibold tracking-widest hover:bg-accent hover:text-primary transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
