// import axios from "axios";
// import { HOST } from "@/utils/constants.js";
// console.log(HOST);
// export const apiClient = axios.create({
//   baseURL: HOST,
// });

import axios from "axios";
import { HOST } from "@/utils/constants.js";

console.log(HOST); // This should log "http://localhost:8747"

export const apiClient = axios.create({
  baseURL: HOST, // Should resolve to "http://localhost:8747"
  withCredentials: true, // Ensure credentials are sent if needed
});
