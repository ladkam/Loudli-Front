<template>
    <v-app>
        <v-app-bar dense  elevation="1" text light class="ml-">
            <v-toolbar-title >
                <v-btn to="/" text> Loudli </v-btn>
            </v-toolbar-title>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
            <v-item-group v-if="$store.state.profileType=='podcaster'"  class="hidden-xs-only">
                <v-btn  text v-if="$store.state.token" to="/dashboard/" >
                    Dashboard
                </v-btn>
                <v-btn  text v-if="$store.state.token" to="/podcaster/podcasts/" >
                    mes podcasts
                </v-btn>
                <v-btn  text v-if="$store.state.token" to="/Messages/" >
                    Messages
                </v-btn>
                <v-btn text v-if="$store.state.token" class="active">
                    demandes
                </v-btn>
            </v-item-group>
            <v-item-group v-if="$store.state.profileType=='Announcer'"  class="hidden-xs-only">

                <v-btn  text v-if="$store.state.token" to="/Messages/" >
                    Messages
                </v-btn>
                <v-btn text v-if="$store.state.token" class="active">
                    demandes
                </v-btn>
            </v-item-group>
            <v-spacer></v-spacer>
            <v-item-group  class="hidden-sm-and-down">
                    <v-btn   text to="/FAQ/">
                        Aide ?
                    </v-btn>
                    <v-btn  text @click="redirectBlog">
                        Blog
                    </v-btn>
                    <v-btn  text v-if="$store.state.token"    @click="logout"> Déconnexion </v-btn>
                    <v-btn  text v-if="!$store.state.token" to="/login/"> Connexion </v-btn>
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
            >
                <v-list-item-title text>Menu</v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-group v-if="$store.state.profileType=='podcaster'" >
                    <v-list-item  text v-if="$store.state.token" to="/dashboard/" >
                        Dashboard
                    </v-list-item>
                    <v-list-item  text v-if="$store.state.token" to="/podcaster/podcasts/" >
                        Mes podcasts
                    </v-list-item>
                    <v-list-item text v-if="$store.state.token" class="active">
                        Demandes
                    </v-list-item>
                </v-list-item-group>
                <v-list-item-group v-model="group">
                    <v-list-item   text to="/FAQ/"> Aide ? </v-list-item>
                    <v-list-item text @click="redirectBlog"> Blog </v-list-item>
                    <v-list-item  text v-if="$store.state.token"    @click="logout"> Déconnexion </v-list-item>
                    <v-list-item  text v-if="!$store.state.token" to="/login/"> Connexion </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    <router-view></router-view>
    <app-footer></app-footer>
    </v-app>

</template>


<script>

    import footer from '@/components/footer'


    export default {
        data: () => ({
            drawer: false,
            group: null,
            profile:'podcaster'
        }),
        components:
            {
                'app-footer':footer},
        methods:
            {
                redirectBlog() {
                    location.replace('https://www.loud.li/blog');
                },
                logout() {
                    this.$store.dispatch('logout')
                    this.$router.push('/login/')
                }
            }
    }

</script>


