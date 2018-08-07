FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/oniku.jpg")
    user
    group
    created_at { Faker::Time.between(2.days.ago, Time.now, :all)}
  end
end