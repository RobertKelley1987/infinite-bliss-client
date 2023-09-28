import { useState } from 'react';
import { Link } from 'react-router-dom';
import useScreenSizeQuery from '../../hooks/useScreenSizeQuery';
import './MenuList.css';

type MenuListProps = {
    category: string,
    pathSlug?: string,
    pages: string[],
    closeMenu: () => void
}

const MenuList = ({ category, pathSlug, pages, closeMenu }: MenuListProps) => {
    const [sectionOpen, setSectionOpen] = useState(false);
    const { screenIsBig } = useScreenSizeQuery(800);
    pathSlug = pathSlug || category.toLowerCase();

    const renderList = () => {
        return (screenIsBig || sectionOpen) && (
            <ul className="menu-list">
                {pages.map(page => {
                    const pageSlug = page.toLowerCase().replaceAll(' ', '-');
                    page = page === 'New' ? `${page} ${category}` : page;

                    return (
                        <li key={page} className="menu-list-item">
                            <Link onClick={() => closeMenu()} to={`/${pathSlug}/${pageSlug}`}>{page}</Link>
                        </li>
                    )
                })}
            </ul>
        );
    }

    return ( 
        <div className="menu-list-wrapper">              
            <li className="menu-list-heading-wrapper" onClick={() => setSectionOpen(prev => !prev)}>
                <h1 className="menu-heading">{category}</h1>
                <span className="material-symbols-outlined menu-chevron">expand_more</span>
            </li>
            {renderList()}
        </div>
    );
}

export default MenuList;