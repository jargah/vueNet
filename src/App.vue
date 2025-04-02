<template>
    <div>

        <v-app>
            <v-layout class="rounded rounded-md border">
                <v-app-bar :elevation="2">
                    <v-app-bar-title>
                        Caja Morelia
                    </v-app-bar-title>
                </v-app-bar>

                <v-main class="d-flex align-center justify-center" >
                    <router-view />
                </v-main>
            </v-layout>
        </v-app>

    </div>
</template>

<style scoped></style>
