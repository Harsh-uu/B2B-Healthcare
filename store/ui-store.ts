import { create } from "zustand";
import { PatientStatus } from "@/types";

interface UIState {
  sidebarOpen: boolean;
  patientView: "grid" | "list";
  patientSearch: string;
  patientStatusFilter: PatientStatus | "All";
  patientPage: number;
  analyticsRange: "7d" | "30d";
  toggleSidebar: () => void;
  setPatientView: (view: "grid" | "list") => void;
  setPatientSearch: (search: string) => void;
  setPatientStatusFilter: (filter: PatientStatus | "All") => void;
  setPatientPage: (page: number) => void;
  setAnalyticsRange: (range: "7d" | "30d") => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  patientView: "grid",
  patientSearch: "",
  patientStatusFilter: "All",
  patientPage: 1,
  analyticsRange: "7d",
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setPatientView: (view) => set({ patientView: view }),
  setPatientSearch: (search) => set({ patientSearch: search, patientPage: 1 }),
  setPatientStatusFilter: (filter) => set({ patientStatusFilter: filter, patientPage: 1 }),
  setPatientPage: (page) => set({ patientPage: page }),
  setAnalyticsRange: (range) => set({ analyticsRange: range }),
}));
