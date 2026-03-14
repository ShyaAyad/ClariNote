import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as api from "../API/api.js";

export const useLectureStore = create((set) => ({
  lectures: [],
  allLectures: async () => {
    try {
        const res = await api.lectures();
        console.log(res.data.data);
        const userLectures = res.data.data;

        set({
            lectures: userLectures,
        });
    } catch (error) {
        console.log("Error fetching lectures: " , error);
    }
  },
  upload: async (title, pdf) => {
    try {
        const res = await api.uploadLecture(title, pdf);
    } catch (error) {
        
    }
  },
}));
