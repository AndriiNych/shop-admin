"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";

const API_URL = process.env.PUBLIC_API_URL || "http://localhost:5000/api";

export const dataProvider = dataProviderSimpleRest(API_URL);
