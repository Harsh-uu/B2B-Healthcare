export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  condition: string;
  status: PatientStatus;
  lastVisit: string;
  department: string;
  phone: string;
  email: string;
  admittedDate: string;
}

export type PatientStatus = "Stable" | "Moderate" | "Critical";

export interface KPICard {
  title: string;
  value: number;
  change: number;
  icon: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "critical";
  timestamp: string;
  read: boolean;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}
