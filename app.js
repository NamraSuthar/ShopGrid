const productGrid = document.getElementById('product-grid');
const loader = document.getElementById('loader');
const error = document.getElementById('error');

function renderStars(rating) {
  const full = Math.round(rating);
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += `<span style="color: ${i <= full ? '#2d6a4f' : '#ccc'};">&#9733;</span>`;
  }
  return stars;
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'rounded-2xl overflow-hidden shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer flex flex-col';
  card.style.backgroundColor = '#ffffff';

  card.innerHTML = `
    <div style="background-color: #f5f5f0;" class="flex items-center justify-center p-6" style="height: 200px;">
      <img src="${product.thumbnail}" alt="${product.title}" class="object-contain" style="max-height: 160px;"/>
    </div>
    <div class="p-4 flex flex-col gap-2 flex-1">
      <span class="text-xs font-medium uppercase tracking-widest" style="color: #2d6a4f;">${product.category}</span>
      <h3 class="font-semibold text-sm leading-snug line-clamp-2 text-gray-800">${product.title}</h3>
      <p class="text-xs font-light text-gray-400 line-clamp-2">${product.description}</p>
      <div class="flex items-center gap-1 text-sm mt-1">
        ${renderStars(product.rating)}
        <span class="text-xs text-gray-400 ml-1">(${product.rating})</span>
      </div>
      <div class="flex items-center justify-between mt-auto pt-3 border-t" style="border-color: #e0e0e0;">
        <span class="font-bold text-lg" style="color: #2d6a4f;">$${product.price}</span>
        <span class="text-xs font-medium px-2 py-1 rounded-full" style="background-color: #d8f3dc; color: #2d6a4f;">
          ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
    </div>
  `;

  return card;
}

async function fetchProducts() {
  try {
    const res = await fetch('https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=20');
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Failed to fetch products');

    const products = data.data.data;

    loader.classList.add('hidden');
    productGrid.classList.remove('hidden');
    productGrid.classList.add('grid');

    products.forEach(product => {
      productGrid.appendChild(createProductCard(product));
    });

  } catch (err) {
    loader.classList.add('hidden');
    error.classList.remove('hidden');
    error.textContent = err.message || 'Something went wrong.';
  }
}

fetchProducts();