import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import products from '../../services/products';
import { newToOld } from '../../utils/sorting';
import HomePageSection from './HomePageSection';
import { Apparel, Album } from '../../types';
import './HomePage.css';

const MAX_LIST_SIZE = 8;

const HomePage = () => {
    const [apparel, setApparel] = useState<Apparel[]>([]);
    const [music, setMusic] = useState<Album[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllMusic = async () => {
            const { data: { collection, error } } = await products.findByCategory('Music');
            error ? setErrorMessage('Server error: Please try again later.') : setMusic(collection);
        }

        const getAllApparel = async () => {
            const { data: { collection, error } } = await products.findByCategory('Apparel');
            error ? setErrorMessage('Server error: Please try again later.') : setApparel(collection);
        }

        setErrorMessage('');
        setLoading(true);
        getAllMusic();
        getAllApparel();
        setLoading(false);
    }, []);

    // Get featured apparel and music
    const featuredApparel = apparel.filter(item => item.featured);
    const featuredMusic = music.filter(item => item.featured && item.productType === 'LP');

    // Get most recently apparel and music
    const newestMusic = music.filter(album => album.productType === 'LP').sort(newToOld);
    const newestApparel = [...apparel].sort(newToOld);

    const renderHomePage = () => {
        return (
            <div className="home-page">
                <div className="home-page-banner" style={{ backgroundImage: "url('imgs/chat-pile_live.jpg')" }}>
                    <div className="home-page-banner-grid">
                        <img 
                            alt="Chat Pile logo" 
                            src='/imgs/chat-pile-logo.webp' 
                            className="home-page-banner-img"
                        />
                        <div className="home-page-banner-links">
                            <Link className="button" to="/artists/chat-pile">Official Store</Link>
                            <Link 
                                className="button new-record-button" 
                                to="/artists/chat-pile/music/chat-pile-gods-country-lp"
                            >
                                New Record
                            </Link>
                        </div>
                    </div>
                </div>
    
                <main className="home-page-grid">
                    <HomePageSection 
                        heading="Featured Apparel" 
                        items={featuredApparel.slice(0, MAX_LIST_SIZE)}
                        path='/apparel/featured'
                        loading={loading}
                    />
                    <HomePageSection 
                        heading="New Apparel" 
                        items={newestApparel.slice(0, MAX_LIST_SIZE)}
                        path='/apparel/new'
                        loading={loading}
                    />
                    <HomePageSection 
                        heading="Featured Music" 
                        items={featuredMusic.slice(0, MAX_LIST_SIZE)}
                        path='/music/featured'
                        loading={loading}
                    />
                    <HomePageSection 
                        heading="New Music" 
                        items={newestMusic.slice(0, MAX_LIST_SIZE)}
                        path='/music/new'
                        loading={loading}
                    />
                </main>
            </div>
        );
    }

    return errorMessage ? <p className="plain-text">{errorMessage}</p> : renderHomePage();
}

export default HomePage;