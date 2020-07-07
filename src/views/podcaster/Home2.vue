<template>
    <v-app style="background-color: #FAFAFA" >
        <v-content >
                    <v-container fluid>

                        <v-row cols="12"
                               style="height: 600px;"
                               justify="space-around"
                               align="center"
                        >
                            <v-col sm="5" xs="5" md="5" align="center">
                                <v-btn rounded outlined  class="mx-auto" justify="center" height="4rem"   to="/podcaster/login"> Je suis podcasteur</v-btn>
                            </v-col>
                            <v-col  sm="5" xs="5" md="5"  align="center" >
                                <v-btn rounded outlined  class="mx-auto" justify="center" height="4rem"  to="/Annonceur/"> Je suis annonceur</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
        </v-content>
    </v-app>
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