<template>
    <v-app style="background-color: #FAFAFA" >
        <v-container fluid>
            <v-content light>
                    <v-card flat class="d-flex" style="height: 90vh;" outlined >
                            <v-card style="height: 100%;" class="ma-0 pa-0"  outlined justify="start" align="start" flat>
                                <v-toolbar  flat color="primary" dark class="ma-0 pa-0" style="border-bottom: solid grey 0.5px">
                                    <v-toolbar-title> Mes Messages</v-toolbar-title>
                                </v-toolbar>
                                <v-card class="scroller pa-0 ma-0 mb-2"  style="height:80vh;" flat >
                                <v-list dense three-line avatar width="400" >
                                    <v-list-item-group v-model="item" color="primary">
                                        <v-list-item
                                        v-for="(item,index) in compaigns"
                                        :key="index"
                                        @click="change(item,index)"
                                        >
                                            <v-list-item-avatar>
                                                <v-img :src="$store.state.profileType=='podcaster'?item.announcer.UserProfileInfo.profilePicture:item.podcast.author.UserProfileInfo.profilePicture"></v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content style="border-style: none">
                                                <v-row style="justify-content: space-between">
                                            <v-col>
                                                <v-list-item-title> {{item.name}} </v-list-item-title>
                                            </v-col>
                                            <v-col v-if="item.message_set.length>0" style="text-align:end">
                                        <v-list-item-subtitle >{{extractSendDate(item.message_set)}}</v-list-item-subtitle>
                                        </v-col>
                                        </v-row>
                                        <span v-if="item.message_set.length>0">
                                        <v-list-item-subtitle v-if="item.message_set" class="text-wrap" style="border-style: none;text-overflow: ellipsis "  v-html="item.message_set[item.message_set.length-1].sender.first_name+' - '+item.message_set[item.message_set.length-1].text"></v-list-item-subtitle>
                                    </span>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                            </v-list>
                                </v-card>
                            </v-card>
                        <v-card  style="height: 90vh;width:50%;border-left:none " class=" scroller grow ma-0 pa-0" outlined justify="start" align="start" flat>
<!--                            <v-toolbar  flat  light class="ma-0 pa-0" style="border-bottom: solid grey 0.5px">
                                <v-toolbar-title> Compagne : {{selectedCampaign.name}}</v-toolbar-title>
                            </v-toolbar>-->
                            <v-card class="scroller pa-0 ma-0 mb-2"  style="height:70vh;" flat >
                                <v-list v-if="selectedCampaign.message_set">
                                    <template  v-for="(item) in selectedCampaign.message_set">
                                        <v-subheader
                                                v-my-mounted-directive="item.sendDate" class="invisible"
                                        :key="item.id+extractDate(item.sendDate)[0]">
                                        <v-divider style="margin-left: 10px; margin-right: 10px"></v-divider>
                                        <span class="subtitle-2 mx-auto" style="text-align: center;align-self:center;border-style: none" >{{extractDate(item.sendDate)[0]}} </span>
                                        <v-divider style="margin-left: 10px; margin-right: 10px"></v-divider>
                                        </v-subheader>
                                        <v-list-item three-line
                                                :key="item.id"
                                        >
                                            <v-list-item-avatar>
                                                <v-img :src="'https://api.ladamin.com'+item.sender.UserProfileInfo.profilePicture"></v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title class="pb-5" v-html="item.sender.first_name+' '+item.sender.last_name+'.'+extractDate(item.sendDate)[1]"></v-list-item-title>
                                                <pre style="font-size:15px; font-family: 'Arial Unicode MS;';width: 100%;" class="pb-2 text-wrap">{{item.text}}</pre>
                                                <span v-if="item.attachedFile" class="subtitle-2">Piéce jointe:</span>
                                                <a  class="pt-2 pl-0"  style="font-size:15px; font-family: 'Arial Unicode MS';text-decoration: underline;" v-if="item.attachedFile" @click="downloadAttachement(item.attachedFile)"> <v-icon> mdi-file</v-icon>  {{item.attachedFileName}}</a>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </template>
                                    </v-list>
                            </v-card>
                            <v-row class="mx-2 mb-1" reverse v-if="this.sending" justify="end">
                                <v-progress-circular  indeterminate color="blue" size="15"></v-progress-circular>
                            </v-row>
                            <v-item-group class="mx-2 mb-0 pb-0">
                                <v-item>
                                    <v-card style="background-color: #EEEEEE" elevation="0.5" class="mx-2 pl-2 pa-0 pt-1 pb-2" height="100%" v-if="this.file" outlined>
                                        <div class="d-flex justify-space-between px-2" style="width: 100%">
                                            <span class="subtitle-2">{{this.fileName}}</span><v-icon small @click="deleteFile(fileName)">mdi-close</v-icon></div>
                                    </v-card>
                                </v-item>
                            </v-item-group>
                                    <v-textarea append-icon="mdi-attachment"  dense type="text" style="border : none red" height="100" hide-details
                                                v-model="message"  class="pa-0 mb-1 pb-0 offset-0 mx-3"   outlined @click:append="pickFile"
                                    autofocus ></v-textarea>
                                    <input type="file" id="file" ref="file"  v-show="false"  @change="onFilePicked" />
                                    <v-row class="mx-3">
                                    <v-spacer></v-spacer>
                                        <v-btn color="primary"  @click="sendMessage" flat style="border : none red" > Envoyer</v-btn>
                                    </v-row>
                        </v-card>
                    </v-card>
            </v-content>
        </v-container>
    </v-app>
</template>

<script>
    import {axiosInstance} from "@/store";
    export default {
        data() {
            return {
                item:3,
                compaigns:[],
                message:'popo',
                fileName: '',
                fileUrl: '',
                file: '',
                messages:[],
                tab:0,
                indexSelected:0,
                Dates:[],
                sending:false
            }
        },
        directives: {
            myMountedDirective:
                 {
                inserted(el, { value },vnode){
                    let d = value.split('T')[0]
                    if (vnode.context.Dates.indexOf(d) == -1) {
                        vnode.context.Dates.push(d)
                        el.className = "d-flex justify-center"
                    }
                }
            }
        },
        methods: {
            lastMessage(message_set)
            {

                return message_set[message_set.length-1]

            }
            ,
            extractSendDate(message_set){
                if(message_set){
                return this.extractDate(message_set[message_set.length-1].sendDate)[0]+this.extractDate(message_set[message_set.length-1].sendDate)[1]
                }
                return ' '
            },
            deleteFile(){
                this.fileName = ''
                this.fileUrl = ''
                this.file = ''
            },
            scrollToEnd() {
                var container = document.querySelector(".scroll");
                var scrollHeight = container.scrollHeight;
                container.scrollTop = scrollHeight;
            },
            extractDate(x){
                let d =x.split('T')
                let dd = d[0]
                let T = d[1].split(':').slice(0,2).join(':')
                return [dd,T]
            },
            onFilePicked (e) {
                const files = e.target.files
                if(files[0] !== undefined) {
                    this.fileName = files[0].name
                    if(this.fileName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.fileUrl = fr.result
                        this.file = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.fileName = ''
                    this.file = ''
                    this.fileUrl = ''
                }
            },
            async sendMessage(){
                if(this.file || this.message){
                    let formData = new FormData();
                    formData.append('attachedFile',this.file);
                    formData.append('attachedFileName',this.fileName);
                    formData.append('text',this.message);
                    formData.append('sender',this.$store.state.userid);
                    formData.append('compaign',this.compaigns[this.indexSelected].id)
                    this.sending=true
                    let sentmessage = await this.$store.dispatch('sendMessage',formData)
                    sentmessage['sender']={}
                    sentmessage.sender.first_name=this.$store.state.firstName
                    sentmessage.sender.last_name=this.$store.state.lastName
                    sentmessage.sender.UserProfileInfo=
                        {
                            first_name:this.$store.state.firstName,
                            last_name:this.$store.state.lastName,
                            company:this.$store.state.company,
                            profilePicture:this.$store.state.profilePicture.replace("https://api.ladamin.com",'')
                        }
                    this.compaigns[this.indexSelected].message_set.push(sentmessage)
                    this.message=''
                    this.deleteFile()
                    this.sending=false
                }
            },
            async downloadAttachement(F)
            {
                console.log(F)
               let Link=F.split('/')
                let File = '/media/'+ Link[Link.length - 1]
                console.log('clicked')
                axiosInstance({
                    url: File,
                    method: 'GET',
                    responseType: 'blob', // important
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'file.pdf');
                    document.body.appendChild(link);
                    link.click();
                });
            },
            change(c,index){
                this.indexSelected=index
                this.Dates =[]
            },
            pickFile () {
                this.$refs.file.click ()
            }

        },
        computed:{
            selectedCampaign()
            {
                return this.compaigns[this.indexSelected]
            }
        },

        mounted(){
            this.scrollToEnd();
        },
        updated() {
            this.scrollToEnd();
        },
        async created() {
            this.compaigns = await this.$store.dispatch('getCompaigns')
            console.log(this.selectedCampaign)
             }
    }

</script>
<style>
   .bigclass {
       card-overflow-wrap : false
    }
   .scroller {
       overflow: scroll;
   }
    .invisible{
        display: none;
    }
</style>