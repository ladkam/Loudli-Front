<template>
    <v-app style="background-color: #FAFAFA" >
        <v-content>
            <v-container  height="100%">

                <v-row dense class="mr-2 ml-2" v-if="showAlert" width="1000">
                <v-alert color="blue lighten-0"
                         width="100%"
                         dark
                dismissible
                >
                    Vous n'avez pas de podcasts actuellement  <router-link to="/Podcaster/addPodcast/info" style="color: yellow;"> cliquer ici </router-link>  pour ajouter un podcast.
                </v-alert>

                    </v-row>

                <v-row dense class="mr-2 ml-2">
                    <v-card flat outlined width="1000" >
                        <v-col>
                            <v-row justify="center">
                                <v-col style="border-style: none"  md="4">
                                    <v-card-text style="border-style: none" class="text-center"  >Podcasts</v-card-text>
                                    <v-card-text class="text-center display-1" >{{nbPodcasts}}</v-card-text>
                                </v-col >
                                <v-col md="4">
                                    <v-card-text class="text-center">Episodes</v-card-text>
                                    <v-card-text class="text-center display-1" >{{podcastStat.nb_episodes}}</v-card-text>
                                </v-col>
                                <v-col md="4" style="border-style: none" >
                                    <v-card-text class="text-center">Ecoutes</v-card-text>
                                    <v-card-text class="text-center display-1">{{podcastStat.nb_plays}}</v-card-text>
                                </v-col>
                            </v-row>
                        </v-col>

                    </v-card>
                </v-row>
                <v-card
                        style="background-color: #FAFAFA"
                        width="1000"
                        flat
                        class="ml-2 mb-2">
                    <v-card-title> Vos demandes en attente :</v-card-title>
                    <v-card
                            v-for="(r,index) in campaigns"
                            :key="r.id"
                            cols="12"
                            class="mb-3"
                            v-show="r.status=='Demandée'"
                    >

                        <v-row align="center"
                               transition
                               no-gutters

                        >
                            <v-col md="1" class="ml-2">
                                        <v-avatar
                                                size="70"
                                                tile
                                        >
                                            <v-img :src="r.announcer.UserProfileInfo.profilePicture"></v-img>
                                        </v-avatar>
                            </v-col>

                            <v-col md="1" class="d-inline-flex" style="align:center;justify-content: center">
                                <v-icon large>
                                    mdi-arrow-right
                                </v-icon>
                            </v-col>

                            <v-col md="1" class="ml-2">
                                <v-avatar
                                        size="70"
                                        tile
                                >
                                    <v-img :src="r.podcast.podcastPicture?r.podcast.podcastPicture:r.podcast.thumbnail"></v-img>
                                </v-avatar>
                            </v-col>

                            <v-col  class="d-flex justify-space-between align-end grow" >
                            <v-card style="border-style: solid" flat>
                                <v-card-title
                                        class="headline"
                                >
                                    {{r.name}}
                                </v-card-title>
                                <v-card-subtitle> Type : {{r.type}}| demandé le : {{r.startDate}}</v-card-subtitle>
                            </v-card>
                                <v-card flat>
                                    <v-btn class="ma-2" color="success" small @click="AnswerCampaign('accept',r,index)">
                                        Accepter <v-icon small>mdi-check-outline</v-icon>
                                    </v-btn>
                                    <v-btn class="ma-2" color="danger" small @click="AnswerCampaign('decline',r,index)">
                                        Décliner <v-icon small >mdi-close-thick</v-icon>
                                    </v-btn>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row class="align-center">
                            <v-divider class="mx-3"></v-divider> <span class="subtitle-2">Détails</span>
                            <v-icon class="ma-0" @click="showDetails">mdi-chevron-down</v-icon>
                            <v-divider class="mx-2"></v-divider>
                        </v-row>
                        <v-card v-show="false" >
                            <v-card  style="height: 100%" class="ma-2" flat>
                                        <v-card-text><v-icon small> fa-clock </v-icon> <span class="subtitle-2">Date de début souhaité :</span> {{r.startDate}}</v-card-text>
                                        <v-card-text> <v-icon small> fa-link </v-icon> <span class="subtitle-2" >Lien </span> <a type="url" :href="r.urlProduit">
                                            {{r.urlProduit}}
                                        </a> </v-card-text>
                                        <v-card-text>
                                            <v-avatar size="30">
                                                <v-img :src="r.announcer.UserProfileInfo.profilePicture">
                                                </v-img>
                                            </v-avatar>
                                            Créée par {{r.announcer.last_name}} {{r.announcer.first_name}}
                                        </v-card-text>
                                        <v-card-text  v-model="r.description"
                                                      hide-details style="width: 70%"
                                                      readonly
                                                      filled
                                                      fixed
                                                      outlined label="Description de la compagne">
                                            <span class="subtitle-2" > Description: </span>
                                            {{r.description}}
                                        </v-card-text>
                            </v-card>


                        </v-card>
                        </v-card>


                    </v-card>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import {axiosInstance} from "@/store";

    export default {
        data() {
            return {
                showAlert: false,
                podcasts: [],
                podcastStat: [],
                expand2: false,
                campaigns: {},
                statDetails: [],
                dates: [],
                plays: []
            }
        },
        methods: {
            AnswerCampaign(action, Campaign, index) {
                if (action == 'accept') {
                    this.$store.dispatch('AcceptCampaign', Campaign)
                    this.campaigns.splice(index, 1)
                    console.log('action')

                } else {
                    this.$store.dispatch('DeclineCampaign', Campaign)
                    this.campaigns.splice(index, 1)
                    console.log('action')
                }

            },

            showDetails(event) {
                let style = event.target.parentElement.parentElement.children[2].getAttribute('style')

                console.log(style)
                if(style=='display:Inline-Block'){

                    event.target.parentElement.parentElement.children[2].setAttribute('style',style='display:None')
                    event.target.className=event.target.className.replace('up','down')

                }
                else
                {
                    event.target.parentElement.parentElement.children[2].setAttribute('style', style='display:Inline-Block')
                    event.target.className=event.target.className.replace('down','up')
                }

            },

        },
        computed:{
            nbPodcasts() {
                return this.podcasts[0]?this.podcasts.length:0
            },
            nbEpisodes(){
                return this.podcastStat[0]?this.podcastStat[0].nbEpisodes:0
            },
        },
        async created() {
            let Mypodcasts = await axiosInstance({
                url: "/podcastsFilter/",
                method: "get",
            })
            this.podcasts = Mypodcasts.data
            let tempStat = this.podcastStat = await axiosInstance({
                url: "/podcaststatGeneral/",
                method: "get"
            })
            this.podcastStat=tempStat.data
            let tempStatDetails = await axiosInstance({
                url:"/episodestats",
                method:"get"
            })
            let i=0;
            for(i;i <  tempStatDetails.data.length;i++)
            {
                this.dates.push((tempStatDetails.data[i]['date']))
                this.plays.push((tempStatDetails.data[i]['plays']))
            }
            if (this.podcasts.length==0)
            {
                this.showAlert=true
            }
            this.campaigns = await this.$store.dispatch('getCompaigns')
        }
    }
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.25s ease-out;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>