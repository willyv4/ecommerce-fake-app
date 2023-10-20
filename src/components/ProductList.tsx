import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fakeStore from "../api";
import Star from "../icons/Star";
import { Product } from "../types/types";
import { classNames } from "../Utils/utilityComponants";
import Loader from "./Loader";

const categories = [
	"electronics",
	"jewelery",
	"men's clothing",
	"women's clothing",
];

const ProductList = () => {
	const [products, setProducts] = useState<Product[]>();
	const [asideView, setAsideView] = useState(false);

	useEffect(() => {
		async function getProducts() {
			const productsArr = await fakeStore.getAllProducts();
			setProducts(productsArr);
		}

		if (!products) getProducts();
	}, [products]);

	async function getProductByCategory(category: string) {
		const productsArr = await fakeStore.getProductByCategory(category);
		if (Array.isArray(productsArr)) setProducts(productsArr);
	}

	console.log(asideView);

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
				<div className="fixed z-30 h-screen w-[288px] bg-zinc-500 shadow-2xl shadow-zinc-700  -mt-8 md:-mt-6 lg:mt-9">
					<div>
						<ul className="w-full grid-cols-2 gap-4 mt-6 p-4">
							{categories.map((category) => (
								<li
									onClick={() => getProductByCategory(category)}
									className="cursor-pointer mt-4 bg-zinc-50 p-2 rounded-md font-semibold"
								>
									{category}
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
											<Star color="amber" />
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
							<p className="absolute top-2 right-2 text-[12px] font-semibold bg-gradient-to-r from-blue-50 to-blue-200 ring-1 ring-blue-500 px-2 rounded-full">
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
