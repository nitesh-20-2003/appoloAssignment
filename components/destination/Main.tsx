import React, { Suspense } from "react";
import { ComboboxDemo } from "./MainFilters";
import { BreadcrumbWithCustomSeparator } from "./BreadCrumbs";
import DoctorList from "./DoctorsList";

const Main = ({
  filterQuery,
  sortBy,
  onSortChange,
}: {
  filterQuery: string;
  sortBy: string;
  onSortChange: (value: string) => void;
}) => {
  return (
    <main className="col-span-9 p-6">
      <BreadcrumbWithCustomSeparator />
      <div className="flex flex-wrap justify-between items-center mb-6 flex-row">
        <div className="flex items-center flex-wrap">
          <h1 className="text-2xl font-bold">
            Consult General Physicians Online
          </h1>
        </div>

        <ComboboxDemo selectedValue={sortBy} onSelectSort={onSortChange} />
      </div>

      <Suspense fallback={<div>Loading Doctors...</div>}>
        <DoctorList filterQuery={filterQuery} />
      </Suspense>
    </main>
  );
};

export default Main;
