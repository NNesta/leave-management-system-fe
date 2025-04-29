import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";

type Notification = {
  id: number;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function NotificationBell({ userId }: { userId: number }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 1. Fetch stored notifications
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/notifications/user/${userId}`)
      .then((res) => setNotifications(res.data));
  }, [userId]);

  console.log({ notifications });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 2. Listen to real-time notifications via SSE
  useEffect(() => {
    const sse = new EventSource(
      `${import.meta.env.VITE_API_URL}/notifications/subscribe/${userId}`
    );

    sse.addEventListener("notification", (e) => {
      const data = e.data;

      toast.info(data); // optional toast

      const newNotification: Notification = {
        id: Date.now(), // or use a temp ID if not from DB
        message: data,
        read: false,
        createdAt: new Date().toISOString(),
      };

      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => sse.close();
  }, [userId]);

  const markAsRead = (id: number) => {
    axios
      .put(`${import.meta.env.VITE_API_URL}/notifications/mark-as-read/${id}`)
      .then(() => {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
      });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <ToastContainer position="top-right" />
      <Button
        onClick={() => setShowDropdown(!showDropdown)}
        variant="outline"
        className="mr-2 relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-72 bg-white border shadow-lg z-50 max-h-96 overflow-auto">
          <div className="p-2 font-semibold border-b">Notifications</div>
          {notifications.length === 0 && (
            <div className="p-2 text-gray-500">No notifications</div>
          )}
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-2 text-sm cursor-pointer hover:bg-gray-100 ${
                n.read ? "text-gray-500" : "font-bold"
              }`}
              onClick={() => markAsRead(n.id)}
            >
              {n.message}
              <div className="text-xs text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
