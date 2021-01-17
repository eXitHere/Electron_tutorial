[REF.](https://www.electronjs.org/docs/api/ipc-main)

```js
// In main process.
const { ipcMain } = require('electron');
ipcMain.on('asynchronous-message', (event, arg) => {
	console.log(arg); // prints "ping"
	event.reply('asynchronous-reply', 'pong');
});

ipcMain.on('synchronous-message', (event, arg) => {
	console.log(arg); // prints "ping"
	event.returnValue = 'pong';
});
```

```js
// In renderer process (web page).
const { ipcRenderer } = require('electron');
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
	console.log(arg); // prints "pong"
});
ipcRenderer.send('asynchronous-message', 'ping');
```
