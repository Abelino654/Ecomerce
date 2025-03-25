import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import axios from "axios"

const NewArrivals = () => {
    // States
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(true);


    // Update new Arrivals
    const [newArrivals, setNewArrivals] = useState([]);

    // UseEffect hook to fetch new arrivals
    useEffect(() => {
        const fetchNewArrivals = async () => {

            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/product/new-arrivals`);
                setNewArrivals(res.data)
            } catch (err) {
                console.error(err.message)
            }
        }

        fetchNewArrivals()
    }, [])



    {/* Scroll behaviour */ }
    const scroll = (direction) => {
        const scrollSize = direction === "right" ? 270 : -270;
        scrollRef.current.scrollBy({ left: scrollSize, behaviour: "smooth" });
    }

    const updateScrollBehaviour = () => {
        const container = scrollRef.current;

        if (container) {
            const leftScroll = container.scrollLeft;
            const rightScrollBar = container.scrollWidth - container.clientWidth;;

            setCanScrollLeft(leftScroll > 0)
            setCanScrollRight(leftScroll < rightScrollBar);


        }


    }


    // Mouse events
    // Mouse events
    const handleMouseMove = (e) => {
        if (!isDragging || !scrollRef.current) return;

        const x = e.pageX - scrollRef.current.offsetLeft;
        const move = x - startX;

        scrollRef.current.scrollLeft -= move;
        setStartX(x); // Update startX for smooth dragging
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollBehaviour);
            updateScrollBehaviour();
        }
    }, [newArrivals])
    return (
        <section className='new-arrivals'>
            <div className="container mx-auto text-center mb-10 relative">
                <h2 className='text-3xl font-bold mb-4'>
                    Explore new Arrivals
                </h2>
                <p className='text-lg text-gray-700 mb-10'>
                    Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
                </p>

                {/* Scroll bars */}
                <div className='absolute right-0 bottom-[-30px] flex space-x-2'>
                    <button className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black" : "bg-gray-300 text-gray-900 cursor-not-allowed"}`} disabled={!canScrollLeft} onClick={() => scroll("left")}>
                        <FiChevronLeft className='text-2xl' />
                    </button>
                    <button className={`p-2 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-300 text-gray-800 cursor-not-allowed"}`} disabled={!canScrollRight} onClick={() => scroll("right")}>
                        <FiChevronRight className='text-2xl' />
                    </button>
                </div>
            </div>



            {/* Scrollbar contents */}
            <div ref={scrollRef} className={`new-arrivals container mx-auto overflow-x-scroll flex  space-x-6 relative ${isDragging ? "cursor-grabbing " : "cursor-grab"}`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onMouseMove={handleMouseMove}

            >
                {newArrivals.map((product, index) => (
                    <div key={index} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
                        <img src={product?.images[0]?.url}
                            alt={product?.images[0]?.alt || product?.name}
                            className="w-full h-[300px] object-cover rounded-lg" />

                        <div className='absolute bottom-0 left-0 right-0 bg-opacity-100 backdrop-blur-md text-white p-4 rounded-lg'>
                            <Link to={`/product/${product._id}`} className='block'>
                                <h4 className='font-medium'>{product?.name}</h4>
                                <p className="mt-1">${product?.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}

export default NewArrivals