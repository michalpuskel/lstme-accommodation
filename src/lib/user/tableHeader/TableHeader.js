import React from "react";

const TableHeader = () => {
  return (
    <tr>
      <th>#</th>
      <th>Meno</th>
      <th>Priezvisko</th>
      <th>Vek</th>
      <th>Email</th>
      <th colSpan="2" className="has-text-centered">
        Práva
      </th>
      <th colSpan="2">Izba</th>
    </tr>
  );
};

export default TableHeader;
