
import React, { useRef } from 'react';
import AnimatedButton from './AnimatedButton';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface PackageCardProps {
  title: string;
  description: string;
  imageUrl: string;
  features: string[];
}

const PackageCard: React.FC<PackageCardProps> = ({ title, description, imageUrl, features }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(cardRef);

  return (
    <div ref={cardRef} className="bg-[#112240] rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 animated-element flex flex-col">
      <img src={imageUrl} alt={title} className="w-full h-56 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4 flex-grow">{description}</p>
        <ul className="space-y-2 text-gray-300 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg className="w-5 h-5 text-amber-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {feature}
            </li>
          ))}
        </ul>
        <AnimatedButton>Explore Package</AnimatedButton>
      </div>
    </div>
  );
};

const PackagesSection: React.FC = () => {
  const packages = [
    {
      title: "The Royal UK Experience",
      description: "Discover the historic charm and modern vibrancy of the United Kingdom.",
      imageUrl: "https://picsum.photos/600/400?random=3",
      features: ["7 Days / 6 Nights", "Full Visa Assistance", "London & Edinburgh Tours", "Luxury Accommodations"],
    },
    {
      title: "The Dazzling UAE Discovery",
      description: "Experience the futuristic marvels and desert beauty of the Emirates.",
      imageUrl: "https://picsum.photos/600/400?random=4",
      features: ["5 Days / 4 Nights", "Instant Visa Support", "Dubai & Abu Dhabi Excursions", "5-Star Hotel Stays"],
    },
    {
      title: "The Serene Bangladesh Reunion",
      description: "Reconnect with your roots amidst the lush landscapes of Bangladesh.",
      imageUrl: "https://picsum.photos/600/400?random=5",
      features: ["10 Days / 9 Nights", "Hassle-Free Processing", "Dhaka & Sylhet Heritage", "Private Transport Included"],
    },
    {
      title: "Sacred Hajj Pilgrimage",
      description: "Embark on a spiritual journey of a lifetime with our comprehensive Hajj package.",
      imageUrl: "https://picsum.photos/600/400?random=9",
      features: ["Complete Visa Processing", "Guided Rituals & Ziyarah", "Premium Accommodations", "Direct Flights Included"],
    },
    {
      title: "Global Ticket Reservations",
      description: "Your gateway to the world. Fast, reliable, and competitive flight bookings anywhere.",
      imageUrl: "https://picsum.photos/600/400?random=10",
      features: ["Worldwide Destinations", "Best Price Guarantee", "24/7 Customer Support", "Easy Booking Process"],
    },
  ];

  return (
    <section id="packages" className="py-20 bg-[#0a192f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Our Bespoke Travel Packages</h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <PackageCard key={index} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
