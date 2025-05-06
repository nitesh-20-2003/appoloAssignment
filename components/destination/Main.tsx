import React from 'react'
import {ComboboxDemo }from './MainFilters'
import { BreadcrumbWithCustomSeparator } from './BreadCrumbs'
import ProductsList from './DoctorsList'
import { PaginationDemo } from './pagination'
const Main = () => {
  return (
    <main className="col-span-9 p-6">
        <BreadcrumbWithCustomSeparator  />
      <div className=' flex'>
        <h1 className="text-2xl font-bold mb-6">
          Consult General Physicians Online - Internal Medicine Specialists
        </h1>
        <ComboboxDemo />
      </div>

     <ProductsList />
     <PaginationDemo />
    </main>
  );
}

export default Main