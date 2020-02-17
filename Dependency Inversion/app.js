"use strict";
exports.__esModule = true;
var fs = require("fs");
var PostsService = /** @class */ (function () {
    function PostsService() {
        this._fileName = 'posts.json';
    }
    PostsService.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fs.readFile(_this._fileName, 'utf-8', function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(JSON.parse(data));
            });
        });
    };
    PostsService.prototype.save = function (post) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getAll().then(function (posts) {
                posts.push(post);
                fs.writeFile(_this._fileName, posts, function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    };
    return PostsService;
}());
exports.PostsService = PostsService;
var MockPostsService = /** @class */ (function () {
    function MockPostsService() {
        this.posts = [];
        this.posts = [
            { id: 1, title: 'Title 1', body: 'body 1', postBy: 'me' },
            { id: 2, title: 'Title 2', body: 'body 2', postBy: 'me' },
            { id: 3, title: 'Title 3', body: 'body 3', postBy: 'me' },
            { id: 4, title: 'Title 4', body: 'body 4', postBy: 'me' },
            { id: 5, title: 'Title 5', body: 'body 5', postBy: 'me' }
        ];
    }
    MockPostsService.prototype.getAll = function () {
        return Promise.resolve(this.posts);
    };
    MockPostsService.prototype.save = function (post) {
        this.posts.push(post);
        return Promise.resolve();
    };
    return MockPostsService;
}());
exports.MockPostsService = MockPostsService;
var NewsFeed = /** @class */ (function () {
    function NewsFeed(_service) {
        this._service = _service;
    }
    NewsFeed.prototype.show = function () {
        this._service.getAll().then(function (posts) {
            posts.forEach(function (post) {
                console.log(post.title + " - " + post.body);
            });
        });
    };
    return NewsFeed;
}());
exports.NewsFeed = NewsFeed;
var newsFeed = new NewsFeed(new MockPostsService());
newsFeed.show();
