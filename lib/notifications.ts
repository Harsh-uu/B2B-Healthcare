export async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      return registration;
    } catch (error) {
      console.error("SW registration failed:", error);
      return null;
    }
  }
  return null;
}

export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    return "denied";
  }
  if (Notification.permission === "granted") {
    return "granted";
  }
  const permission = await Notification.requestPermission();
  return permission;
}

export function sendBrowserNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === "granted") {
    return new Notification(title, {
      icon: "/favicon.ico",
      ...options,
    });
  }
  return null;
}

export function simulateCriticalAlert() {
  return sendBrowserNotification("CRITICAL: Patient Alert", {
    body: "Patient Michael Chen's vitals are dropping rapidly. Immediate attention required in Room 302.",
    tag: "critical-alert",
  });
}
