import { Loader2 } from "lucide-react";
import { useUsers } from "../../context/UsersProvider";
import Counts from "./Counts";

const DashboardUsers = () => {
  const { users, isError, isLoading } = useUsers();

  return (
    <div className="w-full flex flex-col p-4">
      <Counts />

      {/* Loading State */}
      {isLoading && (
        <div className="h-full w-full grid place-items-center">
          <Loader2 className="spin" />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <p className="text-center text-red-500">Failed to fetch users.</p>
      )}

      {/* Users Table */}
      {!isLoading && users && users.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left text-gray-600">#</th>
                <th className="px-4 py-2 text-left text-gray-600">Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Email</th>
                <th className="px-4 py-2 text-left text-gray-600">
                  Added Time
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 text-gray-500">
                    {new Date(user.createdAt)
                      .toLocaleDateString()
                      .replace(/\//g, ".")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Users State */}
      {!isLoading && users?.length === 0 && (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default DashboardUsers;
