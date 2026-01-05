import axiosInstance from "./axiosInstance.js";

/* ================= AUTH APIs ================= */

// Register
export const registerUser = async (data) => {
    const res = await axiosInstance.post("/auth/register", data);
    return res.data;
};

// Login
export const loginUser = async (data) => {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;
};

// Get Profile (cookie based)
export const getProfile = async () => {
    const res = await axiosInstance.get("/auth/profile");
    return res.data;
};

// Update Profile
export const updateProfile = async (data) => {
     const res = await axiosInstance.patch("/auth/update", data);
    return res.data;
}

// Logout
export const logoutUser = async () => {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
};

// Delete Account
export const deleteAccount = async () => {
    const res = await axiosInstance.delete("/auth/delete");
    return res.data;
};

/* ================= GENERATE NOTES ================= */

export const generateNotes = async (youtubeUrl) => {
    const res = await axiosInstance.post("/generatenotes", { youtubeUrl });
    return res.data;
};

/* ================= NOTES CRUD ================= */

// Create Note
export const createNote = async (data) => {
    const res = await axiosInstance.post("/notes", data);
    return res.data;
};

// Get All Notes
export const getAllNotes = async () => {
    const res = await axiosInstance.get("/notes");
    return res.data;
};

// Get Note By ID
export const getNoteById = async (id) => {
    const res = await axiosInstance.get(`/notes/${id}`);
    return res.data;
};

// Update Note
export const updateNote = async (id, data) => {
    const res = await axiosInstance.put(`/notes/${id}`, data);
    return res.data;
};

// Delete Note
export const deleteNote = async (id) => {
    const res = await axiosInstance.delete(`/notes/${id}`);
    return res.data;
};
