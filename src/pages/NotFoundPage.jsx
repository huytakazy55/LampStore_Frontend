import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/user/MainPage/Header/Header';
import Footer from '../components/user/MainPage/Footer/Footer';

const NotFoundPage = () =>
{
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>404 - Không tìm thấy trang | CapyLumine</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <Header />

            <div className="min-h-[70vh] bg-gradient-to-br from-gray-50 to-amber-50/30 flex items-center justify-center px-4">
                <div className="text-center max-w-lg">
                    {/* 404 Number */}
                    <div className="relative mb-6">
                        <h1 className="text-[120px] md:text-[160px] font-black text-gray-100 leading-none select-none">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-200/50">
                                <i className='bx bx-bulb text-4xl md:text-5xl text-white'></i>
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                        Ôi! Trang này không tồn tại
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base mb-8 leading-relaxed">
                        Trang bạn đang tìm kiếm có thể đã bị di chuyển, xóa hoặc chưa từng tồn tại.
                        <br />Hãy thử quay lại trang chủ để tiếp tục khám phá.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <i className='bx bx-home text-lg'></i>
                            Về trang chủ
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full sm:w-auto px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:border-amber-400 hover:text-amber-600 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <i className='bx bx-arrow-back text-lg'></i>
                            Quay lại
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-10 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-400 mb-3">Hoặc thử các trang phổ biến:</p>
                        <div className="flex items-center justify-center gap-4 text-sm">
                            <span
                                onClick={() => navigate('/categories')}
                                className="text-amber-600 hover:text-amber-700 hover:underline cursor-pointer transition-colors"
                            >
                                Danh mục
                            </span>
                            <span className="text-gray-300">•</span>
                            <span
                                onClick={() => navigate('/news')}
                                className="text-amber-600 hover:text-amber-700 hover:underline cursor-pointer transition-colors"
                            >
                                Tin tức
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default NotFoundPage;
