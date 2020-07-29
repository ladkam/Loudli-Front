<template>
            <v-card  class="mx-auto mt-4"  width="1300" flat >
                <v-breadcrumbs class="pa-1 mb-2" :items="items" divider=">"></v-breadcrumbs>
                <v-card flat>
                    <v-stepper alt-labels class="elevation-0" v-model="step" style="elevation: 0;border-style: none" >

                        <v-stepper-header style="elevation: 0;border-style: none" class="elevation-0">

                            <v-stepper-step editable edit-icon="mdi-check"  :complete="step >1" step="1">
                            Demande
<!--
                            <small class='mt-1'> Validation de la demande </small>
-->
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step editable  edit-icon="mdi-check" :complete="step >2" step="2">
                                Proposition
<!--
                            <small class='mt-1'> prix et écoutes </small>
-->
                            </v-stepper-step>

                            <v-divider></v-divider>


                            <v-divider></v-divider>

                            <v-stepper-step  edit-icon="mdi-check" editable  :complete="step >3" step="4">
                                Documents
<!--
                                <small class='mt-1'> Création du messsage publicitaire </small>
-->
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step  edit-icon="mdi-check" editable  :complete="step >5" step="5">
                                Enregistrement
<!--
                                <small class='mt-1'> Publication du podcast </small>
-->
                            </v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step  edit-icon="mdi-check" editable  :complete="step >5" step="5">
                                Publication
                                <!--
                                                                <small class='mt-1'> Publication du podcast </small>
                                -->
                            </v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step editable  :complete="step >6" step="6">
                                Paiement
<!--
                                <small class='mt-1'> Paiement du podcasteur </small>
-->
                            </v-stepper-step>

                        </v-stepper-header>
                        <!--Campaign Details-->
                        <v-stepper-content step="1">
                            <v-card  flat>
                                <v-card width="100%"  flat>
                                    <div class="d-flex" style="width:100%">
                                        <div class="ml-2  mt-2" width="100%" style="border-style: none;width: 100%">
                                            <v-card-text><v-icon small> fa-clock </v-icon> <span class="subtitle-2">Date de début souhaité :</span> {{compaign.startDate}}</v-card-text>
                                            <v-card-text> <v-icon small> fa-link </v-icon> <span class="subtitle-2" >Lien </span> <a type="url" :href="compaign.urlProduit">
                                                {{compaign.urlProduit}}
                                            </a> </v-card-text>
                                            <v-card-text>
                                                <v-avatar size="30">
                                                    <v-img :src="compaign.announcer.UserProfileInfo.profilePicture">
                                                    </v-img>
                                                </v-avatar>
                                                Créée par {{compaign.announcer.last_name}} {{compaign.announcer.first_name}}
                                            </v-card-text>
                                            <v-card-text  v-model="compaign.description"
                                                          hide-details style="width: 70%"
                                                          readonly
                                                          filled
                                                          fixed
                                                          outlined label="Description de la compagne">
                                                <span class="subtitle-2" > Description: </span>
                                                {{compaign.description}}
                                            </v-card-text>
                                            <div class="ml-3 mt-2">
                                                <H6 class="ml-4"><v-icon>fa-bullseye</v-icon> Audience visée:</H6>
                                                <v-card class="d-flex mx-5 mt-5" flat>
                                                    <div class="ml-10">
                                                        <div class="d-flex flex-column justify-center">
                                                        </div>
                                                    </div>


                                                </v-card>
                                                <div>
                                                    <div>

                                                        <label class="mt-2 ml-4 mt-4"> <v-icon>fa-venus-mars</v-icon>Genre: </label>
                                                        <v-chip  class="ml-2"
                                                        >
                                                            {{compaign.targetGender}}
                                                        </v-chip>
                                                    </div>
                                                </div>
                                                <div class="d-block ml-4 mt-4">
                                                    <label class="mt-2"> <v-icon>fa-child</v-icon> Âge: </label>
                                                    <v-chip label class="ml-2" v-for="age in compaign.ageGroup"
                                                            :key="age"
                                                    >
                                                        {{age}}
                                                    </v-chip>
                                                </div>

                                                <div class="d-block ml-4 mt-4">
                                                    <label class="mt-2"> <v-icon>fa-map-marker-alt</v-icon> Localisation: </label>
                                                    <v-chip class="ml-2" v-for="city in compaign.city"
                                                            :key="city.id"
                                                    >
                                                        {{city}}
                                                    </v-chip>
                                                    <v-chip class="ml-2" v-for="country in compaign.country"
                                                            :key="country.id"
                                                    >
                                                        {{country}}
                                                    </v-chip>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </v-card>
                            </v-card>
                        </v-stepper-content>
                        <!--Campaign Price-->
                        <v-stepper-content step="2" >
                            <v-card v-if="compaign.proposition_set.length==0">
                                <v-row>
                                    <v-col v-if="compaign.statusNum=='2'">

                                <v-card-text class="mb-2">
                                    Vous avez accepté la demande de campagne de {{compaign.announcer.first_name}} qui attend un proposition de prix et d'écoutes.
                                </v-card-text>
                                    <div class="ml-4">
                                <v-text-field  outlined label="Nombre d'écoutes de l'annonce en milliers" v-model="compaign.plays"  append-icon="mdi-headphones">
                                </v-text-field>

                                <v-text-field outlined label="Prix"  persistent-hint :hint="'Le prix moyen sur loudli pour ce nombre d écoutes est '+numberWithSpaces(40*compaign.plays)+'€'"  v-model="compaign.price" append-icon="fa-euro-sign">
                                </v-text-field>
                                        </div>
                                    </v-col>
                                    <v-col>
                                        <div v-if="compaign.price>0">
                                            <v-card-title class="mt-0 pt-0"> Proposition </v-card-title>
                                            <v-simple-table>
                                                <tbody>
                                                <tr>
                                                    <td>Nombre d'écoutes</td>
                                                    <td>{{numberWithSpaces(compaign.plays*1000)}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Prix</td>
                                                    <td>{{numberWithSpaces(compaign.price)}}€</td>
                                                </tr>
                                                </tbody>
                                            </v-simple-table>
                                            <v-card-subtitle v-if="compaign.status=='Proposition envoyée'">
                                                Votre proposition est envoyée nous attendant la réponse de l'annnonceur. Une fois acceptée, le montant sera prélévé par Loudli et sera versé sur votre compte à l'issue de la campagne.
                                            </v-card-subtitle>
                                            <v-card-subtitle v-if="compaign.status=='Acceptée'">
                                                Une fois la proposition acceptée le montant de la transaction sera prélevé par Loudli. Il sera versé sur votre compte quand le nombre d'écoutes sera atteint.
                                            </v-card-subtitle>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-card-actions v-if="compaign.statusNum=='2'" class="justify-end">
                                <v-btn  right color="primary" @click="sendProposition({'price':compaign.price,'plays':compaign.plays,'comment':'blabla','compaign':compaign.id})">
                                Envoyer
                                </v-btn>
                                </v-card-actions>
                            </v-card>


                            <v-card width="1500">

                            <v-card class="ml-2 ma-0 pa-0 justify-center"  :elevation="5"   width="50%" >
                                <v-card-title class="text-center justify-center" >
                                    <span class="text-center">{{compaign.name}}</span>
                                </v-card-title>
                                <v-card-text><v-icon small> fa-clock </v-icon> <span class="subtitle-2">Date de début souhaité :</span> {{compaign.startDate}}</v-card-text>
                                <v-card-text> <v-icon small> fa-link </v-icon> <span class="subtitle-2" >Lien </span> <a type="url" :href="compaign.urlProduit">
                                    {{compaign.urlProduit}}
                                </a> </v-card-text>
                                <v-card-text>
                                    <v-avatar size="30">
                                        <v-img :src="compaign.announcer.UserProfileInfo.profilePicture">
                                        </v-img>
                                    </v-avatar>
                                    Créée par {{compaign.announcer.last_name}} {{compaign.announcer.first_name}}
                                </v-card-text>
                                <v-card-text  v-model="compaign.description"
                                              hide-details style="width: 70%"
                                              readonly
                                              filled
                                              fixed
                                              outlined label="Description de la compagne">
                                    <span class="subtitle-2" > Description: </span>
                                    {{compaign.description}}
                                </v-card-text>

                            </v-card>


                            </v-card>

                            <!--<v-card >
                                <v-timeline >
                                    <v-timeline-item>


                                    </v-timeline-item>
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
                            </v-card>-->
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
 <!--Documents-->

                        <v-stepper-content  step="4">

                            <div>
                                <v-card-text>
                                    Les éléments suivants on été communiqué par l'annonceur :
                                </v-card-text>

                                <v-card-text> <span class="subtitle-2"> Pitch: </span>{{compaign.pitch}}</v-card-text>
                                <v-card-text class="subtitle-2">Fichiers :</v-card-text>

                                <v-card-text v-for="(file,index) in compaign.attached_set" :key="index">

                                    <a  class="pt-2 pl-0"  style="font-size:15px; font-family: 'Arial Unicode MS';text-decoration: underline;" v-if="file.attachedFile" @click="downloadAttachement(file.attachedFile,file.attachedFileName)"> <v-icon> mdi-file</v-icon>  {{file.attachedFileName}}</a>

                                </v-card-text>

                            </div>
                        </v-stepper-content>

                        <!--Audio recording-->

                        <v-stepper-content step="5">
                            <v-card flat class="pa-2 ml-6">
                        <v-row>

                            <v-col>
                                <v-card-text v-if="compaign.statusNum==3">
                                    Veuillez charger l'annoncer audio qui vous avez l'intention de diffuser.
                                </v-card-text>
                                <v-card-text v-if="compaign.statusNum>3">
                                    Annonce envoyée à l'annonceur
                                </v-card-text>
                                <v-card class="ml-2" flat width="300" >


                                    <vuetify-audio v-if="compaign.statusNum>3" flat color="primary" :file="compaign.audioFile"   downloadable></vuetify-audio>


                                </v-card>

                        <!--        <audio class="ml-3" controls style="width:90%">
                                    <source :src="compaign.audioFile" type="audio/mpeg">
                                </audio>-->


                                <v-file-input v-if="compaign.statusNum==3"
                                              outlined
                                              v-model="audioFile"
                                              label="Annonce"
                                              :show-size="1000"
                                              prepend-icon="mdi-record"
                                              accept="audio/*"
                                              style="width:50%"
                                              class="mt-2"
                                              :loading="fileLoading"
                                >
                                </v-file-input>


                            </v-col>

                        </v-row>

                            <v-card-actions v-if="compaign.statusNum==3" class="justify-end">
                                <v-btn right color="primary" @click="uploadAudioFile">
                                    Proposer
                                </v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-stepper-content>
                    </v-stepper>
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

export default {
        data() {
            return {
                ads:[],
                e1:0,
                updated:false,
                audioFile:{},
                audioFileName:{},
                tabNb:0,
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
            if(this.compaign.status=='Acceptée'){
                this.compaign.status='Proposition sent'
            }
            if(this.compaign.status=='Proposition sent'){
                this.compaign.status='Text sent'
            }
        },
        async sendProposition(payload){
            await this.$store.dispatch('updateCompagne',{id:this.$route.params.id,data:{actionFor:0}})
            await this.$store.dispatch('sendProposition',payload)
            this.compaign =  await this.$store.dispatch('GetCompagne',{id:this.$route.params.id})

            this.alarmProposition=false

        },
        async uploadAudioFile(){

            this.fileLoading=true
            await this.$store.dispatch('sendAudioFile',{id:this.$route.params.id,attachedFile:this.audioFile,attachedFileName:this.audioFile.name,status:'Announce enregistrée',statusNum:4})
            this.fileLoading=false
            this.compaign =  await this.$store.dispatch('GetCompagne',{id:this.$route.params.id})



        },
            pickColor(s){
                if(s==this.compaign.status)
                {return 'primary'}
                else
                {return 'light-grey'}
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
        async created(){
            this.compaign =  await this.$store.dispatch('GetCompagne',{id:this.$route.params.id})
            this.ageGroups = await this.$store.dispatch("getAgeGroup")
            this.educationLevels = await this.$store.dispatch("getEducation")
            this.step = this.compaign.statusNum
            this.items.push(
                {
                    text: this.compaign.name,
                    disabled: true,
                    to: '/podcaster/campaigns/campaign/'+this.compaign.id,
                })

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