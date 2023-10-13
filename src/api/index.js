import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const signUp = (payload) => api.post(`/auth/signup`, payload);
export const signIn = (payload) =>
  api.post(`/auth/signin`, payload).then((res) => {
    if (res.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res;
  });

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};

// Donor routes
export const addDonorItem = (payload) => api.post("/donor/addItem", payload);
export const getDonorItemById = (itemId) => api.get(`/donor/getItem/${itemId}`);
export const getAllDonorItems = () => api.get("/donor/getAllItems");

// Org routes
export const getOrgItemById = (itemId) => api.get(`/org/getItem/${itemId}`);
export const getAllOrgItems = () => api.get("/org/getAllItems");

// Warehouse routes
export const getWarehouseItemById = (itemId) =>
  api.get(`/warehouse/getItem/${itemId}`);
export const getAllWarehouseItems = () => api.get("/warehouse/getAllItems");
export const updateWarehouseItemStatus = (itemId, payload) =>
  api.put(`/warehouse/updateStatus/${itemId}`, payload);

export const authHeader = () => {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr) user = JSON.parse(userStr);

  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return { "x-access-token": null };
  }
};

api.interceptors.request.use(
  (config) => {
    const headers = apis.authHeader();
    config.headers = headers;
    console.log("Request being sent: ", config);
    return config;
  },
  (error) => {
    console.log(error);
  }
);

const apis = {
  signUp,
  signIn,
  logout,
  addDonorItem,
  getDonorItemById,
  getAllDonorItems,
  getOrgItemById,
  getAllOrgItems,
  getWarehouseItemById,
  getAllWarehouseItems,
  updateWarehouseItemStatus,
  getCurrentUser,
  authHeader,
};

export default apis;
