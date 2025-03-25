import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSimilarProducts, fetchProductById } from '../../redux/slices/productSlice';
import { addProductToCart } from '../../redux/slices/cartSlice';
const ProductDetails = ({ productId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, loading, error, similarProducts } = useSelector(store => store.products);


    const { user, guestId } = useSelector(store => store.auth);
   
    //  Always have a valid product ID
    const productFetchId = productId || id;

    useEffect(() => {
        if (productFetchId) {
            dispatch(fetchProductById(productFetchId))
            dispatch(fetchSimilarProducts(productFetchId));
        }
    }, [dispatch, productFetchId]);





    const [mainImage, setMainImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleQuantity = (change) => {
        if (change === "+") setQuantity((prev) => prev + 1)
        else setQuantity((prev) => prev - 1)
    }

    const handleAddTOCart = () => {
        if (!selectedColor || !selectedSize || quantity < 1) {
            toast.error("Kindly choose your preferred color, size, and quantity before adding to cart.", {
                duration: 1200
            });
            return;
        }
        setIsButtonDisabled(true);


        dispatch(
            addProductToCart({
                productId: productFetchId,
                quantity,
                size: selectedSize,
                color: selectedColor,
                guestId,
                userId: user?._id
            })
        ).then(() => {
            toast.success("Product added to cart", {
                duration: 1000
            })

        }).finally(() => {
            setIsButtonDisabled(false)
        })

    }

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0]?.url || "/default-image.jpg");
        }
    }, [selectedProduct]);


    if (!selectedProduct || (Array.isArray(selectedProduct) && selectedProduct.length === 0)) {
        return <p className="text-red-400">No product found</p>;
    }
    if (loading) {
        return <p className='text-green-400'>Loading......</p>;
    }
    if (error) {
        return <p className='text-red-400'>Error</p>;
    }

    
    return (
        <div className='p-6'>
           
            {selectedProduct && selectedProduct.images && selectedProduct.images.length > 0 && (
                <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
                    <div className='flex flex-col md:flex-row'>
                        {/* Left Images */}
                        <div className='hidden md:flex flex-col space-y-4 mr-6'>
                            {
                                selectedProduct?.images?.map((image, index) => (
                                    <img key={index}
                                        src={image?.url}
                                        alt={image?.txt || `Product ${index}`}
                                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${mainImage === image?.url ? "border-black" : "border-gray-200"}`}
                                        onClick={() => setMainImage(image?.url)}
                                    />


                                ))
                            }
                        </div>


                        {/* Content image */}
                        <div className='md:w-1/1'>
                            <div className='mb-4'>
                                <img src={mainImage}
                                    alt={selectedProduct?.images[0]?.alt || selectedProduct?.images[0]?.name}
                                    className='w-full h-auto object-cover rounded-lg'
                                />
                            </div>
                        </div>


                        {/* Mobile Thumbnail */}
                        <div className='md:hidden flex overflow-x-scroll space-x-4 mb-4'>
                            {
                                selectedProduct.images.map((image, index) => (
                                    <img key={index}
                                        src={image?.url}
                                        alt={image?.txt || `Product ${index}`}
                                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${mainImage === image?.url ? "border-black" : "border-gray-500"
                                            }`}
                                        onClick={() => setMainImage(image?.url)}
                                    />


                                ))
                            }
                        </div>

                        {/*Right Side  */}
                        <div className='md:w-1/2 md:ml-10'>
                            <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
                                {selectedProduct?.name}
                            </h1>
                            <p className='text-lg text-gray-800 mb-2 line-through'>
                                {
                                    selectedProduct?.originalPrice && `${selectedProduct?.originalPrice}`
                                }

                            </p>

                            <p className='text-gray-600 mb-2'>
                                $ {selectedProduct?.originalPrice}
                            </p>
                            <p className='text-gray-600 mb-4'>{selectedProduct?.description}</p>
                            <div className='mb-4'>
                                <p className='text-gray-800'>Colors:</p>
                                <div className='flex gap-2 mt-2'>
                                    {
                                        selectedProduct?.colors?.map((color, index) => (
                                            <button key={index}
                                                className={`w-8 h-8  rounded-full border-4 ${color === selectedColor ? "border-black" : "border-none"}`}
                                                style={{
                                                    backgroundColor: color.toLocaleLowerCase(),
                                                    filter: "brightness(0.5)"
                                                }}
                                                onClick={() => { setSelectedColor(color) }}
                                            >

                                            </button>
                                        ))
                                    }
                                </div>
                            </div>

                            {/* Sizes */}
                            <div className='mb-4'>
                                <p className='text-gray-800'>Sizes:</p>
                                <div className='flex gap-2 mt-2'>
                                    {
                                        selectedProduct?.sizes?.map((size, index) => (
                                            <button key={index} className={`px-4 py-2 rounded border ${selectedSize === size ? "bg-blue-whale text-white" : ""}`}
                                                onClick={() => setSelectedSize(size)}
                                            >{size}</button>
                                        ))
                                    }
                                </div>
                            </div>
                            {/* Quantity */}
                            <div className='mb-4'>
                                <p className='text-gray-800'>Quantity: </p>
                                <div className='flex items-center space-x-4 mt-2'>
                                    <button className='px-2 pt-1 bg-gray-200 rounded text-lg'
                                        onClick={() => { handleQuantity("-") }}
                                    >
                                        -
                                    </button>
                                    <span className='text-lg'>{quantity}</span>
                                    <button className='px-2 pt-1 bg-gray-200 rounded text-lg'
                                        onClick={() => { handleQuantity("+") }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to cart */}
                            <button onClick={handleAddTOCart} disabled={isButtonDisabled} className={`bg-blue-whale hover:bg-hover-color text-white py-2 px-6 rounded w-full mb-6 ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-hover-color"}`}>
                                {isButtonDisabled ? "PROCESSING......" : "ADD TO BAG"}
                            </button>

                            <div className='mt-10 text-gray-800'>
                                <h3 className=''>Characteristics:</h3>
                                <table className='w-full text-left text-sm text-gray-700 '>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'>
                                                Brand
                                            </td>
                                            <td className='py-1'>
                                                {selectedProduct?.brand}

                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>
                                                Material
                                            </td>
                                            <td className='py-1'>
                                                {selectedProduct?.material}

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* Suggestions */}
                    <div className='mt-20'>
                        <h2 className='text-2xl text-center font-medium mb-4'>You may Also Like</h2>
                        <ProductGrid products={similarProducts} />
                    </div>

                </div>
            )}
        </div >
    )
}

export default ProductDetails