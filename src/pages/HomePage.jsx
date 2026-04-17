import React, { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../components/user/MainPage/Header/Header';
import NavbarPrimary from '../components/user/MainPage/NavbarPrimary/NavbarPrimary';
import { SiteContent } from '../components/user/MainPage/SiteContent/SiteContent';
import TopBar from '../components/user/MainPage/TopBar/TopBar';
import Footer from '../components/user/MainPage/Footer/Footer';
import CustomScrollbar from '../utils/CustomScrollbar';
import NotificationService from '../Services/NotificationService';
import LazySection from '../components/common/LazySection';
import ScrollTimeline from '../components/common/ScrollTimeline';

// === Code Splitting: Lazy load các component nặng ===
// Chỉ load JS bundle khi component thực sự cần render
const CategorySale = lazy(() => import('../components/user/MainPage/CategorySale/CategorySale'));
const FeatureList = lazy(() => import('../components/user/MainPage/FeatureList/FeatureList'));
const ProductCarousel = lazy(() => import('../components/user/MainPage/ProductCarousel/ProductCarousel'));
const SectionProductCardCarousel = lazy(() => import('../components/user/MainPage/SectionProductCardCarousel/SectionProductCardCarousel'));
const NewsSection = lazy(() => import('../components/user/MainPage/NewsSection/NewsSection'));
const BestSeller = lazy(() => import('../components/user/MainPage/BestSeller/BestSeller'));
const BannerImage = lazy(() => import('../components/user/MainPage/BannerImage/BannerImage'));
const BrandCarousel = lazy(() => import('../components/user/MainPage/BrandCarousel/BrandCarousel'));
const Newsletter = lazy(() => import('../components/user/MainPage/Newsletter/Newsletter'));

// Fallback spinner cho Suspense
const SectionSpinner = ({ height = '200px' }) => (
  <div className="w-full flex justify-center items-center" style={{ height }}>
    <div className="w-8 h-8 border-2 border-gray-200 border-t-yellow-400 rounded-full animate-spin"></div>
  </div>
);

const HomePage = () => {
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        await NotificationService.setupSignalRNotifications();
        NotificationService.requestNotificationPermission();
        NotificationService.cleanOldNotifications();

        console.log('📢 HomePage: Notification system initialized for user');
      } catch (error) {
        console.error('❌ HomePage: Failed to initialize notifications:', error);
      }
    };

    initializeNotifications();
  }, []);

  return (
    <>
      <CustomScrollbar>
        {/* === ABOVE THE FOLD: Load ngay lập tức === */}
        <TopBar />
        <Header />
        <NavbarPrimary />

        <div data-section="hero" data-label="Trang chủ">
          <SiteContent />
        </div>


        <ScrollTimeline />

        {/* === BELOW THE FOLD: Lazy load khi scroll đến === */}

        {/* CategorySale - grid danh mục */}
        <div data-section="categories" data-label="Danh mục">
          <LazySection height="280px">
            <Suspense fallback={<SectionSpinner height="280px" />}>
              <CategorySale />
            </Suspense>
          </LazySection>
        </div>

        {/* FeatureList - nhẹ, load sớm */}
        <LazySection height="80px">
          <Suspense fallback={<SectionSpinner height="80px" />}>
            <FeatureList />
          </Suspense>
        </LazySection>

        {/* ProductCarousel - nặng, fetch products */}
        <div data-section="products" data-label="Sản phẩm">
          <LazySection height="500px">
            <Suspense fallback={<SectionSpinner height="500px" />}>
              <ProductCarousel />
            </Suspense>
          </LazySection>
        </div>

        {/* SectionProductCardCarousel */}
        <div data-section="trending" data-label="Xu hướng">
          <LazySection height="400px">
            <Suspense fallback={<SectionSpinner height="400px" />}>
              <SectionProductCardCarousel />
            </Suspense>
          </LazySection>
        </div>

        {/* BestSeller - nặng nhất, fetch nhiều data */}
        <div data-section="bestseller" data-label="Bán chạy">
          <LazySection height="600px">
            <Suspense fallback={<SectionSpinner height="600px" />}>
              <BestSeller />
            </Suspense>
          </LazySection>
        </div>

        {/* BannerImage - fetch banners */}
        <LazySection height="160px">
          <Suspense fallback={<SectionSpinner height="160px" />}>
            <BannerImage />
          </Suspense>
        </LazySection>

        {/* NewsSection - Blog & Tips */}
        <div data-section="news" data-label="Tin tức">
          <LazySection height="450px">
            <Suspense fallback={<SectionSpinner height="450px" />}>
              <NewsSection />
            </Suspense>
          </LazySection>
        </div>

        {/* BrandCarousel - nhẹ */}
        <LazySection height="112px">
          <Suspense fallback={<SectionSpinner height="112px" />}>
            <BrandCarousel />
          </Suspense>
        </LazySection>

        {/* Newsletter - nhẹ */}
        <LazySection height="80px">
          <Suspense fallback={<SectionSpinner height="80px" />}>
            <Newsletter />
          </Suspense>
        </LazySection>

        <div data-section="footer" data-label="Cuối trang">
          <Footer />
        </div>
      </CustomScrollbar>
    </>
  );
};

export default HomePage;