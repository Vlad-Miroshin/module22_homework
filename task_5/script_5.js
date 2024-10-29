document.addEventListener('DOMContentLoaded', ()=> {
    function onclick(selector, handler) {
        document.querySelector(selector).onclick = handler;
    }
  
    onclick('#btn_send_message', () => act_send_message());
    onclick('#btn_send_geo', () => act_send_geo());

    clearChat();
});

const wsUri = "wss://echo-ws-service.herokuapp.com/";

let socket = null;
let geoSended = false;

const chat_content = document.querySelector('.chat__content');
const chat_input = document.querySelector('.chat__input');

chat_input.addEventListener('keyup', (e)=> {
    if (e.key === 'Enter' || e.keyCode === 13) {
        act_send_message();
    }
});


async function act_send_message() {
    const text = chat_input.value ? chat_input.value : "Пример сообщения";
    
    await ensureSocket();

    socket.send(text);
    addSended(text);
}

async function act_send_geo() {
    await ensureSocket();

    if ("geolocation" in navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                geoSended = true;
                socket.send([position.coords.latitude, position.coords.longitude]);
                addGeolocation(position);
            },
            () => {
                addInfo('Информация о местоположении недоступна');
            }
        );        
    } else {
        addInfo('Браузер не поддерживает определение местоположения');
    }    
}

async function ensureSocket() {
    if (!socket) {
        socket = new WebSocket(wsUri);

        let connection_resolvers = [];
        let checkConnection = () => {
            return new Promise((resolve, reject) => {
                if (socket.readyState === WebSocket.OPEN) {
                    resolve();
                }
                else {
                    connection_resolvers.push({resolve, reject});
                }
            });
        }

        socket.onopen = () => { 
            connection_resolvers.forEach(r => r.resolve());
            addInfo(`connected to ${socket.url}`); 
        }
        socket.onclose = () => { 
            addInfo('disconnected'); 
            socket = null;
        }
        socket.onmessage = (evt) => { addReceived(evt.data); }
        socket.onerror = (evt) => { addInfo(evt.data); }

        await checkConnection();
    }
}

function removeChilds(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    };
}

function clearChat() {
    removeChilds(chat_content);
}

function addItem(text, classNames = []) {
    const div = document.createElement("div");
    div.textContent = text;

    classNames.forEach(element => {
        div.classList.add(element);
    })

    chat_content.prepend(div);

    showChat();
}

function addLink(url, text, classNames = []) {
    const a = document.createElement("a");
    a.text = text;
    a.href = url;
    a.target = '_blank';

    classNames.forEach(element => {
        a.classList.add(element);
    })

    chat_content.prepend(a);

    showChat();
}

function hideChat() {
    chat_content.classList.add('chat__content--hidden');
}

function showChat() {
    chat_content.classList.remove('chat__content--hidden');
}

function addInfo(text) {
    addItem(text, ['chat__info']);
}

function addSended(text) {
    addItem(text, ['chat__message', 'chat__message--sended']);
}

function addGeolocation(position) {
    const { coords } = position;
    const text = `Широта: ${coords.latitude} °, долгота: ${coords.longitude} °`;
    const url = `https://www.openstreetmap.org?mlat=${coords.latitude}&mlon=${coords.longitude}`;

    addLink(url, text, ['chat__message', 'chat__message--geo', 'chat__link']);
}

function addReceived(text) {
    if (!geoSended) {
        addItem(text, ['chat__message', 'chat__message--received']);
    }

    geoSended = false;
}
