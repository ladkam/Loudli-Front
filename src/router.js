import VueRouter from 'vue-router'
import Vue from 'vue'

import home from './views/Home.vue'
import SearchResults from "@/views/announcer/SearchResults";
import Register from "@/views/Auth/register";
import Login from "@/views/Auth/Login";
import announcer from "@/views/announcer";
import newcompaign from "@/components/newCompaignDiag";
import campaignPodcaster from "@/views/podcaster/compaignoo";
import store from './store';
/*
import addPodcastToComp from "@/views/List_podcaster";
*/
import podcastInfo from "@/views/podcastInfo";
import podcaster from "@/views/podcaster";

import addPodcast from "@/views/podcaster/addPodcast"

/*
import addPodcastStep1 from "@/views/podcaster/addPodcast/addPodcastStep1";
*/
import PodcasterHome from "@/views/podcaster/podcaster";
import PodcasterPodcasts from  "@/views/podcaster/podcasts";
import requestCompaign from "@/views/announcer/requestCompaign";
/*
import messages from "@/views/messages";
*/
import notFound from "@/views/404"
import campaignAnnouncer from "@/views/announcer/compaign";

import campaigns from "@/views/announcer/campaigns"

Vue.use(VueRouter)

const Router = new VueRouter({mode:'history',routes:[
        { path: '/', component: home,name:'home' },
        { path: '/register/', component:  Register},
        { path: '/login/', component:  Login,name:'login', beforeEnter(to, from, next) {
                // check vuex store //
                if (store.state.token) {
                    next({
                        name: "Annonce" // back to safety route //
                    })

                } else {
                    next()
                    ;}}},

        { path: '/announcer/', component:  announcer,name:'Annonce',
            children:[
                { path: 'search', component:  SearchResults},
                { path: 'campaigns', component:  campaigns},
                { path: 'requestcampaign/:id', component:  requestCompaign},
                {path:'campaign/:id',component: campaignAnnouncer}
            ],
            async beforeEnter(to, from, next) {
                // check vuex store //
                if (store.state.token) {
                    await store.dispatch('getCompaigns')
                    next()
                } else {
                    next({
                        name: "login" // back to safety route //
                    })

                    ;}}},

        { path: '/podcaster/', component:  podcaster,
            children:[
                {path:'dashboard',component:PodcasterHome,name:'PodcasterHome'},
                {path:'podcasts',component:PodcasterPodcasts,name:'Podcasterdetails'},
                {path: 'Addpodcast', component:  addPodcast,name:'addPodcast'},
                { path: 'campaigns', component:  campaigns},
                {path:'campaign/:id',component: campaignPodcaster}


            ],
            async beforeEnter(to, from, next) {
                // check vuex store //
                if (store.state.token) {
                    next()
                } else {
                    next({
                        name: "login" // back to safety route //
                    });
                }}},

        { path: '/Annonceur/newcompaign/', component:  newcompaign, beforeEnter(to, from, next) {
                // check vuex store //
                if (store.state.token) {
                    next()
                } else {
                    next({
                        name: "login" // back to safety route //
                    })

                    ;}}},

        /*{ path: '/messages/', component:  messages, beforeEnter(to, from, next) {
                // check vuex store //
                if (store.state.token) {
                    next()
                } else {
                    next({
                        name: "login" // back to safety route //
                    })
                    ;}}},

        { path: '/campaigns/', component:  campaigns, beforeEnter(to, from, next) {
                // check vuex store //
                if (store.state.token) {
                    next()
                } else {
                    next({
                        name: "login" // back to safety route //
                    })

                    ;}}},*/

        { path: '/podcast/:id', component:  podcastInfo,
            async beforeEnter(to, from, next) {
                // check vuex store //
                if (store.state.token) {
                    if (!store.state.podcasts){
                        await store.dispatch('getPodcasts')
                    }
                    next()
                } else {
                    next({
                        name: "login" // back to safety route //
                    })
                    ;}}},
       /* { path: '/announcer/campaign/:id', component:  compaignAnnouncer,
            async beforeEnter(to, from, next) {
                // check vuex store //
                if (store.state.token) {
                    await store.dispatch('getPodcasts')
                    next()
                } else {
                    next({
                        name: "login" // back to safety route //
                    })
                    ;}}},
        { path: '/podcaster/campaign/:id', component:  compagne,
            async beforeEnter(to, from, next) {
                // check vuex store //
                if (store.state.token) {
                    next()
                } else {
                    next({
                        name: "login" // back to safety route //
                    })
                    ;}}},*/
        { path: '*', component: notFound }
    ]})

Router.beforeEach((to, from, next) => {

    if (!store.state.token){
        store.dispatch('tryAutoLogin')
        next()
    }
    else{
        next()}
}
)

export default Router