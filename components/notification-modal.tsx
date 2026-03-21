"use client";

import { useEffect, useRef } from "react";
import { X, Bell, AlertTriangle, Info, Clock } from "lucide-react";
import { notifications } from "@/data/patients";
import { Notification } from "@/types";
import { Button } from "@/components/ui/button";

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
}

function NotificationRow({ notification }: { notification: Notification }) {
  const iconMap = {
    critical: <AlertTriangle size={16} className="text-danger" />,
    warning: <AlertTriangle size={16} className="text-warning" />,
    info: <Info size={16} className="text-primary" />,
  };

  const bgMap = {
    critical: "bg-danger-light",
    warning: "bg-warning-light",
    info: "bg-primary-light",
  };

  const ts = new Date(notification.timestamp);
  const timeStr = ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateStr = ts.toLocaleDateString([], { month: "short", day: "numeric" });

  return (
    <div
      className={`flex items-start gap-3 p-4 border-b border-border last:border-b-0 transition-colors ${
        !notification.read ? "bg-primary-light/30" : "hover:bg-gray-50"
      }`}
    >
      <div className={`p-2 ${bgMap[notification.type]} shrink-0`}>
        {iconMap[notification.type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-text">{notification.title}</p>
          {!notification.read && (
            <span className="w-2 h-2 bg-primary rounded-full mt-1.5 shrink-0" />
          )}
        </div>
        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{notification.message}</p>
        <div className="flex items-center gap-1 mt-2">
          <Clock size={11} className="text-text-muted" />
          <span className="text-[11px] text-text-muted">
            {dateStr} at {timeStr}
          </span>
        </div>
      </div>
    </div>
  );
}

export function NotificationModal({ open, onClose }: NotificationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-[10vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-surface border border-border w-full max-w-lg max-h-[70vh] flex flex-col shadow-xl animate-slideUp"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold text-text uppercase tracking-wide">
              Notifications
            </h2>
            {unreadCount > 0 && (
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-danger text-white rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 text-text-secondary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-16 text-center">
              <Bell size={32} className="mx-auto text-text-muted mb-3" />
              <p className="text-sm text-text-secondary">No notifications yet</p>
            </div>
          ) : (
            notifications.map((n) => <NotificationRow key={n.id} notification={n} />)
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <Button variant="ghost" size="sm">
            Mark all as read
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
