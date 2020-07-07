<template>
    <v-app style="background-color: #FAFAFA" >
        <v-content>
        <v-container>
            <v-card>
            <v-tabs
                    v-model="tabNb"
            >
                <v-tab v-for="(t,index) in tab" :key="index">
                    <v-icon>{{icons[index]}}</v-icon>{{t}}
                </v-tab>
            </v-tabs>
            <v-card style="height:100vh" v-if="tabNb==0" >
            <v-card-title>{{compaign.name}}</v-card-title>
                        <v-card width="100%" flat>
                            <div class="d-flex" style="width:100%">
                            <div class="ml-2  mt-2" width="100%" style="border-style: none;width: 100%">
                                 <v-card-text><v-icon small> fa-clock </v-icon> <span class="subtitle-2">Date de début souhaité :</span> {{compaign.startDate}}</v-card-text>
                                <v-card-text> <v-icon small> fa-link </v-icon> <span class="subtitle-2" >Lien </span>Lien <a type="url" :href="compaign.urlProduit">
                                    {{compaign.urlProduit}}
                                </a> </v-card-text>
                                <v-card-text>
                                <v-avatar size="30">
                                    <v-img :src="compaign.announcer.UserProfileInfo.profilePicture">
                                    </v-img>
                                </v-avatar>
                                    Créée par {{compaign.announcer.last_name}} {{compaign.announcer.first_name}}
                                </v-card-text>
                                <v-card-text class="divided">
                                    <span class="subtitle-2" > Status </span>
                                    <span v-for="(s,index) in status" :key="index">
                                    <v-chip class="ml-2" label :color="pickColor(s)">
                                        {{s}}
                                    </v-chip>
                                   <v-span class="divider"> </v-span></span>
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
                                <H6 class="ml-4"><v-icon>fa-bullseye</v-icon> Audiance visée:</H6>
                                <div>
                                    <div>
                                <label class="mt-2 ml-4 mt-4"> <v-icon>fa-venus-mars</v-icon>Genre: </label>
                                    <v-chip  class="ml-2"
                                    >
                                        {{compaign.targetGender}}
                                    </v-chip>
                                       </div>
                                <label class="mt-2 ml-4 mt-4">  <v-icon>fa-university</v-icon> Education: </label>
                                <v-chip  class="ml-2"
                                         v-for="level in compaign.educationLevel"
                                        :key="level"
                                >
                                    {{level.name}}
                                </v-chip>
                            </div>
                                <div class="d-block ml-4 mt-4">
                                <label class="mt-2"> <v-icon>fa-child</v-icon> Âge: </label>
                                <v-chip class="ml-2" v-for="age in compaign.ageGroup"
                                        :key="age"
                                >
                                    {{age.name}}
                                </v-chip>
                                </div>

                                <div class="d-block ml-4 mt-4">
                                    <label class="mt-2"> <v-icon>fa-lightbulb</v-icon> Centres d'interêts: </label>
                                    <v-chip class="ml-2" v-for="interest in compaign.interests"
                                            :key="interest"
                                    >
                                        {{interest.name}}
                                    </v-chip>
                                </div>
                                <div class="d-block ml-4 mt-4">
                                    <label class="mt-2"> <v-icon>fa-map-marker-alt</v-icon> Localisation: </label>
                                    <v-chip class="ml-2" v-for="city in compaign.city"
                                            :key="city.id"
                                    >
                                        {{city.name}}
                                    </v-chip>
                                    <v-chip class="ml-2" v-for="country in compaign.country"
                                            :key="country.id"
                                    >
                                        {{country.name}}
                                    </v-chip>
                                </div>
                            </div>
                            </div>
                            </div>
                    </v-card>

                    </v-card>
            <app-podcast v-if="tabNb==1" :podcastId="this.compaign.podcast.id" > </app-podcast>
            <app-messages v-if="tabNb==2"> </app-messages>

            </v-card>
        </v-container>

        </v-content>
    </v-app>
</template>

<script>
/*
    import {axiosInstance} from '@/store'
*/
    import podcastInfo from "@/components/podcastInfo";
    import messages from "@/views/messages";


export default {
        data() {
            return {
                ads:[],
                e1:0,
                tabNb:0,
                tab:['Campagne','Podcast','Echanges'],
                icons:['mdi-bullhorn','mdi-podcast','fa-comment'],
                podcasts:[],
                compaign:{},
                status:['Créée','Demandée','Acceptée','En cours','Terminée'],
                ageGroups:[],
                educationLevels:[]
            };
        },
        components:{
            'app-podcast' : podcastInfo,
            'app-messages' : messages

        },
        methods:{
            async EffacerCompagne(){
                await this.$store.dispatch('deleteCompagne',{id:this.$route.params.id})
                this.$router.push('/Annonceur/')
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
            this.ageGroups = await this.$store.dispatch("getAgeGroup")
            this.educationLevels = await this.$store.dispatch("getEducation")

            console.log(this.ageGroups)
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