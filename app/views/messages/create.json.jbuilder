json.content @message.content if @message.content
json.image @message.image.url if @message.image
json.user_name @message.user.name
json.created_at @message.created_at
json.id @message.id