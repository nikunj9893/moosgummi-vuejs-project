import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/charts/Charts')
const Widgets = () => import('@/views/widgets/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')
const Brands = () => import('@/views/icons/Brands')
const Flags = () => import('@/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')



// ==================================================    OVERVIEWS ITEMS DATA ==========================
const InvoiceItem = () => import('@/views/itemManagement/InvoiceItem')
const createNewInvoiceItem = () => import('@/views/itemManagement/createNewInvoiceItem')
const ViewInvoiceItem = () => import('@/views/itemManagement/viewInvoiceItem')
const invoiceItemListing = () => import('@/views/itemManagement/invoiceItemListing')
const createDebitorInvoices = () => import('@/views/itemManagement/createDebitorInvoices')
const createNewInvioceItem = () => import('@/views/itemManagement/createNewInvioceItem')
const currentBill = () => import('@/views/itemManagement/currentBill')
const ItemDivisionForm = () => import('@/views/itemManagement/ItemDivisionForm')

// ================================================== OVERVIEWS recurrings ==========================
const listRecurrings = () => import('@/views/ManageRecurrings/listRecurrings')
const offers = () => import('@/views/itemManagement/itemMainPage')
const updateRecurring = () => import('@/views/ManageRecurrings/updateRecurring')

// ================================================== DEBITOR ==========================
const DebitormainPage = () => import('@/views/Debitor/DebitormainPage')
const DebitormainPageLayout = () => import('@/views/Debitor/DebitormainPage')

// ================================================== DEBITOR CONTACTS ==========================
const getDebitorcontacts = () => import('@/views/contacts/getDebitorcontacts')
const createNewDebitorContact = () => import('@/views/contacts/createNewDebitorContact')
const updateDebitorContact = () => import('@/views/contacts/updateDebitorContact')


// ================================== OFFER CREATE ================
const createNewOffer = () => import('@/views/offermanagement/createNewOffer')
const offerListing = () => import('@/views/offermanagement/offerListing')
const acceptOffer = () => import('@/views/offermanagement/acceptOffer')
const notSendOffer = () => import('@/views/offermanagement/notSendOffer')
const sendOffers = () => import('@/views/offermanagement/sendOffers')
const solvedOffer = () => import('@/views/offermanagement/solvedOffer')
const offerManagetab = () => import('@/views/offermanagement/offerManagetab')


// ================================== PROJECT ======================
const createProject = () => import('@/views/manageProject/createProject')
const listAllproject = () => import('@/views/manageProject/listAllproject')
const editprojectData = () => import('@/views/manageProject/editprojectData')


// ======================================= timeslot ==========================
const createtimeslot = () => import('@/views/timeSlot/createtimeslot')
const listAndCreateLayout = () => import('@/views/timeSlot/listAndCreateLayout')

// ======================================= timeslot ==========================
const listAllparcelDetails = () => import('@/views/manageParcels/listAllparcelDetails')
const createParcel = () => import('@/views/manageParcels/createParcel')



// Moddleware
import authenticated from './guards/authenticated'
import isNotAuthenticated from './guards/isNotAuthenticated'

const routes = (store) => [
  {
    path: '/',
    redirect: '/overview/payment-pending-invoices/0',
    name: 'Home',
    component: TheContainer,
    beforeEnter: authenticated(store),
    children: [
      {
        path: '/overview/payment-pending-invoices',
        redirect: '/overview/payment-pending-invoices/0',
        name: 'Dashboard',
        component: Dashboard,
        children: [
          {
            path: '0',
            name: 'Colors',
            component: Dashboard
          },
          {
            path: '1',
            name: 'Typography',
            component: Dashboard
          },
          {
            path: '2',
            name: 'Typography',
            component: Dashboard
          },
          {
            path: '3',
            name: 'Typography',
            component: Dashboard
          },
          {
            path: '4',
            name: 'Typography',
            component: Dashboard
          },
          {
            path: '5',
            name: 'Typography',
            component: Dashboard
          },
          {
            path: '6',
            name: 'Typography',
            component: Dashboard
          },
        ]
      },
      {
        path: 'theme',
        redirect: '/theme/colors',
        name: 'Theme',
        component: {
          render(c) { return c('router-view') }
        },
        children: [
          {
            path: 'colors',
            name: 'Colors',
            component: Colors
          },
          {
            path: 'typography',
            name: 'Typography',
            component: Typography
          }
        ]
      },
      {
        path: 'charts',
        name: 'Charts',
        component: Charts
      },
      {
        path: 'widgets',
        name: 'Widgets',
        component: Widgets
      },
      {
        path: 'users',
        meta: {
          label: 'Users'
        },
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            name: 'Users',
            component: Users
          },
          {
            path: ':id',
            meta: {
              label: 'User Details'
            },
            name: 'User',
            component: User
          }
        ]
      },
      {
        path: 'base',
        redirect: '/base/cards',
        name: 'Base',
        component: {
          render(c) { return c('router-view') }
        },
        children: [
          {
            path: 'cards',
            name: 'Cards',
            component: Cards
          },
          {
            path: 'forms',
            name: 'Forms',
            component: Forms
          },
          {
            path: 'switches',
            name: 'Switches',
            component: Switches
          },
          {
            path: 'tables',
            name: 'Tables',
            component: Tables
          },
          {
            path: 'tabs',
            name: 'Tabs',
            component: Tabs
          },
          {
            path: 'breadcrumbs',
            name: 'Breadcrumbs',
            component: Breadcrumbs
          },
          {
            path: 'carousels',
            name: 'Carousels',
            component: Carousels
          },
          {
            path: 'collapses',
            name: 'Collapses',
            component: Collapses
          },
          {
            path: 'jumbotrons',
            name: 'Jumbotrons',
            component: Jumbotrons
          },
          {
            path: 'list-groups',
            name: 'List Groups',
            component: ListGroups
          },
          {
            path: 'navs',
            name: 'Navs',
            component: Navs
          },
          {
            path: 'navbars',
            name: 'Navbars',
            component: Navbars
          },
          {
            path: 'paginations',
            name: 'Paginations',
            component: Paginations
          },
          {
            path: 'popovers',
            name: 'Popovers',
            component: Popovers
          },
          {
            path: 'progress-bars',
            name: 'Progress Bars',
            component: ProgressBars
          },
          {
            path: 'tooltips',
            name: 'Tooltips',
            component: Tooltips
          }
        ]
      },
      {
        path: 'buttons',
        redirect: '/buttons/standard-buttons',
        name: 'Buttons',
        component: {
          render(c) { return c('router-view') }
        },
        children: [
          {
            path: 'standard-buttons',
            name: 'Standard Buttons',
            component: StandardButtons
          },
          {
            path: 'button-groups',
            name: 'Button Groups',
            component: ButtonGroups
          },
          {
            path: 'dropdowns',
            name: 'Dropdowns',
            component: Dropdowns
          },
          {
            path: 'brand-buttons',
            name: 'Brand Buttons',
            component: BrandButtons
          }
        ]
      },
      {
        path: 'icons',
        redirect: '/icons/coreui-icons',
        name: 'CoreUI Icons',
        component: {
          render(c) { return c('router-view') }
        },
        children: [
          {
            path: 'coreui-icons',
            name: 'Icons library',
            component: CoreUIIcons
          },
          {
            path: 'brands',
            name: 'Brands',
            component: Brands
          },
          {
            path: 'flags',
            name: 'Flags',
            component: Flags
          }
        ]
      },



      {
        path: 'InvoiceItem',
        redirect: '/overview/open-items',
        name: 'InvoiceItem',
        component: {
          render(c) { return c('router-view') }
        },
        children: [
          {
            path: '/overview/open-items',
            name: 'InvoiceItem',
            component: ViewInvoiceItem
          },
          {
            path: '/overview/open-items/:id',
            name: 'Update items',
            component: InvoiceItem
          },
          {
            path: '/overview/open-items-create/:id',
            name: 'create new invoice item',
            component: createNewInvoiceItem
          },
          {
            path: '/offers/:id',
            name: 'create new invoice item',
            component: offers
          },
          {
            path: '/overview/recurrings',
            name: 'list all Recurrings',
            component: listRecurrings
          },
          {
            path: '/debitors/:id',
            name: 'debitors',
            component: DebitormainPage
          },
          {
            path: '/debitor-invoices/mainLayout',
            name: 'debitorsCurrentBill',
            component: DebitormainPageLayout
          },
          {
            path: '/debitors/contacts/:id',
            name: 'getDebitorcontacts',
            component: getDebitorcontacts
          },
          {
            path: '/recurrings/update/:id',
            name: 'Updaterecurrings',
            component: updateRecurring
          },
          {
            path: '/contacts/create/:id',
            name: 'createNewDebitorContact',
            component: createNewDebitorContact
          },
          {
            path: '/contacts/edit/:id',
            name: 'updateDebitorContact',
            component: updateDebitorContact
          },
          {
            path: '/debitor/invoices/:id',
            name: 'invoiceItemListing',
            component: invoiceItemListing
          },
          {
            path: '/debitor-invoices/:id',
            name: 'createDebitorInvoices',
            component: createDebitorInvoices
          },
          {
            path: '/debitor-invoice/create-item/:id',
            name: 'createNewInvioceItem',
            component: createNewInvioceItem
          },
          {
            path: '/debitor-invoice/currentBill',
            name: 'currentBill',
            component: currentBill
          },
          // =================================== OFFER MANAGEMENT ==========================
          {
            path: '/create/new-offer',
            name: 'createNewOffer',
            component: createNewOffer
          },
          {
            path: '/offer/',
            name: 'offerListing',
            component: offerListing
          },
          {
            path: '/offer/notSent',
            name: 'notSendOffer',
            component: notSendOffer
          },
          {
            path: '/offer/sent',
            name: 'sendOffers',
            component: sendOffers
          }, {
            path: '/offer/accepted',
            name: 'acceptOffer',
            component: acceptOffer
          },
          {
            path: '/offer/solvedOffer',
            name: 'solvedOffer',
            component: solvedOffer
          },
          {
            path: '/offer/:id',
            name: 'offerManagetab',
            component: offerManagetab
          },
          {
            path: '/items/split/:id',
            name: 'ItemDivisionForm',
            component: ItemDivisionForm
          },
          // ========================================PROJECT ROUTE ====================
          {
            path: '/project/create',
            name: 'createProject',
            component: createProject
          },
          {
            path: '/project',
            name: 'listAllproject',
            component: listAllproject
          },
          {
            path: '/project/edit/:id',
            name: 'editprojectData',
            component: editprojectData
          },

          // ================================ TIMESLOT =====================
          {
            path: '/timeslot/create',
            name: 'createtimeslot',
            component: createtimeslot
          },
          {
            path: '/time-tracking',
            name: 'listAndCreateLayout',
            component: listAndCreateLayout
          },
          // =============================   PARCEL ==================
          {
            path: '/parcels',
            name: 'listAllparcelDetails',
            component: listAllparcelDetails
          },
          {
            path: '/parcels/create',
            name: 'createParcel',
            component: createParcel
          },

        ]
      },
      {
        path: 'notifications',
        redirect: '/notifications/alerts',
        name: 'Notifications',
        component: {
          render(c) { return c('router-view') }
        },
        children: [
          {
            path: 'alerts',
            name: 'Alerts',
            component: Alerts
          },
          {
            path: 'badges',
            name: 'Badges',
            component: Badges
          },
          {
            path: 'modals',
            name: 'Modals',
            component: Modals
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: isNotAuthenticated(store),
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: Page404
      },
      {
        path: '500',
        name: 'Page500',
        component: Page500
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  }
];

Vue.use(Router);

export default (store) => new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode ?old value hash?
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: routes(store),
})

