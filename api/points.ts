import { Point } from "../types/payload-types";
import { useSuggestStore } from "./../app/suggest/_store";
import { get, post } from "./client";

export const getPoints = async (): Promise<Point[]> => {
  const data = await get("/api/points?where[reviewed][equals]=true");

  return data.docs;
};

export const sendPointSuggestion = async () => {
  const data = useSuggestStore.getState();

  await post("/api/points", {
    title: data.title,
    location: [data.location[1], data.location[0]],
    createdBy: "oscar@prpl.se",
    rampType: data.rampTypes,
  });
};
