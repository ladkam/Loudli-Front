<template>
    <v-app style="background-color: #FAFAFA" >
        <v-content light>
            <v-container fluid>
                <v-card flat outlined>
                    <v-container>
                        <v-row wrap width="100%" class="ml-2">
                        <h2> {{podcastData.name}}
                            <v-btn
                                    v-if="isOwner"
                                left
                                flat
                                text
                                @click="dia"
                                class="justify-start">
                            <v-icon>mdi-pencil</v-icon></v-btn></h2>
                            <v-spacer></v-spacer>
                            <v-btn text align="center"
                                   @click="$router.push('/requestcompaign/'+$route.params.id)">
                                <v-icon align="center">mdi-plus</v-icon>
                                Start a compaign
                                <v-icon>mdi-bullhorn</v-icon>
                            </v-btn>
                        </v-row>
                            <v-row  cols="12" style="border-style: none" class="flex-row-reverse justify-end"  >
                            <v-col sm="10" md="3" >
                                <v-img
                                        :src="podcastData.podcastPicture ?podcastData.podcastPicture:podcastData.thumbnail"
                                        style="border-style: none;"
                                        class="mt-0"
                                >
                                </v-img>
                            </v-col>
                            <v-col style="border-style: none;" sm="12" md="9" width="300">
                                <v-dialog
                                        v-model="modify"
                                        max-width="400"
                                >
                                    <v-card>
                                        <v-card-title> Editer podcast </v-card-title>
                                        <v-form>
                                            <v-text-field outlined
                                                          label="Nom"
                                                          v-model="podcastData.name"
                                                          class="mr-4 ml-4"
                                            >
                                            </v-text-field>
                                            <v-text-field regular outlined label="Durée" v-model="podcastData.duration" type="number" class="ml-4 mr-4 styled-input"></v-text-field>
                                            <v-select regular
                                                      label="Genre"
                                                      v-model="podcastData.genre"
                                                      :items="genre"
                                                      outlined
                                                      class="ml-4 mr-4">
                                            </v-select>
                                            <v-textarea regular
                                                        outlined
                                                        style="border-style: none"
                                                        v-model="podcastData.about"
                                                        class="ml-4 mr-4"
                                                        label="Description">
                                            </v-textarea>
                                        </v-form>
                                        <v-card-actions>
                                            <v-btn
                                                    color="orange darken-1"
                                                    text
                                                    @click="updatePodcast"
                                            >Modifier</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-card-subtitle style="border-style: none;" >Genre: {{podcastData.genre}}</v-card-subtitle>
                                <v-card-subtitle style="border-style: none;" >Durée: {{ podcastData.duration}} minutes</v-card-subtitle>
                                <v-card-subtitle style="border-style: none;" >Description: </v-card-subtitle>
                                <v-card-text style="border-style: none;" width="100%" >{{podcastData.about}}</v-card-text>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
                <v-row cols="12">
                    <v-col sm="12">
                        <v-card outlined
                                class="mt-1 mx-auto"
                                min-height="400"
                                flat
                        >
                            <v-row cols="12"
                                   class="mt-2 ml-2 mr-2 mb-2 mx-auto">
                                <v-col md="7" sm="12" align="center">
                                    <v-card style="height: 100%"
                                            flat
                                            outlined
                                            height="400"
                                    >
                                        <v-row justify="space-between" class="ml-2 mr-2">
                                        <v-card-title> Données d'écoutes:</v-card-title>
                                            <v-item-group>
                                            <v-btn
                                                    v-if="isOwner"
                                                    text
                                                    @click="dia"
                                                    class="justify-start">
                                                <v-icon>mdi-pencil</v-icon></v-btn>
                                            <v-btn
                                                    v-if="isOwner"
                                                    text
                                                    @click="modifyStatsdia"
                                                    class="justify-start">
                                                <v-icon>mdi-refresh</v-icon></v-btn>
                                            </v-item-group>
                                            <v-spacer></v-spacer>
                                        </v-row>
                                        <v-alert
                                                color="blue lighten-0"
                                                dark
                                                class="ml-4 mr-4 pa-0 pb-0 pr-3 pl-3"
                                                height="5%"
                                                style="text-wrap: normal"
                                                v-if="refreshRunning"
                                                dismissible
                                        >
                                            Le chargement de votre podcast en cours.
                                        </v-alert>
                                        <v-dialog style="border-style: solid;border-color: red" content-class="dial"
                                                v-model="modifyStats"
                                                  max-width="600"
                                                  scrollable="false"
                                                  width="unset"
                                        >
                                            <app-HosterLogin style="border-style: solid;" class="pa-0 pl-0" :podcastId = "podcastData.id"
                                                             v-on:childToParent="updatePodcastStats"
                                            ></app-HosterLogin>
                                        </v-dialog>
                                        <ejs-chart v-if="podcastStat.length>0" id="container" :primaryXAxis='primaryXAxis' :title="title" :primaryYAxis='primaryYAxis'  :tooltip='tooltip' :chartArea="chartArea" >
                                            <e-series-collection>
                                                <e-series :dataSource='podcastStat' type='Line' fill='#0275d8'  xName='x' yName='y' name='Ecoutes'  :marker='marker'> </e-series>
                                            </e-series-collection>
                                        </ejs-chart>
                                        <v-div                                                     v-else-if="podcastData.episodesLoadingStatus=='Started'"
                                        >
                                            <v-progress-circular
                                                    :size="300"
                                                    align="center"
                                                    color="primary"
                                                    indeterminate
                                                    style="height: 50%;"
                                            ></v-progress-circular>
                                        <v-row wrap align="center" justify="center"><v-card-subtitle>Chargement de données en cours, cela peut prendre quelques minutes </v-card-subtitle></v-row>
                                        </v-div>



                                        <v-card-text v-else class="align-content-center">
                                            pas de données d'écoute sur ce podcast
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col md="5" sm="12" style="border-style: none">
                                    <v-card
                                            flat
                                            outlined
                                            min-height="400">
                                        <v-card-title class="text-center"> Derniers episodes</v-card-title>
                                        <aplayer autoplay
                                                 v-if="episodesList.length>0"
                                                 theme="pic"
                                                 :music="{
                                    title: episodesList[0].title,
                                    src: episodesList[0].src,
                                    pic: episodesList[0].pic
                                }"
                                                 :list="episodesList"
                                        />
                                        <div v-else>
                                            <v-card-subtitle class="text-center"> pas d'épisodes à afficher <v-fab-transition>

                                            </v-fab-transition></v-card-subtitle>
                                        </div>
                                        <div align="center">
                                            <v-card-subtitle>
                                                <v-btn
                                                        small
                                                        elevation="0"
                                                        @click="dialog=true"
                                                        color="white"
                                                >
                                                    <v-icon>mdi-plus</v-icon>
                                                    ajouter un épisode
                                                </v-btn>
                                            </v-card-subtitle>
                                            <v-dialog
                                                    v-model="dialog"
                                                    max-width="400"
                                            >
                                                <v-container>
                                                    <v-card>
                                                        <v-card-title class="headline">Ajouter un episode</v-card-title>
                                                        <v-form>
                                                            <v-text-field class="ml-4 mr-4" outlined label="Titre de l'épisode" v-model="newEpisode.title"></v-text-field>
                                                            <v-text-field class="ml-4 mr-4" outlined label="lien audio" type="url" v-model="newEpisode.audio"></v-text-field>
                                                            <v-menu
                                                                    ref="menu"
                                                                    label="Date de publication"
                                                                    v-model="menu"
                                                                    :close-on-content-click="false"
                                                                    :return-value.sync="newEpisode.date"
                                                                    transition="scale-transition"
                                                                    offset-y
                                                                    min-width="290px"
                                                                    outlined
                                                                    class="ml-4 mr-4"
                                                            >
                                                                <template v-slot:activator="{ on }">
                                                                    <v-text-field
                                                                            v-model="newEpisode.date"
                                                                            label="Date de publication"
                                                                            readonly
                                                                            v-on="on"
                                                                            outlined
                                                                            class="mr-4 ml-4"
                                                                    ></v-text-field>

                                                                </template>
                                                                <v-date-picker v-model="newEpisode.date" no-title scrollable>
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn text color="primary" @click="$refs.menu.save(newEpisode.date)">OK</v-btn>
                                                                </v-date-picker>
                                                            </v-menu>                                   </v-form>

                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>

                                                            <v-btn
                                                                    @click="addEpisode"
                                                                    color="success"
                                                            >
                                                                <v-icon>plus-mdi</v-icon>
                                                                Ajouter
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-container>
                                            </v-dialog>
                                        </div>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Aplayer from 'vue-aplayer'
    import { LineSeries, DateTime,DataLabel,Tooltip } from "@syncfusion/ej2-vue-charts";
    import podcastHosterLogin from "@/components/podcastHosterLogin";
    export default {
        data() {
            return {
                podcastData:{},
                episodesList: [],
                genre:['Actualité','Art','Culture','Productivité','Shopping','Sciences/Technologies','Sports','Société'],
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
                loading:false,
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
                if(this.$store.userid == this.podcastData.author.id){
                    return true
                }
                else
                {
                    return false
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
            'aplayer':Aplayer,
            'app-HosterLogin':podcastHosterLogin
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
            modifyStatsdia()
            {
                this.modifyStats=!this.modifyStats
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
        props:['podcastId'],
        async created(){

            this.podcastData= await this.$store.dispatch('getPodcast',{'id':[this.podcastId]})
            let episodeTemp =await this.$store.dispatch('getPodcastEpisodes',{'id':[this.podcastId]})
            this.episodesList = episodeTemp.map(function(el) {return {title:el.title,pic:el.image,src:el.audio,artist:el.pub_date.split('T')[0],theme:'pic'}})
            this.checkLoading()

        }
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

</style>