importScripts('https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.6.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyANXoKsuk95TfFGNzbWxGG7KgZCAlt4lgw",
    authDomain: "notifipushevents.firebaseapp.com",
    projectId: "notifipushevents",
    storageBucket: "notifipushevents.appspot.com",
    messagingSenderId: "950319103953",
    appId: "1:950319103953:web:137ed27cfca263d88eeaf0",
    measurementId: "G-L9H860KYSR"
})

// const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("New Message");
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});