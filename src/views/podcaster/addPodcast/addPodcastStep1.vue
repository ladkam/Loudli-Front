<template>
    <v-app style="background-color: #FAFAFA" >
        <v-container>
            <v-content>
                <v-card flat>
                    <v-container>
                        <v-stepper v-model="step">
                            <v-stepper-header>
                            <v-stepper-step editable step="1">
                                Ajouter mon podcast
                                <small> Ajout du Flux RSS</small>
                            </v-stepper-step>
                                <v-divider></v-divider>

                                <v-stepper-step editable step="2">
                                    Audiences
                                    <small> Genre, Interêts, localisation...</small>
                                </v-stepper-step >
                                <v-divider></v-divider>
                            <v-stepper-step editable step="4">
                                écoutes
                                <small>
                                    Suivi des écoutes
                                </small>
                            </v-stepper-step>
                            </v-stepper-header>
                            <v-stepper-content step="1">
                                <v-card-text class="ml-0" v-if="!rssParsed"> Renseignez l'adresse du flux RSS de cotre Podcast</v-card-text>
                                <v-alert v-if="this.rssParsedOk" color="blue" border="left" dismissible text > nous avons trouvé les informations suivante sur votre podcast, pour modifier le flux cliquer <span class="v-btn"   text @click="rssParsedOk=false"> ici </span></v-alert>

                                <div class="d-flex reverse justify-end" >
                                    <v-btn v-if="this.rssParsedOk" color="primary" @click="step=step+1"> C'est mon podcast </v-btn>
                                </div>
                                <div v-if="!this.rssParsedOk" class="d-inline-flex mt-2">
                                    <v-text-field type="url"
                                                  class="ml-2 mr-4 mb-2"
                                                  outlined
                                                  style="width:20rem"
                                                  v-model="podcast.urlFeed"
                                                  placeholder="url de votre flux rss"
                                                  label="flux RSS"
                                                  hide-details>
                                    </v-text-field>
                                    <v-btn color="primary" @click="parseRSS"> Import </v-btn>
                                </div>
                                <div class="ml-2"><small v-if="loadingRSS"> analyse votre flux rss en cours ... <v-progress-circular color="blue" indeterminate></v-progress-circular> </small></div>

                                <v-scroll-x-transition>
                                    <v-sheet v-if="this.rssParsedOk">
                                        <div v-if="this.rssParsedOk" class="d-flex justify-space-between" style="border-style: none;width: 100%">
                                            <v-avatar tile size="400" class="flex-shrink-1" style="align-self: center">
                                                <v-img
                                                        :src="feed.itunes.image"
                                                        class="bkg">
                                                </v-img>
                                            </v-avatar>
                                            <div style="border-style: none;" class="flex-grow-1">
                                                <v-card-title class="mt-0 mb-0 py-0">
                                                    {{podcast.name}}
                                                </v-card-title>
                                                <v-card-subtitle class="mt-0 mb-0 py-0">
                                                    <strong>Nombre d'épisodes:</strong> {{feed.items.length}}
                                                </v-card-subtitle>
                                                <v-card-subtitle class="mt-0 mb-0 py-0">
                                                    <strong>Date dernier épisode:</strong> {{feed.items[feed.items.length-1].pubDate}}
                                                </v-card-subtitle>
                                                <v-card-subtitle class="mt-0 mb-0 py-0">
                                                    <strong>Catégorie:</strong>
                                                    {{feed.itunes.categories.toString() }} </v-card-subtitle>
                                                <v-card-subtitle class="mt-0 mb-0 py-0">
                                                    <strong>Par:</strong>
                                                    {{feed.itunes.owner.name}}
                                                </v-card-subtitle>
                                                <!--<v-card-subtitle> <strong>Tags</strong>: <v-span v-for="(word,index) in feed.itunes.keywords" :key="index" label>

                                                    {{word}},

                                                </v-span></v-card-subtitle>-->

                                                <v-card-subtitle> <strong> Description </strong></v-card-subtitle>
                                                <v-card-text
                                                        class="ml-2 mr-4">
                                                    {{feed.description}}
                                                </v-card-text>
                                            </div>
                                        </div>

                                    </v-sheet>
                                </v-scroll-x-transition>

                            </v-stepper-content>

                            <v-stepper-content step=2>

                                <v-card-title> Ecoutes </v-card-title>

                                <v-card-text>
                                    Nous avons besoin d'avoir une indication sur votre nombre d'écoutes par mois.Cette indication sera validée par notre équipe.
                                </v-card-text>

                                <v-text-field outlined
                                              class="mt-2 ml-3"
                                              style="width:20rem"
                                              label="écoutes par mois"
                                              placeholder="ex 10000"
                                              type="number"
                                              min="0"
                                              hide-details
                                              v-model="podcast.nbPlays"
                                              hint="cette information est disponible sur la platform qui host votre podcast"
                                >
                                </v-text-field>

                                <v-card-title> Tarif </v-card-title>

                                <v-card-text>
                                    Il s'agit du tarif de la diffusion de l'annonce.
                                </v-card-text>

                                <v-text-field
                                        style="width:20rem"
                                        type="number"
                                        min="0"
                                        class="mt-2 ml-3"
                                        outlined
                                        label="Tarif par millier d'écoutes"
                                        placeholder="votre tarif HT"
                                        hide-details
                                        v-model="podcast.price"
                                >
                                </v-text-field>
                                <small v-if="podcast.nbPlays & podcast.nbPlays"> à ce tarif une annonce diffusé sur un podcast pour un mois donnera {{podcast.nbPlays*podcast.nbPlays/1000}}€</small>


                                <v-card-title> Audience </v-card-title>

                                <v-card-text>
                                    Le type d'audience de votre podcast est une information très importante pour les annonceurs, c'est avec elle qu'ils choissent les podcasts sur lesquels faire leurs annonces.
                                </v-card-text>

                                <h6 class="ml-3"> Genre </h6>
                                <v-card-text >
                                    Mon audience c'est surtout des :
                                </v-card-text>
                                <div class="mt-2 mb-5">
                                    <label for="hommes"><input type="radio" id="hommes" class="ml-3" value="homme" v-model="podcast.genre"> Homme</label>
                                    <label for="femmes"><input type="radio" class="ml-3"  id="femmes" value="femme" v-model="podcast.genre"> Femme </label>
                                    <label for="both"><input type="radio" class="ml-3"  id="both" value="autre" v-model="podcast.genre"> Les deux </label>

                                </div>


                                <h6 class="ml-3"> Âge</h6>
                                <v-card-text class="pl-0 ml-3 ">l'âge de mon audimat c'est plutôt</v-card-text>
                                <v-range-slider
                                        style="width: 30%"
                                        v-model="podcast.ageInterval"
                                        thumb-label="always"
                                        thumb-size="25"
                                        min="0"
                                        max="100"
                                        class="ml-3 mt-5"
                                ></v-range-slider>

                                <h6 class="ml-3"> Localisation </h6>
                                <v-card-text class="pl-0 ml-3"> Ils habitents généralement en </v-card-text>
                                <v-autocomplete
                                        label="Pays"
                                        hide-details
                                        style="width: 40%;"
                                        deletable-chips
                                        chips
                                        dense
                                        class="mt-2 ml-3"
                                        outlined
                                        :items="countries"
                                        item-value="id"
                                        item-text="name"
                                        v-model="podcast.country"
                                        multiple
                                >
                                </v-autocomplete>
                                <v-autocomplete
                                        class=" ml-3 mt-2"
                                        hide-details
                                        dense
                                        style="width: 40%"
                                        deletable-chips
                                        chips
                                        outlined
                                        label="Villes"
                                        :items="cities"
                                        item-value="id"
                                        item-text="name"
                                        v-model="podcast.city"
                                        multiple
                                >
                                </v-autocomplete>

                                <h6 class="ml-3 mt-5"> Interêts </h6>

                                <v-card-text class="pl-0 mt-2 ml-3"> Leurs centres d'interêt sont: </v-card-text>
                                <v-autocomplete
                                        hide-details
                                        style="width: 40%;"
                                        deletable-chips
                                        outlined
                                        dense
                                        label="centre d'interêt"
                                        :items="interests"
                                        class="mb-4 mt-2 ml-3"
                                        item-value="id"
                                        item-text="name"
                                        v-model="podcast.interests"
                                        multiple
                                >
                                </v-autocomplete>


                                <v-card-text class="pl-0 mt-2 ml-3"> Voulez-vous ajouter des tags? </v-card-text>
                                <v-combobox
                                        v-model="selectedTags"
                                        class="mt-2 ml-3"
                                        style="width: 40%"
                                        outlined
                                        :filter="filter"
                                        :hide-no-data="!search"
                                        :items="tags"
                                        item-text="name"
                                        :search-input.sync="search"
                                        hide-selected
                                        label="Chercher ou créer un tag"
                                        multiple
                                        dense
                                        small-chips
                                >
                                    <template v-slot:no-data>
                                        <v-list-item>
                                            <span class="subheading">Create</span>
                                            <v-chip
                                                    :color="`${colors[nonce - 1]} lighten-3`"
                                                    label
                                                    small
                                            >
                                                {{ search }}
                                            </v-chip>
                                        </v-list-item>
                                    </template>
                                    <template v-slot:selection="{ attrs, item,index, parent, selected }">
                                        <v-chip
                                                v-if="item === Object(item)"
                                                v-bind="attrs"
                                                :input-value="selected"
                                                :color="colors[index]+' lighten-3'"
                                                label
                                                small
                                        >
                                            <span class="pr-2">
                                            {{ item.name }}
                                            </span>
                                            <v-icon
                                                    small
                                                    @click="parent.selectItem(item)"
                                            >
                                                mdi-close</v-icon>
                                        </v-chip>
                                    </template>
                                    <template v-slot:item="{ index, item }">
                                        <v-text-field
                                                v-if="editing === item"
                                                v-model="editing.name"
                                                autofocus
                                                flat
                                                background-color="transparent"
                                                hide-details
                                                solo
                                                @keyup.enter="edit(index, item)"
                                        ></v-text-field>
                                        <v-chip
                                                v-else
                                                :color="colors[item.id%6]+' lighten-3'"
                                                label
                                                small
                                        >
                                            {{ item.name }}
                                        </v-chip>
                                        <v-spacer></v-spacer>
                                        <!--<v-list-item-action @click.stop>
                                            <v-btn
                                                    icon
                                                    @click.stop.prevent="edit(index, item)"
                                            >
                                                <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                                            </v-btn>
                                        </v-list-item-action>-->
                                    </template>
                                </v-combobox>

                                <div class="d-flex justify-end">
                                <v-btn @click="createPodcast" color="primary">Créer mon podcast!</v-btn>
                                </div>

                            </v-stepper-content >


                        </v-stepper>
                    </v-container>
                </v-card>
            </v-content>
        </v-container>
    </v-app>
</template>


<script>
/*
    import ImagePreview from "@/components/ImagePreview";
*/
    import {axioslistennotes} from "@/store";
    var _ = require('lodash');

    export default {
        data() {
            return {
                step:1,
                rssParsedOk:false,
                tags:[{ 'header': 'Chercher un tag ou tapper pour en un nouveau' }],
                cities:[],
                interests:[],
                countries:[],
                loadingRSS:false,
                selectedTags:[],
                podcasts:[],
                offset:0,
                urlFeed:'',
                background:'',
                activator: null,
                attach: null,
                colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
                editing: null,
                index: -1,
                items: [
                    { header: 'Selectionner un tag ou créee en un' },
                    {
                        name: 'Foo',
                        color: 'blue',
                    },
                    {
                        name: 'Bar',
                        color: 'red',
                    },
                ],
                nonce: 1,
                menu: false,
                model: [
                    {
                        text: 'Foo',
                        color: 'blue',
                    },
                ],
                x: 0,
                search: null,
                y: 0,
                count:0,
                feed:{},
                genre:['Actualité','Art','Culture','Productivité','Shopping','Sciences/Technologies','Sports','Société'],
                loading:false,
                podcastSelected:'',
                podcast: {
                    name: '',
                    genre:[],
                    interests:[],
                    tags:[],
                    urlFeed:[],
                    country:[],
                    city:[],
                    ageInterval:[0,100],
                    nbPlays:0,
                    price:0,
                }

            };
        },

        computed: {
            rssParsed(){
                return !_.isEmpty(this.feed)
            },
            sliceWidth(){
                return [Math.max(this.offset,0),Math.min(2+this.offset,this.feed.items.length)]
            },
            defaultImage() {
                if (_.isEmpty(this.feed)) {
                    console.log(this.feed)
                    return require('../../../assets/default_podcast.jpg')
                } else {
                    console
                    return this.feed.image.url
/*
                    return this.feed.image.url
*/
                }
            }
        },
        watch:{
            tags (val) {
                if (val.length > 5) {
                    this.$nextTick(() => this.tags.pop())
                }
            },
            podcastSelected:function() {
                this.podcast.name = this.podcastSelected.title_original
                if (this.podcastSelected.title_original) {
                    this.podcast.name = this.podcastSelected.title_original
                    this.podcast.editor = this.podcastSelected.publisher_original,
                        this.podcast.description = this.podcastSelected.description_original,
                        this.podcast.thumbnail = this.podcastSelected.thumbnail,
                        this.podcast.listennotesId = this.podcastSelected.id
                }
                else{
                    this.podcast.name=this.podcastSelected
                }
            },
            selectedTags (val, prev) {
                if (val.length === prev.length) return

                this.selectedTags = val.map(v => {
                    if (typeof v === 'string') {
                        v = {
                            name: v,
                            color: this.colors[this.nonce - 1],
                        }

                        this.items.push(v)

                        this.nonce++
                    }

                    return v
                })
            }

        },

        methods: {
            edit(index, item) {
                if (!this.editing) {
                    this.editing = item
                    this.index = index
                } else {
                    this.editing = null
                    this.index = -1
                }
            },
            filter(item, queryText, itemText) {
                if (item.header) return false

                const hasValue = val => val != null ? val : ''

                const name = hasValue(itemText)
                const query = hasValue(queryText)

                return name.toString()
                    .toLowerCase()
                    .indexOf(query.toString().toLowerCase()) > -1
            },
            async isEmpty(obj)
            {
                return _.isEmpty(obj)
            },
            async searchPodcast() {
                if(this.search.length>3)
                {
                    let val = await axioslistennotes({
                        url: 'search?q=' + this.search + '&language=French&only_in=title&type=podcast',
                        method: "get"
                    })
                    if(val.data.results){
                    this.podcasts = val.data.results}
                }
            },
            handleFileUpload(){
                let reader  = new FileReader();
                reader.addEventListener("load", function () {
                    this.showPreview = true;
                    this.imagePreview = reader.result;
                }.bind(this), false);
                if( this.file ){
                    if ( /\.(jpe?g|png|gif)$/i.test( this.podcast.podcastPicture.name ) ) {
                        reader.readAsDataURL( this.podcast.podcastPicture );
                    }
                }
            },
            setPicture(picture){
                this.podcast.image = picture

            },
            async parseRSS()
                {
                    let Parser = require('rss-parser');
                    let parser = new Parser();
                    this.loadingRSS=true
                    this.feed = await parser.parseURL('https://cors-anywhere.herokuapp.com/'+this.podcast.urlFeed);
                    this.loadingRSS=false
                    this.podcast.name = this.feed.title
                    this.podcast.image=this.feed.itunes.image
                    this.podcast.nbEpisodes = this.feed.items.length
                    this.podcast.description = this.feed.description
                    this.rssParsedOk = true
                    let Vib = require('node-vibrant')
                    Vib.from('https://cors-anywhere.herokuapp.com/'+this.feed.image.url).getPalette((err, palette) => this.background = palette.LightVibrant.getHex())
            },
            extractId(payload){
                if(payload)
                {
                    var result = payload.map(function(el) {return el.id})
                    return result
                }},
            extractName(payload){
                if(payload)
                {
                    console.log('load',payload)
                    var result = payload.map(function(el) {
                        if(el.name)
                            return {name:el.name}
                        else
                            return {name:el}
                            })
                    console.log(result)
                    return result
                }},

            createPodcast(){
                let payload = this.podcast
                payload['author']=this.$store.state.userid
                payload['tags'] = this.extractName(this.selectedTags)
                this.$store.dispatch('createPodcast',this.podcast);

            },
            load(){
                this.loading=!this.loading
            },
            async nextStep(){
                this.$store.state.newPodcast=this.podcast;
                this.$store.state.newPodcast.podcastId = await this.$store.dispatch('createPodcast')
                if(this.podcast.listennotesId) {
                    try{await this.$store.dispatch('UpdatePodcastEpisodes', {podcastId: this.$store.state.newPodcast.podcastId})}
                    catch(e){console.log(e)}
                }
                this.$router.push('/Podcaster/addPodcast/connInfo')
            }
        },
        async created(){

            this.cities = await this.$store.dispatch("getCities")
            this.countries = await this.$store.dispatch("getCountries")
            this.interests = await this.$store.dispatch("getInterests")
            let importedTags = await this.$store.dispatch("getTags")
            this.tags=this.tags.concat(importedTags)
        }
    }
</script>

<style>


</style>