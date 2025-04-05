import React, { useState } from "react";
import "./App.css";

// Product Data (You already have this list)
const productsData = [
  {
    id: 1,
    name: "Classic Tee",
    price: 120,
    offPrice: 90,
    rating: 4.5,
    color: "Blue",
    size: "M",
    hot: true,
  },
  {
    id: 2,
    name: "Slim Jeans",
    price: 220,
    offPrice: 180,
    rating: 4.2,
    color: "Black",
    size: "L",
    hot: false,
  },
  
  {
    id: 4,
    name: "Running Shoes",
    price: 150,
    offPrice: 130,
    rating: 4.0,
    color: "Red",
    size: "9",
    hot: false,
  },
  {
    id: 5,
    name: "Denim Jacket",
    price: 300,
    offPrice: 250,
    rating: 3.9,
    color: "Blue",
    size: "M",
    hot: true,
  },
  {
    id: 6,
    name: "Basic Hoodie",
    price: 100,
    offPrice: 85,
    rating: 4.1,
    color: "Grey",
    size: "L",
    hot: false,
  },
  {
    id: 7,
    name: "Polo Shirt",
    price: 160,
    offPrice: 140,
    rating: 4.3,
    color: "White",
    size: "M",
    hot: true,
  },
  {
    id: 8,
    name: "Chinos",
    price: 210,
    offPrice: 180,
    rating: 3.7,
    color: "Khaki",
    size: "L",
    hot: false,
  },
  {
    id: 9,
    name: "Graphic T-Shirt",
    price: 90,
    offPrice: 75,
    rating: 4.6,
    color: "Black",
    size: "S",
    hot: false,
  },
  {
    id: 10,
    name: "Summer Shorts",
    price: 130,
    offPrice: 100,
    rating: 4.4,
    color: "Green",
    size: "M",
    hot: true,
  },
  {
    id: 11,
    name: "Casual Blazer",
    price: 400,
    offPrice: 350,
    rating: 4.8,
    color: "Navy",
    size: "XL",
    hot: true,
  },
  {
    id: 12,
    name: "Jogger Pants",
    price: 180,
    offPrice: 150,
    rating: 4.2,
    color: "Grey",
    size: "M",
    hot: false,
  },
  {
    id: 13,
    name: "Winter Coat",
    price: 500,
    offPrice: 450,
    rating: 5.0,
    color: "Black",
    size: "XL",
    hot: true,
  },
];


export default function Navbar() {
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [showHotDeals, setShowHotDeals] = useState(false);
  const [priceFilters, setPriceFilters] = useState({
    "100-200": false,
    "300-400": false,
    "400-500": false,
  });
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [searchName, setSearchName] = useState("");

  const handleCheckboxChange = (stateUpdater, value) => {
    stateUpdater((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handlePriceChange = (range) => {
    setPriceFilters((prev) => ({ ...prev, [range]: !prev[range] }));
  };

  const matchesPrice = (product) => {
    const effectivePrice = showDiscounted ? product.offPrice : product.price;

    const checkboxMatch =
      !Object.values(priceFilters).includes(true) ||
      Object.entries(priceFilters).some(([range, isChecked]) => {
        if (!isChecked) return false;
        const [min, max] = range.split("-").map(Number);
        return effectivePrice >= min && effectivePrice <= max;
      });

    const manualMatch =
      (!minPrice || effectivePrice >= parseFloat(minPrice)) &&
      (!maxPrice || effectivePrice <= parseFloat(maxPrice));

    return checkboxMatch && manualMatch;
  };

  const matchesAllFilters = (product) => {
    return (
      matchesPrice(product) &&
      (selectedColors.length === 0 || selectedColors.includes(product.color)) &&
      (selectedSizes.length === 0 || selectedSizes.includes(product.size)) &&
      (selectedRatings.length === 0 ||
        selectedRatings.some((r) => Math.floor(product.rating) >= r)) &&
      product.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (!showHotDeals || product.hot)
    );
  };

  const filteredProducts = productsData.filter(matchesAllFilters);

  const allColors = [...new Set(productsData.map((p) => p.color))];
  const allSizes = [...new Set(productsData.map((p) => p.size))];
  const allRatings = [5, 4, 3];

  return (
    <div className="navbarsectio">
      {/* NAVBAR */}
      <nav className="sectioncontainer">
        <div className="containoutercontener">
          <div className="textxlfontbold">MyStore</div>
          <ul className="flex space-x-6">
            <li className="textcursorpointer">Home</li>
            <li className="hovertex">Shop</li>
            <li className=" curspinter">Cart</li>
            <li className="hoveter">Contact</li>
          </ul>
        </div>
      </nav>

      <div className="fmflowga">
        {/* FILTER SECTION */}
        <div className="fulshadow">
          <h3 className="textlg">Filters</h3>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="mboounded"
          />

          {/* Custom Price Filter */}
          <div className="mb">
            <h4 className="fontemibol">Custom Price</h4>
            <div className="flegapmt">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                className="borderounded"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                className="bordounded"
              />
            </div>
          </div>

          {/* Price Ranges */}
          <div className="mb">
            <h4 className="fontsemibold">Price Ranges</h4>
            {Object.keys(priceFilters).map((range) => (
              <div key={range}>
                <input
                  type="checkbox"
                  checked={priceFilters[range]}
                  onChange={() => handlePriceChange(range)}
                />
                <label className="ml">{range}</label>
              </div>
            ))}
          </div>

          {/* Colors */}
          <div className="mb-4">
            <h4 className="fontsemibold">Color</h4>
            {allColors.map((color) => (
              <div key={color}>
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() => handleCheckboxChange(setSelectedColors, color)}
                />
                <label className="ml">{color}</label>
              </div>
            ))}
          </div>

          {/* Sizes */}
          <div className="mb">
            <h4 className="fontsemibold">Size</h4>
            {allSizes.map((size) => (
              <div key={size}>
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleCheckboxChange(setSelectedSizes, size)}
                />
                <label className="ml">{size}</label>
              </div>
            ))}
          </div>

          {/* Rating */}
          <div className="mb">
            <h4 className="fontsemibold">Rating</h4>
            {allRatings.map((rating) => (
              <div key={rating}>
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleCheckboxChange(setSelectedRatings, rating)}
                />
                <label className="ml">{rating}+ Stars</label>
              </div>
            ))}
          </div>

          {/* Hot Deals */}
          <div className="mb">
            <input
              type="checkbox"
              checked={showHotDeals}
              onChange={() => setShowHotDeals(!showHotDeals)}
            />
            <label className=" fontsemibold">Hot Deals</label>
          </div>

          {/* Show Discounted Toggle */}
          <div className="mb">
            <input
              type="checkbox"
              checked={showDiscounted}
              onChange={() => setShowDiscounted(!showDiscounted)}
            />
            <label className="fontsemibold">Show Discounted Prices</label>
          </div>
        </div>

        {/* PRODUCT SECTION */}
        <div className="full">
          {filteredProducts.map((product) => (
            <div key={product.id} className="boshadow">
              <h3 className=" fontsemi">{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Discounted: ${product.offPrice}</p>
              <p>Rating: ⭐ {product.rating}</p>
              <p>Color: {product.color}</p>
              <p>Size: {product.size}</p>
              {product.hot && (
                <span className="fontsemibold">🔥 Hot Deal!</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
