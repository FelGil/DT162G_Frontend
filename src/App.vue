<!-- main-page -->
<template>
    <v-app>
        <!-- top bar -->
        <v-app-bar
        app
        color="white"
        flat
        style="padding: 0px 90px"
        >
        <!-- Hamburger menu, hidden on lagre displays-->
        <v-app-bar-nav-icon
            @click="drawer = true"
            class="d-flex d-sm-none"
        ></v-app-bar-nav-icon>
        <!-- Topbar title, with green plant icon, and title text, click event to navigate to firstpage -->
        <v-toolbar-title
            @click="$router.push('/')"
            style="cursor: pointer">
            <v-icon
            color="success">mdi-spa</v-icon>
            PlantPal
        </v-toolbar-title>
        <v-spacer />
        <!-- menu that is displayed on large display -->
        <v-list class="d-none d-sm-flex" style="padding: 0px">
            <!-- menu-item -->
            <!-- shows only if there is an authenticated user -->
            <v-list-item
            link
            v-if="$auth.isAuthenticated"
            @click="$router.push('myplants')"
            >
                <v-list-item-title>
                MyPlants
                </v-list-item-title>
            </v-list-item>
            <!-- menu-item -->
            <v-list-item
            link
            @click="$router.push('about')">
                <v-list-item-title>
                About
                </v-list-item-title>
            </v-list-item>
            <!-- menu-item -->
            <!-- shows only if the user is not authenticated -->
            <v-list-item
            link
            @click="login"
            v-if="!$auth.isAuthenticated">
                <v-list-item-title>
                Login <v-icon>mdi-login</v-icon>
                </v-list-item-title>
            </v-list-item>
            <!-- menu-item -->
            <!-- shows only if there is an authenticated user -->
            <v-list-item
            link
            @click="logout"
            v-if="$auth.isAuthenticated">
                <v-list-item-title>
                Logout <v-icon>mdi-logout</v-icon>
                </v-list-item-title>
            </v-list-item>
            
        </v-list>

        </v-app-bar>

        <!-- hamburger menu, shows only on small displays -->
        <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        >
        <v-list
            nav
            dense
        >
            <v-list-item-group
            >
            <!-- menu-item -->
            <!-- shows only if there is an authenticated user -->
            <v-list-item
            link
            v-if="$auth.isAuthenticated"
            @click="$router.push('myplants')"
            >
                <v-list-item-title>
                MyPlants
                </v-list-item-title>
            </v-list-item>
            <!-- menu-item -->
            <v-list-item
            link
            @click="$router.push('about')">
                <v-list-item-title>
                About
                </v-list-item-title>
            </v-list-item>
            <!-- menu-item -->
            <!-- shows only if there is an authenticated user -->
            <v-list-item
            link
            @click="login"
            v-if="!$auth.isAuthenticated">
                <v-list-item-title>
                Login <v-icon>mdi-login</v-icon>
                </v-list-item-title>
            </v-list-item>
            <!-- menu-item -->
            <!-- shows only if there is an authenticated user -->
            <v-list-item
            link
            @click="logout"
            v-if="$auth.isAuthenticated">
                <v-list-item-title>
                Logout <v-icon>mdi-logout</v-icon>
                </v-list-item-title>
            </v-list-item>

            </v-list-item-group>
        </v-list>
        </v-navigation-drawer> 
        <!-- create a area under the top bar, set color grey -->
        <v-main class="grey lighten-3">
        <v-container>
            <!-- router-view is to hold all the views. -->
            <router-view></router-view>
        </v-container>
        </v-main>
    </v-app>
</template>

<script>

    export default {
        name: 'App',
        data: () => ({
            drawer: false,
            tab: null,
        }),
        //Functions
        methods: {
            //Login-function redirect user to login-page
            login() {
                this.$auth.loginWithRedirect();
            },
            // Logout-function, logout user and redirect to first-page
            logout() {
                this.$auth.logout({
                    returnTo: window.location.origin
                });
            }
        }
    }
</script>