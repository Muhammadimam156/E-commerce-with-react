import React, { useState, useEffect } from 'react';

// --- HELPER COMPONENT: Star Rating ---
const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    return (
        <div className="flex text-sm mb-2">
            {[...Array(5)].map((_, i) => (
                <span
                    key={i}
                    className={i < fullStars ? 'text-yellow-500' : 'text-gray-600'}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

// --- HELPER COMPONENT: Product Card ---
const ProductCard = ({ product }) => (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl transition duration-300 hover:shadow-orange-500/30 cursor-pointer">
        <div className="h-48 bg-gray-700 flex items-center justify-center p-4">
            {product.imageUrl ? (
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-48 w-[900px] object-cover rounded-lg"
                />
            ) : (
                <p className="text-gray-400">{product.name}</p>
            )}
        </div>
        <div className="p-4">
            <StarRating rating={product.rating || 0} />
            <h3 className="text-lg font-semibold text-white mb-2 truncate">{product.name}</h3>
            <div className="flex items-baseline mb-3">
                <span className="text-2xl font-bold text-orange-400 mr-2">
                    ${product.price?.toFixed(2) || 'N/A'}
                </span>
            </div>
            <button className="w-full py-2 bg-orange-500 text-gray-900 font-bold rounded-md hover:bg-orange-600 transition duration-300 text-sm">
                Add to Cart
            </button>
        </div>
    </div>
);

// === MAIN SHOP PAGE COMPONENT ===
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(10);
    const [showLoadMore, setShowLoadMore] = useState(true);
    const [priceRange, setPriceRange] = useState([0, 500]);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch('https://e-commerce-api-nine-navy.vercel.app/api/products');
                if (!res.ok) throw new Error('Failed to fetch products');
                const data = await res.json();
                setProducts(data);
                setFilteredProducts(data);
                setShowLoadMore(data.length > 10);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Available categories (dynamic based on API data)
    const categories = ['All', ...new Set(products.map(p => p.category || 'Uncategorized'))];

    // Filter logic
    const filterProducts = (cat, range) => {
        let filtered = products;
        if (cat !== 'All') {
            filtered = filtered.filter(p => p.category === cat);
        }
        filtered = filtered.filter(
            p => typeof p.price === 'number' && p.price >= range[0] && p.price <= range[1]
        );
        setFilteredProducts(filtered);
        setVisibleCount(10);
        setShowLoadMore(filtered.length > 10);
    };

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        filterProducts(cat, priceRange);
    };

    const handlePriceChange = (e) => {
        const value = Number(e.target.value);
        const newRange = [0, value];
        setPriceRange(newRange);
        filterProducts(selectedCategory, newRange);
    };

    // Load more handler
    const handleLoadMore = () => {
        setVisibleCount(filteredProducts.length);
        setShowLoadMore(false);
    };

    // Loading or error states
    if (loading) {
        return (
            <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
                <p className="text-xl text-gray-400 animate-pulse">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
                <p className="text-red-400 text-lg">Error: {error}</p>
            </div>
        );
    }

    // Products to show
    const productsToShow = filteredProducts.slice(0, visibleCount);

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-4xl font-bold mb-8 text-white border-b border-yellow-500 pb-2 w-fit">
                    Shop Our Collection
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* --- FILTERS SIDEBAR --- */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 p-6 rounded-xl shadow-lg sticky top-5">
                            <h3 className="text-2xl font-bold mb-5 text-white">Filter Products</h3>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <p className="font-semibold text-gray-300 mb-2">Category</p>
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => handleCategoryChange(cat)}
                                        className={`block w-full text-left py-1 px-3 rounded transition duration-200 
                                            ${selectedCategory === cat
                                                ? 'bg-orange-500 text-gray-900 font-bold'
                                                : 'text-gray-300 hover:bg-gray-700'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Price Filter */}
                            <div className="mb-6">
                                <p className="font-semibold text-gray-300 mb-2">Price Range</p>
                                <input
                                    type="range"
                                    min={0}
                                    max={500}
                                    step={10}
                                    value={priceRange[1]}
                                    onChange={handlePriceChange}
                                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-lg"
                                />
                                <p className="text-sm text-gray-400 mt-1">
                                    ${priceRange[0]} - ${priceRange[1]}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- PRODUCT GRID --- */}
                    <div className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-400">Showing {productsToShow.length} results</p>
                        </div>

                        {/* Products */}
                        {productsToShow.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {productsToShow.map((product) => (
                                    <ProductCard key={product._id || product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center mt-10">No products found in this category.</p>
                        )}

                        {/* Pagination (Load More) */}
                        {showLoadMore && (
                            <div className="text-center mt-10">
                                <button
                                    className="py-2 px-4 border border-gray-600 text-gray-400 rounded-full hover:bg-gray-700 transition duration-300"
                                    onClick={handleLoadMore}
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
