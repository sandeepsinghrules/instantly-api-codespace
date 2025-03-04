<template>
  <div class="" style="background: rgba(25, 0, 135, 0.9); ">
    <div class="home-nav container mx-auto ">
      <nav class="flex items-center justify-between flex-wrap p-6">

        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <router-link to="/">
            <img v-if="!$agency" src="@/assets/Logo-2.webp" alt="" style="max-width: 180px;">
            <span v-if="$agency" style="color: white;">
              <span v-if="!$agency.logo">{{ $agency.company_name }}</span>
              <img v-if="$agency.logo" :src="$agency.logo" alt="" style="max-height: 70px;">
            </span>
          </router-link>
        </div>
        <div class="block lg:hidden">
          <button @click="open = !open" class="flex items-center px-3 py-2 border rounded text-green-200 border-green-400 hover:text-white hover:border-white focus:outline-none">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto" :class="{'hidden': !open}">
          <!-- <div class="text-sm lg:flex-grow">

          </div> -->
          <div class="text-md antialiased">
            <router-link class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mr-8" to="/#pricing">Pricing</router-link>
            <router-link class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mr-8" to="/contact">Contact</router-link>
            <router-link to="/blog" class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mr-8">Blog</router-link>

            <template v-if="$store.getters.jwtToken">
              <router-link class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mr-8 py-2 px-4 font-bold" to="/dashboard">
                Dashboard <svg class="inline-block -mt-1 fill-current" width="14" height="14" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z"/></svg>
              </router-link>

              <!-- <a href="#" class="px-4 py-1 block hover:bg-gray-300 text-gray-700 font-medium whitespace-no-wrap pb-2 rounded-b-lg" @click="logout"><i class="fa fa-sign-out-alt"></i> Logout</a> -->
            </template>

            <template v-if="!$store.getters.jwtToken">
              <router-link class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mr-8" to="/signup">Sign up</router-link>
              <router-link class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mr-8" to="/login">Login</router-link>
            </template>


          </div>
        </div>

      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('auth/logout')
        this.$router.push('/login')

      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>

<style>
  .home-nav a {
    color: #FFFFFF !important;
  }
</style>