import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/user/MainPage/Header/Header';
import NavbarPrimary from '../components/user/MainPage/NavbarPrimary/NavbarPrimary';
import TopBar from '../components/user/MainPage/TopBar/TopBar';
import Footer from '../components/user/MainPage/Footer/Footer';
import NewsService from '../Services/NewsService';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const NewsListPage = () =>
{
    const navigate = useNavigate();
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() =>
    {
        const fetchNews = async () =>
        {
            try
            {
                setLoading(true);
                const response = await NewsService.getAllNews(true);
                const data = response.data?.$values || response.data || [];
                setNewsList(data);
            } catch (error)
            {
                console.error('Error fetching news:', error);
            } finally
            {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const categories = ['all', ...new Set(newsList.map(n => n.category).filter(Boolean))];
    const filteredNews = selectedCategory === 'all' ? newsList : newsList.filter(n => n.category === selectedCategory);

    const getImageSrc = (imageUrl) =>
    {
        if (!imageUrl) return 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80';
        return imageUrl.startsWith('http') ? imageUrl : `${API_ENDPOINT}${imageUrl}`;
    };

    const featured = filteredNews[0];
    const rest = filteredNews.slice(1);

    return (
        <>
            <Helmet>
                <title>Tin tức & Góc nội thất | LampStore</title>
                <meta name="description" content="Cập nhật tin tức mới nhất về đèn trang trí, xu hướng nội thất và mẹo bố trí ánh sáng cho ngôi nhà của bạn." />
            </Helmet>

            <TopBar />
            <Header />
            <NavbarPrimary />

            {/* Hero Banner */}
            <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
                <div className="w-full xl:mx-auto xl:max-w-[1440px] px-4 xl:px-0 py-12 md:py-16 relative z-10">
                    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                        <a href="/" className="hover:text-yellow-400 transition-colors">Trang chủ</a>
                        <i className='bx bx-chevron-right text-xs'></i>
                        <span className="text-yellow-400 font-medium">Tin tức</span>
                    </nav>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        Tin tức & <span className="text-yellow-400">Góc nội thất</span>
                    </h1>
                    <p className="text-gray-300 max-w-xl text-sm md:text-base leading-relaxed">
                        Khám phá những xu hướng thiết kế chiếu sáng mới nhất, tips bố trí đèn trang trí và kiến thức hữu ích cho ngôi nhà hoàn hảo.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-gray-50 min-h-screen">
                <div className="w-full xl:mx-auto xl:max-w-[1440px] px-4 xl:px-0 py-8 md:py-12">

                    {/* Category Filter */}
                    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border
                  ${selectedCategory === cat
                                        ? 'bg-yellow-400 text-white border-yellow-400 shadow-md shadow-yellow-400/25'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-yellow-400 hover:text-yellow-600'
                                    }`}
                            >
                                {cat === 'all' ? 'Tất cả' : cat}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="bg-white rounded-xl p-4 animate-pulse shadow-sm">
                                    <div className="bg-gray-200 h-52 w-full mb-4 rounded-lg"></div>
                                    <div className="bg-gray-200 h-5 w-3/4 mb-3 rounded"></div>
                                    <div className="bg-gray-200 h-4 w-full mb-2 rounded"></div>
                                    <div className="bg-gray-200 h-4 w-5/6 rounded"></div>
                                </div>
                            ))}
                        </div>
                    ) : filteredNews.length === 0 ? (
                        <div className="text-center text-gray-500 py-20">
                            <i className='bx bx-news text-6xl text-gray-300 mb-4 block'></i>
                            <p className="text-lg font-medium">Chưa có bài viết nào</p>
                            <p className="text-sm mt-1">Hãy quay lại sau để xem các bài viết mới nhất!</p>
                        </div>
                    ) : (
                        <>
                            {/* Featured Article */}
                            {featured && (
                                <div
                                    className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 mb-10 border border-gray-100"
                                    onClick={() => navigate(`/news/${featured.id}`)}
                                >
                                    <div className="flex flex-col lg:flex-row">
                                        <div className="relative lg:w-3/5 h-64 md:h-80 lg:h-[420px] overflow-hidden">
                                            <img
                                                src={getImageSrc(featured.imageUrl)}
                                                alt={featured.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-yellow-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                                    {featured.category}
                                                </span>
                                            </div>
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                                                    <i className='bx bxs-star text-xs'></i> Nổi bật
                                                </span>
                                            </div>
                                        </div>
                                        <div className="lg:w-2/5 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                                            <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                                                <span className="flex items-center gap-1">
                                                    <i className='bx bx-calendar'></i>
                                                    {new Date(featured.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i className='bx bx-show'></i> {featured.viewCount || 0} lượt xem
                                                </span>
                                            </div>
                                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-yellow-600 transition-colors duration-300">
                                                {featured.title}
                                            </h2>
                                            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 line-clamp-4">
                                                {featured.excerpt}
                                            </p>
                                            <div className="flex items-center gap-2 text-yellow-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                                                Đọc bài viết
                                                <i className='bx bx-right-arrow-alt text-xl'></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Article Grid */}
                            {rest.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                    {rest.map((news) =>
                                    {
                                        const dateStr = new Date(news.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });
                                        return (
                                            <article
                                                key={news.id}
                                                className="group cursor-pointer flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                                                onClick={() => navigate(`/news/${news.id}`)}
                                            >
                                                <div className="relative h-52 overflow-hidden">
                                                    <img
                                                        src={getImageSrc(news.imageUrl)}
                                                        alt={news.title}
                                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                                                    <div className="absolute top-3 left-3">
                                                        <span className="bg-yellow-400/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                                            {news.category}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-5 flex flex-col flex-grow">
                                                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                                                        <span className="flex items-center gap-1">
                                                            <i className='bx bx-calendar'></i> {dateStr}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <i className='bx bx-show'></i> {news.viewCount || 0}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors duration-200 leading-snug">
                                                        {news.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow leading-relaxed">
                                                        {news.excerpt}
                                                    </p>
                                                    <div className="mt-auto flex items-center gap-1.5 text-xs font-bold text-yellow-600 group-hover:gap-2.5 transition-all duration-300">
                                                        Đọc tiếp <i className='bx bx-right-arrow-alt text-base'></i>
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default NewsListPage;
