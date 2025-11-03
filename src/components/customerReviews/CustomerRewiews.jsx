import React, { useState, useEffect } from 'react';

const API_URL = 'https://e-commerce-api-nine-navy.vercel.app/api/reviews';

const StarRating = ({ rating = 0 }) => {
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

const ReviewCard = ({ review }) => {
    const reviewerName = review.author || `User-${review.id ? String(review.id).slice(-4) : 'Unknown'}`;
    const initial = reviewerName.charAt(0).toUpperCase();
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
                    <p className="text-[10px] text-gray-400">Review ID: {review.id || 'N/A'}</p> 
                </div>
            </div>
        </div>
    );
};

const AddReviewForm = ({ onReviewAdded }) => {
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
            setMessage('Please make sure to include your Name and Review comment.');
            setIsSubmitting(false);
            return;
        }

        const reviewData = { 
            ...formData, 
            date: new Date().toISOString(),
            productId: formData.productId || null,
        };
        
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewData)
            });

            if (res.ok) {
                const submittedReview = await res.json();
                setMessage('Thanks! Your review has been submitted successfully.');
                onReviewAdded(submittedReview); 
                setFormData({ author: '', productId: '', rating: 5, comment: '' }); 
            } else {
                setMessage(`Failed to submit review. Server error: ${res.status}`);
            }
        } catch (error) {
            console.error('Submission Error:', error);
            setMessage(`Network error. Please check your connection. Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-indigo-700">plz write your review</h3>
            <p className="text-sm text-gray-500 mb-4">
                *write your Name.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="author"
                    placeholder="Your Name *"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

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
                
                <textarea
                    name="comment"
                    placeholder="write your review here *"
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
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>

                {message && (
                    <p className={`mt-3 text-center font-medium ${message.includes('Thanks') ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

const CustomerReviewApp = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReviews = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) {
                throw new Error(`Failed to fetch data. Status: ${res.status}`);
            }
            const data = await res.json();
            
            console.log("API Data Received:", data); 

            let reviewsArray = Array.isArray(data) ? data : data.reviews || [];
            
            const sortedReviews = reviewsArray.sort((a, b) => {
                const dateA = a.date ? new Date(a.date).getTime() : 0;
                const dateB = b.date ? new Date(b.date).getTime() : 0;
                return dateB - dateA;
            });

            setReviews(sortedReviews.filter(r => r && typeof r === 'object'));

        } catch (err) {
            console.error("Fetch Error:", err);
            setError(`Failed to load reviews. Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleNewReview = (newReview) => {
        setReviews(prev => [newReview, ...prev]);
    };

    return (
        <section className="py-16 bg-gray-100 font-sans min-h-screen">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-900 border-b-4 border-indigo-500 pb-2 w-fit mx-auto">
                    Customer Reviews
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1 order-2 lg:order-1">
                        <AddReviewForm onReviewAdded={handleNewReview} />
                    </div>

                    <div className="lg:col-span-2 order-1 lg:order-2">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Latest Customer Feedback (API Fetched)</h3>
                        
                        {isLoading && <p className="text-center text-indigo-500 py-10 text-lg">Reviews Load Ho Rahe Hain... ⏳</p>}
                        {error && <p className="text-center text-red-600 py-10 text-lg font-semibold">❌ Load Error: {error}</p>}
                        
                        {!isLoading && !error && (
                            <>
                                {reviews.length === 0 ? (
                                    <p className="text-gray-500 py-10">Abhi tak koi review nahi hai. Aap pehla review likhein!</p>
                                ) : (
                                    <div 
                                        className="flex overflow-x-scroll pb-6 space-x-6 hide-scrollbar"
                                        style={{ scrollSnapType: 'x mandatory' }}
                                    >
                                        {reviews.map((review, index) => (
                                            <ReviewCard key={review.id || index} review={review} />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            
            <style jsx="true">{`
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default CustomerReviewApp;
