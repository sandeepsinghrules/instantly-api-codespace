<template>

  <div>
    
    <div class="container flex flex-row items-top justify-between">
            <h1 class="text-lg font-semibold mt-5">Dashboard</h1>
      </div>

    <hr class="border-b border-gray-100 ">

    <v-container v-if="fetchingStats">
      <v-row> 
        <v-col
          cols="12"
          md="3"
        >
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
      </v-row>  
    </v-container>

     <div class="mx-2" v-if="!fetchingStats && dashboard_stats">
      <div class="flex flex-row flex-wrap mb-2">
        <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/4 mb-5">
          <v-card
            class="pa-2"
            tile
          >
            <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
              <div class="dashboard-box-title">Total Requests</div>

              <div class=""><strong class="text-xl">{{ dashboard_stats.total_count }}</strong></div>
              
              <div class="stats-box-icon-bg blue"></div>
              <div class="stats-box-icon">
                <svg width="30" height="30" viewBox="5 5 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1117_1999)">
                    <path d="M23.9527 23.9711C24.1618 23.7619 24.5009 23.7619 24.71 23.9711L31.0559 30.3169C31.265 30.526 31.265 30.8651 31.0559 31.0742C30.8467 31.2833 30.5077 31.2833 30.2985 31.0742L23.9527 24.7284C23.7436 24.5193 23.7436 24.1802 23.9527 23.9711Z" fill="#3EBB80" stroke="#3A9BDB"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.3294 17.6647C27.3294 12.327 23.0024 8.00001 17.6647 8.00001C12.327 8.00001 8 12.327 8 17.6647C8 23.0024 12.327 27.3294 17.6647 27.3294C23.0024 27.3294 27.3294 23.0024 27.3294 17.6647ZM25.2584 17.6647C25.2584 13.4708 21.8586 10.071 17.6647 10.071C13.4708 10.071 10.071 13.4708 10.071 17.6647C10.071 21.8586 13.4708 25.2584 17.6647 25.2584C21.8586 25.2584 25.2584 21.8586 25.2584 17.6647Z" fill="#3A9BDB"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_1117_1999">
                      <rect width="30" height="30" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>

              </div>
            </div>
          </v-card>
        </div>
        <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/4 mb-5">
          <v-card
            class="pa-2"
            tile
          >
            <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
              <div class="dashboard-box-title">Total Success</div>

              <div class=""><strong class="text-xl">{{ dashboard_stats.success_count }}</strong></div>
              
              <div class="stats-box-icon-bg blue"></div>
              <div class="stats-box-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 1024 1024"><path fill="#66bb6a" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z" /></svg>
              </div>
            </div>
          </v-card>
        </div>
        <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/4 mb-5">
          <v-card
            class="pa-2"
            tile
          >
            <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
              <div class="dashboard-box-title">Total Failed</div>

              <div class=""><strong class="text-xl">{{ dashboard_stats.failure_count }}</strong></div>
              
              <div class="stats-box-icon-bg blue"></div>
              <div class="stats-box-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z" fill="#ffa726"/></svg> 
              </div>
            </div>
          </v-card>
        </div>
        <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/4 mb-5">
          <v-card
            class="pa-2"
            tile
          >
            <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
              <div class="dashboard-box-title">Average Duration</div>

              <div class=""><strong class="text-xl"> {{ formatTime(dashboard_stats.avg_duration)}}s</strong></div>
              
              <div class="stats-box-icon-bg blue"></div>
              <div class="stats-box-icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#3A9BDB" width="27" height="25" viewBox="0 0 50 50"><path d="M7.90625 1.96875C7.863281 1.976563 7.820313 1.988281 7.78125 2C7.316406 2.105469 6.988281 2.523438 7 3L7 12L16 12C16.359375 12.003906 16.695313 11.816406 16.878906 11.503906C17.058594 11.191406 17.058594 10.808594 16.878906 10.496094C16.695313 10.183594 16.359375 9.996094 16 10L10.3125 10C14.101563 6.292969 19.277344 4 25 4C36.609375 4 46 13.390625 46 25C46 36.609375 36.609375 46 25 46C13.390625 46 4 36.609375 4 25C4 21.527344 4.855469 18.257813 6.34375 15.375L4.5625 14.46875C2.929688 17.625 2 21.207031 2 25C2 37.691406 12.308594 48 25 48C37.691406 48 48 37.691406 48 25C48 12.308594 37.691406 2 25 2C18.773438 2 13.140625 4.503906 9 8.53125L9 3C9.011719 2.710938 8.894531 2.433594 8.6875 2.238281C8.476563 2.039063 8.191406 1.941406 7.90625 1.96875 Z M 25 5C24.449219 5 24 5.449219 24 6C24 6.550781 24.449219 7 25 7C25.550781 7 26 6.550781 26 6C26 5.449219 25.550781 5 25 5 Z M 34.34375 7.5625C34.058594 7.601563 33.78125 7.761719 33.625 8.03125C33.347656 8.507813 33.523438 9.128906 34 9.40625C34.476563 9.683594 35.097656 9.507813 35.375 9.03125C35.652344 8.554688 35.476563 7.964844 35 7.6875C34.878906 7.617188 34.753906 7.578125 34.625 7.5625C34.527344 7.550781 34.4375 7.550781 34.34375 7.5625 Z M 41.34375 14.5C41.214844 14.515625 41.058594 14.554688 40.9375 14.625C40.460938 14.902344 40.316406 15.523438 40.59375 16C40.871094 16.476563 41.460938 16.652344 41.9375 16.375C42.414063 16.097656 42.589844 15.476563 42.3125 15C42.105469 14.640625 41.730469 14.453125 41.34375 14.5 Z M 17 18.53125C14.054688 18.53125 12.34375 20.882813 12.34375 24.875C12.34375 26.3125 12.582031 27.492188 13.0625 28.4375C13.828125 30.011719 15.191406 30.90625 16.9375 30.90625C19.433594 30.90625 21.1875 29.179688 21.1875 26.78125C21.1875 24.503906 19.578125 22.84375 17.34375 22.84375C15.949219 22.84375 14.820313 23.492188 14.25 24.625L14.09375 24.625C14.132813 21.792969 15.1875 20.15625 17 20.15625C18.070313 20.15625 18.894531 20.753906 19.1875 21.71875L21.03125 21.71875C20.671875 19.792969 19.082031 18.53125 17 18.53125 Z M 27.6875 18.53125C24.953125 18.53125 23.3125 20.824219 23.3125 24.71875C23.3125 28.636719 24.9375 30.875 27.6875 30.875C30.429688 30.875 32 28.628906 32 24.71875C32 20.816406 30.40625 18.53125 27.6875 18.53125 Z M 27.6875 20.15625C29.269531 20.15625 30.15625 21.765625 30.15625 24.71875C30.15625 27.707031 29.289063 29.28125 27.6875 29.28125C26.085938 29.28125 25.15625 27.699219 25.15625 24.71875C25.15625 21.773438 26.105469 20.15625 27.6875 20.15625 Z M 36.59375 23.5625C35.03125 23.5625 33.9375 24.433594 33.9375 25.65625C33.9375 26.683594 34.53125 27.25 35.84375 27.5625L37.0625 27.84375C37.753906 28.007813 38.0625 28.273438 38.0625 28.6875C38.0625 29.238281 37.476563 29.625 36.625 29.625C35.800781 29.625 35.265625 29.3125 35.09375 28.78125L33.75 28.78125C33.871094 30.007813 34.949219 30.75 36.59375 30.75C38.246094 30.75 39.4375 29.863281 39.4375 28.5625C39.4375 27.546875 38.8125 26.992188 37.5 26.6875L36.375 26.40625C35.625 26.234375 35.28125 25.976563 35.28125 25.5625C35.28125 25.023438 35.832031 24.65625 36.59375 24.65625C37.367188 24.65625 37.871094 24.992188 38 25.5L39.3125 25.5C39.179688 24.28125 38.148438 23.5625 36.59375 23.5625 Z M 6 24C5.449219 24 5 24.449219 5 25C5 25.550781 5.449219 26 6 26C6.550781 26 7 25.550781 7 25C7 24.449219 6.550781 24 6 24 Z M 44 24C43.449219 24 43 24.449219 43 25C43 25.550781 43.449219 26 44 26C44.550781 26 45 25.550781 45 25C45 24.449219 44.550781 24 44 24 Z M 16.9375 24.40625C18.382813 24.40625 19.375 25.414063 19.375 26.84375C19.375 28.230469 18.308594 29.28125 16.90625 29.28125C15.503906 29.28125 14.4375 28.214844 14.4375 26.8125C14.4375 25.417969 15.5 24.40625 16.9375 24.40625 Z M 8.4375 33.5C8.308594 33.515625 8.152344 33.554688 8.03125 33.625C7.554688 33.902344 7.410156 34.523438 7.6875 35C7.964844 35.476563 8.554688 35.652344 9.03125 35.375C9.507813 35.097656 9.683594 34.476563 9.40625 34C9.199219 33.640625 8.824219 33.453125 8.4375 33.5 Z M 41.28125 33.5C41.003906 33.550781 40.75 33.730469 40.59375 34C40.316406 34.476563 40.492188 35.097656 40.96875 35.375C41.445313 35.652344 42.035156 35.476563 42.3125 35C42.589844 34.523438 42.445313 33.902344 41.96875 33.625C41.847656 33.554688 41.691406 33.515625 41.5625 33.5C41.464844 33.488281 41.375 33.484375 41.28125 33.5 Z M 15.34375 40.46875C15.058594 40.519531 14.78125 40.699219 14.625 40.96875C14.347656 41.445313 14.523438 42.035156 15 42.3125C15.476563 42.589844 16.097656 42.445313 16.375 41.96875C16.652344 41.492188 16.476563 40.871094 16 40.59375C15.878906 40.523438 15.753906 40.484375 15.625 40.46875C15.527344 40.457031 15.4375 40.453125 15.34375 40.46875 Z M 34.375 40.46875C34.246094 40.484375 34.121094 40.523438 34 40.59375C33.523438 40.871094 33.347656 41.492188 33.625 41.96875C33.902344 42.445313 34.523438 42.589844 35 42.3125C35.476563 42.035156 35.652344 41.445313 35.375 40.96875C35.167969 40.609375 34.761719 40.421875 34.375 40.46875 Z M 25 43C24.449219 43 24 43.449219 24 44C24 44.550781 24.449219 45 25 45C25.550781 45 26 44.550781 26 44C26 43.449219 25.550781 43 25 43Z"/></svg>
              </div>
            </div>
          </v-card>
        </div>
      </div>
    </div>



    <div class="mx-3" >


        <div class="flex flex-row flex-wrap">
          <!-- left side section -->
          <div :class="'w-full lg:w-2/3' + (($vuetify.breakpoint.xs) ? '' : ' pr-5')">
            <div class="text-gray-600 text-md text-bold mb-4">Api Requests</div>

              <!-- <div v-if="!logs">
                <v-skeleton-loader
                  type="article"
                  class="mb-4"
                ></v-skeleton-loader>
              </div> -->
           
              <div >
                <div class="dashboard-box">
                  <v-card
                    class="pa-2"
                    tile
                  >
                    <div class="p-3">
                      <div>
                        <apexchart
                          type="line"
                          :options="chartOptions"
                          :series="chartSeries"
                          height="400"
                          width="100%"
                        />
                      </div>
                    </div>
                  </v-card>
                </div>
              </div>
              <div class="text-gray-600 text-md text-bold mb-2 mt-10">Your API access key</div>
              <div class="dashboard-box">
                <div class=" p-5  v-card v-sheet theme--light rounded-0">
                <div class="text-center pa-4 mt-2" v-if="!$store.getters.UserApi">
                    No Api Key Available
                </div>
                
                <div class="pa-4 mt-2 text-center" v-if="$store.getters.UserApi">
                    This is your API Access Key, your personal key required to authenticate with the API .
                    <p class="mt-2  mb-2"><strong>{{ $store.getters.UserApi }}</strong></p>
                </div>
              </div>
              </div>

          </div>

          <!-- right side section  -->


          <div :class="'w-full lg:w-1/3' + (($vuetify.breakpoint.xs) ? '' : ' pl-5')">
            <div class="text-gray-600 text-md text-bold mb-4">Recent Logs ({{ logs.length }})</div>

            <div v-if="logs === null">
              <v-skeleton-loader
                type="article"
                class="mb-4"
              ></v-skeleton-loader>

              <v-skeleton-loader
                type="article"
                class="mb-4"
              ></v-skeleton-loader>

              <v-skeleton-loader
                type="article"
              ></v-skeleton-loader>
            </div>

            <div v-else v-for="log in logs" :key="log.id" class="dashboard-box mb-4">
              <v-card
                class="pa-2"
                tile
              >
                <div class="p-2">
                  <div style="word-break: break-word;">

                    <div class="float-right">
                      <span style="font-size: 12px; color: #757B89;">
                        {{ formatDate(log.date) }}
                      </span>
                      <div class="pt-4 text-right">
                        <router-link :to="'/logsearch/' + log.id">
                          <span style="color: #3A9BDB; opacity: 0.7; font-size: 12px; font-weight: bold;">View Results</span>
                        </router-link>
                      </div>
                    </div>

                    <strong>
                      <span class="text-lg">{{ log.api_endpoint }}</span>  
                      <br />
                      <v-chip
                        class=" mt-2"
                        small
                        color="purple lighten-5"
                        text-color="purple lighten-1"
                      >
                      Get
                      </v-chip>

                      <v-chip
                        class="ml-3 mt-2"
                        small
                        color="orange lighten-5"
                        text-color="orange lighten-1"
                        v-if="log.status == 'failed'"
                      >
                        failed
                      </v-chip>

                      <v-chip
                        class="ml-3 mt-2"
                        small
                        color="green lighten-5"
                        text-color="green lighten-1"
                        v-if="log.status == 'success'"
                      >
                        success
                      </v-chip>

                     
                    </strong>

                    <div class="text-gray-600 pt-3" style="font-size: 12px;">
                      <i class="mdi mdi-clock-time-three-outline mr-1" style="font-size: 16px;"></i> {{ log.duration }}s
                    </div>
                  </div>
                  <div style="clear: both;"></div>
                  <!-- <v-progress-linear
                    class="mt-3"
                    color="blue lighten-2"
                    buffer-value="0"
                    stream
                    :value="search.percentage_completed"
                    v-if="search.status == 'pending'"
                  ></v-progress-linear> -->
                </div>
              </v-card>
            </div>
            <div v-if="!fetchingStats && dashboard_stats"  class="d-flex justify-center">
              <div class="bg-blue-500 float-right hover:bg-blue-400 text-white text-sm inline-block rounded py-2 px-3 cursor-pointer" @click="$router.push('/logs')">View All</div>
            </div>
            <div v-if="logs !== null && logs.length == 0">
              <div class="dashboard-box">
                <v-card
                  class="pa-2"
                  tile
                >
                  <div class="p-4 text-center text-gray-600 text-sm">
                    No logs found.
                  </div>
                </v-card>
              </div>
            </div>
          </div>
        </div>

        <br clear="all" />

    </div>



  </div>

</template>

<script>
import { mapState,mapGetters  } from 'vuex'
import axios from 'axios'
import $ from 'jquery'
import moment from 'moment'


export default {
  components: {
    
  },
  data () {
    return {
      fetchingStats:false,
      dashboard_stats: null,
      logs: [],
      
    }
  },
 computed: {
    ...mapState({
      user_id: state => JSON.parse(state.loginuser).id,
      categories: state => state.dashboardapex.categories,
      totalData: state => state.dashboardapex.total,
      successData: state => state.dashboardapex.success,
      failedData: state => state.dashboardapex.failed,
    }),
    chartOptions() {
      return {
        chart: {
          height: 400,
          width: '100%',
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        noData: {
          text: 'No activity has been detected in the last 30 days.',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: '14px',
            color: '#969696'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        xaxis: {
          categories: this.categories
        }
      }
    },
    chartSeries() {
      return [{
        name: 'Total Requests',
        data: this.totalData,
        color: '#818181'
      }, {
        name: 'Successful Requests',
        data: this.successData,
        color: '#01E601'
      }, {
        name: 'Failed Requests',
        data: this.failedData,
        color: '#FF0000'
      }]
    }
  },
  methods: {
    formatDate: function(date) {
      return moment(String(date)).fromNow()
    },

    
    formatTime: function(time) {
      return time.toFixed(2)
    },
    async getDashboardStats() {
      this.fetchingStats = true;
      axios.get(process.env.VUE_APP_API_ENDPOINT + '/api/get-dashboard-stats', {
        headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
        // params: {
        //   userid: this.user_id,
        // }
      })
        .then(response => {
        if(response.data.results[0].total_count != 0){
          this.dashboard_stats = response.data.results[0]
        }else{
          this.dashboard_stats = null;
        }

        })
        .catch(error => {
          console.log(error)
        })
      this.fetchingStats = false;

      // this.dashboard_stats = response.data.stats;
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
   fetchLogsGraph() {
     this.loading = true
    this.$store.dispatch('dashboardapex/setDashboardGraph',this.user_id);

   },


   

 

  
  },
  created() {
    this.getDashboardStats();
    this.fetchLogs();
    this.fetchLogsGraph();
  },
 
  watch: {
    
  }
}
</script>