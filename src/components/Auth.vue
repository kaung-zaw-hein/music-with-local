<template>
  <!-- Auth Modal -->
  <div class="fixed inset-0 z-10 overflow-y-auto" id="modal"
    :class="{ hidden: !authModalShow }">
    <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="px-6 py-4 text-left">
          <!--Title-->
          <div class="flex items-center justify-between pb-4">
            <p class="text-2xl font-bold">{{ $t('youraccount') }}</p>
            <!-- Modal Close Button -->
            <div class="z-50 cursor-pointer modal-close" @click.prevent="toggleAuthModal">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a class="block px-4 py-3 transition rounded"
                href="#" @click.prevent="tab = 'login'"
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'login',
                  'hover:text-blue-600': tab === 'register'
                }">
                {{ $t('login') }}
              </a>
            </li>
            <li class="flex-auto text-center">
              <a class="block px-4 py-3 transition rounded"
                href="#" @click.prevent="tab = 'register'"
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'register',
                  'hover:text-blue-600': tab === 'login'
                }">{{ $t('register.title') }}</a>
            </li>
          </ul>

          <app-login-form v-if="tab === 'login'" />
          <app-register-form v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import AppLoginForm from './LoginForm.vue';
import AppRegisterForm from './RegisterForm.vue';

export default {
  name: 'Auth',
  components: {
    AppLoginForm, AppRegisterForm,
  },
  data() {
    return {
      tab: 'login',
    };
  },
  computed: {
    // ...mapState({
    //   modal: 'authModalShow',
    // }),
    ...mapState(['authModalShow']),
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
  },
};
</script>
