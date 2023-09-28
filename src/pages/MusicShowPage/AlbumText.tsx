import AlbumDescription from './AlbumDescription';
import Tracklist from './Tracklist';
import { Album } from '../../types';

type AlbumTextProps = {
    album: Album | null
}

const renderAlbumText = (album: Album) => {
    return album && (
        <div>
            <AlbumDescription desc={album.albumDesc} />
            <Tracklist tracklist={album.tracklist} />
        </div>
    )
}

const AlbumText = ({ album }: AlbumTextProps) => {    
    return !album ? null : renderAlbumText(album); 
}

export default AlbumText;