<template>
    <div>
    <div v-if="$store.state.compaigns.length==0 || loaded" class="display-0"> vous n'avez pas de compagne en cours actuellement , créer une nouvelle Compagne?</div>
    <v-container fluid class="px-auto mx-auto">
        <v-row style="{background-color: salmon}" >
            <v-col cols="12" md="3" v-for="c in $store.state.compaigns" :key="c.id" >
                <v-card elevation="0" shaped to="'/Annonceur/compagne/'+c.id">
                    <v-img
                            src="@/static/podcasts.png"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                    >
                        <v-card-title>{{c.name}}</v-card-title>
                    </v-img>
                    <v-card-text> Podcast about whatever</v-card-text>
                    <v-divider></v-divider>
                    <v-card-text> Podcast about whatever</v-card-text>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
    </div>
</template>


<script>
    export default {

        async mounted(){
            await this.$store.dispatch('getCompaigns')
        }}
</script>.