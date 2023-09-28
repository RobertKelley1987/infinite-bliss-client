import './Tracklist.css';

const formatTrackNum = (trackNum: number) => trackNum < 10 ? `0${trackNum}` : trackNum;

type TracklistProps = {
    tracklist?: string[]
}

const Tracklist = ({ tracklist }: TracklistProps) => {
    if(tracklist) {
        return (
            <div className="tracklist">
                <h3 className="tracklist-heading">Tracklist</h3>
                <ul>
                    {tracklist.map((track, index) => {
                        const trackNum = formatTrackNum(index + 1);
                        return <li key={trackNum}>{`${trackNum}. ${track}`}</li>
                    })}
                </ul>
            </div>
        );
    } else {
        return null;
    }
}

export default Tracklist;