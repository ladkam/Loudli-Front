<template>
                <v-card
                        flat
                        width="1000"
                        class="mx-auto mb-2"

               >
                    <v-row class="ml-2 mr-2" align="center"  >
                        <v-card-title > Mes podcasts</v-card-title>
                        <v-spacer></v-spacer>
                    <!--    <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Chercher"
                            single-line
                            hide-details
                            class="mr-2"
                    ></v-text-field>-->
                        <v-btn
                               @click="$router.push('/podcaster/addPodcast/')"
                               text
                              >
                            <v-icon left large> mdi-plus </v-icon> Ajouter un podcast
                           </v-btn>

                    </v-row>
                    <v-data-table
                            :loading="podcasts"
                            dense
                            @click:row="show"
                            style="border-style: none;elevation: 0"
                            :headers="headers"
                            :items="podcasts"
                            :items-per-page="5"
                            :search="search"
                            no-data-text="vous n'avez pas de podcat pour le moment"
                >
                    <template v-slot:item.podcastPicture="{ item }" >
                        <div class="pa-2"  @click="$router.push('/podcast/'+item.id)" >


                        <v-avatar tile size="100" class="pa-1">

                            <v-img :src="item.image"  > </v-img>
                            </v-avatar>
                        </div>

                    </template>
                </v-data-table>

                    </v-card>

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
                loading:true,
                search:'',
                headers: [
                    { text: "", align:'center', value: "podcastPicture", sortable: false },
                    {
                        text: 'Nom',
                        align: 'center',
                        sortable: true,
                        value: 'name',
                    },
                    {text:'Editeur',value:'editor',sortable: true,align: 'center' },
                    {text:'CPM',value:'price',sortable: true,align: 'center' },
                    {text:'Audience',value:'nbPlays',sortable: true,align: 'center' },



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
            },
            async show(item){
                this.$router.push('/podcast/'+item.id)


            },

        },
        components: {
/*
            'app-header': header
*/
        },
        async mounted() {
            this.loading=true
            let Mypodcasts = await axiosInstance({
                url: "/podcastsFilter/",
                method: "get",
            })
            this.podcasts = Mypodcasts.data
            this.loading=false
            this.podcast = this.$store.getters('turn2Dict',this.podcasts)
            this.loading=false
        }
    }
</script>

<style>
    [v-cloak] {display: none}
</style>
