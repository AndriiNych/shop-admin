"use client";

import type { AuthProvider } from "@refinedev/core";
import Cookies from "js-cookie";

// const mockUsers = [
//   {
//     name: "John Doe",
//     email: "johndoe@mail.com",
//     roles: ["admin"],
//     avatar: "https://i.pravatar.cc/150?img=1",
//   },
//   {
//     name: "Jane Doe",
//     email: "janedoe@mail.com",
//     roles: ["editor"],
//     avatar: "https://i.pravatar.cc/150?img=1",
//   },
// ];

export const authProviderClient: AuthProvider = {
  login: async ({ email, username, password, remember }) => {
    console.log("login");
    console.log({ email, password });
    // Suppose we actually send a request to the back end here.
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const user = await res.json();

    console.log(user);
    if (user) {
      Cookies.set("auth", JSON.stringify(user), {
        expires: 30, // 30 days
        path: "/",
      });
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    console.log("logout");
    Cookies.remove("auth", { path: "/" });
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    console.log("check");
    const auth = Cookies.get("auth");
    if (auth) {
      console.log("true");
      return {
        authenticated: true,
      };
    }
    console.log("false");
    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    console.log("getpermission");
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    console.log("getIdentity");
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    console.log("onError");
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
