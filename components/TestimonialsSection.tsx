import React, { useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import QuoteIcon from './icons/QuoteIcon';

const testimonials = [
  {
    name: 'The Alam Family',
    photoUrl: 'https://picsum.photos/100/100?random=6',
    quote: 'Bindu Sky planned our UK family reunion flawlessly. Every detail was taken care of, allowing us to just enjoy our time together. Truly a first-class experience!',
  },
  {
    name: 'Mr. Khan',
    photoUrl: 'https://picsum.photos/100/100?random=7',
    quote: 'The UAE trip was magnificent. The visa process was a breeze, and the itinerary was perfectly balanced between adventure and relaxation. Highly recommended.',
  },
  {
    name: 'The Chowdhury Family',
    photoUrl: 'https://picsum.photos/100/100?random=8',
    quote: 'Returning to Bangladesh was an emotional and beautiful journey, made completely stress-free by the Bindu Sky team. Their professionalism is unmatched.',
  },
];

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(sectionRef);

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-[#112240] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Voices of Our Valued Travelers</h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#0a192f] p-8 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300 animated-element">
              <div className="relative mb-4">
                <img
                  src={testimonial.photoUrl}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-amber-400"
                />
                <div className="absolute -top-3 -left-3 text-amber-400/50">
                    <QuoteIcon />
                </div>
              </div>
              <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
              <h3 className="text-xl font-bold text-white tracking-wide">{testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;