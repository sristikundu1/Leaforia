import React from "react";
import { motion } from "framer-motion";

const PolicyPage = () => {
  const sections = [
    { id: "privacy-policy", title: "Privacy Policy" },
    { id: "return-policy", title: "Return Policy" },
    { id: "terms-and-conditions", title: "Terms & Conditions" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFEFE] py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* SIDE NAVIGATION - STICKY */}
        <div className="lg:w-1/4">
          <div className="sticky top-24 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
              Legal Center
            </h3>
            <div className="flex flex-col gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="text-left px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm text-slate-600 hover:bg-primary/10 hover:text-primary active:scale-95 border border-transparent hover:border-primary/20"
                >
                  {section.title}
                </button>
              ))}
            </div>
            <div className="p-6 bg-primary rounded-[2rem] mt-8 text-white">
              <p className="text-[10px] font-bold text-[#f2e8cf] uppercase mb-2">
                Need help?
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Questions about these policies? Contact our legal team.
              </p>
              <button className="mt-4 text-xs font-bold underline decoration-primary underline-offset-4">
                support@knoa.com
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="lg:w-3/4 space-y-20">
          {/* 1. PRIVACY POLICY */}
          <motion.section
            id="privacy-policy"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm"
          >
            <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-4">
              <span className="w-1.5 h-8 bg-primary rounded-full"></span>
              Privacy Policy
            </h2>
            <div className="prose prose-slate max-w-none text-slate-500 leading-loose">
              <p className="font-bold text-slate-700">
                Last Updated: April 2026
              </p>
              <p>
                At Knoa, your data privacy is our priority. We collect
                information to provide a personalized botanical experience,
                including your email for subscriptions and delivery addresses
                for plant shipments.
              </p>
              <h4 className="text-slate-800 font-bold mt-6">Data Collection</h4>
              <ul className="list-disc ml-5 space-y-2">
                <li>Personal identifiers (Name, Email, Phone)</li>
                <li>Transaction history for payment verification.</li>
                <li>Local storage data for your wishlist persistence.</li>
              </ul>
              <p className="mt-4 italic">
                We never sell your data to third-party advertisers. All payments
                are processed through secure, encrypted gateways.
              </p>
            </div>
          </motion.section>

          {/* 2. RETURN POLICY */}
          <motion.section
            id="return-policy"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm"
          >
            <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-4">
              <span className="w-1.5 h-8 bg-orange-400 rounded-full"></span>
              Return Policy
            </h2>
            <div className="prose prose-slate max-w-none text-slate-500 leading-loose">
              <p>
                Plants are living beings. Because of this, our return policy is
                specialized to ensure the welfare of the flora.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-50 p-6 rounded-[2rem]">
                  <h5 className="font-bold text-slate-800 mb-2">
                    24-Hour Health Guarantee
                  </h5>
                  <p className="text-sm">
                    If your plant arrives damaged or stressed, notify us within
                    24 hours with a photo for a full replacement.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-[2rem]">
                  <h5 className="font-bold text-slate-800 mb-2">
                    Non-Returnable Items
                  </h5>
                  <p className="text-sm">
                    Sale items, gift cards, and plants that have been repotted
                    after delivery are not eligible for returns.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 3. TERMS & CONDITIONS */}
          <motion.section
            id="terms-and-conditions"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm"
          >
            <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-4">
              <span className="w-1.5 h-8 bg-blue-500 rounded-full"></span>
              Terms & Conditions
            </h2>
            <div className="prose prose-slate max-w-none text-slate-500 leading-loose">
              <p>
                By using the Knoa platform, you agree to the following terms
                regarding account usage and purchasing.
              </p>
              <h4 className="text-slate-800 font-bold mt-6">User Accounts</h4>
              <p>
                You are responsible for maintaining the confidentiality of your
                account credentials. Any fraudulent activity will result in
                immediate termination of access.
              </p>
              <h4 className="text-slate-800 font-bold mt-6">
                Limitation of Liability
              </h4>
              <p>
                Knoa is not liable for plants that fail to thrive due to
                improper care once in the user's possession. We provide care
                guides, but the ultimate responsibility lies with the "Plant
                Parent".
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
