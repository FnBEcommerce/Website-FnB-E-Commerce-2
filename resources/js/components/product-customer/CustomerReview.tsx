import { Button } from '@/components/ui/button';
import type { ReviewProps } from '@/types/index';
import { ChevronLeft, ChevronRight, MessageSquare, Star } from 'lucide-react';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick-theme.css';
// import 'slick-carousel/slick/slick.css';

type CustomerReviewsProps = {
    reviews: ReviewProps;
};

export function CustomerReviews({ reviews }: CustomerReviewsProps) {
    const reviewHighlights = [
        { text: 'Quick & easy', count: 45 },
        { text: 'Tastes incredible!', count: 38 },
        { text: 'Healthy option', count: 32 },
        { text: 'Perfect for lunch', count: 28 },
    ];

    const customerReviews = reviews ?? [
        {
            id: 1,
            name: 'Priya Sharma',
            rating: 5,
            date: 'December 10, 2024',
            comment:
                "Absolutely love this khichdi! The vegetables are fresh and flavorful. Perfect for busy weekdays when I don't have time to cook. The 7-minute preparation is a game-changer!",
            helpful: 24,
        },
        {
            id: 2,
            name: 'Rajesh Kumar',
            rating: 4,
            date: 'December 8, 2024',
            comment:
                "Great taste and very convenient. My only suggestion would be to make it slightly less salty. Otherwise, it's perfect for a quick lunch.",
            helpful: 18,
        },
        {
            id: 3,
            name: 'Anjali Patel',
            rating: 5,
            date: 'December 5, 2024',
            comment:
                'This has become a staple in my kitchen! Healthy, tasty, and super easy to make. My kids love it too. Highly recommended!',
            helpful: 31,
        },
        {
            id: 4,
            name: 'Vikram Singh',
            rating: 5,
            date: 'December 3, 2024',
            comment:
                "Excellent product! The quality of ingredients is top-notch. I appreciate that it's healthy and doesn't compromise on taste.",
            helpful: 15,
        },
        {
            id: 5,
            name: 'Meera Reddy',
            rating: 4,
            date: 'November 30, 2024',
            comment:
                'Very good khichdi. The portion size is perfect for one person. Would love to see more variety in the vegetable mix.',
            helpful: 12,
        },
    ];

    const [userRating, setUserRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const sliderRef = useRef<Slider>(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const handleSubmitReview = () => {
        if (userRating > 0 && reviewText.trim()) {
            // In a real app, this would send the review to the backend
            alert(
                'Thank you for your review! It has been submitted successfully.',
            );
            setUserRating(0);
            setReviewText('');
        } else {
            alert('Please provide a rating and write your review.');
        }
    };

    return (
        <div className="mt-12">
            {/* Summary Section */}
            <div className="rounded-lg border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                    {/* Left Section - Rating Summary */}
                    <div className="flex-1">
                        <div className="mb-4 flex items-center gap-4">
                            <div
                                className="text-[48px] text-green-700"
                                style={{ fontWeight: 700 }}
                            >
                                4.5
                            </div>
                            <div>
                                <div className="mb-1 flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`h-6 w-6 ${
                                                star <= 4
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700">
                                    Based on 100+ reviews
                                </p>
                            </div>
                        </div>

                        {/* Review Highlights */}
                        {/* <div className="mb-4 flex flex-wrap gap-2">
                            {reviewHighlights.map((highlight, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 rounded-full border border-amber-300 bg-white px-3 py-2"
                                >
                                    <ThumbsUp className="h-4 w-4 text-green-600" />
                                    <span className="text-[14px] text-gray-700">
                                        {highlight.text}
                                    </span>
                                    <span className="text-[12px] text-gray-500">
                                        ({highlight.count})
                                    </span>
                                </div>
                            ))}
                        </div> */}
                    </div>

                    {/* Right Section - CTA */}
                    <div className="flex flex-col items-start gap-3 md:items-end">
                        <div className="flex items-center gap-2 text-gray-700">
                            <MessageSquare className="h-5 w-5" />
                            <span>See what our customers are saying</span>
                        </div>
                    </div>
                </div>

                {/* Quick Review Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-amber-300 pt-6 md:grid-cols-4">
                    <div className="text-center">
                        <div
                            className="text-[24px] text-green-700"
                            style={{ fontWeight: 700 }}
                        >
                            92%
                        </div>
                        <div className="text-[14px] text-gray-600">
                            Would Recommend
                        </div>
                    </div>
                    <div className="text-center">
                        <div
                            className="text-[24px] text-green-700"
                            style={{ fontWeight: 700 }}
                        >
                            4.6
                        </div>
                        <div className="text-[14px] text-gray-600">
                            Taste Rating
                        </div>
                    </div>
                    <div className="text-center">
                        <div
                            className="text-[24px] text-green-700"
                            style={{ fontWeight: 700 }}
                        >
                            4.8
                        </div>
                        <div className="text-[14px] text-gray-600">
                            Convenience
                        </div>
                    </div>
                    <div className="text-center">
                        <div
                            className="text-[24px] text-green-700"
                            style={{ fontWeight: 700 }}
                        >
                            4.4
                        </div>
                        <div className="text-[14px] text-gray-600">
                            Value for Money
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Reviews Carousel */}
            <div className="mt-12">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-[24px]" style={{ fontWeight: 700 }}>
                        Customer Reviews
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => sliderRef.current?.slickPrev()}
                            className="rounded-full border border-gray-300 bg-white p-2 transition-colors hover:bg-gray-50"
                            aria-label="Previous reviews"
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-700" />
                        </button>
                        <button
                            onClick={() => sliderRef.current?.slickNext()}
                            className="rounded-full border border-gray-300 bg-white p-2 transition-colors hover:bg-gray-50"
                            aria-label="Next reviews"
                        >
                            <ChevronRight className="h-5 w-5 text-gray-700" />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <Slider ref={sliderRef} {...settings}>
                        {reviews.map((review) => (
                            <div key={review.user_id} className="px-2">
                                <div className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                                    <div className="mb-3 flex items-start justify-between">
                                        <div>
                                            <h4
                                                className="text-[16px]"
                                                style={{ fontWeight: 600 }}
                                            >
                                                {review.name}
                                            </h4>
                                            <p className="text-[14px] text-gray-500">
                                                {review.created_at}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-3 flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-4 w-4 ${
                                                    star <= review.rating
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    <p className="mb-4 line-clamp-4 text-[14px] text-gray-700">
                                        {review.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            {/* Write a Review Section */}
            <div className="mt-12 rounded-lg border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-8">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-8 text-center">
                        <h3
                            className="mb-2 text-[28px]"
                            style={{ fontWeight: 700 }}
                        >
                            Share Your Experience
                        </h3>
                        <p className="text-gray-600">
                            Help others make informed decisions by sharing your
                            honest review
                        </p>
                    </div>

                    <div className="rounded-xl border border-orange-100 bg-white p-8 shadow-sm">
                        {/* Rating Section */}
                        <div className="mb-6 border-b border-gray-200 pb-6">
                            <label
                                className="mb-3 block text-[16px] text-gray-800"
                                style={{ fontWeight: 600 }}
                            >
                                Rate this product
                            </label>
                            <div className="flex items-center gap-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setUserRating(star)}
                                        onMouseEnter={() =>
                                            setHoveredRating(star)
                                        }
                                        onMouseLeave={() => setHoveredRating(0)}
                                        className="transition-all hover:scale-110 focus:outline-none active:scale-95"
                                    >
                                        <Star
                                            className={`h-10 w-10 transition-colors ${
                                                star <=
                                                (hoveredRating || userRating)
                                                    ? 'fill-[#FF6900] text-[#FF6900]'
                                                    : 'text-gray-300 hover:text-gray-400'
                                            }`}
                                        />
                                    </button>
                                ))}
                                {userRating > 0 && (
                                    <div className="ml-3 flex items-center gap-2">
                                        <span
                                            className="text-[18px] text-[#FF6900]"
                                            style={{ fontWeight: 600 }}
                                        >
                                            {userRating === 5
                                                ? 'Excellent!'
                                                : userRating === 4
                                                  ? 'Great!'
                                                  : userRating === 3
                                                    ? 'Good'
                                                    : userRating === 2
                                                      ? 'Fair'
                                                      : 'Poor'}
                                        </span>
                                    </div>
                                )}
                            </div>
                            {userRating === 0 && (
                                <p className="mt-2 text-[13px] text-gray-500">
                                    Click on a star to rate
                                </p>
                            )}
                        </div>

                        {/* Review Text Section */}
                        <div className="mb-6">
                            <label
                                className="mb-3 block text-[16px] text-gray-800"
                                style={{ fontWeight: 600 }}
                            >
                                Write your review
                            </label>
                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                maxLength={500}
                                placeholder="Tell us what you think about the taste, quality, convenience, and overall experience with this product..."
                                rows={6}
                                className="w-full resize-none rounded-lg border-2 border-gray-200 px-4 py-3 transition-all focus:border-[#FF6900] focus:ring-2 focus:ring-[#FF6900] focus:outline-none"
                            />
                            <div className="mt-2 flex items-center justify-between">
                                <p className="text-[13px] text-gray-500">
                                    {reviewText.length > 0
                                        ? `${reviewText.length}/500 characters`
                                        : 'Minimum 10 characters recommended'}
                                </p>
                                {reviewText.length >= 10 && (
                                    <p className="text-[13px] text-green-600">
                                        ✓ Looking good!
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-3">
                            <Button
                                onClick={() => {
                                    setUserRating(0);
                                    setReviewText('');
                                }}
                                className="bg-gray-100 px-6 text-gray-700 hover:bg-gray-200"
                                style={{ fontWeight: 600 }}
                            >
                                Clear
                            </Button>
                            <Button
                                onClick={handleSubmitReview}
                                disabled={
                                    userRating === 0 ||
                                    reviewText.trim().length < 10
                                }
                                className="bg-[#FF6900] px-8 text-white hover:bg-[#E55F00] disabled:cursor-not-allowed disabled:bg-gray-300"
                                style={{ fontWeight: 600 }}
                            >
                                Submit Review
                            </Button>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 text-center">
                        <p className="text-[13px] text-gray-500">
                            Logged in as{' '}
                            <span style={{ fontWeight: 600 }}>User Name</span> •
                            Your review will be public
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
