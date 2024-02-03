import React from "react";
import Header from "./Header";

// Define a type for the `Table` component's props
interface TableProps {
  loading?: boolean;
  dataHeader: { key: string; label: string; sort?: boolean }[];
  handleSort: (tkey: string, direction: "asc" | "desc") => void;
  direction: "asc" | "desc";
  field: string;
  children?: React.ReactNode;
}

function Table({
  loading,
  dataHeader,
  handleSort,
  direction,
  field,
  children,
}: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table
        className={`block md:table w-full text-sm text-left text-gray-500`}
      >
        <Header
          data={dataHeader}
          handleSort={handleSort}
          direction={direction}
          field={field}
        ></Header>
        <tbody className="block md:table-row-group">{children}</tbody>
      </table>
    </div>
  );
}

export default Table;
