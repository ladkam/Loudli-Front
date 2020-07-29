<template>
    <v-app light :style="{background: $vuetify.theme.themes[theme].background}">
        <v-navigation-drawer
                v-if="$store.state.profileType=='announcer'&& $store.state.token"
                app
                mini-variant
                hide-overlay
                clipped
                left
                color="primary"
                dark
        >
           <!-- <v-list>
                <v-list-item class="mx-auto">
                    <v-list-item-avatar size=150>
                        <v-img :src="$store.state.profilePicture"></v-img>
                    </v-list-item-avatar>
                </v-list-item>

                <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title class="title"> {{$store.state.firstName}} {{$store.state.lastName}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>-->

<!--
            <v-divider></v-divider>
-->

            <v-list
                    nav
                    dense
            >
                <v-list-item link to="/announcer/search/" class="justify-center">
                    <v-list-item-icon>
                        <v-icon>fa-podcast</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Podcasts</v-list-item-title>
                </v-list-item>
                <v-list-item link to="/announcer/campaigns/">
                    <v-list-item-icon>
                        <v-icon>fa-bullhorn</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Campagnes</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-star</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Favoris</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <!--<v-navigation-drawer
                v-if="$store.state.profileType=='podcaster'"
                app
                clipped
                left
                color="primary"
                dark

        >
            <div color="primary" class="justify-center d-flex flex-column align-center pt-2" style="width: 100%;" flat>
                <v-avatar size=100>
                    <v-img :src="$store.state.profilePicture"></v-img>
                </v-avatar>
                <v-list-item-title link class="title white&#45;&#45;text"> {{$store.state.firstName}} {{$store.state.lastName}}</v-list-item-title>

            </div>

            <v-divider></v-divider>

            <v-list
                    nav
                    dense
            >
                <v-list-item link to="/podcaster/dashboard/">
                    <v-list-item-icon>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item>
                <v-list-item link to="/podcaster/campaigns/">
                    <v-list-item-icon>
                        <v-icon>fa-bullhorn</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Campagnes</v-list-item-title>
                </v-list-item>
                <v-list-item link to="/podcaster/podcasts/">
                    <v-list-item-icon>
                        <v-icon>fa-podcast</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Podcasts</v-list-item-title>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>-->
        <v-app-bar app
                   clipped-left
                   dark
                   elevation="0"
                   dense
        >
            <v-toolbar-title >
                <v-btn to="/" text> Loudli </v-btn>
            </v-toolbar-title >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>

            <v-spacer></v-spacer>
            <v-item-group  class="hidden-sm-and-down">
                <v-btn   text to="/FAQ/">
                    Aide ?
                </v-btn>
                <v-btn  text @click="redirectBlog">
                    Blog
                </v-btn>
                <v-btn  text v-if="$store.state.token"    @click="logout"> Déconnexion </v-btn>
                <v-btn  text v-if="!$store.state.token" active-class="bb" to="/login/"> Connexion </v-btn>
            </v-item-group>
        </v-app-bar>


        <!--<v-navigation-drawer
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
        </v-navigation-drawer>-->
        <v-content>
                <router-view></router-view>
        </v-content>



    </v-app>

</template>


<script>

    /*
        import footer from '@/components/footer'
    */


    export default {
        data: () => ({
            drawer: false,
            group: null,
            profile: 'podcaster',
            items: [
                { title: 'Dashboard', icon: 'fa-dashboard' },
                { title: 'Account', icon: 'fa-account' },
                { title: 'Admin', icon: 'fa-gavel' },
            ],
        }),
        components:
            {
                /*
                                'app-footer': footer
                */
            },
        methods:
            {
                redirectBlog() {
                    location.replace('https://www.loud.li/blog');
                },
                logout() {
                    this.$store.dispatch('logout')
                    this.$router.push('/login/')
                }
            },
        computed:{
            theme(){
                return (this.$vuetify.theme.dark) ? 'dark' : 'light'
            }
        },
        async mounted() {
            this.$store.commit('LoadInfo')
            this.$store.dispatch('refresh')
        }
    }

</script>

<style>



</style>


