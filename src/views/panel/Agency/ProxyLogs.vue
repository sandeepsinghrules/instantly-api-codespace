<template>
    <div>
         <panel-navigation>
         </panel-navigation>
   
         <div class="container flex flex-row items-top justify-between align-center">
             <h1 class="text-lg font-semibold mt-5 "> Proxy Logs</h1>
            <div class="border-1 border-blue text-primary text-xs text-bold px-4 py-2 rounded cursor-pointer float-right" @click="$router.push({ name: 'proxies'})" style="margin-top: -5px;"><i class="fa fa-arrow-left mr-2"> </i> BACK</div>
         </div>

 
         <hr class="border-b border-gray-100 ">
 
         <v-skeleton-loader v-if="loading" type="article, article, article"></v-skeleton-loader>
         
           <div class="dashboard-box p-3" v-if="!loading && logs.length == 0">
             <v-card
               class="pa-2"
               tile
             >
               <div class="p-3">
 
                 <br /><br /><br /><br />
 
                 <div class="dashboard-box-iconsquare">
                   <div class="dashboard-box-icon-background"></div>
                   <div class="dashboard-box-icon">
                     <i class="mdi mdi-briefcase-outline"></i>
                   </div>
                 </div>
 
                 <div style="text-align: center;">
                   <div class="pt-2 pb-2">
                     <strong>No logs found  for this proxy</strong>
                   </div>
 
                   <br />
 
                 </div>
                 
                 <br /><br /><br /><br /><br />
               </div>
             </v-card>
           </div>
 
           <template v-if="!loading && logs.length > 0">
 
            <div v-if="$vuetify.breakpoint.xs" class="p-3">
                <div v-for="log in logs" :key="log.id" class="dashboard-box mb-4">
                <v-card
                    class=""
                    tile
                >
                    <div class="p-2" style="position: relative;">
                    <div>



                        <div> 
                            <strong>
                            <span class="text-sm mb-2">{{ log.network_symbol }}</span>  

                            <br />
                            </strong>    

                            <div class="d-flex mt-3">
                                <span style="font-size: 12px; color: #757B89;">
                                <v-chip
                                            class=""
                                            small
                                            color="orange lighten-5"
                                            text-color="orange lighten-1"
                                        >
                                        {{ formatDate(log.project_symbol) }}
                                    </v-chip>
                                </span> 
                            </div>
                            <div class="pt-3">
                                    <div >
                                    <span style="color: #3A9BDB; opacity: 0.7; font-weight: bold; font-size: 12px;">{{log.result}}</span>
                                    </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div style="clear: both;"></div>
                    </div>
                </v-card>
                </div>
                <div class="float-right">
                <v-pagination
                    v-model="currentPage"
                    :length="Math.ceil(totalItems / perPage)"
                    :total-visible="9"
                    color="primary"
                    rounded="circle"
                    ></v-pagination>
                </div>
            </div>


            <div  v-else class="dashboard-box settings-wrapper" style="margin-top: -1.5rem;">
            
                <v-container>
                        <v-card>
                        <div class="p-3">

                            <!-- <div class="float-left mb-3">
                            <v-text-field
                                prepend-inner-icon="mdi-magnify"
                                placeholder="Search"
                                dense
                                outlined
                                hide-details
                                style="border: solid 1px #CCCCCC; width: 300px;"
                                v-model="search"
                            >
                                
                            </v-text-field>
                            </div> -->

                        

                            <br clear="all" />

                            <div class="pt-2 overflow-x-auto">
                            
                            <table class="w-full rg-datatable">
                                <thead class="border-b border-gray-100 w-full">
                                <tr>
                                    <th>NETWORK SYMBOL</th>
                                    <th>PROJECT SYMBOL</th>
                                    <th>STATUS</th>
                                    <th>CREATED AT</th>
                                    <th>ERROR RESPONSE</th>
                                </tr>
                                </thead>
                                <tbody class="w-full" style="">
                                
                                <tr v-for="log in logs" :key="log.id">
                                    <td class="text-bold">
                                        <div style="color: #3a9bdb; font-size: 12px;">
                                            {{ log.network_symbol }}
                                        </div>
                                    </td>

                                    <td class="text-bold">
                                        <div style="color: #3a9bdb; font-size: 12px;">
                                            {{ log.project_symbol }}
                                        </div>
                                    </td>

                                    <v-chip
                                            class=""
                                            small
                                            color="orange lighten-5"
                                            text-color="orange lighten-1"
                                            v-if="log.result == 'failed'"
                                        >
                                            failed
                                    </v-chip>

                                        <v-chip
                                            class=""
                                            small
                                            color="green lighten-5"
                                            text-color="green lighten-1"
                                            v-if="log.result == 'success'"
                                        >
                                        success
                                    </v-chip>
                                    <v-chip
                                            class=""
                                            small
                                            color="blue lighten-5"
                                            text-color="blue lighten-1"
                                            v-if="log.result == 'pending'"
                                        >
                                        pending
                                    </v-chip>
                                    <td>
                                        <v-chip
                                        class=""
                                        small
                                        color="purple lighten-5"
                                        text-color="purple lighten-1"
                                    >
                                    {{ formatDate(log.created_at) }}
                                    </v-chip>
                                    </td>
                                    <td>
                                        <!-- Error Response Button -->
                                        <v-btn small color="primary" @click="openErrorDialog(log.failed_response)">
                                            View
                                        </v-btn>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            </div>
                            <div class="float-right mt-2">
                                <v-pagination
                                v-model="currentPage"
                                :length="Math.ceil(totalItems / perPage)"
                                :total-visible="9"
                                color="primary"
                                rounded="circle"
                                ></v-pagination>
                            </div>

                            <div style="clear: both;"></div>
                            </div>
                        </v-card>
                    </v-container>
            </div>
            <!-- Error Response Dialog -->
            <div v-if="errorDialog" @click.self="errorDialog = false" class="fixed top-0 left-0 h-full w-full z-50 flex items-center justify-center" style="background-color: rgba(0,0,0,.5);">
                            <div class="w-full sm:w-1/2 lg:w-2/5 bg-white rounded-lg mx-6">

                                <div class="rg-modal-header rounded-t-lg text-center">
                                    <span>Error Response</span>
                                    <a href="javascript: void(0);" class="rg-modal-close-btn" @click="errorDialog = false">
                                        <i class="fa fa-times" style="color: black;"></i>
                                    </a>
                                </div>

                                <div class="p-4">
                                    <div class="text-center font-bold text-lg mt-2" style="font-weight: normal;">
                                        {{ errorResponse || 'No error response message' }}
                                    </div>
                                </div>

                                <div class="bg-gray-100 rounded-b-lg px-6 py-4 mt-5 flex justify-center">
                                    <!-- OK Button -->
                                    <button type="button" class=" text-white v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--small" style="background-color: rgb(36, 119, 246); border-color: rgb(36, 119, 246);">
                                        <span class="v-btn__content" @click="errorDialog = false">
                                            OK
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
            </template>
 

 
    </div>
 </template>
 
 <script>
 import axios from 'axios'
 import { mapState } from 'vuex'
 import moment from 'moment'
 import PanelNavigation from '@/components/PanelNavigation.vue'
 export default {
 
 metaInfo () {
     return {
       title: "Proxies | " + this.$appName
     }
   },
   components: {
     PanelNavigation,
   },
   data() {
     return {
       selectedIds: [],
       logs: [],
       currentPage: 1,
       perPage: 50,
       totalItems: 0,
       loading: false,
       search : null,
       fetchingSearches:null,
       errorDialog: false,
       errorResponse: null,
     }
   },
   computed: {
     ...mapState({
       user_id: state => JSON.parse(state.loginuser).id,
      
     }),
     
   },
   mounted() {
     this.fetchProxiesLogs()
   
   },
   methods: {
     openOtherWebsite() {
       window.open('https://docs.instantlyapi.com/', '_blank');
     },
     fetchProxiesLogs() {
      
       this.loading = true
       axios.get(process.env.VUE_APP_API_ENDPOINT + '/proxy/getproxybyid', {
         headers: {
                 'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
             },
         params: {
           page: this.currentPage,
           limit: this.perPage,
           query:this.search,
           proxy_id : this.$route.params.id
         }
       })
         .then(response => {
           this.logs = response.data.results.logs
           this.totalItems = response.data.results.total
           this.loading = false
         })
         .catch(error => {
           console.log(error)
         })
     },
     formatDate: function(date) {
       // return moment(String(date)).fromNow()
       return  moment(String(date)).format('llll')
     },
     formatTime: function(time) {
       return time.toFixed(2)
     },

     openErrorDialog(error) {
        console.log(error)
      this.errorResponse = error || null;
      this.errorDialog = true;
    },
 
   },
   watch: {
     currentPage(val) {
       this.fetchProxiesLogs()
     },
     perPage(val) {
       this.fetchProxiesLogs()
     },
     search(val){
       setTimeout(() => {
         this.fetchProxiesLogs()
       }, 1000);
      
     }
   }
 }
 </script>


