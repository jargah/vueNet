<template>
    <v-container>
        <div class="d-flex justify-center">
            <v-card width="300px my-3">
                <v-card-title class="text-h6 text-md-h5 text-lg-h4 text-center">
                    Caja Morelia
                </v-card-title>
                <v-card-text>
                    <div class="text-center mt-5 mb-5">
                        <v-btn 
                            :to="{name: 'crud'}"
                            variant="outlined">
                            Ingresar Nuevo Cliente
                        </v-btn> 
                    </div>                   
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>