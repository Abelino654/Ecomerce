import React, { useEffect, useRef, useState } from 'react'
import FilterSideBar from '../components/Products/FilterSideBar';
import { FaFilter } from 'react-icons/fa';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from '../redux/slices/productSlice';
const CollectionPage = () => {

    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(store => store.products);
  
    const queryParams = Object.fromEntries([...searchParams])

    const sideBarRef = useRef(null)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    }


    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }));

    }, [dispatch, collection, searchParams])
    //Handling clicks
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutSide);

        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        }
    }, [])

    // Closing side bar on click
    const handleClickOutSide = (e) => {
        if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
            setIsSideBarOpen(false)
        }
    }
    return (
        <div className="flex flex-col lg:flex-row">
            {/* Mobile filter */}
            <button onClick={toggleSideBar} className="lg:hidden border p-2 flex justify-center items-center">
                <FaFilter className="mr-2" /><span className="font-bold">Filters</span>
            </button>

            {/*Filter side Bar  */}
            <div ref={sideBarRef} className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} 
    fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static
    lg:translate-x-0`}>
                <FilterSideBar />
            </div>

            <div className="flex-grow mb-4">
                <h2 className='text-2xl uppercase mb-4 '>All Collection</h2>

                {/* Sorting options */}
                <SortOptions />




                {/* Filter Products */}
                <ProductGrid products={products} loading={loading} error={error} />
            </div>
        </div>
    )
}

export default CollectionPage