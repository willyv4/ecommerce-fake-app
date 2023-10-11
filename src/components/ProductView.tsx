import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fakeStore from "../api";
import { Product } from "../types/types";
import Loader from "./Loader";

const ProductView = () => {
	const [product, setProduct] = useState<Product | null>(null);
	const { id }: { id?: string | undefined } = useParams();

	useEffect(() => {
		async function getById() {
			if (id) {
				const res = await fakeStore.getProductById(id);
				setProduct(res);
			}
		}

		if (id && !product) getById();
	}, [id, product]);

	console.log(product);

	if (!product) return <Loader />;

	return (
		<div className="mt-14 pt-6 flex flex-row justify-center bg-white h-screen">
			<img className="h-96" src={product.image} alt={product.title} />
		</div>
	);
};

export default ProductView;
