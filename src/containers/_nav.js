export default [
  {
    _name: 'CSidebarNav',
    _children: [
      // TODO default pages
      {
        _name: 'CSidebarNavTitle',
        _children: ['MAIN NAVIGATION']
      },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Color',
      //   to: '/theme/colors',
      //   icon: 'cil-drop'
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Typography',
      //   to: '/theme/typography',
      //   icon: 'cil-pencil'
      // },
      // {
      //   _name: 'CSidebarNavTitle',
      //   _children: ['Components']
      // },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Bills',
        route: '/base',
        icon: 'cil-puzzle',
        items: [
          {
            name: 'Waiting for payment',
            to: '/overview/payment-pending-invoices/0'

          },
          {
            name: 'Waiting for SEPA',
            to: '/overview/payment-pending-invoices/1'
          },
          {
            name: 'Payment Remaind Set',
            to: '/overview/payment-pending-invoices/2'
          },
          {
            name: 'Ready to ship',
            to: '/overview/payment-pending-invoices/3'
          },
          {
            name: 'Dunnning1',
            to: '/overview/payment-pending-invoices/4'
          },
          {
            name: 'Dunnning2',
            to: '/overview/payment-pending-invoices/5'
          },
          {
            name: 'Customer care',
            to: '/overview/payment-pending-invoices/6'
          },
          // {
          //   name: 'List Groups',
          //   to: '/base/list-groups'
          // },
          // {
          //   name: 'Navs',
          //   to: '/base/navs'
          // },
          // {
          //   name: 'Navbars',
          //   to: '/base/navbars'
          // },
          // {
          //   name: 'Paginations',
          //   to: '/base/paginations'
          // },
          // {
          //   name: 'Popovers',
          //   to: '/base/popovers'
          // },
          // {
          //   name: 'Progress Bars',
          //   to: '/base/progress-bars'
          // },
          // {
          //   name: 'Switches',
          //   to: '/base/switches'
          // },
          // {
          //   name: 'Tables',
          //   to: '/base/tables'
          // },
          // {
          //   name: 'Tabs',
          //   to: '/base/tabs'
          // },
          // {
          //   name: 'Tooltips',
          //   to: '/base/tooltips'
          // }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Rechnungslauf',
        route: '/',
        icon: 'cil-chart-pie',
        items: [
          {
            name: 'inactive Items',
            to: '/overview/open-items'
          },
          {
            name: 'Recurrings',
            to: '/overview/recurrings'
          },
          {
            name: 'Time tracking accounting',
            to: '/'
          },
          {
            name: 'Invoices ready to send',
            to: '/'
          },
          {
            name: 'wartet auf SEPA',
            to: '/'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Angebotsverwaltung',
        route: '/',
        icon: 'cil-star',
        items: [
          {
            name: 'New Offer',
            to: '/create/new-offer'
          },
          {
            name: 'Not Sent Offers',
            to: '/offer/notSent'
          },
          {
            name: 'Sent Offers',
            to: '/offer/sent'
          },
          {
            name: ' Accepted Offers',
            to: '/offer/accepted'
          },
          {
            name: 'Solved Offers',
            to: '/offer/solvedOffer'
          },
          {
            name: 'All Offer',
            to: '/offer'
          },
          {
            name: 'Templates',
            to: '/'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Finanzen',
        route: '/',
        icon: 'cil-bell',
        items: [
          {
            name: 'Kontoübersicht',
            to: '/'
          },
          {
            name: 'Kontobewegungen',
            to: '/'
          },
          {
            name: 'Kontenübersicht',
            to: '/'
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Time tracking',
        route: '/',
        icon: 'cil-calculator',
        items: [
          {
            name: 'recordtime',
            to: '/time-tracking'
          },
          {
            name: 'Abrechnung',
            to: '/'
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Einstellungen',
        route: '/',
        icon: 'cil-drop',
        items: [
          {
            name: 'Contact Status',
            to: '/'
          },
          {
            name: 'Units',
            to: '/'
          },
          {
            name: 'Back account',
            to: '/'
          },
          {
            name: 'Labels',
            to: '/'
          },
        ]
      },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Charts',
      //   to: '/charts',
      //   icon: 'cil-chart-pie'
      // },
      // {
      //   _name: 'CSidebarNavDropdown',
      //   name: 'Icons',
      //   route: '/icons',
      //   icon: 'cil-star',
      //   items: [
      //     {
      //       name: 'CoreUI Icons',
      //       to: '/icons/coreui-icons',
      //       badge: {
      //         color: 'info',
      //         text: 'NEW'
      //       }
      //     },
      //     {
      //       name: 'Brands',
      //       to: '/icons/brands'
      //     },
      //     {
      //       name: 'Flags',
      //       to: '/icons/flags'
      //     }
      //   ]
      // },
      // {
      //   _name: 'CSidebarNavDropdown',
      //   name: 'Notifications',
      //   route: '/notifications',
      //   icon: 'cil-bell',
      //   items: [
      //     {
      //       name: 'Alerts',
      //       to: '/notifications/alerts'
      //     },
      //     {
      //       name: 'Badges',
      //       to: '/notifications/badges'
      //     },
      //     {
      //       name: 'Modals',
      //       to: '/notifications/modals'
      //     }
      //   ]
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Widgets',
      //   to: '/widgets',
      //   icon: 'cil-calculator',
      //   badge: {
      //     color: 'primary',
      //     text: 'NEW',
      //     shape: 'pill'
      //   }
      // },
      // {
      //   _name: 'CSidebarNavDivider',
      //   _class: 'm-2'
      // },
      // {
      //   _name: 'CSidebarNavTitle',
      //   _children: ['Extras']
      // },
      // {
      //   _name: 'CSidebarNavDropdown',
      //   name: 'Pages',
      //   route: '/pages',
      //   icon: 'cil-star',
      //   items: [
      //     {
      //       name: 'Login',
      //       to: '/pages/login'
      //     },
      //     {
      //       name: 'Register',
      //       to: '/pages/register'
      //     },
      //     {
      //       name: 'Error 404',
      //       to: '/pages/404'
      //     },
      //     {
      //       name: 'Error 500',
      //       to: '/pages/500'
      //     }
      //   ]
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Download CoreUI',
      //   href: 'http://coreui.io/vue/',
      //   icon: { name: 'cil-cloud-download', class: 'text-white' },
      //   _class: 'bg-success text-white',
      //   target: '_blank'
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Try CoreUI PRO',
      //   href: 'http://coreui.io/pro/vue/',
      //   icon: { name: 'cil-layers', class: 'text-white' },
      //   _class: 'bg-danger text-white',
      //   target: '_blank'
      // }
    ]
  }
]