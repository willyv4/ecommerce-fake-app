import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fakeStore from "../api";
import Star from "../icons/Star";
import { Product } from "../types/types";
import Loader from "./Loader";

const ProductList = () => {
	const [products, setProducts] = useState<null | Product[]>(null);

	useEffect(() => {
		async function getProducts() {
			const productsArr = await fakeStore.getAllProducts();
			setProducts(productsArr);
		}

		if (!products) getProducts();
	}, [products]);

	if (!products) return <Loader />;

	return (
		<div className="flex flex-row flex-wrap justify-center mt-20">
			{products?.map((product: Product) => (
				<Link
					to={`/products/${product.id}`}
					key={product.id}
					className="bg-white m-4 w-96 h-96 shadow-lg shadow-gray-300 rounded-md"
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

					<ol className="flex flex-row justify-evenly my-2">
						<li className="px-4 font-semibold">${product.price}</li>
						<li className="px-4 flex flex-row">
							<div className="flex flex-row mt-1 mr-1">
								{Array(Math.floor(product.rating.rate)).fill(<Star />)}
							</div>
							•
							<span className="ml-1 text-blue-700">{product.rating.count}</span>
						</li>
					</ol>
					<div className="text-center mt-2 py-4 font-semibold px-4 border-t-[1px] truncate">
						{product.title}
					</div>

					<div className="relative h-20 mt-4">
						<p className="mx-6 h-full py-1 text-gray-600 overflow-hidden">
							{product.description}{" "}
						</p>
						<button className="bg-gradient-to-tl from-white via-white  py-2 pl-10 absolute z-10 right-6 bottom-1 text-underline text-blue-700 hover:underline">
							...more
						</button>
					</div>
				</Link>
			))}
		</div>
	);
};

export default ProductList;
