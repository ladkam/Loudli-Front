<template>

            <v-container fluid >

                <v-card outlined class="pa-2 mt-5" height="100%">
                <div  class="d-flex justify-space-between align-stretch" style="border-style: none;width: 100%">
                    <v-avatar tile size="250" class="flex-shrink-1" style="align-self: center">
                        <v-img
                                :src="podcast.image"
                                class="bkg">
                        </v-img>
                    </v-avatar>

                    <div style="border-style: none;" class="flex-grow-1 d-flex align-start flex-column">
                        <div style="border-style: none" class="mb-auto flex-grow-1">
                        <v-card-title class="mt-0 mb-0 py-0 flex-grow">
                            {{podcast.name}}
                        </v-card-title>

                        <v-card-subtitle class="mt-0 mb-0 py-0">
                            <strong> {{this.podcast.categories.join(' | ')}}  </strong>
                        </v-card-subtitle>
                            <v-card-subtitle class="mt-0 mb-0 py-0">
                                <strong>{{this.numberWithSpaces(podcast.nbEpisodes)}} épisode{{podcast.nbEpisodes>1?'s':''}} </strong>
                            </v-card-subtitle>
                            <v-card-subtitle class="mt-0 mb-0 py-0">
                            <strong></strong>
                            {{podcast.editor}}
                        </v-card-subtitle>
                        </div>

                        <div class="d-flex flex-column" style="border-style: none" >
                            <div class="d-flex justify-start ml-3">
                            <v-card  style="height: 100%" class="pa-2"    color="#00796b"  outlined >
                                <div style="text-align: center;border-style: none;color: white"> Tarif indicatif </div>
                                <div style="text-align: center;font-weight: bold;font-size: 18px;color:white">{{numberWithSpaces(podcast.price)}} €/ <span>  CPM </span></div>
                            </v-card>

                            <v-card  class="ml-4 pa-2"  color="secondary"  c outlined x-large>
                                <div style="text-align: center;border-style: none;font-size: 16px;color: white"> Ecoutes </div>
                                <div style="text-align: center;font-weight: bold;font-size: 18px;color:white">{{numberWithSpaces(podcast.nbPlays)}}/Mois</div>
                            </v-card>
                            </div>

                            <div class="d-flex mt-12">
                                <v-chip v-for="(tag,index) in podcast.tags" class="ml-2"  :key="index" label small light  color="grey lighten-2">
                                    {{tag}} <v-icon small>mdi-tag</v-icon>
                                </v-chip>
                            </div>

                        </div>
                    </div>
                    <div v-if="isOwner" class="d-flex flex-column align-start">
                        <v-btn color="primary" class="mb-5" dark width="300"  height="50" :to="'/announcer/requestcampaign/'+podcast.id">
                            Demander une campagne
                        </v-btn>
                    <v-btn color="secondary" dark width="300"  height="50">
                        <v-icon>
                            mdi-star
                        </v-icon>
                        ajouter à mes favoris
                    </v-btn>
                    </div>



                </div>
                </v-card>

                <div class="d-flex mt-2 ">

                    <v-card outlined class="flex-shrink-0 pa-2" style="width: 30%">
                        <v-card-title class="pa-O ma-0">
                            Audience
                        </v-card-title>
                        <div class="ml-2 mt-2">
                            <v-label  color="blue"> Âge </v-label>
                            <v-chip small v-for="(ageGroup,index) in podcast.ageGroup" :key="index" class="ml-2"> {{ageGroup}} </v-chip>
                        </div>

                        <div class="ml-2 mt-2">
                            <v-label  color="blue"> Genre </v-label>
                            <v-chip small class="ml-2"> {{podcast.targetGender}} </v-chip>
                        </div>

                        <div class="ml-2 mt-2">
                            <v-label  color="blue"> Catégories </v-label>
                            <v-chip small v-for="(category,index) in podcast.categories" :key="index" class="ml-2"> {{category}} </v-chip>
                        </div>

                        <div class="ml-2 mt-2">
                        <v-label>Localisation</v-label>
                        <v-chip small v-for="(city,index) in podcast.city" :key="index" class="ml-2"> {{city}} </v-chip>
                            <v-chip small v-for="(country,index) in podcast.country" :key="index" class="ml-2"> {{country}} </v-chip>
                        </div>
                    </v-card>

                <v-card outlined class=" ml-5 d-flex align-center"  width="100%">
                    <div class="align-center">
                        <v-card-title>Description</v-card-title>
                        <v-card-text class="align-center">
                        <span v-html="podcast.description" ></span>
                        </v-card-text>
                    </div>

                </v-card>
                </div>

                <v-card v-if="!loading" outlined class="mt-2 px-2" >
                    <v-card-title>
                        Derniers épisodes
                    </v-card-title>
                    <div v-if="!loading" class="d">
                    <v-card flat  v-for="(item,index) in feed.items" :key="index">
                        <v-scroll-y-transition>
                        <v-card outlined  class="pa-2 d-flex align-center mb-2"  v-if="index<slice">
                        <v-avatar size="150" tile>
                            <v-img :src="item.itunes.image">
                            </v-img>
                        </v-avatar>
                        <div>
                            <v-card-title>
                                {{item.title}}
                            </v-card-title>
                        <v-card-text>
                            {{item.itunes.subtitle}}
                        </v-card-text>
                            <audio class="ml-3" controls style="width:90%">
                                <source :src="item.enclosure.url" type="audio/mpeg">
                            </audio>

                        </div>
                        </v-card>
                        </v-scroll-y-transition>
                    </v-card>
                        <div class=" d-flex justify-center">
                        <span class="text-center display-5"  @click="slice=slice+3" v-if="slice<feed.items.length">
                            Plus <v-icon> mdi-chevron-down</v-icon>
                        </span>
                        <span class="text-center display-5" style="pointer-events: stroke "  @click="slice=slice-3" v-if="slice>3">
                            Moins <v-icon> mdi-chevron-up</v-icon>
                        </span>
                        </div>
                    </div>

                </v-card>
            </v-container>
</template>

<script>
/*
    import Aplayer from 'vue-aplayer'
*/
    import { LineSeries, DateTime,DataLabel,Tooltip } from "@syncfusion/ej2-vue-charts";
/*
    import podcastHosterLogin from "@/components/podcastHosterLogin";
*/
    export default {
        data() {
            return {
                podcast:{},
                loading:true,
                slice:3,
                feed:{},
                episodesList: [],
                menu:false,
                modifyStats:false,
                refreshRunning:false,
                newEpisode:{
                    modify:false,
                    name:'',
                    title:'',
                    podcast:'',
                    audio:''
                },
                podcastStat: [],
                date:'',
                dialog:false,
                maxValue:0,
                display:false,
                modify:false,
                //Initializing Primary Y Axis
                marker: {
                    visible: false,
                    height: 10,
                    width: 10
                },
                palettes:['#6FAAB0'],
                animation:{
                    enable: true,
                    duration: 3000,
                    delay: 200
                },
                chartArea: {
                    border: {
                        width: 0
                    }
                },
                tooltip: {
                    enable: true
                },
                title:'Ecoutes du podcast',
            };
        },
        computed:{
            primaryYAxis(){
                let dict = {
                    labelFormat: "{value}",
                    minimum: 0,
                    title:'Ecoutes',
                    lineStyle: { width: 0 },
                    majorTickLines: { width: 0 },
                    minorTickLines: { width: 0 }
                }
                return dict
            },
            isOwner()
            {
                if(this.$store.state.userid == this.podcast.author.id){
                    return false
                }
                else
                {
                    return true
                }
            },
            primaryXAxis() {
                let dict = {
                    valueType: "DateTime",
                    rangePadding: "round",
                    intervalType: 'Days',
                    edgeLabelPlacement: "Shift",
                    majorGridLines: {width: 0}
                }
                return dict
            },
        },
        components: {
/*
                VuetifyAudio: () => import('vuetify-audio'),
*/
/*
            'app-HosterLogin':podcastHosterLogin
*/
        },
        provide: {
            chart: [LineSeries, DateTime,DataLabel,Tooltip]
        },
        asyncComputed:{
            async podcastStat() {
                if (this.podcastData.episodesLoadingStatus == 'Started') {
                    while (!this.podcastStatTemp)
                    {
                        let rawData = await this.$store.dispatch('getPodcastStats', {'id': this.$route.params.id})
                        if (rawData) {
                            let dataToReturn = []
                            if (rawData) {
                                for (let i = 0; i < rawData.length; i++) {
                                    let date = rawData[i].date.split('-')
                                    date = new Date(date[0], date[1] - 1, date[2])
                                    dataToReturn.push({x: date, y: rawData[i].played})
                                    if (rawData[i].played > this.maxValue) {
                                        this.maxValue = rawData[i].played
                                    }
                                }
                                this.maxValueX = this.podcastStat[this.podcastStat.length - 1].x + 5
                                this.loading = true
                                return dataToReturn
                            }
                        }
                    }
                }
                else
                {
                    return {}
                }
            }
        },
        methods:{
            numberWithSpaces(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            },
            async updatePodcast()
            {
                await this.$store.dispatch('updatePodcast',this.podcastData)
                this.modifyStats=false
                this.refreshRunning=true
            },
            getDate(milliseconds){
                let date = new Date(milliseconds);
                let formatted_date = date.getDate()+'/'+(date.getMonth() + 1) + "/" + date.getFullYear()
                return formatted_date;
            },
             sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            },

            dia()
            {
                this.modify=true
            },
            async parseFeed()
            {
                let Parser = require('rss-parser');
                let parser = new Parser();
                this.feed =  await parser.parseURL('https://cors-anywhere.herokuapp.com/'+this.podcast.urlFeed);
                this.loading= false
            },
            async checkLoading(){
                while(this.podcastData.episodesLoadingStatus=='Started')
                {
                    this.podcastData= await this.$store.dispatch('getPodcast',{'id':[this.$route.params.id]})
                    if(this.podcastData.episodesLoadingStatus=='Started'){
                        await this.sleep(30000)
                    }
                }
                if(this.podcastData.episodesLoadingStatus=='Ok'){
                    let rawData = await this.$store.dispatch('getPodcastStats',{'id':[this.$route.params.id]})
                    let dataToReturn=[]
                    if(rawData){
                        for(let i =0; i < rawData.length;i++)
                        {
                            let date = rawData[i].date.split('-')
                            date = new Date(date[0], date[1]-1, date[2])
                            dataToReturn.push({x:date,y:rawData[i].played})
                            if(rawData[i].played>this.maxValue)
                            {
                                this.maxValue=rawData[i].played
                            }
                        }
                        this.podcastStat=dataToReturn
                        this.maxValueX=this.podcastStat[this.podcastStat.length-1].x+5
                    }
                }
            },
            updatePodcastStats(started)
            {
                if(started){
                    this.podcastData.episodesLoadingStatus='Started'
                    this.checkLoading()
                }
                this.modifyStats=false
            },
            async addEpisode(){
                this.dialog = false
                let payload= {
                    podcast:this.$route.params.id,
                    pub_date:this.newEpisode.date,
                    title:this.newEpisode.title,
                    name:this.newEpisode.title,
                    audio:this.newEpisode.audio,
                    img:this.podcastData.podcastPicture
                }
                await this.$store.dispatch('CreateEpisode',payload)
                let episodeTemp = await this.$store.dispatch('getPodcastEpisodes',{'id':[this.$route.params.id]})
                this.episodesList.push(episodeTemp.map(function(el) {return {title:el.title,pic:el.image,src:el.audio,artist:el.pub_date.split('T')[0],theme:'pic'}}))
            }
        },
        async created(){
            this.podcast= await this.$store.dispatch('getPodcast',{'id':[this.$route.params.id]})
            this.parseFeed()
        },
    }
</script>

<style>
    .audioplayer{
        border-style: none;
        elevation: lower ;
    }
    .current-title{
        align-items: center;
        border-style: solid;
        background-color: salmon;
    }
    .lds-roller {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .lds-roller div {
        animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 40px 40px;
    }
    .lds-roller div:after {
        content: " ";
        display: block;
        position: absolute;
        width: 7px;
    }

</style>