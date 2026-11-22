import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Image as ImageIcon, MapPin, MessageSquare } from 'lucide-react';

const FarmerExperience = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Device Mockup */}
          <div className="relative order-2 lg:order-1 flex justify-center">
            
            {/* Contextual Floating Elements */}
            <motion.div 
              className="absolute top-10 -left-4 md:left-4 bg-white p-3 rounded-xl shadow-float z-20 flex items-center gap-3 border border-border/50"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="bg-sand w-8 h-8 rounded-lg flex items-center justify-center text-charcoal">
                <ShieldAlert size={16} />
              </div>
              <div className="text-sm font-bold text-charcoal">Health Status</div>
            </motion.div>

            <motion.div 
              className="absolute bottom-32 -right-4 md:-right-8 bg-white p-3 rounded-xl shadow-float z-20 flex flex-col gap-2 border border-border/50"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-terracotta"></div>
                <div className="text-xs font-semibold text-charcoal">Recent Report</div>
              </div>
              <div className="text-xs text-charcoal/60">Follow-up needed</div>
            </motion.div>

            {/* Main Phone Mockup */}
            <motion.div 
              className="w-[280px] h-[580px] bg-white rounded-[40px] border-[8px] border-charcoal shadow-2xl overflow-hidden relative z-10 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Phone Header */}
              <div className="bg-charcoal text-white pt-10 pb-6 px-6">
                <h4 className="font-bold text-lg mb-1">New Report</h4>
                <p className="text-xs text-white/70">What seems to be the issue?</p>
              </div>
              
              {/* Phone Content Area */}
              <div className="flex-1 bg-warm-ivory p-5 space-y-4">
                
                {/* AI Message Bubble */}
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-terracotta/20 flex-shrink-0 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-terracotta"></div>
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-xs text-charcoal border border-border/40 leading-relaxed">
                    Please describe the symptoms you've noticed. Are there any visible signs?
                  </div>
                </div>

                {/* User Response Area (mocked) */}
                <div className="flex justify-end gap-3">
                  <div className="bg-charcoal p-3 rounded-2xl rounded-tr-none shadow-sm text-xs text-white leading-relaxed max-w-[80%]">
                    Reduced appetite since yesterday and slight lethargy.
                  </div>
                </div>

                {/* Input Actions Mock */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-border/40 flex flex-col items-center justify-center gap-2 text-charcoal/60 cursor-pointer">
                    <ImageIcon size={20} />
                    <span className="text-[10px] font-medium">Add Photo</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-border/40 flex flex-col items-center justify-center gap-2 text-charcoal/60 cursor-pointer">
                    <MapPin size={20} />
                    <span className="text-[10px] font-medium">Location</span>
                  </div>
                </div>
              </div>

              {/* Phone Input Mock */}
              <div className="bg-white p-4 border-t border-border/50 flex gap-3 items-center">
                <div className="flex-1 bg-sand/30 h-10 rounded-full px-4 flex items-center text-xs text-charcoal/40">
                  Type or speak...
                </div>
                <div className="w-10 h-10 bg-charcoal rounded-full flex items-center justify-center text-white">
                  <MessageSquare size={16} />
                </div>
              </div>
            </motion.div>

            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-sand/40 rounded-full blur-3xl z-0"></div>
          </div>
          
          {/* Text Content */}
          <div className="order-1 lg:order-2 lg:pl-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-sm font-semibold tracking-wider text-terracotta uppercase mb-4">Farmer Experience</div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-6">
                Simple. Accessible.<br />Low-friction.
              </h2>
              
              <p className="text-lg text-charcoal/70 mb-8 leading-relaxed">
                The farmer interface is designed to remove technical and communicative barriers. Reporting a health concern is as simple as sending a message.
              </p>

              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-terracotta/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-terracotta"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal text-lg mb-1">Conversational intake</h4>
                    <p className="text-charcoal/70 text-sm">Natural language interactions that guide farmers through the reporting process without complex forms.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-terracotta/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-terracotta"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal text-lg mb-1">Visual documentation</h4>
                    <p className="text-charcoal/70 text-sm">Easily capture and upload images that the AI can analyze for visible signs of illness.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-terracotta/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-terracotta"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal text-lg mb-1">Clear next steps</h4>
                    <p className="text-charcoal/70 text-sm">Receive immediate, understandable feedback and guidance on whether veterinary contact is advised.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FarmerExperience;
