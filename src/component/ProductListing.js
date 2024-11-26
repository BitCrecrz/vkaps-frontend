

import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api';
import Header from './Header';
import { useNavigate } from 'react-router-dom';


function ProductListing() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    async function fetchData() {
        const res = await getProducts()
        console.log('res', res.data.data)
        setProducts(res.data.data)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return <div>
        <Header />
        <h1>Product List </h1>
        {localStorage.getItem('token') && (
            <button onClick={() => navigate('/product/create')}>Register a New Product</button>
        )}
        <ul>
            {products.map((product) =>
                <li style={{ margin: '5px', cursor: 'pointer' }} onClick={() => navigate('/product/' + product._id)} key={product._id}>Name:{product.name} <br /> Price:{product.price} <br /> Category:{product.category} <br /> In Stock: {product.inStock ? 'Yes' : 'No'} </li>

            )}
        </ul>
    </div>;
}

export default ProductListing;
