"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BarChart3, Users, Settings, HelpCircle, X } from "lucide-react";
import { useUIStore } from "@/store/ui-store";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/patients", label: "Patients", icon: Users },
];

const bottomItems = [
  { href: "#", label: "Settings", icon: Settings },
  { href: "#", label: "Help & Support", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-60 bg-surface border-r border-border flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-14 px-5 border-b border-border">
          <span className="text-base font-bold tracking-tight text-text">MedDash</span>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1 hover:bg-gray-100 text-text-secondary"
          >
            <X size={18} />
          </button>
        </div>

        {/* Main nav */}
        <nav className="flex-1 px-3 pt-4 space-y-0.5">
          <p className="px-3 mb-2 text-[10px] font-semibold text-text-muted uppercase tracking-widest">
            Main Menu
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={`flex items-center gap-3 px-3 py-2 text-[13px] font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:bg-gray-50 hover:text-text"
                }`}
              >
                <item.icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom nav */}
        <div className="px-3 pb-3 space-y-0.5">
          <div className="border-t border-border mb-3" />
          {bottomItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-text-secondary hover:bg-gray-50 hover:text-text transition-colors"
            >
              <item.icon size={18} strokeWidth={1.8} />
              {item.label}
            </Link>
          ))}
          <div className="mt-3 px-3 py-2">
            <p className="text-[10px] text-text-muted">MedDash v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
