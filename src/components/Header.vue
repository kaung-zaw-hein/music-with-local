<template>
  <!-- Header -->
  <header id="header" class="bg-gray-900">
    <nav class="container flex items-center justify-start px-4 py-5 mx-auto">
      <!-- App Name -->
      <router-link class="mr-4 text-2xl font-bold text-white uppercase" to="/" exact-active-class="no-active" >
        BRNYR
      </router-link>

      <div class="flex items-center flex-grow ml-10">
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
                {{ $t('manage.name') }}
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
            <select  name="language"
              class="block w-full py-1.5 px-3 text-gray-800 border-b border-gray-300 transition
                duration-500 focus:outline-none focus:border-black rounded"
                 v-model="language"
                  @change="changeLocale()">
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="my">Burmese</option>
              <!-- <option value="Antarctica">Antarctica</option> -->
            </select>
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
  data() {
    return  {
      language: "en",
    }
  },
  computed: {
     ...mapState({
      userLoggedIn: (state) => state.auth.userLoggedIn,
    }),
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
       if(this.language === 'en'){
          this.$i18n.locale = 'en'
        }else if(this.language === 'fr'){
          this.$i18n.locale = 'fr'
        }else{
          this.$i18n.locale = 'my'
        }
    },
  },
};
</script>
