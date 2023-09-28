import { Link } from 'react-router-dom';

type ConditionalLinkProps = {
    isLink: boolean,
    to: string,
    className: string,
    children: string
}

const ConditionalLink = ({ isLink, to, className, children }: ConditionalLinkProps) => {
    let link;

    if(isLink) {
        link = <Link className={className} to={to}>{children}</Link>;
    } else {
        link = <span className={className}>{children}</span>;
    }

    return link;
}

export default ConditionalLink;