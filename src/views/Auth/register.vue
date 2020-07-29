<template>
    <v-app style="background-color: #FAFAFA" >
        <v-content>

        <v-card v-if="step==1" width="400" class="mx-auto mt-2" flat outlined>
            <v-tabs
                    v-model="tab"
                    background-color="transparent"
                    color="basil"
                    grow
            >

                <v-tab
                        v-for="item in ['Podcaster','Announceur']"
                        :key="item"
                >
                    {{ item }}
                </v-tab>
                </v-tabs>
            <v-form>

                <v-container>
                    <v-row justify="center">
                <v-card-title>
                    <h1 class="mt-2">S'inscrire</h1>
                </v-card-title>
                    </v-row>
                    <v-row justify="center">
                        <v-avatar  size="150" outlined>
                            <v-img src="@/static/podcast-icon-19.jpg"></v-img>
                        </v-avatar>
                    </v-row>
                </v-container>

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

                    <v-text-field
                            label="Adresse mail"
                            outlined
                            type="email"
                            class="mr-6 ml-6"
                            :error-messages="emailErrors"
                            @input="$v.formData.email.$touch()"
                            @blur="$v.formData.email.$touch()"
                            required
                            v-model="formData.email"
                    ></v-text-field>
                    <v-text-field
                            label="Prénom"
                            outlined
                            class="mr-6 ml-6"
                            :error-messages="nameErrors"
                            type="text"
                            v-model="formData.name"
                    ></v-text-field>
                    <v-text-field
                            label="Nom"
                            outlined
                            class="mr-6 ml-6"
                            :error-messages="surnameErrors"
                            type="surname"
                            v-model="formData.surname"
                    ></v-text-field>
                    <v-text-field
                            label="Compagnie"
                            outlined
                            class="mr-6 ml-6"
                            type="Compagnie"
                            v-model="formData.Compagnie"
                    ></v-text-field>
                    <v-text-field
                            label="mot de passe"
                            outlined
                            class="mr-6 ml-6"
                            :error-messages="passwordErrors"
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword = !showPassword"
                            v-model="formData.password"
                            @input="$v.formData.password.$touch()"
                            @blur="$v.formData.password.$touch()"
                    ></v-text-field>

                    <v-text-field
                            label=" confirmer le mot de passe"
                            outlined
                            class="mr-6 ml-6 mb-0 pb-0"
                            :type="showPasswordConfirm ? 'text' : 'password'"
                            :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPasswordConfirm = !showPasswordConfirm"
                            v-model="formData.confirmPassword"
                            :error-messages="passwordConfirmErrors"
                            @input="$v.formData.confirmPassword.$touch()"
                            @blur="$v.formData.confirmPassword.$touch()"
                    ></v-text-field>

                <v-row class="pa-0 ma-0" style="border-style: none">
                    <v-btn color="success" :disabled="$v.$invalid" @click="step=2" class="mx-auto pt-0 mt-0 mb-2" width="350"  style="border-style: none"> suivant </v-btn>
                </v-row>

            </v-form>
        </v-card>

            <v-card
                    style="width:50vh;height:50vh"
                    v-else
                    class="mx-auto mt-2"
                    flat
                    outlined>
                <app-ImagePreview
                        v-on:childToParent="setPicture"
                        :defaultImage="defaultImage">
                </app-ImagePreview>                <v-row class="pa-0 ma-0" style="border-style: none">
                    <v-btn color="success" :disabled="$v.$invalid" @click="SignUp" class="mx-auto pt-0 mt-0 mb-2" width="350"  style="border-style: none"> m'enregistrer </v-btn>
                </v-row>
                <span>{{this.formData.profilePicture}}</span>
            </v-card>
            </v-content>
    </v-app>
</template>

<script>
    import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
    import ImagePreview from "@/components/ImagePreview";
    export default {
        data() {
            return {
                alert:false,
                step: 1,
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
                return require('@/assets/default_podcast.jpg')
            },
        },
        components:{
            'app-ImagePreview':ImagePreview},
        methods: {
            async  SignUp() {
                console.log(this.formData.profilePicture)
                let payload = this.formData
                payload['type']=this.type
                let response = await this.$store.dispatch('register',payload)
                if(response=='registration ok'){
                    this.$store.dispatch('logout')
                    this.$router.push('/login/')
                }
            },
            setPicture(picture){
                this.formData.profilePicture = picture
            },
        }
    }
</script>