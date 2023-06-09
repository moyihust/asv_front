const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/register",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "register",
        component: () => import("pages/RegisterPage.vue"),
      },
    ],
  },
  {
    path: "/record",
    component: () => import("layouts/SiderbarLayout.vue"),
    children: [
      {
        path: "",
        name: "record",
        component: () => import("pages/RecordPage.vue"),
      },
    ],
  },
  {
    path: "/upload",
    component: () => import("layouts/SiderbarLayout.vue"),
    children: [
      {
        path: "",
        name: "upload",
        component: () => import("pages/UploadPage.vue"),
      },
    ],
  },
  {
    path: "/history",
    component: () => import("layouts/SiderbarLayout.vue"),
    children: [
      {
        path: "",
        name: "history",
        component: () => import("pages/HistoryPage.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
