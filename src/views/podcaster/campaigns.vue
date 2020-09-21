<template>

        <v-card flat width="1000" class="mx-auto">
            <v-card-title>
                Mes campagnes
            </v-card-title>

            <v-data-table
                    :loading="campaigns"
                    loading-text="Chargement en cours..."
                    class="ml-4 mr-4"
                    @click:row="show"
                :headers="headers"
                style="border-style: none;elevation: 0"
                :items="campaigns"
            >
                <template v-slot:item.status="{ item }">
                    <div class="pa-2" >

                        <v-chip label tile outlined color="primary" class="pa-2">
                            {{item.status}}
                        </v-chip>
                    </div>

                </template>
                <template  v-slot:loading>
                    <v-progress-circular indeterminate></v-progress-circular>
                </template>

            </v-data-table>
        </v-card>


</template>

<script>


    export default {
        data() {
            return {
               campaigns:[],
                headers: [
                    {
                        text: 'Nom',
                        align: 'center',
                        sortable: true,
                        value: 'name',
                    },


                    {
                        text: 'status',
                        align: 'center',
                        sortable: true,
                        value: 'status',
                    },
                    {
                        text: 'podcast',
                        align: 'center',
                        sortable: true,
                        value: 'podcast.name',
                    },
                    {
                        text: 'Date de début demandée',
                        align: 'center',
                        sortable: true,
                        value: 'startDate',
                    },
                    {
                        text: 'Ecoutes',
                        align: 'center',
                        sortable: true,
                        value: 'advancement',
                    },
                    {
                        text: 'Objectif',
                        align: 'center',
                        sortable: true,
                        value: 'plays',
                    },

                ]
            };
        },
        components:{


        },
        methods:{
            async show(item){
                if (this.$store.state.profileType=='podcaster')
                {
                    this.$router.push('/podcaster/campaign/'+item.id)

                }
                else
                {
                    this.$router.push('/announcer/campaign/'+item.id)

                }



            },
            async EffacerCompagne(){
                await this.$store.dispatch('deleteCompagne',{id:this.$route.params.id})
                this.$router.push('/Annonceur/')
            },

        },
        async created(){
            this.campaigns =  await this.$store.dispatch('getCompaigns')
        }

    }
</script>