class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :content, presence: true, unless: :image?
  mount_uploader :image, ImageUploader

  def self.new_messages(message_id, group_id)
    where("group_id = ? and id > ?", group_id, message_id)
  end

end
