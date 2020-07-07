<template>

    <v-app style="background-color: #FAFAFA" >



        <v-container >
            <app-header></app-header>
            <v-content class="orange lighten-2">
                <v-card width="100%" height="100%" color="white" elevation="0">
                    <v-card-title>
                        <h1 class="mt-2"> Demander une annonce pour {{compagneName}}</h1>
                    </v-card-title>
                    <v-img
                            src="@/static/Podcast image.jpg"
                            class="ml-5"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="300px"
                            width="300px"
                    >
                    </v-img>
                    <v-card-text>
                        <v-form>
                            <v-text-field width="15px" outlined label="Sujet de la demande" v-model="sujet"></v-text-field>
                            <v-select outlined
                                      :items="items"
                                      label="Type d'annonce"
                                      v-model="type"
                            ></v-select>
                            <v-textarea outlined label="Sujet de la demande" v-model="text"></v-textarea>
                        </v-form>

                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="EnvoyerDemande"> Envoyer la demande </v-btn>
                    </v-card-actions>
                </v-card>

            </v-content>
        </v-container>
    </v-app>
</template>

<script>
    import header from "@/components/header";
    export default {
        data(){
            return{
                sujet:'',
                text:'',
                items:['placement','story telling'],
                type:''
            }
        },

        components: {
            'app-header': header},

        methods:{
            async EnvoyerDemande(){
                let payload ={
                    name : this.sujet,
                    annonceur : this.$store.state.userid,
                    podcast : this.$route.params.id,
                    Type:this.type,
                    status:'requested',
                    Requesttext:this.text,
                    compaign:this.$store.state.compaign.id
                };
                await this.$store.dispatch('EnvoyerDemande',payload)
                this.$router.push('/Annonceur/compagne/'+this.$store.state.compaign.id)


            }
        },
        computed : {
            compagneName()
            {return this.$store.state.compaign.name
            }
        },

    }
</script>.
