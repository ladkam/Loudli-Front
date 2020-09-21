<template>
        <v-container>
                <h2> Création de compagne </h2>
                    <v-stepper v-model="step" vertical>
                        <v-stepper-step  :complete="step > 1" step="1" >
                            Nom de la Campagne
                            <small class='mt-1'> Donnez un nom à la campagne.</small>

                        </v-stepper-step>
                        <v-stepper-content style="width: 100%" step="1">
                                <v-card   flat width="1200px" style="border-style: none">
                                    <v-text-field
                                            hide-details
                                            class="mr-4 mb-2 pb-0 mt-2 ml-0"
                                            v-model="compaign.name"
                                            style="width: 40%;border-style: none;height:100%"
                                            label="Nom de la compagne"
                                            outlined
                                            placeholder="taper un nom"
                                            @keypress.enter="step=step+1">
                                    </v-text-field>
                                </v-card>
                            <v-btn color="primary" @click="step=step+1" width="120" class="mt-2" :disabled="!compaign.name.length>8"> suivant</v-btn>
                        </v-stepper-content>
                        <v-stepper-step  :complete="step >2" step="2">
                            Date de début
                            <small class='mt-1'> Quand la campagne commencera ?</small>

                        </v-stepper-step>
                        <v-stepper-content step="2">
                            <v-card   flat width="1200px" style="border-style: none">
                            <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                            class="mr-4 mb-0 pb-0 mt-2"
                                            v-model="compaign.startDate"
                                            label="Date "
                                            outlined
                                            style="width: 40%;"
                                            hide-details
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="compaign.startDate" no-title @input="menu2 = false"></v-date-picker>
                            </v-menu>

                            </v-card>
                            <v-btn color="black" dark @click="step=step-1" class="mt-2 ml-0 mr-2" width="120" > précédent </v-btn>
                            <v-btn color="primary" @click="step=step+1" width="120" class="mt-2" :disabled="!compaign.startDate.length"> suivant</v-btn>
                            </v-stepper-content>

                        <v-stepper-step  :complete="step >3" step="3">
                            Genre de l'audimat
                            <small class='mt-1'> quel genre visez-vous ? </small>

                        </v-stepper-step>
                        <v-stepper-content step="3">
                        <v-card flat class="d-flex mt-2 mb-2">
                            <v-btn-toggle
                                    v-model="compaign.targetGender"
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
                        </v-card>
                        <v-btn color="black" dark @click="step=step-1" class="mt-2 ml-0 mr-2" width="120" > précédent </v-btn>
                        <v-btn color="primary" @click="step=step+1" width="120" class="mt-2" :disabled="!compaign.startDate.length"> suivant</v-btn>
                            </v-stepper-content>
                        <v-stepper-step  :complete="step >4" step="4">
                            Âge
                            <small class='mt-1'> quel catégories d'âges visez-vous ? </small>

                        </v-stepper-step>

                            <v-stepper-content step="4">
                                <v-card   flat width="1200px" style="border-style: none">

                                    <v-btn-toggle
                                            v-model="compaign.ageGroup"
                                            color="primary"
                                            class="ml-3 mb-3"
                                            multiple
                                    >
                                        <v-btn v-for="(ageGroup,index) in ageGroups" :key="index" :value="index" text>
                                            {{ageGroup.name}}
                                        </v-btn>

                                    </v-btn-toggle>
                                </v-card>
                        <v-btn color="black" dark @click="step=step-1" class="mt-2 ml-0 mr-2" width="120" > précédent </v-btn>
                        <v-btn color="primary" @click="step=step+1" width="120" class="mt-2" :disabled="!compaign.startDate.length"> suivant</v-btn>
                            </v-stepper-content>

                        <v-stepper-step  :complete="step >5" step="5">
                            Description
                            <small class='mt-1'> Donnez une description à votre campagne pour aider le podcasteur à comprendre votre besoin. </small>
                        </v-stepper-step>
                        <v-stepper-content step="5">
                            <v-card   flat width="1200px" style="border-style: none">
                            <v-textarea
                                        regular
                                        class="pa-2"
                                        outlined
                                        hide-details
                                        style="border-style: none"
                                        v-model="compaign.description"
                                        md="5"
                                        hint="decrivez le contenu de la compagne"
                                        label="Description">
                        </v-textarea>
                                <v-btn color="black" dark @click="step=step-1" class="mt-2 ml-0 mr-2" width="120" > précédent </v-btn>
                                <v-btn color="primary" @click="step=step+1" width="120" class="mt-2" :disabled="!compaign.startDate.length"> suivant
                                </v-btn>
                                </v-card>
                            </v-stepper-content>
                        <v-stepper-step  :complete="step >6" step="6">
                            Centre d'interêt
                            <small class='mt-1'> Quelles sont les centres d'interêt de la population visée? </small>

                        </v-stepper-step>
                        <v-stepper-content step="6">
                            <v-card   flat width="1200px" style="border-style: none">
                            <v-combobox
                                    dense
                                    hide-details
                                    style="width: 40%"
                                    deletable-chips
                                    chips
                                    outlined
                                    label="centre d'interêt"
                                    :items="interests"
                                    item-value="id"
                                    item-text="name"
                                    v-model="compaign.interests"
                                    multiple
                            >
                            </v-combobox>
                            <v-btn color="black" dark @click="step=step-1" class="mt-2 ml-0 mr-2" width="120" > précédent </v-btn>
                            <v-btn color="primary" @click="step=step+1" width="120" class="mt-2" :disabled="!compaign.startDate.length"> suivant</v-btn>
                                </v-card>

                                </v-stepper-content>

                        <v-stepper-step  :complete="step >7" step="7">
                            Localisation
                            <small class='mt-1'> Quelles zones génographiques visez-vous? </small>

                        </v-stepper-step>

                        <v-stepper-content step="7">
                            <v-card   flat width="1200px" style="border-style: none">
                            <v-autocomplete
                                    label="Pays"
                                    hide-details
                                    dense
                                    style="width: 40%"
                                    deletable-chips
                                    chips
                                    class="mb-2"
                                    outlined
                                    :items="countries"
                                    item-value="id"
                                    item-text="name"
                                    v-model="compaign.country"
                                    multiple
                            >
                            </v-autocomplete>
                            <v-autocomplete
                                    class="mb-3"
                                    dense
                                    hide-details
                                    style="width: 40%"
                                    deletable-chips
                                    chips
                                    outlined
                                    label="Villes"
                                    :items="cities"
                                    item-value="id"
                                    item-text="name"
                                    v-model="compaign.city"
                                    multiple
                            >
                            </v-autocomplete>
                            <v-btn color="black" dark @click="step=step-1"  class="mt-2 ml-0 mr-2" width="120"> précédent </v-btn>
                            <v-btn color="primary" @click="step=step+1" width="120" class="mt-2" :disabled="!compaign.startDate.length"> suivant</v-btn>
                            </v-card>
                        </v-stepper-content>


                        <v-stepper-step  :complete="step >8" step="10">
                            Autre
                            <small class='mt-1'> un fichier ou un lien à ajouter ? </small>
                        </v-stepper-step>
                            <v-stepper-content step="8">
                                <v-card   flat width="1200px" style="border-style: none">
                                    <v-text-field
                                            type="url"
                                            hide-details
                                            class="mr-4 mb-2 pb-0 mt-2 ml-0"
                                            v-model="compaign.urlProduit"
                                            style="width: 40%;border-style: none;height:100%"
                                            label="Url du produit"
                                            outlined
                                            placeholder="http://example.com"
                                            @keypress.enter="CreateCompaign">
                                    </v-text-field>
                            <v-file-input v-model="file"  outlined style="width: 40%"></v-file-input>
                            <v-btn color="black" dark @click="step=step-1"  class="mt-2 ml-0 mr-2" width="120"> précédent </v-btn>
                            <v-btn color="primary" @click="CreateCompaign" class="mt-2 ml-0 mr-2" width="225"> Créer la compagne <v-icon style="align: center">mdi-bullhorn</v-icon>
                            </v-btn>
                                </v-card>

                            </v-stepper-content>
<!--
                </v-card>
-->
                    </v-stepper>
        </v-container>
</template>


<script>
    export default {
        data() {
            return {
                step:1,
                interests:[],
                countries:[],
                file:{},
                fileName:{},

                cities:[],
                compaign:{
                    type:'',
                    name:'',
                    urlProduit:'',
                    fileName:{},
                    interests:[],
                    city:[],
                    country:[],
                    description:'',
                    startDate:'',
                    targetGender:'',
                    ageGroup:'',
                    educationLevel:'',
                    profilePicture:{}
                },
                genders:['1','2','3'],
                genderLabels:['Hommes','Femme','Les deux'],
                educationLevels:[],
                ageGroups:[],
                podcast:{},
                types:['Audio fourni','Annonce originale']
                }
        },
        computed: {
            defaultImage() {
                    return require('@/assets/default_podcast.png')
            }
        },
        methods: {
            setPicture(picture){
                this.compaign.profilePicture = picture
            },
            async CreateCompaign() {
                let payload = this.compaign
                this.$store.state.newCompaign = this.compaign
                console.log(payload)
                payload['podcast']=this.podcast['id']
                payload['actionFor']=this.podcast.author.id
                payload['city'] = this.compaign.city
                payload['country'] = this.compaign.country
                payload['interests'] =  this.extractId(this.compaign.interests)
                payload['status']= this.podcast['id']?'Demandée':'Créée'
                let compaign = await this.$store.dispatch('CreateCompaign', payload)
                let id = compaign.id
                if(this.file)
                {
                    this.$store.dispatch('sendCompaignFile',{'attachedFile':this.file,'attachedFileName':this.fileName,'compaign':id})

                }

                this.$router.push('/advertiser/campaign/'+id)
            },
            extractId(objects){
                if(objects)
                {
                var ob = objects
                return ob.map(function(el) {return el.id})
                }
            },
            deleteFile(){
                this.fileName = ''
                this.file = ''
            },
            onFilePicked (e) {
                const files = e.target.files
                if(files[0] !== undefined) {
                    this.fileName = files[0].name
                    if(this.fileName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.fileUrl = fr.result
                        this.file = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.fileName = ''
                    this.file = ''
                    this.fileUrl = ''
                }
            },
            pickFile () {
                this.$refs.file.click ()
            }
        },
        async created(){
            if(this.$route.params.id!=-1){
            this.podcast = await this.$store.dispatch("getPodcast",{id:this.$route.params.id})
                this.ageGroups = await this.$store.dispatch("getAgeGroup")
                this.educationLevels = await this.$store.dispatch("getEducation")
                this.cities = await this.$store.dispatch("getCities")
                this.countries = await this.$store.dispatch("getCountries")
                this.interests = await this.$store.dispatch("getInterests")
            }
        }
    }
</script>

<style>

    .scroll
    {
        overflow-y: hidden;
    }

    .inactive
    {
        pointer-events: none;
        position: relative;

        width: 100%;
        height: 100%;
        /*
                display: none;
        */
        opacity: 0.4;

    }

</style>