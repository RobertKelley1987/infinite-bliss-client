import { Artist } from '../../types';
import { httpFormat } from '../../utils/formatting';
import './ArtistBanner.css';

type ArtistBannerProps = {
    artist: Artist
}

const ArtistBanner = ({ artist }: ArtistBannerProps) => {
    const banner = (
        <div className="artist-banner-wrapper">
            <img 
                className={"artist-banner"} 
                src={`/imgs/banners/${httpFormat(artist)}.png`} 
                alt={`${artist} logo`}
            />
        </div>
    );

    return artist ? banner : null;
}

export default ArtistBanner;