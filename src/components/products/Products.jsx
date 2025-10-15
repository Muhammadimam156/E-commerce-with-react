import React from 'react';
import { useNavigate } from 'react-router-dom';
import airpads from '../../assets/productsImages/earpads.jpg'
import keyboard from '../../assets/productsImages/keyboard.jpg'
import moniter from '../../assets/productsImages/moniter.jpg'
import speakers from '../../assets/productsImages/speakers.jpg'

// === HELPER COMPONENT: Star Rating (Yahi Rakhte Hain) ===
const StarRating = ({ rating }) => { 
    // ... (unchanged star rating logic) ...
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(<span key={i} className={i < fullStars ? 'text-yellow-500' : 'text-gray-600'}>★</span>);
    }
    return <div className="flex text-sm mb-2">{stars}</div>;
};

// === Product Card (Yahi Rakhte Hain) ===
const ProductCard = ({ product }) => (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl transition duration-300 hover:shadow-orange-500/30">
      {/* ... Card Content ... */}
        <div className="h-48 bg-gray-700 flex items-center justify-center p-4">
            <p className="text-gray-400 "><img src={product.imageUrl} alt={product.name} className='h-48 w-dvh object-cover rounded-2xl py-2'  /></p>
        </div>
        <div className="p-4">
            <StarRating rating={product.rating} />
            <h3 className="text-lg font-semibold text-white mb-2 truncate">{product.name}</h3>
            <div className="flex items-baseline mb-3">
                <span className="text-2xl font-bold text-orange-400 mr-2">
                    ${product.price.toFixed(2)}
                </span>
            </div>
            <button className="w-full py-2 bg-orange-500 text-gray-900 font-bold rounded-md hover:bg-orange-600 transition duration-300 text-sm">
                Add to Cart
            </button>
        </div>
    </div>
);


// === Main Products Component (Jismein Featured Products Section hai) ===
const Products = () => {
    // 1. useNavigate Hook istemaal karein
    const navigate = useNavigate(); 
    
    // Example data (Sirf 4 products dikhane ke liye)
    const featuredProducts = [
        { id: 1, name: 'Pro Wireless Headphones', price: 149.99, oldPrice: 199.99, rating: 4, imageUrl: airpads },
        { id: 2, name: 'Ultra HD 4K Monitor', price: 399.00, oldPrice: null, rating: 5, imageUrl: moniter },
        { id: 3, name: 'Compact Bluetooth Speaker', price: 45.00, oldPrice: 60.00, rating: 4, imageUrl: speakers },
        { id: 4, name: 'Gaming Mechanical Keyboard', price: 89.99, oldPrice: null, rating: 5, imageUrl: keyboard },
    ];
    
    // 2. Click Handler function
    const handleViewAllClick = () => {
        // 'Shop' page ke route par bhej dega
        navigate('/Shop'); 
    };

    return (
        <section className="py-16 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                
                {/* Yahan Categories Section ka code aayega */}

                <h2 className="text-3xl font-bold mb-8 border-b border-yellow-500 pb-2 w-fit text-white">
                    Our Top Picks
                </h2>
                
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                
                {/* 3. Button ko onClick ke saath update karein */}
                <div className="text-center mt-12">
                    <button 
                        onClick={handleViewAllClick} // <-- Yahan function call hoga
                        className="py-3 px-8 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition duration-300"
                    >
                        View All Products
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Products;
