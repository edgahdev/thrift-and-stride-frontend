import React from 'react';

const testimonials = [
  {
    name: 'Jane M.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    review: 'I love every piece I got! Quality and style are unmatched.',
    benefit: 'Thrift & Stride helped me revamp my wardrobe with trendy and comfy outfits.',
  },
  {
    name: 'Cynthia W.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    review: 'Fast delivery and great customer care. Highly recommended!',
    benefit: 'Their prompt service makes shopping stress-free, and I always feel confident.',
  },
  {
    name: 'Grace K.',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
    review: 'Beautiful dresses and shoes. I shop here monthly!',
    benefit: 'My go-to store for unique boutique finds that boost my style.',
  },
  {
    name: 'Faith A.',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    review: 'I’m always excited to see what’s new. The collection is fresh!',
    benefit: 'The seasonal drops are fire! I always feel updated and stylish.',
  },
  {
    name: 'Anne O.',
    image: 'https://randomuser.me/api/portraits/women/78.jpg',
    review: 'I wore a Thrift & Stride outfit to an event and got so many compliments!',
    benefit: 'The outfits make me stand out, and the quality is so reliable.',
  },
  {
    name: 'Mercy K.',
    image: 'data:image/jpeg;base64,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',
    review: 'I wore a Thrift & Stride outfit to an event and got so many compliments!',
    benefit: 'The outfits make me stand out, and the quality is so reliable.',
  },
];

const Testimonials = () => {
  return (
    <div className="my-12 px-4">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-10 animate-fadeIn">
        What Our Customers Say
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-green-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-slideUp"
          >
            <div className="flex items-center mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-green-600 mr-4"
              />
              <div>
                <p className="font-semibold text-green-800">{t.name}</p>
                <p className="text-sm text-gray-500 italic">Verified Buyer</p>
              </div>
            </div>
            <p className="text-gray-700 italic mb-2">“{t.review}”</p>
            <p className="text-sm text-gray-600">{t.benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
