<template>

  <div>
    <dialog-send-test-email ref="dialogSendTestEmail"></dialog-send-test-email>
    <dialog-view-integrations-instructions ref="dialogViewIntegrationsInstructions"></dialog-view-integrations-instructions>
    <panel-navigation>
    </panel-navigation>

      
      <div class="container flex flex-row items-top justify-between">
        <h1 class="text-lg font-semibold mb-3">Settings</h1>
      </div>
      
      <hr class="border-b border-gray-100 mb-3">

      <v-skeleton-loader
        type="article"
        v-if="!me"
      ></v-skeleton-loader>

      <div class="dashboard-box settings-wrapper" v-if="me">
        <v-card
          class="pa-2 ma-3"
          tile
        >
          <div class="p-3 pt-1">

            <v-tabs>
              <v-tab>Profile</v-tab>
              <v-tab>Change Password</v-tab>
              <v-tab>API</v-tab>

              <v-tab-item class="pt-5">
                <div class="flex flew-row flex-wrap">
                  <div class="w-full sm:w-1/4 pr-6 mb-4 mt-2" style="text-align: center;">
                    <v-gravatar v-if="profile" class="gravatar-pic" :email="profile.email" default-img="https://regro-cdn.s3.amazonaws.com/images/profile_image.png" />
                    <br />
                    <strong>{{ profile.first_name }} {{ profile.last_name }}</strong>
                  </div>
                  <div class="w-full sm:w-3/4 mb-4">
                    <div class="flex flew-row flex-wrap">
                      <div class="w-full sm:w-1/2 pr-6 mb-4">
                        <p class="mb-1 text-xs mb-2"><strong>First Name</strong></p>
                        <input type="text" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" v-model="profile.first_name" />
                      </div>
                      <div class="w-full sm:w-1/2 mb-4">
                        <p class="mb-1 text-xs mb-2"><strong>Last Name</strong></p>
                        <input type="text" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" v-model="profile.last_name" />
                      </div>
                      <div class="w-full mb-4">
                        <p class="mb-1 text-xs mb-2"><strong>Email</strong></p>
                        <input type="text" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" v-model="profile.email" />
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                  <div v-html="error"></div>
                </div>

                <div  v-if="profile_changed"  class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                  <div v-html="profile_changed"></div>
                </div>

                
                <hr class="mt-3" />

                <div>
                  <div class="bg-blue-500 float-right hover:bg-blue-400 text-white text-sm inline-block rounded py-2 px-3 cursor-pointer mt-6" :class="{'spinner': saving}" @click="save()">Save</div>
                </div>
              </v-tab-item>

              <v-tab-item class="pt-5">
                <div class="w-full sm:w-1/3 pr-6 mb-4">
                  <p class="mb-1 text-xs mb-2"><strong>Current Password</strong></p>
                  <input type="password" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" v-model="userpassword" />
                </div>
               
                <div class="w-full sm:w-1/3 pr-6 mb-4">
                  <p class="mb-1 text-xs mb-2"><strong>New Password</strong></p>
                  <input type="password" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded"  v-model="newPassword" />
                </div>
                <div class="w-full sm:w-1/3 pr-6 mb-4">
                  <p class="mb-1 text-xs mb-2"><strong>Confirm Password</strong></p>
                  <input type="password" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" v-model="confirmPassword" />
                </div>
                
                <div v-if="error_password" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                  <div v-html="error_password"></div>
                </div>
                <div v-if="successMessage" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                  <div v-html="successMessage"></div>
                </div>
                <hr class="mt-3" />

                <div class="float-right mt-6">
                  
                  <div class="bg-blue text-white text-sm inline-block rounded py-2 px-3 cursor-pointer" :class="{'spinner': changing}" @click="change_password">Change Password</div>
                </div>
              </v-tab-item>



              <v-tab-item class="pt-5">
                <h3 class="text-center font-weight-bold">Your API access key</h3>
                <div class="text-center pa-4 mt-2" v-if="!$store.getters.UserApi">
                    No Api Key Available
                </div>

                <div class="pa-4 mt-2 text-center" v-if="$store.getters.UserApi">
                    This is your API Access Key, your personal key required to authenticate with the API .
                    <p class="mt-2  mb-2"><strong>{{ $store.getters.UserApi }}</strong></p>
                </div>

                <div v-if="error_password" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                  <div v-html="error_password"></div>
                </div>

               
                
                <hr class="mt-3" />

                <div class="float-right mt-6">
                 
                  <div  v-if="!$store.getters.UserApi"  class="bg-blue text-white text-sm inline-block rounded py-2 px-3 cursor-pointer" :class="{'spinner': changing}" @click="generateKey">Generate Api Key</div>
                  <div v-if="$store.getters.UserApi"  class="bg-blue text-white text-sm inline-block rounded py-2 px-3 cursor-pointer" :class="{'spinner': changing}" @click="resetKey">Reset Key</div>

                  
                </div>
              </v-tab-item>
            </v-tabs>
          </div>
        </v-card>
      </div>

  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import PanelNavigation from '@/components/PanelNavigation.vue'
import { ToggleButton } from 'vue-js-toggle-button'
import DialogSendTestEmail from '@/components/dialogs/integrations/sendTestEmail.vue'
import DialogViewIntegrationsInstructions from '@/components/dialogs/integrations/viewInstructions.vue'
import moment from 'moment'
import SmsTemplates from '@/views/panel/Templates.vue'
import ImageTemplates from '@/views/panel/PersonalizationImages.vue'

export default {
  metaInfo () {
    return {
      title: "Settings | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    ToggleButton,
    DialogSendTestEmail,
    DialogViewIntegrationsInstructions,
    SmsTemplates,
    ImageTemplates
  },
  data() {
    return {
      userSegmentation: false,
      saving: false,
      error: null,
      profile_changed:null,
      changing: false,
      error_password: null,
      password_changed: false,
      newPassword: '',
      confirmPassword: '',
      successMessage: null,
      phone_number_changed: false,
      show_phone_verification_modal: false,

      phone: "",
      phone_valid: false,
      verifying_otp: false,
      otp_valid: false,
      otp_attempted: false,
      otp_generated_code: null,
      token :null
    }
  },
  
  methods: {
  

    getExternalContactFormLinkWhiteLabeled() {
        let url = window.location.origin + "/api/contacts/add-contact-externally"
        return url;
    },

    formatDate(date) {
      return moment(date).format("MMM D, YYYY")
    },

    async save() {
  this.saving = true
     
  try {
    const response = await axios.patch(process.env.VUE_APP_API_ENDPOINT + '/users/update', {
      fname: this.profile.first_name,
      lname: this.profile.last_name,
      email: this.profile.email 
    }, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
    
    this.$store.dispatch('setUser', JSON.stringify(this.profile));
    this.profile_changed = "Profile Updated!!";
    setTimeout(() => {
      this.profile_changed = null;
    }, 3000);
  } catch(error) { 
    this.error = error;
    setTimeout(() => {
      this.error = null;
    }, 3000);
  }
  
  this.saving = false;
},


async generateKey() {
  this.changing = true
  try {
    const response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/api/generateapikey', {}, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    })
    if (response.status === 200) {
      this.$store.dispatch('setUserApi', response.data.data)
    }
  } catch (error) {
    this.error = error
    setTimeout(() => {
      this.error = null
    }, 3000)
  }
  this.changing = false
},

resetKey(){
  this.changing = true;
    axios.post(process.env.VUE_APP_API_ENDPOINT + '/api/updateuserapi', {}, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }).then(result =>{
        if(result.status == 200){
            this.$store.dispatch('setUserApi',result.data.ApiKey);
        }
    });
    this.changing = false
},

async change_password(){

  this.changing = true;
  if (this.newPassword !== this.confirmPassword) {
    this.error_password = 'Passwords do not match';
    this.changing = false
    setTimeout(() => {
      this.error_password = null
    }, 3000)
    return;
  }
    

  try{
      await axios.patch(process.env.VUE_APP_API_ENDPOINT + '/users/changepassword', {
    
              password:this.newPassword, 
              
          },{
            headers: {
            'Authorization': `Bearer ${this.token}`
          }
          
          }).then(result =>{
              this.$store.dispatch('setPassword',this.newPassword);
              this.successMessage = "Password Change Sucessfully !!";
              
              setTimeout(() => {
              this.successMessage = null
            }, 3000)
          })
    }catch(error){ 
        this.error_password = error
        setTimeout(() => {
        this.error_password = null
      }, 3000)
    }

this.changing = false
}




  },
  computed: {
    ...mapState({
      me: state => JSON.parse(state.loginuser),
      profile: state => JSON.parse(state.loginuser),
      userpassword: state => state.password,
      // agency: state => state.agency
    })
    

  },
  mounted() {
    this.token = JSON.parse(this.$store.getters.jwtToken)
  //   let self = this
  //   setTimeout(function() {
  //     if (self.me.domain && (self.me.domain_status == 0 || self.me.ssl_status == 0)) {
  //       self.saveDomain();
  //     }

  //     if (self.me.integrations.twilio.settings.account_sid && self.me.integrations.twilio.status == 0)
  //       self.errorTwilio = "Your Twilio credentials are invalid."

  //     if (self.me.integrations.smtp.settings.host && self.me.integrations.smtp.status == 0)
  //       self.errorSMTP = "Your SMTP settings are invalid."

  //   }, 1000)

  //   if (typeof(self.$agency) == "undefined" || self.$agency == null) {
  //     self.$agency = self.me
  //   }
  }
}
</script>

<style>
.setting-header {
  background-color: #fbfbfb;
}
.setting-body {
  background-color: #fdfdfd;
}

input, textarea {
  border-style: solid;
}

.token_password_toggle {
  position: absolute;
  margin-top: -30px;
  right: 20px;
}

.settings-wrapper fieldset {
    border: 1px solid rgba(25, 35, 58, 0.3) !important;
}
</style>

