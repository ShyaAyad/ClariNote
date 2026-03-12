import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as api from "../API/api.js";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      register: async (name, email, password, passwordConfirmation) => {
        try {
          const newUser = await api.register(
            name,
            email,
            password,
            passwordConfirmation,
          );

          const newUserData = newUser.data.data.user;
          const token = newUser.data.data.access_token;

          set({
            user: newUserData,
            token: token,
          });
          return true;
        } catch (error) {
          alert("Registeration failed, Please try again!");
          console.log("Error" + error);
        }
      },
      login: async (email, password) => {
        try {
          const user = await api.login(email, password);

          const data = user.data.data.user;
          const token = user.data.data.access_token;

          set({
            user: data,
            token: token,
          });

          return true;
        } catch (error) {
          alert("Login failed, Please try again!");
          console.log("Error: " + error);
        }
      },
      logout: async () => {
        try {
          await api.logout();
          set({
            user: null,
            token: null,
          });
        } catch (error) {
          alert("Failed to logout, please try again!");
          console.log("Error: " + error);
        }
      },
    }),
    {
      name: "user-storage",
    },
  ),
);
