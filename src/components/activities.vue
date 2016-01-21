<template>
    <div class="activities">
        <header>活动</header>
        <div class="activity" v-for="activity in activities">
            <span class="activity-icon">
                <i class="fa fa-user"></i>
            </span>
            <span class="user-name" v-text="activity.userName"></span>
            <span class="action-text" v-text="getActionText(activity)"></span>
        </div>
        <!--<div class="activity">-->
            <!--<span class="activity-icon"><i class="fa fa-user"></i></span><span class="user-name" v-text="activity.userName"></span>离开了房间-->
        <!--</div>-->
    </div>
</template>

<style scoped>
    .activity header {
        color: rgb(51, 51, 51);
    }
    .activity {
        font-size: .875rem;
        color: #5A5A5A;
        margin-bottom: .5rem;
    }
    .activity .activity-icon {

        margin-right: .5rem;
    }
    .activity .user-name {
        background-color: #F3F4F4;
        padding: .25rem;
        border-radius: .25rem;
        margin-right: .25rem;
    }
</style>

<script>
    var configMap = {
        actionText: {
            join: '进入房间',
            leave: '离开房间'
        }
    };
    module.exports = {
        props: ['activities'],
        data: function () {
            return {

            }
        },
        methods: {
            getActionText: function (activity) {
                switch (activity.action) {
                    case 'join':
                        return configMap.actionText.join;
                    case 'leave':
                        return configMap.actionText.leave;
                }
            }
        },
        computed: {
            actionText: function () {

            }
        }
    }
</script>