import React, { useEffect, useState } from 'react'
import { FaHandPointLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchProductById, updateProduct } from '../../redux/slices/productSlice';
import axios from 'axios';
const EditProductPage = () => {

    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const { id } = useParams();
    const navigate = useNavigate();
    const { selectedProduct, loading, error } = useSelector(store => store.products);
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: [],
        material: [],
        gender: "",
        images: []
    });

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/")
        }
    }, [navigate, dispatch, user])
    //  State for upload image
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id))

        }
    }, [dispatch, id])



    useEffect(() => {
        if (selectedProduct) {
            setProductData(selectedProduct)
        }
    }, [selectedProduct])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => {
            ({ ...prevData, [name]: value })
        })
    }

    const file = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append("image", file);



        try {
            setUploading(true);
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })

            setProductData((prevData) => ({
                ...prevData, images: [...prevData.images, { url: data.imageUrl, altText: "" }]
            }))
            setUploading(false);

        } catch (err) {
            console.error(err);
            setUploading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ id, productData }))
    }


    if (loading) {
        return <p className="text-green-600 text-center">Loading........</p>
    }
    if (error) {
        return <p className="text-red-900 text-center" >Error {error}</p>
    }




    return (
        <div className='max-w-5xl mx-auto p-5 shadow-md rounded-md'>
            <h2 className='text-3xl font-bold mb-6'>Edit product</h2>
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Product Name</label>
                    <input type="text" name="name" value={productData?.name} onChange={handleChange} className='w-full border border-gray-400 rounded-md p-2' required />
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Description</label>
                    <textarea type="text" name="description" value={productData?.description} onChange={handleChange} className='w-full border border-gray-400 rounded-md p-2' rows="4" required />
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Price</label>
                    <input type="number" name="price" value={productData?.price} onChange={handleChange} className='w-full border border-gray-400 rounded-md p-2' rows="4" required />
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Count in Stock</label>
                    <input type="number" name="stocks" value={productData?.countInStock} onChange={handleChange} className='w-full border border-gray-400 rounded-md p-2' rows="4" required />
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>SKU</label>
                    <input type="text" name="sku" value={productData?.sku} onChange={handleChange} className='w-full border border-gray-400 rounded-md p-2' rows="4" required />
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Sizes (Comma-separated)</label>
                    <input type="text" name="sku" value={productData?.sizes?.join(", ")} onChange={(e) => {
                        setProductData({ ...productData, sizes: e.target.value.split(",").map((size) => size?.trim()) })
                    }} className='w-full border border-gray-400 rounded-md p-2' rows="4" required />
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Colors (Comma-separated)</label>
                    <input type="text" name="colors" value={productData?.colors?.join(", ")} onChange={(e) => {
                        setProductData({ ...productData, colors: e.target.value.split(",").map((color) => color?.trim()) })
                    }} className='w-full border border-gray-400 rounded-md p-2' rows="4" required />
                </div>

                {/* Image upload */}
                <div className='mb-6'>
                    <label className="bloc semibold mb-2">Upload Image</label>
                    <input type="file" onChange={file} />

                    {uploading && <p className='text-grey-900 '>Uploading Image.....</p>}
                    <div className='flex gap-4 mt-4'>
                        {
                            productData?.images?.map((image, index) => {
                               return <div key={index}>
                                    <img src={image?.url} alt={image?.altText || "Product Image"}
                                        className='w-20 h-20 object-cover rounded-md shadow-md '
                                    />
                                </div>
                            })
                        }
                    </div>
                </div>

                {/* Buttons */}
                <button type="submit" className='w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-600 transition-colors' >
                    Update Product
                </button>
            </form>
        </div>
    )
}

export default EditProductPage