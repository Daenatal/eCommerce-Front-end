import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContext } from '../../contexts/categories.context';

import './category.styles.scss';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoryContext);
    const [ products, setProducts ] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            <div className='category-container'>
            
            {products &&
                products.map((product) => (<ProductCard key={product.id} product={product} />
                ))}
            </div>
        </Fragment>
        
    );
    //const products = categoriesMap[category]; //instead what we want to do is useState and useEffect if categories value changes or categoriesMap changes
}

export default Category;