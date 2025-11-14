import React, { useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const OwnerSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(sectionRef);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-[#0a192f] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Meet Your Travel Architect</h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 animated-element">
            <img 
              src="https://storage.googleapis.com/aistudio-hosting/47416398-e71e-450f-90e6-a0e20e8b393b.jpg" 
              alt="K.M. Rofiques Salahin, Owner of Bindu Sky" 
              className="rounded-lg shadow-2xl w-full h-auto object-cover border-4 border-amber-400/50"
            />
          </div>
          <div className="md:w-2/3 text-lg text-gray-300 space-y-4 animated-element">
            <h3 className="text-3xl font-bold text-white">K.M. Rofiques Salahin</h3>
            <p className="text-amber-400 font-semibold">Owner, Bindu Sky Tours & Travel Agency</p>
            <p>
              "With a deep passion for connecting people and places, I founded Bindu Sky to turn your travel dreams into reality. We are dedicated to providing personalized and seamless travel experiences."
            </p>
            <p>
              "At Bindu Sky, we understand the importance of family and the precious moments you share. Our mission is to handle every detail of your journey with care and professionalism, allowing you to focus on creating lasting memories. Your trust is our foundation, and your satisfaction is our ultimate goal."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerSection;