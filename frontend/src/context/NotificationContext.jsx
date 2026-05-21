import React, { createContext, useState, useContext, useEffect, useRef, useMemo, useCallback } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // ⭐ FIX ADDED (IMPORTANT)
  const [unreadCount, setUnreadCount] = useState(0);

  const esRef = useRef(null);
  const retryRef = useRef(0);
  const reconnectTimer = useRef(null);
  const pollTimer = useRef(null);
  const seenIdsRef = useRef(new Set());

  const BACKEND_BASE =
    (import.meta && import.meta.env && import.meta.env.VITE_API_URL) ||
    "http://localhost:4000";

  useEffect(() => {
    const connect = () => {
      const token = localStorage.getItem("token");
      const urlBase = `${BACKEND_BASE}/api/notifications/stream`;
      const url = token
        ? `${urlBase}?token=${encodeURIComponent(token)}`
        : urlBase;

      console.info("[Notifications] connecting to SSE", url);

      try {
        esRef.current = new EventSource(url);
      } catch (err) {
        console.error("[Notifications] EventSource init error", err);
        scheduleReconnect();
        return;
      }

      esRef.current.onopen = () => {
        console.info("[Notifications] SSE connected");
        retryRef.current = 0;
      };

      esRef.current.onmessage = (event) => {
        if (!event.data) return;

        let payload;
        try {
          payload = JSON.parse(event.data);
        } catch {
          payload = { message: event.data };
        }

        const currentUserRaw = localStorage.getItem("user");
        let currentUserId = null;
        try {
          currentUserId = currentUserRaw ? JSON.parse(currentUserRaw)._id : null;
        } catch {}

        if (
          payload.userId &&
          currentUserId &&
          String(payload.userId) !== String(currentUserId)
        ) {
          return;
        }

        const id =
          payload.id ||
          payload._id ||
          payload.orderId ||
          payload.order_id ||
          Date.now();

        if (seenIdsRef.current.has(String(id))) return;

        seenIdsRef.current.add(String(id));

        const msg =
          payload.message ||
          payload.msg ||
          payload.text ||
          String(event.data);

        addNotification(msg, { ...payload, id });
      };

      esRef.current.onerror = (err) => {
        console.error("[Notifications] SSE error", err);
        if (esRef.current.readyState === EventSource.CLOSED) {
          try {
            esRef.current.close();
          } catch {}
          scheduleReconnect();
        }
      };
    };

    const scheduleReconnect = () => {
      if (reconnectTimer.current) return;

      const retry = Math.min(
        30000,
        1000 * Math.pow(2, Math.min(6, retryRef.current))
      );

      retryRef.current += 1;

      reconnectTimer.current = setTimeout(() => {
        reconnectTimer.current = null;
        connect();
      }, retry);

      console.info(`[Notifications] reconnect scheduled in ${retry}ms`);
    };

    const startPolling = () => {
      const poll = async () => {
        try {
          const token = localStorage.getItem("token");

          const res = await fetch(`${BACKEND_BASE}/api/notifications`, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          });

          if (!res.ok) throw new Error(`status ${res.status}`);

          const data = await res.json();

          if (Array.isArray(data)) {
            data.reverse().forEach((n) => {
              const id = n.id || n._id || n.orderId || Date.now();

              if (!seenIdsRef.current.has(String(id))) {
                seenIdsRef.current.add(String(id));
                const msg = n.message || `Notification ${id}`;
                addNotification(msg, { ...n, id });
              }
            });
          }
        } catch (err) {
          console.debug("[Notifications] poll error", err);
        } finally {
          pollTimer.current = setTimeout(poll, 30000);
        }
      };
      poll();
    };

    connect();
    startPolling();

    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      if (pollTimer.current) clearTimeout(pollTimer.current);
      try {
        if (esRef.current) esRef.current.close();
      } catch {}
    };
  }, []);

  const notifyBrowser = (title, body) => {
    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body });
        }
      });
    }
  };

  const addNotification = useCallback((message, raw = {}) => {
    const id = raw.id || Date.now();

    const newNotification = {
      id,
      message,
      payload: raw,
      timestamp: raw.timestamp ? new Date(raw.timestamp) : new Date(),
      read: false,
    };

    setNotifications((prev) => {
      if (prev.some((p) => String(p.id) === String(id))) return prev;
      return [newNotification, ...prev];
    });

    setUnreadCount((prev) => prev + 1);

    try {
      const title = raw.title || "Order update";
      notifyBrowser(title, message);
    } catch {}

    console.info("[Notifications] received", id, message);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
      markAsRead,
      markAllAsRead,
      unreadCount,
    }),
    [
      notifications,
      addNotification,
      removeNotification,
      markAsRead,
      markAllAsRead,
      unreadCount,
    ]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return ctx;
};
