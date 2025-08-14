import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    label: "Dresses",
    image: 'https://imgs.search.brave.com/KBjmPrXihOdUgq64IClLgYQSpOoMmFNM9RMpRi1PNg0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzA2LzE2LzE0/LzM2MF9GXzIwNjE2/MTQxN183cGt0NzBB/dzh2WDlXaEhaZzVI/Z3RkMEkyOWFXWVBs/Vy5qcGc',
  },
  {
    label: "Shoes",
    image: 'https://imgs.search.brave.com/oERAxZ90czpM9qv0vrhUKN-NY5xoFjeERtbyFH2gR44/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zaG9l/emVyby5jb20vY2Ru/L3Nob3AvZmlsZXMv/Q3VzdG9tLUJ1c2lu/ZXNzLUJyYW5kZWQt/U2hvZXMtMzI0NTku/d2VicD92PTE2ODgx/Mzg5Nzkmd2lkdGg9/MTkyMA',
  },
  {
    label: 'Jeans',
    image: 'https://imgs.search.brave.com/0_biM9Edb5wt9lZTTAK8B_7RTmuaX20BON_yNCJ5gZ8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/NzQxNTg2OS9mci9w/aG90by9waWxlLWRl/LWplYW5zLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1pVkMz/VGFnTDBQZHNGT2gz/VWRlWUtzalNsYXdD/d0NpTXA4NmZ2SGNS/ejZRPQ',
  },
  {
    label: 'TOP dressers',
    image: 'https://imgs.search.brave.com/ZWYYp5vUeyvGx2y707CbKaToNIEiEG4RRP_DbT1vE0A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi90LXNo/aXJ0cy1zd2VhdGVy/cy1zdG9yZS1qZWFu/cy1jbG90aGluZy0z/NTM4Nzk1NzkuanBn',
  },
];

const CategoryCards = () => {
  const navigate = useNavigate();

  const handleExplore = (categoryLabel) => {
    // Navigate to products page with category as query param
    // For showing all products regardless, just navigate('/products')
    navigate(`/products?category=${encodeURIComponent(categoryLabel)}`);
  };

  return (
    <div className="my-10 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer bg-white"
          >
            <img src={cat.image} alt={cat.label} className="h-40 w-full object-cover" />
            <div className="p-3 text-center">
              <h3 className="font-semibold text-lg">{cat.label}</h3>
              <button
                onClick={() => handleExplore(cat.label)}
                className="mt-2 text-green-600 text-sm hover:underline"
                type="button"
                aria-label={`Explore ${cat.label} category`}
              >
                Explore Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
