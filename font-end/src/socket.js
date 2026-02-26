// src/socket.js
import { io } from "socket.io-client";

// สร้าง socket instance
export const socket = io("http://localhost:3000", {
    withCredentials: true,
    transports: ['websocket'],
});
