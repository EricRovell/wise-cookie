import { writable } from "svelte/store";
import type { NotificationPositionType } from "#types";

class NotificationCentre {
  public notifications: any;
  public readonly positions: Set<NotificationPositionType>;

  constructor() {
    this.notifications = writable([]);
    this.positions = new Set([
      "top-left",
      "top-center",
      "top-right",
      "bottom-left",
      "bottom-center",
      "bottom-right"
    ]);
  }

  public validate(notification) {
    if (!notification || !notification.text) return false;
    if (typeof notification.text !== "string") return false;
    if (!this.positions.has(notification.position)) return false;

    return true;
  }

  public addNotification(notification) {
    if (!this.validate(notification)) {
      throw new Error("Notification is not valid.");
    }

    const { id = new Date().getTime(), removeAfter = +notification.removeAfter, ...rest } = notification;

    this.notifications.update(notifications => {
      return [ ...notifications, { id, removeAfter, ...rest } ];
    });
  }

  public removeNotification(notificationID) {
    this.notifications.update(notifications => {
      return notifications.filter(n => n.id !== notificationID)
    });
  }

  public clearNotifications() {
    this.notifications.set([]);
  }
  
}

export default new NotificationCentre();