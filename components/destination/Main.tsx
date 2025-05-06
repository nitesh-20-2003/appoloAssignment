"use client";

import React from "react";
import { ComboboxDemo } from "./MainFilters";
import { BreadcrumbWithCustomSeparator } from "./BreadCrumbs";
import ProductsList from "./DoctorsList";

const Main = () => {
  return (
    <main className="col-span-9 p-6">
      <BreadcrumbWithCustomSeparator />
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Consult General Physicians Online - Internal Medicine Specialists
        </h1>
        <ComboboxDemo />
      </div>
      <ProductsList />
    </main>
  );
};

export default Main;
