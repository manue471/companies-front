<template>
  <q-layout view="hHh lpR fFf" container style="height: 100vh" class="shadow-2 rounded-borders">
    <q-header class="header" elevated>
      <q-toolbar class="toolbar">
        <q-input square standout v-model="text" class="search" label="Pesquisa por uma empresa...">
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-input>
        <q-btn @click="drawerOpen = !drawerOpen" flat label="Adicionar Empresa" color="primary" icon="add" class="q-mr-sm" />
      </q-toolbar>
    </q-header>
    <div id="map-root" class="map"
     style="width:100%; height:100vh">
    </div>
      <q-page-container>
        <q-page>
        <div id="popup" class="ol-popup">
          <a href="#" id="popup-closer" class="ol-popup-closer"></a>
          <div id="popup-content">
            <div class="markerContent">
              <p><label for="">Empresa:</label> {{ selectedCompany.name }}</p>
              <p><label for="">CNPJ:</label> {{ selectedCompany.cnpj }}</p>
              <p><label for="">Email:</label> {{ selectedCompany.email }}</p>
              <p><label for="">Telefone:</label> {{ selectedCompany.whatsapp_phone }}</p>
            </div>
          </div>
        </div>
        <q-drawer
          side="right"
          v-model="drawerOpen"
          show-if-above
          bordered
          :width="600"
          :breakpoint="500"
        >
          <q-scroll-area class="fit">
            <div class="q-pa-sm">
              <company-form @updated="teste" />
            </div>
          </q-scroll-area>
        </q-drawer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
export default defineComponent({
  name: 'MapPage',
})
</script>

<script setup lang="ts">
import CompanyForm from 'src/components/CompanyForm.vue'
import { ref, onMounted, nextTick, onBeforeMount, defineComponent, getCurrentInstance } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Company } from 'src/service/types';
import * as ol from 'ol';
import XYZ from 'ol/source/XYZ';
import { toStringHDMS } from 'ol/coordinate';
import { Overlay } from 'ol';
import { getCompanies } from 'src/service/companies'

// States
const map = ref<any>(null);
const selectedCompany = ref({} as Company)
const drawerOpen = ref<boolean>(false)
const instance = getCurrentInstance();
const companies = ref<Company[]>([])
const text = ref<string>('')

// Methods
const initMap = (overlay: any, attributions: any) => {
  const mapInstance = new Map({
    target: 'map-root',
    layers: [
      new TileLayer({
        source: new XYZ({
          attributions: attributions,
          url: 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=' + 'eKR0unjS7Qjvn4KRa1OF',
          tileSize: 512,
        })
      })
    ],
    controls: [],
    overlays: [overlay],
    view: new View({
      center: fromLonLat([-5.812757, -35.255127]),
      zoom: 1
    })
  });
  map.value = mapInstance;
};
const centerMap = (long: number, lat: number) => {
  map.value.getView().setCenter(fromLonLat([long, lat]));
  map.value.getView().setZoom(4);
};

const reloadCompanies = async () => {
  const data = await getCompanies()
  if (data) companies.value = data
}

const addMarker = () => {
  
  if (companies.value) {
  nextTick();
    companies.value.forEach((company: Company) => {
      const marker = new Feature({
        geometry: new Point(fromLonLat([company.longitude, company.latitude])),
        companyData: company,
      });
      
      const markerStyle = new Style({
        image: new Icon({
          src: '/icons/marker.svg',
          scale: 0.03
        })
      });
    
      marker.setStyle(markerStyle);
    
      const vectorSource = new VectorSource({
        features: [marker]
      });
    
      const vectorLayer = new VectorLayer({
        source: vectorSource
      });

    
      map.value.addLayer(vectorLayer);
    });
  }
  const marker = new Feature({
    geometry: new Point(fromLonLat([-46.633308, -23.550520]))
  });
  
  const markerStyle = new Style({
    image: new Icon({
      src: '/icons/marker.svg',
      scale: 0.03
    })
  });

  marker.setStyle(markerStyle);

  const vectorSource = new VectorSource({
    features: [marker]
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource
  });

  map.value.addLayer(vectorLayer);
};

const openPopup = (feature: any) => {
  selectedCompany.value = feature.values_.companyData as Company
    const coordinate = feature.getGeometry().getCoordinates();
    
    const popup = new Overlay({
      element: document.getElementById('popup') ?? undefined,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -10],
    });

    popup.setPosition(coordinate);
      map.value.addOverlay(popup);
      const closeButton = document.getElementById('popup-closer');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          popup.setPosition(undefined);
        });
      }
  };

// Life Cycle
onMounted(async () => {
  
  const data = await getCompanies()
  if (data) companies.value = data
  const container = document.getElementById('popup');
  const closer = document.getElementById('popup-closer');
  nextTick();
  const overlay = new ol.Overlay({
    element: container ? container : undefined,
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });
  if (closer) {
    closer.onclick = () => {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };
  }
    const attributions = 
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
    initMap(overlay, attributions);
    centerMap(-51.925280, -14.235004);
    addMarker();
    map.value.on('click', function (event: any) {
    map.value.forEachFeatureAtPixel(event.pixel, function (feature: any) {
      openPopup(feature);
    });
  });

  document.addEventListener('showCompanies', () => {
    reloadCompanies()
    addMarker()
    centerMap(-51.925280, -14.235004);
    drawerOpen.value = false
  })
  
});
</script>
<style lang="scss" scoped>

.header {
  display: flex;
}

.toolbar {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $background;

  .search {
    background: white;
    max-width: 20rem;
    width: 100%;
  }
}

.map {
  min-height: inherit;
}

.fullscreen .q-drawer__backdrop:not(.no-pointer-events) {
    background-color: $backgroundPrimary;
  }
  .markerContent {
    display: flex;
    flex-direction: column;
    p {
      margin: 0;
      label {
        font-weight: bold;
        color: $primary;
      }
    }
  }
.ol-popup {
    position: absolute;
    background-color: white;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 280px;
  }
  .ol-popup:after, .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }
  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
  .ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
  }
  .ol-popup-closer:after {
    content: "✖";
  }

</style>
