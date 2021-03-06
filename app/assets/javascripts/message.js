$(document).on('turbolinks:load', function() {
  $(function() {
    function buildHTML(message){
      var content = message.content ? message.content : ""
      var image = message.image ?  `<img src="${message.image}">` : ""

      var html = `
        <div class="post" data-id="${message.id}">
          <ul class="post__detail claerfix">
            <li class="post__detail__user">
              ${message.user_name}
            </li>
            <li class="post__detail__time">
              ${message.created_at}
            </li>
          </ul>
          <div class="post__text">
            ${content}
          </div>
          ${image}
        </div>`
        return html;
    }


    function autoUpdate() {
      var messageId = $(".post").last().data('id');
      $.ajax({
        url: window.location.href,
        type: "GET",
        data: {message_id: messageId},
        dataType: 'json',
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          messages.forEach(function(message){
            var html = buildHTML(message)
           $('.chat-main__body').append(html);
          })
          $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast');
        }
      })
      .fail(function(){
        alert('更新に失敗しました。')
      })
    }

    function scrollToBottom(){
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast');
    }

    $('#new_message').on('submit',function(e) {    
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $('.message__submit').removeAttr('data-disable-with')

      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data) {
        var html = buildHTML(data)
        $('.chat-main__body').append(html);
        $('#message_content').val('');
        $('#message_image').val('');
        scrollToBottom()

      })
      .fail(function() {
        alert('error');
      })
    })


    setInterval(function() {
      if (document.URL.match("/groups/.*/messages")){
      autoUpdate();
      }
    }, 5000)
  });
});