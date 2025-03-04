<template>
   <div>
        <panel-navigation>
        </panel-navigation>
  
        <div class="container flex flex-row items-top justify-between">
            <h1 class="text-lg font-semibold mt-5">Logs</h1>
        </div>

        <div v-if="$vuetify.breakpoint.xs" class="p-3">
                <v-text-field
                  prepend-inner-icon="mdi-magnify"
                  placeholder="Search"
                  dense
                  outlined
                  hide-details
                  style="border: solid 1px #CCCCCC; width: 100%; background: white;"
                  v-model="search"
                ></v-text-field>
        </div>

        <hr class="border-b border-gray-100 ">

        <v-skeleton-loader v-if="fetchingSearches" type="article, article, article"></v-skeleton-loader>

          <div class="dashboard-box p-3" v-if="!fetchingSearches && logs.length == 0">
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
                    <strong>No Logs Yet</strong>
                  </div>

                  <div class="text-sm mb-4 text-gray-600">
                    You have no logs yet. Use the documentation to create logs.
                  </div>

                  <br />

                  <div @click="openOtherWebsite" class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 inline-block rounded cursor-pointer" style="margin-top: -5px;"><i class="fa fa-file  mr-2"></i> View API Docs</div>
                </div>
                
                <br /><br /><br /><br /><br />
              </div>
            </v-card>
          </div>



          <template v-if="!fetchingSearches && logs.length > 0">

            <div v-if="$vuetify.breakpoint.xs" class="p-3">
                <div v-for="log in logs" :key="log.id" class="dashboard-box mb-4">
                  <v-card
                    class=""
                    tile
                  >
                    <div class="p-2" style="position: relative;">
                      <div style="word-break: break-word;">

                        <div class="float-right">
                          <span style="font-size: 12px; color: #757B89;">
                            {{ formatDate(log.date) }}
                          </span>
                          <div class="pt-4">
                            <router-link :to="'/logsearch/' + log.id">
                              <span style="color: #3A9BDB; opacity: 0.7; font-weight: bold; font-size: 12px;">View Results</span>
                            </router-link>
                          </div>
                        </div>

                        <strong>
                          <span class="text-sm mb-2">{{ log.api_endpoint }}</span>  

                          <br />
                        </strong>
                        <v-chip
                                class=""
                                small
                                color="orange lighten-5"
                                text-color="orange lighten-1"
                                v-if="log.status == 'failed'"
                              >
                                failed
                              </v-chip>

                              <v-chip
                                class=""
                                small
                                color="green lighten-5"
                                text-color="green lighten-1"
                                v-if="log.status == 'success'"
                              >
                              success
                          </v-chip>

                          <v-chip
                            class="ml-3 "
                            small
                            color="purple lighten-5"
                            text-color="purple lighten-1"
                          >
                          Get
                          </v-chip>
                        <div class="text-gray-500 pt-3 ms-3" style="font-size: 12px;">
                          {{ formatTime(log.duration) }}s
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

                            <div class="float-left mb-3">
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
                            </div>

                          

                            <br clear="all" />

                            <div class="pt-2">
                              
                              <table class="w-full rg-datatable">
                                <thead class="border-b border-gray-100 w-full">
                                  <tr>
                                    <th>Date</th>
                                    <th>Api Endpoint</th>
                                    <th>Log Type</th>
                                    <th>Duration</th>
                                    <th>Status</th>
                                    <th>Report Id</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody class="w-full" style="">
                                  
                                  <tr v-for="log in logs" :key="log.id">
                                    <td>{{ formatDate(log.date) }}</td>
                                    <td class="text-bold">
                                      {{ log.api_endpoint }}
                                      <div class="text-gray-500" style="font-size: 12px;">
                                      </div>
                                    </td>
                                    <td style="position: relative;">
                                      <v-chip
                                        class=""
                                        small
                                        color="purple lighten-5"
                                        text-color="purple lighten-1"
                                      >
                                        Get
                                      </v-chip>

                                      <!-- <v-chip
                                        class=""
                                        small
                                        color="green lighten-5"
                                        text-color="green lighten-1"
                                        v-if="log.status == 'success'"
                                      >
                                      success
                                      </v-chip> -->
                                    </td>
                                    <td>{{ formatTime(log.duration) }}s</td>
                                   
                                  
                                    <td style="position: relative;">
                                      <v-chip
                                        class=""
                                        small
                                        color="orange lighten-5"
                                        text-color="orange lighten-1"
                                        v-if="log.status == 'failed'"
                                      >
                                        failed
                                      </v-chip>

                                      <v-chip
                                        class=""
                                        small
                                        color="green lighten-5"
                                        text-color="green lighten-1"
                                        v-if="log.status == 'success'"
                                      >
                                      success
                                      </v-chip>
                                    </td>
                                    <td>{{ log.report_id ? log.report_id :'-' }}</td>
                                    <td style="text-align: right;">
                                      <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer"  @click="$router.push('/logsearch/' + log.id)" style="font-size: 12px;">
                                        <span class="whitespace-no-wrap text-blue">View Results</span>
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <div class="float-right">
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
                            </div>
                        </v-card>
                    </v-container>
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
      title: "Logs | " + this.$appName
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
      perPage: 10,
      totalItems: 0,
      loading: false,
      search : null,
      fetchingSearches:null,
    }
  },
  computed: {
    ...mapState({
      user_id: state => JSON.parse(state.loginuser).id,
     
    }),
    
  },
  mounted() {
    this.fetchLogs()
  
  },
  methods: {
    openOtherWebsite() {
      window.open('https://docs.instantlyapi.com/', '_blank');
    },
    fetchLogs() {
     
      this.loading = true
      axios.get(process.env.VUE_APP_API_ENDPOINT + '/api/getlogs', {
        headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
        params: {
          page: this.currentPage,
          limit: this.perPage,
          query:this.search
        }
      })
        .then(response => {
          this.logs = response.data.logs
          this.totalItems = response.data.total
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    formatDate: function(date) {
      // return moment(String(date)).fromNow()
      return  moment(String(date)).format('MM/DD/YYYY')
    },
    formatTime: function(time) {
      return time.toFixed(2)
    },

  },
  watch: {
    currentPage(val) {
      this.fetchLogs()
    },
    perPage(val) {
      this.fetchLogs()
    },
    search(val){
      setTimeout(() => {
        this.fetchLogs()
      }, 1000);
     
    }
  }
}
</script>