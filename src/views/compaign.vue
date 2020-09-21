<template>
    <v-card  class="mx-auto ma-2 pa-2"   width="90%" outlined  >
        <div id="dd">
            <vue-step :now-step="nowStep" active-color="#00796b" :step-list="stepList"></vue-step>
        </div>
        <v-alert color="orange lighten-3" dense >
            <v-avatar left >
                <v-img :src="otherAvatar">
                </v-img>
            </v-avatar>
            <span class="body-2">
                        Attends la mise à jour de l'avancement de la campagne. <router-link to="/messages/" style="color: yellow;"> Cliquer ici </router-link> pour aller sur la page des message et mettre à jours vos écoutes.
                        </span>

        </v-alert>
        <v-card  flat>
            <v-card-title class="text-center justify-center mt-2 pt-0" >
                <span class="text-center">{{compaign.name}}</span>
            </v-card-title>
            <v-tabs grow v-model="tab" centered color="secondary">
                <v-tab>
                    Description
                </v-tab>
                <v-tab>
                    Devis
                </v-tab>
                <v-tab>
                    Annonce
                </v-tab>
                <v-tab>
                    analytics
                </v-tab>
            <v-tab-item class="pa-4">
                <v-card flat >

                    <v-row class="ml-2" >
                            <div >
                                <div class="subtitle-2 mt-2 ">
                                    Podcast
                                </div>

                                <div class="d-flex" @click="$router.push('/podcast/'+compaign.podcast.id)">

                                    <v-avatar tile>
                                        <v-img :src="compaign.podcast.image"></v-img>
                                    </v-avatar>

                                    <v-card-text
                                            class="body-2 v-list-item--link"
                                            readonly
                                            outlined
                                            hide-details
                                            background-color="#f8fcfc"
                                    >
                                        {{compaign.podcast.name}}
                                    </v-card-text>

                                </div>
                            </div>
                    </v-row>
                        <v-row>
                        <v-col>

                    <div class="subtitle-2 mt-2" >
                        Date début
                    </div>
                <div>
                    <v-text-field
                            class="" v-model="compaign.startDate"
                            readonly
                            background-color="#f8fcfc"

                        outlined
                            hide-details

                    >
                        <v-icon large  right> fa-calendar </v-icon>
                    </v-text-field>
                </div>

                <div class="subtitle-2 mt-2">
                    Sex
                </div>
                <div>
                    <v-text-field
                            class="" v-model="compaign.targetGender"
                            readonly
                            outlined
                            hide-details
                            background-color="#f8fcfc"


                    >
                    </v-text-field>
                </div>


                    <div>

                    <div class="subtitle-2 mt-2">
                        Âge
                    </div>

                    <v-text-field
                            class="" v-model="compaign.ageGroup"
                            readonly
                            outlined
                            hide-details
                            background-color="#f8fcfc"
                    >
                    </v-text-field>
                </div>
                            <div>
                                <div class="subtitle-2 mt-2">
                                    Description
                                </div>

                                <v-textarea
                                        class="" v-model="compaign.description"
                                        readonly
                                        auto-grow
                                        outlined
                                        rows="0"
                                        hide-details
                                        no-resize
                                        background-color="#f8fcfc"
                                >
                                </v-textarea>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="subtitle-2 mt-2">
                                Pays
                            </div>
                            <div>
                                <v-text-field
                                        class="" v-model="compaign.country"
                                        readonly
                                        outlined
                                        hide-details
                                        background-color="#f8fcfc"

                                >
                                    <v-icon large  right> fa-calendar </v-icon>
                                </v-text-field>
                            </div>
                            <div class="subtitle-2 mt-2">
                                City
                            </div>
                            <div>
                                <v-text-field
                                        class="" v-model="compaign.city"
                                        readonly
                                        outlined
                                        hide-details
                                        background-color="#f8fcfc"
                                >
                                </v-text-field>
                            </div>

                            <div class="my-7 ">

                                <div class="subtitle-2 pt-2">Fichiers communiqués : <span v-for="(file,index) in compaign.attached_set" :key="index">

                                <a  class="pl-0"  style="font-size:1rem; font-family: 'Roboto';text-decoration: underline;" v-if="file.attachedFile" @click="downloadAttachement(file.attachedFile,file.attachedFileName)"> <v-icon> mdi-file</v-icon>  {{file.attachedFileName}}</a>

                            </span></div>

                            </div>


                            <div class="subtitle-2 mt-2">
                                Text de pitch
                            </div>

                            <v-textarea
                                    class="" v-model="compaign.pitch"
                                    readonly
                                    outlined
                                    hide-details
                                    no-resize
                                    auto-grow
                                    background-color="#f8fcfc"
                            >
                            </v-textarea>
                        </v-col>

                    </v-row>

                </v-card>

            </v-tab-item>


                <v-tab-item>
                    <v-card ref="pdf" class="pa-12" flat>
                        <vue-html2pdf
                                :show-layout="false"
                                :enable-download="true"
                                :preview-modal="false"
                                :paginate-elements-by-height="1400"
                                filename="Devis"
                                :pdf-quality="2"
                                :manual-pagination="false"
                                pdf-format="a4"
                                pdf-orientation="portrait"
                                pdf-content-width="70vh"
                                ref="html2Pdf"
                                :html-to-pdf-options="htmlToPdfOptions"

                        >
                            <section slot="pdf-content">

                                <div>
                                    <br><br><br>

                                    <div style="font-family: Roboto">
                                         Le {{today}}
                                    </div>
                                    <br>

                                    <div class="subtitle-2" style="font-family: Roboto">
                                        Loudli
                                        <br>
                                        58 avenue de clichy
                                        <br>
                                        75018 Paris


                                        <div style="text-align: end;font-family: Roboto">

                                            {{compaign.announcer.first_name}} {{compaign.announcer.last_name}}
                                            <br>
                                            {{compaign.announcer.company}}

                                        </div>

                                    <br>
                                        </div>

                                    <div style="font-family: Roboto">
                                        <strong>Sujet: Devis</strong>
                                    </div>

                                    <table>
                                        <tr>
                                            <th>Designation</th>
                                            <th>Prix par millier</th>
                                            <th>Quantité</th>
                                            <th>Total</th>
                                        </tr>
                                        <tr>
                                            <td>Campagne de pub {{compaign.name}}</td>
                                            <td>{{(compaign.price/compaign.plays)*1000}}</td>
                                            <td >{{compaign.plays}}</td>
                                            <td>{{compaign.price}} €</td>


                                        </tr>
                                        <tr>
                                            <td>Commision (15%)</td>
                                            <td colspan="2"></td>
                                            <td>{{0.15*compaign.price}} €</td>
                                        </tr>
                                        <tr>
                                            <td> TVA (20%) </td>
                                            <td colspan="2"></td>
                                            <td>{{0.2*compaign.price*1.15}} €</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Total</strong></td>
                                            <td colspan="2"></td>

                                            <td><strong>{{compaign.price*1.15*1.2}} €</strong></td>

                                        </tr>
                                    </table>
                                </div>
                            </section>

                        </vue-html2pdf>


                        <v-row>
                        <table>
                            <tr>
                                <th>Designation</th>
                                <th>Prix par millier</th>
                                <th>Quantité</th>
                                <th>Total</th>
                            </tr>
                            <tr>
                                <td>Campagne de pub {{compaign.name}}</td>
                                <td>{{(compaign.price/compaign.plays)*1000}}</td>
                                <td >{{compaign.plays}}</td>
                                <td>{{compaign.price}} €</td>


                            </tr>
                            <tr>
                                <td>Commision Loudli (15%)</td>
                                <td colspan="2"></td>
                                <td>{{0.15*compaign.price}} €</td>
                            </tr>
                            <tr>
                                <td> TVA (20%) </td>
                                <td colspan="2"></td>
                                <td>{{0.2*compaign.price*1.15}} €</td>
                            </tr>
                            <tr>
                                <td><strong>Total</strong></td>
                                <td colspan="2"></td>

                                <td><strong>{{compaign.price*1.15*1.2}} €</strong></td>

                            </tr>
                        </table>
                        </v-row>

                        <v-card-actions class="justify-end">
                            <v-btn @click="generateReport" color="teal" text> <v-icon>fa-download</v-icon>  Telecharger </v-btn>
                        </v-card-actions>


                    </v-card>

                </v-tab-item>


                <v-tab-item>

                    <v-card flat width="100%" >

                        <v-row >



                        <v-col>
                            <v-card-title class="pa-0 ma-0">
                                Annonce créée
                            </v-card-title>
                            <div>
                                <div class="subtitle-2 mt-3">
                                    Date de début choisie
                                </div>

                                <v-textarea
                                        placeholder="Pas encore definie"
                                        class=""
                                        v-model="compaign.pubDate"
                                        readonly
                                        outlined
                                        hide-details
                                        no-resize
                                        auto-grow
                                        rows="0"
                                        background-color="#f8fcfc"
                                >
                                </v-textarea>
                            </div>

                        <div>
                            <div class="subtitle-2 mt-3">
                                Texte de l'annonce
                            </div>

                            <v-textarea
                                    class="" v-model="compaign.adText"
                                    readonly
                                    outlined
                                    hide-details
                                    no-resize
                                    auto-grow
                                    rows="0"
                                    background-color="#f8fcfc"
                            >
                            </v-textarea>
                        </div>

                        </v-col>


                        <v-col>
                        <div>
                            <div class="subtitle-2 mt-3 text-center" >
                                Annonce
                            </div>
                            <vuetify-audio
                                    flat
                                    color="secondary"
                                    :file="compaign.audioFile"
                                    downloadable
                            >
                            </vuetify-audio>
                        </div>

                            <v-list  >
                                <v-card-title class="ma-0 pa-0 subtitle-2">
                                    Episodes où l'annoce est diffusée:
                                </v-card-title>
                                <v-list-item
                                        class="mt-2 body-2 mx-0 px-0"
                                        :href="item.audio"
                                        target="_blank"
                                        v-for="(item,index) in compaign.ep"
                                        :key="index"
                                >
                                    <v-list-item-avatar tile>
                                        <v-img :src="item.image"></v-img>
                                    </v-list-item-avatar>
                                    {{item.name}}

                                </v-list-item>
                            </v-list>

                            </v-col>
                        </v-row>
                    </v-card>

                </v-tab-item>

            <v-tab-item >
                <Plotly
                        :data="[{
                    'x': x,
                  'y': y,
                  type: 'scatter',
                  line: {color:'#00796b'}
                  }]"
                        :layout = "{
                           title: 'Evolution des écoutes',
                           xaxis: {autorange: true,
                           type: 'date'},yaxis: {
                             autorange: true,
                             type: 'linear'
                           }
                  }"
                >
                </Plotly>

            </v-tab-item>




            </v-tabs>

        </v-card>
        <!--<v-stepper  class="elevation-0" alt-labels v-model="step" style="elevation: 0;border-style: none" flat>
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
           &lt;!&ndash; <v-stepper-content step="1">

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

            <v-stepper-content step="3" class="elevation&#45;&#45;0">
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

                    <v-textarea hide-details class="mt-3" outlined label="Commentaire"  persistent-hint   v-model="comment" append-icon="fa-comment">
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
                        class="ml-2 mt-3"
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
                                  class="mt-3"
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
            </v-stepper-content>&ndash;&gt;
        </v-stepper>-->
    </v-card>
</template>

<script>
    import jsPDF from 'jspdf'
/*
    import html2canvas from "html2canvas"
*/
    import {formatter} from '@/mixin/formatter'
    import axios from "axios";
    import vueStep from 'vue-step'

    import { Plotly } from 'vue-plotly'



    export default {
        data() {
            return {
                htmlToPdfOptions: {
                    margin: 10
                },
                tab:0,
                plays:{},
                stepList: [
                "Demande",
                "Devis",
                "Pitch",
                "Enregistrement",
                "Choix de date",
                "Selection episodes",
                "En cours",
                    "Terminée",
                    "payé"

            ],
                ads:[],
                today:'',
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
                step:4,
/*
                tab:['Campagne','Podcast','Echanges','Avancement'],
*/
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
            vueStep,
            VuetifyAudio: () => import("vuetify-audio"),

            Plotly},
        computed:{
            otherAvatar(){
                return this.$store.state.userid==this.compaign.announcer.id?this.compaign.podcast.author.UserProfileInfo.profilePicture:this.compaign.announcer.UserProfileInfo.profilePicture
            },
            total()
            {
                return this.compaign.price*this.compaign.plays
            },

            x(){
                let temp=[]
                let i=0
                if(this.plays){
                    for (i = 0; i < this.plays.length; i++) {
                        console.log('here',this.plays['x'])
                        temp.push(this.plays[i]['x'].split('.')[0])
                    }
                    console.log('x',temp)
                }
                return temp
            },
            y(){
                let i=0

                let temp=[]
                if(this.plays) {
                    for (i = 0; i < this.plays.length; i++) {
                        temp.push(this.plays[i]['y'])
                    }
                }
                console.log('y',temp)
                return temp
            },
            nowStep(){
                return this.stepList.indexOf(this.compaign.status)
            },



        },
        mixins:[formatter],
        methods:{
            generateReport () {
                this.$refs.html2Pdf.generatePdf()
            },
            generatePdf(){
                var doc = new jsPDF();
/*
                const contentHtml = this.$refs.pdf.innerHTML;
*/

                doc.fromHTML('popo')
                /*doc.triangle(60, 100, 60, 120, 80, 110, 'FD');
                doc.setLineWidth(1);
                doc.setDrawColor(255,0,0);
                doc.setFillColor(0,0,255);
                doc.triangle(100, 100, 110, 100, 120, 130, 'FD');*/
                doc.save("sample.pdf");
            },
            async downloadAttachement(F, name) {
                /*            let Link=F.split('/')
                                  let File = '/media/'+ Link[Link.length - 1]*/
                axios({
                    url: F,
                    method: "GET",
                    responseType: "blob" // important
                }).then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", name);
                    document.body.appendChild(link);
                    link.click();
                });
            },
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
            let play = await this.$store.dispatch("getPlays", {id: this.compaign.id});
            this.plays = play
            var today = new Date()
            const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
            this.today=today.toLocaleDateString('fr-FR', options)


            console.log(event.toLocaleDateString('fr-FR', options));

            /*
                        this.step = this.compaign.statusNum
            */
        }

    }
</script>

<style scoped>
    table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        border: 1px solid #ddd;
    }

    th, td {
        text-align: left;
        padding: 16px;
    }

    tr:nth-child(even) {
        background-color: #f8fcfc;
    }



    .input-group--disabled.input-group--select label {
        color: #000 !important;
    }



</style>