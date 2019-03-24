//defaults
const url = "http://185.13.90.140:8081";
const socket = io.connect(url);
const messages = document.getElementById("messages");

//listen to events on socket.io
socket.on('message', function (data) {
	//check if its a bot
	if (data.user.includes("chat")) {
		messageCreator("bot", data);
		console.log(data)
	}
	//otherwise it'll be a user
	else {
		messageCreator("user", data);
		console.log(data)
	}
	messages.scrollTop = messages.scrollHeight;
});

// create a message
class Message {
	constructor(user, message) {
		this.user = user || "Guest";
		this.message = message || "default message";
	}
}

// get values shorter
function getValue(id) {
	return document.getElementById(id).value;
}

// extracted to a separate function for reusability
function preparedNewMessage() {
	let nameValue = this.getValue("name");
	let messageValue = this.getValue("input");
	return new Message(nameValue, messageValue);
}

//send a new message
function sendNewMessage() {
	socket.emit("message", this.preparedNewMessage());
}

//create messages dynamically
function messageCreator(userType, data) {
	if (userType === "bot") {
		user = data.user + ": "
		message = data.message
	}
	else {
		user = ""
		message = this.preparedNewMessage().message
	}

	let newMessage = document.createElement("span");
	let newUser = document.createElement("p");
	let newWrapper = document.createElement("div");

	newWrapper.setAttribute("class", "wrapper " + userType);
	newMessage.setAttribute("class", userType);
	newUser.setAttribute("class", userType);

	newMessage.innerHTML = message;
	newUser.innerHTML = user;

	document.getElementById("messages").appendChild(newWrapper).appendChild(newUser).appendChild(newMessage);
}
