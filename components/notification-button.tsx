"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell, BellRing } from "lucide-react";
import {
  registerServiceWorker,
  requestNotificationPermission,
  simulateCriticalAlert,
} from "@/lib/notifications";

export function NotificationButton() {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    registerServiceWorker();
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  async function handleClick() {
    if (permission !== "granted") {
      const result = await requestNotificationPermission();
      setPermission(result);
      if (result !== "granted") return;
    }
    setAnimating(true);
    simulateCriticalAlert();
    setTimeout(() => setAnimating(false), 1000);
  }

  return (
    <Button variant="danger" size="sm" onClick={handleClick} className="gap-1.5">
      {animating ? <BellRing size={14} /> : <Bell size={14} />}
      Simulate Critical Alert
    </Button>
  );
}
