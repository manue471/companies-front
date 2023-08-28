import { boot } from 'quasar/wrappers';
import VueGoogleMaps from '@fawmi/vue-google-maps';

export default boot(({ app }) => {
  app.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyDnrpHakyHh6jwd-6vHl34bF7457X2gLB0',
    },
  });
});