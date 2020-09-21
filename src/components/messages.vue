<template>
                <v-card  class="d-flex flex-column justify-center" flat>
                    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>

                    <v-card else  class="scroller mr-4 ml-4 mb-0 pb-0" style="height: 60vh" outlined>
                        <v-list outlined style=";width:100%" class="mx-auto">
                            <template  v-for="(item) in messages" style="border: none blue;width:100%">
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
<!--                                    <v-list-item-avatar>
                                        <v-img :src="'https://api.ladamin.com'+item.sender.UserProfileInfo.profilePicture"></v-img>
                                    </v-list-item-avatar>-->
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
                                                v-model="message"  class="pa-0 mb-1 pb-0 offset-0 mx-4 mt-2"   outlined @click:append="pickFile"
                                                autofocus
                                    >

                                    </v-textarea>
                                    <input type="file" id="file" ref="file"  v-show="false"  @change="onFilePicked" />
                                    <v-row class="mx-3">
                                    <v-spacer></v-spacer>
                                        <v-btn color="primary"  @click="sendMessage" flat style="border : none red" > Envoyer</v-btn>
                                    </v-row>
                        </v-card>
</template>

<script>
    import {axios} from "@/store";
    export default {
        data() {
            return {
                loading:true,
                item:3,
                sentMessages:[],
                compaigns:[],
                message:'popo',
                fileName: '',
                fileUrl: '',
                file: '',
                tab:0,
                indexSelected:0,
                Dates:[],
                sending:false
            }
        },
        props:['compaign'],

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
                    formData.append('compaign',this.compaign.id)
                    this.sending=true
                    let sentmessage = await this.$store.dispatch('sendMessage',formData)
                    sentmessage['sender']={}
                    sentmessage.sender.first_name=this.$store.state.first_name
                    sentmessage.sender.last_name=this.$store.state.last_name
                    sentmessage.sender.UserProfileInfo=
                        {
                            first_name:this.$store.state.first_name,
                            last_name:this.$store.state.last_name,
                            company:this.$store.state.company,
                            profilePicture:this.$store.state.profilePicture.replace("https://api.ladamin.com",'')
                        }
                    this.sentMessages.push(sentmessage)
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
            messages(){
                return this.compaign.message_set.concat(this.sentMessages)
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
            this.loading=false
             }
    }

</script>
<style>
   .bigclass {
       card-overflow-wrap : false
    }
   .scroller {
       overflow-y: scroll;
   }
    .invisible{
        display: none;
    }
</style>