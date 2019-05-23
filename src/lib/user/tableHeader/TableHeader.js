import React from "react";

const TableHeader = () => {
  return (
    <tr>
      <th>#</th>
      <th>Meno</th>
      <th>Priezvisko</th>
      <th>Vek</th>
      <th>Email</th>
      <th colSpan="2">Práva</th>
      <th>Izba</th>
    </tr>
  );
};

export default TableHeader;
