import React from 'react';
import Slider from '../components/slider/Slider';
import SpecialOffer from '../components/specialOffer/SpecialOffer';
import Products from '../components/products/Products';
// Assume aapke components yahan import honge


const Home = () => {
  return (
    <div>
    <Slider />
     <SpecialOffer />
     <Products />

      
   
    </div>
  );
};

export default Home;