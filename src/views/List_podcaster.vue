<template>
    <v-app style="background-color: #FAFAFA" >
        <v-container>
            <v-content>

                    <h1>Bienvenue {{$store.state.compaign.name}}</h1>
                    <v-spacer vertical="false"></v-spacer>

            <v-container fluid class="px-auto mx-auto">
                <v-row style="{background-color: salmon}" >
                    <v-col cols="12" md="3" v-for="p in $store.state.podcasts" :key="p.id" >
                        <v-card elevation="0" :to="'/podcast/'+p.id">
                            <v-img
                                    src="@/static/podcasts.png"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    height="200px"
                            >
                                <v-card-title>{{p.name}}</v-card-title>
                            </v-img>
                            <v-card-text> Podcast about whatever</v-card-text>
                            <v-divider></v-divider>
                            <v-card-text> Podcast about whatever</v-card-text>

                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
                <v-card-actions>
                    <v-btn color="success" to="/Annonceur/newcompaign/"> lancer une nouvelle compagne </v-btn>
                </v-card-actions>
        </v-content>
        </v-container>
    </v-app>
</template>

<script>
    export default {

    }
</script>.
