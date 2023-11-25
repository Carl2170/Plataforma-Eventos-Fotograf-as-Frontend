importScripts('https://www.gstatic.com/firebasejs/12.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/12.9.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyANXoKsuk95TfFGNzbWxGG7KgZCAlt4lgw",
    authDomain: "notifipushevents.firebaseapp.com",
    projectId: "notifipushevents",
    storageBucket: "notifipushevents.appspot.com",
    messagingSenderId: "950319103953",
    appId: "1:950319103953:web:137ed27cfca263d88eeaf0",
    measurementId: "G-L9H860KYSR"
})

const messaging = firebase.messaging();
