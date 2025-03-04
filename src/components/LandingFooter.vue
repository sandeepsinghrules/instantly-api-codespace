<template>
  <div class="py-12 landingfooter" style="background: rgba(25, 0, 135, 0.9); ">
    <div class="container mx-auto px-6 antialiased">
      <div class="flex flex-wrap">
        <div class="w-full md:w-2/6 md:pr-24 mb-4">
          <img v-if="!$agency" src="@/assets/Logo-2.webp" alt="" style="max-width: 180px;">
          <p class=" footerText">We believe that generating reviews is the easiest way to build customer trust and search engine ranking.</p>
        </div>
        <div class="w-full md:w-1/6 mb-4">
          <h4 class=" mb-3">Legal</h4>
          <router-link to="/privacy-policy" class="block footerText  mb-1">Privacy Policy</router-link>
          <router-link to="/terms-of-service" class="block footerText  mb-1">Terms of Service</router-link>
        </div>
        <div class="w-full md:w-1/6 mb-4">
          <h4 class=" text-lg mb-3">Product</h4>
          <router-link to="/#pricing" class="block footerText  mb-1">Pricing</router-link>
          <a href="https://headwayapp.co/Lead Finder-changelog" target="_blank" class="block footerText mb-1">Changelog</a>
        </div>
        <div class="w-full md:w-1/6 mb-4">
          <h4 class="text-lg mb-3">Learn</h4>
          <router-link to="/blog" class="block footerText  mb-1">Blog</router-link>
          <a href="#" class="block footerText  mb-1">Team</a>
          
        </div>
        <div class="w-full md:w-1/6 mb-4">
          <h4 class=" text-lg mb-3">Contact</h4>
          <a href="mailto:support@Lead Finder.com" class="block footerText  mb-1">Email</a>
          <router-link to="/contact" class="block footerText  mb-1">Contact Form</router-link>
          <a href="https://twitter.com/Lead Finder" class="block footerText  mb-1">Twitter</a>
        </div>
      </div>

    </div>
  </div>
</template>
