import { Link } from 'react-router-dom';
import './StorePath.css';

type StorePathProps = {
    backLink: React.ReactNode,
    tail: React.ReactNode,
    collection?: string
}

function StorePath(props: StorePathProps) {
    const { backLink, tail } = props;

    return (
        <div className="store-path">
            <Link className="store-path-item" to='/'>
                Home
            </Link>
            <span> / </span>
            {backLink}
            <span> / </span>
            {tail}
        </div>
    )
}

export default StorePath;