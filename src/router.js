import VueRouter from 'vue-router'
import Vue from 'vue'


import home from './views/Home.vue'
import SearchResults from "@/views/SearchResults";
import Register from "@/views/register";
import Login from "@/views/Login";
import announcer from "@/views/announcer";
import newcompaign from "@/components/newCompaignDiag";
import compagne from "@/views/compaign";
import store from './store';
import addPodcastToComp from "@/views/List_podcaster";
import podcastInfo from "@/views/podcastInfo";
import podcaster from "@/views/podcaster";
import addPodcast from "@/views/podcaster/addPodcast"
import addPodcastStep1 from "@/views/podcaster/addPodcast/addPodcastStep1";
import addPodcastStep2 from "@/views/podcaster/addPodcast/addPodcastStep2";
import PodcasterHome from "@/views/podcaster/podcaster";
import PodcasterPodcasts from  "@/views/podcaster/podcasts";
import requestCompaign from "@/views/requestCompaign";
import messages from "@/views/messages";
import notFound from "@/views/404"


Vue.use(VueRouter)

const Router = new VueRouter({mode:'history',routes:[
        { path: '/', component: home,name:'home' },
        { path: '/search', component:  SearchResults},
        { path: '/Annonceur/Register/', component:  Register,
            beforeEnter(to, from, next) {
                // check vuex store //
                if (store.state.token) {
                    next({
                        name: "Annonce" // back to safety route //
                    })

                } else {
                    next()
                    ;}}},
        { path: '/podcaster/Login/', component:  Login,name:'login', beforeEnter(to, from, next) {
                // check vuex store //
                if (store.state.token) {
                    next({
                        name: "Annonce" // back to safety route //
                    })

                } else {
                    next()
                    ;}}},

        { path: '/Annonceur/', component:  announcer,name:'Annonce',
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
        { path: '/podcaster', component:  podcaster,
            children:[
                {path:'dashboard',component:PodcasterHome,name:'PodcasterHome'},
                {path:'podcasts',component:PodcasterPodcasts,name:'Podcasterdetails',
                    children:[
                        {path: 'info', component:  addPodcastStep1,name:'addPodcastStep1'},
                        {path: 'connInfo', component:  addPodcastStep2,name:'addPodcastStep2'}
                        ]
                }
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
        {path: '/Podcaster/addPodcast', component:  addPodcast,name:'addPodcast',
            children:[
                {path: 'info', component:  addPodcastStep1,name:'addPodcastStep1'},
                {path: 'connInfo', component:  addPodcastStep2,name:'addPodcastStep2'}
            ],
            async beforeEnter(to, from, next) {
                // check vuex store //
                if (store.state.token) {
                    next()
                } else {
                    next({
                        name: "login" // back to safety route //
                    })
                    ;}}},
        { path: '/Annonceur/newcompaign/', component:  newcompaign, beforeEnter(to, from, next) {
                // check vuex store //
                if (store.state.token) {
                    next()
                } else {
                    next({
                        name: "login" // back to safety route //
                    })

                    ;}}},
        { path: '/requestcompaign/:id', component:  requestCompaign, beforeEnter(to, from, next) {
                // check vuex store //
                if (store.state.token) {
                    next()
                } else {
                    next({
                        name: "login" // back to safety route //
                    })

                    ;}}},
        { path: '/messages/', component:  messages, beforeEnter(to, from, next) {
                // check vuex store //
                if (store.state.token) {
                    next()
                } else {
                    next({
                        name: "login" // back to safety route //
                    })
                    ;}}},

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
        { path: '/Annonceur/compagne/:id', component:  addPodcastToComp,
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
        { path: '/annoncer/campaign/:id', component:  compagne,
            async beforeEnter(to, from, next) {
                // check vuex store //
                if (store.state.token) {
                    next()
                } else {
                    next({
                        name: "login" // back to safety route //
                    })
                    ;}}},
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