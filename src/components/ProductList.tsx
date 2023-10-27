import {
  MagnifyingGlassIcon,
  ComputerDesktopIcon,
  SparklesIcon,
  PlusIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fakeStore from "../api";
import Star from "../icons/Star";
import { Product } from "../types/types";
import { classNames } from "../Utils/utilityComponants";
import Loader from "./Loader";

const categories = [
  { Icon: ComputerDesktopIcon, name: "Electronics" },
  { Icon: SparklesIcon, name: "Jewelery" },
  { Icon: SparklesIcon, name: "Men's clothing" },
  { Icon: SparklesIcon, name: "Women's clothing" },
];

const ProductList = () => {
  const [search, setSearch] = useState({ text: "" });
  const [products, setProducts] = useState<Product[]>();
  const [asideView, setAsideView] = useState(false);

  console.log(products);

  async function getProducts() {
    const productsArr = await fakeStore.getAllProducts();
    setProducts(productsArr);
  }

  useEffect(() => {
    if (!products) getProducts();
  }, [products]);

  async function getProductByCategory(category: string) {
    const productsArr = await fakeStore.getProductByCategory(
      category.toLowerCase()
    );
    if (Array.isArray(productsArr)) setProducts(productsArr);
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.length < 1) getProducts();
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (search.text.length < 1) getProducts();
    setProducts(filterProducts(search.text));
  };

  function filterProducts(text: string) {
    const filtered = products?.filter((object) => {
      const regex = new RegExp(`\\b${text}\\w*\\b`, "gi");

      if (object.title.match(regex) || object.description.match(regex))
        return object;
    });
    return filtered;
  }

  return (
    <div className="flex flex-row w-full mt-14">
      <button
        className="ml-4 fixed z-50 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:hidden"
        onClick={() => setAsideView(asideView ? false : true)}
      >
        {!asideView ? "Filters Menu" : "Close Menu"}
      </button>

      <div
        className={classNames(asideView ? "block" : "hidden", "w-96  md:block")}
      >
        <div className="fixed z-30 h-screen w-[288px] bg-gray-800 shadow-2xl shadow-gray-400  -mt-8 md:-mt-6 lg:mt-9">
          <div>
            <ul className="w-full grid-cols-2 gap-4 mt-6 p-4">
              {/* seaarch bar */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-1 items-center justify-center mb-6"
              >
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-indigo-300"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="text"
                      name="text"
                      value={search.text}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                      placeholder="Search"
                      type="text"
                    />
                  </div>
                </div>
                {/* <div
                  onClick={getProducts}
                  className="w-16 bg-indigo-400 rounded-md ml-1 py-[18px]"
                >
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <ArrowPathIcon
                        className="h-5 w-5 ml-[15px] text-zinc-800"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div> */}
              </form>

              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-400" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-gray-800 px-2 text-gray-400">
                    <PlusIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
              {categories.map(({ Icon, name }) => (
                <li
                  onClick={() => getProductByCategory(name)}
                  className="relative  bg-gray-700 flex flex-row cursor-pointer mt-4 p-[5px] rounded-md"
                >
                  <div className="w-full sm:max-w-xs">
                    <p className="ml-9 text-zinc-100">{name}</p>
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Icon
                        className="h-5 w-5 text-indigo-300"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-center w-full pt-10">
        {products ? (
          products.map((product: Product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="relative bg-white m-4 w-80 h-96 shadow-lg shadow-gray-300 rounded-md"
            >
              {/* Image */}
              <div className="p-5 flex flex-row justify-center border-b-[1px] h-40">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-fit"
                />
              </div>

              {/* title, price */}

              <ul className="flex flex-row justify-evenly my-2">
                <li className="px-4 font-semibold">${product.price}</li>

                <li className="px-4 flex flex-row">
                  <div className="flex flex-row mt-1 mr-1">
                    {Array(Math.floor(product.rating.rate)).fill(
                      <Star color="gold" />
                    )}
                    {Array(5 - Math.floor(product.rating.rate)).fill(
                      <Star color="gray" />
                    )}
                  </div>
                  •
                  <span className="ml-1 text-blue-700">
                    {product.rating.count}
                  </span>
                </li>
              </ul>
              <div className="text-center mt-2 py-4 font-semibold px-4 border-t-[1px] truncate">
                {product.title}
              </div>
              <p className="absolute top-2 right-2 text-[11px] font-semibold bg-gradient-to-r from-indigo-200 to-indigo-400  px-2 rounded-md">
                {product.category}
              </p>

              <div className="relative h-20 ">
                <p className="mx-6 h-full py-1 text-gray-600 overflow-hidden">
                  {product.description}{" "}
                </p>
                <button className="bg-gradient-to-tl from-white via-white  py-2 pl-10 absolute z-10 right-6 bottom-1 text-underline text-blue-700 hover:underline">
                  ...more
                </button>
              </div>
            </Link>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default ProductList;
