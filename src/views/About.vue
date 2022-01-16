<!-- About-page -->

<template>
    <v-container>
        <!-- Grid -->
        <v-row
          justify="center">
            <v-col
              cols="12"
              sm="10"
              >
              <!-- add a sheet in first columns, set size and other styles -->
              <v-sheet
                min-height="70vh"
                rounded="lg"
                class="pa-7"
              >
                <!-- Header -->
                <h2>About</h2>
                <!-- body-text -->
                <p>
                    This is an webapp for us flower-loving people, where we will keep track on when the plants needs to be waterd.
                    Login to this page to administrate your flowers, add new flowers, edit flowers and delete flowers when they die.
                    <br>
                    How does it work?
                    - Add nice name to you plant.
                    - Add the type of plant
                    - Add the  date you first watered your plant
                    - Add the dayinterval you want to water your plant.
                    - Add any other type of info you want in the commentfield.
                    <br><br>
                    On the firstpage you see the plants that will be watered today.
                    <br><br>
                    Happy watering!
                    <br>
                    <v-icon color="success" small>mdi-spa</v-icon> Felicia
                </p>
              </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

  export default {
    name: 'Home',

  }
</script>
