/**
 * Created by tcstory on 1/15/16.
 */
"use strict";

require('../css/app.css');
require('../css/font-awesome/css/font-awesome.css');
var Vue = require('./vendor/vue/vue.js');
Vue.use(require('vue-resource'));
var v = new Vue({
    el: 'body',
    data: {
        userName: '',
        userAvatar: '',
        userList: [{
            userName: '爱情来过',
            userId: 10000,
            userAvatar: 'http://7qn8rp.com1.z0.glb.clouddn.com/dog.jpg'
        }, {
            userName: '中华田园犬',
            userId: 10001,
            userAvatar: 'http://7qn8rp.com1.z0.glb.clouddn.com/dog.jpg'
        }, {
            userName: '大兄弟',
            userId: 10002,
            userAvatar: 'http://7qn8rp.com1.z0.glb.clouddn.com/dog.jpg'
        }],
        activities: [
            {
                userName: '中华田园犬',
                userId: 10001,
                action: 'join'
            },
            {
                userName: '大兄弟',
                userId: 10002,
                action: 'leave'
            }
        ]
    },
    methods: {},
    components: {
        'user-bar': require('../components/user-bar.vue'),
        'login-window': require('../components/login-window.vue'),
        'people-list': require('../components/people-list.vue'),
        'activities': require('../components/activities.vue'),
        'messages': require('../components/messages.vue')
    },
    events: {
        'signout': function () {
            console.log('signout')
        },
        'signin': function () {
            this.$broadcast('handlesignin');
        },
        'signup': function () {
            this.$broadcast('handlesignup');
        },
        'signinsuccess': function (data) {
            this.userName = data.userName;
            this.userAvatar = data.userAvatar;
            this.$broadcast('userhadlogined');
        }
    }

});