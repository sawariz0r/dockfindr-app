import { create } from "zustand";
import { Point } from "../../types/payload-types";
import { NonNullable } from "../../types/common";

type SuggestStore = {
  location: NonNullable<Point["location"]>;
  locationDelta: [number, number];
  title: NonNullable<Point["title"]>;
  rampTypes: NonNullable<Point["rampType"]>;
  price: NonNullable<Point["price"]>;
  images: NonNullable<Point["images"]>;
  additionalInfo: NonNullable<Point["additionalInfo"]>;
  createdBy: NonNullable<Point["createdBy"]>;
  update: (data: Partial<SuggestStore>) => void;
  reset: () => void;
};

export const useSuggestStore = create<SuggestStore>((set) => ({
  location: [0, 0],
  locationDelta: [0, 0],
  title: "",
  price: 0,
  rampTypes: [],
  images: [],
  additionalInfo: "",
  createdBy: "",
  update: (data) => set(data),
  reset: () =>
    set({
      location: [0, 0],
      locationDelta: [0, 0],
      title: "",
      price: 0,
      rampTypes: [],
      images: [],
      additionalInfo: "",
      createdBy: "",
    }),
}));
