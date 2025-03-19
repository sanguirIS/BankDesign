"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bell, CheckCheck, AlertTriangle, CreditCard, MessageSquare, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { notifications } from "@/data/notificationsData";

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsState, setNotificationsState] = useState(notifications);

  const unreadCount = notificationsState.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "transaction":
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      case "security":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "account":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotificationsState(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationsState(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const dismissNotification = (id: string) => {
    setNotificationsState(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white border-2 border-white dark:border-gray-900"
              aria-label={`${unreadCount} unread notifications`}
            >
              <span className="text-[10px] font-medium">{unreadCount}</span>
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 dark:bg-gray-800 dark:border-gray-700"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex items-center justify-between p-4">
          <DropdownMenuLabel className="text-sm font-semibold p-0 dark:text-white">
            Notifications
          </DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs text-blue-600 dark:text-blue-400"
              onClick={markAllAsRead}
            >
              <CheckCheck className="h-3.5 w-3.5 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator className="dark:border-gray-700" />

        {notificationsState.length === 0 ? (
          <div className="py-6 text-center text-gray-500 dark:text-gray-400">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-3">
              <Bell className="h-6 w-6 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-sm font-medium">No notifications</p>
            <p className="text-xs mt-1">You're all caught up!</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="p-2">
              {notificationsState.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative flex items-start gap-3 p-3 rounded-lg text-left transition-colors cursor-pointer ${
                    notification.read
                      ? "bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50"
                      : "bg-blue-50 dark:bg-blue-900/20"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className={`mt-0.5 h-8 w-8 rounded-full flex items-center justify-center ${
                    notification.type === "transaction"
                      ? "bg-blue-100 dark:bg-blue-900/50"
                      : notification.type === "security"
                      ? "bg-red-100 dark:bg-red-900/50"
                      : notification.type === "account"
                      ? "bg-green-100 dark:bg-green-900/50"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium truncate dark:text-white ${
                        !notification.read ? "text-blue-900 dark:text-blue-300" : ""
                      }`}>
                        {notification.title}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                        {notification.date}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                  </div>
                  <button
                    className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissNotification(notification.id);
                    }}
                    aria-label="Dismiss notification"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  {!notification.read && (
                    <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-blue-500"></div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <DropdownMenuSeparator className="dark:border-gray-700" />
        <div className="p-2">
          <Link href="/settings" onClick={() => setIsOpen(false)}>
            <Button
              variant="ghost"
              className="w-full justify-center text-sm text-blue-600 dark:text-blue-400"
            >
              View all notifications
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
