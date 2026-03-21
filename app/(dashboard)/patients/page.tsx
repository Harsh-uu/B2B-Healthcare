"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useUIStore } from "@/store/ui-store";
import { patients } from "@/data/patients";
import { Patient, PatientStatus } from "@/types";
import {
  Search,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Mail,
  Calendar,
  X,
} from "lucide-react";

const ITEMS_PER_PAGE = 8;

const statusFilters: { label: string; value: PatientStatus | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Stable", value: "Stable" },
  { label: "Moderate", value: "Moderate" },
  { label: "Critical", value: "Critical" },
];

function PatientDetailModal({
  patient,
  onClose,
}: {
  patient: Patient;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-[10vh]">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] animate-fadeIn"
        onClick={onClose}
      />
      <div className="relative bg-surface border border-border w-full max-w-md shadow-xl animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {patient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-text">{patient.name}</p>
              <p className="text-xs text-text-muted">ID: {patient.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 text-text-secondary"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">Status</span>
            <Badge status={patient.status} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InfoField label="Age" value={`${patient.age} years`} />
            <InfoField label="Gender" value={patient.gender} />
            <InfoField label="Department" value={patient.department} />
            <InfoField label="Condition" value={patient.condition} />
          </div>

          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Phone size={14} className="text-text-muted" />
              {patient.phone}
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Mail size={14} className="text-text-muted" />
              {patient.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Calendar size={14} className="text-text-muted" />
              Admitted: {patient.admittedDate}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" size="sm">
            Edit Patient
          </Button>
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-text-muted uppercase tracking-wide">{label}</p>
      <p className="text-sm text-text mt-0.5">{value}</p>
    </div>
  );
}

export default function PatientsPage() {
  const {
    patientView,
    patientSearch,
    patientStatusFilter,
    patientPage,
    setPatientView,
    setPatientSearch,
    setPatientStatusFilter,
    setPatientPage,
  } = useUIStore();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(patientSearch.toLowerCase());
      const matchesStatus = patientStatusFilter === "All" || p.status === patientStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [patientSearch, patientStatusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (patientPage - 1) * ITEMS_PER_PAGE,
    patientPage * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-7 w-32 bg-gray-200 animate-pulse" />
        <div className="h-10 w-full bg-gray-200 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-44 bg-gray-200 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-text">Patients</h1>
          <p className="text-xs text-text-muted mt-0.5">
            {filtered.length} total &middot; {patients.filter((p) => p.status === "Critical").length} critical
          </p>
        </div>
        <Button variant="primary" size="sm">
          + Add Patient
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1 w-full sm:w-auto">
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search by name..."
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
              icon={<Search size={16} />}
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setPatientStatusFilter(f.value)}
                className={`px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                  patientStatusFilter === f.value
                    ? "bg-primary text-white"
                    : "bg-white border border-border text-text-secondary hover:bg-gray-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* View toggle with icons */}
        <div className="inline-flex border border-border bg-white">
          <button
            onClick={() => setPatientView("grid")}
            className={`p-2 transition-colors cursor-pointer ${
              patientView === "grid"
                ? "bg-primary text-white"
                : "text-text-secondary hover:bg-gray-50"
            }`}
            title="Grid view"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setPatientView("list")}
            className={`p-2 transition-colors cursor-pointer ${
              patientView === "list"
                ? "bg-primary text-white"
                : "text-text-secondary hover:bg-gray-50"
            }`}
            title="List view"
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <Card className="py-16 text-center">
          <User size={36} className="mx-auto text-text-muted mb-3" />
          <p className="text-sm font-medium text-text-secondary">No patients found</p>
          <p className="text-xs text-text-muted mt-1">Try adjusting your search or filters</p>
        </Card>
      ) : patientView === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {paginated.map((patient) => (
            <Card
              key={patient.id}
              hover
              className="flex flex-col p-4"
              onClick={() => setSelectedPatient(patient)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 bg-primary-light flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <Badge status={patient.status} />
              </div>
              <h3 className="text-sm font-semibold text-text">{patient.name}</h3>
              <p className="text-xs text-text-muted mt-0.5">
                {patient.age} yrs &middot; {patient.gender}
              </p>
              <div className="mt-3 pt-3 border-t border-border space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Condition</span>
                  <span className="text-text-secondary font-medium">{patient.condition}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Department</span>
                  <span className="text-text-secondary font-medium">{patient.department}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Last visit</span>
                  <span className="text-text-secondary">{patient.lastVisit}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Visit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((patient) => (
                <TableRow
                  key={patient.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedPatient(patient)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-light flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-primary">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{patient.name}</p>
                        <p className="text-[11px] text-text-muted">{patient.gender}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-text-secondary text-sm">{patient.age}</TableCell>
                  <TableCell className="text-text-secondary text-sm">{patient.condition}</TableCell>
                  <TableCell className="text-text-secondary text-sm">{patient.department}</TableCell>
                  <TableCell>
                    <Badge status={patient.status} />
                  </TableCell>
                  <TableCell className="text-text-secondary text-sm">{patient.lastVisit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-text-muted">
            Showing {(patientPage - 1) * ITEMS_PER_PAGE + 1}&ndash;
            {Math.min(patientPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPatientPage(patientPage - 1)}
              disabled={patientPage === 1}
              className="p-1.5 text-text-secondary hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setPatientPage(page)}
                className={`w-8 h-8 text-xs font-medium transition-colors cursor-pointer ${
                  patientPage === page
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setPatientPage(patientPage + 1)}
              disabled={patientPage === totalPages}
              className="p-1.5 text-text-secondary hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <PatientDetailModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
}
