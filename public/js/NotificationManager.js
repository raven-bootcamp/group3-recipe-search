import BulmaNotification from "./Notifications.js";

class NotificationManager {
    constructor() {
        this.notifications = [];
        this.currentCount = 0;
        this.offsetPerNotification = 120;
        this.containerId = "notifications";
    }

    getContainerId() {
        return this.containerId;
    }

    show(title, message, context = "info", duration = 5000) {
        let notification = new BulmaNotification(this);
        let notificationNode = notification.show(title,message,this.currentCount*this.offsetPerNotification,context,duration);
        this.currentCount++;
        this.notifications.push(notificationNode);
    }

    remove(notificationNode) {
        let foundIndex = this.notifications.findIndex((element) => element === notificationNode);
        if (foundIndex >= 0) {
            this.notifications.splice(foundIndex, 1);
            // re-arrange the remaining notifications
            this.notifications.map((notificationNode,index) => {
                notificationNode.style.top = (this.offsetPerNotification*index) + "px";
            });
        }
        let parentEl = notificationNode.parentElement;
        if (parentEl !== null) parentEl.removeChild(notificationNode);
        this.currentCount--;
        if (this.currentCount < 0) this.currentCount = 0;
    }
}

let notifier = new NotificationManager();

export default notifier;