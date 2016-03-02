<template>
    <div class="people-list">
        <header>用户</header>
        <div class="users">
            <div class="user" v-for="user in userList" v-bind:style="{backgroundImage: 'url('+ user.userAvatar + ')'}"></div>
        </div>
    </div>
</template>

<style scoped>
    .people-list {
        margin-bottom: 2em;
        font-weight: 400;
        margin-top: 1rem;
    }
    .people-list header {
        color: rgb(51, 51, 51);
    }
    .users {
        min-height: 2.5rem;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        align-content: space-around;
    }
    .users .user {
        margin: .25rem;
        width: 1.875rem;
        height: 1.875rem;
        border-radius: .25rem;
        background-repeat: no-repeat;
        cursor: pointer;
        background-size: 100%;
    }
</style>

<script>
    module.exports = {
        props: ['userList'],
        data: function () {
            return {

            }
        }
    }
</script>