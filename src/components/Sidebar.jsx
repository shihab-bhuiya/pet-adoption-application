'use client'; // Required in Next.js App Router for usePathname()

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, PlusCircle, ListOrdered } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'My Requests', href: '/dashboard/my-requests', icon: FileText },
    { label: 'Add Pet', href: '/dashboard/add-pet', icon: PlusCircle },
    { label: 'My Listings', href: '/dashboard/my-listings', icon: ListOrdered },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 bg-slate-50 border-r border-slate-200 p-4 flex flex-col justify-between">
      <div>
        {/* Header / Brand */}
        <div className="flex items-center gap-2 px-2 py-3 mb-6">
          <LayoutDashboard className="w-6 h-6 text-indigo-600" />
          <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Dashboard</h2>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                      ${isActive
                        ? 'bg-indigo-50 text-indigo-700 font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors
                        ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}
                      `}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}