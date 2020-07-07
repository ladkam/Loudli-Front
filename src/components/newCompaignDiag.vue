<template>
    <v-card width="100%" height="100%" color="white" outlined>
        <v-card-title>
            Créer une compagne
        </v-card-title>
                <v-form >
                    <v-card-text>
                        <v-text-field outlined
                                label="Nom"
                                type="text"
                                required
                                v-model="formData.name"
                        ></v-text-field>
                        <v-text-field outlined
                                      label="Date de début"
                                      type="date"
                                      required
                                      v-model="formData.date"
                        ></v-text-field>
                        <v-textarea outlined
                                      label="Description"
                                      type="text"
                                      required
                                      v-model="formData.description"
                        ></v-textarea>

                    </v-card-text>
                </v-form>
                <v-card-actions>
                    <v-btn color="success" @click="CreateCompaign"> créer la campagne </v-btn>
                </v-card-actions>
            </v-card>
</template>

<script>
    export default {
        data() {
            return {

                formData: {
                    name: ""
                }
            };
        },
        components: {

        },
        methods:{
            async CreateCompaign(){
                let Compaign = this.$store.dispatch('CreateCompaign',{name:this.formData.name})
                this.$emit('childToParent', Compaign)

            }
        }
    }
</script>.
