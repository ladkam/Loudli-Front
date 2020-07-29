<template>
            <v-card  loading="loadingCompaign" class="mx-auto mt-4" style="width: 100%;border-style: solid" flat  >

<!--
                <v-breadcrumbs class="pa-1 mb-2" :items="items" divider=">"></v-breadcrumbs>
-->
                            <v-card v-if="compaign"  class="pa-2 d-flex mx-auto" height="90vh" style="border-style: solid;" flat>
                                <v-card width="400">
                                    <v-card-title>
                                        Campagnes
                                    </v-card-title>
                                    <v-list flat>
                                        <v-list-item-group v-model="item" color="primary">
                                        <v-list-item v-for="(item,index) in compaigns" :key="item.id"
                                        @click="id=compaigns[index].id">
                                            <v-list-item-avatar tile>
                                                <v-img :src="item.announcer.UserProfileInfo.profilePicture">
                                                </v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                            <v-list-item-title>{{item.name}}</v-list-item-title>
                                            </v-list-item-content>
                                            <v-chip label color="primary ligthen-2">
                                                {{item.status}}
                                            </v-chip>
                                        </v-list-item>
                                            </v-list-item-group>

                                    </v-list>
                                </v-card>
                                <compaign-co :id="id"></compaign-co>
                                </v-card>
                </v-card>

</template>

<script>
/*
    import {axiosInstance} from '@/store'
*/
/*    import podcastInfo from "@/components/podcastInfo";
    import messages from "@/components/messages";*/

import {formatter} from '@/mixin/formatter'
import axios from "axios";
import compaignCo from "@/views/podcaster/compaignCo";

export default {
        data() {
            return {
                compaigns:[],
                id:0,
                item:0,
                ads:[],
                dates:[],
                statusList:["Demande","Devis","Pitch","Enregistrement","Choix de date","Selection episodes" ,"En cours","Terminée"],
                episodes:[],
                diagAdvancement:false,
                selectedEpisodes:[],
                advancement:0,
                diagOtherDates:false,
                diagOtherDtext:"Pourriez vous me proposer d'autres dates ?",
                loadingCompaign:false,
                index:0,
                diagDate:false,
                diagRecord:false,
                diagComment:false,
                diagPitch:false,
                diagSelect:false,
                proposition: {
                    price: 0,
                    plays: 0,
                    comment: '',
                    compaign: ''
                },
                e1:0,
                updated:false,
                message:'',
                alarmProposition:false,
                audioFile:{},
                audioFileName:{},
                tabNb:0,
                chosenDate:'',
                price:'',
                fileLoading:false,
                attachedFile: {},
                attachedFileName: {},
                plays:'',
                step:2,
                tab:['Campagne','Podcast','Echanges','Avancement'],
                icons:['mdi-bullhorn','mdi-podcast','fa-comment','fa-steps'],
                podcasts:[],
                compaign:{},
                ageGroups:[],
                educationLevels:[],
                status:'',
                items: [
                    {
                        text: 'Dashboard',
                        disabled: false,
                        to: '/podcaster/dashboard/',
                    },
                    {
                        text: 'Campagnes',
                        disabled: false,
                        to: '/podcaster/campaigns/',
                    }
            ]
            };
        },
    watch: {
        dates (dates) {
            if (dates.length > 5) {
                this.$nextTick(() => this.dates.pop())
            }
        }}
        ,
    computed:{
            steps(){
                let find=this.statusList.indexOf(this.compaign.status)
                return this.statusList.slice(find,find+2)
            }
    },
    components: {
        compaignCo:compaignCo
    },
        mixins:[formatter],
    methods:{

            appendSelected(target){
                this.selectedEpisodes.push(target)
                target=[]
            },
            placement(message){
                if (message.type == 'Notification')
                {
                    return 'start'
                }
                else
                    {

                        return message.sender.id==this.$store.state.userid?'end':'start'
                    }
            },
            async sendMessage(){
                await this.$store.dispatch('sendMessage',{text:this.message,type:'text',compaign:this.compaign.id,sender:this.$store.state.userid})
                this.compaign =  await this.$store.dispatch('GetCompagne',{id:this.$route.params.id})
            },
        async SelectEpisodesDiag(){
            if(this.episodes.length==0){
                this.episodes =  await this.$store.dispatch('getEpisodes',{id:this.compaign.podcast.id})
            }
            this.diagSelect=true
        },
        async validateDate(){
            await this.$store.dispatch('nextStep',{id:this.compaign.id,date:this.chosenDate})

        },
        async validateEpisodes(){
            await this.$store.dispatch('nextStep',{id:this.compaign.id,episodes:this.selectedEpisodes})

        },

            async EffacerCompagne(){
                await this.$store.dispatch('deleteCompagne',{id:this.$route.params.id})
                this.$router.push('/Annonceur/')
            },

        async updateAdvancement(payload){
            await this.$store.dispatch('sendMessage',{text:this.compaign.advancement,type:'En cours',compaign:this.compaign.id,sender:this.$store.state.userid})
            await this.$store.dispatch('updateCompagne',{id:this.compaign.id,data:payload})
            this.diagAdvancement=false
        },
        async updateCompagne(payload){
            await this.$store.dispatch('updateCompagne',{id:this.compaign.id,data:payload})
            this.compaign =  await this.$store.dispatch('GetCompagne',{id:this.compaign.id})
        },
        async sendProposition(payload){
            await this.$store.dispatch('sendMessage',payload)
            this.compaign =  await this.$store.dispatch('GetCompagne',{id:this.compaign.id})
            this.alarmProposition=false
        },
        async sendPropositionDate(payload){
            await this.$store.dispatch('sendMessage',payload)
            this.compaign =  await this.$store.dispatch('GetCompagne',{id:this.compaign.id})
            this.diagDate=false

        },
        async nextStep()
        {
            await this.$store.dispatch('nextStep',{id:this.compaign.id})
            this.compaign =  await this.$store.dispatch('GetCompagne',{id:this.compaign.id})

        },
        async decline()
        {
            await this.$store.dispatch('decline',{id:this.compaign.id,comment:this.message})
            this.compaign =  await this.$store.dispatch('GetCompagne',{id:this.compaign.id})
            this.diagComment=false
        },
        async uploadAudioFile(){
            this.fileLoading=true
            let formData = new FormData();
            formData.append('audioFile',this.audioFile);
            formData.append('audioFileName',this.audioFileName);
            formData.append('sender', this.$store.state.userid);
            formData.append('text', 'none');
            formData.append('type', 'Enregistrement');
            formData.append('compaign', this.compaign.id);

            await this.$store.dispatch('sendMessage',formData)
            this.audioFile={}
            this.audioFileName={}

            this.fileLoading=false
            this.compaign =  await this.$store.dispatch('GetCompagne',{id:this.compaign.id})
            this.diagRecord = false

        },
            pickColor(s){
                if(s==this.compaign.status)
                {return 'primary'}
                else
                {return 'light-grey'}
            },
        show(event){
                event.target.parentElement.setAttribute('style','display:None')
            event.target.parentElement.previousElementSibling.setAttribute('style','display:inline-block')

        },
        async sendPitch(payload){
            await this.$store.dispatch('sendMessage',{text:'pitch',type:'Pitch',sender:this.$store.state.userid,compaign:this.compaign.id})
            await this.$store.dispatch('updateCompagne',{id:this.compaign.id,data:{pitch:this.compaign.pitch}})
            if(payload.sendFile==1 & !!this.attachedFile) {
                console.log('here')
                this.compaign.attachedFilesawait = await this.$store.dispatch('sendCompaignFile', {
                    'attachedFile': this.attachedFile,
                    'attachedFileName': this.attachedFile.name,
                    'compaign': this.compaign.id
                })
            }
            this.diagPitch=false
            this.nextStep()

        },
        scrollToEnd() {
            var container = document.querySelector(".scroll");
            var scrollHeight = container.scrollHeight;
            container.scrollTop = scrollHeight;
        },
        hide(event){
            event.target.parentElement.setAttribute('style','display:None')
            console.log(event.target.parentElement.nextElementSibling.setAttribute('style','display:inline-block'))

        },
        convert2Date(Date){
            let d = Date.split('.')[0].replace('T',' ')
            return d

        },
        async getCompaign(id){
                console.log(id)
            this.compaign =  await this.$store.dispatch('GetCompagne',{id:id})
        },
        async downloadAttachement(F,name)
        {
            /*            let Link=F.split('/')
                        let File = '/media/'+ Link[Link.length - 1]*/
            axios({
                url: F,
                method: 'GET',
                responseType: 'blob', // important
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', name);
                document.body.appendChild(link);
                link.click();
            });
        },
        },
    /*mounted(){
        this.scrollToEnd();
    },
    updated() {
        this.scrollToEnd();
    },*/

        async created(){
            this.ageGroups = await this.$store.dispatch("getAgeGroup")
            this.educationLevels = await this.$store.dispatch("getEducation")
            this.step = this.compaign.statusNum
            this.compaigns = await this.$store.dispatch('getCompaigns')
            this.id =  this.compaigns[0].id

            this.items.push(
                {
                    text: this.compaign.name,
                    disabled: true,
                    to: '/podcaster/campaigns/campaign/'+this.compaign.id,
                })
            this.loadingCompaign=true

        }

    }
</script>

<style>
    .divided {
        display: flex;
        align-items: center;
    }

    .divider {
        flex-grow: 1;
        border-bottom: 1px solid black;
        margin: 5px
    }

    .inner-text {
        width: 100%;
        height: 100%
    }

    .inner-text--1{
        display: flex;
    justify-content: center;
    margin-top: 85px;
    font-size: 20px;
    color: #060201;
    font-weight: bold;
/*
    span { max-width: 100px }
*/
    }



</style>