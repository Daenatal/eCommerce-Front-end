import { Link } from 'react-router-dom'

import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss';

const CategoryPreview = ({title, products }) => {
    const UrlString = `/shop/${title}`;
    return (
        <div className='category-preview-container'>
            <Link className='logo-container' to={UrlString}>
                <h2>
                    <span className='title'>
                        {title.toUpperCase()}
                    </span>
                </h2>
            </Link>
            <div className='preview'>
                {products
                    .filter((_, idx)=> idx < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </div>
    )
}

export default CategoryPreview;