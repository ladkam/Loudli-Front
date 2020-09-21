<template>
    <v-card  class="mx-auto ma-2 pa-2 pb-8 mt-4"   width="90%" outlined  >


<!--
        <v-div class="h2">
            Mon Compte
        </v-div>-->
        <v-row  no-gutters class="mx-auto" >
            <v-col class="mx-auto justify-center" cols="2">

            <v-card-title class="mx-auto">
                Mon Profile
            </v-card-title>
                <div class="mx-auto justify-center">
                    <app-ImagePreview
                            class="mx-auto"
                            v-on:childToParent="setPicture"
                            :defaultImage="defaultImage">
                    </app-ImagePreview>
                </div>

            </v-col>

            <v-col>

                    <v-row class="align-center pa-0 ma-0">
                    <v-card-title> Information personnelles </v-card-title>
                        <v-divider></v-divider>
                    </v-row>
                    <v-row class="ma-0 pa-0">
                        <v-col cols="6">
                            <v-text-field
                                    label="Prénom"
                                    v-model="$store.state.first_name"
                                    :readonly="readOnlyfirst_name"
                                    dense
                                    :focus="readOnlyfirst_name"
                                    prepend-icon="mdi-account"
                                    auto
                                    hide-details
                                    :background-color="readOnlyfirst_name?'#f8fcfc':'white'"
                                    outlined
                                    :append-outer-icon="readOnlyfirst_name?'mdi-pencil':'mdi-check'"
                                    @click:append-outer="readOnlyfirst_name=!readOnlyfirst_name"
                            >
                                <template v-slot:append-outer>

                                    <v-icon @click="edit('readOnlyfirst_name','first_name')">
                                        {{readOnlyfirst_name?'mdi-pencil':'mdi-check'}}
                                    </v-icon>

                                </template>


                            </v-text-field>
                                </v-col>

                        <v-col cols="6">
                            <v-text-field

                                    v-model="$store.state.last_name"
                                    :readonly="readOnlylast_name"
                                    dense
                                    hide-details
                                    :focus="readOnlylast_name"
                                    prepend-icon="mdi-account"
                                    label="Nom"
                                    auto
                                    :background-color="readOnlylast_name?'#f8fcfc':'white'"
                                    outlined
                                    :append-outer-icon="readOnlylast_name?'mdi-pencil':'mdi-check'"
                                    @click:append-outer="readOnlylast_name=!readOnlylast_name"
                            >
                                <template v-slot:append-outer>

                                    <v-icon @click="edit('readOnlylast_name','last_name')">
                                        {{readOnlylast_name?'mdi-pencil':'mdi-check'}}
                                    </v-icon>

                                </template>


                            </v-text-field>

                        </v-col>
                            </v-row>

                    <v-row class="ma-0 pa-0">
                        <v-col>
                        <v-text-field

                                v-model="$store.state.username"
                                :readonly="true"
                                dense
                                hide-details
                                prepend-icon="mdi-email"
                                label="Email"
                                auto
                                :background-color="readOnlylast_name?'#f8fcfc':'white'"
                                outlined
                                :append-outer-icon="'mdi-lock'"
                        >
                        </v-text-field>
                        </v-col>

                        <v-col>
                            <v-text-field

                                    v-model="$store.state.phone"
                                    :readonly="readOnlyPhone"
                                    dense
                                    hide-details
                                    :focus="readOnlyPhone"
                                    prepend-icon="mdi-phone"
                                    label="Téléphone"
                                    auto
                                    :background-color="readOnlyPhone?'#f8fcfc':'white'"
                                    outlined
                                    :append-outer-icon="readOnlyPhone?'mdi-pencil':'mdi-check'"
                                    @click:append-outer="readOnlyPhone=!readOnlyPhone"
                            >
                                <template v-slot:append-outer>

                                    <v-icon @click="edit('readOnlyPhone','phone')">
                                        {{readOnlyPhone?'mdi-pencil':'mdi-check'}}
                                    </v-icon>

                                </template>


                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="align-center pa-0 ma-0">
                        <v-card-title> Compagnie </v-card-title>
                        <v-divider></v-divider>
                    </v-row>
                    <v-row class="ma-0 pa-0">
                        <v-col>
                            <v-text-field

                                    v-model="$store.state.company"
                                    :readonly="readOnlyCompany"
                                    dense
                                    hide-details
                                    :focus="readOnlyCompany"
                                    prepend-icon="fa-building"
                                    label="Compagnie"
                                    auto
                                    :background-color="readOnlyCompany?'#f8fcfc':'white'"
                                    outlined
                                    :append-outer-icon="readOnlyCompany?'mdi-pencil':'mdi-check'"
                                    @click:append-outer="readOnlyCompany=!readOnlyCompany"
                            >
                                <template v-slot:append-outer>

                                    <v-icon @click="edit('readOnlyPhone','phone')">
                                        {{readOnlyCompany?'mdi-pencil':'mdi-check'}}
                                    </v-icon>

                                </template>


                            </v-text-field>
                        </v-col>

                    </v-row>

                    <v-row class="ma-0 pa-0">

                        <v-col>

                            <v-text-field
                                    prepend-icon="mdi-map"
                                    label="Adresse"
                                    v-model="$store.state.street"
                                    :readonly="readOnlyStreet"
                                    dense
                                    hide-details
                                    :focus="readOnlyStreet"
                                    auto
                                    :background-color="readOnlyStreet?'#f8fcfc':'white'"
                                    outlined
                                    :append-outer-icon="readOnlyStreet?'mdi-pencil':'mdi-check'"
                                    @click:append-outer="readOnlyStreet=!readOnlyStreet"
                            >
                                <template v-slot:append-outer>

                                    <v-icon @click="edit('readOnlyStreet','street')">
                                        {{readOnlyStreet?'mdi-pencil':'mdi-check'}}
                                    </v-icon>

                                </template>


                            </v-text-field>

                        </v-col>
                    </v-row>

                    <v-row class="ma-0 pa-0">
                        <v-col cols="6">
                            <v-text-field

                                    v-model="$store.state.city"
                                    :readonly="readOnlyCity"
                                    dense
                                    hide-details
                                    prepend-icon="mdi-city"
                                    :focus="readOnlyCity"
                                    label="Ville"
                                    auto
                                    :background-color="readOnlyCity?'#f8fcfc':'white'"
                                    outlined
                                    :append-outer-icon="readOnlyCity?'mdi-pencil':'mdi-check'"
                                    @click:append-outer="readOnlyCity=!readOnlyCity"
                            >
                                <template v-slot:append-outer>

                                    <v-icon @click="edit('readOnlyCity','city')">
                                        {{readOnlyCity?'mdi-pencil':'mdi-check'}}
                                    </v-icon>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field
                                    v-model="$store.state.country"
                                    :readonly="readOnlyCountry"
                                    prepend-icon="mdi-earth"
                                    label="Pays"
                                    dense
                                    hide-details
                                    :focus="readOnlyCountry"
                                    auto
                                    :background-color="readOnlyCountry?'#f8fcfc':'white'"
                                    outlined
                                    :append-outer-icon="readOnlyCountry?'mdi-pencil':'mdi-check'"
                                    @click:append-outer="readOnlyCountry=!readOnlyCountry"
                            >
                                <template v-slot:append-outer>
                                    <v-icon @click="edit('readOnlyCountry','country')">
                                        {{readOnlyCountry?'mdi-pencil':'mdi-check'}}
                                    </v-icon>
                                </template>
                            </v-text-field>

                        </v-col>
                    </v-row>

            </v-col>
            </v-row>
            </v-card>


            <!--

                                        <v-row class="justify-start align-center" style="border-style: none">



                                            <v-col cols="9"                         class="pr-20" style="border-style: none"
                                            >
                                                <v-text-field
                                                        label="Prénom"
                                                        v-model="$store.state.first_name"
                                                        :readonly="readOnlyfirst_name"
                                                        dense
                                                        :focus="readOnlyfirst_name"
                                                        prepend-icon="mdi-account"
                                                        auto
                                                        hide-details
                                                        :background-color="readOnlyfirst_name?'#f8fcfc':'white'"
                                                        outlined
                                                        :append-outer-icon="readOnlyfirst_name?'mdi-pencil':'mdi-check'"
                                                        @click:append-outer="readOnlyfirst_name=!readOnlyfirst_name"
                                                >
                                                    <template v-slot:append-outer>

                                                        <v-icon @click="edit('readOnlyfirst_name','first_name')">
                                                            {{readOnlyfirst_name?'mdi-pencil':'mdi-check'}}
                                                        </v-icon>

                                                    </template>


                                                </v-text-field>

                                            </v-col>

                                        </v-row>
                                        <v-row class="justify-start align-center" style="border-style: none">




                                            <v-col cols="9"     class="pr-20" style="border-style: none"
                                            >
                                                <v-text-field

                                                        v-model="$store.state.last_name"
                                                        :readonly="readOnlylast_name"
                                                        dense
                                                        hide-details
                                                        :focus="readOnlylast_name"
                                                        prepend-icon="mdi-account"
                                                        label="Nom"
                                                        auto
                                                        :background-color="readOnlylast_name?'#f8fcfc':'white'"
                                                        outlined
                                                        :append-outer-icon="readOnlylast_name?'mdi-pencil':'mdi-check'"
                                                        @click:append-outer="readOnlylast_name=!readOnlylast_name"
                                                >
                                                    <template v-slot:append-outer>

                                                        <v-icon @click="edit('readOnlylast_name','last_name')">
                                                            {{readOnlylast_name?'mdi-pencil':'mdi-check'}}
                                                        </v-icon>

                                                    </template>


                                                </v-text-field>

                                            </v-col>

                                        </v-row>

                                        <v-row class="justify-start align-center" style="border-style: none">




                                            <v-col cols="9"  class="pr-20" style="border-style: none"
                                            >
                                                <v-text-field

                                                        v-model="$store.state.phone"
                                                        :readonly="readOnlyPhone"
                                                        dense
                                                        hide-details
                                                        :focus="readOnlyPhone"
                                                        prepend-icon="mdi-phone"
                                                        label="Téléphone"
                                                        auto
                                                        :background-color="readOnlyPhone?'#f8fcfc':'white'"
                                                        outlined
                                                        :append-outer-icon="readOnlyPhone?'mdi-pencil':'mdi-check'"
                                                        @click:append-outer="readOnlyPhone=!readOnlyPhone"
                                                >
                                                    <template v-slot:append-outer>

                                                        <v-icon @click="edit('readOnlyPhone','phone')">
                                                            {{readOnlyPhone?'mdi-pencil':'mdi-check'}}
                                                        </v-icon>

                                                    </template>


                                                </v-text-field>

                                            </v-col>

                                        </v-row>

                                    </v-col>

                                    <v-col cols="6" >
                                        <v-card-title class="mx-0 px-0" >
                                            Informations Professionelles
                                        </v-card-title>



                                        <v-row class="justify-start align-center" style="border-style: none">

                                            <v-col cols="9"
                                                   style="border-style: none"
                                            >
                                                <v-text-field

                                                        v-model="$store.state.company"
                                                        :readonly="readOnlyCompany"
                                                        dense
                                                        hide-details
                                                        :focus="readOnlyCompany"
                                                        prepend-icon="fa-building"
                                                        label="Compagnie"
                                                        auto
                                                        :background-color="readOnlyCompany?'#f8fcfc':'white'"
                                                        outlined
                                                        :append-outer-icon="readOnlyCompany?'mdi-pencil':'mdi-check'"
                                                        @click:append-outer="readOnlyCompany=!readOnlyCompany"
                                                >
                                                    <template v-slot:append-outer>

                                                        <v-icon @click="edit('readOnlyPhone','phone')">
                                                            {{readOnlyCompany?'mdi-pencil':'mdi-check'}}
                                                        </v-icon>

                                                    </template>


                                                </v-text-field>

                                            </v-col>

                                        </v-row>
                                        <v-row class="justify-start align-center" style="border-style: none">


                                            <v-col cols="9"
                                                   class="pr-20" style="border-style: none"
                                            >
                                                <v-text-field
                                                        prepend-icon="mdi-map"
                                                        label="Adresse"
                                                        v-model="$store.state.street"
                                                        :readonly="readOnlyStreet"
                                                        dense
                                                        hide-details
                                                        :focus="readOnlyStreet"
                                                        auto
                                                        :background-color="readOnlyStreet?'#f8fcfc':'white'"
                                                        outlined
                                                        :append-outer-icon="readOnlyStreet?'mdi-pencil':'mdi-check'"
                                                        @click:append-outer="readOnlyStreet=!readOnlyStreet"
                                                >
                                                    <template v-slot:append-outer>

                                                        <v-icon @click="edit('readOnlyStreet','street')">
                                                            {{readOnlyStreet?'mdi-pencil':'mdi-check'}}
                                                        </v-icon>

                                                    </template>


                                                </v-text-field>

                                            </v-col>
                                        </v-row>

                                        <v-row class="justify-start align-center" style="border-style: none">



                                            <v-col cols="9"
                                                   class="pr-20" style="border-style: none"
                                            >
                                                <v-text-field

                                                        v-model="$store.state.city"
                                                        :readonly="readOnlyCity"
                                                        dense
                                                        hide-details
                                                        prepend-icon="mdi-city"
                                                        :focus="readOnlyCity"
                                                        label="Ville"
                                                        auto
                                                        :background-color="readOnlyCity?'#f8fcfc':'white'"
                                                        outlined
                                                        :append-outer-icon="readOnlyCity?'mdi-pencil':'mdi-check'"
                                                        @click:append-outer="readOnlyCity=!readOnlyCity"
                                                >
                                                    <template v-slot:append-outer>

                                                        <v-icon @click="edit('readOnlyCity','city')">
                                                            {{readOnlyCity?'mdi-pencil':'mdi-check'}}
                                                        </v-icon>

                                                    </template>


                                                </v-text-field>

                                            </v-col>
                                        </v-row>
                                        <v-row class="justify-start align-center" style="border-style: none">

                                            <v-col cols="9"
                                                   class="pr-20" style="border-style: none"
                                            >
                                                <v-text-field

                                                        v-model="$store.state.country"
                                                        :readonly="readOnlyCountry"
                                                        prepend-icon="mdi-earth"
                                                        label="Pays"
                                                        dense
                                                        hide-details
                                                        :focus="readOnlyCountry"
                                                        auto
                                                        :background-color="readOnlyCountry?'#f8fcfc':'white'"
                                                        outlined
                                                        :append-outer-icon="readOnlyCountry?'mdi-pencil':'mdi-check'"
                                                        @click:append-outer="readOnlyCountry=!readOnlyCountry"
                                                >
                                                    <template v-slot:append-outer>

                                                        <v-icon @click="edit('readOnlyCountry','country')">
                                                            {{readOnlyCountry?'mdi-pencil':'mdi-check'}}
                                                        </v-icon>

                                                    </template>


                                                </v-text-field>

                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>-->
<!--
                </v-card>
-->
<!--
            </v-col>
-->





<!--
        </v-row>
-->




</template>

<script>
    import ImagePreview from "@/components/ImagePreview";

    export default {
        data() {
            return {
                alert: false,
                readOnlylast_name: true,
                readOnlyfirst_name: true,
                readOnlyCompany: true,
                readOnlyStreet: true,
                readOnlyCity: true,
                readOnlyCountry: true,
                readOnlyMail: true,
                readOnlyPhone: true,
                step: 1,
                defaultImage:{},
                tab: 0,
                showPassword: false,
                showPasswordConfirm: false,
                formData: {
                    email: "",
                    password: "",
                    name: "",
                    surname: "",
                    confirmPassword: "",
                    Compagnie: "",
                    profilePicture: {},
                }
            }
        },

        methods: {
            edit(readOnlyVariable, field) {

                if (!this.$data[readOnlyVariable]) {
                    let payload = {}
                    payload[field] = this.$store.state[field]
                    if ((field == 'first_name' || field == 'last_name' || field == 'username')) {
                        this.$store.dispatch('updateUser', payload)
                        this.$data[readOnlyVariable] = !this.$data[readOnlyVariable]
                    } else {
                        this.$store.dispatch('updateUserInfo', payload)
                        this.$data[readOnlyVariable] = !this.$data[readOnlyVariable]
                    }
                } else {
                    this.$data[readOnlyVariable] = !this.$data[readOnlyVariable]
                    console.log(this.$data[readOnlyVariable])
                }
            },
            async setPicture(picture) {
                await this.$store.dispatch('updateProfilePicture', {profilePicture: picture})
            },
        },
        components: {
            'app-ImagePreview': ImagePreview
        },
        created() {
            this.defaultImage = this.$store.state.profilePicture
        }
    }
</script>