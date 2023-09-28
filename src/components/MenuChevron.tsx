import './MenuChevron.css';

type MenuChevronProps = {
    flipped: boolean
}

const classNames = (flipped: boolean) => {
    return flipped ?  "material-symbols-outlined menu-chevron flipped" : "material-symbols-outlined menu-chevron";
}

const MenuChevron = ({ flipped }: MenuChevronProps) => {
    return <span className={classNames(flipped)}>expand_more</span>
}

export default MenuChevron;