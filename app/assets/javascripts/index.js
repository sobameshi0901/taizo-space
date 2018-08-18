$(document).on('turbolinks:load', function() {

    function appendUser(user) {
      var search_list = $('#user-search-result');

      var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
  </div>`
    search_list.append(html);
    }


    function appendUserGroup(userId, userName) {
      var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${userId}'>
    <input name='group[user_ids][]' type='hidden' value='${userId}'>
    <p class='chat-group-user__name'>${userName}</p>
    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
  </div>`
    $('#chat-group-users').append(html);
    }

  $('#user-search-field').on('keyup', function() {
    $('#user-search-result').empty();
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $('.user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
      })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $('#user-search-result').on('click', '.chat-group-user__btn--add', function(e) {
    e.preventDefault();
    $(this).parent().remove();
    appendUserGroup($(this).data('user-id'), $(this).data('user-name'));
  });

  $(document).on('click', '.chat-group-user__btn--remove', function() {
    $(this).parent().remove();
  });
});
