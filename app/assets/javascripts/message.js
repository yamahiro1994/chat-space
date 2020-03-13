$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
          `<div class="main-chat__chat-list__info-box">
            <div class="main-chat__chat-list__info">
              <div class="main-chat__chat-list__info-data">
                ${message.user_name}
              </div>
              <div class="main-chat__chat-list__daytime">
                ${message.created_at}
              </div>
            </div>
            <div class="main-chat__chat-list__comment">
              <p class="main-chat__chat-list__text">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
      return html;
    } else {
      var html =
          `<div class="main-chat__chat-list__info-box">
            <div class="main-chat__chat-list__info">
              <div class="main-chat__chat-list__info-data">
                ${message.user_name}
              </div>
              <div class="main-chat__chat-list__daytime">
                ${message.created_at}
              </div>
            </div>
              <div class="main-chat__chat-list__comment">
                <p class="main-chat__chat-list__text">
                  ${message.content}
                </p>
              </div>
            </div>
          </div>`
      return html;
    };
  }
  $('#new_message').on
  ('submit', function(e){ 
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
    })
  })
})


