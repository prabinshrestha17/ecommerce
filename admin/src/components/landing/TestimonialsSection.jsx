import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Store Owner",
      content:
        "This dashboard has transformed how I manage my online store. The interface is intuitive and the features are exactly what I needed.",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "E-commerce Manager",
      content:
        "The analytics and reporting features are outstanding. I can make data-driven decisions faster than ever before.",
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager",
      content:
        "Managing thousands of products has never been easier. The bulk operations save me hours every week.",
      avatar: "ER",
    },
  ];

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Loved by Store Owners
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            See what our customers have to say about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-slate-300 mb-6">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
