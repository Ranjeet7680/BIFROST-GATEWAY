"use client";

import React, { Suspense } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#030407]" />}>
      <DashboardLayout initialTab="overview" />
    </Suspense>
  );
}
