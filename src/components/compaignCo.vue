<template>
  <v-card color="#FAFAFA" flat class="ma-0 pa-0">
<!--    <v-toolbar dark color="primary" style="border-left: none" dense flat>
      <v-toolbar-title>{{ compaign.name }}</v-toolbar-title>
    </v-toolbar>-->
    <v-card flat
            width="100%"
      style="height: 72vh;width:100%;background-color: #FAFAFA;overflow-y: scroll;" class="pa-4 py-4 mb-2 mb-0 scroll"
    >

      <div
              class="px-0 mx-0"
              color="#FAFAFA"
              v-for="(message,index) in compaign.message_set"
              :key="index"
              style="width:100%;border-style: none"
      >
          <div class="text-center mx-auto overline mb-2 mt-2">{{
            convert2Date(message.sendDate)
          }}</div>
        <div
          style="width:100%;border-style: none"
          :class="'mt-1 pt-0  justify-center'"
        >

          <div>
            <div class="justify-center pt-0 mb-2 " style="width:100%">

              <div v-if="message.type=='Notification'"  class="justify-center d-flex flex-column justify-center align-center" style="border-style: none" >
                <div
                >
                  <span  style="font-size: 1.25rem;font-weight: 400; letter-spacing:  0.025rem;font-family: Roboto">
                    <v-icon small  right> fa-flag </v-icon>
                {{message.text}}
              </span>

                </div
                >

              </div>
            </div>
          </div>
          <!--notification-->
          <div v-if="message.type == 'Notification'">
<!--
            Choix de Dates
-->
            <div v-if="message.text == 'Date choisie'"

                 :class="'d-flex justify-'+placement(message)"
                 class="pb-0 mb-0"
                 min-width="400px"
            >
               <v-sheet
                  color="#FAFAFA"
                  v-if="message.text == 'Date choisie'"

                >
                  <v-card-subtitle
                    v-if="message.sender == $store.state.userid"
                    class="pa-0 ma-0 ml-2"
                    >Vous avez choisi cette date</v-card-subtitle
                  >
                  <v-card-subtitle
                    v-if="message.sender != $store.state.userid"
                    class="pa-0 ma-0 ml-2"
                  >
                    {{ names[message.sender]}} a validé la date
                    suivante</v-card-subtitle
                  >
                  <v-card
                    class="pa-2 justify-center pa-2"
                    :color="color(message)"
                  >
                    <v-card-title class="pa-0 ma-0">
                      Date de début de diffusion :
                    </v-card-title>
                    <span class="body-2 mt-2">
                      {{ compaign.startDateValidated }}
                    </span>
                  </v-card>
                </v-sheet>
            </div>
<!--
            choix d'épisodes
-->
            <div
                    v-if="message.text == 'Episodes choisis'"
                    :class="'mt-1 pt-0' +'d-inline-block pb-0 mb-0 d-flex justify-'+placement(message)"
                    width="100%"

            >

                <v-card
                  color="#FAFAFA"
                  v-if="message.text == 'Episodes choisis'"
                  max-width="40%"
                  flat
                >
                  <v-card-subtitle class="pa-0 ma-0 ml-2"
                    >l'annonce a été publiée sur ces épisodes</v-card-subtitle
                  >
                  <v-card
                    class="pa-2"
                    :color="color(message)"
                  >
                    <v-list                     :color="color(message)">
                      <v-card-title class="ma-0 pa-0">
                        Episodes :
                      </v-card-title>
                      <v-list-item
                              class="mt-2 body-2 mx-0 px-0"
                        :href="item.audio"
                        target="_blank"
                        v-for="(item,index) in compaign.ep"
                        :key="index"
                      >
                        <v-list-item-avatar tile>
                          <v-img :src="item.image"></v-img>
                        </v-list-item-avatar>
                          {{item.name}}

                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-card>
            </div>
          </div>
          </div>

        <div
                style="width:100%;border: none orange"
                :class="'mt-1 pt-0' +'pb-0 mb-0 d-flex justify-'+placement(message)"
        >
          <div v-if="message.type=='Creation'" :class="'d-flex flex-column align-center justify-'+message.type=='Creation'?'center':'start'" style="border-style: none">
          <span
                  v-if="
              (message.sender == $store.state.userid) &
                (compaign.status == 'Demande')
            "
                  class="Overline"
          >
       <v-card-subtitle
               v-if="message.sender == $store.state.userid"
               class="pa-0 ma-0"
       >Vous avez proposé une campagne</v-card-subtitle
       > </span
          >
            <span
                    v-if="
              (message.sender != $store.state.userid) &
                (compaign.status == 'Demande')
            "
                    class="Overline"
            >
        <v-card-subtitle
                class="pa-0 ma-0"
        >{{otherName}} vous propose une campagne</v-card-subtitle
        > </span
            >
          <v-card flat  align="start" color="#FAFAFA">
            <v-card
                    class="justify-center pa-4"
                    :elevation="4"
                    width="30vw"
            >
              <v-card-subtitle class="text-center pa-0 ma-0"
              >Nom de la campagne</v-card-subtitle
              >
              <v-card-title
                      class="text-center justify-center mt-2 pt-0 mb-0 pb-0"
              >
                <span class="text-center">{{ compaign.name }}</span>
              </v-card-title>
            <!--  <v-avatar size="30">
                <v-img :src="compaign.announcer.UserProfileInfo.profilePicture">

                </v-img>
              </v-avatar>
              <span class="body-2">
                proposé par {{compaign.announcer.UserProfileInfo.first_name}}
              </span>-->

              <h6 class="mt-2">Message de {{compaign.announcer.UserProfileInfo.first_name}}:</h6>
              <div
                      v-show="false"
                      class="body-2"
                      readonly
                      filled
                      fixed
                      outlined
                      label="Description de la compagne"
                      style="color: black"
              >
                {{ compaign.description }}
                <button @click="hide" style="color:dodgerblue">réduire</button>
              </div>
              <div
                      class="body-2"
                      v-show="true"
                      readonly
                      filled
                      fixed
                      outlined
                      label="Description de la compagne"
              >
                {{ compaign.description.slice(0, 150) + "..." }}
                <button @click="show" v-if="compaign.description.length>150" style="color:dodgerblue">suite</button>
              </div>

              <h6 class="mt-2">Détails</h6>

              <table>

                <tbody>
                <tr>
                  <th><v-icon left dark>mdi-clock</v-icon> Date de début </th>
                  <td>
                    {{compaign.startDate}}
                  </td>
                <tr>
                  <th> <v-icon dark >fa-mars</v-icon> <v-icon dark>fa-venus</v-icon>  Genre visé </th>
                  <td>
                    {{ compaign.targetGender }}
                  </td>
                </tr>
                <tr>
                  <th> <v-icon left dark>mdi-map</v-icon> Localisation </th>
                  <td>


                    <span v-for="(L,index) in compaign.country" :key="index">{{index==0?"":","}}{{L}}</span>
                    <br>
                    <span v-for="L in compaign.city" :key="L"> {{ L }}</span>
                  </td>

                </tr>
                </tbody>
              </table>




              <v-card-actions
                      v-if="
                (compaign.status == 'Demande') &
                  (compaign.actionFor == $store.state.userid)
              "
                      class="mt-2 mb-2 justify-center"
              >
                <v-btn text color="secondary" @click="nextStep"> Accepter</v-btn>
                <v-btn text > Refuser </v-btn>
              </v-card-actions>
            </v-card>
          </v-card>
        </div>


          <div color="#FAFAFA" v-if="message.type == 'Devis'" style="border-style: none" max-width="50%">
            <div
                    v-if="(compaign.actionFor == $store.state.userid) && message.proposition.status=='pending'"
                    class="Overline mx-auto"
            >
              <v-avatar size="10">
                <v-img
                :src="
                  otherAvatar"
                >

                </v-img>
              </v-avatar>
              vous as envoyé un devis
            </div>
            <div v-if="message.proposition.status!='pending'">
            <v-card-subtitle
              v-if="message.sender == $store.state.userid"
              class="pa-0 ma-0p"
              >Vous avez envoyé un devis</v-card-subtitle>
            <v-card-subtitle
              v-if="message.sender != $store.state.userid"
              class="pa-0 ma-0 ml-2"
              >{{  names[message.sender] }} vous a envoyé un
              devis</v-card-subtitle
            >
            </div>
            <v-card  :elevation="4" class="pa-4" >
              <div v-if="message.text">
                <h6> Message: </h6>
                <div class="body-2">
                  {{ message.text }}
                </div>
              </div>
              <h6 class="mt-2"> Devis</h6>
              <table >

                <tbody>
                  <tr>
                    <th>Nombre d'écoutes</th>
                    <td>
                      {{ numberWithSpaces(message.proposition.plays * 1000) }}
                    </td>
                  </tr>
                  <tr>
                    <th>Prix</th>
                    <td>{{ numberWithSpaces(message.proposition.price) }} €</td>
                  </tr>

                  <tr>
                    <th>Commission Loudli</th>
                    <td>
                      {{ numberWithSpaces(message.proposition.price * 0.15) }} €
                    </td>
                  </tr>
                  <tr>
                    <th>TVA</th>
                    <td>
                      {{
                        numberWithSpaces(message.proposition.price * 1.15 * 0.2)
                      }}
                      €
                    </td>
                  </tr>
                  <tr>
                    <th><strong>Total </strong></th>
                    <td>
                      <strong
                        >{{
                          numberWithSpaces(
                            message.proposition.price * 1.15 * 1.2
                          )
                        }}
                        €</strong
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
              <v-card-actions
                class="justify-center"
                v-if="
                  (message.proposition.status == 'pending') &
                    (compaign.actionFor == $store.state.userid)"
              >
                <v-btn text color="secondary" @click="nextStep"> accepter</v-btn>
                <v-btn text @click="alarmProposition = true"> Refuser </v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <div v-if="message.type == 'Notification' & message.text=='Pitch envoyé'" width="500px">
            <v-sheet color="#FAFAFA" v-if="message.type == 'Notification'">
              <v-card-subtitle
                v-if="message.sender == $store.state.userid"
                class="pa-0 ma-0 ml-2"
                >Vous avez envoyé des éléments de pitch</v-card-subtitle
              >
              <v-card-subtitle
                v-if="message.sender != $store.state.userid"
                class="pa-0 ma-0 ml-2"
                >{{  names[message.sender] }} a envoyé des éléments de
                pitch</v-card-subtitle
              >
              <v-card class="pa-4 justify-center justfy"
                      :elevation="4"
                      width="30vw"
              >
                <h6> Pitch </h6>
                <div class="body-2"
                      v-show="false">
                  {{ compaign.pitch}}
                  <button @click="hide" style="color:dodgerblue">réduire</button>
                </div>
                <div class="body-2"
                             v-show="true">
                  {{ compaign.pitch.slice(0,150) }}
                  <button @click="show" v-if="compaign.pitch.length>150" style="color:dodgerblue">suite</button>

                </div>
                <h6 class="mt-2"> Fichiers </h6>
                <div
                  v-for="(file, index) in compaign.attached_set"
                  :key="index"
                >
                  <a
                    class="pt-2 pl-0"
                    style="font-size:15px; font-family: 'Arial Unicode MS';text-decoration: underline;"
                    v-if="file.attachedFile"
                    @click="
                      downloadAttachement(
                        file.attachedFile,
                        file.attachedFileName
                      )
                    "
                  >
                    <v-icon> mdi-file</v-icon> {{ file.attachedFileName }}</a
                  >
                </div>
                <v-card-actions class="justify-center">
                  <v-btn
                    text
                    color="primary"
                    @click="diagRecord = true"
                    v-if="compaign.status == 'pitch envoyé'"
                  >
                    Envoyer un enregistrement
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-sheet>
          </div>

          <div md="6"
               v-if="message.type == 'Choix de date'"
               :class="'mt-1 pt-0' +'pb-0 mb-0 d-flex justify-'+placement(message)"
          >
            <v-sheet color="#FAFAFA"
                     v-if="message.type == 'Choix de date' "
                     :class="'mt-1 pt-0' +'pb-0 mb-0 d-flex flex-column justify-'+placement(message)"
            >
              <v-card-subtitle
                      v-if="message.sender == $store.state.userid"
                      class="pa-0 ma-0 ml-2"
              >Vous avez proposé des dates</v-card-subtitle
              >
              <v-card-subtitle
                      v-if="message.sender != $store.state.userid"
                      class="pa-0 ma-0 ml-2"
              >{{  names[message.sender] }} a proposé des dates de diffusion
                </v-card-subtitle
              >
              <v-card
                :color="color(message)"
                class="mx-auto justify-center mt-2 pa-2 d-flex flex-column"
                :elevation="4"
                width="100%"
                min-width="400px"
                style="border: none purple"
                outlined
              >
                <div
                     color="green"
                >
                  <div
                          v-if="message.date.status=='pending' & compaign.actionFor==$store.state.userid"

                          class="body-2"
                       :color="color(message)"
                       style="border: none green"
                  >
                    Selectionnez une date de début de diffusion de l'annonce sur le podcast
                  </div>
                  <v-card-title
                          v-else

                          class="ma-0 pa-0"
                       :color="color(message)"
                       style="border: none green"
                  >
                    Dates proposées:
                  </v-card-title>

                <v-btn-toggle
                        v-if="compaign.status=='Choix de date' && message.date.status=='pending'"
                  :background-color="color(message)"
                  v-model="chosenDate"
                >
                  <div                         :color="color(message)"
                  >
                    <v-btn

                      :value="date"
                      class="mt-2 ml-2 body-2"
                      v-for="(date,index) in message.date.dates"
                      :key="index"
                    >
                      {{ date }}
                      <br/>
                    </v-btn>
                  </div>
                </v-btn-toggle>
                  <v-list  v-else                   :color="color(message)">
                    <v-list-item
                            v-for="(date,index) in message.date.dates"
                            :key="(date,index)"
                    >
                     <li>
                       {{date}}
                     </li>
                    </v-list-item>
                  </v-list>

                </div>


                <v-card-actions
                        style="border-style: none;justify-self: center;width:100%"
                  class="mt-2 justify-center align-center"
                  justify="center"
                  align="center"
                  v-if="
                    (compaign.status == 'Choix de date') &
                      (message.date.status == 'pending') &
                      (compaign.actionFor == $store.state.userid)
                  "
                >
                  <v-btn
                    :disabled="!chosenDate"
                    @click="validateDate"
                    text
                    color="secondary"
                  >
                    envoyer
                  </v-btn>
                  <v-btn @click="diagComment = true" text color="black">
                    Demander d'autres dates
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-sheet>
          </div>

          <div md="6" v-if="message.type == 'Proposition de texte'">
            <div >
              <v-card-subtitle
                      v-if="message.sender == $store.state.userid"
                      class="pa-0 ma-0 ml-2"
              >Vous avez proposé un texte</v-card-subtitle
              >
              <v-card-subtitle
                      v-if="message.sender != $store.state.userid"
                      class="pa-0 ma-0 ml-2"
              >{{  names[message.sender] }} a proposé un
                texte</v-card-subtitle
              >
              <v-card
                      class="pa-4 pb-4 ml-2 justify-center"
                      :elevation="4"
                      max-width="50vh"
              >
                <div class="body-2">

                  <v-card-title class="pa-0 ma-0"> Proposition de texte </v-card-title>

                  <div class="body-2 pt2"
                         v-show="false">
                      {{ message.adtext.text}}
                      <button @click="hide" style="color:dodgerblue">réduire</button>
                    </div>
                    <div class="body-2 pt-2"
                         v-show="true">
                      {{ message.adtext.text.slice(0,150) }}
                      <button @click="show" v-if="message.adtext.text.length>150" style="color:dodgerblue">suite</button>

                    </div>
                    <v-card-actions class="justify-center">
                      <v-btn
                              text
                              color="primary"
                              @click="diagRecord = true"
                              v-if="compaign.status == 'pitch envoyé'"
                      >
                        Envoyer un enregistrement
                      </v-btn>
                    </v-card-actions>


                  <v-card-actions class="justify-center"
                                  v-if="
                    (compaign.status == 'Proposition de texte') &
                      (message.adtext.status == 'pending') &
                      (compaign.actionFor == $store.state.userid)
                  "
                  >
                    <v-btn @click="nextStep" text color="primary">
                      Valider
                    </v-btn>
                    <v-btn color="black" @click="diagComment = true" text>
                      Demander une autre
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-card>
            </div>
          </div>

          <div md="6" v-if="message.type == 'Enregistrement'">
            <div v-if="message.type == 'Enregistrement'">
              <v-card-subtitle
                v-if="message.sender == $store.state.userid"
                class="pa-0 ma-0 ml-2"
                >Vous avez proposé une annonce</v-card-subtitle
              >
              <v-card-subtitle
                v-if="message.sender != $store.state.userid"
                class="pa-0 ma-0 ml-2"
                >{{  names[message.sender] }} a proposé une
                annonce</v-card-subtitle
              >
              <v-card
                class="pa-4 pb-4 ml-2 justify-center"
                :elevation="4"
                width="100%"
              >
                <div class="body-2">

                  <v-card-title class="pa-0 ma-0"> Enregistrement </v-card-title>

                <vuetify-audio
                  flat
                  color="primary"
                  :file="message.audio.audioFile"
                  downloadable
                >
                </vuetify-audio>
                <v-card-actions class="justify-center"
                  v-if="
                    (compaign.status == 'Enregistrement') &
                      (message.audio.status == 'pending') &
                      (compaign.actionFor == $store.state.userid)
                  "
                >
                  <v-btn @click="nextStep" text color="primary">
                    Valider
                  </v-btn>
                  <v-btn color="black" @click="diagComment = true" text>
                    Demander une autre
                  </v-btn>
                </v-card-actions>
                </div>
              </v-card>
            </div>
          </div>

          <div md="6" v-if="message.type == 'text'">
            <v-card
              flat
              class="ml-2 justify-center"
              color="#FAFAFA"
              v-if="message.type == 'text'"
            >
              <v-card-subtitle
                v-if="message.sender == $store.state.userid"
                class="pa-0 ma-0"
                >Vous avez envoyé un message</v-card-subtitle
              >
              <v-card-subtitle
                v-if="message.sender != $store.state.userid"
                class="pa-0 ma-0"
              >
                {{  names[message.sender] }} a envoyé un
                message</v-card-subtitle
              >
              <v-card
                class="justify-center pa-4"
                :color="color(message)"

              >
                <pre class="body-2 text-wrap mb-0 pt-0">{{ message.text }} </pre>
              </v-card>
            </v-card>
          </div>

          <div md="6" v-if="message.type == 'Declined Notification'">
            <v-card
              flat
              class="ml-2 justify-center"
              color="#FAFAFA"
              v-if="message.type == 'Declined Notification'"
            >
              <v-card-subtitle
                v-if="message.sender == $store.state.userid"
                class="pa-0 ma-0 ml-2"
                >Vous avez décliné la proposition</v-card-subtitle
              >
              <v-card-subtitle
                v-if="message.sender != $store.state.userid"
                class="pa-0 ma-0 ml-2"
              >
                {{  names[message.sender] }} a décliné la
                proposition</v-card-subtitle
              >
              <v-card
                class="ml-2 justify-center pa-2"
                :color="color(message)"
              >
                <pre class="body-2 text-wrap">{{ message.text}} </pre>
              </v-card>
            </v-card>
          </div>

          <div v-if="message.type == 'En cours'"
               :class="'d-flex align-end justify-'+placement(message)"
               width="100%"
          >
              <v-card
                      color="#FAFAFA"
                      flat
              >
                <v-card-subtitle
                        v-if="message.sender == $store.state.userid"
                        class="pa-0 ma-0"
                >Mise à jour de l'avancement</v-card-subtitle
                >
                <v-card
                        class=" mx-auto"
                        width="400px"
                        :id="index"
                        style="border-style: solid"
                >
                  <div>

                    <Plotly  :data='[{
                    type: "indicator",
                    mode: "number+gauge+delta",
                    value: message.plays.number,
                    domain: { x: [0, 1], y: [0, 1] },
                    title: { text: "<b>Avancement</b>" },
                    delta: { reference: compaign.message_set[index-1].type=="En cours"?compaign.message_set[index-1].plays.number:0 },
                    gauge: {
                    shape: "bullet",
                    axis: { range: [null, compaign.plays*1.2],
                     xaxis: {"showgrid": false,
                    "zeroline": false,
                    "visible": false,}},
                    threshold: {
                    line: { color: "red", width: 3 },
                    thickness: 0.75,
                    value: compaign.plays,
                    title: { text: "Profit" }
                    },
                    /*steps: [
                    { range: [0, 150], color: "lightgray" },
                    { range: [150, 250], color: "gray" }
                    ]*/
                    }
                    }]'
                     :layout="layout" :display-mode-bar="false">
                    </Plotly>

                  </div>
                </v-card>
              </v-card>
        </div>
          <div v-if="message.text == 'Demande de cloture'"
               :class="'d-flex align-end justify-'+placement(message)"
               width="100%"
          >
            <v-card
                    color="#FAFAFA"
                    flat
                    class="pa-2"
            >
              <v-card-subtitle
                      v-if="message.sender == $store.state.userid"
                      class="pa-0 ma-0"
              >Evolution des écoutes</v-card-subtitle
              >
              <v-card
                      class="pa-2 mx-auto"
                      width="400px"
              >
                <div>
                  <Plotly
                          :data="[{
                    'x': x,
                  'y': y,
                  type: 'scatter',
                  line: {color:'#00796b'}
                  }]"
                           :layout = "{
                           title: 'Evolution des écoutes',
                           xaxis: {autorange: true,
                           type: 'date'},yaxis: {
                             autorange: true,
                             type: 'linear'
                           }
                  }"
                  >
                  </Plotly>
                </div>
              </v-card>
            </v-card>
          </div>
        </div>
      </div>

      <div class="py-12"  >
        <div class="justify-center pt-0 mb-2 mx-2"  style="width:100%">

          <div   class="justify-center d-flex flex-column justify-center align-center" style="border-style: none" >
            <div
            >
              <v-avatar v-if="compaign.actionFor==this.$store.state.userid" :size="40"
                ><v-img
                  :src="notification.img"
                >
                </v-img>
              </v-avatar>

              <v-icon small v-if="compaign.actionFor!=this.$store.state.userid">
                fa-hourglass

              </v-icon>

              <span style="font-family: Roboto;font-size:1rem;" class="font-weight-light">
                {{notification.text}}
              </span>

            </div
            >
            <v-btn
                    rounded
                    outlined
                    flat
                    color="secondary mt-2"
                    @click="notification.action()"
              v-if="
                (compaign.actionFor == $store.state.userid) & notification.show==true
              "
              class="overline"
            >
              {{notification.actionName}}
            </v-btn>
          </div>
          </div>
        </div>
    </v-card>

    <div class="mb-4">
      <div
        class="d-flex justify-center align-start mx-1"
      >
        <v-textarea
          placeholder="taper un message"
          row-height="10"
          no-resize
          outlined
          hide-details
          class="mx-2"
          rows="1"
          v-model="message"

        >
        </v-textarea>
        <div class=" flex-grow-0">
          <v-btn
            center
            style="border-style: none"

            sabled=""
            height="30"
            color="primary"
            @click="sendMessage"
          >
            Envoyer</v-btn
          >
        </div>
      </div>
    </div>
    <v-dialog
            v-model="alarmProposition"
            v-if="alarmProposition"
            class="pa-2 d-flex flex-column"
            max-width="800px"
    >
      <v-card class="pa-2">
        <v-row justify="center">
          <v-col>
            <div class="body-2 mt-2 mb-5">
              Veuillez fournir un devis à l'annonceur.
            </div>
            <!--
                                                                            <v-card-title class="mx-2 px-0"> Mon devis</v-card-title>


                                                  -->
            <v-text-field
                    outlined
                    label="Nombre d'écoutes de l'annonce en milliers"
                    v-model="proposition.plays"
                    class="mt-2"
                    append-icon="mdi-headphones"
            >
            </v-text-field>

            <v-text-field
                    outlined
                    label="Prix"
                    persistent-hint
                    :hint="
                'Le prix moyen sur loudli pour ce nombre d écoutes est ' +
                  numberWithSpaces(40 * proposition.plays) +
                  '€'
              "
                    v-model="proposition.price"
                    append-icon="fa-euro-sign"
            >
            </v-text-field>

            <v-textarea
                    hide-details
                    class="mt-2"
                    outlined
                    label="Message"
                    persistent-hint
                    v-model="proposition.comment"
                    append-icon="fa-mail"
            >
            </v-textarea>
          </v-col>

          <v-col>
            <v-card-title>Devis</v-card-title>
            <v-simple-table class="mb-3">
              <tbody>
              <tr>
                <th>Nombre d'écoutes</th>
                <td>{{ numberWithSpaces(proposition.plays * 1000) }}</td>
              </tr>
              <tr>
                <th>Prix</th>
                <td>{{ numberWithSpaces(proposition.price) }} €</td>
              </tr>

              <tr>
                <th>Commission Loudli</th>
                <td>{{ numberWithSpaces(proposition.price) * 0.15 }} €</td>
              </tr>
              <tr>
                <th>TVA</th>
                <td>
                  {{ numberWithSpaces(proposition.price) * 1.15 * 0.2 }} €
                </td>
              </tr>
              <tr>
                <th><strong>Total </strong></th>
                <td>
                  <strong
                  >{{
                    numberWithSpaces(proposition.price * 1.15 * 1.2)
                    }}
                    €</strong
                  >
                </td>
              </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
        <v-card-actions class="justify-end">
          <v-btn
                  color="primary"
                  @click="
              sendProposition({
                sender: $store.state.userid,
                type: 'Devis',
                text: proposition.comment,
                compaign: compaign.id,
                proposition: {
                  price: proposition.price,
                  plays: proposition.plays,
                  actionFor: compaign.announcer.id,
                  sender: $store.state.userid
                }
              })
            "
                  text
          >
            Envoyer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
            v-if="diagPitch"
            v-model="diagPitch"
            max-width="800px"
            class="pa-2 d-flex flex-column"
    >
      <v-card class="pa-4">
        <v-card-title class="pa-0 ma-0">
          Pitch
        </v-card-title>
        <div class="body-2 mt-2 mb-2">
          Afin d'aider {{ compaign.podcast.author.first_name }} à créer
          l'annonce publicitaire, veuiller fournir un pitch 200 mots ou un
          plaquette publicitaire.
        </div>

        <v-row class="pt-0 mt-0">
          <v-col>
            <v-textarea
                    v-model="pitch"
                    outlined
                    label="Message publicitaire"
                    @input="$v.pitch.$touch()"
                    :error-messages="pitchErrors"

            >
            </v-textarea>

            <v-file-input
                    style="width: 50%"
                    outlined
                    v-model="attachedFile"
                    label="Document"
                    class="mt-2"
                    :loading="fileLoading"
                    @change="$v.attachedFile.$touch()"
                    @click:clear="test"
                    :error-messages="fileErrors"
            >
            </v-file-input>

          </v-col>
        </v-row>

        <v-card-actions v-if="true" class="justify-end">
          <v-btn
                  right
                  color="primary"
                  :disabled="(!attachedFile && pitch.length==0) "
                  @click="
              sendPitch({
                pitch: compaign.pitch,
                sendFile: 1,
              })
            "
          >
            Envoyer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
            v-if="diagAdtext"
            v-model="diagAdtext"
            max-width="800px"
            class="pa-2 d-flex flex-column"
    >
      <v-card class="pa-4">
        <v-card-title class="pa-0 ma-0">
          Texte de l'annonce
        </v-card-title>
        <div class="body-2 mt-2 mb-2">
          Veuillez  fournir à {{ compaign.podcast.author.first_name }} le texte de l'annonce
          l'annonce publicitaire.
        </div>

        <v-row class="pt-0 mt-0">
          <v-col>
            <v-textarea
                    v-model="adText"
                    outlined
                    label="Texte de l'annonce"
            >
            </v-textarea>
          </v-col>
        </v-row>

        <v-card-actions v-if="true" class="justify-end">
          <v-btn
                  right
                  color="primary"
                  :disabled="( adText.length==0) "
                  @click="
           sendAdText({
                sender: $store.state.userid,
                type: 'Proposition de texte',
                text: adText,
                compaign: compaign.id,
                adtext: {
                  text: adText
                }
              })
            "
          >
            Envoyer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
            v-model="diagRecord"
            max-width="400"
            class="d-flex flex-column"
    >
      <v-card flat class="pa-4">
        <v-card-title class="pa-0 ma-0 mb-2"> Enregistrement </v-card-title>
        <div class="body-2 mb-2"
        >Veuillez charger l'annoncer audio qui vous avez l'intention de
          diffuser.</div
        >
        <v-file-input
                outlined
                v-model="audioFile"
                label="Annonce"
                accept="audio/*"
                class="mt-2"
                :loading="fileLoading"
        >
        </v-file-input>
        <v-card-actions class="justify-end">
          <v-btn right color="primary" @click="uploadAudioFile" :disabled="!audioFile">
            Proposer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
            v-model="diagDate"
            v-if="diagDate"
            max-width="700"
            class="pa-2 d-flex flex-column"
    >
      <v-card flat class="pa-2">
        <v-card-text class="body-2">
          Quelle dates de diffusion proposez-vous?
        </v-card-text>

        <v-row class="ml-4" no-gutters>
          <v-col cols="12" sm="6">
            <div>
              <v-date-picker
                      hint="maximum 5 values"
                      v-model="dates"
                      color="primary"
                      locale="fr"
                      multiple
                      dense
                      max="5"
                      :selected-items-text="dates.length + ' selectionées'"
              ></v-date-picker>
            </div>
            <small class="v-card__subtitle ml-0"> maximum 5 dates </small>
          </v-col>
          <v-col cols="12" sm="6" align="Center">
            <h3 class="title">
              Dates :
            </h3>

            <div class="ml-2 mt-2" v-for="(date,index) in dates" :key="index">
              <v-btn class="mt-2" color="primary" outlined>
                {{ date }}
              </v-btn>
            </div>
            <v-spacer></v-spacer>
          </v-col>
        </v-row>
        <v-card-actions class="justify-end align-end">
          <v-btn
                  right
                  color="primary"
                  @click="
              sendPropositionDate({
                date: { dates: dates },
                compaign: compaign.id,
                text: '',
                type: 'Choix de date',
                sender: $store.state.userid
              })
            "
          >
            Proposer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="diagOtherDates" v-if="diagOtherDates">
      <v-card>
        <v-textarea
                class="ml-3 mt-3"
                v-model="compaign.pitch"
                :disabled="this.compaign.status == 'Text sent'"
                outlined
                label="Message publicitaire"
                counter
        >
        </v-textarea>
      </v-card>
    </v-dialog>
    <v-dialog v-model="diagComment" v-if="diagComment"
              max-width="800px"
    >
      <v-card color="white" class="pa-4"
      >
        <span class="body-2">
          Dites à {{ compaign.podcast.author.first_name }} ce qu'il faut
          modifier :
        </span>
        <v-textarea
                class="mt-2"
                v-model="message"
                outlined
                label="Commentaire"
                counter
        >
        </v-textarea>
        <v-card-actions class="justify-end align-end">
          <v-btn right color="primary" @click="decline">
            Envoyer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="diagSelect"  v-if="diagSelect" max-width="800px">
      <v-card color="white" class="pa-4" outlined>
        <v-card-title class="pa-0 ma-0">
          Selection épisodes:
        </v-card-title>
        <div class="body-2 mb-4 mt-2">
          Ajouter les épisodes où l'annonce a été diffusée
        </div>
        <v-autocomplete
                class="mt-0"
                hide-details
                :items="episodes"
                hide-selected
                dense
                outlined
                label="Episodes"
                item-text="name"
                return-object
                clearable
                one-line
                @input="appendSelected"
        >
        </v-autocomplete>
        <v-card-title class="pa-0 ma-0 mt-2" v-if="selectedEpisodes.length > 0">
          Episodes :
        </v-card-title>
        <v-list>
          <v-list-item
                  v-for="(item, index) in selectedEpisodes"
                  :key="item.name"
          >
            <v-list-item-avatar tile>
              <v-img :src="item.image"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                      :href="item.audio"
                      target="_blank"
                      v-text="item.name"
              ></v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon @click="selectedEpisodes.splice(index, 1)"
              >mdi-close</v-icon
              >
            </v-list-item-icon>
          </v-list-item>
        </v-list>

        <v-card-actions class="justify-end">
          <v-btn text primary color="primary" @click="validateEpisodes">
            Envoyer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="diagAdvancement" v-if="diagAdvancement" max-width="500">
      <v-card class="pa-4">
        <v-card-title class="pa-0 ma-0 mt-2">
          Avancement
        </v-card-title>
        <div class="body-2 mt-2">
          Mettez à jour les nombre d'écoute des campagnes
        </div>

<!--        <v-text-field
                min="0"
                class="mt-2"
                @input="$v.advancement.$touch()"
                v-model="advancement"
                :placeholder="compaign.advancement"
                outlined
                label="écoutes de la campagne"
                type="number"
                hide-details
                :error-messages="advancementErrors"
        >
        </v-text-field>-->



        <v-slider
                v-model="advancement"
                class="align-center"
                :max="compaign.plays"
                :min="compaign.advancement"
                hide-details
        >
          <template v-slot:append>
            <v-text-field
                    v-model="advancement"
                    class="mt-0 pt-0 align-right"
                    hide-details
                    single-line
                    type="number"
                    :min="compaign.advancement"
                    right

            >
              <template v-slot:append>

              <div

                      class="mt-0 pt-0 body-2"
                      style="width: 80px"
              >
                {{' / '+compaign.plays}}
              </div>
              </template>
            </v-text-field>

          </template>
        </v-slider>
        <v-card-actions class="justify-end">
          <v-btn
                  v-if="advancement<compaign.plays"
                  text
                  color="primary"
                  @click="updateAdvancement(advancement)"
          >
            Mettre à jour
          </v-btn>
          <v-btn
                  v-if="advancement>=compaign.plays"
                  text
                  color="primary"
                  @click="endAdvancement(advancement)"
          >
            Mettre à jour & demander la cloture
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="diagEnd" v-if="diagEnd" max-width="500">
      <v-card class="pa-3">
        <v-card-title class="pa-0 ma-0">
          Cloture de compagne
        </v-card-title>
        <div class="body-2 mx auto mt-2">
          Si vous validez l'annonce le podcasteur sera payé et la campagne cloturée.
        </div>

        <v-card-actions class="justify-end">
          <v-btn
                  text
                  color="primary"
                  @click="nextStep()"
          >
            confirmer la cloture
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
/*
    import {axiosInstance} from '@/store'
*/
/*    import podcastInfo from "@/components/podcastInfo";
    import messages from "@/components/messages";*/

import { formatter } from "@/mixin/formatter";
import axios from "axios";
import {axiosInstance} from "@/store";
import {BulletChartPlugin} from '@syncfusion/ej2-vue-charts';
import { Plotly } from 'vue-plotly'

/*
import {_} from 'vue-underscore';
*/
/*
import { required } from "vuelidate/lib/validators";
*/



export default {
  data() {
    return {
      diagAdtext:false,
      adText:'',
      data:[{
        type: "indicator",
        mode: "number+gauge+delta",
        value: 220,
        domain: { x: [0, 1], y: [0, 1] },
        title: { text: "<b>Profit</b>" },
        delta: { reference: 200 },
        gauge: {
          shape: "bullet",
          axis: { range: [null, 300] },
          threshold: {
            line: { color: "red", width: 2 },
            thickness: 0.75,
            value: 280
          },
          steps: [
            { range: [0, 150], color: "lightgray" },
            { range: [150, 250], color: "gray" }
          ]
        }
      }],
      layout:{  autosize:false,  width: 350, height: 120, margin: {
          l: 0,
          r: 0,
          b: 10,
          t: 10,
          pad: 20,
          'xaxis': {
            'showgrid': false,
            'zeroline': false,
            'visible': false,
  },
        }, },
      compaigns: [],
      ads: [],
      dates: [],
      bullet:[
        {
          type: "indicator",
          mode: "number+gauge+delta",
          gauge: { shape: "bullet" },
          delta: { reference: 300 },
          value: 220,
          domain: { x: [0, 1], y: [0, 1] },
          title: { text: "Profit" }
        }
      ],
      wiatingFor: ["Demande"],
      statusList: [
        "Demande",
        "Devis",
        "Pitch",
        "Enregistrement",
        "Choix de date",
        "Selection episodes",
        "En cours",
        "Terminée"
      ],
      episodes: [],
      diagAdvancement: false,
      selectedEpisodes: [],
        pitch:'',
      advancement: 0,
      diagOtherDates: false,
      diagOtherDtext: "Pourriez vous me proposer d'autres dates ?",
      loadingCompaign: false,
      diagDate: false,
      diagRecord: false,
      diagComment: false,
      diagPitch: false,
      diagEnd:false,
      diagSelect: false,
      proposition: {
        price: 0,
        plays: 0,
        comment: "",
        compaign: ""
      },
      e1: 0,
      updated: false,
      message: "",
      alarmProposition: false,
      audioFile: {},
      audioFileName: {},
      tabNb: 0,
      chosenDate: "",
      price: "",
      fileLoading: false,
      attachedFile: '',
      attachedFileName: {},
      plays: [],
      step: 2,
      tab: ["Campagne", "Podcast", "Echanges", "Avancement"],
      icons: ["mdi-bullhorn", "mdi-podcast", "fa-comment", "fa-steps"],
      podcasts: [],
      ageGroups: [],
      educationLevels: [],
      status: "",
      items: [
        {
          text: "Dashboard",
          disabled: false,
          to: "/podcaster/dashboard/"
        },
        {
          text: "Campagnes",
          disabled: false,
          to: "/podcaster/campaigns/"
        }
      ]
    };
  },
  provide: {
    chart: [BulletChartPlugin]},
    validations: {
            advancement: {
              minValue: value => value > this.compaign.advancement,
            },
            pitch: {
                maxLength: value => value.split(' ').length<200,
            },
        attachedFile:{
                maxSize : value =>
                {
                  if( typeof value=="object"){
                    console.log(value=={})
                    return value.size < 10000000
                  }
                  else
                  {
                    return true
                  }
                }
        }

    },
  watch: {
     dates(dates) {
      if (dates.length > 5) {
        this.$nextTick(() => this.dates.pop());
      }
    },

    async compaign() {
      this.plays=this.playsFetch()
    },

  },
  props: ["compaign"],
  computed: {
    x(){
      let temp=[]
      let i=0
      if(this.plays){
      for (i = 0; i < this.plays.length; i++) {
        console.log('here',this.plays['x'])
        temp.push(this.plays[i]['x'].split('.')[0])
      }
      console.log('x',temp)
      }
      return temp
    },
    y(){
      let i=0

      let temp=[]
      if(this.plays) {
        for (i = 0; i < this.plays.length; i++) {
          temp.push(this.plays[i]['y'])
        }
      }
      console.log('y',temp)
        return temp
      },
    names(){
      let temp = {}
      temp[this.compaign.podcast.author.id]=this.compaign.podcast.author.first_name
      temp[this.compaign.announcer.id]= this.compaign.announcer.first_name
      return temp
    },
    otherAvatar(){
      return this.$store.state.userid==this.compaign.announcer.id?this.compaign.podcast.author.UserProfileInfo.profilePicture:this.compaign.announcer.UserProfileInfo.profilePicture
    },
    otherName(){
      return this.$store.state.userid==this.compaign.announcer.id?this.compaign.podcast.author.first_name:this.compaign.announcer.first_name
    },
    firstQuote(){
      return this.compaign.startedExchange==false

    },
    notification() {

      if(this.compaign.status=='Demande')
        if (this.compaign.actionFor != this.$store.state.userid)
        {
          return {'show':true,'text': 'En attente de la réponse du podcasteur','img':this.otherAvatar,'action':()=>{this.alarmProposition=true},'actionName':'Fournir un Devis'}
        }
          if(this.compaign.status=='Devis')
      {
        if (this.compaign.actionFor == this.$store.state.userid)
        {if(this.firstQuote)
        {
          return {'show':true,'text': 'Attends un devis','img':this.otherAvatar,'action':()=>{this.alarmProposition=true},'actionName':'Fournir un Devis'}
        }
        else
        {
          return {'show':false}
        }

        }
        else
          return {'show':true,'text': this.firstQuote?this.otherName+' va fournir un devis':" en l'attente de validation de devis",'img':this.otherAvatar}
      }

      if(this.compaign.status=='Proposition de texte')
      {
        if(this.compaign.podcast.author.id==this.$store.state.userid){
          if(this.$store.state.userid==this.compaign.actionFor)

        {
          return {'show':true,'text':"attends le texte de l'annonce",'img':this.otherAvatar,'action':()=>{this.diagAdtext=true},'actionName':'proposer un texte'}
        }

        else
        {
          return {'show':true,'text': "En attente de validation ",'img':this.otherAvatar}
        }
        }
        if(this.compaign.announcer.id==this.$store.state.userid & this.$store.state.userid!=this.compaign.actionFor)
        {
          return {'show':true,'text':this.otherName+" va fournir un texte d'annonce",'img':this.otherAvatar,'action':()=>{this.diagAdtext=true},'actionName':'proposer un texte'}
        }

      }
      if(this.compaign.status=='En cours') {
        if (this.$store.state.userid == this.compaign.actionFor) {

          return {
            'show': true,
            'text': this.otherName + " attends la mise à jour du nombre d'écoutes",
            'img': this.otherAvatar,
            'action': () => {
              this.diagAdvancement = true
            },
            'actionName': 'Mettre à jours les écoutes'
          }
        } else {
          return {
            'show': true,
            'text': this.otherName + "En attente de mise à jour de nombre d'écoute",
            'img': this.otherAvatar,
            'action': () => {
              this.diagAdvancement = true
            },
            'actionName': 'proposer des dates'
          }
        }
      }



      if(this.compaign.status=='Choix de date')
      {
        if(this.$store.state.userid==this.compaign.actionFor)
        {
          if(this.$store.state.profileType=='podcaster')
          {
            return {'show':true,'text': this.otherName+" attends les dates de diffusion de l'annonce",'img':this.otherAvatar,'action':()=>{this.diagDate=true},'actionName':'proposer des dates'}
          }

        }
        else
        {
          if(this.$store.state.profileType=='podcaster') {
            return {
              'show': false,
              'text': "En l'attente de validation",
              'img': this.otherAvatar
            }
          }
          else
            return {
              'show': false,
              'text': this.otherName + ' va vous proposer des dates de diffusion',
              'img': this.otherAvatar
            }

        }
        if(this.$store.state.userid!=this.compaign.actionFor)
        {
          if(this.$store.state.profileType=='podcaster')
          {
            return {'show':false,'text': this.otherName+' va repondre à votre propposition de dates de diffusion','img':this.otherAvatar}
          }
          else
          {
            return {'show':true,'text': this.otherName+' va vous proposer des dates de diffusion','img':this.otherAvatar}
          }
        }
      }
      if(this.compaign.status=='Pitch')
      {
        if (this.compaign.actionFor == this.$store.state.userid)
        {if(this.firstQuote)
        {
          return {'show':true,'text': this.otherName+' attends un pitch','img':this.otherAvatar,'action':()=>{this.diagPitch=true},'actionName':'Fournir un Pitch'}
        }
        else
        {
          return {'show':false}
        }

        }
        else
          return {'show':true,'text': 'va fournir un pitch','img':this.otherAvatar}
      }
      if(this.compaign.status=='Enregistrement')
      {
        if (this.$store.state.userid==this.compaign.podcast.author.id)
        {
          if (this.compaign.actionFor == this.$store.state.userid)
          {
            return {'show':true,'text': this.otherName+' attends un enregistrement','img':this.otherAvatar,'action':()=>{this.diagRecord=true},'actionName':'Envoyer un enregistrement'}
          }
          else
          {
            return {'show':false,'text': "En l'attente de validation",'img':this.otherAvatar}

          }
        }
        else {
          if (this.compaign.actionFor == this.$store.state.userid)
          {
            return {'show':false,'text': this.otherName+" attend votre validation",'img':this.otherAvatar}
          }
          return {'show':false,'text': "En l'attente d'enregitrement d'annonce",'img':this.otherAvatar}


        }}
      if(this.compaign.status=='Selection episodes')
      {
        if (this.compaign.actionFor == this.compaign.podcast.author.id)
        {
          if (this.$store.state.userid==this.compaign.podcast.author.id)
          {
            return {'show':true,'text': this.otherName+" attends la liste d'épisode où la campagne a été diffusé",'img':this.otherAvatar,'action':()=>{this.SelectEpisodesDiag()},'actionName':'Fournir liste'}
          }
          else
          {
            return {'show':true,'text': "L'annonce va être publié à partir de la date choisie "+ this.otherName+" va vous indiquer sur quels épisodes.",'img':this.otherAvatar}

          }
        }
        else {
          return 'nlanla'
        }}
      if(this.compaign.status=='Terminée' ) {

        if (this.$store.state.userid == this.compaign.actionFor) {
          return {
            'show': true,
            'text': 'Demande la cloture de la campagne',
            'img': this.otherAvatar,
            'action': () => {
              this.diagEnd=true
            },
            'actionName': 'Cloturer et  payer'
          }
        } else {
          return {'show': true, 'text': ' En attente de validation de la demande de cloture de la campagne', 'img': this.otherAvatar}

        }
      }
      else {
        return {}
      }

      },
      pitchErrors() {
          if (this.diagPitch==true){
          const errors = [];
          if (!this.$v.pitch.$dirty) return errors;
              !this.$v.pitch.maxLength && errors.push("Le pitch ne doit pas contenir plus de 200 mots");
          return errors;
          }
          return ''
      },
    advancementErrors(){
      const errors=[];
      if (!this.$v.pitch.$dirty) return errors;
      else{
        !this.$v.minValue && errors.push("Le nombre d'écoutes doit être supérieur à la valeur précédents");
        return errors;
      }
    },
      fileErrors() {
          if (this.diagPitch==true && ((typeof this.attachedFile)=="object")){
              const errors = [];
            if (!this.$v.attachedFile.$dirty) return errors;
            !this.$v.attachedFile.maxSize && errors.push("La taille du document ne doit pas dépasser 10 Mo");
              return errors;
          }
          return ''
      },
    steps() {
      let find = this.statusList.indexOf(this.compaign.status);
      return this.statusList.slice(find, find + 2);
    }
  },
  components: {
    VuetifyAudio: () => import("vuetify-audio"),
    Plotly

  },
  mixins: [formatter],
  methods: {
    async playsFetch(){
      let play = await this.$store.dispatch("getPlays", {id: this.compaign.id});
      this.plays = play
    },
      test(){
          this.attachedFile={}
      },
    appendSelected(target) {
      this.selectedEpisodes.push(target);
      target = [];
    },
    color(message) {
      return message.sender == this.$store.state.userid ? "white" : "grey lighten-3";
    },
    placement(message) {
        if(message.type=='Creation')
          if(this.compaign.status=='Demande')

            {
              return 'center'
            }
          else
            {
              return message.sender == this.$store.state.userid ? "end" : "start";
            }
        if(message.type=='Devis')
        {
          if(message.proposition.status=='pending')
          {
            return 'center'
          }
          else
          {
            return message.sender == this.$store.state.userid ? "end" : "start";
          }
        }
      if(message.type=='Enregistrement')
      {
        if(message.audio.status=='pending')
        {
          return 'center'
        }
        else
        {
          return message.sender == this.$store.state.userid ? "end" : "start";
        }
      }
      if(message.type=='Proposition de texte')
      {
        if(message.adtext.status=='pending')
        {
          return 'center'
        }
        else
        {
          return message.sender == this.$store.state.userid ? "end" : "start";
        }
      }
      if(message.type=='Choix de date')
      {
        if(message.date.status=='pending')
        {
          return 'center'
        }
        else
        {
          return message.sender == this.$store.state.userid ? "end" : "start";
        }
      }

       return message.sender == this.$store.state.userid ? "end" : "start";

    },
    async sendMessage() {
      let message = await this.$store.dispatch("sendMessage", {
        text: this.message,
        type: "text",
        compaign: this.compaign.id,
        sender: this.$store.state.userid
      });
      await this.$emit('addMessage',message)
      await this.$emit('updateCampaign');
      this.message=''
    },
    async SelectEpisodesDiag() {

      if (this.episodes.length == 0) {

        this.episodes = await this.$store.dispatch("getEpisodes", {
          id: this.compaign.podcast.id
       });

      }
      this.diagSelect = true;
    },
    async validateDate() {
      await this.$store.dispatch("nextStep", {
        id: this.compaign.id,
        date: this.chosenDate
      });
      await this.$emit('updateCampaign');


    },
    async validateEpisodes() {
      await this.$store.dispatch("nextStep", {
        id: this.compaign.id,
        episodes: this.selectedEpisodes
      });
      await this.$emit('updateCampaign');

    },

    async EffacerCompagne() {
      await this.$store.dispatch("deleteCompagne", { id: this.compaign.id });
      this.$router.push("/Annonceur/");
    },

    async updateAdvancement(payload) {
      await this.$store.dispatch("sendMessage", {
        plays:{ number : payload},
        type: "En cours",
        compaign: this.compaign.id,
        sender: this.$store.state.userid
      });
      await this.$emit('updateCampaign');


      this.diagAdvancement = false;
    },
    async endAdvancement(payload){
      await this.$store.dispatch("sendMessage", {
        plays:{ number : payload},
        type: "En cours",
        compaign: this.compaign.id,
        sender: this.$store.state.userid
      });
      await this.nextStep()

    },
    async updateCompagne(payload) {
      await this.$store.dispatch("updateCompagne", {
        id: this.compaign.id,
        data: payload
      });
      await this.$emit('updateCampaign');

    },
    async sendProposition(payload) {
      await this.$store.dispatch("sendMessage", payload);
      await this.$emit('updateCampaign');
      this.alarmProposition = false;
    },
    async sendAdText(payload) {
      await this.$store.dispatch("sendMessage", payload);
      await this.$emit('updateCampaign');
      this.diagAdtext = false;
    },
    async sendPropositionDate(payload) {
      await this.$store.dispatch("sendMessage", payload);
      await this.$emit('updateCampaign');

      this.diagDate = false;
    },
    async nextStep() {
      await this.$store.dispatch("nextStep", { id: this.compaign.id });
      await this.$emit('updateCampaign');

      this.diagSelect=false
    },
    async decline() {
      await this.$store.dispatch("decline", {
        id: this.compaign.id,
        comment: this.message
      });
      await this.$emit('updateCampaign');

      this.diagComment = false;
    },
    async uploadAudioFile() {
      this.fileLoading = true;
      let formData = new FormData();
      formData.append("audioFile", this.audioFile);
      formData.append("audioFileName", this.audioFileName);
      formData.append("sender", this.$store.state.userid);
      formData.append("text", "none");
      formData.append("type", "Enregistrement");
      formData.append("compaign", this.compaign.id);

      await this.$store.dispatch("sendMessage", formData);
      this.audioFile = {};
      this.audioFileName = {};

      this.fileLoading = false;
      await this.$emit('updateCampaign');

      this.diagRecord = false;
    },
    pickColor(s) {
      if (s == this.compaign.status) {
        return "primary";
      } else {
        return "light-grey";
      }
    },
    show(event) {
      event.target.parentElement.setAttribute("style", "display:None");
      event.target.parentElement.previousElementSibling.setAttribute(
        "style",
        "display:inline-block"
      );
    },
    async sendPitch(payload) {
      await this.$store.dispatch("nextStep", { id: this.compaign.id,pitch:this.pitch });

      if ((payload.sendFile == 1) & !!this.attachedFile) {
        console.log("here");
        this.compaign.attachedFiles = await this.$store.dispatch(
          "sendCompaignFile",
          {
            attachedFile: this.attachedFile,
            attachedFileName: this.attachedFile.name,
            compaign: this.compaign.id
          }
        );
      }
      this.diagPitch = false;
      await this.$emit('updateCampaign');
    },
    scrollToEnd() {
        if(this.compaign){
      var container = document.querySelector(".scroll");
      var scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
        }
    },
    hide(event) {
      event.target.parentElement.setAttribute("style", "display:None");
      console.log(
        event.target.parentElement.nextElementSibling.setAttribute(
          "style",
          "display:inline-block"
        )
      );
    },
    convert2Date(Date) {
      let d = Date.split(".")[0].replace("T", " ");
      return d;
    },
    async getCompaign(id) {
      console.log(id);
      let compagneData = await axiosInstance.get({
        url: "/Compaign/"+this.id.toString(),
      });
      this.compaign = compagneData.data;
    },
    async downloadAttachement(F, name) {
      /*            let Link=F.split('/')
                        let File = '/media/'+ Link[Link.length - 1]*/
      axios({
        url: F,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
      });
    }
  },
  async mounted() {
/*
    this.compaign = await this.$store.dispatch("GetCompagne", { id: this.id });
*/
/*
    await this.$emit('updateCampaign');
*/
  this.plays=this.playsFetch()


    this.scrollToEnd();


console.log('mmt')
  },
  async updated() {
    console.log('upd')
/*
    this.compaign = await this.$store.dispatch("GetCompagne", { id: this.id });
*/
/*
    await this.$emit('updateCampaign');
*/
    this.scrollToEnd();

  },

  async created() {
/*    this.ageGroups = await this.$store.dispatch("getAgeGroup");
    this.educationLevels = await this.$store.dispatch("getEducation");
    this.step = this.compaign.statusNum;
    console.log('loading caamp')
    console.log(this.id);
    this.compaign =
    this.loadingCompaign = true;
    this.scrollToEnd();*/
    console.log('created')
    this.scrollToEnd(),
    this.plays=this.playsFetch()


  }
};
</script>

<style scoped>


.scroll {
  overflow: scroll;
}

.divider {
  flex-grow: 1;
  border-bottom: 1px solid black;
  margin: 5px;
}

.inner-text {
  width: 100%;
  height: 100%;
}

.overlay{
  font-size: 5rem;
}

.inner-text--1 {
  display: flex;
  justify-content: center;
  margin-top: 85px;
  font-size: 20px;
  color: #060201;
  font-weight: bold;
  /*
    span { max-width: 100px }
*/
}
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 0.75rem;
  color: #444;
}

table {
  border: 2px solid #00796b;
  border-radius: 1.5px;
  font-size: 1rem;
}

th {
  background-color: #00796b;
  color: rgb(255, 255, 255);
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 20px;
  padding: 12px 12px;
}
</style>
