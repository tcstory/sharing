<template>
    <div class="room-manager-wrapper">
        <div class="toggle-btn" v-on:click="toggleWindow">
            <i class="fa fa-th" v-show="open"></i>
            <i class="fa fa-th-large" v-show="!open"></i>
        </div>
        <ul class="menu" v-show="open">
            <li class="menu-item" v-on:click.stop="createNewRoom">创建房间</li>
            <li class="menu-item">修改房间</li>
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
                        <div class="room-logo" v-bind:style="{backgroundImage: 'url(' + logoImg + ')'}"></div>
                        <div class="logo-cover" v-show="showLogoCover"><i class=" fa fa-camera-retro"></i></div>
                    </div>
                    <input v-el:roomlogo type="file" accept="image/*" style="display: none"
                           v-on:change="handleInputChange($event)" class="room-logo-input">
                    <button class="upload-btn" v-on:click.stop="handleUploadLogo">上传</button>
                </div>
                <div class="row input-row">
                    <input type="text" v-model="roomName" placeholder="房间名字">
                </div>
                <div class="row input-row">
                    <input type="text" v-model="roomDescription" placeholder="房间介绍">
                </div>
                <div class="row btn-row">
                    <button class="confirm-btn" v-on:click.stop="handleConfirmCreateRoom">确定创建</button>
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
</style>


<script>
    module.exports = {
        data: function () {
            return {
                open: false,
                showFormWindow: false,
                logoImg: '',
                showLogoCover: true,
                roomName: '',
                roomDescription: ''
            }
        },
        methods: {
            toggleWindow: function () {
                this.open = !this.open;
            },
            createNewRoom: function () {
                this.showFormWindow = true;
            },
            closeFormWindow: function () {
                this.showFormWindow = false;
                this.roomName = '';
                this.roomDescription= '';
                this.$els.roomlogo.files = [];
                this.logoImg = '';
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
                    _myself.logoImg = '';
                    _myself.showLogoCover = true;
                } else {
                    var reader = new FileReader();
                    reader.onload = function (ev) {
                        _myself.logoImg = reader.result;
                        _myself.showLogoCover = false;
                    };
                    reader.readAsDataURL(file);
                }
            },
            handleConfirmCreateRoom: function () {
                var _myself = this;
                var data = new FormData();
                data.append('roomLogo',_myself.$els.roomlogo.files[0]);
                data.append('roomName',_myself.roomName);
                data.append('roomDescription',_myself.roomDescription);
                var xhr = new XMLHttpRequest();
                xhr.open('post',ConfigMap.apiServer + '/serv/room/create-room');
                xhr.onload = function () {
                    var response = JSON.parse(xhr.responseText);
                    var msg = response.msg;
                    if (response.code === 200) {
                        _myself.$dispatch('handleshowmessagewindow',msg);
                    } else {
                        msg.type = 'error';
                        _myself.$dispatch('handleshowmessagewindow', msg);
                    }
                };
                xhr.send(data);
            }
        }
    };

</script>