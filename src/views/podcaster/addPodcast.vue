<template>
    <v-container  height="100%">
        <v-card flat style="width: 1000px">
            <v-stepper v-model="step">
                <v-stepper-header>
                    <v-stepper-step  step="1">
                        Ajouter mon podcast
                        <small> Ajout du Flux RSS</small>
                    </v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step  step="2">
                        Audiences
                        <small> Genre, Interêts, localisation...</small>
                    </v-stepper-step >
                    <v-divider></v-divider>
                    <v-stepper-step  step="3">
                        écoutes & Tarifs
                    </v-stepper-step>
                </v-stepper-header>
                <v-stepper-content step="1">
                    <v-card-text class="ml-0" v-if="!rssParsed"> Renseignez l'adresse du flux RSS de cotre Podcast</v-card-text>
                    <v-alert v-if="this.rssParsedOk" color="blue" border="left" dismissible text > nous avons trouvé les informations suivante sur votre podcast, pour modifier le flux cliquer <span class="v-btn"   text @click="rssParsedOk=false"> ici </span></v-alert>
                    <v-alert
                            v-if="alertIncorrect"
                            color="red"
                            dark
                            close-label="false"
                            dismissible
                            class="ml-4 mr-4"
                    >
                        Le lien RSS est incorrect ou existe déjà. Si c'est le veuillez contacter le support support@loudli.com.
                    </v-alert>
                    <div v-if="!this.rssParsedOk">
                        <v-text-field type="url"
                                      class="ml-2 mr-4 mb-2"
                                      outlined
                                      style="width:20rem"
                                      v-model="podcast.urlFeed"
                                      placeholder="url de votre flux rss"
                                      label="flux RSS"
                                      hide-details>
                        </v-text-field>
                        <v-btn color="primary" class="ml-2" @click="parseRSS" style="height: 30px;align-self: end" > Importer </v-btn>
                    </div>
                    <div class="ml-2"><small v-if="loadingRSS"> analyse votre flux rss en cours ... <v-progress-circular color="blue" indeterminate></v-progress-circular> </small></div>
                    <v-scroll-x-transition>
                        <v-sheet v-if="this.rssParsedOk">
                            <div v-if="this.rssParsedOk" class="d-flex justify-space-between" style="border-style: none;width: 100%">
                                <v-avatar tile size="400" class="flex-shrink-1" style="align-self: center">
                                    <v-img
                                            :src="this.podcast.image"
                                            class="bkg">
                                    </v-img>
                                </v-avatar>
                                <div style="border-style: none;" class="flex-grow-1">
                                    <v-card-title class="mt-0 mb-0 py-0">
                                        {{podcast.name}}
                                    </v-card-title>
                                    <v-card-subtitle class="mt-0 mb-0 py-0">
                                        <strong>Nombre d'épisodes:</strong> {{podcast.nbEpisodes}}
                                    </v-card-subtitle>
                                    <v-card-subtitle class="mt-0 mb-0 py-0">
                                        <!--
                                                                                            <strong>Date dernier épisode:</strong> {{feed.items[feed.items.length-1].pubDate}}
                                        -->
                                    </v-card-subtitle>
                                    <v-card-subtitle class="mt-0 mb-0 py-0">
                                        <strong>Catégories itunes:</strong>
                                        {{podcast.categories.toString() }} </v-card-subtitle>
                                    <v-card-subtitle class="mt-0 mb-0 py-0">
                                        <strong>Par:</strong>
                                        {{podcast.editor}}
                                    </v-card-subtitle>
                                    <!--                                                <v-card-subtitle> <strong>Tags</strong>: <v-span v-for="(word,index) in feed.itunes.keywords" :key="index" label>

                                                                                        {{word}},

                                                                                    </v-span></v-card-subtitle>-->

                                    <v-card-subtitle> <strong> Description </strong></v-card-subtitle>
                                    <v-card-text
                                            class="ml-2 mr-4">
                                        {{this.podcast.description}}

                                    </v-card-text>
                                </div>
                            </div>
                            <div class="d-flex reverse justify-end" >
                                <v-btn v-if="this.rssParsedOk" color="primary" @click="step=2"> C'est mon podcast </v-btn>
                            </div>
                        </v-sheet>

                    </v-scroll-x-transition>

                </v-stepper-content>

                <v-stepper-content step=2>

                    <v-card-title color="primary"> Audience </v-card-title>

                    <v-card-text>
                        Le type d'audience de votre podcast est une information très importante pour les annonceurs, c'est avec elle qu'ils choissent les podcasts sur lesquels faire leurs annonces.
                    </v-card-text>

                    <h6 class="ml-3 mb-5"> Genre </h6>

                    <v-btn-toggle
                            v-model="podcast.targetGender"
                            color="primary"
                            class="ml-3 mb-3"
                    >
                        <v-btn :value="1" text>
                            Femmes
                            <v-icon>fa-venus</v-icon>
                        </v-btn>

                        <v-btn :value="0" text>
                            Hommes
                            <v-icon>fa-mars</v-icon>
                        </v-btn>

                        <v-btn :value="2" text>
                            autre
                            <v-icon>fa-interogation</v-icon>
                        </v-btn>
                        <v-btn :value="3" text>
                            tous
                        </v-btn>
                    </v-btn-toggle>

                    <h6 class="ml-3 mb-5"> Âge</h6>
                    <v-btn-toggle
                            v-model="podcast.ageGroup"
                            color="primary"
                            class="ml-3 mb-3"
                            multiple
                    >
                        <v-btn v-for="(ageGroup,index) in ageGroups" :key="index" :value="ageGroup.name" text>
                            {{ageGroup.name}}
                        </v-btn>
                    </v-btn-toggle>


                    <h6 class="ml-3 mb-5"> Localisation </h6>
                    <v-autocomplete
                            label="Pays"
                            hide-details
                            style="width: 40%;"
                            class="mt-2 ml-3 mb-5"
                            outlined
                            :items="countries"
                            item-value="name"
                            item-text="name"
                            v-model="podcast.country"
                            multiple>


                        <template v-slot:selection="data">
                            <v-chip
                                    close
                                    :key="JSON.stringify(data.item)"
                                    v-bind="data.attrs"
                                    :input-value="data.selected"
                                    :disabled="data.disabled"
                                    color="primary"
                                    text-color="white"
                                    @click:close="data.parent.selectItem(data.item)"
                            >
                                {{ data.item.name }}
                            </v-chip>
                        </template>
                    </v-autocomplete>



                    <v-autocomplete
                            label="city"
                            hide-details
                            style="width: 40%;"
                            class="mt-2 ml-3 mb-5"
                            outlined
                            :items="cities"
                            item-value="name"
                            item-text="name"
                            v-model="podcast.city"
                            multiple
                    >

                        <template v-slot:selection="data">
                            <v-chip
                                    close
                                    :key="JSON.stringify(data.item)"
                                    v-bind="data.attrs"
                                    :input-value="data.selected"
                                    :disabled="data.disabled"
                                    color="primary"
                                    text-color="white"
                                    @click:close="data.parent.selectItem(data.item)"
                            >
                                {{ data.item.name }}
                            </v-chip>
                        </template>
                    </v-autocomplete>

                    <h6 class="ml-3 mt-5"> Interêts </h6>
                    <v-autocomplete
                            hide-details
                            style="width: 40%;"
                            outlined
                            label="Catégories"
                            :items="Cats"
                            class="mt-2 ml-3 mb-5"
                            item-value="Name"
                            item-text="NameFR"
                            v-model="podcast.categories"
                            multiple
                    >
                        <template v-slot:selection="data">
                            <v-chip
                                    close
                                    :key="JSON.stringify(data.item)"
                                    v-bind="data.attrs"
                                    :input-value="data.selected"
                                    :disabled="data.disabled"
                                    color="primary"
                                    text-color="white"
                                    @click:close="data.parent.selectItem(data.item)"
                            >
                                {{ data.item.NameFR }}
                            </v-chip>
                        </template>
                    </v-autocomplete>

                    <h6 class="ml-3 mb-5"> Tags </h6>

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
                        <v-btn @click="step=1" color="purple" class="white--text mr-2" > Précédent </v-btn>
                        <v-btn @click="step=3" color="primary"> Suivant </v-btn>
                    </div>

                </v-stepper-content >
                <v-stepper-content step="3">
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
                    <div class="d-flex justify-end">
                        <v-btn @click="step=2" color="purple" class="mr-2 white--text"> Précédent </v-btn>
                        <v-btn @click="createPodcast" color="primary">Monétisez mon podcast!</v-btn>
                    </div>
                </v-stepper-content>
            </v-stepper>
        </v-card>
    </v-container>
</template>

<script>
    /*
        import ImagePreview from "@/components/ImagePreview";
    */

    import Cats from '@/static/Cats.json'
    import {axioslistennotes} from "@/store";
    var _ = require('lodash');

    export default {
        data() {
            return {
                step:1,
                ageGroups:[],
                selected:false,
                Cats:Cats,
                alertIncorrect : false,
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
                    subcategories:[],
                    name: '',
                    image:'',
                    nbEpisodes:0,
                    targetGender:0,
                    interests:[],
                    tags:[],
                    urlFeed:[],
                    country:[],
                    city:[],
                    ageInterval:[0,100],
                    ageGroup:[],
                    nbPlays:0,
                    categories:[],
                    price:0,
                }
            };
        },

        computed: {
            subcat() {
                var value = this.Cats.map(function (el) {
                        var name = el.Name
                        const sub = el.list
                        let header = [{header:name}]
                        let result=[]
                        result.push(header)
                        if(sub) {
                            let subcats = sub.map(
                                function (subEl) {
                                    return {name: subEl, group: name}
                                }
                            )
                            result.push(subcats)
                        }
                        return result
                    }
                )
                console.log(value.flat())
                return value.flat(2)
            },
            rssParsed(){
                return !_.isEmpty(this.feed)
            },
            sliceWidth(){
                return [Math.max(this.offset,0),Math.min(2+this.offset,this.feed.items.length)]
            },
            defaultImage() {
                if (_.isEmpty(this.feed)) {
                    return require('../../assets/default_podcast.png')
                } else {
                    return this.podcast.image
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
            remove (item) {
                const index = this.podcast.subcategories.indexOf(item.name)
                if (index >= 0) this.podcast.subcategories.splice(index, 1)
            },
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
                this.loadingRSS=true
                this.feed = await this.$store.dispatch('getPodcastRssInfo',{url:this.podcast.urlFeed,type:'check'});
                if (this.feed=='failed') {
                    this.alertIncorrect = true
                    this.loadingRSS=false
                }
                else
                {
                    this.loadingRSS=false
                    this.podcast.name = this.feed.name
                    this.podcast.categories=this.feed.category
                    this.podcast.image=this.feed.image
                    this.podcast.nbEpisodes = this.feed.length
                    this.podcast.description = this.feed.summary
                    this.podcast.editor=this.feed.author
                    this.rssParsedOk = true

                }
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

            async createPodcast(){
                let payload = this.podcast
                payload['author']=this.$store.state.userid
                payload['tags'] = this.extractName(this.selectedTags)
                let id=await this.$store.dispatch('createPodcast',this.podcast);
                this.$router.push('/podcast/'+id.toString())


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
            this.ageGroups = await this.$store.dispatch("getAgeGroup")
            let importedTags = await this.$store.dispatch("getTags")
            this.tags=this.tags.concat(importedTags)
        }
    }
</script>

<style>


</style>