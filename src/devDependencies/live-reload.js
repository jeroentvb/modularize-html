/* global io */

const socket = io()

socket.on('reload', () => window.location.reload())
