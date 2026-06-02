import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      <ul className="space-y-2">
        <li>
          <Link href="/dashboard/my-requests">My Requests</Link>
        </li>

        <li>
          <Link href="/dashboard/add-pet">Add Pet</Link>
        </li>

        <li>
          <Link href="/dashboard/my-listings">My Listings</Link>
        </li>
      </ul>
    </aside>
  );
}