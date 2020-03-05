# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# chat-space設計
## usersテーブル
|Column|Type|Options|
|----------|------|---------|
|email|string|null: false|
|nickname|string|null: false|
|password|string|null: false|
### Association
- has_many :messages
- has_many :users_groups
- has_many :groups, through:   :users_groups

## groupsテーブル
|Column|Type|Options|
|----------|------|---------|
|name|string|null: false|
### Association
- has_many :messages
- has_many :users_groups
- has_many :groups, through:   :users_groups

## users_groupsテーブル
|Column|Type|Options|
|----------|------|---------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :u

## messagesテーブル
|Column|Type|Options|
|----------|------|---------|
|text|text|
image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user


