
import React from 'react';
import offer1 from '../../assets/offerImages/offer1.jpg';
import offer2 from '../../assets/offerImages/offer2.jpg';
// import offer1 from '../../assets/offerImages/offer1.jpg';


const SpecialOffer = () => {
  const offers = [
    {
      id: 1,
      img: offer1,
      title: 'LIMITED TIME DEAL!',
      subtitle: 'Flat 30% Off All Speakers',
      timeRemaining: '10h 30m 59s Remaining',
      buttonText: 'SHOP NOW',
      color: 'text-yellow-400',
    },
    {
      id: 2,
      img: offer2,
      title: 'FLASH SALE!',
      subtitle: '$20 Off Smartwatches',
      details: 'Starting from $49',
      buttonText: 'VIEW DEAL',
      color: 'text-yellow-400',
    },
    {
      id: 3,
      img:'https://plus.unsplash.com/premium_photo-1681487855134-d6c0434f91f8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGVsaXZlcnklMjB0cnVja3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
      title: 'FREE SHIPPING',
      subtitle: 'On All Orders Over $75',
      details: 'Plus Extra Discounts on Bundles',
      buttonText: 'EXPLORE OFFERS',
      color: 'text-yellow-400',
    },
  ];

  const OfferCard = ({ offer }) => (
    <div className="bg-gray-800 p-6 rounded-xl shadow-xl transition duration-300 hover:scale-[1.03] hover:shadow-yellow-500/30">
      <div className={`text-5xl mb-4 ${offer.color} mx-auto w-fit`}>
       <img src={offer.img} alt="" className='rounded-b-lg h-52 w-92' />
      </div>
      <h3 className={`text-xl font-semibold uppercase mb-2 ${offer.color}`}>
        {offer.title}
      </h3>
      <p className="text-gray-200 text-base mb-3 leading-relaxed">
        {offer.subtitle}
      </p>
      {offer.timeRemaining && (
        <p className="text-red-500 text-sm mb-3">
          {offer.timeRemaining}
        </p>
      )}
      {offer.details && (
        <p className="text-gray-400 text-sm mb-3">
          {offer.details}
        </p>
      )}
      <button className="w-full mt-3 py-3 px-4 bg-orange-500 text-gray-900 font-semibold rounded-full hover:bg-orange-600 transition duration-300">
        {offer.buttonText}
      </button>
    </div>
  );

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 border-b-2 border-yellow-500 pb-3 w-fit text-white text-center mx-auto">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
