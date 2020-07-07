<template>
    <v-app style="background-color: #FAFAFA" >
    <v-content>
            <v-container>

                        <v-card-text style="text-align:center;font-size: 30px"> Bienvenue sur loud.li</v-card-text>
                            <v-card-text style="text-align:center" class="mb-0 pb-0"> Grace au podcasts nous vous permettons d'atteindre l'audience idéale pour vos produits.</v-card-text>
                            <v-card-text style="text-align:center" class="mt-0 pt-0"> Choisissez un podcast afin de lancer une campagne.</v-card-text>

                <v-divider class= "ml-12 mr-12"></v-divider>

                <v-card class=" mb-0 pb-0 pl-2 pr-2" elevation="1" dense>
                    <v-sheet flat v-if="showFilters" class="pt-3" >
                <v-row  dense class="ml-3 mr-3 mt-0 pt-0 mb-0 pb-0" style="border-style: none;height: 60px" width="40%"  >
                        <v-col cols="3"><v-text-field outlined hide-details label="Chercher" v-model='varia' style="height: 60px" width="30%" dense placeholder="Tapper un mot clé..."  ></v-text-field></v-col>
                    <v-col> <v-btn elevation="1"  flat color="primary" @click="search"> Chercher <v-icon> mdi-magnify </v-icon> </v-btn></v-col>
                </v-row>
                        <v-row align="center" justify="start" class="ml-2 mr-2 mt-0 pt-0">
                            <v-card-title class="ml-0"><v-icon>mdi-filter</v-icon> Filtres </v-card-title>
                            <v-divider></v-divider>
                            <v-icon style="justify-content: start" @click="showFilters=!showFilters">mdi-chevron{{showFilters?'-up':'-down'}} </v-icon>
                        </v-row>
                    <v-row dense class="ml-3 mr-3" align="center" style="border-style: none;height: 60px"  justify="space-between">
<!--
                        <v-col cols="3"><v-select outlined label="Genre" v-model="filters.genre" :items="genres" @change="filters" dense></v-select></v-col>
-->

                        <v-col>
                            <v-range-slider
                                    label="Nombre d'épisodes"
                                    :min="minEpisodes"
                                    :max="maxEpisodes"
                                    v-model="filters.nb_episodes"
                            >
                                <template v-slot:thumb-label="props">
                                    {{(props.value)}}
                                </template>
                            </v-range-slider>
                        </v-col>
                    </v-row>
                    </v-sheet>
                </v-card>
                <v-card-title class="ml-0 pt-2 pl-0"><v-icon> mdi-podcast </v-icon> Podcasts</v-card-title>
                <v-row  align="start" no-gutters class="ml-5 display-3" >
                    <v-col>
                        <v-chip-group>
                            <v-chip v-if="!!filters.phrase" close @click:close="filters.phrase=''">
                                {{filters.phrase}}
                            </v-chip>
                            <v-chip close
                            @click:close="filters.genre='Tous'">
                                genre: {{filters.genre}}
                            </v-chip>
                            <v-chip
                                close
                                @click:close="filters.nb_episodes=[minEpisodes,maxEpisodes]"
                                >
                                 entre {{filters.nb_episodes[0]}} et {{filters.nb_episodes[1]}} épisodes
                            </v-chip>
                        </v-chip-group>
                    </v-col>
                </v-row>
                <v-row align="start" justify="start" class="ml-3 mb-4 mt-2">
                    <v-card elevation="0"
                            outlined
                            height="330px"
                            width="250px"
                            class="ml-3 mb-3"
                            overflow="hidden"
                            v-for="p in podcasts" :key="p.id"
                            @click="$router.push('/podcast/'+p.id)">
                        <v-img
                                :src="p.image"
                                class="white--text align-end"
                                height="120px"
                        >
                            <v-card-title class="ml-1 mr-0 pl-0 pr-0">{{p.name}}</v-card-title>
                        </v-img>
                        <v-row justify="space-around"  width="250px" class="ml-1 mr-1">

<!--
                            <v-card-subtitle class="ml-0 mr-0 pl-0 pr-0" style="border-style: none;font-size: 80%">{{p.editor.slice(0,15)}}</v-card-subtitle>
-->
                            <v-card-subtitle class="ml-0 mr-0 pl-0 pr-0" style="border-style: none;font-size: 80%">{{p.nbEpisodes}} épisodes </v-card-subtitle>
<!--
                            <v-card-subtitle class="ml-0 mr-0 pl-0 pr-0" style="border-style: none;font-size: 80%">{{p.genre}}</v-card-subtitle>
-->
                        </v-row>
                        <v-card-subtitle class="ml-2 mr-0 mt-0 pt-0 pl-0 pr-0 display-8 mb-0 pb-0" style="border-style: none;" v-html="p.description.slice(0,130)+'...'"> </v-card-subtitle>
                        <v-row align="center" justify="start" width="250" no-gutters class="ml-1 mr-1">
                            <v-col>
                               <v-chip-group v-if="p.tags">
                                    <v-sheet flat>
                                        <v-chip
                                                v-for="tag in p.tags"
                                                :key="tag"
                                                column
                                                pill
                                                disabled
                                        >
                                            {{tag.name}}
                                        </v-chip>
                                    </v-sheet>
                                </v-chip-group>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-row>
<!--                <v-row align="start" justify="start" class="ml-3 mb-4 mt-4 display-5" v-else>
                    Aucun podcast correpondant à votre recherche n'a été trouvé </v-row>-->
            </v-container>
        </v-content>
        </v-app>
</template>

<script>
    import {axiosInstance} from "@/store";

    export default {
        name: 'app',
        components: {
        },
        data() {
            return {
                genre:'Tous',
                showFilters:true,
                data:[],
                filters:{
                    searchTerm:'',
                    nb_episodesFilter:[],
                    nb_episodes:[],
                    genre:'Tous',
                    phrase:'',
                },
                varia:'',
                searching:false,
                phrase:'',
                podcasts: [],
                filterApplied : false,
                nb_episodesFilter:[]
            }
        },
        methods:{
            search(){
                this.filters.phrase=this.varia,
                    this.varia=''
            }
        },
        computed: {
           /* results() {
                let vm = this
                let r = this.podcasts.filter((value) => {
                        let description = value.description.toLowerCase()
/!*
                        let genre = value.categories.toLowerCase()
*!/
                    let name = value.name.toLowerCase()
/!*
                    let tags='null'
*!/
                    /!*if (value.tags)
                    {
                        tags=value.tags.toLowerCase()
                    }*!/

                        return (
                            (
                                vm.filters.phrase.length == 0)
                            ||
                            (name.match(vm.filters.phrase.toLowerCase()) ? true : false)
                            ||

                                (description.match(vm.filters.phrase.toLowerCase()) ? true : false)
                            /!*    ||
                                (genre.match(vm.filters.phrase.toLowerCase()) ? true : false)
                            ||
                            tags.match(vm.filters.phrase.toLowerCase())?true:false*!/

                            )
                            /!*&&
                            (value.genre == vm.filters.genre || vm.filters.genre == 'Tous')*!/
                            &&
                            (parseInt(value.nb_episodes) >= vm.filters.nb_episodes[0]
                                && parseInt(value.nb_episodes) <= vm.filters.nb_episodes[1])
                    }
                )
                return r
            },
            genres() {
                let result =  (this.podcasts.map(({genre}) => genre));
                result.push('Tous')
                return result
            },*/
            minEpisodes(){
                return Math.max(1,Math.min.apply(null, this.podcasts.map(({nbEpisodes}) => parseInt(nbEpisodes)))-10);
            },
            maxEpisodes(){
                return Math.max.apply(null, this.podcasts.map(({nbEpisodes}) => parseInt(nbEpisodes)))+10;
            }
        },
        async created() {
             let res = await axiosInstance({
                url: "/podcasts/",
                method: "get",
            })
            this.podcasts = res.data
            this.nb_episodes= []
          /*  this.filters.nb_episodes.push(this.minEpisodes)
            this.filters.nb_episodes.push(this.maxEpisodes)*/
        }
    }
</script>

<style>
    v-chip
    {
        text-color:black

    }
</style>