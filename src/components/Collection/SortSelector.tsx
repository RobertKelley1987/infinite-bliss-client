import { SortOption } from "../../types";
import './SortSelector.css';

type SortSelectorProps = {
    sortOption: SortOption,
    setSortOption: React.Dispatch<React.SetStateAction<SortOption>>
}

const SORT_OPTIONS: SortOption[] = [
    'Date - Old to New', 
    'Date - New to Old', 
    'Alphabetically - A to Z', 
    'Alphabetically - Z to A', 
    'Price - High to Low', 
    'Price - Low to High'
];

function assertIsSortOption(option: string): asserts option is SortOption {
    let foundOption = false;
    SORT_OPTIONS.forEach(sortOption => {
        if(sortOption === option) {
            foundOption = true;
        }
    });

    if(!foundOption) {
        throw new Error('Selected option is not of type SortOption');
    }
}

const SortSelector = ({ sortOption, setSortOption }: SortSelectorProps) => {
    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        assertIsSortOption(e.target.value);
        setSortOption(e.target.value)
    }

    return (
        <div className="sort-selector-wrapper">
            <select value={sortOption} onChange={handleChange} className="sort-selector">
                {SORT_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            <span className="material-symbols-outlined sort-selector-arrow">expand_more</span>
        </div>
    )
}

export default SortSelector;