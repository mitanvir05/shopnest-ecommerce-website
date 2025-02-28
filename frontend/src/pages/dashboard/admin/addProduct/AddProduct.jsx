import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'; 
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';
import { useNavigate } from 'react-router-dom';
import { useAddProductMutation } from '../../../../redux/features/products/productsApi';

const categories = [
    { label: 'Select Category', value: '' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Dress', value: 'dress' },
    { label: 'Jewellery', value: 'jewellery' },
    { label: 'Cosmetics', value: 'cosmetics' }
];

const colors = [
    { label: 'Select Color', value: '' },
    { label: 'Black', value: 'black' },
    { label: 'Red', value: 'red' },
    { label: 'Gold', value: 'gold' },
    { label: 'Blue', value: 'blue' },
    { label: 'Silver', value: 'silver' },
    { label: 'Beige', value: 'beige' },
    { label: 'Green', value: 'green' }
];

const AddProduct = () => {
    const { user } = useSelector((state) => state.auth);
    const [product, setProduct] = useState({
        name: '',
        category: '',
        color: '',
        price: '',
        description: ''
    });
    const [image, setImage] = useState('');

    const [addProduct, { isLoading, error }] = useAddProductMutation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.name || !product.category || !product.price || !product.description || !product.color || !image) {
            Swal.fire({
                title: "Missing Fields!",
                text: "Please fill all the required fields.",
                icon: "warning",
                confirmButtonColor: "#3085d6",
            });
            return;
        }

        try {
            await addProduct({ ...product, image, author: user?._id }).unwrap();
            
            
            Swal.fire({
                title: "Success!",
                text: "Product added successfully",
                icon: "success",
                confirmButtonColor: "#3085d6",
            });

            setProduct({
                name: '',
                category: '',
                color: '',
                price: '',
                description: ''
            });
            setImage('');
            navigate("/shop");
        } catch (error) {
            console.error("Failed to submit product", error);

            
            Swal.fire({
                title: "Error!",
                text: "Failed to add product. Please try again.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextInput
                    label="Product Name"
                    name="name"
                    placeholder="Ex: Diamond Earrings"
                    value={product.name}
                    onChange={handleChange}
                />
                <SelectInput
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    options={categories}
                />
                <SelectInput
                    label="Color"
                    name="color"
                    value={product.color}
                    onChange={handleChange}
                    options={colors}
                />
                <TextInput
                    label="Price"
                    name="price"
                    type="number"
                    placeholder="50"
                    value={product.price}
                    onChange={handleChange}
                />
                <UploadImage name="image" setImage={setImage} />

                <div>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
                    <textarea 
                        name="description" 
                        id="description"
                        className='border rounded p-2 w-full mt-1'
                        value={product.description}
                        placeholder='Write a product description'
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button type='submit'
                        className={`bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Adding..." : "Add Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
