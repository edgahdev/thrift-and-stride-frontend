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
    name: 'Mercy  K.',
    image: 'https://imgs.search.brave.com/Yu9ivDWMxUbo-_GJ6xjfKBYv8kY2uFQ1Jjmc-loUizY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM4/ODExNzc2OC9waG90/by9mYWNlLXByb2Zp/bGUtb2YtYWZyaWNh/bi1iZWF1dHktd29t/YW4tbWFzc2FnaW5n/LWZhY2UtYW5kLW5l/Y2stZGFyay1za2lu/LW1vZGVsLXdpdGgt/YWZyby5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9U1BqYTF4/RXQwY2I1N1dVb1ZQ/a0pxNm16M1hURG9R/NzJzYlloYnRSQ3h0/VT0',
    review: 'I wore a Thrift & Stride outfit to an event and got so many compliments!',
    benefit: 'The outfits make me stand out, and the quality is so reliable.',
  },
];

const Testimonials = () => {
  return (
    <div className="my-12 px-4">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-10 animate-fadeIn">What Our Customers Say</h2>
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
