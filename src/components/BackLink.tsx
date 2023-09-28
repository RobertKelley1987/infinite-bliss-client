import { useLocation, useParams, Link } from 'react-router-dom';

const calcTrimIndex = (pathname: string, search?: string) => {
    return search ? pathname.indexOf(search) + search.length : undefined;
}

type BackLinkProps = { 
    text: string
}

const BackLink = ({ text }: BackLinkProps) => {
    const location = useLocation();
    const { collectionName } = useParams();
    const backPath = location.pathname.substring(0, calcTrimIndex(location.pathname, collectionName));

    return <Link className="store-path-item" to={backPath}>{text}</Link>
}

export default BackLink;