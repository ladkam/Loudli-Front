<template>
        <v-card outlined style="width: 1000px" class="mx-auto mt-12">
            <div class="h2 text-center mt-2">
                Rejoignez Loudli !
            </div>
            <v-card-subtitle class="text-center mt-2">
                La platforme qui monétise l'audiance des podcasts
            </v-card-subtitle>

            <v-stepper v-model="step" class="elevation-0 mt-2">

                <v-stepper-header class="elevation-0">
                    <v-stepper-step  step="1">
                        Informations personnelles
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step  step="2">
                        Coordonnée
                    </v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step  step="3">
                        Avatar
                    </v-stepper-step>
                </v-stepper-header>

                <v-card class="mt-2 mx-auto"  flat>
                <v-stepper-content step="1" style="border: none;elevation: 0">

                    <h2 class="ml-3 mb-6 mt-0">
                        Identification
                    </h2>

                    <v-row class="justify-space-around align-center pa-0 ma-0" style="border-style: none" >
                    <v-col>
                            <v-select
                                    prepend-icon="mdi-account"
                                    v-model="formData.type"
                                    :items="['podcaster','announcer']"
                                    label="Type de compte"
                                    class="mb-0 pb-0 mx-0 px-0"
                                    outlined
                            ></v-select>
                    </v-col>
                    </v-row>


                    <v-alert
                            v-if="alert"
                            color="red"
                            dark
                            close-label="false"
                            dismissible="false"
                            dense
                            class="ml-4 mr-4">
                        cette adresse email est déjà utilisée
                    </v-alert>

                    <v-row class="justify-space-around align-center pa-0 ma-0" style="border-style: none" >
                    <v-col                                 class="mb-0 pb-0"
                    >
                        <v-text-field
                                label="Prénom"
                                prepend-icon="mdi-account"

                                class="mb-0 pb-0"
                                outlined
                                :error-messages="nameErrors"
                                type="text"
                                v-model="formData.name"
                        ></v-text-field>

                    </v-col>

                        <v-col                                 class="mb-0 pb-0"
                        >

                            <v-text-field
                                    label="Nom"
                                    prepend-icon="mdi-account"
                                    class="mb-0 pb-0"
                                    outlined
                                    required
                                    :error-messages="surnameErrors"
                                    type="surname"
                                    v-model="formData.surname"
                            ></v-text-field>


                        </v-col>

                    </v-row>

                    <v-row class="justify-space-around align-center pa-0 ma-0" style="border-style: none" >
                        <v-col                                 class="mb-0 pb-0">
                        <v-text-field
                                outlined
                                prepend-icon="mdi-email"
                                label="Email"
                                type="email"
                                class="mb-0 pb-0"
                                :error-messages="emailErrors"
                                @input="$v.formData.email.$touch()"
                                @blur="$v.formData.email.$touch()"
                                required
                                v-model="formData.email"
                        >

                        </v-text-field>
                            </v-col>
                    </v-row>

                    <v-row class="justify-space-around align-center pa-0 ma-0" style="border-style: none" >


                        <v-col>
                    <v-text-field
                            label="Mot de passe"
                            outlined
                            :error-messages="passwordErrors"
                            prepend-icon="mdi-lock"

                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword = !showPassword"
                            v-model="formData.password"
                            @input="$v.formData.password.$touch()"
                            @blur="$v.formData.password.$touch()"
                    ></v-text-field>

                        </v-col>

                        <v-col>


                        <v-text-field
                            label=" Confirmer le mot de passe"
                            prepend-icon="mdi-lock"

                            outlined
                            :type="showPasswordConfirm ? 'text' : 'password'"
                            :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPasswordConfirm = !showPasswordConfirm"
                            v-model="formData.confirmPassword"
                            :error-messages="passwordConfirmErrors"
                            @input="$v.formData.confirmPassword.$touch()"
                            @blur="$v.formData.confirmPassword.$touch()"
                    ></v-text-field>

                        </v-col>

                    </v-row>

                    <v-card-actions class="align-end justify-end">
                        <v-btn color="teal" elevation="0" :disabled="$v.$invalid || !formData.type" @click="step=2" class="pt-0 mt-0"  > Suivant <v-icon left>fa-arrow-right</v-icon></v-btn>
                    </v-card-actions>

                </v-stepper-content>

                    <v-stepper-content step="2">

                        <h2 class="ml-3 mb-5">
                            Coordonnées
                        </h2>



                        <v-row class="justify-space-around align-center pa-0 ma-0" style="border-style: none" >

                            <v-col>

                        <v-text-field
                    label="Compagnie (optionnel)"
                    prepend-icon="fa-building"
                    outlined
                    type="Compagnie"
                    v-model="formData.Compagnie"
            ></v-text-field>

                            </v-col>
                            <v-col>


        <v-text-field
                label="Téléphone (optionnel)"
                prepend-icon="mdi-phone"

                outlined
                v-model="formData.phone"
        ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row class="justify-space-around align-center pa-0 ma-0" style="border-style: none" >

                            <v-col>


                                <v-text-field
                                        prepend-icon="mdi-map"
                                        label="Adresse (optionnel)"
                                        outlined
                                        v-model="formData.street"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                            <v-row class="justify-space-around align-center pa-0 ma-0" style="border-style: none" >

<v-col>

                            <v-text-field
                label=" Ville (optionnel)"
                prepend-icon="mdi-city"

                outlined
                v-model="formData.city"
        ></v-text-field>
                                </v-col>
                                <v-col>



                                <v-text-field
                                        prepend-icon="mdi-earth"

                                        label="Pays (optionnel)"
                outlined
                v-model="formData.country"
        ></v-text-field>
                                </v-col>
                            </v-row>

                        <v-card-actions class="align-end justify-end">
                            <v-btn color="teal" elevation="0"  @click="step=step-1" class="pt-0 mt-0" text > retour <v-icon right>fa-register</v-icon></v-btn>
                            <v-btn color="teal" elevation="0"  @click="step=3" class="pt-0 mt-0"  > Suivant <v-icon left>fa-arrow-right</v-icon></v-btn>
                        </v-card-actions>

                    </v-stepper-content>

                    <v-stepper-content step="3">

                        <v-row justify="center" class="mt-0 pt-0">

                            <div>
                                <app-ImagePreview
                                        v-on:childToParent="setPicture"
                                        :defaultImage="defaultImage">
                                </app-ImagePreview>
                            </div>

                        </v-row>


                        <v-card-actions class="align-end justify-end">
                            <v-btn color="teal" elevation="0"  @click="step=step-1" class="pt-0 mt-0" text > retour <v-icon right>fa-register</v-icon></v-btn>
                            <v-btn color="teal" elevation="0" :disabled="enableRegistration" @click="signUp" class="pt-0 mt-0"> m'enregistrer  <v-icon right>mdi-account</v-icon></v-btn>
                        </v-card-actions>

                    </v-stepper-content>


                </v-card>

        </v-stepper>
        </v-card >




</template>

<script>
    import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
    import ImagePreview from "@/components/ImagePreview";
/*
    import _ from 'lodash';
*/
    export default {
        data() {
            return {
                alert:false,
                step: 1,
                tab: 0,
                showPassword: false,
                showPasswordConfirm: false,
                formData: {
                    phone:"",
                    type:"",
                    street:"",
                    city:"",
                    country:"",
                    email: "",
                    password: "",
                    name: "",
                    surname: "",
                    confirmPassword: "",
                    Compagnie: "",
                    profilePicture:{},
                }
            };
        },
        validations: {
            formData: {
                name:{required},
                surname:{required},
                email: {required, email},
                password: {
                    containsNumber: value => RegExp("\\d+").test(value),
                    containsCapital: value => RegExp("[A-Z]+").test(value),
                    containsLower: value => RegExp("[a-z]+").test(value),
                    containsSpecial: value => RegExp("[@#?+!&.;,]+").test(value),
                    minLength: minLength(10),
                    required
                },
                confirmPassword: {
                    sameAsPassword: sameAs('password'),
                    required
                }
            }
        },
        computed: {
            enableRegistration() {
                return !(this.formData.profilePicture.size>0)
            },
            type() {
                let types = ['podcaster', 'announcer']
                return types[this.tab]
            },
            nameErrors() {
                const errors = [];
                if (!this.$v.formData.name.$dirty) return errors;
                !this.$v.formData.name.required && errors.push("name is required");
                return errors;
            },
            surnameErrors() {
                const errors = [];
                if (!this.$v.formData.surname.$dirty) return errors;
                !this.$v.formData.surname.required && errors.push("last name is required");
                return errors;
            },
            emailErrors() {
                const errors = [];
                if (!this.$v.formData.email.$dirty) return errors;
                !this.$v.formData.email.email && errors.push("Must be valid e-mail");
                !this.$v.formData.email.required && errors.push("E-mail is required");
                return errors;
            },
            passwordConfirmErrors() {
                const errors = [];
                if (!this.$v.formData.confirmPassword.$dirty) return errors;
                !this.$v.formData.confirmPassword.sameAsPassword &&
                errors.push("must be the same as password");
                return errors;
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.formData.password.$dirty) return errors;
                !this.$v.formData.password.containsNumber &&
                errors.push("password must contain a number");
                !this.$v.formData.password.containsCapital &&
                errors.push("password must contain a capital letter");
                !this.$v.formData.password.containsLower &&
                errors.push("password must contain a lower case caracters");
                !this.$v.formData.password.containsSpecial &&
                errors.push("password must contain a special caracters (@#?+!&.;,)");
                !this.$v.formData.password.minLength &&
                errors.push("password must contain 10 caracters");
                return errors;
            },
            defaultImage() {
                return require('@/assets/default_podcast.png')
            },
        },
        components:{
            'app-ImagePreview':ImagePreview},
        methods: {
            async  signUp() {
                console.log(this.formData.profilePicture)
                let payload = this.formData
                let response = await this.$store.dispatch('register',payload)
                if(response=='registration ok'){
                    this.$store.dispatch('logout')
                    this.$router.push('/login/')
                }
                else
                {
                    this.step=1
                    this.alert=true
                }
            },
            setPicture(picture){
                this.formData.profilePicture = picture
            },
        }
    }
</script>