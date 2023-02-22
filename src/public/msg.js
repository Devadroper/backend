const socketClient = io();

const formMsg = document.getElementById("chatForm");
const chat = document.getElementById("chat");
const msg = document.getElementById("msg");
const user = document.getElementById("user");

socketClient.on("msgs", async (e) => {
    chat.innerHTML = ""
    await e.map((e) => {
      let div = document.createElement('div')
      div.innerHTML = `
      <p>${e.user}:</p>
      <p>${e.message}</p>
      `
      chat.appendChild(div)
    })
  });
  
  formMsg.onsubmit = (e) => {
    e.preventDefault();
    const mssg = {
      user: user.value,
      message: msg.value,
    };
    user.value = ""
    msg.value = ""
    socketClient.emit("msg", mssg);
  };