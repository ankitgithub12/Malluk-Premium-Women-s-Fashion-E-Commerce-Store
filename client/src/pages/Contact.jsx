import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

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
    <div className="pt-44 sm:pt-48 pb-24 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-accent font-semibold block mb-4">
            ✦ Atelier Concierge ✦
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-primary uppercase mb-5">
            Contact <span className="font-serif italic font-normal text-accent normal-case">Us</span>
          </h1>
          <div className="section-ornament mt-5">
            <span className="diamond" />
          </div>
          <p className="text-xs text-brand-text/50 tracking-wider leading-relaxed font-body mt-5 max-w-md mx-auto">
            Reach out to our customer care team for queries regarding sizing, returns, shipping, or to schedule a private styling session.
          </p>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info Columns */}
          <motion.div
            className="lg:col-span-5 bg-white p-6 sm:p-10 border border-primary/5 shadow-sm space-y-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div>
              <h2 className="font-heading text-xl uppercase tracking-widest text-primary font-semibold mb-6">Concierge Desk</h2>
              <motion.div
                className="space-y-6 font-body text-xs tracking-wider text-brand-text/80"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  {
                    icon: <Mail size={16} />,
                    title: 'Email Concierge',
                    content: <a href="mailto:concierge@malluk.com" className="hover:text-accent transition-colors">concierge@malluk.com</a>,
                    sub: 'Inquiries are answered within 24 hours.'
                  },
                  {
                    icon: <Phone size={16} />,
                    title: 'Call Styling Desk',
                    content: <a href="tel:+918264446457" className="hover:text-accent transition-colors">+91 8264446457</a>,
                    sub: 'Mon - Fri: 9:00 AM - 6:00 PM EST'
                  },
                  {
                    icon: <MapPin size={16} />,
                    title: 'Atelier Flagship',
                    content: <p>Phase 8B, Sector 74, Mohali, Chandigarh, India</p>,
                    sub: null,
                    link: { 
                      to: 'https://www.google.com/maps/place/Sahibzada+Ajit+Singh+Nagar,+Punjab/@30.7372083,76.7134124,16.84z/data=!4m6!3m5!1s0x390fee906da6f81f:0x512998f16ce508d8!8m2!3d30.7046486!4d76.7178726!16zL20vMDR0NzI1?hl=en&entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D', 
                      label: 'View Location details',
                      isExternal: true 
                    }
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start space-x-4 group"
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="p-2.5 bg-surface text-accent rounded-full shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-400">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary uppercase mb-1">{item.title}</h4>
                      {item.content}
                      {item.sub && <p className="text-[10px] text-brand-text/40 mt-1 font-body">{item.sub}</p>}
                      {item.link && (
                        item.link.isExternal ? (
                          <a 
                            href={item.link.to} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[10px] text-accent hover:text-primary transition-colors font-semibold uppercase mt-1 inline-block"
                          >
                            {item.link.label}
                          </a>
                        ) : (
                          <Link to={item.link.to} className="text-[10px] text-accent hover:text-primary transition-colors font-semibold uppercase mt-1 inline-block">
                            {item.link.label}
                          </Link>
                        )
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Private Appointments info */}
            <motion.div
              className="pt-6 border-t border-surface space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-heading text-md uppercase tracking-wider text-primary font-semibold">Private Styling Session</h3>
              <p className="text-xs text-brand-text/60 leading-relaxed font-body">
                We offer bespoke private showings at our flagship in Chandigarh, Mohali. Please indicate your desired date and style preferences in your message.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            className="lg:col-span-7 bg-white p-6 sm:p-10 border border-primary/5 shadow-sm"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 space-y-4"
              >
                <motion.div
                  className="inline-flex p-3 bg-emerald-50 text-emerald-800 rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6, repeat: 2 }}
                >
                  <CheckCircle size={32} />
                </motion.div>
                <h3 className="font-heading text-2xl uppercase tracking-widest text-primary font-semibold">Message Received</h3>
                <p className="text-xs text-brand-text/50 font-body max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting the Malluk Atelier. A representative from our concierge desk will reach out shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-body">
                <h2 className="font-heading text-xl uppercase tracking-widest text-primary font-semibold">Send a message</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { label: 'Your Name', name: 'name', type: 'text', placeholder: 'ENTER YOUR NAME...' },
                    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'ENTER YOUR EMAIL...' },
                  ].map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-semibold text-brand-text/50">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="bg-brand-bg border border-surface text-xs tracking-wider px-4 py-3.5 outline-none w-full input-glow transition-all duration-400"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-semibold text-brand-text/50">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="E.G. VIRTUAL STYLING APPOINTMENT..."
                    className="bg-brand-bg border border-surface text-xs tracking-wider px-4 py-3.5 outline-none w-full input-glow transition-all duration-400"
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
                    className="bg-brand-bg border border-surface text-xs tracking-wider px-4 py-3.5 outline-none w-full resize-none input-glow transition-all duration-400"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="bg-primary text-white py-4 px-8 uppercase text-xs font-semibold tracking-widest hover:bg-accent hover:text-primary transition-all duration-400 flex items-center justify-center gap-3 btn-shimmer group"
                  whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(91,15,18,0.2)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </div>
  );
}
