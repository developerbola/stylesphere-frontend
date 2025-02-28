import { Package, Users } from "lucide-react";
import { useProducts } from "../../context/ProductsProvider";
import { useEffect, useState } from "react";
import { api } from "../../api/api";

function Counts() {
  const { products } = useProducts();
  const [users, setUsers] = useState<number | null>(0);
  useEffect(() => {
    async function fetchgetUsers() {
      const data = await api.getUsers();
      const count = Array.isArray(data) ? data.length : 0;
      setUsers(count);
    }

    fetchgetUsers();
  }, []);
  return (
    <section className="flex items-center justify-start gap-2">
      <div className="max-w-[300px] h-[50px] text-white p-4 bg-gray-950 rounded-lg flex items-center gap-2">
        <Users size={27} />
        <p className="text-lg font-bold">{users}</p>
      </div>
      <div className="max-w-[300px] h-[50px] text-white p-4 bg-gray-950 rounded-lg flex items-center gap-2">
        <Package size={27} />
        <p className="text-lg font-bold">{products ? products.length : "0"}</p>
      </div>
    </section>
  );
}

export default Counts;
