export default class BulmaNotification {
    constructor(notificationManager) {
        this.show = this.show.bind(this);

        this.notificationManager = notificationManager;

        // Create DOM notification structure when instantiated
        this.containerId = this.notificationManager.getContainerId();
    }

    // Make the notification visible on the screen
    show(title, message, topOffset = 0, context = "info", duration = 3000) {
        // Creating the notification container div
        let containerNode = document.createElement("div");
        containerNode.className = "notification note note-visible";
        containerNode.style.top = topOffset + "px";


        // Adding the notification title node
        let titleNode = document.createElement('p');
        titleNode.className = "note-title";
        titleNode.textContent = title;


        // Adding the notification message content node
        let messageNode = document.createElement('p');
        messageNode.className = "note-content";
        messageNode.textContent = message;

        // Adding a little button on the notification
        let closeButtonNode = document.createElement('button');
        closeButtonNode.className = "delete";
        closeButtonNode.addEventListener('click', () => {

            this.notificationManager.remove(containerNode);
        });

        // Appending the container with all the elements newly created
        containerNode.appendChild(closeButtonNode);
        containerNode.appendChild(titleNode);
        containerNode.appendChild(messageNode);
        containerNode.classList.add(`is-${context}`);

        // Inserting the notification to the page body
        document.getElementById(this.containerId).appendChild(containerNode);

        // Default duration delay
        if (duration <= 0) {
            duration = 2000;
        }
        setTimeout(() => {
            this.notificationManager.remove(containerNode);
        }, duration);
        return containerNode;
    }

}
