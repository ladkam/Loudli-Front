<template>

    <v-app>
        <app-header dark></app-header>
        <v-container>
            <v-content light>
                <v-card flat v-if="!loading">
                    <v-card-title class="display-1"> Statistiques d'écoute </v-card-title>
                    <v-card-text> Nous avons besoin de l'accès à votre hebergeur afin d'importer vos statistiques d'écoutes.Ces données seront affichées aux annonceur comme indicateur popularité de votre podcast.
                    Il s'agit de l'un des premiers critères de choix des annonceurs.</v-card-text>
                    <v-select regular filled label="Hébergeur" :items="host" :v-model="podcast.rss" type="url" class="ml-4 mr-4 styled-input"></v-select>
                    <v-text-field hint="votre adresse mail" regular filled label="Nom d'utilisateur" v-model="username" class="ml-4 mr-4 styled-input"></v-text-field>
                    <v-text-field hint="mot de passe hebergeur" regular filled label="Mot de passe" type="password" v-model="password" class="ml-4 mr-4 styled-input"></v-text-field>
                    <v-card-actions>
                        <v-btn color="success" class="ml-2" @click="createPodcast"> récupérer mes statistiques</v-btn>
                    </v-card-actions>

                    <v-btn @click="load" > </v-btn>
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
                    <p>Chargement de vos statistiques d'écoute</p>
                </div>
            </v-content>
        </v-container>
    </v-app>
</template>


<script>
    import header from "@/components/header";
    export default {
        data() {
            return {
                host:['Acast','Anchor','Ausha'],
                password:'',
                username:'',
                loading:false,
                podcast:'',

            };
        },
        components: {
            'app-header': header
        },
        methods: {

            createPodcast(){
                this.load()
                this.$store.dispatch('createPodcast',{username:this.username,password:this.password});
                this.$router.push('/Podcaster/addPodcast/connInfo?')

            },
            load(){
                this.loading=!this.loading
            },
            nextStep(){
                this.$store.state.newPodcast=this.podcast;
                this.$router.push('/Podcaster/addPodcast/connInfo?')

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