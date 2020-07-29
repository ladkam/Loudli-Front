<template>
        <v-card class="d-flex fill-height" flat >
                <v-card  elevation="0"  class="pa-3" width="300" outlined >
                    <v-card-title class="pa-0 ma-0 mb-2"> <v-icon small left > fa-filter</v-icon>Filtres </v-card-title>

                    <div class="pb-2 subtitle-2"> Audience (par milliers) </div>

                    <HistogramSlider v-if="plays.length>0"
                                     :width="200"
                                     :data="plays"

                                     :min="0"
                                     :step="10"
                                     :max="100"
                                     v-model="value"
                                     bar-height="60"
                                     bar-width="2"

                                     :gridNum="2"
                                     force-edges
                                     label-color="#ef5d50"
                                     primary-color="#ef5d50"
                                     @change="setPlayInterval"
                                     handle-size="15"
                                     hide-from-to
                                     ref="playSlider"
                                     class="playSlider"
                    />

                    <div class="pb-2 subtitle-2 pt-2"> PCM </div>

                    <HistogramSlider v-if="prices.length>0"
                                     :width="200"
                                     bar-height="60"
                                     bar-width="2"
                                     hide-from-to
                                     :data="prices"
                                     :colors="['#ff8a65', '#ff8a65']"
                                     :min="0"
                                     :step="10"
                                     :max="200"
                                     v-model="value"
                                     :gridNum="0"
                                     force-edges
                                     label-color="#ef5d50"
                                     primary-color="#ef5d50"
                                     @change="setPriceInterval"
                                     handle-size="15"


                                     ref="priceSlider"
                                     class="priceSlider"
                    />

                    <v-autocomplete
                            hide-details
                            outlined
                            v-model="filters.categories"
                            label="Catégorie"
                            :items="categories"
                            item-value="Name"
                            item-text="NameFR"
                            multiple
                            class="mt-4"
                    >
                        </v-autocomplete>

                    <v-autocomplete
                            v-model="filters.countries"
                            hide-details
                            outlined
                            label="Pays"
                            :items="countries"
                            item-value="name"
                            item-text="name"
                            multiple
                            class="mt-2"

                    >
                    </v-autocomplete>

                    <v-autocomplete
                            hide-details
                            outlined
                            label="Ville"
                            v-model="filters.cities"

                            :items="cities"
                            item-value="name"
                            item-text="name"
                            multiple
                            class="mt-2"

                    >
                    </v-autocomplete>

                    <v-autocomplete
                            hide-details
                            outlined
                            label="Âges"
                            v-model="filters.ageGroups"
                            :items="ageGroups"
                            item-value="name"
                            item-text="name"
                            multiple
                            class="mt-2"

                    >
                    </v-autocomplete>

                    <v-autocomplete
                            hide-details
                            outlined
                            label="Genre"
                            v-model="filters.targetGenders"
                            :items="['Homme','Femme','Autre','Tous']"
                            item-value="Name"
                            item-text="NameFR"
                            multiple
                            class="mt-2"

                    >
                    </v-autocomplete>




                    <v-btn @click="clearFilter" class="mt-4" text style="font-size: 12px" color="secondary" > <v-icon left> fa-rubber </v-icon> Retirer les filtres </v-btn>

                </v-card>


            <v-card class="ml-2 flex-grow-1 justify-start align-center d-flex flex-column mr-2 "  flat  style="width:100%;height:100%;border-style: solid">
                <div class="d-flex align-center mb-2 mr-2" style="width: 50%">
                <v-text-field outlined
                              dense
                              style="width: 60%"
                              class="pa-2"
                              placeholder="Tapper un mot clef..."
                              label="Recherche"
                              hide-details
                              v-model="varia"
                              @keypress.enter="search"
                >
                </v-text-field>

                    {{filters.recherche}}

                <v-btn height="40px" elevation="0" @click="search"
                color="primary">
                    <v-icon>
                        mdi-magnify
                    </v-icon>

                </v-btn>
                </div>
                <v-chip-group>
                <div
                    v-for="(value,key) in filters" :key="key" >
                    <v-chip outlined close @click:close="filters[key]=''" color="secondary" v-if="value.length>0">{{key}} : {{typeof value == 'object'?value.join(','):value}}</v-chip>

                </div>
                </v-chip-group>


                <v-card align="start" justify="center" class="d-flex flex-wrap mt-2 justify-start" flat style="border-style: solid">

                        <v-card-text class="ml-3 mt-2" v-if="results.length==0"> Votre recherche ne correponds à aucun podcast ,contacter notre support pour plus d'information support@loudli.com</v-card-text>

                    <v-sheet
                            style="border-style: solid"
                            v-for="p in results.slice((page-1)*9,page*9)" :key="p.id"
                    >

                    <v-card
                            hover
                            outlined
                            height="350px"
                            width="250px"
                            class="d-flex mx-auto flex-column justify-center align-center ml-2 mb-2 px-1 pa-1"
                            overflow="hidden"
                            @click="$router.push('/podcast/'+p.id)">

                        <v-avatar tile size="150">
                        <v-img
                                :src="p.image"
                        >
                        </v-img>
                        </v-avatar>
                        <span class="ml-1 mr-0 pl-0 pr-0 text-wrap subtitle-2">{{p.name}}</span>

                        <v-card-subtitle class="ml-2 mr-0 mt-0 pt-0 pl-0 pr-0 display-8 mb-0 pb-0" style="border-style: none;" v-html="p.description.slice(0,130)+'...'"> </v-card-subtitle>
                        <v-row align="center" justify="start" width="250" no-gutters class="ml-1 mr-1">
                            <v-col>
<!--                               <v-chip-group v-if="p.tags">
                                    <v-sheet flat>
                                       &lt;!&ndash; <v-chip
                                                v-for="tag in p.tags"
                                                :key="tag"
                                                column
                                                pill
                                                disabled
                                        >
                                            {{tag}}
                                        </v-chip>&ndash;&gt;
                                    </v-sheet>
                                </v-chip-group>-->
                            </v-col>
                        </v-row>
                    </v-card>
                    </v-sheet>
                </v-card>

                <v-pagination
                        v-if="results.length>9"
                        v-model="page"
                        :length="Math.ceil(results.length/9)"
                        color="primary">
                </v-pagination>
            </v-card>

          </v-card>

       <!--
               </v-card>
       -->


        <!--                <v-row align="start" justify="start" class="ml-3 mb-4 mt-4 display-5" v-else>
                    Aucun podcast correpondant à votre recherche n'a été trouvé </v-row>-->
</template>

<script>
    import {axiosInstance} from "@/store";
    import Cats from '@/static/Cats.json'



    export default {
        name: 'app',
        components: {
        },
        data() {
            return {
                plays:[],
                prices:[],
                value:[],
                categories:Cats,
                cities:[],
                countries:[],
                ageGroups:[],
                page:1,
                genre:'Tous',
                showFilters:true,
                data:[],
                filters:{
                    prices:[],
                    plays:[],
                    categories:[],
                    targetGenders:'',
                    ageGroups:'',
                    audience:[],
                    countries:[],
                    cities:'',
                    searchTerm:'',
                    nb_episodesFilter:[],
                    Recherche:'',
                },
                varia:'',
                searching:false,
                Recherche:'',
                podcasts: [],
                filterApplied : false,
                nb_episodesFilter:[],
                nb_playsFilter:[],
                items: [
                    { title: 'Dashboard', icon: 'dashboard' },
                    { title: 'Account', icon: 'account_box' },
                    { title: 'Admin', icon: 'gavel' },
                ],
            }
        },
        methods:{
            search(){
                this.filters.Recherche=this.varia,
                    this.varia=''
            },
            filterList(list,filter){
                return (list.filter(x => filter.includes(x)).length > 0 || filter.length==0)


            },
            clearFilter(){
                this.filters={
                    categories:[],
                        targetGenders:'',
                        prices:[],
                        plays:[],
                        ageGroups:'',
                        countries:[],
                        cities:'',
                        searchTerm:'',
                        nb_episodesFilter:[],
                     Recherche:'',
                }

              /*  this.filters.nb_episodes.push(this.minEpisodes)
                this.filters.nb_episodes.push(this.maxEpisodes)*!/*/


                this.$refs.playSlider.update({ from: 0, to: 100})

            },
            setPlayInterval(target){
                this.filters.plays =[target.from,target.to]
            },
            setPriceInterval(target){
                this.filters.prices=[target.from,target.to]
            }
        },
        watch:{
            nb_episodesFilter:function(nb_episodesFilter){
                console.log('here')
                this.filters.nb_episodesFilter = JSON.stringify(nb_episodesFilter)==JSON.stringify([this.minEpisodes,this.maxEpisodes])?'':nb_episodesFilter
            },
            filters:function(filters){
                this.nb_episodesFilter=filters
            }
            },
        computed: {
            results() {

                let vm = this
                let r = this.podcasts.filter((value) => {
                    let description = value.description.toLowerCase()
/*
                    let category=value.category.toLowerCase()
*/
                    let name = value.name.toLowerCase()
                    let tags='null'

                    if (value.tags)
                    {
                        tags=value.tags.join().toLowerCase()
                    }
                        return (
                            (
                            (
                                vm.filters.Recherche.length == 0)
                           ||
                            (name.match(vm.filters.Recherche.toLowerCase()) ? true : false)
                            ||
                            (description.match(vm.filters.Recherche.toLowerCase()) ? true : false)
                             ||
                            tags.match(vm.filters.Recherche.toLowerCase())?true:false
                            )
                            &&
                            (
                                (parseInt(value.price) >= vm.filters.prices[0]
                                &&
                                parseInt(value.price) <= vm.filters.prices[1])
                                ||
                                        vm.filters.prices.length==0
                            )
                           &&
                            (
                                parseInt(value.nbPlays) >= vm.filters.plays[0]*1000
                                &&
                                parseInt(value.nbPlays) <= vm.filters.plays[1]*1000

                                ||
                                vm.filters.plays.length==0
                            )
                            &&
                            vm.filterList(value.categories,vm.filters.categories)
                            &&
                            vm.filterList(value.country,vm.filters.countries)
                            &&
                            vm.filterList(value.city,vm.filters.cities)
                            &&
                            vm.filterList(value.ageGroup,vm.filters.ageGroups)
                            &&
                            (
                                vm.filters.targetGenders.includes(value.targetGender)
                                ||
                                        vm.filters.targetGenders.length==0

                            )

                            /*                        &&
                             vm.filterList(value.cities,vm.filters.cities)
                             /!*                            &&
                            vm.filterList(value.targetGenders,vm.filters.targetGenders)*!/
 */
                        )
                              /* ||
                                (genre.match(vm.filters.Recherche.toLowerCase()) ? true : false)*/
                          /*  ||
                            tags.match(vm.filters.Recherche.toLowerCase())?true:false
                            )
                            &&
                            (
                            (value.genre == vm.filters.genre || vm.filters.genre == 'Tous')
                            &&
                            (parseInt(value.nb_episodes) >= vm.filters.nb_episodes[0]
                                && parseInt(value.nb_episodes) <= vm.filters.nb_episodes[1])*!/*/
                }
                )
                return r
            },
/*            genres() {
                let result =  (this.podcasts.map(({genre}) => genre));
                result.push('Tous')
                return result
            },*/
            minEpisodes(){
                return Math.max(1,Math.min.apply(null, this.podcasts.map(({nbEpisodes}) => parseInt(nbEpisodes)))-10);
            },
            maxEpisodes(){
                return Math.max.apply(null, this.podcasts.map(({nbEpisodes}) => parseInt(nbEpisodes)));
            },
            minPlays(){
                return Math.max(1,Math.min.apply(null, this.podcasts.map(({nbPlays}) => parseInt(nbPlays))));
            },
            maxPlays(){
                return Math.max.apply(null, this.podcasts.map(({nbPlays}) => parseInt(nbPlays)))+10;
            }
        },

        async created() {
             let res = await axiosInstance({
                url: "/podcasts/",
                method: "get",
            })
            this.plays=res.data.map(({nbPlays}) => nbPlays/1000).sort()
            this.prices=res.data.map(({price}) => price).sort()


            this.podcasts = res.data
            this.nbEpisodes= []
            this.nb_episodesFilter.push(this.minEpisodes)
            this.nb_episodesFilter.push(this.maxEpisodes)
            this.nb_playsFilter.push(this.minPlays)
            this.nb_playsFilter.push(this.maxPlays)
            this.cities = await this.$store.dispatch("getCities")
            this.countries = await this.$store.dispatch("getCountries")
            this.interests = await this.$store.dispatch("getInterests")
            this.ageGroups = await this.$store.dispatch("getAgeGroup")
        }
    }
</script>

<style>
    v-chip
    {
        text-color:black

    }
</style>