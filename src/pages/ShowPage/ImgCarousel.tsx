import { useState, useEffect } from 'react';
import { Item } from '../../types';
import './ImgCarousel.css';

type ImgCarouselProps<T> = {
    product: T
}

function ImgCarousel<T extends Item<K>, K extends string>({ product }: ImgCarouselProps<T>) {
    const { imgs, productType } = product;
    const [selectedImg, setSelectedImg] = useState('');

    const renderClassNames = (img: string) => {
        return selectedImg === img ? 'img-carousel-img' : 'img-carousel-img img-carousel-img-transparent'
    }
    
    // Set selected img to 1st photo in imgs array
    useEffect(() => {
        if(imgs) {
            setSelectedImg(imgs[0]);
        }
    }, [imgs]);

    const renderImgSelector = () => {
        return (
            <div className="img-carousel-imgs-wrapper">
                {imgs.map(image => {
                    return (
                        <div key={image} className="img-carousel-img-wrapper" onClick={() => setSelectedImg(image)}>
                            <img alt={productType} src={`/imgs/${image}.jpg`} className={renderClassNames(image)}/>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="img-carousel">
            <img alt={productType} src={`/imgs/${selectedImg}.jpg`} className="img-carousel-img"/>
            {imgs.length > 1 && renderImgSelector()}
        </div>
    )
}

export default ImgCarousel;