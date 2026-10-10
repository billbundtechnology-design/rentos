import axios from "axios";
import { bookings, inventory } from "./demo-data";

// Axios is configured with an in-memory adapter: this demo never makes network requests.
export const demoApi = axios.create({
  adapter: async (config) => {
    const data = config.url === "/bookings" ? bookings : config.url === "/inventory" ? inventory : { demo: true };
    return { data, status: 200, statusText: "OK", headers: {}, config };
  }
});
