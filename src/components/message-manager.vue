<template>
    <div class="message-window" v-bind:class="{open: openMessageWindow,error: error}">
        <div class="close-window-btn" v-on:click.stop="closeMessageWindow"><i class="fa fa-times "></i></div>
        <header class="message-title" v-text="msgObj.title"></header>
        <p class="message-content" v-text="msgObj.content"></p>
    </div>
</template>

<style scoped>
    .message-window {
        width: 15rem;
        min-height: 4rem;
        border-radius: .5rem;
        padding: 1em 1.5em;
        position: fixed;
        right: 1rem;
        top: 0;
        -webkit-transition: 450ms all;
        transition: 450ms all;
        visibility: hidden;
        opacity: 0;
        z-index: 500;
    }
    .message-window.error {
        box-shadow: 0 0 0 1px hsl(0, 42%, 79%) inset, 0 0 0 0 hsla(0, 0%, 0%, 0);
        color: hsl(1, 48%, 42%);
        background-color: hsl(0, 100%, 98%);
    }
    .message-title {
        font-size: 1rem;
        font-weight: bold;
    }

    .message-content {
        opacity: .85;
        font-size: .875rem;
    }

    .close-window-btn {
        position: absolute;
        right: 1rem;
        cursor: pointer;
    }

    .message-window.open {
        -webkit-transform: translateY(1rem);
        transform: translateY(1rem);
        visibility: visible;
        opacity: 1;
    }
</style>

<script>
    "use strict";
    module.exports = {
        data: function () {
            return {
                openMessageWindow: false,
                error: false,
                msgObj: {
                    title: '',
                    content: ''
                }
            }
        },
        methods: {
            closeMessageWindow: function () {
                this.openMessageWindow = false;
            }
        },
        events: {
            'showmessagewindow': function (msg) {
                this.error = true;
                this.msgObj.title = msg.title;
                this.msgObj.content = msg.content;
                this.openMessageWindow = true;
            }
        }
    }
</script>