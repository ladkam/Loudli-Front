<template>

    <v-app>
        <v-container>
            <v-content light>
                <v-card flat  outlined>
                    <v-card-text class="mt-0 pt-0 pb-0 mb-0">L'accès à votre hébergeur nous permet importer vos statistiques d'écoutes.Ces données seront affichées aux annonceurs comme indicateur popularité de votre podcast.
                        Il s'agit de l'un des premiers critères de choix des annonceurs.</v-card-text>
                    <v-card-text class="mt-0 pt-0 mb-0 pb-0"> </v-card-text>
                    <v-row cols="12" class="mt-2">
                        <v-col md="6" sm="12" class="mt-0 mb-0">
                            <v-alert
                                    color="blue lighten-0"
                                    dense
                                    dark
                                    close-label="true"
                                    dismissible="true"
                                    class="ml-4 mr-4 mb-0"
                                    max-width="1200"
                                    max-height="300">
                                <p> • Vos identifiants ne seront pas ni stockés ni partagés.</p>
                            </v-alert>
                        </v-col>
                    </v-row>
                    <v-card style="border-style: solid" class="ml-0 mt-0" flat>
                        <v-row cols="12" class="ml-0 mr-4  mt-0 mb-0 pa-0 pb-0 px-0 pt-0" style="border-style: none;margin-bottom: 0px;align-content: center" height="200px" dense no-gutters>
                            <v-col md="5" sm="12" style="border-style: none;margin-bottom: 0px;padding-bottom: 0px;align-content: center" class="mt-0 mb-0 pa-0 pb-0 px-0 pt-0">
                                <v-text-field
                                        outlined
                                        label="Adresse mail hébergeur"
                                        v-model="username"
                                        class="ml-2 mr-4  mt-0 mb-0 pa-0 pb-0 pt-0 px-0"
                                        max-width="1200"
                                        dense
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row cols="12" class="ml-0 mr-4  mt-0 mb-0 pa-0 pb-0 px-0 pt-0" style="border-style: none;margin-bottom: 0px;align-content: center" height="200px" dense no-gutters>
                            <v-col md="5" sm="12" style="border-style: none;margin-bottom: 0px;padding-bottom: 0px;align-content: center" class="mt-0 mb-0 pa-0 pb-0 px-0 pt-0">
                                <v-text-field
                                        dense
                                        outlined
                                        style="border-style: none;margin-bottom: 0px;padding: 0px;align-content: center"
                                        label="Mot de passe hébergeur"
                                        class="ml-2 mr-4  mt-0 mb-0 pa-0 pb-0 pt-0 px-0"
                                        :type="showPassword ? 'text' : 'password'"
                                        v-model="password"
                                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:append="showPassword = !showPassword"
                                        max-width="1200"
                                ></v-text-field >
                            </v-col>
                        </v-row>
                        <v-row cols="12" class="mt-0">
                            <v-col md="5" sm="12">
                                <v-btn color="success" @click="CreateEpisodeStats"  class="ml-2 mr-4" width="40%" > Charger </v-btn>
                                <v-btn  @click="nextpage"  class="ml-4" text > Ignorer >> </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>

                </v-card>
                <div                         v-if="loading"
                                             class="text-center ma-12"
                                             style="height: 200%; border-style: none"
                                             justify="center"
                >
                    <v-progress-circular
                            :size="200"
                            color="primary"
                            indeterminate
                            style="height: 100%; border-style: none"
                    ></v-progress-circular>
                    <p>Chargement de vos statistiques d'écoutes</p>
                </div>
            </v-content>
        </v-container>
    </v-app>
</template>


<script>
    export default {
        data() {
            return {
                host:['Acast','Anchor','Ausha'],
                password:'',
                alert:false,
                username:'',
                loading:false,
                podcast:'',
                showPassword: false
            };
        },
        methods: {
            async CreateEpisodeStats(){
                this.loading=true
                this.$store.dispatch('CreateEpisodeStats',{username:this.username,password:this.password
                    ,podcast:this.$store.state.newPodcast.podcastId.toString()});
                this.$router.push('/podcast/'+this.$store.state.newPodcast.podcastId.toString())
            },
            nextpage(){
                this.$router.push('/podcast/'+this.$store.state.newPodcast.podcastId.toString())
            },
            load(){
                this.loading=!this.loading
            }
        },
        async created(){
        }
    }
</script>

<style>
    .test_class{
        border-style: solid;
    }

    .styled-input {
        width: 40%;
    }
    .small-input {
        width: 20%;
    }

</style>