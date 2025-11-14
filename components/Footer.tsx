import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon } from './icons/SocialIcons';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#112240] text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <div className="flex justify-center md:justify-start mb-4">
              <img src="https://storage.googleapis.com/aistudio-hosting/a50b8a36-5415-4c57-8275-c51a7e2b7405.png" alt="Bindu Sky Tours & Travels Logo" className="h-12" />
            </div>
            <p className="text-gray-400">Connecting families, creating memories. Your trusted partner in bespoke travel planning.</p>
            <p className="mt-4 text-gray-400 text-sm">Yeshfi Tread Center, Dhaka-Narayanganj Link Road (Singboard Chattar).</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="mailto:bindusky192@gmail.com" className="hover:text-amber-400">bindusky192@gmail.com</a></li>
              <li><a href="mailto:kmsalahin591@gmail.com" className="hover:text-amber-400">kmsalahin591@gmail.com</a></li>
              <li><a href="tel:+971553432582" className="hover:text-amber-400">+971 55 343 2582 (UAE)</a></li>
              <li><a href="tel:+8801730201438" className="hover:text-amber-400">+880 1730 20 1438 (BD)</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors"><FacebookIcon /></a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors"><TwitterIcon /></a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors"><InstagramIcon /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Bindu Sky Tours & Travel Agency. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;