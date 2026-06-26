"use client";

import { ChevronDown, MoreVertical, PackagePlus, Search, Wrench, FileBox } from "lucide-react";
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
  EQUIPMENT_ITEMS,
  INVENTORY_CATEGORIES,
  INVENTORY_ITEMS,
  SUPPLY_ORDERS,
  type EquipmentItem,
  type EquipmentStatus,
  type InventoryItem,
  type InventoryStatus,
  type OrderStatus,
  type SupplyOrder,
} from "@/lib/mock-data/daily-operations";

const STATUS_BADGE_CLASS: Record<InventoryStatus, string> = {
  "In Stock": "border-transparent bg-badge-success-bg text-success-text",
  "Low Stock": "border-transparent bg-[#fff6e6] text-[#cc8000]",
  "Out of Stock": "border-transparent bg-[#fde8e8] text-[#ef4444]",
};

const EQUIPMENT_STATUS_BADGE_CLASS: Record<EquipmentStatus, string> = {
  Serviceable: "border-transparent bg-[#f3f4f6] text-[#454B54]",
  "Repair Needed": "border-transparent bg-[#fde8e8] text-[#ef4444]",
  Monitoring: "border-transparent bg-[#fff6e6] text-[#cc8000]",
};

const ORDER_STATUS_BADGE_CLASS: Record<OrderStatus, string> = {
  Delivered: "border-transparent bg-[#f3f4f6] text-[#454B54]",
  Pending: "border-transparent bg-[#fff6e6] text-[#cc8000]",
};

type InventorySubTab = "Stock Levels" | "Equipment Register" | "Orders";
const SUB_TABS: InventorySubTab[] = ["Stock Levels", "Equipment Register", "Orders"];

function FilterDropdown({
  label,
  options,
  onSelect,
}: {
  label: string;
  options: string[];
  onSelect?: (option: string) => void;
}) {
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
          <DropdownMenuItem key={option} onClick={() => onSelect?.(option)}>
            {option}
          </DropdownMenuItem>
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

function RegisterEquipmentModal({
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
          <DialogTitle>Register New Equipment</DialogTitle>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Add a piece of equipment to the register.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="eq-name">Equipment Name</Label>
            <Input id="eq-name" placeholder="e.g. Changing Table" className="h-9" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="eq-room">Room</Label>
              <Input id="eq-room" placeholder="e.g. Room 1" className="h-9" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="eq-qty">Quantity</Label>
              <Input id="eq-qty" type="number" min={0} placeholder="0" className="h-9" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="eq-purchased">Purchased Date</Label>
              <Input id="eq-purchased" type="date" className="h-9" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="eq-condition">Condition</Label>
              <Input id="eq-condition" placeholder="e.g. Good" className="h-9" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="eq-next-service">Next Service Date</Label>
            <Input id="eq-next-service" type="date" className="h-9" />
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
            Save Equipment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function NewOrderModal({
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
          <DialogTitle>New Order</DialogTitle>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Place a new supply order with a vendor.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="order-supplier">Supplier</Label>
            <Input id="order-supplier" placeholder="e.g. Babies & Kiddies" className="h-9" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="order-items">Items</Label>
            <Input id="order-items" placeholder="e.g. Diapers, Wet Wipes" className="h-9" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="order-qty">Quantity</Label>
              <Input id="order-qty" placeholder="e.g. 50 packs" className="h-9" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="order-cost">Total Cost</Label>
              <Input id="order-cost" placeholder="e.g. ₦120,000" className="h-9" />
            </div>
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
            Place Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function UpdateItemModal({
  item,
  onOpenChange,
}: {
  item: InventoryItem | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={item !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Item</DialogTitle>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Add new stock items to inventory
          </p>
        </DialogHeader>

        {item && (
          <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="update-name">Item Name</Label>
              <Input id="update-name" defaultValue={item.name} className="h-9" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="update-category">Select Category</Label>
              <select
                id="update-category"
                defaultValue={item.category}
                className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
              >
                {INVENTORY_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="update-unit">Item Unit</Label>
              <div className="flex items-center gap-2">
                <Input id="update-unit" type="number" min={0} defaultValue={item.quantity} className="h-9 flex-1" />
                <span className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">{item.unit}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="update-min">Minimum Stock</Label>
                <Input id="update-min" type="number" min={0} defaultValue={item.reorderLevel} className="h-9" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="update-avail">Available Stock</Label>
                <Input id="update-avail" type="number" min={0} defaultValue={item.quantity} className="h-9" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="update-status">Status</Label>
              <select
                id="update-status"
                defaultValue={item.status}
                className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
              >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>
        )}

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
            Save & Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function InventoryRow({ item, onUpdate }: { item: InventoryItem; onUpdate: (item: InventoryItem) => void }) {
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
        <button onClick={() => onUpdate(item)} className="flex items-center justify-center text-[#6b7280] hover:text-[#2d1810]">
          <MoreVertical className="h-4 w-4" />
        </button>
      </TableCell>
    </TableRow>
  );
}

function EquipmentRow({ item }: { item: EquipmentItem }) {
  return (
    <TableRow className="border-table-border">
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">
        {item.name}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">{item.room}</TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {String(item.quantity).padStart(2, "0")}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {item.purchasedDate}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {item.condition}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {item.lastServiced}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {item.nextService}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={EQUIPMENT_STATUS_BADGE_CLASS[item.status]}>
          {item.status}
        </Badge>
      </TableCell>
      <TableCell>
        <button className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#3b2513] underline">
          {item.status === "Serviceable" ? "Update" : "View"}
        </button>
      </TableCell>
    </TableRow>
  );
}

function OrderRow({ order }: { order: SupplyOrder }) {
  return (
    <TableRow className="border-table-border">
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">
        {order.orderDate}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {order.supplier}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">{order.items}</TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {order.quantity}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {order.totalCost}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {order.dateDelivered ?? "—"}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={ORDER_STATUS_BADGE_CLASS[order.status]}>
          {order.status}
        </Badge>
      </TableCell>
      <TableCell>
        {order.status === "Pending" ? (
          <button className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#3b2513] underline">
            Update
          </button>
        ) : null}
      </TableCell>
    </TableRow>
  );
}

const inventoryStatsCards = [
  { value: String(INVENTORY_ITEMS.filter((i) => i.status === "Low Stock" || i.status === "Out of Stock").length).padStart(2, "0"), label: "need reorder", title: "Low Stock Alerts" },
  { value: String(INVENTORY_ITEMS.length).padStart(2, "0"), label: "tracked items", title: "Total Items" },
  { value: "00", label: "this month", title: "Monthly Revenue on Supplies" },
  { value: String(SUPPLY_ORDERS.filter((o) => o.status === "Pending").length).padStart(2, "0"), label: "awaiting delivery", title: "Pending Orders" },
];

function StockLevelsTable({ onUpdate }: { onUpdate: (item: InventoryItem) => void }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
          Stock Levels
        </h2>
        <div className="flex items-center gap-2">
          <FilterDropdown label="All Categories" options={["All Categories", ...INVENTORY_CATEGORIES]} />
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
              <TableHead>Avail Stock</TableHead>
              <TableHead>Min Level</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Last Restocked</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INVENTORY_ITEMS.map((item) => (
              <InventoryRow key={item.id} item={item} onUpdate={onUpdate} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card list */}
      <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
        {INVENTORY_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => onUpdate(item)}
            className="cursor-pointer rounded-xl border border-[#eaecf0] p-3"
          >
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
  );
}

function EquipmentRegisterTable() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
          Equipment Log
        </h2>
        <div className="flex items-center gap-2">
          <FilterDropdown label="All Status" options={["All Status", "Serviceable", "Repair Needed", "Monitoring"]} />
          <FilterDropdown label="Room" options={["Room 1", "Room 2", "Room 3", "Play Room"]} />
          <div className="relative">
            <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-[#9ca3af]" />
            <Input
              placeholder="Search equipment..."
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
              <TableHead>Room</TableHead>
              <TableHead>QTY</TableHead>
              <TableHead>Purchased Date</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Last Serviced</TableHead>
              <TableHead>Next Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {EQUIPMENT_ITEMS.map((item) => (
              <EquipmentRow key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card list */}
      <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
        {EQUIPMENT_ITEMS.map((item) => (
          <div key={item.id} className="rounded-xl border border-[#eaecf0] p-3">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                {item.name}
              </span>
              <Badge variant="outline" className={EQUIPMENT_STATUS_BADGE_CLASS[item.status]}>
                {item.status}
              </Badge>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{item.room}</span>
              <span className="text-[#d0d5dd]">•</span>
              <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{item.condition}</span>
            </div>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
              Next service {item.nextService}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersTable() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
          Order History
        </h2>
        <div className="flex items-center gap-2">
          <FilterDropdown label="All Status" options={["All Status", "Delivered", "Pending"]} />
          <div className="relative">
            <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-[#9ca3af]" />
            <Input
              placeholder="Search orders..."
              className="h-8 w-full sm:w-56 rounded-lg border-[rgba(45,24,16,0.12)] bg-[#f5edd8] pl-8 text-xs"
            />
          </div>
        </div>
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-table-header-bg hover:bg-table-header-bg">
              <TableHead>Order Date</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>QTY</TableHead>
              <TableHead>Total Cost</TableHead>
              <TableHead>Date Delivered</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SUPPLY_ORDERS.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card list */}
      <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
        {SUPPLY_ORDERS.map((order) => (
          <div key={order.id} className="rounded-xl border border-[#eaecf0] p-3">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                {order.supplier}
              </span>
              <Badge variant="outline" className={ORDER_STATUS_BADGE_CLASS[order.status]}>
                {order.status}
              </Badge>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{order.items}</span>
              <span className="text-[#d0d5dd]">•</span>
              <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{order.quantity}</span>
            </div>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
              {order.orderDate} • {order.totalCost}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InventoryView() {
  const [subTab, setSubTab] = useState<InventorySubTab>("Stock Levels");
  const [addOpen, setAddOpen] = useState(false);
  const [equipmentOpen, setEquipmentOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [updatingItem, setUpdatingItem] = useState<InventoryItem | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-end gap-3">
        {subTab !== "Orders" && (
          <Button
            onClick={() => setAddOpen(true)}
            variant="outline"
            className="h-9 gap-2 rounded-lg border-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#3b2513]"
          >
            <PackagePlus className="h-4 w-4" />
            Add Item
          </Button>
        )}
        {subTab === "Equipment Register" && (
          <Button
            onClick={() => setEquipmentOpen(true)}
            className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
          >
            <Wrench className="h-4 w-4" />
            Register New Equipment
          </Button>
        )}
        {subTab !== "Equipment Register" && (
          <Button
            onClick={() => setOrderOpen(true)}
            className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
          >
            <FileBox className="h-4 w-4" />
            New Order
          </Button>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
        {inventoryStatsCards.map((card) => (
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

      <div className="flex overflow-x-auto border-b border-[#e6ebf3]">
        {SUB_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`whitespace-nowrap px-4 py-2 text-sm font-medium font-[family-name:var(--font-urbanist)] cursor-pointer ${
              subTab === tab
                ? "border-b-2 border-[#3b2513] text-[#3b2513]"
                : "text-[#6b7280] hover:text-[#2d1810]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {subTab === "Stock Levels" && <StockLevelsTable onUpdate={setUpdatingItem} />}
      {subTab === "Equipment Register" && <EquipmentRegisterTable />}
      {subTab === "Orders" && <OrdersTable />}

      <AddRestockModal open={addOpen} onOpenChange={setAddOpen} />
      <RegisterEquipmentModal open={equipmentOpen} onOpenChange={setEquipmentOpen} />
      <NewOrderModal open={orderOpen} onOpenChange={setOrderOpen} />
      <UpdateItemModal item={updatingItem} onOpenChange={(open) => !open && setUpdatingItem(null)} />
    </div>
  );
}
