import './MenuButton.css'

type MenuSVGProps = {
    menuButton: React.RefObject<HTMLButtonElement>
    menuOpen: boolean,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuButton = ({ menuButton, menuOpen, setMenuOpen }: MenuSVGProps) => {
    const closeIcon = <span className="material-symbols-outlined menu-button-icon">close</span>;
    const menuIcon = <span className="material-symbols-outlined menu-button-icon">menu</span>;

    return (
        <button ref={menuButton} onClick={() => setMenuOpen(prev => !prev)} className="menu-button">
            {menuOpen ? closeIcon : menuIcon}
        </button>
    );
}

export default MenuButton;