/**
 * Created by tcstory on 1/15/16.
 */
"use strict";

require('../css/app.css');
require('../css/font-awesome/css/font-awesome.css');
var io = require("socket.io-client");
var Vue = require('./vendor/vue/vue.js');
Vue.use(require('vue-resource'));

var v = new Vue({
    el: 'body',
    data: {
        userName: '',
        userAvatar: '',
        userId: -1,
        userIntro: '',
        userList: [],
        activities: [],
        messages: [],
        roomLogo: '',
        roomName: '',
        roomDescription: '',
        curLabel: 'chat'
    },
    methods: {
        handleSignIn: function () {
            this.$broadcast('signin');
        },
        handleSignOut: function () {
            Utils.clearUserData(this);
            this.$broadcast('userhadsignedout');
        },
        handleSignUp: function () {
            this.$broadcast('signup');
        },
        handleSignInSuccess: function (data) {
            this.userName = data.userName;
            this.userAvatar = data.userAvatar;
            this.userId = data.userId;
            this.$broadcast('userhadsignedin', {
                userName: this.userName,
                userAvatar: this.userAvatar,
                userId: this.userId,
                userIntro: data.userIntro
            });
        },
        handleAnonymousUser: function (data) {
            this.userName = data.userName;
            this.userAvatar = data.userAvatar;
            this.userId = data.userId;
            this.$broadcast('anonymoususer', {
                userName: this.userName,
                userAvatar: this.userAvatar,
                userId: this.userId
            });
        },
        handleShowMessageWindow: function (msg) {
            this.$broadcast('showmessagewindow',msg)
        },
        handleToggle: function () {
            if (this.curLabel === 'chat') {
                this.curLabel = 'forum';
                getPostsList();
            } else {
                this.curLabel = 'chat';
            }
        }
    },
    components: {
        'user-bar': require('../components/user-bar.vue'),
        'login-window': require('../components/login-window.vue'),
        'people-list': require('../components/people-list.vue'),
        'activities': require('../components/activities.vue'),
        'messages': require('../components/messages.vue'),
        'chat-input': require('../components/chat.vue'),
        'message-manager': require('../components/message-manager.vue'),
        'room-manager': require('../components/room-manager.vue'),
        'tieba': require('../components/tieba.vue')
    },
    ready: function () {
        var _myself = this;
        this.$http.get('/serv/user/basic-info',{}, {
            xhr: {
                withCredentials: true
            }
        }).then(function (response) {
            var data= response.data;
            if (data.code === 200) {
                if (/^u.*/.test(data.userId)) {
                    _myself.handleSignInSuccess({
                        userName: data.userName,
                        userAvatar: data.userAvatar,
                        userId: data.userId,
                        userIntro: data.userIntro
                    })
                } else {
                    _myself.handleAnonymousUser({
                        userName: data.userName,
                        userAvatar: data.userAvatar,
                        userId: data.userId
                    });
                }
                _myself.roomName = data.roomName;
                _myself.roomDescription = data.roomDescription;
                _myself.roomLogo = data.roomLogo;
                var socket = io();
                window.socket = socket;
                socket.on('activities', function (msg) {
                    _myself.activities.unshift(msg);
                });
                socket.on('user list', function (msg) {
                    _myself.userList = msg;
                });
                socket.on('chat messages', function (msg) {
                    if (Array.isArray(msg)) {
                        _myself.messages = msg;
                    } else {
                        _myself.messages.push(msg);
                    }
                });
                socket.on('disconnect', function(){
                    console.log('nani?')
                });
            }
        });
    }
});

function getPostsList() {
    var xhr = new XMLHttpRequest();
    xhr.open('get','serv/post/get-post-list');
    xhr.onload = function () {
        var response = JSON.parse(xhr.responseText);
        if (response.code === 200) {
            v.$broadcast('getpostlist',response.posts);
        }
    };
    xhr.send();
}


