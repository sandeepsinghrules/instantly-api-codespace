<template>

  <div>
    <dialog-purchase-credits v-if="me" ref="dialogPurchaseCredits"></dialog-purchase-credits>
    <dialog-credits-log ref="dialogCreditsLog"></dialog-credits-log>

    <panel-navigation>

      <!-- <div class="float-right">
          <div v-if="me && getCreditsAvailable() != 'Unlimited'" class="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded cursor-pointer float-right" @click="$refs.dialogCreditsLog.show()" style="margin-top: -5px;"><i class="fa fa-history"> </i> View Credits Log</div>
      </div> -->
      
      <h1 class="text-lg font-semibold mb-4">Billing</h1>
      <hr class="border-b border-gray-100 mb-8">

      <v-skeleton-loader v-if="!me || (me.subscription && me.subscription.stripe_status != 'active' && me.subscription.stripe_status != 'trialing')" type="article, article, article"></v-skeleton-loader>

      <div v-else>

        <v-alert
          border="top"
          colored-border
          type="info"
          elevation="2"

          v-if="!me.subscription"
        >
          Please choose a subscription plan to continue.
        </v-alert>

        <v-alert
          border="top"
          colored-border
          type="warning"
          elevation="2"

          v-if="me.subscription && me.subscription.stripe_status != 'active' && me.subscription.stripe_status != 'trialing'"
        >
          <span v-if="me.company_type == 'agency' && me.subscription.stripe_status != 'pending'">
            Your subscription is not active. Please re-subscribe below or contact us at <a href="mailto:support@Lead Finder.com" class="text-green-500">support@Lead Finder.com</a>
          </span>

          <span v-if="me.company_type == 'agency' && me.subscription.stripe_status == 'pending'">
            You have been given access to our <strong>{{ me.subscription.name.split("|")[1] }}</strong> plan. Please complete checkout below, you will not be billed.
          </span>

          <span v-if="me.company_type != 'agency'">
            Your subscription is not active. Please re-subscribe below or contact <strong>{{ $agency.company_name }}</strong> via email <a :href="'mailto:' + $agency.email" class="text-green-500">{{ $agency.email }}</a>
          </span>
        </v-alert>

        <div v-if="!me.subscription" class="flex flex-row justify-between items-center mb-4">
          <h2 class="text-gray-900">Choose Subscription</h2>
          <!-- <router-link to="/" class="text-sm text-gray-500">See all features</router-link> -->
        </div>

        <div v-if="me.subscription && me.subscription.stripe_status == 'canceled'" class="flex flex-row justify-between items-center mb-4">
          <h2 class="text-gray-900">Rejoin</h2>
          <!-- <router-link to="/" class="text-sm text-gray-500">See all features</router-link> -->
        </div>


        <div v-if="!me.subscription || (me.subscription.stripe_status != 'active' && me.subscription.stripe_status != 'trialing')" class="flex flex-row justify-center flex-wrap mb-8 -mx-1">

          <billing-product-plan v-for="(product, index) in me.available_products" :key="index" :name="product.name" :plan="index" buttonText="Subscribe" :active="me.currentProductSlug == 'starter'" @subscribe="subscribe">
            <div v-if="product.price > 0" class="whitespace-no-wrap py-4"><span class="text-3xl font-bold mr-1">${{ product.price }}</span>/month</div>
            <div v-if="product.price == 0" class="whitespace-no-wrap py-4"><span class="text-3xl font-bold mr-1">FREE</span></div>
            <div v-for="(feature, index) in product.features" :key="index" class="text-sm mb-1">{{ feature }}</div>
          </billing-product-plan>

          <!-- <billing-product-plan name="Enterprise" buttonText="Contact sales" :active="me.currentProductSlug == 'enterprise'">
            <div class="text-3xl">
              <font-awesome-icon icon="leaf" class="text-gray-200"/>
            </div>
          </billing-product-plan> -->

        </div>

        <div v-if="me.subscription && (me.subscription.stripe_status == 'active' || me.subscription.stripe_status == 'trialing')">
          <!-- <i class="fa fa-spin fa-spinner" style="font-size: 50px;"></i>
          <br /><br />
          Please wait, you are being redirected... -->

          <div class="flex flex-row flex-wrap -mx-3">
            <div class="w-full mb-4 px-3">
              <div class="mb-4">
                <h2 class="font-bold text-gray-800">Current Subscription</h2>
              </div>
              <div class="bg-gray-100 rounded p-4">
                <p style="font-size: 20px;">
                  {{ me.subscription.product_details.name }} -
                  <strong v-if="me.subscription.product_details.price > 0">${{ me.subscription.product_details.price }}/mo</strong>
                  <strong v-if="me.subscription.product_details.price == 0">FREE</strong>
                </p>
                <p class="text-sm text-gray-600" v-for="(feature, index) in me.subscription.product_details.features" :key="index">{{ feature }}</p>
                
                <div v-if="me.subscription.stripe_id == 'starter'" class="mb-4 mt-4">
                  <v-btn
                    color="success"
                    @click="window.location = upgradeFromFree()"
                  >
                    <i class="fa fa-arrow-up"></i> &nbsp; &nbsp; Upgrade
                  </v-btn>
                </div>
                
                <!-- <p class="text-sm text-gray-600">Reviews Credits: {{ me.credits_monthly }}</p> -->
              </div>
            </div>

            <div class="w-full mb-4 px-3">
              <!-- <div class="mb-4">
                <h2 class="font-bold text-gray-800">Reviews Credits</h2>
              </div>
              <div class="bg-gray-100 rounded p-4">
                <p style="font-size: 20px;">
                  Available: <strong>{{ getCreditsAvailable() }}</strong>
                </p>
                <div v-if="getCreditsAvailable() != 'Unlimited'">
                  <p v-if="me.credits_monthly > 0" class="text-sm text-gray-600">Usage This Month: <strong>{{ commafy(me.credits_used) }}/{{ commafy(me.credits_monthly) }}</strong> &nbsp; <i class="fa fa-redo"></i> {{ formatDate(me.credits_reset_date) }}</p>
                  <p class="text-sm text-gray-600">One-Time Credits: <strong>{{ commafy(me.credits_extra) }}</strong> | <a href="javascript: void(0);" @click="$refs.dialogPurchaseCredits.show()">Buy More</a></p>
                  <p class="text-sm text-gray-600"><i class="fa fa-sync"></i> Auto-Recharge <strong>{{ commafy(me.subscription.product_details.credits.reviews_scraping.recharge_amount) }}</strong> when it drops under <strong>{{ commafy(me.subscription.product_details.credits.reviews_scraping.recharge_threshold) }}</strong> credits</p>
                </div>
              </div> -->

              <div class="mb-4 mt-4" v-if="getCreditsAvailable() != 'Unlimited'">
                <h2 class="font-bold text-gray-800">Manage Billing</h2>
              </div>
              <div class="bg-gray-100 rounded p-4" v-if="getCreditsAvailable() != 'Unlimited'">
                <p class="text-sm text-gray-600">
                  Click the button below to change your plan, payment method, cancel subscription or view your invoices.
                </p>

                <v-btn
                    color="primary"
                    @click="goToCustomerPorta()"
                  >
                    <i class="fa fa-credit-card"></i> &nbsp; &nbsp; Manage Billing
                  </v-btn>
              </div>
            </div>
          </div>
        </div>

        <!--
        <h2 class="mb-4 text-gray-900">Credit Card Information</h2>
        <div class="flex flex-row justify-between items-center bg-gray-100 p-3 rounded mb-8 text-gray-800">
          <div class="flex flex-row justify-start">
            <div class="mr-4">VISA ending in <span class="font-mono">1234</span></div>
            <div>Expires <span class="font-bold">05/22</span></div>
          </div>
          <div class="rounded px-2 py-1 bg-gray-300 cursor-pointer text-sm text-gray-700 hover:bg-gray-200">Update</div>
        </div>
        -->

        <div v-if="me.currentProductSlug" class="">
          <div v-if="me.stripeStatus == 'canceled'" class="text-sm float-right">Your subscription will end at the next billing cycle.</div>
          <div v-else @click="cancel" class="text-red-500 text-sm float-right cursor-pointer hover:text-red-400">Cancel subscription</div>
          <div class="clearfix"></div>
        </div>


        <div v-if="invoices.length > 0" class="mt-6">
          <h2 class="mb-4">Invoices</h2>
          <a v-for="invoice in invoices" :key="invoice.number" target="_blank" :href="invoice.invoice_pdf" class="flex flex-row justify-between border-b border-gray-100 font-mono text-sm hover:bg-gray-100">
            <div class="">Invoice {{invoice.number}}</div>
            <div class="text-gray-600">{{ new Date(invoice.created * 1000) | moment('YYYY-MM-DD') }}</div>
          </a>
        </div>


      </div>

      <!-- <dialog-stripe-payment ref="dialogStripePayment" :plan="paymentPlan" :price="paymentPrice"></dialog-stripe-payment> -->


    </panel-navigation>
  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import PanelNavigation from '@/components/PanelNavigation.vue'
// import DialogStripePayment from '@/components/dialogs/dialogStripePayment.vue'
import BillingProductPlan from '@/components/billing/billingProductPlan.vue'
import moment from 'moment'
import DialogPurchaseCredits from '@/components/dialogs/billing/purchaseCredits.vue'
import DialogCreditsLog from '@/components/dialogs/billing/creditsLog.vue'

// const stripe = Stripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);

export default {
  metaInfo () {
    return {
      title: "Billing | " + this.$appName
    }
  },
  data() {
    return {
      complete: false,
      paymentPlan: null,
      paymentPrice: null,
      invoices: []
    }
  },
  components: {
    PanelNavigation,
    BillingProductPlan,
    DialogPurchaseCredits,
    DialogCreditsLog
  },
  computed: {
    ...mapState({
      me: state => state.me.me
    })
  },
  methods: {
    upgradeFromFree() {
      let product = {
        plan: "growth"
      };

      this.subscribe(product);
    },
    subscribe(product) {
      window.location = process.env.VUE_APP_API_ENDPOINT + "/billing/checkout/" + this.me.uuid + "?product=" + product.plan + "&origin=" + window.location.origin + "&tid=" + this.getCookie("_fprom_tid");
    },
    goToCustomerPorta() {
      window.location = this.getCustomerPortalUrl()
    },
    getCustomerPortalUrl() {
      console.log(process.env.VUE_APP_API_ENDPOINT + "/billing/portal/" + this.me.uuid)
      return process.env.VUE_APP_API_ENDPOINT + "/billing/portal/" + this.me.uuid;
    },
    getCheckoutUrl() {
      return process.env.VUE_APP_API_ENDPOINT + "/billing/checkout/" + this.me.uuid + "?product=" + this.me.subscription.name.split("|")[2].trim() + "&origin=" + window.location.origin + "&as=1" + "&tid=" + this.getCookie("_fprom_tid");
    },
    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    async cancel(){
      try {
        await this.$store.dispatch('me/cancelSubscription')
        this.$store.dispatch('me/fetch')
      }catch(e){
        console.log(e)
      }
    } ,
    async fetchInvoices() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/stripe/invoices`, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          }
        })
        this.invoices = response.data.invoices
      } catch (e) {
        console.log(e)
      }
    },
    formatDate: function(date) {
      return moment(String(date)).format('MM/DD/YYYY')
    },
    commafy: function( num ) {
      var str = num.toString().split('.');
      if (str[0].length >= 5) {
          str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      }
      if (str[1] && str[1].length >= 5) {
          str[1] = str[1].replace(/(\d{3})/g, '$1 ');
      }
      return str.join('.');
    },
    getCreditsAvailable() {
      let available_credits = this.me.credits_monthly + this.me.credits_extra - this.me.credits_used

      if (available_credits < 0)
        return "Unlimited"

      return this.commafy(available_credits)
    }
  },
  mounted() {
    this.$store.dispatch('me/fetch')
    // this.fetchInvoices()

    var self = this;

    runStartScripts();

    function runStartScripts() {
      if (!self.me || self.me === null) {
        setTimeout(function() {
          runStartScripts();
        }, 1000);
        return;
      }

      if (self.me.subscription && self.me.subscription.stripe_status != "active" && self.me.subscription.stripe_status != "trialing")
        window.location = self.getCheckoutUrl()
    }
  }
}
</script>

