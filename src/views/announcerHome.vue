<!--
<template>
    <v-app style="background-color: #FAFAFA">
        <v-container >
            <v-content class="grey lighten-1" style="background-color: lightgray">
                <v-card flat height="800" >
                    <v-row class="ml-2 mr-2" align="center"  >
                        <v-card-title > Vos compagnes:</v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn text
                               prepend="mdi-plus"
                               @click="$router.push('/search/')"
                               justify="center"
                               height="100%" align="Center">
                            <v-icon dark right>mdi-plus</v-icon> lancer une nouvelle compagne </v-btn>
                    </v-row>

                <v-spacer vertical="false"></v-spacer>

                    <div v-if="$store.state.compaigns.length==0 || loaded" class="display-0 ml-5"> vous n'avez pas de compagne en cours actuellement , créer une nouvelle Compagne?</div>

            <v-container fluid class="px-auto mx-auto">
                <v-row style="{background-color: salmon}" >
                    <v-col cols="12" md="3" v-for="p in $store.state.compaigns" :key="p.id" >
                        <v-card elevation="0" :to="'/Annonceur/compagne/'+p.id">
                            <v-img
                                    src="@/static/podcasts.png"
                                    class="white&#45;&#45;text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    height="200px"
                            >
                                <v-card-title>{{p.name}}</v-card-title>
                            </v-img>
                            <v-card-text> Podcast about whatever</v-card-text>
                            <v-divider></v-divider>
                            <v-card-text> Podcast about whatever</v-card-text>

                        </v-card>
                    </v-col>
                </v-row>
                <v-dialog
                v-model="showDiag"
                max-width="400">
                    <app-newCompaignDiag v-on:childToParent="AddCompaign"></app-newCompaignDiag>
                </v-dialog>

            </v-container>
                <v-card-actions>
                </v-card-actions>
                </v-card>
        </v-content>
        </v-container>
    </v-app>
</template>

<script>
    import newCompaignDiag from "@/components/newCompaignDiag";

    export default {
        data() {
            return {
                loaded: false,
                showDiag:false,
                compaigns:[]
            };
        },
        components:{
            'app-newCompaignDiag' : newCompaignDiag
        },
        methods:
            {
                async AddCompaign(Compaign){
                    this.compaigns.push(Compaign)
                    console.log('added')
                    this.showDiag=false

                },
            },
        async created()
            {
                this.compaigns = await this.$store.dispatch('getCompaigns')
            }
    }
</script>


<style>


</style>
-->
