$(function() {
  function buildHTML(message){
    var content = message.content ? message.content : ""
    var image = message.image ?  `<img src="${message.image}">` : ""

    var html = `
      <div class="post">
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
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast');

    })
    .fail(function() {
      alert('error');
    })
  })
});