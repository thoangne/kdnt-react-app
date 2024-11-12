import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <p>Dashboard</p>
      <Link to="/products" className="underline">
        go to product
      </Link>
    </div>
  );
}
