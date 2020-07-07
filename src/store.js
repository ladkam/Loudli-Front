import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from '@/router'

/*
import VueJwtDecode from 'vue-jwt-decode'
*/

import * as jwt_decode from 'jwt-decode';


const base = {
    baseURL: 'https://api.ladamin.com/',
    headers: {
        'Content-Type': 'application/json'},

    xhrFields: {
        withCredentials: true
    }
}

export const axiosInstance = axios.create(base);


const baselistennotes = {
    baseURL: 'https://listen-api.listennotes.com/api/v2/',
    headers: {
        // Set your Authorization to 'JWT', not Bearer!!!
        'Content-Type': 'application/json',
        'X-ListenAPI-Key': '4e1755f6cd57457596b9d3bb5aec44fc'
    }
};

export const axioslistennotes = axios.create(baselistennotes);


const arrayToObject=(array, keyField)=>{
    array.reduce((obj, item) => {
        obj[item[keyField]] = item
        return obj
    }, {})
}

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        podcasts: null,
        username:null,
        firstName:localStorage.getItem('firstName'),
        lastName:localStorage.getItem('lastName'),
        profileType:localStorage.getItem('profileType'),
        token:localStorage.getItem('authToken'),
        userid:localStorage.getItem('userid'),
        tokenExp:Math.max(localStorage.getItem('tokenExpTime')*1000-30000-Date.now(),1),
        refreshTokenExp:localStorage.getItem('refreshTokenExp'),
        profilePicture:null,
        intervalRefresh:null,
        company:null,
        compaigns:[],
        compaign:{},
        ads:{},
        searchPodcast:{},
        genres:{},
        newPodcast:{},
    },
    getters:{
        turn2Dict(context, payload) {
            context.state.podcasts = arrayToObject(payload, 'id')
        }
    },
    mutations: {
        LoadInfo(state) {
            state.username = localStorage.getItem('username')
            state.token = localStorage.getItem('authToken')
            state.userid = localStorage.getItem('userid')
            state.company = localStorage.getItem('company')
            state.profileType = localStorage.getItem('profileType')
            state.profilePicture = localStorage.getItem('profilePicture')
            state.firstName = localStorage.getItem('firstName')
            state.lastName = localStorage.getItem('lastName')
            state.refreshToken = localStorage.getItem('refreshToken')
            axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
        },
        switchType(state){
            if (state.profileType=='annoncer'){
                state.profileType='podcaster'
        }
            else{
                state.profileType='annoncer'
            }
        },
        deleteStateElement(state, payload) {
            state[payload.elment] = {}
        }
        ,
        loadPodcastData(context, payload) {
            context.state.podcasts = arrayToObject(payload, 'id')
        }
        ,
        clearAuthData(state) {
            state.podcasts = null,
                state.username = null,
                state.token = null,
                state.userid = null,
                state.compaigns = []
            console.log('cleared')
        },
        saveCompaign(state, payload) {
            state.compaigns = payload
        },
        loadCompaignData(state, payload) {
            state.compaign = payload
        },
        StoreInfo(state, payload) {
            state[payload.storeField] = payload.data.reduce((obj, item) => {
                obj[item[payload.idField]] = item
                return obj
            }, {})
        },
    }
    ,actions:{
        async refresh(context)
        {
            if(context.state.refreshTokenExp*1000<Date.now()+90000)
            {
                alert('Votre sesssion a expirée, veuillez vous reconnecter')
                context.dispatch('logout')
                router.push('/podcaster/Login/')
            }
            else
            {
                console.log('exepires in',context.state.tokenExp/1000)
                console.log('exepires refresh',context.state.refreshTokenExp/1000)
                var refreshToken = localStorage.getItem('refreshToken')
                let res = await axios.post('https://api.ladamin.com/api/token/refresh/',
                    {
                 refresh: refreshToken
                 });
                var decoded=jwt_decode(res.data.access)

            localStorage.setItem('authToken', res.data.access);
            localStorage.setItem('tokenExpTime', decoded.exp);
            axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access
            context.state.tokenExp = decoded.exp*1000-Date.now()

            setTimeout(() => {
                context.dispatch('refresh')
            },context.state.tokenExp-30000)
            }
        },

            async CreateCompaign(context,payload){

                let formData = new FormData();
                console.log(payload.profilePicture)

              /*  formData.append('announcer', context.state.userid);
                formData.append('startDate',payload.startDate);
                formData.append('name',payload.name);
                formData.append('description',payload.description);
                formData.append('type',payload.type);*/
/*              formData.append('countrylab',JSON.stringify(payload.countryLab));
                formData.append('citylab',JSON.stringify(payload.cityLab));
                formData.append('compaignPicture',payload.profilePicture)
                formData.append('targetGender',3)
                formData.append('educationLevellab',JSON.stringify(payload.educationLevelLab) );
                formData.append('ageGrouplab',JSON.stringify(payload.ageGroupLab));
                formData.append('interestslab',JSON.stringify(payload.interestLab));*/

                payload['announcer']=context.state.userid

                if(payload.podcast)
                {
                    formData.append('podcast',payload.podcast)
                }
                let compaign = await axiosInstance({
                    url: "/Compaign/",
                    method: "POST",
                    params: {},
                    data:payload/*,
                    transformRequest: [
                        function(data) {
                            const serializedData = []

                            for (const k in data) {
                                if (data[k]) {
                                    serializedData.push(`${k}=${encodeURIComponent(data[k])}`)
                                }
                            }

                            return serializedData.join('&')
                        }
                    ]*/
                });
                return compaign.data
            },
            async AcceptCampaign(context,payload){

                payload[status]='Acceptée'
                await axiosInstance({
                    url: "/Compaign/"+payload.id+"/",
                    method: "PUT",
                    params: {},
                    data:{
                        announcer:payload.announcer.id,
                        startDate:payload.startDate,
                        name:payload.name,
                        description:payload.description,
                        podcast:payload.podcast.id,
                        status:'Acceptée'
                    }
                });
            },
            async DeclineCampaign(context,payload){
                await axiosInstance({
                    url: "/Compaign/"+payload.id+"/",
                    method: "PUT",
                    params: {},
                    data:{
                        announcer:context.state.userid,
                        startDate:payload.startDate,
                        name:payload.name,
                        description:payload.description,
                        podcast:payload.podcast.id,
                        status:'Declined'
                    }
                });
            },
            async sendMessage(context,payload){
                let message = await axiosInstance({
                    url: "/Messages/",
                    method: "POST",
                    params: {},
                    data:payload
                });
                return message.data
            },
            async getMessages(){
                let message = await axiosInstance({
                    url: "/Messages/",
                    method: "GET",
                    params: {}
                });
                return message.data
            },
            async getAgeGroup(){
                let message = await axiosInstance({
                    url: "/AgeGroup/",
                    method: "GET",
                    params: {}
                });
                return message.data
            },
            async getCountries(){
                let message = await axiosInstance({
                    url: "/Country/",
                    method: "GET",
                    params: {}
                });
                return message.data
            },
            async getTags(){
                let message = await axiosInstance({
                    url: "/Tag/",
                    method: "GET",
                    params: {}
                });
                return message.data
            },
            async getCities(){
                let message = await axiosInstance({
                    url: "/City/",
                    method: "GET",
                    params: {}
                });
                return message.data
            },
            async getInterests(){
                let message = await axiosInstance({
                    url: "/Interest/",
                    method: "GET",
                    params: {}
                });
                return message.data
            },
            async getEducation(){
                let message = await axiosInstance({
                    url: "/Education/",
                    method: "GET",
                    params: {}
                });
                return message.data
            },

            async deleteCompagne(context,payload){
                await axiosInstance.delete('/Compaign/'+payload.id)
                await context.commit('deleteStateElement',{elment:'ads'})
                await context.commit('deleteStateElement',{elment:'compaign'})
                await context.commit('deleteStateElement',{elment:'ads'})
            },

            async register(context,payload) {
                try {
                let result = await axios.post('https://api.ladamin.com/auth/users/', {
                    'username': payload.email,
                    'email': payload.email,
                    'first_name':payload.name,
                    'last_name':payload.surname,
                    'password': payload.password});
               await context.dispatch('login',{'username': payload.email,'password': payload.password,'id':result.data.id,'type':payload.type});
               console.log('Login Done')
               await context.dispatch('savedata', {
                        'username': payload.name,
                        'password': payload.password,
                        'company': payload.Compagnie,
                        'first_name':payload.name,
                        'last_name':payload.surname,
                        'type':payload.type,
                        'profilePicture':payload.profilePicture
                    });
                return 'registration ok'
                }
                catch (e) {
                    console.log(e)
                    return 'Login exists'
                }
            },
            async savedata(context,payload){
                let id = localStorage.getItem('userid')
                let formData = new FormData();
                console.log(payload.profilePicture)
                formData.append('company', payload.company);
                formData.append('type',payload.type);
                formData.append('first_name',payload.first_name);
                formData.append('last_name',payload.last_name);
                formData.append('user',id);
                formData.append('profilePicture',payload.profilePicture)
                let userInfo = await axiosInstance({
                    url: "/usersInfo/",
                    method: "POST",
                    params: {},
                    data:formData
                }).catch((error)=>console.log(error.response))
                context.state.company=payload.company
                context.state.profilePicture=userInfo.profilePicture
                context.state.profileType=userInfo.type
            },
            async sendCompaignFile(context,payload){
                let formData = new FormData();
                console.log(payload.profilePicture)
                formData.append('attachedFile', payload.attachedFile);
                formData.append('attachedFileName', payload.attachedFileName);
                formData.append('compaign', payload.compaign);
                await axiosInstance({
                    url: "/CompaignFiles/",
                    method: "POST",
                    params: {},
                    data:formData
                })

            },
            async login(context,payload) {
                try {
                    let res = await axios.post('https://api.ladamin.com/api-token-auth/', {
                        username: payload.username,
                        password: payload.password});
                    var decoded=jwt_decode(res.data.access)
                    var refresh_decoded=jwt_decode(res.data.refresh)
                    console.log('info',decoded)
                    localStorage.setItem('refreshTokenExp', refresh_decoded.exp)
                    localStorage.setItem('authToken', res.data.access);
                    localStorage.setItem('refreshToken', res.data.refresh);
                    localStorage.setItem('username', decoded.email);
                    localStorage.setItem('firstName', decoded.first_name);
                    localStorage.setItem('lastName', decoded.last_name);
                    localStorage.setItem('tokenExpTime', decoded.exp);
                    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access
                    context.state.tokenExp = decoded.exp*1000-Date.now()
                    setTimeout(() => {
                        context.dispatch('refresh')
                    },context.state.tokenExp-30000)
                    localStorage.setItem('userid', decoded.user_id);
                    context.state.refreshTokenExp = refresh_decoded.exp
                    await context.dispatch('getUserInfo', payload)
                    await context.commit('LoadInfo');
                    return 'success'
                }
                catch (e) {
                    return 'failed'
                }
            },
            async tryAutoLogin (context) {
                const token = localStorage.getItem('authToken')
                context.stat.refreshTokenExp=localStorage.getItem('refreshTokenExp')
                if (!token)
                {
                    return
                }
                context.commit('LoadInfo')
                context.commit('refresh')

            },
            async getUserInfo(context){
                console.log('I am in getUserInfo')
                let userInfo = await axiosInstance({
                    url: "/usersInfo/",
                    method: "get",
                    params: {}
                }).catch((error)=>console.log(error.response))
                context.state.company=userInfo.data[0].company
                context.state.profilePicture=userInfo.data[0].profilePicture
                localStorage.setItem('company', userInfo.data[0].company);
                localStorage.setItem('profilePicture', userInfo.data[0].profilePicture);
                localStorage.setItem('profileType', userInfo.data[0].type);
                context.state.profileType=userInfo.data[0].type
                context.state.firstName=userInfo.data[0].user.first_name
                context.state.lastName=userInfo.data[0].user.last_name
            },
            logout(context){
                localStorage.clear()
                context.commit('clearAuthData')
            },
            async getCompaigns(context){
                let response = await axiosInstance({
                    url: "/Compaign/",
                    method: "get",
                    params: {}
                });
                context.commit('saveCompaign',response.data);
                return response.data
            },

            async GetCompagne(context,payload){
                let compagneData = await axiosInstance({
                        url: "/Compaign/"+payload.id.toString(),
                        method: "get"
                    });
                    context.commit('loadCompaignData',compagneData.data);
                    return compagneData.data
            },
            async getPodcasts(context){
                let podcasts = await axiosInstance({
                    url: "/podcasts/",
                    method: "get"
                });
                context.commit('StoreInfo',{storeField:'podcasts',data:podcasts.data,idField:'id'});
            },
            async getPodcast(context,payload){
                let podcast = await axiosInstance({
                    url: "/podcasts/"+(payload.id.toString())+'/',
                    method: "get"
                });
                return podcast.data
            },
            async EnvoyerDemande(context,payload){
                await axiosInstance({
                    url: "/ads/",
                    method: "post",
                    data:payload
                });
            },
            async getAds(context){
                let ads=await axiosInstance({
                    url: "/ads?"+'compaign='+context.state.compaign.id.toString(),
                    method: "get"});
                context.commit('StoreInfo',{storeField:'ads',data:ads.data,idField:'id'});
            },
            async getGenres(context) {
                const base = {
                    baseURL: 'https://listen-api.listennotes.com/api/v2/',
                    headers: {
                        // Set your Authorization to 'JWT', not Bearer!!!
                        'Content-Type': 'application/json',
                        'X-ListenAPI-Key': '4e1755f6cd57457596b9d3bb5aec44fc'
                    }
                };
                const axiosGenre = axios.create(base);
                let val = await axiosGenre({
                    url:'genres',
                    method: "get"
                })
                context.commit('StoreInfo',{storeField:'genres',data:val.data.genres,idField:'id'});
            },
            async createPodcast(context,payload){
                let podcast=await axiosInstance({
                    url:"/podcasts/",
                    method:"post",
                    data:payload
                       })
                return podcast.data.id
            },
            async CreateEpisodeStats(context,payload){
                try{let res = await axiosInstance({
                    url:"/episodestats/",
                    method:"post",
                    data:payload
                })
                    return res
                }
                catch(e){
                    return 'error'
                }
            },

            async CreateEpisode(context,payload){
                try{await axiosInstance({
                    url:"/episodes/",
                    method:"post",
                    data:payload
                })}
                catch(e){
                    console.log(e)
                }
            },
            async getPodcastEpisodes(context,payload)
            {
                let response = await axiosInstance({
                    url:"episodes/",
                    method:"post",
                    data:{'podcast':Number(payload.id)}
                })
                return response.data
            },
            async getEpisodeStats(context,payload){
                let podcastStat = await axiosInstance({
                    url: "episodestats/?podcast="+payload.id,
                    method: "get"
                })
                return podcastStat.data
            },
            async getPodcastStats(context,payload){
                let podcastStat = await axiosInstance({
                    url:"PodcastPlays?podcast="+payload.id,
                    method:"get"
                })
                return podcastStat.data
            },
            async UpdatePodcastEpisodes(context,payload){
                try {await axiosInstance({
                    url: "UpdatePodcastEpisodes/",
                    method: "post",
                    data:payload
                })}
                catch(e){
                    return 'Error'
                }
            },
            async deletePodcast(context,payload){
                await axiosInstance({
                    method:"delete",
                    url:"podcasts/"+payload.id
                })
            },
            async updatePodcast(context,payload){
                await axiosInstance({
                    method:"put",
                    url:"podcasts/"+payload.id+"/",
                    data:payload}
                )
            }
    }
}
)