import { Package, Users } from "lucide-react";
import { useProducts } from "../../context/ProductsProvider";
import { useEffect, useState } from "react";
import { api } from "../../api/api";

const DashboardUsers = () => {
  const { products } = useProducts();
  const [users, setUsers] = useState<number | null>(0);
  useEffect(() => {
    async function fetchUsersCount() {
      const data = await api.usersCount();
      setUsers(data);
    }

    fetchUsersCount();
  }, []);
  return (
    <div className="w-full">
      <section className="flex items-center justify-start gap-2">
        <div className="max-w-[300px] h-[50px] text-white p-4 bg-gray-950 rounded-lg flex items-center gap-2">
          <Users size={27} />
          <p className="text-lg font-bold">{users}</p>
        </div>
        <div className="max-w-[300px] h-[50px] text-white p-4 bg-gray-950 rounded-lg flex items-center gap-2">
          <Package size={27} />
          <p className="text-lg font-bold">
            {products ? products.length : "0"}
          </p>
        </div>
      </section>
    </div>
  );
};

export default DashboardUsers;
