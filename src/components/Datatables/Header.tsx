
// Define a type for the `HeaderSort` component's props
interface HeaderSortProps {
  tkey: string;
  label: string;
  // field: string;
  // direction: "asc" | "desc";
  // handleSort: (tkey: string, direction: "asc" | "desc") => void;
}

// Define a type for the `Header` component's props
interface HeaderProps {
  data: { key: string; label: string; sort?: boolean }[];
  // handleSort: (tkey: string, direction: "asc" | "desc") => void;
  // direction: "asc" | "desc";
  // field: string;
}

function HeaderSort({ tkey, label,  }: HeaderSortProps) {
  return (
    <>
      <div
        className=" see inline-flex cursor-pointer w-full justify-between"
        // onClick={() => handleSort(tkey, direction)}
      >
        <span>{label}</span>

        {/* Sorter Icon */}
        {/* DESC Icon */}
        {/* {field === tkey && direction === "desc" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
            />
          </svg>
        )} */}

        {/* ASC Icon */}
        {label === tkey && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 see"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
            />
          </svg>
        )}
      </div>
    </>
  );
}


function Header({ data,  }: HeaderProps) {
  return (
    <>
      <thead className="hidden bg-slate-100 md:table-header-group text-gray-600">
        <tr className="block md:table-row">
          {data.map((row) => (
            <th
              scope="col"
              key={row.key}
              className={`py-3 px-4 block md:table-cell font-semibold text-xs uppercase  `}
            >
              {!row.sort ? (
                <span>{row.label}</span>
              ) : (
                <HeaderSort
                  label={row.label}
                  // handleSort={handleSort}
                  tkey={row.key}
                  // direction={direction}
                  // field={field}
                />
              )}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
}

export default Header;