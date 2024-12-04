import { useEffect, useState } from "react";
import { api } from "../api/api";

const Home: React.FC = () => {
  interface Product {
    _id: string;
    name: string;
    price: number;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const res = await api.getProducts();
      setProducts(res);
    };

    getData();
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name && !price) return;
    setIsLoading(true);
    await api.createProduct({ name, price: price ? +price : 0 });
    setIsLoading(false);
    setName("");
    setPrice("");
  };

  return (
    <div>
      {products.length ? (
        products.map((product) => {
          return (
            <div style={{ display: "flex", gap: "20px" }} key={product._id}>
              <h1>{product.name}</h1>
              <h1>${product.price}</h1>
              <button onClick={() => api.deleteProduct(product._id)}>
                delete
              </button>
            </div>
          );
        })
      ) : (
        <h1>loading...</h1>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={price}
          onChange={(e) => {
            if (isNaN(+e.target.value)) return;
            setPrice(e.target.value);
          }}
          placeholder="Price"
          required
        />
        <button type="submit" disabled={isLoading}>{isLoading ? "loading..." : "submit"}</button>
      </form>
    </div>
  );
};

export default Home;
