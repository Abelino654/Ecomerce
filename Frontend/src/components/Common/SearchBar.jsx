import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux"
import { fetchProductsByFilters, setFilters } from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
function SearchBar() {
  //  Hooks to handle input
  const [open, setOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setOpen(!open);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(setFilters({ search: searchItem }));
    dispatch(fetchProductsByFilters({ search: searchItem }));
    navigate(`/collections/all?search=${searchItem}`)
  };
  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-400 ${open ? "absolute top-0 left-0 w-full bg-gray-800 h-20 z-50" : "w-auto"
        }`}
    >
      {open ? (
        <form
          onSubmit={handleFormSubmit}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              value={searchItem}
              placeholder="Search"
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-800"
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-blue-whale"
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>

          {/* Close Button */}
          <button
            type="submit"
            onClick={handleSearchToggle}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-blue-whale"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
