import React from 'react'
import headphone from '../../assets/hero pic/headphone.png'
import headphone2 from '../../assets/hero pic/headphone2.png'
import headphone3 from '../../assets/hero pic/headphone3.png'
import headphone4 from '../../assets/hero pic/headphone4.png'

const Slider = () => {
    const slides = [
        {
            title: 'BF B012',
            subtitle: 'Borofone B012',
            price: '$35',
            description: 'Borofone B012 power wireless headphones, BT 5.0, 300mAh battery for 8 hours of calls and music, support BT and AUX playback modes.',
            imageUrl: headphone,
        },
        {
            title: 'New Model 2024',
            subtitle: 'Amazing Sound',
            price: '$45',
            description: 'Experience the next level of audio fidelity with our new headphones.',
            imageUrl: headphone2,
        },
        {
            title: 'Ultra Bass',
            subtitle: 'Feel the Music',
            price: '$55',
            description: 'Our ultra bass headphones deliver deep, rich sound that you can feel.',
            imageUrl: headphone3,
        },
        {
            title: 'Pro Series',
            subtitle: 'For the Professionals',
            price: '$75',
            description: 'Designed for audio professionals, these headphones offer unparalleled clarity and comfort.',
            imageUrl: headphone4,
        },
    ];

    const [currentSlide, setCurrentSlide] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="flex items-center justify-center min-h-screen w-full bg-gray-900 text-white px-4 sm:px-6 lg:px-8">
            <section className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-500 leading-tight mb-3 sm:mb-4">
                        {slides[currentSlide].title}
                    </h1>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-300 mb-2">
                        {slides[currentSlide].subtitle}
                    </h2>
                    <p className="text-lg sm:text-xl text-white mt-2">
                        {slides[currentSlide].price}
                    </p>
                    <p className="mt-2 text-sm sm:text-base text-gray-400">
                        {slides[currentSlide].description}
                    </p>
                    <button className="mt-6 py-2 px-6 sm:py-3 sm:px-8 bg-amber-500 text-black rounded-md hover:bg-amber-600 transition duration-200 font-semibold text-sm sm:text-base">
                        Add to Cart
                    </button>
                </div>

                {/* Image */}
                <div className="flex justify-center">
                    <img
                        src={slides[currentSlide].imageUrl}
                        alt="Headphones"
                        className="rounded-lg shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg object-contain transition duration-500 ease-in-out"
                        style={{ height: 'auto', maxHeight: '500px' }}
                    />
                </div>
            </section>
        </main>
    );
};

export default Slider;
