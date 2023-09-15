import React from "react";
import Container from "../ui/container";
import Link from "next/link";
import MainNav from "./mainNav";
import getCategories from "@/hooks/api/getCategories";
import NavbarActions from "./navbarActions";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href={"/"} className="text-xl font-bold">
            STORE
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
