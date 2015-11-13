//Prepare event handlers for each of our app's functions when Document.ready() triggers
$(function() {
  $('#new-message-button').on('click', submitMessage);
  $('#conversation').on('click', '.delete', deleteMessage)
  $('#new-message-body').on('keydown', messageKeypress);
  $('#lonely').on('click', newLonelyMessage);
});

//New message template, takes a message and prepares a new message string to be inserted as necessary to the dom.
function messageTemplate(message, author) {
   return [
    "<li class='message'>",
      "<a class='delete' href='#'>Delete</a>",
        "<h3 class='author'>" + author + "</h3>",
        "<p class='message-body'>" + message + "</p>",
        "<span class='timestamp'>" + getTimestamp() + "</span>",
      "</li>"
  ].join('\n');
}

function submitMessage() {
  var message = $('#new-message-body').val();
  newMessage(message);
  $('#new-message-body').val('');
}
//Takes the text in the submit box and adds it to the chat window as a new messages
function newMessage(message, author) {
  author = author || MyUsername.get();
  var messageElement = messageTemplate(message, author);
  $('#conversation').append(messageElement);
}

//deletes the message when the user clicks an x
function deleteMessage(event) {
  console.log('Hello!');
  event.preventDefault();
  var message = event.target;

  $(message).parents('.message').remove();
}

// when someone hits enter in the chat box, calls newMessage
function messageKeypress(event) {
  if (event.which == 13) {
    submitMessage();
  };
};

function getTimestamp() {
 var date = new Date();
 var dateString= date.getHours() + ":" + date.getMinutes();
 return dateString;
}

function newLonelyMessage() {
  $.ajax({
    crossDomain: true,
    dataType: 'json',
    url: 'http://api.icndb.com/jokes/random',
    success: function(response) {
      var message = response.value.joke;
      var author = "Internet";
      newMessage(message, author);
    }
  });
}
MyUsername = {
  userNames: ["Me", "Myself", "I"],
  count: 0,
  get: function() {
    var username = this.userNames[ this.count % this.userNames.length ];
    this.count++;
    return username;
  }
}