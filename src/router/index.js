import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    { name: 'home', path: '/', component: import('@/pages/Home') },
    { 
        name: 'crud', 
        path: '/crud', 
        redirect: { name: 'crud-list' },
        children: [
            {
                path: '',
                name: 'crud-list',
                component: import('@/pages/Crud')
            },
            {
                path: 'add',
                name: 'cliente-add',
                component: import('@/pages/Cliente')
            },
            {
                path: 'edit/:id',
                name: 'cliente-edit',
                component: import('@/pages/Cliente')
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router