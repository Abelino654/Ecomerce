import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const FilterSideBar = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: [],
    maxPrice: [],

  })

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const categories = ["Top wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Black",
    "Orange",
    "Yellow",
    "White",
    "Green",
    "Purple",
    "Pink",
    "Brown",
    "Navy",
    "SkyBlue"
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Silk",
    "Linen",
    "Fleece",
    "Viscose",
    "Polyester"
  ]

  const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChickStyle"];
  const genders = ["Men", "Women"];



  //  Getting values
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params?.category || "",
      gender: params?.gender || "",
      color: params?.color || "",
      size: params?.size ? params?.size?.split(",") : [],
      material: params?.material ? params?.material?.split(",") : [],
      brand: params?.brand ? params?.brand?.split(",") : [],
      minPrice: params?.minPrice || 0,
      maxPrice: params?.maxPrice || 1000,
    })

    setPriceRange([0, params?.maxPrice || 1000])
  }, [searchParams])

  const handleValueChange = (e) => {
    let { name, value, type, checked } = e.target;
    let updateFilter = { ...filters };

    if (type === "checkbox") {
      if (checked) {

        updateFilter[name] = [...(updateFilter[name] || []), value]
      } else {
        updateFilter[name] = updateFilter[name].filter((item) => item != value)

      }
    } else {
      updateFilter[name] = value;
    }

    setFilters(updateFilter);
    updateUrlParams(filters);


  }

  // Updated url
  const updateUrlParams = (updateFilter) => {
    const params = new URLSearchParams();

    Object.keys(updateFilter).forEach((key) => {
      if (Array.isArray(updateFilter[key]) && updateFilter[key].length > 0) {
        params.append(key, updateFilter[key].join(","))
       
      } else if (updateFilter[key]) {
        params.append(key, updateFilter[key])
      }
    })

    setSearchParams(params);
  }

  const handlePriceChange = (e) => {
    const newPrice = e.target.value
    setPriceRange([0, newPrice]);
    const updateFilter = { ...filters, minPrice: 0, maxPrice: newPrice }
    setFilters(updateFilter);
    updateUrlParams(updateFilter);
  }
  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/*Categories  */}
      <div className='mb-6' >
        <label className='block text-gray-800 font-medium mb-2'>Category</label>
        {
          categories.map((category) => (
            <div key={category} className="flex items-center mb-1">
              <input type="radio"
                value={category}
                onChange={handleValueChange}
                checked={filters.category === category}
                name="category"
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-800">{category}</span>
            </div>
          ))
        }
      </div>
      {/*Gender filter  */}
      <div className='mb-6' >
        <label className='block text-gray-800 font-medium mb-2'>Gender</label>
        {
          genders.map((gender) => (
            <div key={gender} className="flex items-center mb-1">

              <input type="radio"
                name="gender"
                checked={filters.gender === gender}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                value={gender}
                onChange={handleValueChange}
              />
              <span className="text-gray-800">{gender}</span>
            </div>
          ))
        }
      </div>
      {/*Colors filter  */}
      <div className='mb-6' >
        <label className='block text-gray-800 font-medium mb-2'>Colors</label>
        <div className="flex flex-wrap gap-2">
          {colors?.map((color) => (
            <button key={color} value={color}
              onClick={handleValueChange} name="color" className="w-8 h-8 rounded-full border-gray-600 cursor-pointer transition hover:scale-105" style={{ backgroundColor: color.toLowerCase() }}>

            </button>
          ))}
        </div>
      </div>

      {/*Size Filters  */}

      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2">Size</label>
        {
          sizes?.map((size) => (
            <div key={size} className="flex items-center mb-1">
              <input type="checkbox" name="size"
                value={size}
                checked={filters.size.includes(size)}
                onChange={handleValueChange}
                className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
              />
              <span className="text-gray-700">{size}</span>
            </div>
          ))
        }
      </div>
      {/*Materials Filters  */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2">Materials</label>
        {
          materials?.map((material) => (
            <div key={material} className="flex items-center mb-1">
              <input type="checkbox" name="material"
                value={material}
                checked={filters.material.includes(material)}
                onChange={handleValueChange}
                className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
              />
              <span className="text-gray-700">{material}</span>
            </div>
          ))
        }
      </div>
      {/*Brands Filters  */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2">Brands</label>
        {
          brands?.map((brand) => (
            <div key={brand} className="flex items-center mb-1">
              <input type="checkbox" name="brand"
                value={brand}
                checked={filters.brand.includes(brand)}
                onChange={handleValueChange}
                className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
              />
              <span className="text-gray-700">{brand}</span>
            </div>
          ))
        }
      </div>

      {/*Price range  */}
      <div className="mb-8">
        <label className='block text-gray-800 font-medium mb-2'>
          Price Range
        </label>
        <input type='range' name="priceRange" min={0} max={1000} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer " value={priceRange[1]}
          onChange={handlePriceChange}
        />

        <div className="flex justify-between text-gray-600 mb-2 ">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  )
}

export default FilterSideBar