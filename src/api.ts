import axios from "axios";
import { Product } from "./types/types";

class fakeStore {
	static async request(endpoint: string, data = {}, method = "get") {
		const url = `https://fakestoreapi.com/${endpoint}`;
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params })).data;
		} catch (err) {
			console.error("API Error:", err);
		}
	}

	static async getAllProducts(): Promise<Product[]> {
		const res = await this.request("products");
		return res;
	}

	static async getProductById(id: string): Promise<Product> {
		const res = await this.request(`products/${id}`);
		return res;
	}
}

export default fakeStore;
