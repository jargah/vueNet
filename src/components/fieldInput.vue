<template>
    
    <div class="p-3">

        {{ values  }}
        <v-text-field
            :label="label"
            v-model="value"
            variant="outlined"
            density="comfortable"
            :name="name"
            :type="type" 
            :error-messages="!!errorMessage ? errorMessage : []"
            @input="handleChange"
            @focus="handleBlur"
            @blur="handleBlur"
            
        />
    
    </div>
</template>

<script>

import { defineComponent, onMounted, toRef, watch } from 'vue'
import { useField, Field } from 'vee-validate'

export default defineComponent({
    props: {
        label: String,
        name: String,
        type: {
            type: String,
            default: 'text',
        },
        values: String
    },
    setup(props) {

        const name = toRef(props, 'name')

        console.log(name.value, props.type, props.values)

        watch(() => props.values, (newVal, oldVal) => {
            console.log(`El prop "message" cambió de "${oldVal}" a "${newVal}"`);
        })

        const {
            value,
            errorMessage,
            handleBlur,
            handleChange,
            meta,
        } = useField(name, { initialValue: props.values });

        const progress = ()  => {
            return Math.min(100, this.value.length * 10)
        }

        return {
            value,
            errorMessage,
            handleBlur,
            handleChange,
            meta,
            progress
        }
        
    }
})

</script>

