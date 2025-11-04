import React, { useState, useEffect } from 'react';

const API_URL = 'https://e-commerce-api-nine-navy.vercel.app/api/reviews';

const StarRating = ({ rating = 0 }) => {
    const safeRating = Math.max(0, Math.min(5, rating));
    const fullStars = Math.floor(safeRating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <span key={i} className={i < fullStars ? 'text-yellow-400' : 'text-gray-500'}>
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

            let reviewsArray = Array.isArray(data) ? data : data.reviews || [];

            const sortedReviews = reviewsArray.sort((a, b) => {
                const dateA = a.date ? new Date(a.date).getTime() : 0;
                const dateB = b.date ? new Date(b.date).getTime() : 0;
                return dateB - dateA;
            });

            setReviews(sortedReviews.filter(r => r && typeof r === 'object'));
        } catch (err) {
            console.error('Fetch Error:', err);
            setError(`Failed to load reviews. Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <section className="py-16 bg-gray-100 font-sans min-h-screen">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-900 border-b-4 border-indigo-500 pb-2 w-fit mx-auto">
                    Customer Reviews
                </h2>

                {isLoading && <p className="text-center text-indigo-500 py-10 text-lg">Loading reviews... ⏳</p>}
                {error && <p className="text-center text-red-600 py-10 text-lg font-semibold">❌ {error}</p>}

                {!isLoading && !error && (
                    <>
                        {reviews.length === 0 ? (
                            <p className="text-gray-500 py-10">No reviews yet.</p>
                        ) : (
                            <div className="flex overflow-x-scroll pb-6 space-x-6 hide-scrollbar" style={{ scrollSnapType: 'x mandatory' }}>
                                {reviews.map((review, index) => (
                                    <ReviewCard key={review.id || index} review={review} />
                                ))}
                            </div>
                        )}
                    </>
                )}
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
