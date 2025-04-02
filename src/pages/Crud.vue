<template>
    <div>
        <v-container>
            <div class="text-start mt-5 mb-5">
                <v-btn variant="outlined" :to="{name: 'cliente-add'}">
                    Nuevo Cliente
                </v-btn>
            </div>
            <div class="mt-3">

                <v-data-table 
                    :headers="headers" 
                    :items="serverItems"
                    :items-length="totalItems"
                    item-value="name"
                    >

                    <template v-slot:item.action="{ item }">
                        <div class="p-3">
                            <v-btn 
                                class="p-2" 
                                density="compact" 
                                icon="mdi-pencil"
                                :to="{name: 'cliente-edit', params: { id: item.id }}"
                                ></v-btn>
                            <v-btn 
                                class="p-2" 
                                density="compact" 
                                icon="mdi-delete"
                                @click.prevent="deleteClient(item.id, item.nombre)"
                                ></v-btn>
                        </div>
                    </template>

                </v-data-table>
            </div>
        </v-container>

        <v-dialog max-width="500" v-model="modal.open">
           
            <v-card :title="modal.title">
                <v-card-text>
                   <template v-if="modal.type === 'component'">
                    
                   </template>
                   <template v-else>
                        <p class="h4">
                            {{ modal.description }}
                        </p>
                   </template>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <template v-for="(item, index) of modal.buttons" :key="index">
                        <v-btn
                            :text="item.title"
                            @click="item.action"
                        ></v-btn>
                    </template>

                    <!-- <v-btn
                    text="Close Dialog"
                    @click="isActive.value = false"
                    ></v-btn> -->
                </v-card-actions>
             </v-card>
        </v-dialog>
    </div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

console.log(store)


const serverItems = computed(() =>(store.getters['dataItems']))
const loading = computed(() =>(store.getters['loading']))
const modal = computed(() =>(store.getters['modal']))

const itemsPerPage = ref(0)
const search = ref('')
const totalItems = ref(0)

const headers = [
    { title: 'Id', key: 'id', align: 'center' },
    { title: 'Nombre', key: 'nombre', align: 'center' },
    { title: 'Correo', key: 'correo', align: 'center' },
    { title: 'Teléfono', key: 'telefono', align: 'center' },
    { title: 'Acciones', key: 'action', align: 'center' }
]


const loadItems = async (values) => {
    loading.value = true


    await store.dispatch('listClients')

}


const createClient = () => {
    store.commit('SET_MODAL', {
        open: true,
        title: 'Acción Editar',
        type: 'component',
        description: `¿Estás segur@ de editar el cliente (${name})?`,
        buttons: []
    })
}

const saveEdit = async(id) => {
    await store.dispatch('')
}

const deleteClient = (id, name) => {
    store.commit('SET_MODAL', {
        open: true,
        title: 'Acción Editar',
        description: `¿Estás segur@ de editar el cliente (${name})?`,
        buttons: [
            {
                title: 'Cerrar',
                action: () => store.commit('SET_CLOSE_MODAL')
            },
            {
                title: 'Aceptar',
                action: () => {
                    store.dispatch('deleteCliente', id)
                    store.commit('SET_CLOSE_MODAL')
                    loadItems()
                }
            }
        ]
    })
}

onMounted(() => {
    loadItems()
})

</script>