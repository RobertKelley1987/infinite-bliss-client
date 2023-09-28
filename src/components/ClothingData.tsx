import { Apparel, Accessory } from "../types";
import './ClothingData.css'

type Clothing = Apparel | Accessory;

type ClothingDataProps = {
    item: Clothing | null
}

function ClothingData ({ item }: ClothingDataProps) {
    const renderData = (item: Clothing) => {
        return (
            <div className="clothing-data">
                <div className="clothing-datum-wrapper">
                    <span className="clothing-data-label">Color: </span>
                    <span className="clothing-data-datum">{item.color}</span>
                </div>
                <div className="clothing-datum-wrapper">
                    <span className="clothing-data-label">Manufacturer: </span>
                    <span className="clothing-data-datum">{item.manufacturer}</span>
                </div>
                <div className="clothing-datum-wrapper">
                    <span className="clothing-data-label">Material: </span>
                    <span className="clothing-data-datum">{item.material}</span>
                </div>
            </div>
        )
    }

    return item ? renderData(item) : null;
}

export default ClothingData;