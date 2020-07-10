
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      authAdmin: true
    },
    children: [
      { path: '', name: 'dashboardadmin', component: () => import('pages/admin/Index.vue') },
      { path: 'inputdvd', name: 'inputdvd', component: () => import('pages/admin/inputbarang.vue') },
      { path: 'datauser', name: 'datauser', component: () => import('pages/admin/datauser.vue') },
      { path: 'datadvd', name: 'datadvd', component: () => import('pages/admin/datadvd.vue') },
      { path: 'edit/:id', name: 'edit', component: () => import('pages/admin/edit.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/userlayout.vue'),
    meta: {
      authUser: true
    },
    children: [
      { path: 'user', name: 'homeuser', component: () => import('pages/user/index.vue') },
      { path: 'myorder', name: 'myorder', component: () => import('pages/user/myorder.vue') }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/guest/login.vue')
  },
  {
    path: '/registrasi',
    name: 'registrasi',
    component: () => import('pages/guest/register.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
