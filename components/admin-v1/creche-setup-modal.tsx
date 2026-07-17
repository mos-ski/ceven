"use client";

import { useState, useRef } from "react";
import { X, Plus, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CRECHE_FEATURES,
  NIGERIAN_STATES,
  DEFAULT_OPERATING_HOURS,
} from "@/lib/admin-v1/dashboard-data";

type RoomPricing = {
  name: string;
  ageRange: string;
  slotCapacity: string;
  monthly: string;
  weekly: string;
  fullDay: string;
  halfDay: string;
  hourlyRate: string;
};

type OperatingHour = {
  day: string;
  opening: string;
  closing: string;
  closed: boolean;
};

type SetupFormData = {
  phone: string;
  ageRange: string;
  features: string[];
  state: string;
  lga: string;
  address: string;
  bio: string;
  coverPhoto: File | null;
  images: File[];
  rooms: string[];
  roomPricing: RoomPricing[];
  operatingHours: OperatingHour[];
  privacyPolicy: string;
  businessRegDoc: File | null;
  governmentId: File | null;
  proofOfAddress: File | null;
  staffScreened: boolean;
};

const INITIAL_FORM: SetupFormData = {
  phone: "",
  ageRange: "",
  features: [],
  state: "",
  lga: "",
  address: "",
  bio: "",
  coverPhoto: null,
  images: [],
  rooms: [],
  roomPricing: [],
  operatingHours: [...DEFAULT_OPERATING_HOURS],
  privacyPolicy: "",
  businessRegDoc: null,
  governmentId: null,
  proofOfAddress: null,
  staffScreened: false,
};

type CrecheSetupModalProps = {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
};

export function CrecheSetupModal({ open, onClose, onComplete }: CrecheSetupModalProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<SetupFormData>(INITIAL_FORM);
  const [roomInput, setRoomInput] = useState("");
  const [activeRoomTab, setActiveRoomTab] = useState(0);
  const [featureDropdownOpen, setFeatureDropdownOpen] = useState(false);

  const coverPhotoRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const businessRegRef = useRef<HTMLInputElement>(null);
  const govIdRef = useRef<HTMLInputElement>(null);
  const proofAddressRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const totalSteps = 5;

  const updateForm = <K extends keyof SetupFormData>(key: K, value: SetupFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addRoom = () => {
    if (roomInput.trim()) {
      const newRooms = [...form.rooms, roomInput.trim()];
      updateForm("rooms", newRooms);
      setRoomInput("");
      if (newRooms.length === 1) {
        updateForm("roomPricing", [
          {
            name: roomInput.trim(),
            ageRange: "",
            slotCapacity: "",
            monthly: "",
            weekly: "",
            fullDay: "",
            halfDay: "",
            hourlyRate: "",
          },
        ]);
      }
    }
  };

  const removeRoom = (index: number) => {
    const newRooms = form.rooms.filter((_, i) => i !== index);
    updateForm("rooms", newRooms);
    const newPricing = form.roomPricing.filter((_, i) => i !== index);
    updateForm("roomPricing", newPricing);
    if (activeRoomTab >= newRooms.length) {
      setActiveRoomTab(Math.max(0, newRooms.length - 1));
    }
  };

  const updateRoomPricing = (index: number, field: keyof RoomPricing, value: string) => {
    const newPricing = [...form.roomPricing];
    newPricing[index] = { ...newPricing[index], [field]: value };
    updateForm("roomPricing", newPricing);
  };

  const updateOperatingHour = (index: number, field: keyof OperatingHour, value: string | boolean) => {
    const newHours = [...form.operatingHours];
    newHours[index] = { ...newHours[index], [field]: value };
    updateForm("operatingHours", newHours);
  };

  const toggleFeature = (feature: string) => {
    const features = form.features.includes(feature)
      ? form.features.filter((f) => f !== feature)
      : [...form.features, feature];
    updateForm("features", features);
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      if (step === 1 && form.rooms.length === 0) {
        updateForm("rooms", ["Room 1"]);
        updateForm("roomPricing", [
          {
            name: "Room 1",
            ageRange: "",
            slotCapacity: "",
            monthly: "",
            weekly: "",
            fullDay: "",
            halfDay: "",
            hourlyRate: "",
          },
        ]);
      }
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const stepProgress = (stepNum: number) => {
    if (stepNum < step) return "bg-[#3B2513]";
    if (stepNum === step) return "bg-[#3B2513]";
    return "bg-gray-200";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Complete Creche Setup</h2>
            <p className="mt-0.5 text-sm text-gray-500">
              {step === 1 && "Provide your creche's basic details to finish your setup."}
              {step === 2 && "Add rooms to organize children and caregivers within your creche."}
              {step === 3 && "Set pricing for each room to define billing and payment structures."}
              {step === 4 && "Set your creche's open and Closing Times to help parents and staff stay on schedule."}
              {step === 5 && "Provide your creche legal and compliance details."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full ${stepProgress(i + 1)}`} />
            ))}
          </div>
          <p className="mt-2 text-center text-sm text-gray-500">
            Step {step} of {totalSteps}
          </p>
        </div>

        <div className="px-6 pb-6">
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div>
                <Label className="mb-1.5 text-sm font-medium text-gray-700">Phone Number</Label>
                <Input
                  placeholder="E.g. 070XXXXXXXX"
                  value={form.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                  className="h-11 border-gray-200"
                />
              </div>

              <div>
                <Label className="mb-1.5 text-sm font-medium text-gray-700">
                  Age Range (E.g., 6months-5years, 1-3years) *
                </Label>
                <Input
                  placeholder="E.g. 6 months - 5 years"
                  value={form.ageRange}
                  onChange={(e) => updateForm("ageRange", e.target.value)}
                  className="h-11 border-gray-200"
                />
              </div>

              <div className="relative">
                <Label className="mb-1.5 text-sm font-medium text-gray-700">Creche Features</Label>
                <button
                  type="button"
                  onClick={() => setFeatureDropdownOpen(!featureDropdownOpen)}
                  className="flex h-11 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 hover:border-gray-300"
                >
                  <span className={form.features.length ? "text-gray-700" : "text-gray-400"}>
                    {form.features.length
                      ? form.features.join(", ")
                      : "Select features"}
                  </span>
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {featureDropdownOpen && (
                  <div className="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                    {CRECHE_FEATURES.map((feature) => (
                      <label
                        key={feature}
                        className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={form.features.includes(feature)}
                          onChange={() => toggleFeature(feature)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        {feature}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="mb-1.5 text-sm font-medium text-gray-700">State *</Label>
                  <select
                    value={form.state}
                    onChange={(e) => {
                      updateForm("state", e.target.value);
                      updateForm("lga", "");
                    }}
                    className="flex h-11 w-full items-center rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 hover:border-gray-300"
                  >
                    <option value="">Select state</option>
                    {Object.keys(NIGERIAN_STATES).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="mb-1.5 text-sm font-medium text-gray-700">LGA *</Label>
                  <select
                    value={form.lga}
                    onChange={(e) => updateForm("lga", e.target.value)}
                    disabled={!form.state}
                    className="flex h-11 w-full items-center rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 hover:border-gray-300 disabled:opacity-50"
                  >
                    <option value="">Select LGA</option>
                    {form.state &&
                      NIGERIAN_STATES[form.state]?.map((lga) => (
                        <option key={lga} value={lga}>
                          {lga}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <Label className="mb-1.5 text-sm font-medium text-gray-700">Address *</Label>
                <Input
                  placeholder="Enter address"
                  value={form.address}
                  onChange={(e) => updateForm("address", e.target.value)}
                  className="h-11 border-gray-200"
                />
              </div>

              <div>
                <Label className="mb-1.5 text-sm font-medium text-gray-700">Bio *</Label>
                <textarea
                  placeholder="Add details about your creche.."
                  value={form.bio}
                  onChange={(e) => updateForm("bio", e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#3B2513] focus:outline-none focus:ring-1 focus:ring-[#3B2513]"
                />
              </div>

              <div>
                <Label className="mb-1.5 text-sm font-medium text-gray-700">Cover Photo *</Label>
                <input
                  ref={coverPhotoRef}
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => updateForm("coverPhoto", e.target.files?.[0] ?? null)}
                />
                {form.coverPhoto ? (
                  <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                      <Upload className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-gray-700">{form.coverPhoto.name}</p>
                      <p className="text-xs text-gray-400">
                        {(form.coverPhoto.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateForm("coverPhoto", null)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => coverPhotoRef.current?.click()}
                    className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-gray-300 py-6 text-center hover:border-[#3B2513] hover:bg-gray-50"
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-[#3B2513]">Tap to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">Images, PDF or DOCX (max 5mb)</p>
                  </button>
                )}
              </div>

              <div>
                <Label className="mb-1.5 text-sm font-medium text-gray-700">Images</Label>
                <input
                  ref={imagesRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    updateForm("images", [...form.images, ...files]);
                  }}
                />
                {form.images.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {form.images.map((file, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                          <Upload className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium text-gray-700">{file.name}</p>
                          <p className="text-xs text-gray-400">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = form.images.filter((_, idx) => idx !== i);
                            updateForm("images", newImages);
                          }}
                          className="text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => imagesRef.current?.click()}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-3 text-sm text-gray-600 hover:border-[#3B2513] hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                      Add more images
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => imagesRef.current?.click()}
                    className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-gray-300 py-6 text-center hover:border-[#3B2513] hover:bg-gray-50"
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-[#3B2513]">Tap to upload</span> or drag and drop
                    </p>
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div>
                <Label className="mb-1.5 text-sm font-medium text-gray-700">Room Name *</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter room name"
                    value={roomInput}
                    onChange={(e) => setRoomInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addRoom();
                      }
                    }}
                    className="h-11 flex-1 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={addRoom}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                    Add More
                  </button>
                </div>
              </div>

              {form.rooms.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.rooms.map((room, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#3B2513] px-3 py-1.5 text-sm font-medium text-white"
                    >
                      {room}
                      <button
                        type="button"
                        onClick={() => removeRoom(i)}
                        className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex-1 border-gray-200"
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-[#3B2513] text-white hover:bg-[#4A2F18]"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              {form.rooms.length > 0 && (
                <div className="flex border-b border-gray-200">
                  {form.rooms.map((room, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveRoomTab(i)}
                      className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                        activeRoomTab === i
                          ? "border-b-2 border-[#3B2513] text-[#3B2513]"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {room}
                    </button>
                  ))}
                </div>
              )}

              {form.roomPricing[activeRoomTab] && (
                <div className="flex flex-col gap-4">
                  <div>
                    <Label className="mb-1.5 text-sm font-medium text-gray-700">Age Range *</Label>
                    <Input
                      placeholder="E.g. 1 - 5 years"
                      value={form.roomPricing[activeRoomTab].ageRange}
                      onChange={(e) => updateRoomPricing(activeRoomTab, "ageRange", e.target.value)}
                      className="h-11 border-gray-200"
                    />
                  </div>

                  <div>
                    <Label className="mb-1.5 text-sm font-medium text-gray-700">Slot Capacity *</Label>
                    <Input
                      placeholder="100"
                      value={form.roomPricing[activeRoomTab].slotCapacity}
                      onChange={(e) => updateRoomPricing(activeRoomTab, "slotCapacity", e.target.value)}
                      className="h-11 border-gray-200"
                    />
                  </div>

                  <div>
                    <Label className="mb-1.5 text-sm font-medium text-gray-700">Monthly *</Label>
                    <Input
                      placeholder="₦50,000"
                      value={form.roomPricing[activeRoomTab].monthly}
                      onChange={(e) => updateRoomPricing(activeRoomTab, "monthly", e.target.value)}
                      className="h-11 border-gray-200"
                    />
                  </div>

                  <div>
                    <Label className="mb-1.5 text-sm font-medium text-gray-700">Weekly *</Label>
                    <Input
                      placeholder="₦10,000"
                      value={form.roomPricing[activeRoomTab].weekly}
                      onChange={(e) => updateRoomPricing(activeRoomTab, "weekly", e.target.value)}
                      className="h-11 border-gray-200"
                    />
                  </div>

                  <div>
                    <Label className="mb-1.5 text-sm font-medium text-gray-700">Full Day *</Label>
                    <Input
                      placeholder="₦5,000"
                      value={form.roomPricing[activeRoomTab].fullDay}
                      onChange={(e) => updateRoomPricing(activeRoomTab, "fullDay", e.target.value)}
                      className="h-11 border-gray-200"
                    />
                  </div>

                  <div>
                    <Label className="mb-1.5 text-sm font-medium text-gray-700">Half Day *</Label>
                    <Input
                      placeholder="₦1,000"
                      value={form.roomPricing[activeRoomTab].halfDay}
                      onChange={(e) => updateRoomPricing(activeRoomTab, "halfDay", e.target.value)}
                      className="h-11 border-gray-200"
                    />
                  </div>

                  <div>
                    <Label className="mb-1.5 text-sm font-medium text-gray-700">Hourly Rate *</Label>
                    <Input
                      placeholder="₦500"
                      value={form.roomPricing[activeRoomTab].hourlyRate}
                      onChange={(e) => updateRoomPricing(activeRoomTab, "hourlyRate", e.target.value)}
                      className="h-11 border-gray-200"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex-1 border-gray-200"
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-[#3B2513] text-white hover:bg-[#4A2F18]"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-4">
              {form.operatingHours.map((schedule, i) => (
                <div key={schedule.day} className="rounded-lg border border-gray-200 p-4">
                  <h4 className="mb-3 text-sm font-bold text-gray-800">{schedule.day}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="mb-1.5 text-xs font-medium text-gray-500">Opening Time</Label>
                      <div className="relative">
                        <input
                          type="time"
                          value={schedule.opening}
                          onChange={(e) => updateOperatingHour(i, "opening", e.target.value)}
                          disabled={schedule.closed}
                          className="flex h-10 w-full items-center rounded-lg border border-gray-200 px-3 text-sm text-gray-700 disabled:opacity-50"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="mb-1.5 text-xs font-medium text-gray-500">Closing Time</Label>
                      <div className="relative">
                        <input
                          type="time"
                          value={schedule.closing}
                          onChange={(e) => updateOperatingHour(i, "closing", e.target.value)}
                          disabled={schedule.closed}
                          className="flex h-10 w-full items-center rounded-lg border border-gray-200 px-3 text-sm text-gray-700 disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                  <label className="mt-3 flex items-center gap-2">
                    <Checkbox
                      checked={schedule.closed}
                      onCheckedChange={(checked) => updateOperatingHour(i, "closed", !!checked)}
                    />
                    <span className="text-sm text-gray-600">Closed</span>
                  </label>
                </div>
              ))}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex-1 border-gray-200"
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-[#3B2513] text-white hover:bg-[#4A2F18]"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="flex flex-col gap-4">
              <div>
                <Label className="mb-1.5 text-sm font-medium text-gray-700">Privacy Policy</Label>
                <textarea
                  placeholder="Enter privacy policy"
                  value={form.privacyPolicy}
                  onChange={(e) => updateForm("privacyPolicy", e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#3B2513] focus:outline-none focus:ring-1 focus:ring-[#3B2513]"
                />
              </div>

              <div>
                <Label className="mb-1.5 text-sm font-medium text-gray-700">
                  Upload Business Registration Documents *
                </Label>
                <input
                  ref={businessRegRef}
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => updateForm("businessRegDoc", e.target.files?.[0] ?? null)}
                />
                {form.businessRegDoc ? (
                  <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                      <Upload className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-gray-700">{form.businessRegDoc.name}</p>
                      <p className="text-xs text-gray-400">
                        {(form.businessRegDoc.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateForm("businessRegDoc", null)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => businessRegRef.current?.click()}
                    className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-gray-300 py-6 text-center hover:border-[#3B2513] hover:bg-gray-50"
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-[#3B2513]">Tap to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG or PDF (max 5mb)</p>
                  </button>
                )}
              </div>

              <div>
                <Label className="mb-1.5 text-sm font-medium text-gray-700">
                  Upload the Government-issued ID of the Creche Owner *
                </Label>
                <input
                  ref={govIdRef}
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => updateForm("governmentId", e.target.files?.[0] ?? null)}
                />
                {form.governmentId ? (
                  <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                      <Upload className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-gray-700">{form.governmentId.name}</p>
                      <p className="text-xs text-gray-400">
                        {(form.governmentId.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateForm("governmentId", null)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => govIdRef.current?.click()}
                    className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-gray-300 py-6 text-center hover:border-[#3B2513] hover:bg-gray-50"
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-[#3B2513]">Tap to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG or PDF (max 5mb)</p>
                  </button>
                )}
              </div>

              <div>
                <Label className="mb-1.5 text-sm font-medium text-gray-700">
                  Upload proof of Creche Address, such as a utility bill or Waste Management Bill *
                </Label>
                <input
                  ref={proofAddressRef}
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => updateForm("proofOfAddress", e.target.files?.[0] ?? null)}
                />
                {form.proofOfAddress ? (
                  <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                      <Upload className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-gray-700">{form.proofOfAddress.name}</p>
                      <p className="text-xs text-gray-400">
                        {(form.proofOfAddress.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateForm("proofOfAddress", null)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => proofAddressRef.current?.click()}
                    className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-gray-300 py-6 text-center hover:border-[#3B2513] hover:bg-gray-50"
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-[#3B2513]">Tap to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG or PDF (max 5mb)</p>
                  </button>
                )}
              </div>

              <label className="flex items-start gap-3 rounded-lg border border-gray-200 p-3">
                <Checkbox
                  checked={form.staffScreened}
                  onCheckedChange={(checked) => updateForm("staffScreened", !!checked)}
                  className="mt-0.5"
                />
                <span className="text-sm text-gray-600">
                  The Creche confirms that staff working in the Creche have been screened and are fit to
                  work with the children.
                </span>
              </label>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex-1 border-gray-200"
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-[#3B2513] text-white hover:bg-[#4A2F18]"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
