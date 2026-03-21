"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Menu, Bell, ChevronDown } from "lucide-react";
import { signOut } from "@/services/auth";
import { useAuthStore } from "@/store/auth-store";
import { useUIStore } from "@/store/ui-store";
import { notifications } from "@/data/patients";
import { NotificationModal } from "@/components/notification-modal";

export function Topbar() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { toggleSidebar } = useUIStore();
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }

  return (
    <>
      <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1.5 hover:bg-gray-100 text-text-secondary"
          >
            <Menu size={20} />
          </button>
          <div className="hidden lg:block">
            <p className="text-xs text-text-muted">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Notifications */}
          <button
            onClick={() => setNotifOpen(true)}
            className="relative p-2 hover:bg-gray-100 text-text-secondary transition-colors"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          <div className="h-6 w-px bg-border mx-1" />

          {/* User */}
          <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 transition-colors cursor-default">
            <div className="w-7 h-7 bg-primary flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-white">
                {user?.email?.charAt(0).toUpperCase() || "D"}
              </span>
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-medium text-text leading-none">
                {user?.displayName || "Dr. Admin"}
              </p>
              <p className="text-[11px] text-text-muted leading-none mt-0.5">
                {user?.email || "admin@meddash.com"}
              </p>
            </div>
            <ChevronDown size={14} className="text-text-muted hidden md:block" />
          </div>

          <div className="h-6 w-px bg-border mx-1" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-text-secondary hover:bg-gray-100 hover:text-danger transition-colors"
          >
            <LogOut size={15} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <NotificationModal open={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
}
