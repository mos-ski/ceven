"use client";

import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Filter, ArrowUpDown, Printer, Download } from "lucide-react";

export type Column<T> = {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  title?: string;
  actions?: React.ReactNode;
  onRowClick?: (row: T) => void;
};

export function DataTable<T extends { id: string }>({
  columns,
  data,
  title,
  actions,
  onRowClick,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      Object.values(row).some((v) =>
        String(v).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleAll = () => {
    if (selected.length === paged.length) {
      setSelected([]);
    } else {
      setSelected(paged.map((r) => r.id));
    }
  };

  const toggleOne = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      {title && (
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-base font-bold text-gray-800">{title}</h3>
          <div className="flex items-center gap-2">{actions}</div>
        </div>
      )}

      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#3B2513] focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
          <Filter className="h-4 w-4" />
          Filter
        </button>
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          Sort by:
          <select className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-700">
            <option>Most recent</option>
            <option>Oldest</option>
          </select>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
          <Download className="h-4 w-4" />
          Export as
        </button>
        <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
          <Printer className="h-4 w-4" />
          Print
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-5 py-3">
                <input
                  type="checkbox"
                  checked={selected.length === paged.length && paged.length > 0}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer"
                onClick={() => onRowClick?.(row)}
              >
                <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selected.includes(row.id)}
                    onChange={() => toggleOne(row.id)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </td>
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-3 text-sm text-gray-700">
                    {col.render
                      ? col.render(row)
                      : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-700"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`h-8 w-8 rounded-lg text-sm font-medium ${
                page === i + 1
                  ? "bg-[#3B2513] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || totalPages === 0}
          className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
