import React from "react";
import Navbar from "../features/navbar/Nav";
import ProductsList from "../features/product-list/ProductsList";

export default function Home() {
  return (
    <div>
      <Navbar>
        <ProductsList />
      </Navbar>
    </div>
  );
}
