import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/user/MainPage/Header/Header';
import NavbarPrimary from '../components/user/MainPage/NavbarPrimary/NavbarPrimary';
import TopBar from '../components/user/MainPage/TopBar/TopBar';
import Footer from '../components/user/MainPage/Footer/Footer';
import NewsService from '../Services/NewsService';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const NewsDetailPage = () =>
{
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const fetchArticle = async () =>
        {
            try
            {
                setLoading(true);
                const response = await NewsService.getNewsById(id);
                const data = response.data;
                setArticle(data);

                // Fetch related articles
                const allResponse = await NewsService.getAllNews(true);
                const allData = allResponse.data?.$values || allResponse.data || [];
                const related = allData
                    .filter(n => n.id !== id && n.category === data.category)
                    .slice(0, 3);
                // If not enough same-category articles, fill with others
                if (related.length < 3)
                {
                    const others = allData.filter(n => n.id !== id && !related.find(r => r.id === n.id)).slice(0, 3 - related.length);
                    related.push(...others);
                }
                setRelatedArticles(related);
            } catch (error)
            {
                console.error('Error fetching article:', error);
            } finally
            {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    const getImageSrc = (imageUrl) =>
    {
        if (!imageUrl) return 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80';
        return imageUrl.startsWith('http') ? imageUrl : `${API_ENDPOINT}${imageUrl}`;
    };

    const handleShare = (platform) =>
    {
        const url = window.location.href;
        const title = article?.title || '';
        const links = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            copy: url
        };
        if (platform === 'copy')
        {
            navigator.clipboard.writeText(url);
            return;
        }
        window.open(links[platform], '_blank', 'width=600,height=400');
    };

    if (loading)
    {
        return (
            <>
                <TopBar />
                <Header />
                <NavbarPrimary />
                <div className="bg-gray-50 min-h-screen">
                    <div className="w-full xl:mx-auto xl:max-w-[900px] px-4 xl:px-0 py-12">
                        <div className="animate-pulse">
                            <div className="bg-gray-200 h-6 w-1/3 mb-6 rounded"></div>
                            <div className="bg-gray-200 h-10 w-3/4 mb-4 rounded"></div>
                            <div className="bg-gray-200 h-5 w-1/2 mb-8 rounded"></div>
                            <div className="bg-gray-200 h-[400px] w-full mb-8 rounded-2xl"></div>
                            <div className="space-y-3">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="bg-gray-200 h-4 w-full rounded"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!article)
    {
        return (
            <>
                <TopBar />
                <Header />
                <NavbarPrimary />
                <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <i className='bx bx-error-circle text-6xl text-gray-300 mb-4 block'></i>
                        <h2 className="text-xl font-bold text-gray-700 mb-2">Không tìm thấy bài viết</h2>
                        <p className="text-gray-500 mb-6">Bài viết có thể đã bị xóa hoặc không tồn tại.</p>
                        <button
                            onClick={() => navigate('/news')}
                            className="px-6 py-2.5 bg-yellow-400 text-white font-medium rounded-full hover:bg-yellow-500 transition-colors shadow-md"
                        >
                            Quay lại trang tin tức
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const dateStr = new Date(article.createdAt).toLocaleDateString('vi-VN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Detect if content is HTML (from ReactQuill) or plain text
    const isHtmlContent = article.content && /<[a-z][\s\S]*>/i.test(article.content);
    // Fallback: format plain text into paragraphs for better readability
    const contentParagraphs = !isHtmlContent && article.content ? article.content.split(/\.\s+/).filter(Boolean) : [];

    return (
        <>
            <Helmet>
                <title>{article.title} | CapyLumine</title>
                <meta name="description" content={article.excerpt} />
                <link rel="canonical" href={`${window.location.origin}/news/${id}`} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.excerpt} />
                <meta property="og:image" content={getImageSrc(article.imageUrl)} />
                <meta property="og:url" content={`${window.location.origin}/news/${id}`} />
                <meta property="og:locale" content="vi_VN" />
                <meta property="og:site_name" content="CapyLumine" />
                <meta property="article:published_time" content={article.createdAt} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={article.title} />
                <meta name="twitter:description" content={article.excerpt} />
                <meta name="twitter:image" content={getImageSrc(article.imageUrl)} />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "NewsArticle",
                    "headline": article.title,
                    "description": article.excerpt,
                    "image": getImageSrc(article.imageUrl),
                    "datePublished": article.createdAt,
                    "author": { "@type": "Organization", "name": "CapyLumine" },
                    "publisher": {
                        "@type": "Organization",
                        "name": "CapyLumine"
                    },
                    "mainEntityOfPage": `${window.location.origin}/news/${id}`
                })}</script>
            </Helmet>

            <TopBar />
            <Header />
            <NavbarPrimary />

            {/* Hero Image */}
            <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden">
                <img
                    src={getImageSrc(article.imageUrl)}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0">
                    <div className="w-full xl:mx-auto xl:max-w-[900px] px-4 xl:px-0 pb-8 md:pb-12">
                        <span className="inline-block bg-yellow-400 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 shadow-lg">
                            {article.category}
                        </span>
                        <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3 drop-shadow-lg">
                            {article.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-gray-200">
                            <span className="flex items-center gap-1.5">
                                <i className='bx bx-calendar'></i> {dateStr}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <i className='bx bx-show'></i> {article.viewCount || 0} lượt xem
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="bg-gray-50">
                <div className="w-full xl:mx-auto xl:max-w-[900px] px-4 xl:px-0">

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-400 py-6">
                        <a href="/" className="hover:text-yellow-500 transition-colors">Trang chủ</a>
                        <i className='bx bx-chevron-right text-xs'></i>
                        <a href="/news" className="hover:text-yellow-500 transition-colors">Tin tức</a>
                        <i className='bx bx-chevron-right text-xs'></i>
                        <span className="text-gray-600 font-medium truncate max-w-[200px]">{article.title}</span>
                    </nav>

                    {/* Article Body */}
                    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
                        <div className="p-6 md:p-10 lg:p-12">

                            {/* Excerpt as lead paragraph */}
                            <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed mb-8 border-l-4 border-yellow-400 pl-5 bg-yellow-50/50 py-4 pr-4 rounded-r-lg italic">
                                {article.excerpt}
                            </p>

                            {/* Main content - supports both HTML (ReactQuill) and plain text */}
                            {isHtmlContent ? (
                                <div
                                    className="prose prose-lg max-w-none text-gray-700 leading-[1.9] 
                                        [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-800 [&_h1]:mb-4 [&_h1]:mt-6
                                        [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-800 [&_h2]:mb-3 [&_h2]:mt-5
                                        [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-800 [&_h3]:mb-2 [&_h3]:mt-4
                                        [&_p]:text-base [&_p]:text-gray-600 [&_p]:leading-[1.9] [&_p]:mb-4
                                        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-gray-600
                                        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:text-gray-600
                                        [&_li]:mb-2 [&_li]:leading-relaxed
                                        [&_blockquote]:border-l-4 [&_blockquote]:border-yellow-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_blockquote]:my-6
                                        [&_strong]:font-bold [&_strong]:text-gray-800
                                        [&_a]:text-yellow-600 [&_a]:underline [&_a]:hover:text-yellow-700
                                        [&_img]:rounded-xl [&_img]:shadow-md [&_img]:my-6 [&_img]:max-w-full"
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                />
                            ) : (
                                <div className="prose prose-lg max-w-none text-gray-700 leading-[1.9]">
                                    {contentParagraphs.length > 1 ? (
                                        contentParagraphs.map((para, idx) =>
                                        {
                                            const text = para.trim() + (para.trim().endsWith('.') ? '' : '.');
                                            const numberMatch = text.match(/^(\d+)\.\s*(.+?):\s*(.*)/);
                                            if (numberMatch)
                                            {
                                                return (
                                                    <div key={idx} className="mb-6">
                                                        <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-start gap-3">
                                                            <span className="flex-shrink-0 w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                                                                {numberMatch[1]}
                                                            </span>
                                                            <span>{numberMatch[2]}</span>
                                                        </h3>
                                                        <p className="text-base text-gray-600 leading-relaxed pl-11">{numberMatch[3]}</p>
                                                    </div>
                                                );
                                            }
                                            if (text.startsWith('- '))
                                            {
                                                return (
                                                    <div key={idx} className="flex items-start gap-3 mb-3 pl-2">
                                                        <i className='bx bx-check-circle text-yellow-500 text-lg mt-0.5 flex-shrink-0'></i>
                                                        <p className="text-base text-gray-600 leading-relaxed">{text.substring(2)}</p>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <p key={idx} className="text-base text-gray-600 leading-[1.9] mb-5">
                                                    {text}
                                                </p>
                                            );
                                        })
                                    ) : (
                                        <p className="text-base text-gray-600 leading-[1.9]">{article.content}</p>
                                    )}
                                </div>
                            )}

                            {/* Tags */}
                            <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t border-gray-100">
                                <span className="text-sm font-semibold text-gray-500 mr-2">Tags:</span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-yellow-50 hover:text-yellow-600 transition-colors cursor-pointer">
                                    #{article.category}
                                </span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-yellow-50 hover:text-yellow-600 transition-colors cursor-pointer">
                                    #đèn trang trí
                                </span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-yellow-50 hover:text-yellow-600 transition-colors cursor-pointer">
                                    #nội thất
                                </span>
                            </div>

                            {/* Share buttons */}
                            <div className="flex items-center gap-3 mt-6">
                                <span className="text-sm font-semibold text-gray-500">Chia sẻ:</span>
                                <button
                                    onClick={() => handleShare('facebook')}
                                    className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200"
                                    title="Chia sẻ lên Facebook"
                                >
                                    <i className='bx bxl-facebook text-lg'></i>
                                </button>
                                <button
                                    onClick={() => handleShare('twitter')}
                                    className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200"
                                    title="Chia sẻ lên Twitter"
                                >
                                    <i className='bx bxl-twitter text-lg'></i>
                                </button>
                                <button
                                    onClick={() => handleShare('copy')}
                                    className="w-9 h-9 rounded-full bg-gray-600 text-white flex items-center justify-center hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200"
                                    title="Sao chép liên kết"
                                >
                                    <i className='bx bx-link-alt text-lg'></i>
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-6 bg-yellow-400 rounded-full"></div>
                                <h3 className="text-xl font-bold text-gray-800">Bài viết liên quan</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedArticles.map((news) => (
                                    <article
                                        key={news.id}
                                        className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                                        onClick={() => navigate(`/news/${news.id}`)}
                                    >
                                        <div className="relative h-40 overflow-hidden">
                                            <img
                                                src={getImageSrc(news.imageUrl)}
                                                alt={news.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute top-2.5 left-2.5">
                                                <span className="bg-yellow-400/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                    {news.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-[11px] text-gray-400 mb-1.5 flex items-center gap-1">
                                                <i className='bx bx-calendar'></i>
                                                {new Date(news.createdAt).toLocaleDateString('vi-VN')}
                                            </p>
                                            <h4 className="text-sm font-bold text-gray-800 line-clamp-2 group-hover:text-yellow-600 transition-colors leading-snug">
                                                {news.title}
                                            </h4>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Back to News Button */}
                    <div className="text-center pb-12">
                        <button
                            onClick={() => navigate('/news')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-full hover:border-yellow-400 hover:text-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <i className='bx bx-arrow-back text-lg'></i>
                            Xem tất cả bài viết
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default NewsDetailPage;
