<template>

            <v-card  loading="loadingCompaign" class="mx-auto pa-2 " style=" width:100%;border-style: solid" flat>
                <v-card v-if="loading" class="d-flex align-center justify-center" flat>
                    <v-sheet>
                    <v-progress-circular  indeterminate size="500" class="align-self-center" color="primary"> </v-progress-circular>
                    <div class="text-center"> Chargement de vos messages </div>
                    </v-sheet>
                </v-card>
<!--
                <v-breadcrumbs class="pa-1 mb-2" :items="items" divider=">"></v-breadcrumbs>
-->
                            <v-card v-if="!loading"  class="d-flex mx-auto" height="90vh" style="border: solid 0.5px lightgrey" flat>
                                <v-card width="300" height="100%" class="ma-0" flat  style="border-right: solid 0.5px lightgrey;border-radius: 0">
                                    <v-toolbar color="primary" dark style="border: solid 0.5px lightgrey;margin: 0;padding: 0" flat class="ma-0 pa-0">
                                        <v-toolbar-title>Campagnes</v-toolbar-title>
                                    </v-toolbar>
                                    <v-list flat>
                                        <v-list-item-group
                                                v-model="model"
                                                color="primary"
                                                mandatory
                                    >
                                        <v-list-item v-for="(item) in orderedCompaigns"
                                                     :key="item.id"
                                                     style="border-bottom: solid 0.5px lightgrey"
                                                     @click="switchCamp(item.id)"
                                        >
                                            <v-list-item-avatar tile>
                                                <v-img :src="item.announcer.UserProfileInfo.profilePicture">
                                                </v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                            <v-list-item-title>
                                                {{item.name}}
                                                <v-avatar
                                                        v-if="item.unreadNotifications>0"
                                                        right
                                                        size="30"
                                                        style="color: white"
                                                        color="primary"
                                                >
                                                    {{item.unreadNotifications}}
                                                </v-avatar>
                                                <v-list-item-subtitle>{{convert2Date(item.message_set[item.message_set.length-1].sendDate)}}</v-list-item-subtitle>
                                            </v-list-item-title>
                                                <v-list-item-subtitle>{{item.message_set[item.message_set.length-1].text}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                            </v-list-item-group>
                                    </v-list>
                                </v-card>
                                <v-sheet width="100%" class="d-flex flex-column" style="border-radius: 0">
                                <v-toolbar  style="border: solid 0.5px lightgrey;margin: 0;padding: 0" flat class="ma-0 pa-0">
                                    <v-toolbar-title>{{this.compaigns[this.indexSelected].name}}</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-chip label color="secondary"> {{this.compaigns[this.indexSelected].status}} </v-chip>
                                </v-toolbar>
                                <compaign-co  :compaign="this.compaigns[this.indexSelected]" @updateCampaign="getCompaign" @addMessage="addMessage" :key="componentKey"></compaign-co>
                                </v-sheet>
                                </v-card>

<!--
                <span>{{orderDict}}</span>
-->




            </v-card>
</template>

<script>
import compaignCo from "@/components/compaignCo";
import _ from 'lodash';
import {formatter} from "@/mixin/formatter";

export default {
        data() {
            return {
                compaigns:[],
                compaign:{},
                model:0,
                orderedCompaigns:{},
                tempcomp:{},
                loading:false,
                updatedComp:{},
                indexSelected:0,
                componentKey:0,
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
        compaignCo:compaignCo
    },
    mixins: [formatter],
    computed:{
            id(){
                return this.compaigns[this.indexSelected].id
            },


        dictOrder(){
                let  dictOrder={}
                var i;
            for (i = 0; i < this.orderedCompaigns.length; i++) {
                dictOrder[this.compaigns[i].id] = i;
            }
            return dictOrder
        }
    },
    methods:{
            order(compaigns){
               return _.orderBy(compaigns, function(c) { return c.message_set[c.message_set.length-1]}, 'desc');
            },
            appendSelected(target){
                this.selectedEpisodes.push(target)
                target=[]
            },
        addMessage(message){
            this.compaigns[this.indexSelected].message_set.push(message)
            this.orderedCompaigns=_.orderBy(this.compaigns, function(c) { return c.message_set[c.message_set.length-1].id}, ['desc'])
            console.log(this.compaigns)
        },
        async switchCamp(id){
                console.log(id)

            this.indexSelected=this.dictOrder[id]
            this.updatedComp=this.compaigns[this.indexSelected]
            await this.$store.dispatch("postRead", { id: this.compaigns[this.indexSelected].id })
            this.compaigns[this.indexSelected].unreadNotifications=0
            this.orderedCompaigns=_.orderBy(this.compaigns, function(c) { return c.message_set[c.message_set.length-1].id}, 'desc')

        },
        async getCompaign() {
            let temp = await this.$store.dispatch("GetCompagne", { id: this.id })
            this.compaign =temp
            this.compaigns[this.indexSelected] = this.compaign
            this.orderedCompaigns=_.orderBy(this.compaigns, function(c) { return c.message_set[c.message_set.length-1].id}, 'desc')
            console.log(this.compaigns)
            this.componentKey=this.componentKey+1
        }
    },
    async created(){
            console.log('ici')
        this.loading=true
        this.compaigns = await this.$store.dispatch('getCompaigns')
        this.indexSelected=0
        this.orderedCompaigns=_.orderBy(this.compaigns, function(c) { return c.message_set[c.message_set.length-1].id}, 'desc')
        this.compaigns=this.orderedCompaigns
        await this.$store.dispatch("postRead", { id: this.compaigns[this.indexSelected].id })
        this.loading=false

        console.log('là')



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