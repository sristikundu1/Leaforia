import React from "react";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqData = [
    {
      q: "How do I track my plant delivery?",
      a: "Once your rider is assigned, you can track the status in your User Dashboard under 'My Orders'. You will see status updates like 'Driver Assigned' and 'Parcel Delivered'.",
    },
    {
      q: "What is the Knoa return policy?",
      a: "Since plants are living things, we offer a 24-hour health guarantee. If your plant arrives stressed, send us a photo and we will replace it immediately.",
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: "Absolutely. You can manage your subscription status directly from your personalized growth hub in the dashboard.",
    },
    {
      q: "How do I contact my assigned rider?",
      a: "Rider details become visible in your order tracking section as soon as the admin approves the delivery.",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            Help Center
          </span>
          <h2 className="text-4xl font-black text-slate-800 mt-4">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 flex bg-slate-50 p-2 rounded-2xl border border-slate-100">
            <input
              type="text"
              placeholder="Search for answers..."
              className="bg-transparent border-none focus:ring-0 w-full px-4 py-2"
            />
            <button className="btn btn-primary btn-sm rounded-xl">
              Search
            </button>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="collapse collapse-plus bg-[#F8FAFC] rounded-[2rem] border border-slate-100 group"
            >
              <input
                type="radio"
                name="my-accordion-3"
                defaultChecked={index === 0}
              />
              <div className="collapse-title text-lg font-bold text-slate-700 py-6 px-8 group-hover:text-primary transition-colors">
                {item.q}
              </div>
              <div className="collapse-content px-8 pb-6 text-slate-500 leading-relaxed">
                <p>{item.a}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Support */}
        <div className="mt-20 p-10 bg-slate-900 rounded-[40px] text-center text-white">
          <h3 className="text-2xl font-bold">Still have questions?</h3>
          <p className="text-slate-400 mt-2 mb-8">
            Can't find the answer you're looking for? Please chat with our
            friendly team.
          </p>
          <button className="btn btn-primary rounded-2xl px-10 border-none">
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
