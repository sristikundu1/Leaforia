import React from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-[#F9FBFA] py-24 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-800"
          >
            Let’s Start a <span className="text-primary">Conversation</span>
          </motion.h1>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Have questions about your botanical journey? Our team of plant
            experts is here to help you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-slate-900 rounded-[40px] p-8 md:p-12 text-white flex flex-col justify-between"
          >
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl text-2xl text-primary">
                    <HiOutlineMail />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">
                      Email Us
                    </p>
                    <p className="text-lg font-medium">
                      hello@knoa-learning.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl text-2xl text-primary">
                    <HiOutlinePhone />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">
                      Call Us
                    </p>
                    <p className="text-lg font-medium">+1 (555) 000-0000</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl text-2xl text-primary">
                    <HiOutlineLocationMarker />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">
                      Visit Us
                    </p>
                    <p className="text-lg font-medium">
                      123 Green Lane, Eco City
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle Static Graph for UI depth */}
            <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-[10px] font-bold uppercase text-slate-500 mb-2 tracking-tighter text-center">
                Average Response Time
              </p>
              <div className="flex items-end gap-1 justify-center h-12">
                {[40, 70, 45, 90, 65, 80].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-2 bg-primary rounded-full opacity-50"
                  ></div>
                ))}
              </div>
              <p className="text-center text-xs mt-2 font-bold text-primary">
                ~ 2 Hours
              </p>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered w-full bg-[#F8FAFC] border-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="input input-bordered w-full bg-[#F8FAFC] border-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Subject
                </label>
                <select className="select select-bordered w-full bg-[#F8FAFC] border-none focus:ring-2 focus:ring-primary/20">
                  <option disabled selected>
                    How can we help?
                  </option>
                  <option>Order Support</option>
                  <option>Plant Care Advice</option>
                  <option>Business Inquiry</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Message
                </label>
                <textarea
                  className="textarea textarea-bordered w-full bg-[#F8FAFC] border-none h-32 focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell us more about your needs..."
                ></textarea>
              </div>
              <button className="btn btn-primary w-full rounded-2xl text-white font-bold h-14 border-none shadow-lg shadow-primary/30">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
