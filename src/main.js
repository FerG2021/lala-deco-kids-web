import { createApp } from 'vue'
// Elment plus
import ElementPlus from 'element-plus'
import ElMessage from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/es'

// importo los componentes de forma global
import Modal from './components/modal/index.vue'
import ModalSinCerrar from './components/modal_sin_cerrar/index.vue'
import Boton from './components/boton/index.vue'
import MacaSelectBox from './components/select_box/index.vue'

//
// PRIMEVUE
//

// PrimeVue
import PrimeVue from 'primevue/config';

// PrimeVue Components
import 'primevue/resources/themes/saga-blue/theme.css'        //theme
import 'primevue/resources/primevue.min.css'                  //core css
import 'primeicons/primeicons.css'       

// prime flex
import 'primeflex/primeflex.css';

//icons
// toast
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

// modal confirmacion
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';

// modal dinamico
import DynamicDialog from 'primevue/dynamicdialog'
import DialogService from 'primevue/dialogservice';

// modal
import Dialog from 'primevue/dialog';

// tabla y componentes
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';                     //optional for row

// Dropdown (Select)
import Dropdown from 'primevue/dropdown';

// InputNumber
import InputNumber from 'primevue/inputnumber';

// Switch
import InputSwitch from 'primevue/inputswitch';

//Tag
import Tag from 'primevue/tag';

// Button
import Button from 'primevue/button'

// InputText
import InputText from 'primevue/inputtext'

// Input Password
import Password from 'primevue/password';

// Card
import Card from 'primevue/card';

// Divider
import Divider from 'primevue/divider';

// Skeleton
import Skeleton from 'primevue/skeleton';

// Spinner
import ProgressSpinner from 'primevue/progressspinner';

// Message
import Message from 'primevue/message';

// FileUpload
import FileUpload from 'primevue/fileupload';

// Image
import Image from 'primevue/image';

// Toolbar
import Toolbar from 'primevue/toolbar';

// Step
import Steps from 'primevue/steps';

// Calendar
import Calendar from 'primevue/calendar';

//
// FIN PRIME VUE
//


import App from './App.vue'

// importamos las rutas
import router from './router/index.js'

// vuex
import { createStore } from 'vuex'



import axios from 'axios'
import VueAxios from 'vue-axios'

// usado para login
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.headers.common = {
//   'X-Requested-With': 'XMLHttpRequest',
//   'X-CSRF-TOKEN': window.csrf_token
//   // 'X-CSRF-TOKEN': ('meta[name="csrf-token"]').attr('content')
// };

console.log(import.meta.env.VITE_API_URL);


const variableGlobal = {
  data() {
    return {
      // base_url: 'http://localhost:8000/api'
    }
  },
}

// Create a new store instance.
const store = createStore({
  state: { 
    user: null,
    auth: false,
  },
  mutations: { 
    SET_USER(state, user){
      state.user = user
      state.auth = Boolean(user)
    }
  },
  actions:{
    async login({ dispatch }, credentials ){
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/login", credentials);
      return dispatch("getUser");
    },

    async logout({ dispatch }){
      await axios.post("/logout");
      return dispatch("getUser");
    },

    getUser({ commit }){
      axios.get("/api/user")
        .then(res => {
          commit('SET_USER', res.data)
        })
        .catch(() => {
          commit('SET_USER', null)
        })
    },
  },
  modules:{}
})

store.dispatch('getUser');

createApp(App)
  .component('Modal', Modal)
  .component('ModalSinCerrar', ModalSinCerrar)
  .component('Boton', Boton)
  .component('MacaSelectBox', MacaSelectBox)
  .component('Button', Button)
  .component('InputText', InputText)
  .component('Password', Password)
  .component('Toast', Toast)
  .component('ConfirmDialog', ConfirmDialog)
  .component('DynamicDialog', DynamicDialog)
  .component('Modal', Modal)
  .component('Dialog', Dialog)
  .component('DataTable', DataTable)
  .component('Column', Column)
  .component('ColumnGroup', ColumnGroup)
  .component('Row', Row)
  .component('Dropdown', Dropdown)
  .component('InputNumber', InputNumber)
  .component('InputSwitch', InputSwitch)
  .component('Tag', Tag)
  .component('Card', Card)
  .component('Divider', Divider)
  .component('Skeleton', Skeleton)
  .component('ProgressSpinner', ProgressSpinner)
  .component('Message', Message)
  .component('FileUpload', FileUpload)
  .component('Image', Image)
  .component('Steps', Steps)
  .component('Toolbar', Toolbar)
  .component('Calendar', Calendar)
  .use(router)
  .use(ElementPlus, {locale})
  .use(ElMessage)
  .use(VueAxios, axios)
  .mixin(variableGlobal)
  .use(store)
  .use(PrimeVue
    , {
    locale: {
        accept: 'Aceptar',
        reject: 'Rechazar',
        lt: 'Menor a',
        lte: 'Menor o igual a',
        choose: 'Elegir',
        upload: 'Subir',
        cancel: 'Cancelar',
        //...


        startsWith: 'Empieza con',
        contains: 'Contains',
        notContains: 'Not contains',
        endsWith: 'Ends with',
        equals: 'Equals',
        notEquals: 'Not equals',
        noFilter: 'No Filter',
        gt: 'Greater than',
        gte: 'Greater than or equal to',
        dateIs: 'Date is',
        dateIsNot: 'Date is not',
        dateBefore: 'Date is before',
        dateAfter: 'Date is after',
        clear: 'Clear',
        apply: 'Apply',
        matchAll: 'Match All',
        matchAny: 'Match Any',
        addRule: 'Add Rule',
        removeRule: 'Remove Rule',
        completed: 'Completed',
        pending: 'Pending',
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        chooseYear: 'Elige Año',
        chooseMonth: 'Elije Mes',
        chooseDate: 'Elije Fecha',
        prevDecade: 'Década previa',
        nextDecade: 'Década próxima',
        prevYear: 'Año Previo',
        nextYear: 'Año Siguiente',
        prevMonth: 'Mes Previo',
        nextMonth: 'Mes Próximo',
        prevHour: 'Hora Previa',
        nextHour: 'Próxima hora',
        prevMinute: 'Minuto Previo',
        nextMinute: 'Minuto Próximo',
        prevSecond: 'Segundo previo',
        nextSecond: 'Segundo Próximo',
        am: 'am',
        pm: 'pm',
        today: 'Hoy',
        weekHeader: 'Wk',
        firstDayOfWeek: 0,
        dateFormat: 'mm/dd/yy',
        weak: 'Weak',
        medium: 'Medium',
        strong: 'Strong',
        passwordPrompt: 'ingrese una contraseña',
        emptyFilterMessage: 'No hay resultados encontrados', // @deprecated Use 'emptySearchMessage' option instead.
        searchMessage: '{0} resultados disponibles',
        selectionMessage: '{0} items seleccionados',
        emptySelectionMessage: 'No hay items seleccionados',
        emptySearchMessage: 'No hay resultados encontrados',
        emptyMessage: 'No hay opciones disponibles',
        aria: {
            trueLabel: 'True',
            falseLabel: 'False',
            nullLabel: 'Not Selected',
            star: '1 star',
            stars: '{star} stars',
            selectAll: 'All items selected',
            unselectAll: 'All items unselected',
            close: 'Close',
            previous: 'Previous',
            next: 'Next',
            navigation: 'Navigation'
        }
    }}
  )
  .use(ToastService)
  .use(ConfirmationService)
  .use(DialogService)
  .mount('#app')
