import React, { useState } from 'react';  
import './Home.css';
import Header from '../../../src/components/Navbar/Header/Header'
import ExploreMenu from '../../components/Navbar/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/Navbar/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';




const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <section id='seection1' className='scroll-section'>
        
      </section>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}/>
      <AppDownload/>
      
    </div>
  
  );
};

export default Home;
