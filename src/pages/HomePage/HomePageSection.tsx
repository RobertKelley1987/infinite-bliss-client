import { Link } from 'react-router-dom'; 
import Grid from '../../components/Grid';
import ItemList from '../../components/ItemList';
import { ProductList } from '../../types';
import './HomePageSection.css';

type HomePageProps = {
    heading: string,
    items: ProductList,
    path: string
}

const HomePageSection = ({ heading, items, path }: HomePageProps) => {
    return (
        <section className="home-page-section">
            <Link to={path} className="home-page-section-heading-link">
                <h2 className="home-page-section-heading">{heading}</h2>
            </Link>
            <Grid>
                <ItemList items={items} srcPg={heading}/>
            </Grid>
            <Link to={path} className="button">
                View All
                <span className="material-symbols-outlined button-arrow">arrow_forward</span>
            </Link>
        </section>
    )
}

export default HomePageSection;