<template>
    <v-app style="background-color: #FAFAFA;">        <v-content>

        <v-card  width="400" style="height: fit-content" class="mx-auto mt-12 my-3" outlined flat>
                <v-container>
                    <v-row justify="center">
                <v-card-title>
                    <h1 justify="center" >Connexion</h1>
                </v-card-title>
                    </v-row>
<!--                    <v-row justify="center" mx-auto mt-12 mb-0>
                        <v-avatar  size="120" outlined>
                            <v-img src="@/static/podcast-icon-19.jpg"></v-img>
                        </v-avatar>
                    </v-row>-->

                </v-container>
                <v-alert
                        v-if="alert"
                        color="red"
                        dark
                        close-label="false"
                        dismissible
                        dense
                        class="ml-4 mr-4"
                >
                    Utilisateur ou mot de passe incorrect
                </v-alert>
                    <v-text-field
                            append-icon="mdi-account"
                            label="email"
                            required
                            outlined
                            v-model="formData.username"
                            class="ml-4 mr-4 mt-6"
                            hide-details
                    ></v-text-field>


                    <v-text-field
                            append-inner-icon="mdi-lock"
                            label="password"
                            outlined
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword = !showPassword"
                            class="ml-4 mr-4 mt-2"
                            v-model="formData.password"
                            hide-details
                    ></v-text-field>

                <v-btn  class="mx-auto col-12 px-2 mt-3" type="submit" color="primary" @click="signIn" style="display: block" width="90%"  shaped> Connexion </v-btn>
                <v-card-subtitle class="mx-auto col-12" style="text-align:center" > Pas de compte? <router-link class="font-weight-light text-center" to="/register/"> cliquer ici </router-link></v-card-subtitle>
        </v-card>
            </v-content>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                showPassword: false,
                formData: {
                    password: "",
                    username: "",
               },
                alert:false

            };
        },
        methods: {
            async signIn () {
                const credentials = {username: this.formData.username, password: this.formData.password}
                let login_attempt=await this.$store.dispatch('login',credentials)
                if (login_attempt == 'failed'){
                    this.alert=true
                }
                else if(this.$store.state.profileType=="announcer")
                {
                    this.$router.push('/announcer/search/')
                }
                else
                {
                    this.$router.push('/dashboard/')
                }

            }
        }
    }
</script>.


<style>

    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-size : auto;
        background-color: #FAFAFA;
        transform: scale(1.1);
    }
</style>