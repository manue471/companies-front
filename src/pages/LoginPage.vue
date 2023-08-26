<template>
  <q-page class="login row items-center justify-center">
    <img src="/images/logo.webp" alt="">
    <div class="login-fields">
      <q-input bg-color="white" filled v-model="email" label="E-mail" />
      <q-input bg-color="white" filled v-model="password" label="Password" />
      <q-btn style="background: #584BF9; color: white" @click="signIn" label="Login" />

    </div>
  </q-page>
</template>

<script setup lang="ts">
import { login } from 'src/service/login';
import { ref } from 'vue';
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router';

// States
const email = ref('');
const password = ref('');
const $q = useQuasar();
const $router = useRouter();


// Methods
async function signIn(e: Event) {
  e.preventDefault();
  const body = {
    email: email.value,
    password: password.value,
  }
  const data = await login(body);
  if (data.access_token) {
    $q.notify({
      type: 'positive',
      message: 'Login realizado com sucesso.'
    })
    $router.push('/map');
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: $backgroundPrimary;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  .login-fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 17rem;
    width: 100%;

  }
}
</style>