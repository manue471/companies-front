<template>
  <q-page>
    <q-form class="form" @submit="submitForm">
      <h5>Cadastrar Empresas</h5>
      <div class="fields">
        <q-input class="input-field" label="Nome" filled v-model="company.name" />
        <q-input class="input-field" label="CNPJ" filled v-model="company.cnpj" />
        <q-input class="input-field" label="E-mail" filled v-model="company.email" type="email" />
        <q-input class="input-field" label="Whatsapp" filled v-model="company.whatsapp_phone" />
        <div class="location">
          <q-input class="input-field" label="Latitude" filled v-model="company.latitude" />
          <q-input class="input-field" label="Longitude" filled v-model="company.longitude" />
        </div>
        <q-input class="input-field" label="Representante" filled v-model="company.representantive_user" />
        <div class="address">
          <q-select class="input-field" label="Estado"  @update:model-value="citiesByState" :options="options" filled v-model="company.state_id" />
          <q-select class="input-field" label="Cidade" :options="cities" filled v-model="company.city_id" />
        </div>
        <q-input class="input-field" label="Observações" filled v-model="company.notes" />
        <q-select class="input-field" label="Categoria" :options="categories" filled v-model="company.category_id" />
      </div>
      <q-btn label="Cadastrar" class="button" type="submit" color="primary" />
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CompanyForm',
})
</script>

<script lang="ts" setup>
import { onMounted, ref, watch, reactive, defineEmits } from 'vue';
import { getCitiesByState, getStates } from '../service/external/citiesApi';
import { states } from '../util/constants'
import { saveCompany } from '../service/companies'
import { getCategories } from '../service/categories'
import { Company } from 'src/service/types';
import { useQuasar } from 'quasar';

const emit = defineEmits(['updated'])

const company = ref({
  name: '',
  cnpj: '',
  email: '',
  representantive_user: '',
  city_id: '',
  state_id: '',
  latitude: 0,
  longitude: 0,
  category_id: '',
  whatsapp_phone: '',
  notes: ''
});

const options = ref([])
const cities = ref([])
const categories = ref([])
const $q = useQuasar();

const citiesByState = async (state: any) => {
  const data = await getCitiesByState(state.value)
  cities.value = transformArrayInOptions(data) as any
}

const getErrors = (errors: any[]) => {
  Object.values(errors).map((error: any) => {
    $q.notify({
      type: 'negative',
      message: error
    })
  })
}

const submitForm = async () => {
  const body: any = {
    ...company.value,
    state_id: company.value.state_id?.value,
    city_id: company.value.city_id?.value,
    category_id: company.value.category_id?.value,
  }
  const data = await saveCompany(body)
  if (data.errors) getErrors(data.errors)
  else {
    $q.notify({
        type: 'positive',
        message: 'Empresa criada com sucesso'
      })
    emit('updated')
}
};

const transformArrayInOptions = (array: any[]): Array<any> => {
  return array.map((item: any) => {
    return {
      label: item.name ? item.name : item.title,
      value: item.id
    }
  })
}

onMounted(async () => {
  const categoriesFromApi = await getCategories()
  categories.value = transformArrayInOptions(categoriesFromApi) as any
  const statesFromApi = await getStates()
  options.value = transformArrayInOptions(statesFromApi) as any
});
</script>
<style lang="scss" scoped>
.fields {
  font-size: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  .address, .location {
    display: flex;
    width: 100%;
    padding: 0;
    margin: 0;
    .input-field {
      width: 100%;
    }
  }
  .input-field {
    margin: 0.3rem 0.7rem;
  }

  .button {
    margin-top: 1rem;
  }
}
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  padding: 1rem;

  h5 {
    margin: 1rem 0;
  }
  .button {
    margin-top: 1rem;
    margin-left: 0.5rem;
    padding: 0.5rem 2rem;
  }
}
</style>




