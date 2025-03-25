import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollection from '../components/Products/GenderCollection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturedSection from '../components/Products/FeaturedSection'
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from '../redux/slices/productSlice'
import axios from 'axios'

function Home() {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((store) => store.products);
  const [bestSellerProducts, setBestSellerProducts] = useState(null);



  useEffect(() => {

    // Fetch products for specific collections
    dispatch(fetchProductsByFilters({
      gender: "women",
      category: "bottom wear",
      limit: 8
    }));


    //Fetch best seller product
    const fetchBestSellerProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/product/best-Seller`);
        setBestSellerProducts(res.data);
      } catch (err) {
        console.error("API Error:", err.message);
      }
    };
    fetchBestSellerProduct();


  }, [dispatch])
  return (
    <>
      <Hero />
      <GenderCollection />
      <NewArrivals />


      {/* Best Seller */}

      <h2 className="text-3xl mt-7 text-center font-bold mb-3">
        Best Seller
      </h2>

      {bestSellerProducts?._id ? (
        <ProductDetails productId={bestSellerProducts?._id} />
      ) : (
        <p className='text-center text-green-400'>Loading best seller products....</p>
      )}




      {/* PlaceHolder Products */}
      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>
          TOP WEARS FOR WOMEN's
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturedSection />
    </>
  )
}

export default Home