import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const connectWebSocket = (userId, handleNotification) => {
    const client = new Client({
        webSocketFactory: () => new SockJS('http://localhost:8080/api/ws'),
        debug: (str) => console.log('WebSocket Debug:', str),
        reconnectDelay: 5000,
        onConnect: () => {
            console.log('WebSocket connection successful!');

            const destination = `/user/${userId}/queue/notifications`;
            client.subscribe(destination, (data) => {
                console.log("handleNotification", handleNotification);

                console.log('Received notification:', data.body);
                const notificationBody = JSON.parse(data.body);
                console.log('Notification body:', notificationBody);

                if (notificationBody.actor.id === userId) return;

                switch (notificationBody.notificationType) {
                    case 'MESSAGE':
                        handleNotification.setHasMessageNotification(true);
                        break;
                    case 'ADD_FRIEND':
                        handleNotification.setHasFriendNotification(true);
                        handleNotification.setRequestReceived((prev) => {
                            const exists = prev.some(request => request.id === notificationBody.actor.id);
                            if (exists) return prev;
                            return [notificationBody.actor, ...prev];
                        })
                    case 'POST':
                    case 'COMMENT':
                    case 'USER':
                    case 'REPORT':
                    case 'DELETED_POST':
                        handleNotification.setHasActivityNotification(true);
                        handleNotification.setActivities(
                            (prev) => {
                                const exists = prev.some(activity => activity.id === notificationBody.id);
                                if (exists) return prev;
                                return [notificationBody, ...prev];
                            }
                        );
                        console.log('Activities:', handleNotification.activities);
                        break;
                    default:
                        console.log('Unknown notification type:', notificationBody.type);
                }
            });

            console.log(`Subscribed to notification from: ${destination}`);
        },
    });

    client.activate();

    return client;
};

export const connectWebSocketChat = (userId, chatId, onMessageReceived) => {
    const client = new Client({
        webSocketFactory: () => new SockJS('http://localhost:8080/api/ws'),
        debug: (str) => console.log('WebSocket Debug:', str),
        reconnectDelay: 5000,
        onConnect: () => {
            console.log('WebSocketChat connection successful!');

            const destination = `/user/${userId}/queue/messages${chatId}`;
            client.subscribe(destination, (message) => {
                console.log('Received message:', message.body);

                const messageBody = JSON.parse(message.body);
                onMessageReceived(messageBody);
            });

            console.log(`Subscribed to messages from: ${destination}`);
        },
    });

    client.activate();

    return client;
};

export const sendMessage = (client, message) => {
    const destination = `/app/chat`;
    client.publish({
        destination,
        body: JSON.stringify(message),
    });
    console.log(`The message has been sent to ${destination}`, message);
};

export const disconnectWebSocket = (client) => {
    if (client && client.connected) {
        client.deactivate();
        console.log('Websocket disconnected!');
    }
};
