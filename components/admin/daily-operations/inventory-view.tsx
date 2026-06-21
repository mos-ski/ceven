"use client";

import { ChevronDown, MoreVertical, PackagePlus, Search } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  INVENTORY_CATEGORIES,
  INVENTORY_ITEMS,
  type InventoryItem,
  type InventoryStatus,
} from "@/lib/mock-data/daily-operations";

const STATUS_BADGE_CLASS: Record<InventoryStatus, string> = {
  "In Stock": "border-transparent bg-badge-success-bg text-success-text",
  "Low Stock": "border-transparent bg-[#fff6e6] text-[#cc8000]",
  "Out of Stock": "border-transparent bg-[#fde8e8] text-[#ef4444]",
};

function FilterDropdown({ label, options }: { label: string; options: string[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="h-8 gap-2 rounded-lg border-input-border bg-white px-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#454B54]"
          />
        }
      >
        {label}
        <ChevronDown className="size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AddRestockModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add / Restock Item</DialogTitle>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Add a new supply item or update stock for an existing one.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="inv-name">Item Name</Label>
            <Input id="inv-name" placeholder="e.g. Diapers (Size 3)" className="h-9" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="inv-category">Category</Label>
              <select
                id="inv-category"
                defaultValue=""
                className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
              >
                <option value="" disabled>
                  Select category
                </option>
                {INVENTORY_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="inv-unit">Unit</Label>
              <Input id="inv-unit" placeholder="e.g. pcs, bottles, packs" className="h-9" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="inv-quantity">Quantity to Add</Label>
              <Input id="inv-quantity" type="number" min={0} placeholder="0" className="h-9" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="inv-reorder">Reorder Level</Label>
              <Input id="inv-reorder" type="number" min={0} placeholder="0" className="h-9" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="inv-notes">Notes</Label>
            <textarea
              id="inv-notes"
              rows={3}
              placeholder="Supplier, batch number, or other notes..."
              className="resize-none rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button
                variant="outline"
                className="h-9 rounded-lg border-[#d0d5dd] px-4 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]"
              />
            }
          >
            Cancel
          </DialogClose>
          <Button
            onClick={() => onOpenChange(false)}
            className="h-9 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
          >
            Save Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function InventoryRow({ item }: { item: InventoryItem }) {
  return (
    <TableRow className="border-table-border">
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">
        {item.name}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {item.category}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {item.quantity} {item.unit}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {item.reorderLevel} {item.unit}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {item.lastRestocked}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={STATUS_BADGE_CLASS[item.status]}>
          {item.status}
        </Badge>
      </TableCell>
      <TableCell>
        <button className="flex items-center justify-center text-[#6b7280] hover:text-[#2d1810]">
          <MoreVertical className="h-4 w-4" />
        </button>
      </TableCell>
    </TableRow>
  );
}

const statsCards = [
  { value: String(INVENTORY_ITEMS.length).padStart(2, "0"), label: "tracked items", title: "Total Items" },
  { value: String(INVENTORY_ITEMS.filter((i) => i.status === "In Stock").length).padStart(2, "0"), label: "well stocked", title: "In Stock" },
  { value: String(INVENTORY_ITEMS.filter((i) => i.status === "Low Stock").length).padStart(2, "0"), label: "reorder soon", title: "Low Stock" },
  { value: String(INVENTORY_ITEMS.filter((i) => i.status === "Out of Stock").length).padStart(2, "0"), label: "need restock", title: "Out of Stock" },
];

export function InventoryView() {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          onClick={() => setAddOpen(true)}
          className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
        >
          <PackagePlus className="h-4 w-4" />
          Add / Restock Item
        </Button>
      </div>

      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
        {statsCards.map((card) => (
          <div
            key={card.title}
            className="min-w-[160px] snap-start flex-1 flex-col gap-1 rounded-xl border border-[#e6ebf3] bg-white p-4"
          >
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{card.title}</p>
            <p className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
              {card.value}
            </p>
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Inventory & Supplies
          </h2>
          <div className="flex items-center gap-2">
            <FilterDropdown label="All Categories" options={["All Categories", ...INVENTORY_CATEGORIES]} />
            <FilterDropdown label="All Status" options={["All Status", "In Stock", "Low Stock", "Out of Stock"]} />
            <div className="relative">
              <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-[#9ca3af]" />
              <Input
                placeholder="Search items..."
                className="h-8 w-full sm:w-56 rounded-lg border-[rgba(45,24,16,0.12)] bg-[#f5edd8] pl-8 text-xs"
              />
            </div>
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <Table>
            <TableHeader>
              <TableRow className="border-none bg-table-header-bg hover:bg-table-header-bg">
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reorder Level</TableHead>
                <TableHead>Last Restocked</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVENTORY_ITEMS.map((item) => (
                <InventoryRow key={item.id} item={item} />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile card list */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {INVENTORY_ITEMS.map((item) => (
            <div key={item.id} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                  {item.name}
                </span>
                <Badge variant="outline" className={STATUS_BADGE_CLASS[item.status]}>
                  {item.status}
                </Badge>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{item.category}</span>
                <span className="text-[#d0d5dd]">•</span>
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                  {item.quantity} {item.unit}
                </span>
              </div>
              <p className="mt-1 font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
                Restocked {item.lastRestocked}
              </p>
            </div>
          ))}
        </div>
      </div>

      <AddRestockModal open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
