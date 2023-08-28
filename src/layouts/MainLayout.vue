<template>
  <div class="main" view="lHh Lpr lFf">
    <div class="side-bar">
      <img src="/images/logo.webp" class="logo" alt="">
      <div class="midcontent">
        <p>Menu</p>
        <span>
          <button label="Empresas" @click="showCompanies" class="menu-btn" type="submit">
            <img src="/icons/company.svg" alt="">
            <p>Empresas</p>
          </button>
        </span>
      </div>
      <div class="footer">
        <q-btn @click="logout" flat style="color: #F8F8F8" icon="logout" label="Sair" >
        </q-btn>
      </div>
    </div>
      <map-page />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import MapPage from 'src/pages/MapPage.vue'
import { getCompanies } from 'src/service/companies';
import { Company } from 'src/service/types';
import { useRouter } from 'vue-router';

const $router = useRouter()

function logout() {
  sessionStorage.removeItem('token')
  $router.push('/')
}

function showCompanies() {
  document.dispatchEvent(new CustomEvent('showCompanies'))
}

</script>
<style lang="scss" scoped>
.main {
  display: flex;
}
.side-bar {
  max-width: 20rem;
  width: 100%;
  height: 100vh;
  background-color: $backgroundPrimary;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .midcontent {
    display: flex;
    flex-direction: column;
    p {
      color: white;
      font-size: 1.2rem;
    }
    span {
      display: flex;
      width: 12rem;
      .menu-btn {
        background: $background;
        padding: 0.4rem 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        gap: 1rem;
        max-height: 4rem;
        border-radius: 1.2rem;
        border: none;
        p {
          margin: 0;
          padding: 0;
          color: black;
        }
        img {
          max-height: 2rem;
        }
      }
    }
  }
  .logo {
    margin-top: 20%;
    max-width: 14rem;
  }
}
</style>
