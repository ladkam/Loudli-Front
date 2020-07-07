<template>
    <v-app style="background-color: #FAFAFA" >
        <v-content>
            <v-container  height="100%">
                <v-card
                        outlined
                        width="100%"
                        flat
                        class="ml-2 mb-2"
                style="border-style: solid">
                    <v-row class="ml-2 mr-2" align="center"  >
                        <v-card-title > Vos podcasts:</v-card-title>
                        <v-spacer></v-spacer>
                    <!--    <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Chercher"
                            single-line
                            hide-details
                            class="mr-2"
                    ></v-text-field>-->
                        <v-btn text

                               prepend="mdi-plus"
                               to="/Podcaster/addPodcast/info"
                               justify="center"
                        height="100%" align="Center">
                            <v-icon dark right>mdi-plus</v-icon> ajouter un podcast</v-btn>


                    </v-row>
                    <v-data-table

                        style="border-style: none;"
                        :headers="headers"
                        :items="podcasts"
                        :items-per-page="10"
                        class="elevation-1"
                        :search="search"
                        no-data-text="vous n'avez pas de podcat pour le moment"
                >
                    <template v-slot:item.podcastPicture="{ item }" @click="$router.push('/podcast/'+item.id)">
                        <div class="pa-2"  @click="$router.push('/podcast/'+item.id)" >

                        <v-avatar tile size="120" class="pa-2">
                            <v-img :src="item.podcastPicture?item.podcastPicture:item.thumbnail"  ></v-img>
                            </v-avatar>
                        </div>

                    </template>
                        <template v-slot:item.id="{ item }">
                            <div class="pa-2" >
                                <v-avatar tile size="120" class="pa-2">
                                    <v-btn @click="run(item)" color="warning" text >Supprimer</v-btn>
                                </v-avatar>
                            </div>

                        </template>
                </v-data-table>

                    </v-card>
            </v-container>

        </v-content>
    </v-app>
</template>

<script>
    /*import header from "@/components/header";*/
    import {axiosInstance} from "@/store";

    export default {
        data() {
            return {
                podcasts: [],
                podcastStat: null,
                adRequests:null,
                statDetails:[],
                search:'',
                headers: [
                    { text: "Image", align:'center', value: "podcastPicture", sortable: false },
                    {
                        text: 'Nom',
                        align: 'center',
                        sortable: true,
                        value: 'name',
                    },
                    { text: 'Type', value: 'type',sortable: true,align: 'center' },
                    { text: 'Auteur', value: 'author.username',sortable: true,align: 'center' },
                    {text:'Editeur',value:'editor',sortable: true,align: 'center' },
                    { text: "", align:'center', value: "id", sortable: false },

                ]

            }
        },
        methods:{
            async run(item){
                this.$store.dispatch('deletePodcast',{'id':item.id})
                const index = this.podcasts.indexOf(item);

                if (index > -1) {
                    this.podcasts.splice(index, 1);
                }

            }
        },
        components: {
/*
            'app-header': header
*/
        },
        async created() {
            let Mypodcasts = await axiosInstance({
                url: "/podcastsFilter/",
                method: "get",
            })
            this.podcasts = Mypodcasts.data
            this.podcast = this.$store.getters('turn2Dict',this.podcasts)
        }
    }
</script>
