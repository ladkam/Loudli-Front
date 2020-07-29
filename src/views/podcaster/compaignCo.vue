<template>
  <v-card style="border: crimson;" width="70%" color="#FAFAFA">
    <v-toolbar dark color="primary" style="border-left: none" dense flat>
      <v-toolbar-title>{{ compaign.name }}</v-toolbar-title>
    </v-toolbar>
    <v-sheet
      style="overflow-y: scroll;height: 75vh;background-color: #FAFAFA"
      class="scroll mb-2"
    >
      <v-row
        style="width:100%"
        color="#FAFAFA"
        class="mx-3"
        :justify="
          compaign.announcer.id == $store.state.userid ? 'end' : 'start'
        "
      >
        <v-sheet align="start" color="#FAFAFA">
          <v-card-subtitle class="pa-0 ma-0 ml-2 mb-2">
            <!-- {{compaign.announcer.first_name}}-->
            Proposition de campagne
          </v-card-subtitle>
          <v-card
            class="ml-2 justify-center pa-2 mx-3"
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

            <v-card-title class="mb-0 pb-0"
              ><h6>Message de l'annonceur:</h6></v-card-title
            >

            <v-card-text
              v-show="false"
              v-model="compaign.description"
              readonly
              filled
              fixed
              outlined
              label="Description de la compagne"
            >
              {{ compaign.description }}
              <button @click="hide" style="color:dodgerblue">réduire</button>
            </v-card-text>
            <v-card-text
              class="my-0 py-0"
              v-show="true"
              v-model="compaign.description"
              readonly
              filled
              fixed
              outlined
              label="Description de la compagne"
            >
              {{ compaign.description.slice(0, 150) + "..." }}
              <button @click="show" style="color:dodgerblue">suite</button>
            </v-card-text>

            <v-card-title class="mb-0 pb-0"><h5>Détails:</h5></v-card-title>

            <v-card-text class="my-0 py-0 mt-2">
              <h6>Lien</h6>
              <a type="url" :href="compaign.urlProduit">
                {{ compaign.urlProduit }}
              </a>
            </v-card-text>
            <v-card-text class="my-0 py-0 mt-2">
              <h6>Genre ciblé</h6>
              {{ compaign.targetGender }}
            </v-card-text>

            <v-card-text class="my-0 py-0 mt-2">
              <h6>Localisations</h6>
              <div>
                Pays:
                <span v-for="L in compaign.country" :key="L">{{ L }}</span>
              </div>
              <div>
                Villes:<span v-for="L in compaign.city" :key="L">{{ L }}</span>
              </div>
            </v-card-text>

            <v-card-actions
              v-if="
                (compaign.status == 'Demande') &
                  (compaign.actionFor == $store.state.userid)
              "
              class="mt-2 mb-2 justify-center"
            >
              <v-btn text color="primary" @click="nextStep"> accepter</v-btn>
              <v-btn text> Refuser </v-btn>
            </v-card-actions>
          </v-card>
        </v-sheet>
      </v-row>
      <v-row
        color="#FAFAFA"
        v-for="message in compaign.message_set"
        :key="message.id"
        style="width:100%"
        class="mt-3 mx-2"
      >
        <v-row style="border-style: none">
          <v-col class="text-center mx-auto overline">{{
            convert2Date(message.sendDate)
          }}</v-col>
        </v-row>
        <v-row
          style="width:100%;border-style: none"
          :class="'mt-1 pt-0  justify-center'"
        >

          <v-col v-if="message.type == 'Notification'">
            <div class="overline mx-auto text-center">
              {{
                message.text
              }}
            </div>

            <v-row v-if="message.text == 'Date de publication choisie'"

                    style="border-style: none"
              :justify="
                compaign.announcer.id == $store.state.userid ? 'end' : 'start'
              "
                    class="pb-0 mb-0"
            >
              <v-col md="6">
                <v-sheet
                  color="#FAFAFA"
                  v-if="message.text == 'Date de publication choisie'"
                >
                  <v-card-subtitle
                    v-if="message.sender.id == $store.state.userid"
                    class="pa-0 ma-0 ml-2"
                    >Vous avez choisi cette date</v-card-subtitle
                  >
                  <v-card-subtitle
                    v-if="message.sender.id != $store.state.userid"
                    class="pa-0 ma-0 ml-2"
                  >
                    {{ message.sender.first_name }} a validé la date
                    suivante</v-card-subtitle
                  >
                  <v-card
                    class="ml-2 pa-2 justify-center pa-2"
                    color="primary lighten-4"
                  >
                    <div class="subtitle-2 mb-2">
                      Date de diffusion choisie :
                    </div>
                    <v-chip class="ml-2 mt-2" outlined label>
                      {{ compaign.startDateValidated }}
                    </v-chip>
                  </v-card>
                </v-sheet>
              </v-col>
            </v-row>
            <v-row
                    v-if="message.text == 'Episode de publication choisi'"
              :justify="
                compaign.announcer.id == $store.state.userid ? 'start' : 'end'
              "
              class="mb-0 pb-0"
            >
              <v-col md="6">
                <v-sheet
                  color="#FAFAFA"
                  v-if="message.text == 'Episode de publication choisi'"
                >
                  <v-card-subtitle class="pa-0 ma-0 ml-2"
                    >l'annonce a été publiée sur ces épisodes</v-card-subtitle
                  >
                  <v-card
                    class="ml-2 pa-2 justify-center pa-2"
                    color="primary lighten-4"
                  >
                    <v-list color="primary lighten-4">
                      <v-list-item
                        :href="item.audio"
                        target="_blank"
                        v-text="item.name"
                        v-for="item in compaign.ep"
                        :key="item.name"
                      >
                        <v-list-item-content>
                          <v-list-item-avatar tile>
                            <v-img :src="item.image"></v-img>
                          </v-list-item-avatar>
                          <v-list-item-title
                            :href="item.audio"
                            target="_blank"
                            v-text="item.name"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
          </v-row>

        <v-row
                style="width:100%;border-style: none"
                :class="'mt-1 pt-0  justify-end' +'pb-0 mb-0'"
                :justify="placement(message)"
        >
          <v-col md="6" color="#FAFAFA" v-if="message.type == 'Devis'">
            <v-card-subtitle
              v-if="message.sender.id == $store.state.userid"
              class="pa-0 ma-0 ml-2"
              >Vous avez envoyé un devis</v-card-subtitle
            >
            <v-card-subtitle
              v-if="message.sender.id != $store.state.userid"
              class="pa-0 ma-0 ml-2"
              >{{ message.sender.first_name }} vous a envoyé un
              devis</v-card-subtitle
            >

            <v-card class="ml-2 mr-2 justify-center" :elevation="4">
              <div v-if="message.text">
                <span class="pa-0 ma-0 ml-2 subtitle-2"> Message: </span>
                <v-card-text>
                  {{ message.text }}
                </v-card-text>
              </div>

              <span class="mt-0 pt-0 ml-2 subtitle-2 mb-2"> Devis</span>
              <v-simple-table class="mb-3">
                <tbody>
                  <tr>
                    <td>Nombre d'écoutes</td>
                    <td>
                      {{ numberWithSpaces(message.proposition.plays * 1000) }}
                    </td>
                  </tr>
                  <tr>
                    <td>Prix</td>
                    <td>{{ numberWithSpaces(message.proposition.price) }} €</td>
                  </tr>

                  <tr>
                    <td>Commission Loudli</td>
                    <td>
                      {{ numberWithSpaces(message.proposition.price * 0.15) }} €
                    </td>
                  </tr>
                  <tr>
                    <td>TVA</td>
                    <td>
                      {{
                        numberWithSpaces(message.proposition.price * 1.15 * 0.2)
                      }}
                      €
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Total </strong></td>
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
              </v-simple-table>
              <v-card-actions
                class="justify-center"
                v-if="
                  (message.proposition.status == 'pending') &
                    (compaign.actionFor == $store.state.userid)
                "
              >
                <v-btn text color="primary" @click="nextStep"> accepter</v-btn>
                <v-btn text @click="alarmProposition = true"> Refuser </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col md="6" v-if="message.type == 'Notification' & message.text=='Pitch envoyé'">
            <v-sheet color="#FAFAFA" v-if="message.type == 'Notification'">
              <v-card-subtitle
                v-if="message.sender.id == $store.state.userid"
                class="pa-0 ma-0 ml-2"
                >Vous avez envoyé des éléments de pitch</v-card-subtitle
              >
              <v-card-subtitle
                v-if="message.sender.id != $store.state.userid"
                class="pa-0 ma-0 ml-2"
                >{{ message.sender.first_name }} a envoyé des éléments de
                pitch</v-card-subtitle
              >

              <v-card class="ml-2 justify-center justfy" :elevation="4">
                <span class="pa-0 ma-0 ml-2 subtitle-2"> Pitch </span>
                <v-card-text>
                  {{ compaign.pitch }}
                </v-card-text>
                <span class="pa-0 ma-0 ml-2 subtitle-2"> Fichiers </span>
                <v-card-text
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
                </v-card-text>
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
          </v-col>

          <v-col md="6" v-if="message.type == 'Choix de date'">
            <v-sheet color="#FAFAFA" v-if="message.type == 'Choix de date'">
              <v-card-subtitle
                v-if="message.sender.id != $store.state.userid"
                class="pa-0 ma-0 ml-2"
                >Choisissez une date de publication</v-card-subtitle
              >
              <v-card-subtitle
                v-if="message.sender.id == $store.state.userid"
                class="pa-0 ma-0 ml-2"
                >Dates de publication proposées</v-card-subtitle
              >
              <v-card
                color="primary lighten-4"
                class="ml-2 justify-center justfy pa-2"
                :elevation="4"
                width="100%"
              >
                <v-btn-toggle
                  color="primary"
                  background-color="primary lighten-4"
                  v-model="chosenDate"
                >
                  <div>
                    <v-btn
                      :value="date"
                      class="mt-2 ml-2"
                      outlined
                      v-for="date in message.date.dates"
                      :key="date"
                    >
                      {{ date }}
                      <br />
                    </v-btn>
                  </div>
                </v-btn-toggle>
                <v-card-action
                  class="mt-2"
                  v-if="
                    (compaign.status == 'Choix de date') &
                      (message.date.status == 'pending') &
                      (compaign.actionFor == $store.state.userid)
                  "
                  justify="right"
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
                </v-card-action>
              </v-card>
            </v-sheet>
          </v-col>

          <v-col md="6" v-if="message.type == 'Enregistrement'">
            <v-col color="#FAFAFA" v-if="message.type == 'Enregistrement'">
              <v-card-subtitle
                v-if="message.sender.id == $store.state.userid"
                class="pa-0 ma-0 ml-2"
                >Vous avez proposé une annonce</v-card-subtitle
              >
              <v-card-subtitle
                v-if="message.sender.id != $store.state.userid"
                class="pa-0 ma-0 ml-2"
                >vous {{ message.sender.first_name }} a proposé une
                annonce</v-card-subtitle
              >
              <v-card
                class="ml-2 justify-center justfy"
                :elevation="4"
                width="100%"
              >
                <vuetify-audio
                  flat
                  color="primary"
                  :file="message.audio.audioFile"
                  downloadable
                ></vuetify-audio>
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
              </v-card>
            </v-col>
          </v-col>

          <v-col md="6" v-if="message.type == 'text'">
            <v-card
              flat
              class="ml-2 justify-center"
              color="#FAFAFA"
              v-if="message.type == 'text'"
            >
              <v-card-subtitle
                v-if="message.sender.id == $store.state.userid"
                class="pa-0 ma-0 ml-2"
                >Vous avez envoyé un message</v-card-subtitle
              >
              <v-card-subtitle
                v-if="message.sender.id != $store.state.userid"
                class="pa-0 ma-0 ml-2"
              >
                {{ message.sender.first_name }} a envoyé un
                message</v-card-subtitle
              >
              <v-card
                class="ml-2 justify-center pa-2"
                color="primary lighten-4"
              >
                <pre class="body-1 text-wrap">{{ message.text }} </pre>
              </v-card>
            </v-card>
          </v-col>

          <v-col md="6" v-if="message.type == 'Declined Notification'">
            <v-card
              flat
              class="ml-2 justify-center"
              color="#FAFAFA"
              v-if="message.type == 'Declined Notification'"
            >
              <v-card-subtitle
                v-if="message.sender.id == $store.state.userid"
                class="pa-0 ma-0 ml-2"
                >Vous avez décliné la proposition</v-card-subtitle
              >
              <v-card-subtitle
                v-if="message.sender.id != $store.state.userid"
                class="pa-0 ma-0 ml-2"
              >
                {{ message.sender.first_name }} a décliné la
                proposition</v-card-subtitle
              >
              <v-card
                class="ml-2 justify-center pa-2"
                color="primary lighten-4"
              >
                <pre class="body-1 text-wrap">{{ message.text }} </pre>
              </v-card>
            </v-card>
          </v-col>
          <v-col md="6" v-if="message.type == 'En cours'">
            <v-card flat class="ml-2 justify-center" color="#FAFAFA">
              <v-card-subtitle
                v-if="message.sender.id == $store.state.userid"
                class="pa-0 ma-0 ml-2"
                >Vous avez mis à jour le nombre d'écoutes</v-card-subtitle
              >
              <v-card-subtitle
                v-if="message.sender.id != $store.state.userid"
                class="pa-0 ma-0 ml-2"
              >
                {{ message.sender.first_name }} a mise à jours ses
                écoutes</v-card-subtitle
              >
              <v-card
                class="ml-2 justify-center pa-2"
                color="primary lighten-4"
              >
                <div class="body-1 justify-center d-flex">
                  <VueSvgGauge
                          :start-angle="-110"
                          :end-angle="110"
                          :value="compaign.advancement"
                          style="width: 50%;height: 50%"
                          :min="0"
                          :innerRadius="60"
                          :separatorStep="0"
                          :max="compaign.plays"
                          :gauge-color="[{ offset: 0, color: '#347AB0'}, { offset: 100, color: '#8CDFAD'}]"
                          :scale-interval="0.1">
                    <div class="inner-text inner-text--1">
                      <span>{{ compaign.advancement }}/{{ compaign.plays }}</span>
                    </div>
                    </VueSvgGauge>


                </div>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-row>
      <div>
        <v-row class="justify-center pt-0 mb-2 mx-2" style="width:100%">
          <v-card-subtitle
            v-if="
              (compaign.actionFor == $store.state.userid) &
                (compaign.status == 'Demande')
            "
            class="overline"
          >
            <v-avatar
              ><v-img
                :src="
                  compaign.announcer.id !== $store.state.userid
                    ? compaign.announcer.UserProfileInfo.profilePicture
                    : compaign.podcast.author.UserProfileInfo.profilePicture
                "
              >
              </v-img>
            </v-avatar>
            attends votre validation de {{ compaign.status }}</v-card-subtitle
          >
          <v-div class="justify-center d-flex flex-column justify-center align-center align-stretch " >
            <div style="border-style: none"
              v-if="
                (compaign.actionFor == $store.state.userid) &
                  (compaign.status == 'Devis')
              "
              class="overline"
            >

              <v-avatar
                ><v-img
                  :src="
                    compaign.announcer.id !== $store.state.userid
                      ? compaign.announcer.UserProfileInfo.profilePicture
                      : compaign.podcast.author.UserProfileInfo.profilePicture
                  "
                >
                </v-img>
              </v-avatar>
              attends un devis</div
            >
            <v-btn
              flat
              color="secondary"
              small
              @click="alarmProposition = true"
              v-if="
                (compaign.actionFor == $store.state.userid) &
                  (compaign.status == 'Devis')
              "
              class="overline"
            >
              Fournir un devis
            </v-btn>
          </v-div>
            <v-div class="justify-center d-flex flex-column justify-center align-center align-stretch " >
                <div style="border-style: none"
                     v-if="
                (compaign.actionFor == $store.state.userid) &
                  (compaign.status == 'Pitch')
              "
                     class="overline"
                >

                    <v-avatar
                    ><v-img
                            :src="compaign.podcast.author.UserProfileInfo.profilePicture"
                    >
                    </v-img>
                    </v-avatar>
                    attends un pitch d'annonce</div
                >
                <v-btn
                        flat
                        color="secondary"
                        small
                        @click="diagPitch = true"
                        v-if="
                (compaign.actionFor == $store.state.userid) &
                  (compaign.status == 'Pitch')
              "
                        class="overline"
                >
                    Fournir un pitch
                </v-btn>
            </v-div>
          <v-div
                  class="justify-center d-flex flex-column justify-center align-center align-stretch "
                  v-if="
                (compaign.actionFor == $store.state.userid) &
                (compaign.status == 'Enregistrement')&
                (compaign.podcast.author.id ==$store.state.userid)"
          >
            <div style="border-style: none"
                 class="overline"
            >

              <v-avatar
              ><v-img
                      :src="compaign.announcer.UserProfileInfo.profilePicture"
              >
              </v-img>
              </v-avatar>
              attend un enregitrement d'annonce</div
            >
            <v-btn
                    flat
                    color="secondary"
                    small
                    @click="diagRecord = true"
                    v-if="
                (compaign.actionFor == $store.state.userid) &
                  (compaign.status == 'Enregistrement')
              "
                    class="overline"
            >
              Fournir un enregistrement
            </v-btn>
          </v-div>
          <v-div class="justify-center d-flex flex-column justify-center align-center align-stretch"
                 v-if="
                (compaign.actionFor == $store.state.userid) &
                 (compaign.status == 'Enregistrement')&
                (compaign.announcer.id ==$store.state.userid)">
            <div style="border-style: none"
                 class="overline"
            >

              <v-avatar
              ><v-img
                      :src="compaign.podcast.author.UserProfileInfo.profilePicture"
              >
              </v-img>
              </v-avatar>
              attend un la validation d'annonce</div
            >
            <v-row class="justify-center">
            <v-btn
                    flat
                    color="secondary"
                    small
                    @click=" nextStep()"
                    v-if="
                (compaign.actionFor == $store.state.userid) &
                  (compaign.status == 'Enregistrement')
              "
                    class="overline mr-2"
            >
              Valider
            </v-btn>
            <v-btn
                    flat
                    color="black"
                    small
                    dark
                    @click="diagComment = true"
                    v-if="
                (compaign.actionFor == $store.state.userid) &
                  (compaign.status == 'Enregistrement')
              "
                    class="overline"
            >
             Décliner
            </v-btn>
            </v-row>
          </v-div>
          <v-div
                  class="justify-center d-flex flex-column justify-center align-center align-stretch "
                  v-if="
                (compaign.actionFor == $store.state.userid) &
                (compaign.status == 'Choix de date')&
                (compaign.podcast.author.id ==$store.state.userid)"
          >>
            <div style="border-style: none"
                 class="overline"
            >

              <v-avatar
              ><v-img
                      :src="compaign.announcer.UserProfileInfo.profilePicture"
              >
              </v-img>
              </v-avatar>
              attend des propositions de dates</div
            >
            <v-btn
                    flat
                    color="secondary"
                    small
                    @click="diagDate = true"
                    class="overline"
            >
              Proposer des dates de publication
            </v-btn>
          </v-div>
          <v-div
                  class="justify-center d-flex flex-column justify-center align-center align-stretch "
                  v-if="
                (compaign.actionFor == $store.state.userid) &
                (compaign.status == 'Choix de date')&
                (compaign.announcer.id ==$store.state.userid)"
          >
            <div style="border-style: none"
                 class="overline"
            >

              <v-avatar
              ><v-img
                      :src="compaign.announcer.UserProfileInfo.profilePicture"
              >
              </v-img>
              </v-avatar>
              attend un choix de dates</div
            >
            <!--<v-btn
                    flat
                    color="secondary"
                    small
                    @click="diagDate = true"
                    class="overline"
            >
              Proposer des dates de publication
            </v-btn>-->
          </v-div>
          <v-div
                  class="justify-center d-flex flex-column justify-center align-center align-stretch "
                  v-if="
                (compaign.actionFor == $store.state.userid) &
                (compaign.status == 'Selection episodes')&
                (compaign.podcast.author.id ==$store.state.userid)"
          >
            <div style="border-style: none"
                 class="overline"
            >

              <v-avatar
              ><v-img
                      :src="compaign.announcer.UserProfileInfo.profilePicture"
              >
              </v-img>
              </v-avatar>
              attend la liste des épisodes où sera diffusé l'annonce </div
            >
            <v-btn
                    flat
                    color="secondary"
                    small
                    @click="SelectEpisodesDiag"
                    class="overline"
            >
              Proposer des dates de publication
            </v-btn>
          </v-div>
          <v-div
                  class="justify-center d-flex flex-column justify-center align-center align-stretch "
                  v-if="
                (compaign.actionFor == $store.state.userid) &
                (compaign.status == 'En cours')&
                (compaign.podcast.author.id ==$store.state.userid)"
          >
            <div style="border-style: none"
                 class="overline"
            >

              <v-avatar
              ><v-img
                      :src="compaign.announcer.UserProfileInfo.profilePicture"
              >
              </v-img>
              </v-avatar>
              Indiquez l'avancement de la campagne </div
            >
            <v-btn
                    flat
                    color="secondary"
                    small
                    @click="diagAdvancement=true"
                    class="overline"
            >
              Mettre à jour mes écoutes
            </v-btn>
          </v-div>


        </v-row>
      </div>
    </v-sheet>

    <div>
      <v-row
        class="justify-start mt-2 ml-3 mb-2 mx-1 mb-0 pa-0"
        style="width:100%"
      >

       <!-- <v-btn
          v-if="
            (compaign.podcast.author.id == $store.state.userid) &
              (compaign.status == 'En cours')
          "
          flat
          color="secondary lighten-2"
          class="ml-1"
          elevation="0"
          light
          small
          @click="diagAdvancement = true"
        >
          Mettre à jour l'avancement
        </v-btn>-->
      </v-row>
      <!--                                        <v-row v-if="compaign.actionFor==$store.state.userid & compaign.status=='Devis'" class="justify-start mt-2 ml-3 mb-2 mx-1 mb-0 pa-0" style="width:100%">
                                            <v-btn flat color="secondary lighten-2" elevation="0" light small @click="alarmProposition=true">&lt;!&ndash;<v-icon left> fa-money-euro</v-icon>&ndash;&gt;Proposer Devis</v-btn>
                                        </v-row>-->
      <div
        class="d-flex justify-center align-start mb-2 mx-1"
        style="border-style: none;"
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
          :disabled="compaign.status == 'Demande'"
        >
        </v-textarea>
        <div class=" flex-grow-0">
          <v-btn
            center
            style="border-style: none"
            :disabled="compaign.status == 'Demande'"
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
            <v-card-title> Devis</v-card-title>
            <v-simple-table class="mb-3">
              <tbody>
                <tr>
                  <td>Nombre d'écoutes</td>
                  <td>{{ numberWithSpaces(proposition.plays * 1000) }}</td>
                </tr>
                <tr>
                  <td>Prix</td>
                  <td>{{ numberWithSpaces(proposition.price) }} €</td>
                </tr>

                <tr>
                  <td>Commission Loudli</td>
                  <td>{{ numberWithSpaces(proposition.price) * 0.15 }} €</td>
                </tr>
                <tr>
                  <td>TVA</td>
                  <td>
                    {{ numberWithSpaces(proposition.price) * 1.15 * 0.2 }} €
                  </td>
                </tr>
                <tr>
                  <td><strong>Total </strong></td>
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
      v-model="diagPitch"
      max-width="800px"
      class="pa-2 d-flex flex-column"
    >
      <v-card class="pa-2">
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
      v-model="diagRecord"
      max-width="800"
      class="pa-2 d-flex flex-column"
    >
      <v-card flat class="pa-2">
        <div class="body-1 mb-2"
          >Veuillez charger l'annoncer audio qui vous avez l'intention de
          diffuser.</div
        >
        <v-file-input
          outlined
          v-model="audioFile"
          label="Annonce"
          accept="audio/*"
          style="width:50%"
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
      max-width="700"
      class="pa-2 d-flex flex-column"
    >
      <v-card flat class="pa-2">
        <v-card-text class="body-1">
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

            <div class="ml-2 mt-2" v-for="date in dates" :key="date">
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

    <v-dialog v-model="diagOtherDates">
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
    <v-dialog v-model="diagComment">
      <v-card color="white" class="pa-2">
        <span class="body-1 ml-3">
          Dites à {{ compaign.podcast.author.first_name }} ce qu'il faut
          modifier dans l'annonce
        </span>
        <v-textarea
          class="ml-3 mt-3"
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
    <v-dialog v-model="diagSelect" max-width="800px">
      <v-card color="white" class="pa-2" outlined>
        <div class="body-1 mb-4">
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
        <v-card-title v-if="selectedEpisodes.length > 0">
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
    <v-dialog v-model="diagAdvancement" max-width="500">
      <v-card class="pa-2">
        <div class="body-1 ml-2">
          Mettez à jour les nombre d'écoute des campagnes
        </div>

        <v-text-field
          class="ml-3 mt-3"
          v-model="advancement"
          :placeholder="compaign.advancement"
          outlined
          label="écoutes de la campagne"
          type="Number"
          hide-details
        >
        </v-text-field>
        <v-card-actions class="justify-end">
          <v-btn
            text
            color="primary"
            @click="updateAdvancement(advancement)"
          >
            Mettre à jour
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
/*
import {_} from 'vue-underscore';
*/
/*
import { required } from "vuelidate/lib/validators";
*/


export default {
  data() {
    return {
      compaigns: [],
      ads: [],
      dates: [],
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
      plays: "",
      step: 2,
      tab: ["Campagne", "Podcast", "Echanges", "Avancement"],
      icons: ["mdi-bullhorn", "mdi-podcast", "fa-comment", "fa-steps"],
      podcasts: [],
      compaign: {},
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
    validations: {
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
    id(id) {
      this.$store
        .dispatch("GetCompagne", { id: id })
        .then(result => (this.compaign = result));
    }
  },
  props: ["id"],
  computed: {
      pitchErrors() {
          if (this.diagPitch==true){
          const errors = [];
          if (!this.$v.pitch.$dirty) return errors;
              !this.$v.pitch.maxLength && errors.push("Le pitch ne doit pas contenir plus de 200 mots");
          return errors;
          }
          return ''
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
    VuetifyAudio: () => import("vuetify-audio")
  },
  mixins: [formatter],
  methods: {
      test(){
          this.attachedFile={}
      },
    appendSelected(target) {
      this.selectedEpisodes.push(target);
      target = [];
    },
    placement(message) {
       return message.sender.id == this.$store.state.userid ? "end" : "start";

    },
    async sendMessage() {
      await this.$store.dispatch("sendMessage", {
        text: this.message,
        type: "text",
        compaign: this.compaign.id,
        sender: this.$store.state.userid
      });
      this.compaign = await this.$store.dispatch("GetCompagne", {
        id: this.compaign.id
      });
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
    },
    async validateEpisodes() {
      await this.$store.dispatch("nextStep", {
        id: this.compaign.id,
        episodes: this.selectedEpisodes
      });
    },

    async EffacerCompagne() {
      await this.$store.dispatch("deleteCompagne", { id: this.compaign.id });
      this.$router.push("/Annonceur/");
    },

    async updateAdvancement(payload) {
      await this.$store.dispatch("sendMessage", {
        plays:{ plays : payload.advancement},
        type: "En cours",
        compaign: this.compaign.id,
        sender: this.$store.state.userid
      });
      this.compaign = await this.$store.dispatch("GetCompagne", {
        id: this.compaign.id
      });

      this.diagAdvancement = false;
    },
    async updateCompagne(payload) {
      await this.$store.dispatch("updateCompagne", {
        id: this.compaign.id,
        data: payload
      });
      this.compaign = await this.$store.dispatch("GetCompagne", {
        id: this.compaign.id
      });
    },
    async sendProposition(payload) {
      await this.$store.dispatch("sendMessage", payload);
      this.compaign = await this.$store.dispatch("GetCompagne", {
        id: this.compaign.id
      });
      this.alarmProposition = false;
    },
    async sendPropositionDate(payload) {
      await this.$store.dispatch("sendMessage", payload);
      this.compaign = await this.$store.dispatch("GetCompagne", {
        id: this.compaign.id
      });
      this.diagDate = false;
    },
    async nextStep() {
      await this.$store.dispatch("nextStep", { id: this.compaign.id });
      this.compaign = await this.$store.dispatch("GetCompagne", {
        id: this.compaign.id
      });
      this.diagSelect=false
    },
    async decline() {
      await this.$store.dispatch("decline", {
        id: this.compaign.id,
        comment: this.message
      });
      this.compaign = await this.$store.dispatch("GetCompagne", {
        id: this.compaign.id
      });
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
      this.compaign = await this.$store.dispatch("GetCompagne", {
        id: this.compaign.id
      });
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
    },
    scrollToEnd() {
      var container = document.querySelector(".scroll");
      var scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
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
      this.compaign = await this.$store.dispatch("GetCompagne", { id: id });
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
  mounted() {
    this.scrollToEnd();
  },
  updated() {
    this.scrollToEnd();
  },

  async created() {
    this.ageGroups = await this.$store.dispatch("getAgeGroup");
    this.educationLevels = await this.$store.dispatch("getEducation");
    this.step = this.compaign.statusNum;
    console.log(this.id);
    this.compaign = await this.$store.dispatch("GetCompagne", { id: this.id });
    this.loadingCompaign = true;
  }
};
</script>

<style>
.divided {
  display: flex;
  align-items: center;
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
</style>
