import React from "react";

const TableHeader = () => {
  return (
    <tr>
      <th className="td--is-visible-fullhd"> Účastník </th>

      <th className="td--is-hidden-fullhd"> # </th>

      <th className="td--is-hidden-fullhd"> Meno </th>

      <th className="td--is-hidden-fullhd"> Priezvisko </th>

      <th className="td--is-hidden-desktop"> Vek </th>

      <th className="td--is-hidden-fullhd"> Email </th>

      <th colSpan="2" className="has-text-centered">
        Práva
      </th>

      <th colSpan="2" className="td--is-hidden-tablet-xl">
        Izba
      </th>

      <th className="td--is-visible-tablet-xl" />
    </tr>
  );
};

export default TableHeader;
