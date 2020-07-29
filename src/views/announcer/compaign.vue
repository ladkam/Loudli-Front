<template>
            <v-card  class="mx-auto mt-2"  width="1500" flat  >
                    <v-stepper  class="elevation-0" alt-labels v-model="step" style="elevation: 0;border-style: none" >
                        <v-stepper-header  style="elevation: 0;border-style: none">
                            <v-stepper-step editable edit-icon="mdi-check" style="border-style: none;elevation: 0"  :complete="step >1" step="1">
                            Campagne
                        </v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step  editable edit-icon="mdi-check" style="border-style: none;elevation: 0"   :complete="step >2" step="2">
                                Proposition
                        </v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step editable edit-icon="mdi-check" style="border-style: none;elevation: 0;text-align: center"   :complete="step >3" step="3">
                            Provisionement
                        </v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step editable edit-icon="mdi-check"   :complete="step >4" step="4">
                            Pitch
                        </v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step editable edit-icon="mdi-check"   :complete="step >5" step="5">
                                Validation audio
                            </v-stepper-step>
                            <v-divider></v-divider>


                            <v-stepper-step editable edit-icon="mdi-check"   :complete="step >7" step="7">
                                <span class="text-center">Date de publication</span>
                            </v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step editable edit-icon="mdi-check"  Podcast  :complete="step >8" step="8">
                                annonce publiée
                            </v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step editable edit-icon="mdi-check"  Podcast  :complete="step >9" step="9">
                                <span class="text-center"> Campagne terminée</span>
                            </v-stepper-step>
                        </v-stepper-header>
                        <v-stepper-content step="1">
                            <v-card  flat>
                                <v-card-subtitle class="text-center pa-0 ma-0">Nom de la campagne</v-card-subtitle>
                                <v-card-title class="text-center justify-center mt-2 pt-0" >
                                    <span class="text-center">{{compaign.name}}</span>
                                </v-card-title>

                                <v-card-title><h6  > Message de l'annonceur: </h6></v-card-title>
                                <v-card-text  v-model="compaign.description"
                                              readonly
                                              filled
                                              fixed
                                              outlined label="Description de la compagne">
                                    {{compaign.description}}
                                </v-card-text>

                                <v-card-title><h6  > Détails: </h6></v-card-title>

                                <v-card-text class="my-0 mt-2 py-0">  <h6> Lien </h6> <a type="url" :href="compaign.urlProduit">
                                    {{compaign.urlProduit}}
                                </a> </v-card-text>
                                <v-card-text class="my-0 mt-2 py-0">
                                    <h6>Genre ciblé</h6>
                                    {{compaign.targetGender}}
                                </v-card-text>
                                <v-card-text class="my-0 mt-2 py-0">

                                    <h6>Localisations</h6>
                                    <div>Pays: <span v-for="L in compaign.country" :key="L">{{L}}</span></div>
                                    <div class="mt-2">Villes:<span v-for="L in compaign.city" :key="L">{{L}}</span></div>
                                </v-card-text>

                                <v-card-text class="my-0 py-0">
                                    <h6>Date de début</h6>
                                    <span>{{compaign.startDate}}</span>
                                </v-card-text>
                            </v-card>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <v-card >
                                <v-timeline >
                                    <div v-for="(proposition,index) in compaign.proposition_set"
                                         :key="proposition.id">
                                        <v-timeline-item
                                                color="primary lighten-2"
                                                fill-dot
                                                :left="proposition.sender.id==$store.state.userid"
                                                :align="proposition.sender.id==$store.state.userid?'right':'left'"
                                        >
                                            <v-card  width="400" class="d-flex flex-column align-center justify-start">
                                                <span slot="opposite">{{proposition.date}}</span>
                                                <v-card-text  v-if="proposition.sender.id==$store.state.userid" style="border-style: none" class="d-flex justify-start">
                                                    vous avez fait une proposition
                                                </v-card-text>
                                                <v-card-text v-else style="border-style: none" class="d-flex justify-start">
                                                    {{proposition.sender.first_name}} vous a fait une proposition
                                                </v-card-text>
                                                <div style="width: 300px">
                                                    <v-simple-table dense class="mb-3">
                                                        <tbody>
                                                        <tr>
                                                            <td>Nombre d'écoutes</td>
                                                            <td>{{numberWithSpaces(proposition.plays*1000)}}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Prix</td>
                                                            <td>{{numberWithSpaces(proposition.price)}}€</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Prix par Millier (PCM)</td>
                                                            <td>{{numberWithSpaces(proposition.price/(proposition.plays*1000))}}€</td>
                                                        </tr>
                                                        </tbody>
                                                    </v-simple-table>
                                                </div>
                                                <v-card-actions   v-if="proposition.sender.id!=$store.state.userid & index ==(compaign.proposition_set.length-1)" class="justify-end">
                                                    <v-btn  text color="primary" @click="updateCompagne({/*'price':this.compaign.price,'plays':this.compaign.plays,*/'status':'Proposition accepté',statusNum:3})">
                                                        Accepter
                                                    </v-btn>
                                                    <v-btn  text color="black" @click="alarmProposition=true">
                                                        Refuser
                                                    </v-btn>

                                                </v-card-actions>
                                            </v-card>
                                        </v-timeline-item>

                                        <v-timeline-item left v-if="proposition.sender.id==$store.state.userid & index ==(compaign.proposition_set.length-1)">
                                            <template v-slot:icon>
                                                <v-icon dark small>
                                                    fa-hourglass
                                                </v-icon>
                                            </template>
                                            <span class="subtitle-2" slot="opposite"> En attente de réponse </span>

                                        </v-timeline-item>
                                    </div>
                                </v-timeline>
                            </v-card>
                        </v-stepper-content>

                        <v-stepper-content step="3" class="elevation--0">
                            <v-text>
                                Un membre de notre équipe vous contactera afin d'approvisioner la somme de la proposition.
                            </v-text>

                        </v-stepper-content>

                        <v-dialog v-model="alarmProposition"
                                  max-width="400"
                                  class="pa-2 d-flex flex-column"
                        >
                            <v-card class="pa-2">
                                <v-card-title class="mx-2 px-0"> Ma proposition</v-card-title>
                                <v-card-text class="mx-2 px-0"> Faites une nouvelle proposition pour la compagne </v-card-text>
                                <v-text-field  outlined label="Nombre d'écoutes de l'annonce en milliers" v-model="compaign.plays"  append-icon="mdi-headphones">
                                </v-text-field>

                                <v-text-field outlined label="Prix"  persistent-hint :hint="'Le prix moyen sur loudli pour ce nombre d écoutes est '+numberWithSpaces(40*compaign.plays)+'€'"  v-model="compaign.price" append-icon="fa-euro-sign">
                                </v-text-field>

                                <v-textarea hide-details class="mt-2" outlined label="Commentaire"  persistent-hint   v-model="comment" append-icon="fa-comment">
                                </v-textarea>

                                <v-card-actions class="justify-end">

                                <v-btn  color="primary" @click="sendProposition({'price':compaign.price,'plays':compaign.plays,actionFor:0,'comment':comment,'sender':$store.state.userid,compaign:compaign.id})" text>
                                    Envoyer
                                </v-btn>
                                </v-card-actions>
                            </v-card>

                        </v-dialog>


                        <v-stepper-content  step="4">

                            <v-div v-if="this.compaign.status=='Paiement validé'">
                            <v-card-text >
                                Afin d'aider {{compaign.podcast.author.first_name}} à créer l'annonce publicitaire, veuiller fournir un pitch 200 mots ou un plaquette publicitaire.
                            </v-card-text>

                            <v-row>

                            <v-col>
                            <v-textarea
                                    class="ml-2 mt-2"
                                    v-model="compaign.pitch"
                                    :disabled="this.compaign.status=='Text sent'"
                                    outlined
                                    label="Message publicitaire"
                                    counter
                                    >

                            </v-textarea>


                                <v-file-input v-if="compaign.status!='Audio sent'"
                                              style="width: 50%"
                                        outlined
                                        v-model="attachedFile"
                                        label="Documents"
                                              class="mt-2"
                                        :loading="fileLoading"
                                >
                                </v-file-input>
                            </v-col>
                            </v-row>

                            <v-card-actions v-if="true" class="justify-end">
                                <v-btn  right color="primary" @click="updateCompagne({'pitch':compaign.pitch,sendFile:1,'status':'Documents envoyés',statusNum:4})">
                                    Envoyer
                                </v-btn>

                            </v-card-actions>

                            </v-div>
                            <div else>
                                <v-card-text>
                                    Les éléments suivants on été communiqué au podcaster :
                                </v-card-text>

                                <v-card-text> <span class="subtitle-2"> Pitch: </span>{{compaign.pitch}}</v-card-text>
                                <v-card-text class="subtitle-2">Fichiers :</v-card-text>

                                <v-card-text v-for="(file,index) in compaign.attached_set" :key="index">

                                    <a  class="pt-2 pl-0"  style="font-size:15px; font-family: 'Arial Unicode MS';text-decoration: underline;" v-if="file.attachedFile" @click="downloadAttachement(file.attachedFile,file.attachedFileName)"> <v-icon> mdi-file</v-icon>  {{file.attachedFileName}}</a>

                                </v-card-text>

                            </div>
                        </v-stepper-content>

                        <v-stepper-content step=5>
                            <v-card-text v-if="compaign.statusNum>3">
                                Annonce envoyée à l'annonceur
                            </v-card-text>
                            <v-card class="ml-2" flat width="300" >
                                <vuetify-audio v-if="compaign.statusNum>3" flat color="primary" :file="compaign.audioFile"   downloadable></vuetify-audio>
                            </v-card>
                            <v-card-actions v-if="compaign.statusNum==4" class="justify-end">
                                <v-btn  right color="primary" @click="updateCompagne({/*'price':this.compaign.price,'plays':this.compaign.plays,*/'status':'Enregistrement accepté',statusNum:5})">
                                    Accepter
                                </v-btn>
                                <v-btn dark  right color="black" @click="sendProposition({'price':this.compaign.price,'plays':this.compaign.plays,'status':'Proposition refusée'})">
                                    Refuser
                                </v-btn>
                            </v-card-actions>
                        </v-stepper-content>
                    </v-stepper>
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

export default {
        data() {
            return {
                ads:[],
                comment:'',
                e1:0,
                updated:false,
                alarmProposition:false,
                audioFile:{},
                audioFileName:{},
                attachedFile:{},
                attachedFileName:{},
                tabNb:0,
                price:'',
                fileLoading:false,
                plays:'',
                step:4,
                tab:['Campagne','Podcast','Echanges','Avancement'],
                icons:['mdi-bullhorn','mdi-podcast','fa-comment','fa-steps'],
                podcasts:[],
                compaign:{
                    status:''
                },
                ageGroups:[],
                educationLevels:[],
                status:''
            };
        },
    components: {
        VuetifyAudio: () => import('vuetify-audio'),
    },
        mixins:[formatter],
    methods:{
            async EffacerCompagne(){
                await this.$store.dispatch('deleteCompagne',{id:this.$route.params.id})
                this.$router.push('/Annonceur/')
            },
        async updateCompagne(payload){
            await this.$store.dispatch('updateCompagne',{id:this.$route.params.id,data:payload})
            if(payload.sendFile==1 & !!this.attachedFile) {
                console.log('here')
                this.compaign.attachedFilesawait = await this.$store.dispatch('sendCompaignFile', {
                    'attachedFile': this.attachedFile,
                    'attachedFileName': this.attachedFile.name,
                    'compaign': this.$route.params.id
                })
            }
            this.compaign = await this.$store.dispatch('GetCompagne', {id: this.$route.params.id})

        },
        async sendProposition(payload){
            await this.$store.dispatch('updateCompagne',{id:this.$route.params.id,data:{actionFor:1}})
            await this.$store.dispatch('sendProposition',payload)
            this.compaign =  await this.$store.dispatch('GetCompagne',{id:this.$route.params.id})
            this.alarmProposition=false

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
        async uploadAudioFile(){
            this.fileLoading=true
            let result = await this.$store.dispatch('sendAudioFile',{id:this.$route.params.id,attachedFile:this.audioFile,attachedFileName:this.audioFile.name,status:'Audio sent'})
            this.fileLoading=false
            console.log('here')
            this.compaign.status='Audio sent'
            console.log(this.compaign.status)
            this.compaign.audioFile=result.audioFile


        },
            pickColor(s){
                if(s==this.compaign.status)
                {return 'primary'}
                else
                {return 'light-grey'}
            }
        },
        async created(){
            this.compaign =  await this.$store.dispatch('GetCompagne',{id:this.$route.params.id})
            console.log(this.compaign.status)
            console.log(this.compaign.id)
            this.ageGroups = await this.$store.dispatch("getAgeGroup")
            this.educationLevels = await this.$store.dispatch("getEducation")
/*
            this.step = this.compaign.statusNum
*/
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



</style>