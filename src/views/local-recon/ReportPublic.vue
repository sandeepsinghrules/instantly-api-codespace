<template>
    <div style="height: 100%; background: #f5f5f5;">
      <div v-if="!loading">
        <div v-if="widget.properties.view_gate.visible && typeof(search.properties.view_gate_submitted) == 'undefined'" class="fixed top-0 left-0 h-full w-full flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2); z-index: 8;">
          <div class="w-full sm:w-1/2 lg:w-2/6 bg-white rounded-lg mx-6">

            <div class="p-6">
                <div>
                    <div style="text-align: center;" class="mb-4" v-if="widget.properties.view_gate.show_headline == true">
                        <h3 class="pt-2">{{ widget.properties.view_gate.headline_text }}</h3>
                    </div>

                    <div class="flex flex-wrap">
                        <div v-if="widget.properties.view_gate.first_name_visible" :class="((!widget.properties.view_gate.first_last_one_line || !widget.properties.view_gate.last_name_visible) ? 'w-full mb-3 md:mb-0' : 'w-full md:w-1/2 pr-3 mb-3 md:mb-0')">
                            <input name="first_name" ref="view_gate_first_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.view_gate.first_placeholder_text">
                        </div>
                        <div v-if="widget.properties.view_gate.last_name_visible" :class="((!widget.properties.view_gate.first_last_one_line || !widget.properties.view_gate.first_name_visible) ? 'w-full mb-3 md:mb-0' : 'w-full md:w-1/2 md:mb-0')">
                            <input name="last_name" ref="view_gate_last_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.view_gate.last_placeholder_text">
                        </div>
                    </div>

                    <div class="mb-2">
                        <input name="email" ref="view_gate_email" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.view_gate.email_placeholder_text">
                    </div>

                    <div style="text-align: center;" class="">
                        <div class="text-white inline-block rounded py-3 px-5 cursor-pointer" @click="submitViewGate()" v-bind:style="{ backgroundColor: widget.properties.view_gate.submit_button_color }">{{ widget.properties.view_gate.submit_button_text }}</div>

                        <div v-if="widget.properties.view_gate.show_spam_disclaimer" class="text-xs text-gray-700 mt-5">
                            <i class="fa fa-lock"></i> &nbsp;{{ widget.properties.view_gate.spam_disclaimer_text}}
                        </div>
                    </div>
                </div>

                <div style="clear: both;"></div>

                <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

            </div>
          </div>
        </div>

        <div v-if="showHelpRequestModal" class="fixed top-0 left-0 h-full w-full flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2); z-index: 8;">
          <div class="w-full sm:w-1/2 lg:w-2/5 bg-white rounded-lg mx-6">

          <div class="p-6">

              <div>
                  <div style="text-align: center;" class="mb-4">
                      <h2 class="pt-2" style="font-weight: bold;">{{ widget.properties.action_options.header_text_top_fixing_listing }}</h2>
                      <h3 class="pt-2">{{ widget.properties.action_options.header_text_bottom_fixing_listing }}</h3>
                  </div>

                  <div v-if="widget.properties.action_options.first_name_visible" class="mb-2">
                      <input name="first_name" ref="first_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.action_options.first_placeholder_text">
                  </div>

                  <div v-if="widget.properties.action_options.last_name_visible" class="mb-2">
                      <input name="last_name" ref="last_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.action_options.last_placeholder_text">
                  </div>

                  <div class="mb-2">
                      <input name="email" ref="email" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.action_options.email_placeholder_text">
                  </div>

                  <div class="mb-2">
                      <input name="company_name" ref="company_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" :placeholder="'Company Name...'">
                  </div>

                  <div class="mb-2">
                      <input name="company_address" ref="company_address" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" :placeholder="'Company Address...'">
                  </div>

                  <div class="flex flex-wrap">
                      <div class="w-full md:w-1/3 pr-3 mb-6 md:mb-0">
                          <input class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" id="grid-first-name" type="text" ref="city" placeholder="City...">
                      </div>
                      <div class="w-full md:w-1/3 px-3 mb-6">
                          <input class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" id="grid-last-name" type="text" ref="state" placeholder="State...">
                      </div>
                      <div class="w-full md:w-1/3 pl-3 mb-6">
                          <input class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" id="grid-last-name" type="text" ref="zip" placeholder="Zip...">
                      </div>
                  </div>

                  <div style="text-align: center;" class="">
                      <div class="text-white inline-block rounded py-3 px-5 cursor-pointer" @click="submitGetHelp()" v-bind:style="{ backgroundColor: widget.properties.action_options.button_color }">{{ widget.properties.action_options.submit_button_text }}</div>

                      <div v-if="widget.properties.action_options.spam_disclaimer_visible" class="text-xs text-gray-700 mt-5">
                          <i class="fa fa-lock"></i> &nbsp;{{ widget.properties.action_options.spam_disclaimer_text }}
                      </div>
                  </div>
              </div>

              <div style="clear: both;"></div>

              <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

          </div>

          <div class="bg-gray-100 rounded-b-lg px-6 py-4">

              <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="showHelpRequestModal = false">
                  Close
              </button>

          </div>



          </div>
      </div>
      </div>

      <div v-if="widget" style="height: 100%;">
        <v-footer
          color="primary lighten-1"
          padless
        >
          <v-row
            justify="center"
            no-gutters
          >
            <v-col
              class="primary lighten-2 py-4 white--text"
              cols="12"
            >
              <div class="container" style="max-width: 1000px;">
                <div class="float-right">
                  <v-btn
                    class="-mt-2"
                    color="success"
                    @click="showHelpRequestModal = true"
                  >
                    <i class="fa fa-info"></i> &nbsp; &nbsp; Get Help
                  </v-btn>
                </div>
                {{ search.keyword }}
              </div>
            </v-col>
          </v-row>
        </v-footer>

        <div :class="(((widget.properties.view_gate.visible && typeof(search.properties.view_gate_submitted) == 'undefined') || loading) ? 'blur' : '') + ' container mt-2'" style="max-width: 1000px; height: calc(100% - 100px);">
          <v-card
            class="mx-auto"
            outlined
          >
            <v-list-item v-if="search.search_type == 'business_audit'">
              <v-list-item-content style="">
                <strong class="mt-2">{{ search.keyword }}</strong>
                
                <div class="mt-2" style="font-size: 14px;">
                  {{ search.properties.formatted_address }}
                </div>

                <div v-if="search.properties.formatted_phone_number" class="mt-1" style="font-size: 14px;">
                  {{ search.properties.formatted_phone_number }}
                </div>

                <div v-if="search.properties.website" class="website mt-1" style="color: #AAAAAA;">{{ search.properties.website }}</div>

                <v-divider class="mt-6 mb-6">

                </v-divider>

                <strong class="">Frequently Used Keywords</strong>

                <div class="mt-2" style="font-size: 14px;">
                  Positive and negative words that frequently appeared in your reviews.
                </div>

                <v-card
                  class="mx-auto mt-4"
                  outlined
                >
                  <v-list-item>
                  <v-list-item-content> 
                    <div style="text-align: center;" v-html="faq_keywords"></div>
                  </v-list-item-content>
                  </v-list-item>
                </v-card>

                <div style="clear: all"></div>
                
                <div class="mt-5" style="background: #25aa99; padding: 10px; color: #FFFFFF;">
                  <div class="float-right">
                    <strong style="padding-right: 10px;">Rating:</strong><strong id="total_rating">{{ search.properties.rating || 0 }}</strong> out of <strong id="total_reviews_here">{{ search.properties.user_ratings_total || 0 }}</strong> reviews
                  </div>

                  <strong class="">Recent Reviews</strong>
                </div>

                <div v-html="reviews_html"></div>

                <v-divider class="mt-6 mb-6">

                </v-divider>
                
                <div style="background: #d61818; padding: 10px; color: #FFFFFF;">
                  <strong class="">Negative Reviews</strong>
                </div>

                <div v-html="negative_reviews_html"></div>

                <v-divider class="mt-6 mb-6">

                </v-divider>
                
                <div style="background: #318dca; padding: 10px; color: #FFFFFF;">
                  <strong class="">Sentiment Analysis</strong>
                </div>

                <div v-if="sentiment_data.length == 0">
                  <div class="pt-2">No data available.</div>
                </div>
                
                <div class="flex flex-wrap mt-5">
                  <div 
                    v-for="(sentimentItem, index) in sentiment_data"
                    :key="index"
                    class="w-full md:w-1/3 pr-5 mb-6">
                    <div>
                      <div v-if="index < 3">
                        <div style="font-weight: bold; clear: both; margin-bottom: -23px;">Keyword</div>

                        <div class="flex flex-wrap mt-2">
                          <div class="w-full md:w-1/3">
                            &nbsp;
                          </div>
                          <div class="w-full md:w-2/3">
                            <div style="float: left; font-size: 12px;">
                              Positive
                            </div>
                            <div style="float: right; font-size: 12px;">
                              Negative
                            </div>
                            <div style="clear: both;"></div>
                          </div>
                        </div>

                        <hr class="mt-2 mb-2" />
                      </div>

                      <div class="flex flex-wrap mt-2">
                        <div class="w-full md:w-1/3">
                          <v-chip color="#318dca" text-color="white" style="font-weight: bold;">{{ sentimentItem.keyword }}</v-chip>
                        </div>
                        <div class="w-full md:w-2/3">
                          <b-progress class="mt-2" :max="sentimentItem.occurrences_total" show-value>
                            <b-progress-bar :value="sentimentItem.occurrences_positive" variant="success"></b-progress-bar>
                            <b-progress-bar :value="sentimentItem.occurrences_negative" variant="danger"></b-progress-bar>
                          </b-progress>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="search.search_type == 'seo_audit'">
              <object :data="search.properties.data.output.pdf" type="application/pdf" width="100%" height="100%">
                  <p>It appears you don't have a PDF plugin for this browser.
                  No biggie... you can <a href="myfile.pdf">click here to
                  download the PDF file.</a></p>
              </object>
            </v-list-item>
          </v-card>
        </div>
      </div>

      <div v-if="loading" class="fixed top-0 left-0 h-full w-full flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2); z-index: 8;">
          <div class="w-full bg-white rounded-lg mx-6" style="width: 700px; max-width: 100%;">

            <div class="p-6">
                <div v-if="search.search_type == 'business_audit'">
                  <h4 class="main-title"><strong>Scanning To Find Your Online Presence</strong></h4>

                  <h5 class="sub-title">This Can Take Up To A Minute ...  </h5>

                  <div style="clear: both;"></div>

                  <hr class="mb-6" />

                  <div style="clear: both;"></div>

                  <div style="float: left; width: 20%; text-align: center; font-size: 13px; font-weight: normal; position: relative;">
                    <v-progress-circular
                      indeterminate
                      size="80"
                      width="10"
                      color="primary"
                      class="mr-6 mb-2"
                    ></v-progress-circular>
                    <i class="fa fa-briefcase" style="font-size: 20px; color: #1976d2; position: absolute; margin-top: -57px; margin-left: 4px; left: 0px; right: 0px;"></i>
                    Company<br /> Information
                  </div>
                  <div style="float: left; width: 20%; text-align: center; font-size: 13px; font-weight: normal; position: relative;">
                    <v-progress-circular
                      indeterminate
                      size="80"
                      width="10"
                      color="primary"
                      class="mr-6 mb-2"
                    ></v-progress-circular>
                    <i class="fa fa-clock" style="font-size: 20px; color: #1976d2; position: absolute; margin-top: -57px; margin-left: 4px; left: 0px; right: 0px;"></i>
                    Frequently<br /> Used Keywords
                  </div>
                  <div style="float: left; width: 20%; text-align: center; font-size: 13px; font-weight: normal; position: relative;">
                    <v-progress-circular
                      indeterminate
                      size="80"
                      width="10"
                      color="primary"
                      class="mr-6 mb-2"
                    ></v-progress-circular>
                    <i class="fa fa-star" style="font-size: 20px; color: #1976d2; position: absolute; margin-top: -57px; margin-left: 4px; left: 0px; right: 0px;"></i>
                    Recent<br /> Reviews
                  </div>
                  <div style="float: left; width: 20%; text-align: center; font-size: 13px; font-weight: normal; position: relative;">
                    <v-progress-circular
                      indeterminate
                      size="80"
                      width="10"
                      color="primary"
                      class="mr-6 mb-2"
                    ></v-progress-circular>
                    <i class="fa fa-star-half" style="font-size: 20px; color: #1976d2; position: absolute; margin-top: -57px; margin-left: 4px; left: 0px; right: 0px;"></i>
                    Negative<br /> Reviews
                  </div>
                  <div style="float: left; width: 20%; text-align: center; font-size: 13px; font-weight: normal; position: relative;">
                    <v-progress-circular
                      indeterminate
                      size="80"
                      width="10"
                      color="primary"
                      class="mr-6 mb-2"
                    ></v-progress-circular>
                    <i class="fa fa-percent" style="font-size: 20px; color: #1976d2; position: absolute; margin-top: -57px; margin-left: 4px; left: 0px; right: 0px;"></i>
                    Sentiment<br /> Analysis
                  </div>
                </div>

                <div v-if="search.search_type == 'seo_audit'">
                  <h4 class="main-title"><strong>Scanning To Find Your Technical and SEO mistakes</strong></h4>

                  <h5 class="sub-title">This Can Take Up To A Minute ...  </h5>

                  <div style="clear: both;"></div>

                  <hr class="mb-6" />

                  <div style="clear: both;"></div>

                  <div style="float: left; width: 20%; text-align: center; font-size: 13px; font-weight: normal; position: relative;">
                    <v-progress-circular
                      indeterminate
                      size="80"
                      width="10"
                      color="primary"
                      class="mr-6 mb-2"
                    ></v-progress-circular>
                    <i class="fa fa-desktop" style="font-size: 20px; color: #1976d2; position: absolute; margin-top: -57px; margin-left: 4px; left: 0px; right: 0px;"></i>
                    On-Page<br /> SEO
                  </div>
                  <div style="float: left; width: 20%; text-align: center; font-size: 13px; font-weight: normal; position: relative;">
                    <v-progress-circular
                      indeterminate
                      size="80"
                      width="10"
                      color="primary"
                      class="mr-6 mb-2"
                    ></v-progress-circular>
                    <i class="fa fa-link" style="font-size: 20px; color: #1976d2; position: absolute; margin-top: -57px; margin-left: 4px; left: 0px; right: 0px;"></i>
                    Rankings<br /> and Backlinks
                  </div>
                  <div style="float: left; width: 20%; text-align: center; font-size: 13px; font-weight: normal; position: relative;">
                    <v-progress-circular
                      indeterminate
                      size="80"
                      width="10"
                      color="primary"
                      class="mr-6 mb-2"
                    ></v-progress-circular>
                    <i class="fa fa-chart-bar" style="font-size: 20px; color: #1976d2; position: absolute; margin-top: -57px; margin-left: 4px; left: 0px; right: 0px;"></i>
                    Performance<br /> Results
                  </div>
                  <div style="float: left; width: 20%; text-align: center; font-size: 13px; font-weight: normal; position: relative;">
                    <v-progress-circular
                      indeterminate
                      size="80"
                      width="10"
                      color="primary"
                      class="mr-6 mb-2"
                    ></v-progress-circular>
                    <i class="fa fa-users" style="font-size: 20px; color: #1976d2; position: absolute; margin-top: -57px; margin-left: 4px; left: 0px; right: 0px;"></i>
                    Social<br /> Results
                  </div>
                  <div style="float: left; width: 20%; text-align: center; font-size: 13px; font-weight: normal; position: relative;">
                    <v-progress-circular
                      indeterminate
                      size="80"
                      width="10"
                      color="primary"
                      class="mr-6 mb-2"
                    ></v-progress-circular>
                    <i class="fa fa-memory" style="font-size: 20px; color: #1976d2; position: absolute; margin-top: -57px; margin-left: 4px; left: 0px; right: 0px;"></i>
                    Technology<br /> Results
                  </div>
                </div>

                <div style="clear: both;"></div>

                <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

            </div>
          </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import { mapState } from 'vuex'
import urlParser from 'url-parse'
import PanelNavigation from '@/components/PanelNavigation.vue'
import MenuWidgetActions from '@/components/menus/menuWidgetActions.vue'
import moment from 'moment'
import $ from 'jquery'

export default {
  metaInfo () {
    return {
      title: "Report | " + this.$appName
    }
  },
  data () {
    return {
      loading: true,
      currentLoadingText: 1,

      widget: false,
      search: false,

      faq_keywords: "",
      reviews_html: "",
      negative_reviews_html: "",

      sentiment_data: [],

      showHelpRequestModal: false
    }
  },
  methods: {
    async loadReport() {
      let self = this;

      let url = process.env.VUE_APP_API_ENDPOINT + '/local-recon/get-report?s=' + this.$route.query.s + '&p=' + this.$route.query.p;
      
      let response = await axios.get(url, {

      })

      console.log(response);

      this.widget = response.data.widget;
      this.search = response.data.search;

      if (this.search.search_type == "business_audit") {
        setTimeout(function() {
          self.loading = false;
        }, 2000);
        this.buildFuk();
      }

      if (this.search.search_type == "seo_audit") {
        if (this.search.properties.success) {
          setTimeout(function() {
            self.loading = false;
          }, 2000);
          
          console.log(this.search.properties.data.output.pdf);
        }
        else {
          console.log('keep retrying...');
          this.loading = true;
          setTimeout(function() {
            self.loadReport();
          }, 1000);
        }
      }
    },
    async submitViewGate() {
      if (this.widget.properties.view_gate.first_name_visible && this.widget.properties.view_gate.first_name_mandatory) {
        if (this.$refs.view_gate_first_name.value.trim() == "") {
          this.$swal({
            icon: 'error',
            // title: "First Name",
            html: "Please enter your first name.",
            confirmButtonText: 'OK'
          }).then(function() {

          });
          return;
        }
      }

      if (this.widget.properties.view_gate.last_name_visible && this.widget.properties.view_gate.last_name_mandatory) {
        if (this.$refs.view_gate_last_name.value.trim() == "") {
          this.$swal({
            icon: 'error',
            // title: "First Name",
            html: "Please enter your last name.",
            confirmButtonText: 'OK'
          }).then(function() {

          });
          return;
        }
      }

      if (!this.validateEmail(this.$refs.view_gate_email.value.trim())) {
        this.$swal({
          icon: 'error',
          // title: "Error",
          html: "Please enter a valid email address.",
          confirmButtonText: 'OK'
        }).then(function() {

        });
        return;
      }
        
      let url = process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-view-gate?s=' + this.$route.query.s + '&p=' + this.$route.query.p;
      
      let response = await axios.post(url, {
        first_name: this.$refs.view_gate_first_name.value.trim(),
        last_name: this.$refs.view_gate_last_name.value.trim(),
        email: this.$refs.view_gate_email.value.trim()
      } , {
          headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          },
      })

      location.reload(true);
    },
    async submitGetHelp() {
      if (this.widget.properties.action_options.first_name_visible && this.widget.properties.action_options.first_name_mandatory) {
        if (this.$refs.first_name.value.trim() == "") {
          this.$swal({
            icon: 'error',
            // title: "First Name",
            html: "Please enter your first name.",
            confirmButtonText: 'OK'
          }).then(function() {

          });
          return;
        }
      }

      if (this.widget.properties.action_options.last_name_visible && this.widget.properties.action_options.last_name_mandatory) {
        if (this.$refs.last_name.value.trim() == "") {
          this.$swal({
            icon: 'error',
            // title: "First Name",
            html: "Please enter your last name.",
            confirmButtonText: 'OK'
          }).then(function() {

          });
          return;
        }
      }

      if (!this.validateEmail(this.$refs.email.value.trim())) {
        this.$swal({
          icon: 'error',
          // title: "Error",
          html: "Please enter a valid email address.",
          confirmButtonText: 'OK'
        }).then(function() {

        });
        return;
      }
        
      let url = process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-get-help?s=' + this.$route.query.s + '&p=' + this.$route.query.p;
      
      let response = await axios.post(url, {
        first_name: this.$refs.first_name.value.trim(),
        last_name: this.$refs.last_name.value.trim(),
        email: this.$refs.email.value.trim(),
        company_name: this.$refs.company_name.value.trim(),
        company_address: this.$refs.company_address.value.trim(),
        city: this.$refs.city.value.trim(),
        state: this.$refs.state.value.trim(),
        zip: this.$refs.zip.value.trim()
      })

      this.$swal({
        title: "Thank you!",
        text: "Thank you for contacting us! We will get back to you soon.",
        showCancelButton: false,
        confirmButtonText: 'Close'
      }).then(function() {
        
      });

      this.showHelpRequestModal = false
    },
    buildFuk() {
      let all_reviews_text = '';
      let reviews_html = '';
      let negative_reviews_html = '';

      let place = this.search.properties;

      if (typeof(place.reviews) == "undefined")
        place.reviews = [];

      if (place.reviews.length == 0) {
          reviews_html = '<div class="pt-2">No reviews found.</div>';
      }
      else {
          for (var i in place.reviews) {
              let stars_html = '';

              for (var j = 0; j < 5; j++) {
                  if (j + 1 <= place.reviews[i].rating)
                  stars_html += '<i class="fa fa-star" style="color: rgb(242, 201, 76); font-size: 20px; margin-left: 2px;"></i>';
                  else
                  stars_html += '<i class="fa fa-star-o" style="font-size: 20px; margin-left: 2px;"></i>';
              }

              let this_html = '<div style="padding: 15px; border: solid 1px #CCCCCC; margin-top: 15px;">\
                  <div style="float: left;">\
                      <img src="https://rtx-source-icons.s3.amazonaws.com/logos/google.png" style="height: 40px;" />\
                  </div>\
                  <div style="float: right; padding-top: 10px;">\
                  ' + stars_html + '\
                  </div>\
                  <br clear="all" />\<br clear="all" />\
                  <div style="margin-top: -10px;"><strong>' + place.reviews[i].author_name + '</strong> <em style="font-size: 11px;">' + moment(place.reviews[i].relative_time_description).fromNow() + '</em></div>\
                  <div style="font-size: 12px; line-height: 20px; padding-top: 5px;">\
                      ' + place.reviews[i].text + '\
                  </div>\
              </div>';

              reviews_html += this_html;

              if (place.reviews[i].rating < 3)
                negative_reviews_html += this_html;

              all_reviews_text += place.reviews[i].text;
          }
      }

      if (negative_reviews_html == '')
        negative_reviews_html = '<div class="pt-2">No reviews found.</div>';

      this.reviews_html = reviews_html;
      this.negative_reviews_html = negative_reviews_html;

      let nthMostComm =this. nthMostCommon(all_reviews_text, 9);

      let faq_keywords_html = '';

      for (var i in nthMostComm) {
          if (nthMostComm[i].word != "undefined")
              faq_keywords_html += '<span style="margin-right: 12px; color: #31af91; font-weight: bold; font-size: 16px;">' + nthMostComm[i].word + '</span>';
      }

      let nthMostCommSentimentAnalysis = this.nthMostCommon(all_reviews_text, 13);

      for (var i in nthMostCommSentimentAnalysis) {
        if (nthMostCommSentimentAnalysis[i].word != "undefined") {
          let thisSentimentData = {
            keyword: nthMostCommSentimentAnalysis[i].word,
            occurrences_positive: 0,
            occurrences_negative: 0,
            occurrences_total: 0,
            occurrences_positive_percentage: 0.00,
            occurrences_negative_percentage: 0.00
          }

          for (var j in place.reviews) {
            let thisReview = place.reviews[j];

            if (thisReview.text.indexOf(thisSentimentData.keyword) != -1) {
              thisSentimentData.occurrences_total++;

              if (thisReview.rating < 3)
                thisSentimentData.occurrences_negative++;
              else
                thisSentimentData.occurrences_positive++;
            }
          }

          thisSentimentData.occurrences_positive_percentage = (thisSentimentData.occurrences_positive/thisSentimentData.occurrences_total) * 100;
          thisSentimentData.occurrences_negative_percentage = (thisSentimentData.occurrences_negative/thisSentimentData.occurrences_total) * 100;

          if (isNaN(thisSentimentData.occurrences_positive_percentage)) thisSentimentData.occurrences_positive_percentage = 0.00;
          if (isNaN(thisSentimentData.occurrences_negative_percentage)) thisSentimentData.occurrences_negative_percentage = 0.00;
        
          this.sentiment_data.push(thisSentimentData);
        }
      }
      
      console.log('nthMostCommSentimentAnalysis', nthMostCommSentimentAnalysis);
      
      this.faq_keywords = faq_keywords_html || "no words found";
    },
    nthMostCommon(string, amount) {
        string = string.replace(/\./g, ' ');

        var wordsArray = string.split(/\s/);

        let exclusion_list = ['the','be','to','of','and','a','in','that','have','i','it','for','not','on','with','he','as','you','do','at','this','but','his','by','from','they','we','say','her','she','or','an','will','my','one','all','would','there','their','what','so','up','out','if','about','who','get','which','go','me','when','make','can','like','time','no','just','him','know','take','people','into','year','your','good','some','could','them','see','other','than','then','now','look','only','come','its','over','think','also','back','after','use','two','how','our','work','first','well','way','even','new','want','because','any','these','give','day','most','us'];

        for (var i in wordsArray) {
            if (wordsArray[i].length < 4 || exclusion_list.indexOf(wordsArray[i].toLowerCase()) != -1)
                delete wordsArray[i]
        }

        var wordOccurrences = {}
        for (var i = 0; i < wordsArray.length; i++) {
            wordOccurrences['_'+wordsArray[i]] = ( wordOccurrences['_'+wordsArray[i]] || 0 ) + 1;
        }
        var result = Object.keys(wordOccurrences).reduce(function(acc, currentKey) {
            /* you may want to include a binary search here */
            for (var i = 0; i < amount; i++) {
                if (!acc[i]) {
                    acc[i] = { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] };
                    break;
                } else if (acc[i].occurences < wordOccurrences[currentKey]) {
                    acc.splice(i, 0, { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] });
                    if (acc.length > amount)
                        acc.pop();
                    break;
                }
            }
            return acc;
        }, []);

        return result;
    },
    validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
  },
  created() {
    let that = this
    setInterval(function() {
      $("#carousel").fadeOut(500);

      setTimeout(function() {
        that.currentLoadingText++;

        if (that.currentLoadingText == 6)
          that.currentLoadingText = 1;

        $("#carousel").fadeIn(500);
      }, 500);
    }, 6000);

    that.loadReport();
  }
}
</script>


<style>
    html, body {
        height: 100%;
    }

    @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,400italic,600,700,800);
    body{
      /*background: red;*/
      font-family: 'Open Sans', sans-serif;
      font-weight: 400;
    }

    .v-slider__thumb {
      display: none !important;
    }

    .blur {
        -webkit-filter: blur(3px);
        -moz-filter: blur(3px);
        -ms-filter: blur(3px);
        -o-filter: blur(3px);
        filter: url(data:image/svg+xml;utf8,<svg height='0' xmlns='http://www.w3.org/2000/svg'>…eGaussianBlur in='SourceGraphic' stdDeviation='5'/></filter></svg>#svgBlur);
        filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='3');
        filter: blur(3px);
    }

    .v-progress-circular--indeterminate:not(.v-progress-circular--visible) .v-progress-circular__overlay, .v-progress-circular--indeterminate:not(.v-progress-circular--visible)>svg {
      -webkit-animation-play-state: running !important;
      animation-play-state: running !important;
    }

    .v-progress-circular {
      margin: auto;
      display: block;
    }
    
    #report-loading-wrapper img{
      width: 164px;
      margin-top: 40px;
      margin-bottom: 35px;
      margin-left: -10px;
    }

    #report-loading-wrapper .text{
      color:#fff;
      position: absolute;
      top:230px;
      left:0px;
      right:0px;
      margin: auto;

    }
    #report-loading-wrapper h4{
      font-size: 15px;
      font-weight: bold;
      margin-top: 0px;
      margin-bottom: 20px;


    }

    .main-title{
      font-size: 24px !important;
      color:#31af91;
      margin-bottom: 20px;
    }
    .title{
      font-size: 20px !important;
      color:#22b661;
      margin-bottom: 20px;
      padding-top: 15px;
      display: none;

    }
    #report-loading-wrapper #carousel {
      background: #e3e9ec;
      display: none;
      border-radius: 2px !important;
      margin-top: 20px;
      padding-bottom: 15px;
      opacity: 0.7;
    }
    #report-loading-wrapper .detail{
      font-size: 26px !important;
      color:#333;
      font-weight: normal;
      font-style: italic;
      margin-top: 10px;
    }
    #report-loading-wrapper .detail i{
      font-size: 18px;
    }
    #report-loading-wrapper .detail p {
        font-style:normal;
        margin-top: 7px;
    }
    .sub-title{
      font-size: 18px !important;
      color:#333;
      font-weight: normal;
      font-style: italic;
      margin-bottom: 20px;
    }
    #report-loading-wrapper .name{
      font-size: 18px !important;
      color:#8E8A8A;
      margin-bottom: 15px;
    }

    #report-loading-wrapper .load-container {
      width: 280px;
      height: 280px;
      overflow: hidden;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      position: absolute;
      top:113px;
      right:0px;
      left:0px;
      margin: auto;
    }

    #report-loading-wrapper .loader {
      margin: 60px auto;
      font-size: 10px;
      position: relative;
      text-indent: -9999em;
      border-top: 0.8em solid rgba(255,255,255, 0.3);
      border-right: 0.8em solid rgba(255,255,255, 0.3);
      border-bottom: 0.8em solid rgba(255,255,255, 0.3);
      border-left: 0.8em solid rgba(255,255,255, 0.3);
      /*-webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-animation: load8 1.1s infinite linear;
      animation: load8 1.1s infinite linear;*/
    }
    #report-loading-wrapper .loader,
    #report-loading-wrapper .loader:after {
      border-radius: 50%;
      width: 13em;
      height: 13em;
    }
    @-webkit-keyframes load8 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    @keyframes load8 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    #report-loading-wrapper body{
      overflow: hidden;
      margin: 0;
      position: relative;
    }

    @keyframes circle {
      from {
        transform: scale(0);
          opacity: 0.3;
      }
      to {
        transform: scale(1.2);
        opacity: 0.0;
      }
    }
    #report-loading-wrapper .circle {
      margin: 0 auto;
      width: 300px;
      height: 300px;
      border: 7px solid #31af91;
      border-radius: 50%;
      position: absolute;
      top: 135px;
      left: 0px;
      right: 0px;
      margin: auto;
      z-index: -1;
      opacity: 0.3
    }
    #report-loading-wrapper .one {
      animation: circle 4s infinite linear;
    }
    #report-loading-wrapper .two {
      animation: circle 3s infinite linear;
    }
    #report-loading-wrapper .three {
      animation: circle 2s infinite linear;
    }
    #report-loading-wrapper .carousel-indicators .active{
      background-color: #31af91;
    }

    #report-loading-wrapper .carousel-indicators li {
      border: 1px solid #31af91;
    }
    #report-loading-wrapper .carousel-indicators {
        bottom: -51px;
    }
    #report-loading-wrapper .carousel-inner{
      /*background-color: #22b661 !important;*/
      border-radius: 2px;
    }

    .mx-auto.v-card, .v-list-item {
      height: 100%;
    }

    @media (max-width : 1200px) {
      #report-loading-wrapper .detail {
        font-size: 21px !important;
      }
    }
    @media (max-width : 992px) {
      #report-loading-wrapper img {
        margin-top: 25px;
        margin-bottom: 15px;
      }
      #report-loading-wrapper .load-container {
        top:90px;
      }
      #report-loading-wrapper .text{
        top:205px;
      }
      #report-loading-wrapper .circle{
        top:70px;
      }
    }
    @media (max-width : 480px) {
      #report-loading-wrapper .main-title {
        font-size: 15px !important;
      }
      #report-loading-wrapper .detail {
        font-size: 16px !important;
      }
    }
</style>