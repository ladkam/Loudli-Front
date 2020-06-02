<template>

    <v-app>
        <app-header dark></app-header>
        <v-container>
            <v-content light>
                <v-card flat>
                    <v-card-title class="display-1"> Ajouter un podcast </v-card-title>
                    <v-card-text > renseigner les information à propos de votre podcast</v-card-text>
                    <v-Combobox
                            class="styled-input ml-4"
                            hint="saisisez votre podcast"
                            width="20px"
                            regular
                            filled
                            v-model="podcast"
                            :items="podcasts"
                            color="blue-grey lighten-2"
                            label="Nom du podcast"
                            item-text="title_original"
                            item-value="title_original"
                            @keypress="searchPodcast"
                            :search-input.sync="search"
                    >
                        <template v-slot:selection="data">
                            <div
                                    v-bind="data.attrs"
                                    :input-value="data.selected"
                                    @click="data.select"
                                    @click:close="remove(data.item)">
                                <v-avatar left>
                                    <v-img :src="data.item.thumbnail"></v-img>
                                </v-avatar>
                                {{ data.item.title_original }}
                            </div>
                        </template>
                        <template v-slot:item="data">
                            <template v-if="typeof data.item !== 'object'">
                                <v-list-item-content v-text="data.item"></v-list-item-content>
                            </template>
                            <template v-else>
                                <v-list-item-avatar>
                                    <img :src="data.item.thumbnail">
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-html="data.item.title_original"></v-list-item-title>
                                    <v-list-item-subtitle v-html="data.item.publisher_original"></v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                        </template>
                    </v-Combobox>
                    <v-text-field regular filled label="Editeur" v-model="podcast.publisher_original" class="ml-4 mr-4 styled-input"></v-text-field>
                    <v-text-field hint="saisisez votre podcast" regular filled label="genre" v-model="podcast.genre" class="ml-4 mr-4 styled-input"></v-text-field>
                    <v-textarea regular filled style="border-style: none" v-model="podcast.description_original" class="ml-4 mr-4" label="description">{{podcast}}</v-textarea>
                    <v-text-field type="number" style="border-style: none" v-model="podcast.duration" label="Durée moyenne" regular filled class=" ml-4 mr-4 small-input">{{podcast}}</v-text-field>
                    <v-card-actions>
                        <v-btn color="success" class="ml-2" @click="nextStep"> Suivant </v-btn>
                    </v-card-actions>



                </v-card>
            </v-content>
        </v-container>
    </v-app>
</template>


<script>
    import header from "@/components/header";
    import axios from 'axios'
    export default {
        data() {
            return {
                podcasts:[],
                host:['Acast','Anchor','Ausha'],
                search:'',
                count:0,
                loading:false,
                podcast:'',
                formData: {
                    name: ""
                }
            };
        },
        components: {
            'app-header': header
        },
        methods: {
            async searchPodcast() {
                const base = {
                    baseURL: 'https://listen-api.listennotes.com/api/v2/',
                    headers: {
                        // Set your Authorization to 'JWT', not Bearer!!!
                        'Content-Type': 'application/json',
                        'X-ListenAPI-Key': '4e1755f6cd57457596b9d3bb5aec44fc'
                    }
                };
                if(this.search.length>0)
                {
                    const axiosPod = axios.create(base);
                    let val = await axiosPod({
                        url: 'search?q=' + this.search + '&language=French&only_in=title&type=podcast',
                        method: "get"
                    })
                    this.podcasts = val.data.results
                    console.log(this.podcasts)
                }
            },
            createPodcast(){
                this.load()
                this.$store.dispatch('createPodcast',this.podcast);
            },
            load(){
                this.loading=!this.loading
            },
            nextStep(){
                this.$store.state.newPodcast=this.podcast;
                this.$router.push('/Podcaster/addPodcast/connInfo')
            }
        },
        async created(){

        }
    }
</script>

<style>
    .test_class{
        border-style: solid;
    }

    .styled-input {
        width: 40%;
    }
    .small-input {
        width: 20%;
    }

</style>