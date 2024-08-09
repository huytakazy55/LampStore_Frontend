import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BannerProductCarousel from './components/BannerProductCarousel/BannerProductCarousel';
import CategorySale from './components/CategorySale/CategorySale';
import FeatureList from './components/FeatureList/FeatureList';
import Header from './components/Header/Header';
import NavbarPrimary from './components/NavbarPrimary/NavbarPrimary';
import ProductCarousel from './components/ProductCarousel/ProductCarousel';
import SectionProductCardCarousel from './components/SectionProductCardCarousel/SectionProductCardCarousel';
import { SiteContent } from './components/SiteContent/SiteContent';
import TopBar from './components/TopBar/TopBar';
import TrendingProduct from './components/TrendingProduct/TrendingProduct';

function App() {
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
      <ToastContainer />
    </>
  );
}

export default App;
