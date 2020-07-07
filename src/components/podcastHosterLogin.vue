<template>
     <v-card height="100%" style="border-style: solid;border-color: #00c853;margin: 0 0 0 0;padding: 0 0 0 0;offset: 0 0;background-color: white">
         <v-card-title> Import de statistiques</v-card-title>
                        <v-card-subtitle class="mt-0 pt-0 pb-0 mb-0">L'accès à votre hébergeur nous permet importer vos statistiques d'écoutes.Ces données seront affichées aux annonceurs comme indicateur popularité de votre podcast.
                        Il s'agit de l'un des premiers critères de choix des annonceurs.</v-card-subtitle>
                    <v-row cols="12" class="mt-2">
                        <v-col md="8" sm="12" class="mt-0 mb-0">
                            <v-alert
                                    color="blue lighten-0"
                                    dense
                                    dark
                                    close-label="true"
                                    dismissible="true"
                                    class="ml-4 mr-4 mb-0"
                                    >
                                <p> • Vos identifiants ne seront pas ni stockés ni partagés.</p>
                            </v-alert>
                        </v-col>

                    </v-row>
         <v-form>
                        <v-row cols="12" class="ml-0 mr-4  mt-0 mb-0 pa-0 pb-0 px-0 pt-0" >
                            <v-col md="8" sm="12" class="mt-0 mb-0 pa-0 pb-0 px-0 pt-0">
                                <v-text-field
                                        outlined
                                        label="Adresse mail hébergeur"
                                        v-model="username"
                                        class="ml-4 mr-4  mt-0 mb-0 pa-0 pb-0 pt-0 px-0"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    <v-row cols="12" class="ml-0 mr-4  mt-0 mb-0 pa-0 pb-0 px-0 pt-0" >
                        <v-col md="8" sm="12" class="mt-0 mb-0 pa-0 pb-0 px-0 pt-0">
                                <v-text-field
                                        outlined
                                        label="Mot de passe hébergeur"
                                        class="ml-4 mr-4  mt-0 mb-0 pa-0 pb-0 pt-0 px-0"
                                        :type="showPassword ? 'text' : 'password'"
                                        v-model="password"
                                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:append="showPassword = !showPassword"
                                ></v-text-field >
                            </v-col>
                        </v-row>
             <v-card-actions>
                        <v-row cols="12" class="ml-4" align="start" >
                            <v-col md="4" sm="12">
                                <v-btn color="success" @click="CreateEpisodeStats" class="ml-2 mr-4" > Charger </v-btn>
                            </v-col>
                            <v-col md="4" sm="12">
                            <v-btn  class="ml-4" text @click="dismiss"> Ignorer >> </v-btn>
                            </v-col>
                        </v-row>
             </v-card-actions>
         </v-form>
        </v-card>
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
        props:{
            podcastId : Number
        },
        methods: {
            async CreateEpisodeStats(){
                this.loading=true
                this.$store.dispatch('CreateEpisodeStats',{username:this.username,password:this.password
                    ,podcast:this.podcastId.toString()});
                this.$emit('childToParent', true)

            },
            dismiss(){
                this.$emit('childToParent', false)
            }
        },
        async created(){

        }
    }
</script>

<style Scoped>
    .test_class{
        border-style: solid;
    }

    .styled-input {
        width: 40%;
    }
    .small-input {
        width: 20%;
    }



    v-alert{
        border-color: yellow;
    }

</style>