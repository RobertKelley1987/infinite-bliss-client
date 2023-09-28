import { Fragment } from 'react';
import MenuList from './MenuList';
import MenuChevron from '../MenuChevron';
import { classNames } from '../../utils';

export type PageList = {
    name: string,
    pages: string[]
}

type DropdownListProps = {
    thisIsOpen: boolean,
    pathSlug?: string,
    pageLists: PageList[],
    heading: string,
    setOtherListsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setThisListOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const DropdownList = (props: DropdownListProps) => {
    const { 
        thisIsOpen, 
        pathSlug, 
        pageLists, 
        heading, 
        setOtherListsOpen, 
        setThisListOpen, 
        setMenuOpen,
    } = props;

    const handleClick = () => { 
        setThisListOpen(prev => !prev);
        const mediaQuery = window.matchMedia('(min-width: 800px)');
        if(mediaQuery.matches) {
            setOtherListsOpen(false);
        }
    }

    const closeAllMenus = () => {
        setMenuOpen(false);
        setThisListOpen(false);
        setOtherListsOpen(false);
    }

    const renderPageLists = () => { 
        return thisIsOpen && (
            <ul className={`menu-dropdown menu-dropdown-${heading.toLowerCase()}`}>
                {pageLists.map(pageList => {
                    return (
                        <MenuList 
                            key={pageList.name} 
                            category={pageList.name} 
                            pathSlug={pathSlug} 
                            pages={pageList.pages} 
                            closeMenu={closeAllMenus} 
                        />
                    );
                })}
            </ul>
        );
    }

    return (
        <Fragment>        
            <li 
                className={classNames(thisIsOpen, 'menu-heading-wrapper', 'menu-heading-wrapper-selected')} 
                onClick={handleClick}
                onKeyDown={e => e.key === 'Enter' && handleClick()}
                tabIndex={0}
            >
                <h1 className="menu-heading">{heading}</h1>
                <MenuChevron flipped={thisIsOpen}/>
            </li>

            {renderPageLists()}
        </Fragment>
    )
}

export default DropdownList;