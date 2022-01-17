<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container flex items-center justify-start px-4 py-5 mx-auto">
      <!-- App Name -->
      <router-link class="mr-4 text-2xl font-bold text-white uppercase" to="/" exact-active-class="no-active">
        Music
      </router-link>

      <div class="flex items-center flex-grow">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" to="about">
              {{ $t('About') }}
            </router-link>
          </li>
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">
              {{ $t('login') }} / {{ $t('register.title') }}
            </a>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name : 'Manage'}">
                {{ $t('manage') }}
              </router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#"
              @click.prevent="signout"> {{ $t('logout') }}</a>
            </li>
          </template>
        </ul>
        <ul class="flex flex-row mt-1 ml-auto">
          <li>
            <a href="#" class="px-2 text-white" @click.prevent="changeLocale">
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState(['userLoggedIn']),
     currentLocale() {
      return this.$i18n.locale === 'fr' ? 'French' : 'English';
    },
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    signout(){
      this.$store.dispatch('signout');

      if(this.$route.meta.requiresAuth){
        this.$router.push({name:'Home'});
      }

    },
    // ...mapActions(['signout']),
    // toggleAuthModal() {
    //   this.$store.commit('toggleAuthModal');
    // },
     changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'fr' ? 'en' : 'fr';
    },
  },
};
</script>
