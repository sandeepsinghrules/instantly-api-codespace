<template>
  <div  class="" style="height: 100%;">
    <!-- <dialog-add-business v-if="me" ref="dialogAddBusiness" :is_business="me.company_type == 'agency' ? false : true"></dialog-add-business> -->
    
    <v-app-bar v-if="showHeaderAndNav" app color="" class="header-top" elevation="0" v-on-clickaway="clickedOutsideUserMenu">
      <!-- <i class="fa fa-chart-bar" style="font-size: 30px; cursor: pointer;"></i> -->
      <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu"></v-app-bar-nav-icon>
      
      <div class="flex flex-row items-center justify-between flex-wrap mt-1" style="min-height: 60px;">
        <div class="header-right-part">

          <div class="relative">
            <br clear="all" />
              <!-- <template v-if="me && !$store.state.auth.is_location">
                <div class="header-right-items">
                </div>
              </template> -->
          </div>

        </div>
      </div>
      
      <v-spacer></v-spacer>

      <!-- <div class="header-stats pt-1" v-if="me && me.company_type == 'agency' && !fetchingLocations && !fetchingStats">
        <i class="fa fa-briefcase"></i>&nbsp; <strong>{{ stats.stats.total_searches }}</strong> Search<span v-if="stats.stats.total_searches != 1">es</span>
      </div> -->

      <v-divider
          class="mx-4"
          vertical
        ></v-divider>
  
      <div style="position: relative;">
        <div class="flex" @click="toggleUserMenu()" style="cursor: pointer;">
          <a class="me-icon mr-2 rounded-full text-white shadow-inner focus:outline-none zoom" style="width: 40px; display: block; text-align: center;">
            <v-gravatar v-if="me" class="gravatar-pic" :email="me.email" default-img="https://regro-cdn.s3.amazonaws.com/images/profile_image.png" />
          </a>
          <div v-if="me" style="line-height: 20px;">
            <span class="me-icon-name">
              {{ me.first_name }} {{ me.last_name }}
            </span>
            <br />

            <span class="me-icon-email">
              {{me.email}}
            </span>
          </div>
          <div class="ml-3" style="line-height: 40px;">
            <i class="mdi mdi-chevron-down me-icon-icon"></i>
          </div>
        </div>
        <div v-if="showUserMenu" class="rounded-lg bg-white shadow-md absolute min-w-full mt-3 right-0 user-menu p-6" style="z-index: 99;">
          <div class="flex" style="cursor: pointer;">
            <a class="me-icon mr-2 rounded-full text-white shadow-inner focus:outline-none zoom" style="width: 40px; display: block; text-align: center;">
              <v-gravatar v-if="me" class="gravatar-pic" :email="me.email" default-img="https://regro-cdn.s3.amazonaws.com/images/profile_image.png" />
            </a>
            <div v-if="me" style="line-height: 20px;">
              <span class="me-icon-name">
                {{ me.first_name }} {{ me.last_name }}
              </span>
              <br />

              <span class="me-icon-email">
                {{ me.email }}
              </span>
            </div>
          </div>

          <v-divider class="mt-3 mb-3"></v-divider>

            <ul class="me-icon-menu list-reset">
              <li><router-link to="/settings" class="py-1 block"><i class="mdi mdi-account-outline mr-1" style="font-size: 16px;"></i> Edit Profile</router-link></li>
              

              <!-- <li v-if="$store.state.auth.owner && me.company_type != 'admin' && me.company_type != 'agency'"><a href="javascript: void(0);" @click="backToAgencyAdmin()" class="py-1 block font-medium whitespace-no-wrap" style="color: #f56565 !important;"><i class="fa fa-angle-double-left -mr-1"></i> Back to Agency Dashboard</a></li> -->
              <!-- <li v-if="$store.state.auth.admin && me.company_type != 'admin'"><a href="javascript: void(0);" @click="backToAdmin()" class="py-1 block font-medium whitespace-no-wrap" style="color: #f56565 !important;"><i class="fa fa-angle-double-left -mr-1"></i> Back to Administration</a></li> -->

              <v-divider  class="mt-3 mb-3"></v-divider>
              <li><a href="#" class="py-1 block logout-link ml-1" @click="logout" style="font-size: 12px !important; font-weight: bold;"><i class="fa fa-sign-out-alt -mr-3"></i> Sign Out</a></li>
            </ul>
        </div>
      </div>
      
    </v-app-bar>

    <v-navigation-drawer 
      v-if="showHeaderAndNav"
      v-model="sidebarMenu" 
       class="rg-sidebar-left"
      app
      floating
      :permanent="sidebarMenu"
      :mini-variant.sync="mini"
      :width="250"
      >
      <v-list dense color="" dark>
          <v-list-item class="ml-7" style="opacity: 1;">
              <v-list-item-content>
                  <v-list-item-title>
                      <router-link to="/" class="">
                        <img v-if="!$agency" src="@/assets/Logo-2.webp" alt="" style="height: 30px; margin-top: 0px;">
                        <span v-if="$agency" style="color: white; font-size: 18px;">
                          <!-- <span v-if="!$agency.logo" style="padding-top; 2px;">{{ $agency.company_name }}</span> -->
                          <img v-if="$agency.logo" :src="$agency.logo" alt="" style="height: 32px;">
                        </span>
                      </router-link>
                  </v-list-item-title>
              </v-list-item-content>
          </v-list-item>
      </v-list>

      <v-list class="-mt-4">
          <!-- <div v-if="me && me.company_type == 'admin'">
            <v-list-item v-for="item in menu_items.admin" :key="item.title" link :to="item.route" :href="item.href" :target="item.target">
                <v-list-item-icon style="padding-left: 26px; text-align: center;">
                    <i :class="item.icon" style="color: white; font-size: 20px; margin-top: -3px;"></i>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
          </div> -->

          <!-- <div v-if="me && me.company_type == 'agency'">
            <span v-for="item in menu_items.agency" :key="item.title">
              <v-list-item link :to="item.route" :href="item.href" :target="item.target">
                <v-list-item-icon style="padding-left: 26px; text-align: center;">
                    <i :class="item.icon" style="color: white; font-size: 20px; margin-top: -3px;"></i>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
                    <div v-if="item.title == 'Inbox' && $store.state.inbox_count" class="lsnp-inbox-count">
                      {{ inbox_count }}
                    </div>
                </v-list-item-content>
              </v-list-item>
            </span>
          </div> -->

          <!-- MENU Add by TRS -->

          <div class="mt-10">
            <span v-for="item in menu_items.agency" :key="item.title">
              <v-list-item link :to="item.route" :href="item.href" :target="item.target">
                <v-list-item-icon style="padding-left: 26px; text-align: center;">
                    <i :class="item.icon" style="color: white; font-size: 20px; margin-top: -3px;"></i>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
                    <div v-if="item.title == 'Inbox' && $store.state.inbox_count" class="lsnp-inbox-count">
                      {{ inbox_count }}
                    </div>
                </v-list-item-content>
              </v-list-item>
            </span>
            <span>
              <v-list-item href="https://docs.instantlyapi.com/" target="item.target">
                <v-list-item-icon style="padding-left: 26px; text-align: center;">
                    <i class="mdi mdi-file-document-outline" style="color: white; font-size: 20px; margin-top: -3px;"></i>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="white--text">API Docs</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </span>
          </div>

          <!-- <div v-if="me && (me.company_type == 'business' || me.company_type == 'location')">
            <span v-for="item in menu_items.business" :key="item.title">
              <v-list-item link :to="item.route" :href="item.href" :target="item.target"
                :style="((me.subscription.product_details.limits.permissions[item.route] || item.only_owner) ? '' : 'opacity: 0.5')"
              >
                <v-list-item-icon style="padding-left: 26px; text-align: center;">
                    <i :class="item.icon" style="color: white; font-size: 20px; margin-top: -3px;"></i>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </span>
          </div> -->
      </v-list>
  </v-navigation-drawer>

  <div v-if="!showHeaderAndNav" style="height: 100%;">
    <div v-if="hasAccess" style="height: 100%;">
      <slot v-if="me && me.status == 1"></slot>
      <div v-if="me && me.status == 0" class="">
        Your access has been disabled. Please contact your account owner.
      </div>
    </div>
    
    <div v-if="me && !hasAccess">
        You do not have access to this section. In order to get access, please <a href="/billing">upgrade</a> your account.
      </div>
  </div>

  <!-- <v-container v-else class="lfp-container fill-height" fluid :style="((inbox == true) ? 'padding: 0px; margin: 0px;' : 'padding: 40px;')">
      <v-row class="fill-height">
          <v-col>
              <div class="fill-height" v-if="hasAccess">
                <slot v-if="me && me.status == 1"></slot>
                <div v-if="me && me.status == 0" class="">
                  Your access has been disabled. Please contact your account owner.
                </div>
              </div>
              
              <div v-if="me && !hasAccess">
                  You do not have access to this section. In order to get access, please <a href="/billing">upgrade</a> your account.
                </div>
          </v-col>
      </v-row>
  </v-container> -->

  </div>



</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { mixin as clickaway } from 'vue-clickaway';
import dialogAddBusiness from '@/components/dialogs/businesses/addBusiness.vue'

export default {
  mixins: [ clickaway ],

  props: ['inbox'],

  data: function() {
    return {
      showUserMenu: false,
      loaded: false,
      locations_links_visible: false,
      locations_links_done: false,

      drawer: false,
      group: null,

      sidebarMenu: true,
      toggleMini: false,
      menu_items: {
        admin: [
          { title:"Dashboard", route:"/dashboard", icon:"mdi mdi-view-dashboard-outline" },
          { title:"Agencies", route:"/agencies", icon:"fa-briefcase" }
        ],
        agency: [
          { title:"Dashboard", route:"/dashboard", icon:"mdi mdi-view-dashboard-outline" },
          { title:"Logs", route:"/logs", icon:"mdi mdi-history" },
          { title:"Proxies", route:"/proxies", icon:"mdi mdi-camera-timer" },
          // { title:"Inbox", route:"/inbox", icon:"mdi mdi-message-processing" },
          // { title:"History", route:"/history", icon:"mdi mdi-history" },
          // { title:"SMS Templates", route:"/templates", icon:"mdi mdi-file-document-multiple-outline" },
          // { title:"Image Templates", route:"/personalization-images", icon:"mdi mdi-image" },
          { title:"Settings", route:"/settings", icon:"mdi mdi-cog-outline" },
        ],
        business: [
          { title: "Dashboard", route: "/dashboard", icon: "mdi mdi-view-dashboard-outline" },
          { title: "Reviews", route: "/reviews", icon: "fa-star" },
          { title: "Review Platforms", route: "/review-platforms", icon: "fa-window-restore" },
          { title: "Widgets", route: "/widgets", icon: "fa-th" },
          { title: "Contacts", route: "/contacts", icon: "fa-users" },
          { title: "Feedback", route: "/feedback", icon: "far fa-star" },
          { title: "Get Reviews", route: "/settings", icon: "fa-plus" },
          { title: "Social Posting", route: "/social-posting", icon: "fas fa-share-alt" },
          { title: "Reports", route: "/reports", icon: "fa-file" }
        ]
      },

      inbox_count: this.$store.state.inbox_count || 0
    }
  },
  // components: {
  //   dialogAddBusiness
  // },
  methods: {
    toggleTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;      
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
      console.log('this.showUserMenu', this.showUserMenu)
    },
    async logout() {
      await this.$store.dispatch('logout')
        this.$router.push('/login')
    },
    // async switchLocation(email) {
    //   let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/get-child-jwt-token?email=${email}`, {
    //     headers: {
    //       'Authorization': 'Bearer ' + this.$store.state.auth.jwt
    //     }
    //   })

    //   if (this.me.company_type == "admin")
    //     window.location = window.location.origin + '/login?alt=' + btoa(response.data.jwt_token) + "&admin=true&admin_jwt_token=" + btoa(this.$store.state.auth.jwt);
    //   else if (this.me.company_type == "agency")
    //     window.location = window.location.origin + '/login?alt=' + btoa(response.data.jwt_token) + "&owner=true&owner_jwt_token=" + btoa(this.$store.state.auth.jwt);
    //   else
    //     window.location = window.location.origin + '/login?alt=' + btoa(response.data.jwt_token);
    // },
    // backToAdmin() {
    //   let self = this
    //   this.$store.state.auth.admin = false
    //   this.$store.state.auth.owner = false

    //   setTimeout(function() {
    //     window.location = window.location.origin + '/login?alt=' + self.$store.state.auth.admin_jwt_token;
    //     // self.$router.go({ name: 'login', query: {alt: self.$store.state.auth.admin_jwt_token }});
    //   }, 10);
    // },
    // backToAgencyAdmin() {
    //   let self = this
    //   this.$store.state.auth.owner = false

    //   setTimeout(function() {
    //     // self.$router.go({ name: 'login', query: {alt: self.$store.state.auth.owner_jwt_token }});
    //     window.location = window.location.origin + '/login?alt=' + self.$store.state.auth.owner_jwt_token;
    //   }, 10);
    // },
    clickedOutsideUserMenu() {
      this.showUserMenu = false
    },
    // checkLocationsLinksDone() {
    //   let self = this
    //   if (!this.locations_links_done) {
    //     setTimeout(function() {
    //       try {
    //         var content = document.getElementsByClassName('locations-links')[0];
    //         var body = document.getElementsByClassName('v-select-list')[0];
    //         content.parentNode.removeChild(content);
    //         body.prepend(content);
    //         self.locations_links_done = true
    //       }
    //       catch (e) {}
    //     }, 50);
    //   }
    // },
    // commafy: function( num ) {
    //   var str = num.toString().split('.');
    //   if (str[0].length >= 5) {
    //       str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    //   }
    //   if (str[1] && str[1].length >= 5) {
    //       str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    //   }
    //   return str.join('.');
    // },
    // getCreditsAvailable() {
    //   let available_credits = this.me.credits_monthly + this.me.credits_extra - this.me.credits_used

    //   if (available_credits < 0)
    //     return "Unlimited"

    //   return this.commafy(available_credits)
    // },
    // getLocalReconLink() {
    //   let lr_subdomain = "https://localrecon.Lead Finder.com/"

    //   if (process.env.NODE_ENV == 'development') {
    //     lr_subdomain = "http://localhost:8084/"
    //   }

    //   let extra_data = 'rg-agency-link?a=' + btoa(JSON.stringify(this.me));

    //   return lr_subdomain + extra_data;
    // },

    // getInboxCount() {
    //   let self = this

    //   axios.get(`${process.env.VUE_APP_API_ENDPOINT}/inbox/get-unread-count`, {
    //     headers: {
    //       'Authorization': 'Bearer ' + this.$store.state.auth.jwt
    //     }
    //   }).then(function(response) {
    //     self.inbox_count = self.$store.state.inbox_count = response.data.inbox_count;

    //     setTimeout(function() {
    //       self.getInboxCount();
    //     }, 10000);
    //   })
    // }
  },
  computed: {
    ...mapState({
      me: state => JSON.parse(state.loginuser),
    //   fetchingLocations: state => state.locations.fetchingLocations,
    //   locations: state => state.locations.locations,
    //   stats: state => state.stats.stats,
    //   fetchingStats: state => state.stats.fetchingStats,
      showHeaderAndNav: function() {
        console.log(this.$router.currentRoute.name);
        if (this.$router.currentRoute.name == 'ImageEditor')
          return false;

        return true;
      }
    }),
    mini() {
        return (this.$vuetify.breakpoint.smAndDown) || this.toggleMini
    },
    buttonText() {
        return !this.$vuetify.theme.dark ? 'Go Dark' : 'Go Light'
    },
    // hasAccess() {
    //   return this.me && (
    //     this.me.company_type == "admin" ||
    //     (
    //       (
    //         !this.me.subscription.product_details.limits.permissions.hasOwnProperty(window.location.pathname) || 
    //         this.me.subscription.product_details.limits.permissions[window.location.pathname])
    //       )
    //     );
    // }
  },
  // mounted() {
  //   this.$store.dispatch('me/fetch')
  //   this.$store.dispatch('locations/fetch')

  //   this.$store.dispatch('stats/fetch')

  //   // console.log(this.$store.state)

  //   this.getInboxCount();
  // },
  created() {
    if (window.outerWidth < 900) {
      this.sidebarMenu = false;
    }
  },
  watch: {
    group () {
      this.drawer = false
    },
  },
}
</script>

<style lang="css" scoped>
  .v-navigation-drawer__content a {
    text-decoration: none;
  }
  
  .v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child {
    margin-right: 20px;
  }
  
  .mx-auto.v-card, .v-list-item {
    height: 56px;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
  }
  
  .fade-enter-active {
    transition-delay: .25s;
  }
  
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  
  .menu .router-link-exact-active {
    color: white !important;
  }
  
  .v-application ul, .v-application ol {
    padding-left: 0px;
  }
  
  .menu a {
    color: #c6f6d5;
  }
  
  .user-menu li i {
    width: 24px;
  }
  
  .locations-dropdown {
    width: 500px;
  }
  
  .header-right-items {
    float: left; margin-top: -31px; padding-right: 10px;
  }
  

  
  .mobile-navigation .v-btn__content i {
    font-size: 40px;
  }
  
  .mobile-navigation a {
    color: #757575;
    font-size: 15px;
    width: 100%;
    display: block;
    font-weight: bold;
  }
  
  .mobile-navigation a i {
    /* margin-right: 5px; */
    width: 24px;
  }
  
  @media screen and (max-width: 1023px) {
    .locations-dropdown {
      width: 275px;
    }
  }
  
  @media screen and (max-width: 767px) {
    .header-right-part {
      width: 100%;
    }
    .header-right-items {
      width: calc(100% - 37px);
    }
    .locations-dropdown {
      width: 100%;
    }
    .header-stats {
      display: none;
    }
    /* .me-icon {
      margin-top: 20px;
    } */
  
    .desktop-navigation {
      display: none;
    }
  
    .mobile-navigation {
      display: block;
    }
  
    .container {
      max-width: 100% !important;
    }
  }
  
  .user-menu {
    min-width: 300px !important;
  }
  
  .locations-links {
    padding-right: 20px;
    text-align: right;
    margin-top: 4px;
    z-index: 9;
    margin-bottom: 5px;
  }
  
  .locations-links {
    font-size: 14px;
  }
  
  .locations-links a {
    color: #1976d2;
  }
  
  .header-stats {
    color: #828282;
    margin-bottom: 6px;
    text-align: right;
  }
  
  .gravatar-pic {
    border-radius: 50%;
  }

  .lsnp-inbox-count {
    position: absolute;
    margin-left: 45px;
    margin-top: -3px;
    background: #3A9BDB;
    color: #FFFFFF;
    padding: 2px;
    border-radius: 50%;
    font-size: 12px;
    padding-left: 5px;
    padding-right: 5px;
  }

  @media screen and (max-width: 900px) {
    .v-list-item__icon {
      padding-left: 0px !important;
    }

    .lfp-container {
      padding: 25px !important;
    }
  }
  </style>
  