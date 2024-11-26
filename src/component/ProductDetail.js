

import React, { useEffect, useState } from 'react';
import { deleteProduct, getProductById, } from '../api/api';
import Header from './Header';
import { useNavigate, useParams } from 'react-router-dom';


function ProductDetail() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const params = useParams()
    const token = localStorage.getItem('token')
    useEffect(() => {
        async function fetchData() {
            const res = await getProductById(params.id)
            setProducts([res.data.data])
        }
        fetchData()
    }, [params.id])

    function handleEdit(id) {
        return navigate(`/product/${id}/edit`)
    }

    async function handleDelete(id) {
        if (window.confirm("Are you sure you want to proceed?")) {
            await deleteProduct(id)
            navigate(`/home`)
        } else {
            console.log("User canceled");
        }

    }
    return <div>
        <Header />
        <h1>Product Details </h1>
        <ul>
            {products.map((product) =>
                <><p style={{ margin: '5px' }} key={product._id}>Name:{product.name} <br /> Price:{product.price} <br /> Category:{product.category} <br /> In Stock: {product.inStock ? 'Yes' : 'No'} </p>

                    {token && (<> <button onClick={() => handleEdit(product._id)}>Edit</button>
                        <button onClick={() => handleDelete(product._id)}>Delete</button></>)}
                </>
            )}
        </ul>
    </div>;
}

export default ProductDetail;
