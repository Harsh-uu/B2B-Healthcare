"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { patients, notifications } from "@/data/patients";
import {
  Users,
  UserCheck,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Clock,
  Bed,
  Stethoscope,
} from "lucide-react";
import { Notification as NotificationType } from "@/types";
import { NotificationButton } from "@/components/notification-button";
import Link from "next/link";

const kpiData = [
  {
    title: "Total Patients",
    value: patients.length,
    change: 12,
    icon: Users,
    color: "text-primary",
    bg: "bg-primary-light",
  },
  {
    title: "Active Cases",
    value: patients.filter((p) => p.status !== "Stable").length,
    change: 5,
    icon: UserCheck,
    color: "text-warning",
    bg: "bg-warning-light",
  },
  {
    title: "Critical Alerts",
    value: patients.filter((p) => p.status === "Critical").length,
    change: -2,
    icon: AlertTriangle,
    color: "text-danger",
    bg: "bg-danger-light",
  },
  {
    title: "Bed Occupancy",
    value: 78,
    change: 3,
    icon: Bed,
    color: "text-primary",
    bg: "bg-primary-light",
    suffix: "%",
  },
];

function NotificationItem({ notification }: { notification: NotificationType }) {
  const iconMap = {
    info: "bg-primary-light text-primary",
    warning: "bg-warning-light text-warning",
    critical: "bg-danger-light text-danger",
  };

  const ts = new Date(notification.timestamp);
  const timeStr = ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      className={`flex items-start gap-3 px-3 py-2.5 border-b border-border last:border-b-0 ${
        !notification.read ? "bg-primary-light/30" : ""
      }`}
    >
      <div className={`p-1.5 ${iconMap[notification.type]} shrink-0`}>
        <Bell size={12} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-text leading-tight">{notification.title}</p>
        <p className="text-[11px] text-text-muted mt-0.5 line-clamp-1">{notification.message}</p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <Clock size={10} className="text-text-muted" />
        <span className="text-[10px] text-text-muted">{timeStr}</span>
        {!notification.read && <span className="w-1.5 h-1.5 bg-primary rounded-full" />}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const recentPatients = patients.slice(0, 6);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div>
          <div className="h-7 w-40 bg-gray-200 animate-pulse" />
          <div className="h-4 w-56 bg-gray-200 animate-pulse mt-2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-gray-200 animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 h-72 bg-gray-200 animate-pulse" />
          <div className="h-72 bg-gray-200 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-text">Dashboard</h1>
          <p className="text-xs text-text-muted mt-0.5">
            Today&apos;s overview &middot; {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <NotificationButton />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="p-4">
            <div className="flex items-start justify-between">
              <div className={`p-2 ${kpi.bg}`}>
                <kpi.icon size={18} className={kpi.color} />
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-medium ${
                kpi.change >= 0 ? "text-success" : "text-danger"
              }`}>
                {kpi.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {Math.abs(kpi.change)}%
              </div>
            </div>
            <p className="text-2xl font-bold text-text mt-3">
              {kpi.value}{(kpi as { suffix?: string }).suffix || ""}
            </p>
            <p className="text-xs text-text-muted mt-0.5">{kpi.title}</p>
          </Card>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Avg. Stay", value: "4.2 days", icon: Clock },
          { label: "Discharged Today", value: "7", icon: UserCheck },
          { label: "Pending Consults", value: "12", icon: Stethoscope },
          { label: "New Admissions", value: "5", icon: Users },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-surface border border-border px-4 py-3 flex items-center gap-3"
          >
            <stat.icon size={16} className="text-text-muted shrink-0" />
            <div>
              <p className="text-sm font-semibold text-text">{stat.value}</p>
              <p className="text-[11px] text-text-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Patients Table */}
        <Card className="lg:col-span-2 p-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <CardTitle>Recent Patients</CardTitle>
            <Link href="/patients" className="text-xs text-primary font-medium hover:text-primary-dark">
              View all &rarr;
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Visit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-primary-light flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-primary">
                          {patient.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{patient.name}</p>
                        <p className="text-[11px] text-text-muted">{patient.department}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-text-secondary">{patient.condition}</TableCell>
                  <TableCell>
                    <Badge status={patient.status} />
                  </TableCell>
                  <TableCell className="text-sm text-text-secondary">{patient.lastVisit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Notifications Panel */}
        <Card className="p-0 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <CardTitle>Notifications</CardTitle>
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-danger text-white rounded-full">
              {notifications.filter((n) => !n.read).length}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {notifications.slice(0, 5).map((n) => (
              <NotificationItem key={n.id} notification={n} />
            ))}
          </div>
          <div className="px-5 py-2.5 border-t border-border">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View all notifications
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
