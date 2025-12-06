"use client";
import React from "react";
import { MessageCircle, FileText, Phone } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Help & Support</h1>
        <p className="text-slate-400 mt-1">We are here to help you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          icon={FileText}
          title="Documentation"
          desc="Read detailed guides about platform features."
        />
        <Card
          icon={MessageCircle}
          title="Live Chat"
          desc="Chat with our support team in real-time."
        />
        <Card
          icon={Phone}
          title="Contact Support"
          desc="Submit a ticket for technical issues."
        />
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8">
        <h3 className="text-xl font-bold text-slate-100 mb-6">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          <FAQItem
            q="How do I export sales data?"
            a="Go to the Orders page and click the 'Export CSV' button at the top right corner."
          />
          <FAQItem
            q="Can I change the currency?"
            a="Yes, navigate to Settings > Store Information to change your default currency."
          />
          <FAQItem
            q="How do I add a new admin?"
            a="Go to Users, click 'Add New User', and select the 'Admin' role from the dropdown."
          />
        </div>
      </div>
    </div>
  );
}

const Card = ({ icon: Icon, title, desc }) => (
  <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/50 transition-colors cursor-pointer text-center">
    <div className="mx-auto w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="font-semibold text-slate-100 mb-2">{title}</h3>
    <p className="text-sm text-slate-400">{desc}</p>
  </div>
);

const FAQItem = ({ q, a }) => (
  <div className="border-b border-slate-800 pb-4 last:border-0">
    <h4 className="font-medium text-slate-200 mb-2">{q}</h4>
    <p className="text-sm text-slate-400">{a}</p>
  </div>
);
