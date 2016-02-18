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
        userList: [],
        activities: [],
        messages: []
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
                userId: this.userId
            });
        },
        handleAnonymousUser: function () {
            this.$broadcast('anonymoususer', {
                userName: this.userName,
                userAvatar: this.userAvatar,
                userId: this.userId
            });
        }
    },
    components: {
        'user-bar': require('../components/user-bar.vue'),
        'login-window': require('../components/login-window.vue'),
        'people-list': require('../components/people-list.vue'),
        'activities': require('../components/activities.vue'),
        'messages': require('../components/messages.vue'),
        'chat-input': require('../components/chat.vue')
    },
    ready: function () {
        var _myself = this;
        this.$http.get(ConfigMap.apiServer + '/serv/user/basic-info',{}, {
            xhr: {
                withCredentials: true
            }
        }).then(function (response) {
            var data= response.data;
            if (data.code === 200) {
                _myself.userName = data.userName;
                _myself.userAvatar = data.userAvatar;
                _myself.userId = data.userId;
                _myself.handleAnonymousUser();
                var socket = io();
                window.socket = socket;
                socket.on('activities', function (msg) {
                    _myself.activities = msg;
                });
                socket.on('user list', function (msg) {
                    _myself.userList = msg;
                });
                socket.on('chat messages', function (msg) {
                    if (_myself.messages.length === 0) {
                        _myself.messages = msg;
                    } else {
                        _myself.messages = _myself.messages.concat(msg);
                    }
                });
                socket.on('disconnect', function(){
                    console.log('nani?')
                });
            }
        });
    }
});


