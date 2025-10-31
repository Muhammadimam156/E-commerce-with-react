import React, { useState, useEffect } from 'react';
// Firebase imports hata diye gaye hain
// External API link
const API_URL = 'https://e-commerce-api-nine-navy.vercel.app/api/reviews';

// --- HELPER COMPONENT: Star Rating ---
const StarRating = ({ rating = 0 }) => {
    // Rating ko 0 aur 5 ke beech mein rakhein
    const safeRating = Math.max(0, Math.min(5, rating));
    const fullStars = Math.floor(safeRating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <span 
                key={i} 
                className={i < fullStars ? 'text-yellow-400' : 'text-gray-500'}
            >
                ★
            </span>
        );
    }
    return <div className="flex text-lg">{stars}</div>;
};


// --- HELPER COMPONENT: Review Card ---
const ReviewCard = ({ review }) => {
    // API response fields use kar rahe hain
    const reviewerName = review.author || `User-${review.id ? String(review.id).slice(-4) : 'Unknown'}`;
    const initial = reviewerName.charAt(0).toUpperCase();
    
    // Date: Agar date string format mein hai, to usse format karein
    const dateDisplay = review.date ? new Date(review.date).toLocaleDateString() : 'Unknown Date';
    const comment = review.comment || 'No comment provided.';

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 min-w-[300px] md:min-w-[350px] snap-center flex flex-col justify-between transition-shadow hover:shadow-xl">
            <div>
                <StarRating rating={review.rating} />
                <p className="text-gray-700 italic mt-3 mb-4 text-sm">{comment}</p>
            </div>
            
            <div className="flex items-center pt-3 border-t border-gray-100">
                <div className="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-bold text-white mr-3 shadow-md">
                    {initial}
                </div>
                <div>
                    <p className="font-bold text-indigo-700 leading-tight">{reviewerName}</p>
                    <p className="text-xs text-gray-500">
                        {review.productId ? `Product: ${review.productId} | ` : ''} 
                        {dateDisplay}
                    </p>
                    {/* Unique ID dikhane ke liye (Agar API ne ID di hai) */}
                    <p className="text-[10px] text-gray-400">Review ID: {review.id || 'N/A'}</p> 
                </div>
            </div>
        </div>
    );
};


// --- HELPER COMPONENT: Add Review Form ---
const AddReviewForm = ({ onReviewAdded }) => {
    
    // Ab 'author' field dobara shamil kiya gaya hai
    const [formData, setFormData] = useState({
        author: '', 
        productId: '',
        rating: 5,
        comment: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: name === 'rating' ? parseInt(value, 10) : value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        if (!formData.author || !formData.comment) {
            setMessage('Kripya apna Naam aur Review comment zaroor likhein.');
            setIsSubmitting(false);
            return;
        }

        // External API ke liye data
        const reviewData = { 
            ...formData, 
            date: new Date().toISOString(), // Current date string format mein
            productId: formData.productId || null,
        };
        
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewData)
            });

            if (res.ok) {
                // API se response milne par
                const submittedReview = await res.json();
                
                // Message set karein
                setMessage('Shukriya! Aapka review safaltapoorvak (successfully) submit ho gaya hai.');
                
                // Reviews list ko update karein (API ka response use karein)
                onReviewAdded(submittedReview); 
                
                // Form ko reset karein
                setFormData({ author: '', productId: '', rating: 5, comment: '' }); 
            } else {
                setMessage(`Review submit nahi ho paya. Server error: ${res.status}`);
            }
        } catch (error) {
            console.error('Submission Error:', error);
            setMessage(`Network error. Kripya apna connection check karein. Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-indigo-700">Apna Review Likhein</h3>
            <p className="text-sm text-gray-500 mb-4">
                *Chunki hum login istemaal nahi kar rahe hain, kripya apna naam daal dein.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Author Name field dobara shamil kiya gaya hai */}
                <input
                    name="author"
                    placeholder="Aapka Naam *"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Product ID and Rating */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        name="productId"
                        placeholder="Product ID (Optional)"
                        value={formData.productId}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <select
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value={5}>5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={2}>2 Stars</option>
                        <option value={1}>1 Star</option>
                    </select>
                </div>
                
                {/* Review Comment */}
                <textarea
                    name="comment"
                    placeholder="Apna Review Yahan Likhein *"
                    value={formData.comment}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 font-semibold rounded-lg transition duration-300 ${
                        isSubmitting ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                    }`}
                >
                    {isSubmitting ? 'Bhej Raha Hoon...' : 'Submit Review'}
                </button>

                {/* Submission Message */}
                {message && (
                    <p className={`mt-3 text-center font-medium ${message.includes('Shukriya') ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};


// --- MAIN COMPONENT ---
const CustomerReviewApp = () => {
    // Firebase related state aur hooks hata diye gaye hain
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initial fetch function
    const fetchReviews = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) {
                throw new Error(`Data fetch nahi ho paya. Status: ${res.status}`);
            }
            const data = await res.json();
            
            console.log("API Data Received:", data); 

            // API response ko array mein convert ya extract karein
            let reviewsArray = Array.isArray(data) ? data : data.reviews || [];
            
            // Date ke hisaab se client-side sorting (latest first)
            const sortedReviews = reviewsArray.sort((a, b) => {
                const dateA = a.date ? new Date(a.date).getTime() : 0;
                const dateB = b.date ? new Date(b.date).getTime() : 0;
                return dateB - dateA; // Descending order
            });

            setReviews(sortedReviews.filter(r => r && typeof r === 'object'));

        } catch (err) {
            console.error("Fetch Error:", err);
            setError(`Reviews load nahi ho paye. Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Component mount hone par data fetch karein
    useEffect(() => {
        fetchReviews();
    }, []);

    // Review submit hone par list ko update karne ka handler
    const handleNewReview = (newReview) => {
        // Naya review front-end mein sabse upar add karein
        setReviews(prev => [newReview, ...prev]);
    };

    return (
        <section className="py-16 bg-gray-100 font-sans min-h-screen">
            <div className="container mx-auto px-4">
                
                <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-900 border-b-4 border-indigo-500 pb-2 w-fit mx-auto">
                    Customer Reviews
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* COLUMN 1: REVIEW SUBMISSION FORM */}
                    <div className="lg:col-span-1 order-2 lg:order-1">
                        {/* Auth check ki zaroorat nahi ab */}
                        <AddReviewForm onReviewAdded={handleNewReview} />
                    </div>

                    {/* COLUMN 2 & 3: REVIEWS SLIDER */}
                    <div className="lg:col-span-2 order-1 lg:order-2">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Latest Customer Feedback (API Fetched)</h3>
                        
                        {isLoading && <p className="text-center text-indigo-500 py-10 text-lg">Reviews Load Ho Rahe Hain... ⏳</p>}
                        {error && <p className="text-center text-red-600 py-10 text-lg font-semibold">❌ Load Error: {error}</p>}
                        
                        {!isLoading && !error && (
                            <>
                                {reviews.length === 0 ? (
                                    <p className="text-gray-500 py-10">Abhi tak koi review nahi hai. Aap pehla review likhein!</p>
                                ) : (
                                    // Slider container
                                    <div 
                                        className="flex overflow-x-scroll pb-6 space-x-6 hide-scrollbar"
                                        style={{ scrollSnapType: 'x mandatory' }}
                                    >
                                        {reviews.map((review, index) => (
                                            // Review ID ya index ko key ke taur par istemaal karein
                                            <ReviewCard key={review.id || index} review={review} />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Custom CSS for hiding the scrollbar while keeping the scrollable functionality */}
            <style jsx="true">{`
                .hide-scrollbar {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none; /* Chrome, Safari and Opera */
                }
            `}</style>
        </section>
    );
};

export default CustomerReviewApp;
