const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "Index",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/galeria",
        name: "Galeria",
        component: () => import("pages/GaleriaImagenes.vue"),
      },
      {
        path: "/calculadora",
        name: "CalculadoraPropinas",
        component: () => import("pages/CalculadoraPropinas.vue"),
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
