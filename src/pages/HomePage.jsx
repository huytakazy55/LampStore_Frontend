import React from 'react';
import { ToastContainer } from 'react-toastify';
import BannerProductCarousel from '../components/user/BannerProductCarousel/BannerProductCarousel';
import CategorySale from '../components/user/CategorySale/CategorySale';
import FeatureList from '../components/user/FeatureList/FeatureList';
import Header from '../components/user/Header/Header';
import NavbarPrimary from '../components/user/NavbarPrimary/NavbarPrimary';
import ProductCarousel from '../components/user/ProductCarousel/ProductCarousel';
import SectionProductCardCarousel from '../components/user/SectionProductCardCarousel/SectionProductCardCarousel';
import { SiteContent } from '../components/user/SiteContent/SiteContent';
import TopBar from '../components/user/TopBar/TopBar';
import TrendingProduct from '../components/user/TrendingProduct/TrendingProduct';
import Footer from '../components/user/Footer/Footer';
import BestSeller from '../components/user/BestSeller/BestSeller';
import BannerImage from '../components/user/BannerImage/BannerImage';
import BrandCarousel from '../components/user/BrandCarousel/BrandCarousel';
import Newsletter from '../components/user/Newsletter/Newsletter';

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