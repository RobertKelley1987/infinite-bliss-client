import { useEffect } from 'react';
import useScreenSizeQuery from '../../hooks/useScreenSizeQuery';
import { classNames, nameIsBetween } from '../../utils';
import { ALL_ARTISTS, APPAREL_PAGES, MUSIC_PAGES, ACCESSORY_PAGES } from '../../constants';
import DropdownList from './DropdownList';
import './Menu.css';

const A_TO_C = ALL_ARTISTS.filter(name => nameIsBetween(name, 'a', 'c'));
const D_TO_H = ALL_ARTISTS.filter(name => nameIsBetween(name, 'd', 'h'));
const I_TO_P = ALL_ARTISTS.filter(name => nameIsBetween(name, 'i', 'p'));;
const Q_TO_Z = ALL_ARTISTS.filter(name => nameIsBetween(name, 'q', 'z'));;

const ARTISTS = [
    { name: 'A to C', pages: A_TO_C }, 
    { name: 'D to H', pages: D_TO_H }, 
    { name: 'I to P', pages: I_TO_P }, 
    { name: 'Q to Z', pages: Q_TO_Z }
];

const CATEGORIES = [
    { name: 'Apparel', pages: APPAREL_PAGES.filter(page => page !== 'Featured')}, 
    { name: 'Music', pages: MUSIC_PAGES.filter(page => page !== 'Featured') },
    { name: 'Accessories', pages: ACCESSORY_PAGES}
];

type MenuProps = {
    menu: React.RefObject<HTMLDivElement>,
    categoriesOpen: boolean,
    setCategoriesOpen: React.Dispatch<React.SetStateAction<boolean>>,
    artistsOpen: boolean,
    setArtistsOpen: React.Dispatch<React.SetStateAction<boolean>>
    menuOpen: boolean,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu = (props: MenuProps) => {
    const { 
        menu, 
        menuOpen, 
        setMenuOpen, 
        categoriesOpen, 
        setCategoriesOpen,
        artistsOpen,
        setArtistsOpen 
    } = props;
    const { screenIsBig } = useScreenSizeQuery(800);
 
    useEffect(() => {
        setMenuOpen(false);
        setCategoriesOpen(false);
        setArtistsOpen(false);
      }, [screenIsBig, setMenuOpen, setCategoriesOpen, setArtistsOpen]);

    return (
        <div ref={menu} className={classNames(!menuOpen, 'menu', 'menu-hidden')}>
            <nav>
                <ul className="menu-nav">
                    <DropdownList 
                        thisIsOpen={categoriesOpen} 
                        pageLists={CATEGORIES}
                        heading="Categories"
                        setOtherListsOpen={setArtistsOpen} 
                        setThisListOpen={setCategoriesOpen}
                        setMenuOpen={setMenuOpen}
                    />
                    <DropdownList 
                        thisIsOpen={artistsOpen} 
                        pathSlug='artists'
                        pageLists={ARTISTS}
                        heading="Artists"
                        setOtherListsOpen={setCategoriesOpen} 
                        setThisListOpen={setArtistsOpen}
                        setMenuOpen={setMenuOpen}
                    />
                </ul>    
            </nav>
        </div>
    )
}

export default Menu;