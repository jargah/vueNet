<template>

    <v-container class="d-flex justify-content-center" max-width="600px" >
        <v-card class="d-flex justify-content-center" style="width: 500px;">

            <v-card-text class="bg-surface-light pt-4">

                {{  cliente }}
                <Form 
                    v-slot="{ isSubmitting, values }"
                    class="w-100 my-5"
                    @submit="onSubmit"
                    :validation-schema="schema"
                    @invalid-submit="onInvalidSubmit"
                >

                    <FielInput 
                        label="Ingresa tu nombre"
                        name="Nombre"
                        :values="cliente.nombre"
                    />

                    <FielInput 
                        label="Ingresa tu correo"
                        name="Correo"
                        :values="cliente.correo"
                    />

                    <FielInput 
                        label="Ingresa tu telefono"
                        name="Telefono"
                        :values="cliente.telefno"
                    />

                    <div class="p-2 mt-5">
                            
                            <v-btn 
                                type="submit"
                                rounded="lg"
                                variant="outlined"
                                color="#69F0AE"
                                class="montserrat-semibold"
                                :loading="isSubmitting"
                            >
                                Guardar
                            </v-btn>
                        </div>
                
                </Form>
            </v-card-text>

        </v-card>
    </v-container>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import FielInput from '@/components/fieldInput'

const store = useStore()
const router = useRouter()
const route = useRoute()

const cliente = ref({})


const schema = Yup.object().shape({
    Nombre: Yup.string().required('EL nombre es obligatorio'),
    Correo: Yup.string().email().required('EL correo es obligatorio'),
    Telefono: Yup.string().max(10).required('EL telefono es obligatorio')
})


const onSubmit = async(values) => {

    const id = route?.params?.id

    if(id) {
        const result = await store.dispatch('editClient', {id, values})

        if(result) {
            router.push({
                name: 'crud'
            })
        }
    }
    else {
        const result = await store.dispatch('addClient', values)

        if(result) {
            router.push({
                name: 'crud'
            })
        }
    }

}

const onInvalidSubmit = (event) => {
    console.log('onInvalidSubmit')
    console.log(event)
}

const launch = async() => {
    console.log(route?.params?.id)
    if(route?.params?.id) {
        const result = await store.dispatch('viewClient', route?.params?.id)

        cliente.value = result
    }
}

launch()

</script>