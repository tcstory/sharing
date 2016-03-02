<template>
    <nav class="user-menu" v-bind:class="{open: openUserMenu}">
        <div class="profile" v-show="isLogin">
            <div class="user-avatar" v-bind:style="{backgroundImage: 'url(' + userAvatar + ')'}"></div>
            <div class="user-name" v-text="userName"></div>
            <div class="arrow-down" v-on:click.stop="toggleUserMenu"><i class="fa fa-chevron-down"></i></div>
        </div>
        <div class="home user-menu-btn"><i class="fa fa-home"></i><span class="menu-text">主页</span></div>
        <div class="setting user-menu-btn" v-on:click.stop="handleModifyInfo"><i class="fa fa-cog"></i><span class="menu-text">设置</span></div>
        <div v-on:click.stop="handleSignOut" class="logout user-menu-btn"><i class="fa fa-sign-out"></i><span class="menu-text">退出</span></div>
        <div class="buttons-wrapper" v-show="!isLogin">
            <div class="sign-in-btn" v-on:click.stop="handleSignIn">登录</div>
            <div class="sign-up-btn" v-on:click.stop="handleSignUp">注册</div>
        </div>
    </nav>
    <div class="modify-window-wrapper" v-show="modify">
        <div class="modify-window">
            <div class="close-btn-wrapper" v-on:click.stop="closeModifyWindow">
                <i class="fa fa-times close-btn"></i>
            </div>
            <div v-show="whichAction === 1" class="modify-basic-info-window">
                <div class="left-part">
                    <div class="row">
                        <div class="user-avatar" v-bind:style="{backgroundImage: 'url(' + userAvatarInput + ')'}"></div>
                    </div>
                    <div class="row">
                        <button class="upload-avatar-btn" v-on:click.stop="handleUploadAvatar">上传头像</button>
                        <input v-el:useravatarinput type="file" accept="image/*" style="display: none"
                               v-on:change="handleInputChange($event)">
                    </div>
                </div>
                <div class="right-part">
                    <div class="row">
                        <input type="text" placeholder="用户名" v-model="userNameInput">
                    </div>
                    <div class="row">
                        <textarea class="user-intro" placeholder="个人简介" v-model="userIntroInput"></textarea>
                    </div>
                </div>
                <button class="confirm-btn" v-on:click.stop="confirmModify">确认修改</button>
            </div>
            <div v-show="whichAction ===2" class="change-password-window">
                <div class="row"><input type="password" placeholder="旧密码" v-model="oldPassword"></div>
                <div class="row"><input type="password" placeholder="新密码" v-model="enterPassword"></div>
                <div class="row"><input type="password" placeholder="确认新密码" v-model="reenterPassword"></div>
                <div class="row"><button class="confirm-modify-password-btn" v-on:click.stop="handleModifyPassword">完成修改</button></div>
            </div>
            <div class="tabs-wrapper">
                <div class="basic-tab tab" v-on:click.stop="toggleTab(1)" v-bind:class="{selected: whichAction === 1}">基本设置</div>
                <div class="change-password-tab tab" v-on:click.stop="toggleTab(2)" v-bind:class="{selected: whichAction === 2}">修改密码</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .profile .user-avatar {
        /*background-image: url(../assets/images/user-avatar.jpg);*/
        width: 1.875rem;
        height: 1.875rem;
        border-radius: .25rem;
        background-repeat: no-repeat;
        background-size: 100%;
    }
    .profile .arrow-down {
        width: 3rem;
        height: 3rem;
        color: white;
        font-size: 1.2rem;
        text-align: center;
        line-height: 3rem;
        cursor: pointer;
    }
    .user-menu {
        background-color: rgb(42, 141, 96);
        min-height: 4rem;
    }
    .user-menu.open {
        padding-bottom: .5rem;
    }
    .user-menu .user-menu-btn {
        color: white;
        font-size: 1.5rem;
        padding: .125rem 0;
        margin: 0 1.5rem;
        cursor: pointer;
        transition: 300ms font-size;
        border-radius: .25rem;
        display: none;
    }
    .user-menu.open .user-menu-btn {
        display: block;
    }
    .user-menu .user-menu-btn:hover {
        background-color: hsla(0, 0%, 0%, 0.3);
    }
    .user-menu-btn .menu-text {
        font-size: 14px;
        margin-left: .25rem;
    }
    .user-menu-btn .fa {
        vertical-align: text-bottom;
    }
    .user-menu .profile {
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -webkit-align-items: center;
        align-items: center;
        width: 100%;
        height: 4rem;
        padding: .5rem 1.5rem;
    }
    .profile .user-name {
        width: 6.25rem;
        color: white;
    }
    .user-menu .sign-up-btn{
        height: 2rem;
        width: 5rem;
        border: 1px solid white;
        text-align: center;
        line-height: 2rem;
        color: white;
        cursor: pointer;
    }
    .user-menu .sign-in-btn {
        height: 2rem;
        width: 5rem;
        border: 1px solid white;
        text-align: center;
        line-height: 2rem;
        color: white;
        cursor: pointer;
    }
    .buttons-wrapper {
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: space-around;
        justify-content: space-around;
        -webkit-align-items: center;
        align-items: center;
        height: 4rem;
    }
    .modify-window-wrapper {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-color: hsla(0, 0%, 0%, 0.7);
        z-index: 200;
    }
    .modify-window {
        border-radius: .5rem;
        width: 25rem;
        margin: 12.5rem auto;
        background-color: white;
        position: relative;
    }
    .modify-basic-info-window {
        padding: 1rem;
        padding-bottom: 2.5rem;
    }
    .modify-window .left-part {
        width: 6.25rem;
        float: left;
    }
    .modify-window .right-part {
        overflow: hidden;
    }
    .modify-window .user-avatar {
        width: 3rem;
        height: 3rem;
        border-radius: .25rem;
        display: inline-block;
        background-size: contain;
        background-repeat: no-repeat;
    }
    .modify-window .upload-avatar-btn {
        border: none;
        width: 4rem;
        height: 1.75rem;
        color: hsl(0, 100%, 100%);
        font-size: .75rem;
        border-radius: 1rem;
        background-color: hsl(88, 50%, 53%);
        cursor: pointer;
        outline: none;
    }
    .left-part .row {
        text-align: center;
        margin-bottom: 1rem;
    }
    .right-part .row {
        margin-bottom: 1rem;
    }
    .left-part .row:first-child {
        padding-top: 1.5rem;
    }
    .right-part .row > input {
        width: 11.25rem;
        height: 2rem;
    }
    .right-part {
        padding-left: 1rem;
        border-left: 1px dotted hsl(36, 100%, 50%);
    }
    .right-part .user-intro {
        width: 15rem;
        height: 5rem;
        resize: none;
    }
    .modify-window .confirm-btn {
        position: absolute;
        left: 50%;
        margin-left: -2.5rem;
        cursor: pointer;
        border: none;
        width: 5rem;
        height: 2rem;
        color: hsl(0, 100%, 100%);
        font-size: .75rem;
        border-radius: 1rem;
        background-color: hsl(207, 90%, 54%);
        outline: none;
    }
    .modify-window .close-btn-wrapper {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        transition: 300ms all;
        cursor: pointer;
        position: absolute;
        right: 1rem;
        top: .5rem;
    }
    .modify-window .close-btn-wrapper:hover {
        background-color: hsl(0, 0%, 50%);
    }
    .modify-window .close-btn {
        font-size: 1.5rem;
        color: hsl(14, 100%, 57%);
    }
    .tabs-wrapper {
        position: absolute;
        left: 1rem;
        font-size: .875rem;
        bottom: 100%;
        display: flex;
    }
    .tabs-wrapper .tab {
        padding: .25rem .5rem 0;
        color: white;
        cursor: pointer;
        background-color: hsl(0, 0%, 62%);
    }
    .tabs-wrapper .basic-tab {
        border-top-left-radius: .5rem;
    }
    .tabs-wrapper .change-password-tab {
        border-top-right-radius: .5rem;
    }
    .tabs-wrapper .tab.selected {
        color: hsl(0, 100%, 100%);
        background-color: hsl(122, 39%, 49%);
    }
    .change-password-window {
        padding: 1rem;

    }
    .change-password-window .row {
        text-align: center;
        margin-bottom: .8rem;
    }
    .change-password-window .row:last-child {
        margin-bottom: 0;
    }
    .change-password-window .row > input {
        width: 11.25rem;
        height: 2rem;
    }
    .change-password-window .confirm-modify-password-btn {
        cursor: pointer;
        border: none;
        width: 5rem;
        height: 2rem;
        color: hsl(0, 100%, 100%);
        font-size: .75rem;
        border-radius: 1rem;
        background-color: hsl(207, 90%, 54%);
        outline: none;
    }
</style>

<script>
    "use strict";
    var configMap = {
        modifyInfo: 1,
        changePassword:2
    };
    module.exports = {
        data: function () {
            return {
                openUserMenu: false,
                userName: '',
                userAvatar: '',
                userIntroInput: '',
                userNameInput: '',
                userAvatarInput: '',
                userIntro: '',
                userId: -1,
                modify: false,
                whichAction: configMap.modifyInfo,
                oldPassword: '',
                enterPassword: '',
                reenterPassword: ''
            }
        },
        computed: {
            isLogin: function () {
                if (this.userId !== -1) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            toggleUserMenu: function () {
                this.openUserMenu = !this.openUserMenu;
            },
            toggleTab: function (whichAction) {
                this.whichAction = whichAction;
            },
            handleSignOut: function () {
                this.$http.get(ConfigMap.apiServer + '/serv/user/sign-out',{}, {
                    xhr: {
                        withCredentials: true
                    }
                }).then(function (response) {
                    if (response.data.code === 200) {
                        window.location.reload();
                    }
                });
//                this.$dispatch('handlesignout');
            },
            handleSignIn: function () {
                this.$dispatch('handlesignin')
            },
            handleSignUp: function () {
                this.$dispatch('handlesignup')
            },
            handleModifyInfo: function () {
                this.modify = true;
                this.openUserMenu = false;
                this.userNameInput = this.userName;
                this.userAvatarInput =this.userAvatar;
                this.userIntroInput = this.userIntro;
            },
            closeModifyWindow: function () {
                this.modify = false;
                if (this.whichAction === 2) {
                    this.cleanPasswordTab();
                } else if (this.whichAction === 1) {
                    this.userNameInput = '';
                    this.userAvatarInput = '';
                    this.userIntroInput =  '';
                }
            },
            handleUploadAvatar: function () {
                this.$els.useravatarinput.click();
            },
            handleInputChange: function (ev) {
                var _myself = this;
                var file = ev.target.files[0];
                if (file.size > 200000) {
                    this.$dispatch('handleshowmessagewindow', {
                        title: '错误',
                        content: '上传的头像太大',
                        type: 'error'
                    });
                    ev.target.files = [];
                    ev.target.value = '';
                    _myself.userAvatarInput = '';
                } else {
                    var reader = new FileReader();
                    reader.onload = function (ev) {
                        _myself.userAvatarInput = reader.result;
                    };
                    reader.readAsDataURL(file);
                }
            },
            confirmModify: function () {
                var _myself = this;
                var data = new FormData();
                data.append('userAvatar',_myself.$els.useravatarinput.files[0]);
                data.append('userName',_myself.userNameInput);
                data.append('userIntro',_myself.userIntroInput);
                var xhr = new XMLHttpRequest();
                xhr.open('post',ConfigMap.apiServer + '/serv/user/modify-data');
                xhr.onload = function () {
                    var response = JSON.parse(xhr.responseText);
                    var msg = response.msg;
                    if (response.code === 200) {
                        this.userName = this.userNameInput;
                        this.userAvatar =this.userAvatarInput;
                        this.userIntro = this.userIntroInput;
                        _myself.modify = false;
                        msg.type = 'success';
                        _myself.$dispatch('handleshowmessagewindow',msg);
                    } else {
                        msg.type = 'error';
                        _myself.$dispatch('handleshowmessagewindow', msg);
                    }
                };
                xhr.send(data);
            },
            handleModifyPassword: function () {
                var _myself = this;
                if(_myself.enterPassword !== _myself.reenterPassword) {
                    _myself.$dispatch('handleshowmessagewindow',{
                        type: 'error',
                        title: '错误',
                        content: '两次输入的密码不一致'
                    });
                    return;
                }
                var xhr = new XMLHttpRequest();
                xhr.open('post',ConfigMap.apiServer + '/serv/user/modify-password');
                xhr.onload = function () {
                    var response = JSON.parse(xhr.responseText);
                    var msg = response.msg;
                    if (response.code === 200) {
                        _myself.modify = false;
                        _myself.cleanPasswordTab();
                        msg.type = 'success';
                        _myself.$dispatch('handleshowmessagewindow',msg);
                    } else {
                        msg.type = 'error';
                        _myself.$dispatch('handleshowmessagewindow', msg);
                    }
                };
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    newPassword: _myself.enterPassword,
                    oldPassword: _myself.oldPassword
                }))
            },
            cleanPasswordTab: function () {
                this.oldPassword = '';
                this.enterPassword = '';
                this.reenterPassword = '';
                this.whichAction = 1;
            }
        },
        events: {
            'userhadsignedin': function (data) {
                this.userName = data.userName;
                this.userAvatar = data.userAvatar;
                this.userId = data.userId;
                this.userPassword = data.userPassword;
                this.userIntro = data.userIntro;
            },
            'userhadsignedout': function () {
                this.openUserMenu = false;
                Utils.clearUserData(this);
            }
        }
    }
</script>