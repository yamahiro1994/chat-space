$(function() {
  var  buildHTML = function(message) {
    if (message.content && message.image) {
      var html =
          `<div class = "main-chat__chat-list__info-box" data-message-id = ${message.id}>
            <div class = "main-chat__chat-list__info">
              <div class = "main-chat__chat-list__info-data">
                ${message.user_name}
              </div>
              <div class = "main-chat__chat-list__daytime">
                ${message.created_at}
              </div>
            </div>
            <div class = "main-chat__chat-list__comment">
              <p class = "main-chat__chat-list__text">
                ${message.content}
              </p>
              <img src = "${message.image}" class = "main-chat__chat-list__comment__image">
            </div>
          </div>`
    } else if(message.content) {
      var html =
          `<div class = "main-chat__chat-list__info-box" data-message-id = ${message.id}>
            <div class = "main-chat__chat-list__info">
              <div class = "main-chat__chat-list__info-data">
                ${message.user_name}
              </div>
              <div class = "main-chat__chat-list__daytime">
                ${message.created_at}
              </div>
            </div>
            <div class = "main-chat__chat-list__comment">
              <p class = "main-chat__chat-list__text">
                ${message.content}
              </p>
            </div>
          </div>`
    } else if(message.image) {
      var html =
          `<div class = "main-chat__chat-list__info-box" data-message-id = ${message.id}>
            <div class = "main-chat__chat-list__info">
              <div class = "main-chat__chat-list__info-data">
                ${message.user_name}
              </div>
              <div class = "main-chat__chat-list__daytime">
               ${message.created_at} 
              </div>
            </div>
            <div class = "main-chat__chat-list__comment">
              <img src = "${message.image}" class = "main-chat__chat-list__comment__image">
            </div>
          </div>`
    };
    return html;
  };
  
  $('#new_message').on('submit', function(e) {
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  
  .done(function(data){
    var html = buildHTML(data);
    $('.main-chat__chat-list').append(html); 
    $('form')[0].reset();
    $('.submit-btn').prop('disabled', false);
    $('.main-chat__chat-list').animate({ scrollTop: $('.main-chat__chat-list')[0].scrollHeight});
      return false
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  })
  
  var reloadMessages = function() {
    var last_message_id = $('.main-chat__chat-list__info-box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })    
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__chat-list').append(insertHTML);
        $('.main-chat__chat-list').animate({ scrollTop: $('.main-chat__chat-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});

