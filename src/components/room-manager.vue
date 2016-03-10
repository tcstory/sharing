<template>
    <div class="room-manager-wrapper">
        <div class="toggle-btn" v-on:click="toggleWindow">
            <i class="fa fa-th" v-show="open"></i>
            <i class="fa fa-th-large" v-show="!open"></i>
        </div>
        <ul class="menu" v-show="open">
            <li class="menu-item" v-on:click.stop="handleJoinRoom">加入房间</li>
            <li class="menu-item" v-show="userId[0] === 'u'" v-on:click.stop="createNewRoom">创建房间</li>
            <li class="menu-item" v-show="userId[0] === 'u'" v-on:click.stop="modifyRoom">修改房间</li>
        </ul>
        <div class="form-window-wrapper" v-show="showFormWindow">
            <div class="form-window">
                <div class="row close-btn-row">
                    <div class="close-btn-wrapper">
                        <i class="fa fa-times close-btn" v-on:click.stop="closeFormWindow"></i>
                    </div>
                </div>
                <div class="row logo-row">
                    <div class="room-logo-wrapper">
                        <div class="room-logo" v-bind:style="{backgroundImage: 'url(' + roomLogo + ')'}"></div>
                        <div class="logo-cover" v-show="showLogoCover"><i class=" fa fa-camera-retro"></i></div>
                    </div>
                    <input v-el:roomlogo type="file" accept="image/*" style="display: none"
                           v-on:change="handleInputChange($event)" class="room-logo-input">
                    <button class="upload-btn" v-on:click.stop="handleUploadLogo">上传</button>
                </div>
                <div class="row input-row">
                    <input type="text" v-model="roomName" placeholder="房间名字" v-bind:disabled="action === 2 ? true: false">
                </div>
                <div class="row input-row">
                    <input type="text" v-model="roomDescription" placeholder="房间介绍">
                </div>
                <div class="row btn-row">
                    <button class="confirm-btn" v-on:click.stop="handleConfirmCreateRoom" v-show="action === 1">确定创建</button>
                    <button class="confirm-btn" v-on:click.stop="handleConfirmModifyRoom" v-show="action === 2">完成修改</button>
                </div>
            </div>
        </div>
        <div class="join-room-window-wrapper" v-show="showJoinRoomWindow">
            <div class="join-room-window">
                <div class="close-btn-wrapper" v-on:click.stop="closeJoinRoomWindow">
                    <i class="fa fa-times close-btn"></i>
                </div>
                <div class="row">
                    <input type="text" placeholder="请输入房间名字" v-model="searchRoomName">
                </div>
                <div class="row">
                    <div class="room-list" v-show="searchedResult.length !== 0">
                        <div class="room-item" v-for="room in searchedResult">
                            <i class="room-icon fa fa-users"></i>
                            <span class="room-name" v-text="room.roomName"></span>
                            <i class="join-icon fa fa-plus" v-on:click.stop="joinRoom(room.roomId)"></i>
                        </div>
                    </div>
                    <p class="prompt-text" v-show="searchedResult.length === 0">
                        房间不存在?<span class="create-new-room" v-on:click.stop="justCreateNewRoom">创建</span>一个吧!
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    li {
        list-style: none;
    }

    .room-manager-wrapper {
        height: 2rem;
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        padding-left: 1rem;
        background-color: hsla(187, 100%, 42%, 0.58);
    }

    .toggle-btn {
        color: hsl(54, 100%, 62%);
        font-size: 1.5rem;
        cursor: pointer;
    }

    .menu {
        position: absolute;
        bottom: 100%;
        width: 100%;
        left: 0;
        color: hsl(0, 100%, 100%);
        background-color: hsl(16, 25%, 38%);
        font-size: .875rem;
    }

    .menu-item {
        cursor: pointer;
        background-clip: content-box;
        padding: .5rem .5rem;
    }

    .menu-item:hover {
        background-color: hsla(0, 0%, 0%, 0.33);
    }

    .form-window-wrapper {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 200;
    }

    .form-window {
        background-color: hsl(0, 100%, 100%);
        width: 20rem;
        margin: 12.5rem auto;
        padding: .5rem 1rem .5rem;
        border-radius: .5rem;
    }

    .room-logo-wrapper {
        width: 3.125rem;
        height: 3.125rem;
        position: relative;
    }

    .room-logo {
        width: 3.125rem;
        height: 3.125rem;
        background-size: 100%;
        background-repeat: no-repeat;
        border-radius: .25rem;
    }

    .logo-cover {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: hsla(0, 0%, 0%, 0.7);
        color: hsl(0, 100%, 100%);
        font-size: 2rem;
        border-radius: .5rem;
        visibility: visible;
    }
    .logo-row {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .upload-btn {
        font-size: .875rem;
        height: 1.5rem;
        width: 3rem;
        line-height: 1.5rem;
        text-align: center;
        border-radius: .25rem;
        border: none;
        color: hsl(0, 100%, 100%);
        margin-top: .5rem;
        background-color: hsl(199, 98%, 48%);
        cursor: pointer;
        outline: none;
    }

    .close-btn-row {
        text-align: right;
    }

    .close-btn-wrapper {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        transition: 300ms all;
        cursor: pointer;
    }

    .close-btn-wrapper:hover {
        background-color: hsl(0, 0%, 50%);
    }

    .close-btn {
        font-size: 1.5rem;
        color: hsl(14, 100%, 57%);
    }

    .input-row {
        margin-top: 1rem;
        text-align: center;

    }

    .input-row > input {
        width: 11rem;
        height: 1.5rem;
        text-align: center;
    }

    .btn-row {
        text-align: center;
        margin-top: 1rem;
    }

    .confirm-btn {
        height: 2rem;
        width: 4rem;
        font-size: .8rem;
        background-color: hsl(262, 52%, 47%);
        border: none;
        color: hsl(0, 100%, 100%);
        border-radius: 1rem;
        cursor: pointer;
        outline: none;
    }
    .confirm-btn.disabled {
        background-color: gray;
        pointer-events: none;
    }
    .join-room-window-wrapper {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 200;
    }
    .join-room-window {
        width: 20rem;
        position: relative;
        margin: 12.5rem auto;
        padding: 2rem 1rem .5rem;
        border-radius: .5rem;
        background-color: white;
    }
    .join-room-window .close-btn-wrapper {
        position: absolute;
        right: .5rem;
        top: .5rem;
    }
    .join-room-window .row {
    }
    .join-room-window .row:nth-of-type(2) {
        margin-bottom: 1rem;
        text-align: center;
    }
    .join-room-window .row > input {
        width: 11rem;
        height: 1.5rem;
        text-align: center;
    }
    .room-list {
        font-size: .875rem;
    }
    .room-list .room-item {
        width: 11rem;
        height: 1.5rem;
        margin: 0 auto;
    }
    .room-list .room-icon {
        color: hsl(207, 90%, 54%);
        margin-right: .25rem;
    }
    .room-list .join-icon {
        cursor: pointer;
        float: right;
        color: hsl(122, 39%, 49%);
    }
    .join-room-window .prompt-text {
        font-size: 14px;
        text-align: center;
    }
    .join-room-window .create-new-room {
        color: hsl(207, 90%, 54%);
        cursor: pointer;
        font-weight: 600;
    }
</style>


<script>
    var configMap = {
        createRoom: 1,
        modifyRoom:2,
        searchDelay: 1000
    };
    var timeId = -1;
    module.exports = {
        props:['userId'],
        data: function () {
            return {
                open: false,
                showFormWindow: false,
                roomLogo: '',
                showLogoCover: true,
                roomName: '',
                roomDescription: '',
                action: -1,
                showJoinRoomWindow: false,
                searchedResult: [],
                searchRoomName: ''
            }
        },
        watch: {
            searchRoomName: function (newVal,oldVal) {
                if (newVal != '') {
                    var _myself = this;
                    if (timeId === -1) {
                        timeId = setTimeout(function () {
                            var xhr = new XMLHttpRequest();
                            xhr.open('get', '/serv/room/get-room-list/' + newVal);
                            xhr.onload = function () {
                                timeId = -1;
                                var response  = JSON.parse(xhr.responseText);
                                if (response.code === 200) {
                                    _myself.searchedResult = response.result;
                                } else {

                                }
                            };
                            xhr.send();
                        }, configMap.searchDelay)
                    } else {
                        clearTimeout(timeId);
                        timeId = -1;
                    }
                } else {
                    this.searchedResult = [];
                }
            }
        },
        methods: {
            toggleWindow: function () {
                this.open = !this.open;
            },
            createNewRoom: function () {
                this.action = configMap.createRoom;
                this.showFormWindow = true;
            },
            modifyRoom: function () {
                var _myself = this;
                var xhr = new XMLHttpRequest();
                xhr.open('get', '/serv/room/room-info');
                xhr.onload = function () {
                    var response = JSON.parse(xhr.responseText);
                    if (response.code === 200) {
                        _myself.roomName = response.roomName;
                        _myself.roomDescription = response.roomDescription;
                        _myself.roomLogo = response.roomLogo;
                        _myself.showLogoCover = false;
                        _myself.action = configMap.modifyRoom;
                        _myself.showFormWindow = true;
                    }
                };
                xhr.send();

            },
            closeFormWindow: function () {
                this.showFormWindow = false;
                this.roomName = '';
                this.roomDescription= '';
                this.$els.roomlogo.value = '';
                this.$els.roomlogo.files = [];
                this.roomLogo = '';
                this.showLogoCover = true;
            },
            handleUploadLogo: function () {
                document.querySelector('.room-logo-input').click();
            },
            handleInputChange: function (ev) {
                var _myself = this;
                var file = ev.target.files[0];
                if (file.size > 200000) {
                    this.$dispatch('handleshowmessagewindow', {
                        title: '错误',
                        content: '上传的图片太大',
                        type: 'error'
                    });
                    ev.target.files = [];
                    ev.target.value = '';
                    _myself.roomLogo = '';
                    _myself.showLogoCover = true;
                } else {
                    var reader = new FileReader();
                    reader.onload = function (ev) {
                        _myself.roomLogo = reader.result;
                        _myself.showLogoCover = false;
                    };
                    reader.readAsDataURL(file);
                }
            },
            handleConfirmCreateRoom: function () {
                var _myself = this;
                if (_myself.roomName === '') {
                    var msg = {
                        type: 'error',
                        title: '错误',
                        content: '房间的名字不能为空'
                    };
                    _myself.$dispatch('handleshowmessagewindow', msg);
                    return;
                }
                var data = new FormData();
                data.append('roomLogo',_myself.$els.roomlogo.files[0]);
                data.append('roomName',_myself.roomName);
                data.append('roomDescription',_myself.roomDescription);
                var xhr = new XMLHttpRequest();
                xhr.open('post','/serv/room/create-room');
                xhr.onload = function () {
                    var response = JSON.parse(xhr.responseText);
                    var msg = response.msg;
                    if (response.code === 200) {
                        _myself.closeFormWindow();
                        msg.type = 'success';
                        _myself.$dispatch('handleshowmessagewindow',msg);
                    } else {
                        msg.type = 'error';
                        _myself.$dispatch('handleshowmessagewindow', msg);
                    }
                };
                xhr.send(data);
            },
            handleConfirmModifyRoom: function () {
                var _myself = this;
                var data = new FormData();
                if (_myself.$els.roomlogo.files[0]) {
                    data.append('roomLogo',_myself.$els.roomlogo.files[0]);
                }
                data.append('roomDescription',_myself.roomDescription);
                var xhr = new XMLHttpRequest();
                xhr.open('post','/serv/room/modify-room');
                xhr.onload = function () {
                    var response = JSON.parse(xhr.responseText);
                    var msg = response.msg;
                    if (response.code === 200) {
                        _myself.closeFormWindow();
                        msg.type = 'success';
                        _myself.$dispatch('handleshowmessagewindow',msg);
                    }
                };
                xhr.send(data);
            },
            handleJoinRoom: function () {
                this.showJoinRoomWindow = true;
            },
            closeJoinRoomWindow: function () {
                this.searchRoomName = '';
                this.showJoinRoomWindow = false;
            },
            justCreateNewRoom: function () {
                this.searchRoomName = '';
                this.showJoinRoomWindow = false;
                this.createNewRoom();
            },
            joinRoom: function (roomId) {
                var xhr = new XMLHttpRequest();
                xhr.open('get', '/serv/room/join-room/' + roomId);
                xhr.onload = function () {
                    var response = JSON.parse(xhr.responseText);
                    if (response.code === 200) {
                        location.reload();
                    }
                };
                xhr.send();
            }
        }
    };

</script>