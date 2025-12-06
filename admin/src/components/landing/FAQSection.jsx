import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export const FAQSection = () => {
  const faqs = [
    {
      question: "How do I get started?",
      answer:
        "Simply sign up for an account and follow our onboarding guide. You'll be up and running in minutes.",
    },
    {
      question: "Can I import my existing products?",
      answer:
        "Yes! We support bulk import from CSV files and integration with popular e-commerce platforms.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use enterprise-grade encryption and follow industry best practices for data security.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and offer custom billing for enterprise customers.",
    },
  ];

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-400">
            Everything you need to know about our platform
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl"
            >
              <h3 className="text-lg font-semibold text-slate-100 mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-400" />
                {faq.question}
              </h3>
              <p className="text-slate-400 ml-7">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
