<template>
    <v-app style="background-color: #FAFAFA" >
        <v-container fluid>
            <v-content light>
                <template>
                    <v-card flat >
                        <v-toolbar flat color="primary" dark class="ma-0 pa-0" style="border-style: solid">
                            <v-toolbar-title>Messages</v-toolbar-title>
                        </v-toolbar>
                        <v-tabs vertical v-model="tab" style="justify-items: left;border-style: none" >
                            <v-tab
                                    right
                                    v-for="c in compaigns"
                                    class="d-flex"
                                    :key="c.id"
                                    active-class="none"
                                    >
                                <v-card
                                        flat
                                        width="100%"
                                        class="d-inline-flex flex-row justify-start align-center"

                                >
                                    <v-avatar color="blue" size="30" class="ml-0 mr-2"  style="justify-items: left;border-style: none">
                                        <span class="white&#45;&#45;" style="font-size:13px"> ML </span>
                                    </v-avatar>
                                    {{c.name}}
                                </v-card>

                            </v-tab>

                            <v-tab-item v-for="c in compaigns"
                                        class="test"
                                        :key="c.id"
                                        style="border-left: solid 0.5px lightgrey">
                                <v-card flat style="height: 65vh;" class="scroll" ref="messagesContainer">

                                <v-row flat
                                           justify="start"
                                           style="border-style: none"
                                    >
                                        <v-col cols="6" class="pa-0 ma-0">
                                            <v-row align="center"  justify="center">
                                                <v-col cols="10" >
                                                    <v-card
                                                            flat
                                                            rounded
                                                            light
                                                            tile
                                                            style="border-radius: 7%"
                                                            class="blue lighten-3 pa-0 ma-0"
                                                    >
                                                        <v-card-text class="mt-3 mb-2 pt-2 pb-0 pl-0 ml-3"                             style="border-style: none"
                                                        > <strong> Compagne:</strong> {{c.name}} </v-card-text>
                                                        <v-card-text class="mt-0 mb-2 pa-0 ml-3"> <strong> Type d'annonce:</strong> {{c.type}} </v-card-text>
                                                        <v-card-text style="border-style: none" class="mt-0 mb-3 pa-0 ml-3"> <strong> Date de début souhaitée </strong>
                                                            {{c.startDate}}
                                                        </v-card-text>
                                                        <v-card-text class="mt-0 mb-1 pa-0 ml-3"> <strong>Description:</strong> </v-card-text>
                                                        <v-card-text style="border-style: None" class="ml-3 pa-0 ma-0">
                                                            {{c.description}}
                                                        </v-card-text>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                <v-row
                                        flat
                                        :justify="$store.state.userid==m.sender?'end':'start'"
                                        style="border-style: none"
                                        class="mx-0 px-0 pt-0 mt-0 pb-0 mb-0"
                                        v-for="m in c.message_set"
                                        :key="m.id"
                                        dense
                                >
                                    <v-col cols="6" class="mx-0 px-0 pt-0 mt-0 pb-0 mb-0">
                                        <v-row align="center" class="mx-0 px-0 pt-0 mt-0 pb-0 mb-0">
                                            <v-col cols="10" style="border-style: none" class="mx-0 px-0 pt-0 mt-0 pb-0 mb-0">
                                                <v-card
                                                        flat
                                                        light
                                                        :color="$store.state.userid==m.sender?'blue':'grey'"
                                                        class="lighten-3 px-0 mx-0"
                                                        style="border-style: none"
                                                >
                                                    <v-card-text style="border-style: none" class="mt-0 mb-3 pb-3 pa-0 ml-3 px-0 mx-0">
                                                        {{m.text}}

                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                            <v-col cols="2">

                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                </v-card>

                                <v-row flat justify="start" class="ml-1 mr-1 mb-0 pb-0">
                                    <v-form style="width:100%;">
                                        <v-textarea dense v-model="message"  class="pb-0 mb-0" @keypress.enter="sendMessage"  outlined></v-textarea>
                                    </v-form>
                                </v-row>
                                <v-row justify="end" class="ml-1 mr-1 mt-0 pt-0 mb-2">
                                    <v-btn color="success" @click="sendMessage" flat style="border-style: none"> send </v-btn>
                                </v-row>
                            </v-tab-item>
                        </v-tabs>
                        </v-card>
                </template>
            </v-content>
        </v-container>
    </v-app>
</template>


<script>

    export default {
        data() {
            return {
                compaigns:[],
                message:'popo',
                currentCompaign:{},
                messages:[],
                tab:0
            }
        },
        methods: {
            scrollToEnd() {
                var container = document.querySelector(".scroll");
                var scrollHeight = container.scrollHeight;
                container.scrollTop = scrollHeight;
            },
            async sendMessage(){
                var container = this.$el.querySelector(".scroll");
                console.log(container.scrollHeight)
                let sentmessage = await this.$store.dispatch('sendMessage',{'text':this.message,'sender':this.$store.state.userid,'compaign':this.compaigns[this.tab].id})
                this.compaigns[this.tab].message_set.push(sentmessage)
                this.message=''
                this.scrollToEnd()
            }
        },
        mounted(){
            this.scrollToEnd();
        },
        updated() {
            this.scrollToEnd();
            console.log('updated');
        },
        async created() {
            this.compaigns = await this.$store.dispatch('getCompaigns')
            this.currentCompaign = this.compaigns[0]
        }
    }

</script>
<style>
   .bigclass {
       card-overflow-wrap : false
    }
   .scroll {
       overflow-y: scroll;
       overflow-x: hidden;
   }

</style>