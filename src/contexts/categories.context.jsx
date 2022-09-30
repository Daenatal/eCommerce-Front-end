import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

// import SHOP_DATA from '../shop-data.js';

export const CategoryContext = createContext({
    categoriesMap: [],
});

export const  CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});


// export const ProductsProvider = ({children}) => {
//     const [products, setProducts] = useState([]); //passing in default products array, we are refactoring this code to use categoryMap object

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, []);

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])
    const value = { categoriesMap };
    return (
        <CategoryContext.Provider value={value}> 
            {children}
        </CategoryContext.Provider>
    );
};