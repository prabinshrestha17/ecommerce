import React from "react";
import { motion } from "framer-motion";
import { Users, Package, Tag, BarChart3, Shield, Layers } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: "User Management",
      description:
        "Complete user control with roles, permissions, and activity tracking.",
    },
    {
      icon: Package,
      title: "Product Management",
      description:
        "Easily manage your product catalog with inventory tracking and variants.",
    },
    {
      icon: Tag,
      title: "Category Management",
      description: "Organize products with hierarchical categories and tags.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Real-time insights into sales, user behavior, and performance metrics.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with data encryption and regular backups.",
    },
    {
      icon: Layers,
      title: "Modern UI/UX",
      description:
        "Beautiful, intuitive interface with dark mode and responsive design.",
    },
  ];

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Powerful features to manage your e-commerce business efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-blue-400 mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
