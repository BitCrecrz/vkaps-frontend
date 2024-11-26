import React, { useEffect, useState } from "react";
import { createProduct, getProductById, updateProduct } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
    const params = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [form, setForm] = useState({ name: "", price: "", category: "" });
    const [checked, setChecked] = useState(false)
    const [image, setImage] = useState()
    console.log('form', form)
    useEffect(() => {
        if (params.id !== undefined) {

            async function fetchData(id) {
                const res = await getProductById(params.id)
                const product = res.data.data
                console.log('product', product)
                setForm({ name: product.name, price: product.price, category: product.category, image: '' })
                setChecked(product.inStock)
            }
            fetchData(params.id)
        }
        !token && navigate('/home')

    }, [params.id, token, navigate])


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData()
            formData.append('image', image)
            // formData.append()
            console.log('formData', formData)
            if (params.id) {
                await updateProduct(params.id, { ...form, inStock: checked });
            } else {
                await createProduct(formData);
            }
            setForm({ name: "", price: "", category: "", image: "" })
            setChecked(false)
            alert(`Product ${params.id ? 'Updated' : 'Created'} successfully!`);
            navigate('/home')
        } catch (error) {
            console.error(error);
            alert(`Product ${params.id ? 'Updation' : 'Creation'} Failed!`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: 'column', alignItems: 'baseline', margin: '5px' }} >
                <h2>Register a Product</h2>
                <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <input type="checkbox" name="inStock" placeholder="In Stock" checked={checked} onChange={() => setChecked(!checked)} required />
                    <label htmlFor="inStock">In Stock</label>
                </div>
                <input type="file" alt='image' name="image" placeholder="Image" defaultValue={form.image} onChange={handleImageChange} />
                {/* <input type="password" name="password" placeholder="Password" onChange={handleChange} required /> */}
                <button type="submit">Save</button>
            </div>
        </form>
    );
};

export default ProductForm;
