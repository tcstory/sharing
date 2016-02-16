<template>
    <div class="login-window" v-show="displayLoginWindow"
         v-on:click.stop="closeLoginWindow">
        <div class="login-form" v-show="isLoginPane" v-on:click.stop="preventBubble">
            <header class="title">登录</header>
            <div class="row"><input type="text" placeholder="用户名" v-model="userName"></div>
            <div class="row"><input type="password" placeholder="密码" v-model="userPassword"></div>
            <div class="row">
                <button class="sign-in-btn" v-on:click.stop="signIn">登录</button>
            </div>
            <div class="row">
                <p class="login-link" v-on:click.stop="toggleForm(false)">还未注册?立即体验</p>
            </div>
        </div>
        <div class="signup-form" v-show="!isLoginPane" v-on:click.stop="preventBubble">
            <header class="title">注册</header>
            <div class="row"><input type="text" placeholder="用户名" v-model="userName"></div>
            <div class="row"><input type="password" placeholder="密码" v-model="userPassword"></div>
            <div class="row"><input type="password" placeholder="密码" v-model="reenteredPassword"></div>
            <div class="row">
                <button class="sign-in-btn" v-on:click.stop="signUp">注册</button>
            </div>
            <div class="row">
                <p class="login-link" v-on:click.stop="toggleForm(true)">已有账号?马上体验</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .login-window {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 200;
    }

    .login-form {
        width: 18.75rem;
        text-align: center;
        padding-top: 2.5rem;
        background-color: #fff;
        border-radius: 5px;
        padding-bottom: .625rem;
        margin: 10rem auto;
    }

    .login-form .title {
        text-align: center;
        color: #777;
        font-size: 24px;
        margin-bottom: 1.25rem;
    }

    .login-form .row {
        margin: .625rem;
    }

    .login-form input {
        width: 15.625rem;
        text-align: center;
        background-color: #ECF0F1;
        border: 2px solid transparent;
        border-radius: 3px;
        font-size: 1rem;
        font-weight: 200;
        padding: 10px 0;
        transition: border .5s;
        outline: none;
    }

    .login-form input:focus {
        border: 2px solid #3498DB;
        box-shadow: none;
    }

    .login-form .sign-in-btn {
        border: 2px solid transparent;
        background: #3498DB;
        color: #ffffff;
        font-size: 16px;
        line-height: 25px;
        padding: 10px 0;
        text-decoration: none;
        text-shadow: none;
        border-radius: 3px;
        box-shadow: none;
        transition: 0.25s;
        display: block;
        width: 250px;
        margin: 0 auto;
        outline: none;
        cursor: pointer;
    }

    .login-form .sign-in-btn:hover {
        background-color: #2980B9;
    }

    .login-form .login-link {
        font-size: 12px;
        color: #444;
        display: block;
        margin-top: 12px;
    }

    .signup-form {
        width: 18.75rem;
        text-align: center;
        padding-top: 2.5rem;
        background-color: #fff;
        border-radius: 5px;
        padding-bottom: .625rem;
        margin: 10rem auto;
    }

    .signup-form .title {
        text-align: center;
        color: #777;
        font-size: 24px;
        margin-bottom: 1.25rem;
    }

    .signup-form .row {
        margin: .625rem;
    }

    .signup-form input {
        width: 15.625rem;
        text-align: center;
        background-color: #ECF0F1;
        border: 2px solid transparent;
        border-radius: 3px;
        font-size: 1rem;
        font-weight: 200;
        padding: 10px 0;
        transition: border .5s;
        outline: none;
    }

    .signup-form input:focus {
        border: 2px solid #3498DB;
        box-shadow: none;
    }

    .signup-form .sign-in-btn {
        border: 2px solid transparent;
        background: #3498DB;
        color: #ffffff;
        font-size: 16px;
        line-height: 25px;
        padding: 10px 0;
        text-decoration: none;
        text-shadow: none;
        border-radius: 3px;
        box-shadow: none;
        transition: 0.25s;
        display: block;
        width: 250px;
        margin: 0 auto;
        outline: none;
        cursor: pointer;
    }

    .signup-form .sign-in-btn:hover {
        background-color: #2980B9;
    }

    .signup-form .login-link {
        font-size: 12px;
        color: #444;
        display: block;
        margin-top: 12px;
    }
</style>

<script>
    "use strict";
    module.exports = {
        data: function () {
            return {
                displayLoginWindow: false,
                isLoginPane: false,
                userName: '',
                userPassword: '',
                reenteredPassword: ''
            }
        },
        methods: {
            toggleForm: function (value) {
                this.isLoginPane = value;
                resetLoginWindow(this);
            },
            closeLoginWindow: function () {
                this.displayLoginWindow = false;
            },
            preventBubble: function () {

            },
            signIn: function () {
                var _myself = this;
                if (Utils.validate(_myself.userName)) {
                    _myself.$http.post(ConfigMap.apiServer + '/serv/user/sign-in', {
                        user_name: _myself.userName,
                        user_password: _myself.userPassword
                    }).then(function (response) {
                        Utils.clearUserData(_myself);
                        if (response.data.code === 200) {
                            _myself.displayLoginWindow = false;
                            resetLoginWindow(_myself);
                            _myself.$dispatch('handlesigninsuccess',{
                                userName: response.data.userName,
                                userAvatar: response.data.userAvatar,
                                userId: response.data.userId
                            });
                        } else {
                            _myself.$dispatch('handlesigninerror');
                        }
                    })
                } else {
                    Utils.clearUserData(_myself);
                }
            },
            signUp: function () {

            }
        },
        events: {
            'signin': function () {
                this.displayLoginWindow = true;
                this.isLoginPane = true;
            },
            'signup': function () {
                this.displayLoginWindow = true;
                this.isLoginPane = false;
            }
        }
    };
    function resetLoginWindow(instance) {
        if (instance.isLoginPane) {
            instance.userName = '';
            instance.userPassword = '';
            instance.reenteredPassword = ''
        } else {
            instance.userName = '';
            instance.userPassword = '';
        }
    }

</script>