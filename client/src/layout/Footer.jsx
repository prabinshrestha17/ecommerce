import React from "react";
import { Twitter, Facebook, Instagram, Github, Mail } from "lucide-react";

const SocialIcon = ({ Icon }) => (
  <div className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-black hover:border-black group transition-all duration-300 cursor-pointer">
    <Icon
      className="w-4 h-4 text-black group-hover:text-white transition-colors duration-300"
      size={16}
    />
  </div>
);

const PaymentIcon = ({ src, alt }) => (
  <div className="bg-white px-2 py-1 rounded shadow-sm border border-gray-200 w-12 h-8 flex items-center justify-center">
    <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
  </div>
);

export default function Footer() {
  const footerLinks = [
    {
      title: "COMPANY",
      links: ["About", "Features", "Works", "Career"],
    },
    {
      title: "HELP",
      links: [
        "Customer Support",
        "Delivery Details",
        "Terms & Conditions",
        "Privacy Policy",
      ],
    },
    {
      title: "FAQ",
      links: ["Account", "Manage Deliveries", "Orders", "Payments"],
    },
    {
      title: "RESOURCES",
      links: [
        "Free eBooks",
        "Development Tutorial",
        "How to - Blog",
        "Youtube Playlist",
      ],
    },
  ];

  return (
    <footer className="relative bg-[#000]  pt-32 pb-8 px-4 md:px-8">
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2  -translate-y-1/2 w-full max-w-[1240px] px-4 md:px-0">
        <div className="bg-black rounded-[20px] py-9 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-20 shadow-lg">
          <h2 className="text-white text-3xl md:text-4xl font-black uppercase max-w-lg leading-tight text-center md:text-left">
            Stay upto date about our latest offers
          </h2>
          <div className="w-full md:w-auto flex flex-col gap-3 min-w-[300px] lg:min-w-[350px]">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <button className="w-full bg-white text-black font-medium py-3 rounded-full hover:bg-gray-100 transition-colors">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div> */}

      <div className="max-w-[1240px] mx-auto border-b border-gray-300 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4">
          <div className="md:col-span-4 flex flex-col gap-6">
            <h3 className="text-3xl font-black uppercase tracking-tighter">
              SHOP.CO
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[280px]">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>
            <div className="flex gap-3">
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Instagram} />
              <SocialIcon Icon={Github} />
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerLinks.map(section => (
                <div key={section.title}>
                  <h4 className="font-bold text-black uppercase tracking-widest mb-6">
                    {section.title}
                  </h4>
                  <ul className="space-y-4">
                    {section.links.map(link => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-gray-500 hover:text-black transition-colors text-sm md:text-base"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">
          Shop.co © 2000-2023, All Rights Reserved
        </p>
        <div className="flex gap-3">
          <PaymentIcon
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
            alt="Visa"
          />
          <PaymentIcon
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
            alt="Mastercard"
          />
          <PaymentIcon
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            alt="PayPal"
          />
          <PaymentIcon
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            alt="Apple Pay"
          />
          <PaymentIcon
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google Pay"
          />
        </div>
      </div>
    </footer>
  );
}
