import axios from "axios";

const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const api = {
    createUser: (data: User) => request.post("/user", data),
    getUsers: (data: { page: number; search: string }) =>
        request.get<{ users: User[]; pages: number }>("/user", {
            params: { page: data.page, search: data.search },
        }),
};

export type User = {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
};
