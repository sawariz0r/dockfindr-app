import { create } from "zustand";
import { Point } from "../../types/payload-types";
import { NonNullable } from "../../types/common";

type PointsState = {
  points: NonNullable<Point[]>;
  update: (data: Partial<PointsState>) => void;
};

export const usePointsStore = create<PointsState>((set) => ({
  points: [],
  update: (data) => set(data),
}));
