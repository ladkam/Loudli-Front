<template>
    <v-app>
        <v-app-bar dense flat text light class="ml-">
            <v-toolbar-title >
                <v-btn to="/" text> Loudli </v-btn>
            </v-toolbar-title>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
            <v-item-group v-if="$store.state.profileType=='podcaster'"  class="hidden-xs-only">
                <v-btn  text v-if="$store.state.token" to="/podcaster/dashboard/" >
                    Dashboard
                </v-btn>
                <v-btn  text v-if="$store.state.token" to="/podcaster/podcasts/" >
                    Podcasts
                </v-btn>
                <v-btn text v-if="$store.state.token" class="active" to="/Messages/">
                    Messages
                </v-btn>
                <v-btn text v-if="$store.state.token" class="active">
                    Demandes
                </v-btn>
            </v-item-group>
            <v-spacer></v-spacer>
            <v-item-group  class="hidden-sm-and-down">
                <v-item>
                    <v-btn  flat text to="/FAQ/">
                        Aide ?
                    </v-btn>
                </v-item>
                <v-item>
                <v-btn  text @click="redirectBlog">
                    Blog
                </v-btn>
            </v-item>
                <v-item>
                    <v-btn  text v-if="$store.state.token"    @click="logout"> Déconnexion </v-btn>
                </v-item>
                <v-item>
                    <v-btn  text v-if="!$store.state.token" to="/Annonceur/Login/"> Connexion </v-btn>
                </v-item>
            </v-item-group>
        </v-app-bar>

        <v-navigation-drawer
                v-model="drawer"
                absolute
                @click="drawer = !drawer"
                app
                temporary>
            <v-list
                    nav
                    dense
            >
                <v-list-item-group
                        v-model="group"
                >
                    <v-list-item>
                        <v-list-item-title>login</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>

                    <v-list-item>
                        <v-list-item-title>je suis podcasteur</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>

                    <v-list-item>
                        <v-list-item-title>aide ?</v-list-item-title>
                    </v-list-item>

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </v-app>
</template>


<script>

    export default {
        data: () => ({
            drawer: false,
            group: null,
            profile:'podcaster'
        }),
        methods:{
            redirectBlog(){
                location.replace('https://www.loud.li/blog');
            },
            logout(){
                this.$store.dispatch('logout').then(this.$router.push('/Annonceur/Login/'))
            },
            changeProfile(){
                this.$store.commit('switchType')

            }

        }
    }
</script>