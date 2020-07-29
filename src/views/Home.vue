<template>
   <router-view></router-view>
</template>

<script>
    export default {

        data: () => ({
            drawer: false,
            group: null,
            alignmentsAvailable: [
                'start',
                'center',
                'end',
                'baseline',
                'stretch',
            ],
            alignment: 'center',
            dense: false,
            justifyAvailable: [
                'start',
                'center',
                'end',
                'space-around',
                'space-between',
            ],
            justify: 'center',

            slides: [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Fifth',
            ]
        }),
        alignmentsAvailable: [
            'start',
            'center',
            'end',
            'baseline',
            'stretch',
        ],
        alignment: 'center',
        dense: false,
        justifyAvailable: [
            'start',
            'center',
            'end',
            'space-around',
            'space-between',
        ],
        justify: 'center',

        watch: {
            group () {
                this.drawer = false
            },
        },
        methods:{


        }
    }
</script>