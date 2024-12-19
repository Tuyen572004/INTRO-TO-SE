import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const connectWebSocket = (userId, chatId, onMessageReceived) => {
    const client = new Client({
        webSocketFactory: () => new SockJS('http://localhost:8080/api/ws'),
        debug: (str) => console.log('WebSocket Debug:', str),
        reconnectDelay: 5000,
        onConnect: () => {
            console.log('WebSocket connection successful!');

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
    console.log(`Đã gửi tin nhắn tới: ${destination}`, message);
};

export const disconnectWebSocket = (client) => {
    if (client && client.connected) {
        client.deactivate();
        console.log('Đã ngắt kết nối WebSocket');
    }
};
