import React from 'react';
import { ToastContainer } from 'react-toastify';
import BannerProductCarousel from '../components/user/MainPage/BannerProductCarousel/BannerProductCarousel';
import CategorySale from '../components/user/MainPage/CategorySale/CategorySale';
import FeatureList from '../components/user/MainPage/FeatureList/FeatureList';
import Header from '../components/user/MainPage/Header/Header';
import NavbarPrimary from '../components/user/MainPage/NavbarPrimary/NavbarPrimary';
import ProductCarousel from '../components/user/MainPage/ProductCarousel/ProductCarousel';
import SectionProductCardCarousel from '../components/user/MainPage/SectionProductCardCarousel/SectionProductCardCarousel';
import { SiteContent } from '../components/user/MainPage/SiteContent/SiteContent';
import TopBar from '../components/user/MainPage/TopBar/TopBar';
import TrendingProduct from '../components/user/MainPage/TrendingProduct/TrendingProduct';
import Footer from '../components/user/Footer/Footer';
import BestSeller from '../components/user/MainPage/BestSeller/BestSeller';
import BannerImage from '../components/user/MainPage/BannerImage/BannerImage';
import BrandCarousel from '../components/user/MainPage/BrandCarousel/BrandCarousel';
import Newsletter from '../components/user/MainPage/Newsletter/Newsletter';

const HomePage = () => {
  return (
    <>
        <TopBar />
        <Header />
        <NavbarPrimary />
        <SiteContent />
        <CategorySale />
        <FeatureList />
        <ProductCarousel />
        <BannerProductCarousel />
        <SectionProductCardCarousel />
        <TrendingProduct />
        <BestSeller />
        <BannerImage />
        <BrandCarousel />
        <Newsletter />
        <Footer />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    </>
  );
};

export default HomePage;