"use client";
import React from "react";
import Container from "../globals/containers";
import NavSearch from "./NavSearch";
import { Button } from "../ui/button";
import SearchLocation from "./SearchLocation";
import { Separator } from "@radix-ui/react-separator";
import { FaRegUserCircle } from "react-icons/fa";
import { NavigationMenuDemo } from "./navigationMenu";
import Logo from "./Logo";
const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <Container className="flex flex-col sm:flex-row  sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <Logo />
        <SearchLocation />
        <NavSearch />
        {/* Add other navbar items here */}
        <Button variant="outline" className="cursor-pointer h-10 w-32">
          Login <span className="ml-2"><FaRegUserCircle /></span>
        </Button>
      <Separator className="bg-gray-300 h-px w-full my-1" />
        <NavigationMenuDemo />
      </Container>
    </div>
  );
};

export default Navbar;
