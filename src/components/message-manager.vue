<template>
    <div class="message-window-wrapper" v-show="messages.length!==0">
        <div v-for="message in messages" class="message-window" v-bind:class="message.type">
            <div class="close-window-btn" v-on:click.stop="removeMessage"><i class="fa fa-times "></i></div>
            <header class="message-title" v-text="message.title"></header>
            <p class="message-content" v-text="message.content"></p>
        </div>
    </div>
</template>

<style scoped>
    .message-window-wrapper {
        position: fixed;
        right: 1rem;
        top: 0;
        z-index: 500;
    }
    .message-window {
        width: 15rem;
        min-height: 4rem;
        border-radius: .5rem;
        padding: 1em 1.5em;
        -webkit-transition: 450ms all;
        transition: 405ms all;
        visibility: hidden;
        opacity: 0;
        margin-top: 1rem;
    }
    .message-window.error {
        box-shadow: 0 0 0 1px hsl(0, 42%, 79%) inset, 0 0 0 0 hsla(0, 0%, 0%, 0);
        color: hsl(1, 48%, 42%);
        background-color: hsl(0, 100%, 98%);
        /*-webkit-transform: translateY(1rem);*/
        /*transform: translateY(1rem);*/
        visibility: visible;
        opacity: 1;
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
    var configMap = {
        maxMessageNumber: 3
    };
    module.exports = {
        data: function () {
            return {
                messages: []
            }
        },
        watch: {
            messages: function () {
                if(this.messages.length > configMap.maxMessageNumber) {
                    this.messages.shift();
                }
            }
        },
        methods: {
            removeMessage: function () {
            }
        },
        events: {
            'showmessagewindow': function (msg) {
                this.messages.unshift(msg);
            }
        }
    }
</script>