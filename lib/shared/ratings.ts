import { sharedGetList, sharedSet } from "./storage";
import { addNotification } from "./notifications";

export type CaregiverRating = {
  id: string; parentId: string; parentName: string; caregiverId: string; caregiverName: string;
  childId: string; rating: number; feedback: string; createdAt: number;
};

const STORAGE_KEY = "caregiver_ratings";

const MOCK_RATINGS: CaregiverRating[] = [
  { id: "rat-1", parentId: "parent-1", parentName: "James Miller", caregiverId: "cg-1", caregiverName: "Ms Anu", childId: "child-1", rating: 5, feedback: "Ms Anu is amazing with Liam.", createdAt: Date.now() - 15 * 86400000 },
  { id: "rat-2", parentId: "parent-2", parentName: "Sarah Brown", caregiverId: "cg-1", caregiverName: "Ms Anu", childId: "child-2", rating: 4, feedback: "Very caring and attentive.", createdAt: Date.now() - 10 * 86400000 },
  { id: "rat-3", parentId: "parent-3", parentName: "Tom Davies", caregiverId: "cg-1", caregiverName: "Ms Anu", childId: "child-3", rating: 5, feedback: "Excellent handling of Noah's allergy.", createdAt: Date.now() - 3 * 86400000 },
];

function init() {
  if (sharedGetList<CaregiverRating>(STORAGE_KEY).length === 0) sharedSet(STORAGE_KEY, MOCK_RATINGS);
}

export function getRatings(caregiverId?: string): CaregiverRating[] {
  init();
  const all = sharedGetList<CaregiverRating>(STORAGE_KEY);
  return caregiverId ? all.filter((r) => r.caregiverId === caregiverId) : all;
}

export function getParentRatings(parentId: string): CaregiverRating[] {
  init();
  return sharedGetList<CaregiverRating>(STORAGE_KEY).filter((r) => r.parentId === parentId).sort((a, b) => b.createdAt - a.createdAt);
}

export function addRating(rating: Omit<CaregiverRating, "id" | "createdAt">): CaregiverRating {
  init();
  const all = sharedGetList<CaregiverRating>(STORAGE_KEY);
  const newRating: CaregiverRating = { ...rating, id: `rat-${Date.now()}`, createdAt: Date.now() };
  sharedSet(STORAGE_KEY, [...all, newRating]);
  addNotification({ type: "rating", title: "Rating Submitted", body: `You rated ${rating.caregiverName} ${rating.rating}/5 stars.`, data: { caregiverId: rating.caregiverId, rating: rating.rating } });
  return newRating;
}

export function getAverageRating(caregiverId: string): { average: number; count: number } {
  init();
  const ratings = sharedGetList<CaregiverRating>(STORAGE_KEY).filter((r) => r.caregiverId === caregiverId);
  if (ratings.length === 0) return { average: 0, count: 0 };
  const avg = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
  return { average: Math.round(avg * 10) / 10, count: ratings.length };
}

export function getRatingDistribution(caregiverId: string): Record<number, number> {
  init();
  const ratings = sharedGetList<CaregiverRating>(STORAGE_KEY).filter((r) => r.caregiverId === caregiverId);
  const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  ratings.forEach((r) => { dist[r.rating]++; });
  return dist;
}
