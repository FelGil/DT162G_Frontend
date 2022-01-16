<!-- MyPlants-page -->

<template>
    <v-container>
        <!-- Alerts, hidden by default -->
        <v-alert
        v-if="showAlert"
        border="left"
        type="warning"
        dense
        >
        The plant is now deleted.
        </v-alert>
        <v-alert
        v-if="showUpdateAlert"
        dense
        text
        type="success"
        >
        The plant is updated
        </v-alert>
        <v-alert
        v-if="showPlantAdded"
        outlined
        type="success"
        text
        >
        The plant has been added.
        </v-alert>
        <!--grid-->
        <v-row
          justify="center">
        <v-col
            cols="12"
            sm="8"
            >
            <!-- add a sheet in first columns, set size and other styles -->
            <v-sheet
                min-height="70vh"
                rounded="lg"
                class="pa-7"
                >
                <!-- Header to welcom the the logged in tuser -->
                <h3 class="is-size-3 has-background-dark welcome">Welcome, {{ $auth.user.name }}!</h3>
                <!-- Header -->
                <h3 >My plants</h3>
                <!-- Add plant button -->
                <v-btn
                    color="success"
                    @click="addPlantDialog()">
                    Add plant
                </v-btn>
                <!-- Table to hold the plants -->
                <v-simple-table>
                    <template v-slot:default>
                        <!-- Table headers -->
                        <thead>
                            <tr>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Type
                            </th>
                            <th>
                            </th>
                            </tr>
                        </thead>
                        <!-- Table body -->
                        <tbody>
                            <!-- tr with v-for loop, to populate table with fethed data -->
                            <tr
                            v-for="(plant, index) in plants"
                            :key="index"
                            >
                            <!-- Add two colums with fethed data --> 
                            <td>{{ plant.plantname }}</td>
                            <td>{{ plant.planttype }}</td>
                            <!-- Add a column that holds two byttons, Edit and Delete -->
                            <td>
                                <v-btn
                                    text
                                    icon
                                    class="ma-2"
                                    @click="editPlant( plant )"
                                >
                                    <v-icon color="success">mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn
                                    text
                                    icon
                                    class="ma-2"
                                    @click="deletePlant( plant._id )"
                                >
                                    <v-icon color="error">mdi-delete</v-icon>
                                </v-btn>
                            </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-sheet>
        </v-col>
        <!-- column nr2 -->
        <v-col
            cols="12"
            sm="4"
            >
            <!-- create a sheet to hold the data, and add styles to it -->
            <v-sheet
              rounded="lg"
              min-height="268"
            >
                <!-- Add component upcoming. -->
                <Upcoming />
            </v-sheet>
        </v-col>
        </v-row>
        
        <!-- Edit Dialog -->
        <v-dialog
            v-model="editDialog"
            persistent
            max-width="600px"
            
            >
            <v-card>
                <v-card-title>
                <!-- Header, switch header it is in Edit or Add-mode -->
                <span
                    class="text-h5"
                    v-if="editMode">
                Edit Plant
                </span>
                <span
                    class="text-h5"
                    v-if="!editMode">
                Add Plant</span>
                </v-card-title>
                <v-card-text>
                <!-- Create a grid for the form -->
                <v-container>
                    <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <!-- Plantname input-field -->
                        <v-text-field
                        v-model="plantForm.plantname"
                        :rules="required"
                        label="Name"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <!-- Planttype input-field -->
                        <v-text-field
                        v-model="plantForm.planttype"
                        :rules="required"
                        label="Type"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <!-- Plantfirstwaterdate datepicker -->
                        <v-date-picker
                        v-model="plantForm.plantfirstwaterdate"
                        :rules="required"
                        dateFormat="YYYY-MM-DD"
                        color="green lighten-1"
                        required
                        ></v-date-picker>
                    </v-col>
                    <v-col cols="12">
                        <!-- Plantwaterinterval input-field -->
                        <v-text-field
                        v-model="plantForm.plantwaterint"
                        :rules="interval"
                        label="Watering interval (days)"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <!-- Plantcomment input-field -->
                        <v-text-field
                        v-model="plantForm.plantcomments"
                        label="Comment"
                        ></v-text-field>
                    </v-col>
                    </v-row>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <!-- Close-button input-field -->
                <v-btn
                    color="blue darken-1"
                    text
                    @click="closeDialog"
                >
                    Close
                </v-btn>
                <!-- Save-buttons switches between add or edit edepeing of the mode of the dialog. -->
                <v-btn
                    color="blue darken-1"
                    text
                    @click="updatePlant()"
                    v-if="editMode"
                >
                    Save
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="addPlant()"
                    v-if="!editMode"
                >
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>

    </v-container>
</template>

<script>
    import axios from 'axios';
    import Upcoming from "../components/Upcoming";
    
    export default {
        name: 'myplants',
        components: {Upcoming},
        data() {
            return {
                //Variables
                plants: [],
                plantForm: {
                    plantid: null,
                    plantname: null,
                    planttype: null,
                    plantfirstwaterdate: null,
                    //plantnextwaterdate: null,
                    plantwaterint: null,
                    plantcomments: null,
                },
                showAlert: null,
                showUpdateAlert: null,
                showPlantAdded: null,
                editDialog: false,
                editMode: false,
                
                //Input rules (valdator)
                //Rule to set the input to required.
                required: [
                    //
                    v => !!v || 'Name is required',
                ],
                //Rule for input-interval to set input to required and check if the input is integer or not.
                interval: [
                    v => !!v || 'Water intervall is required',
                    v => Number.isInteger(Number(v)) || 'Must be integer'
                ]
            }
        },
        mounted() {   
            //On page load run getPlants-function.
            this.getPlants()
        },
        methods: {
            //Function deletePlant
            deletePlant (plantID) {
                //Axios delete function to delete plant from database.
                axios.delete('https://dt162g-ws.herokuapp.com/plants/' + plantID)
                .then(response => {
                    //If the delete plant went ok show alert
                    this.showAlert = true;
                    //reload table data
                    this.getPlants();
                    //close alert after 4sek
                    window.setInterval(() => {
                        this.showAlert = false;
                    }, 4000)
                });
            },
            //Function to get plants from mongodb
            getPlants() {
                //Axios get function to get plants from database
                axios
                .get('https://dt162g-ws.herokuapp.com/plants')
                .then(response => {
                    //put response data into plants-array
                    this.plants = response.data;
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => this.loading = false)
            },
            //Function editPlant to open dialog.
            editPlant(plant) {
                //Open dialog
                this.editDialog = true;
                //set dialog in edit-mode.
                this.editMode = true;
                //Get firstwatedate of plant,
                let tempDate = plant.plantfirstwaterdate;
                //Remove any debris that we dont wants
                tempDate = tempDate.substring(0,10);
                //Push data to from varaiables
                this.plantForm.plantid = plant._id;
                this.plantForm.plantname = plant.plantname;
                this.plantForm.planttype = plant.planttype;
                this.plantForm.plantfirstwaterdate = tempDate;
                this.plantForm.plantwaterint = plant.plantwaterint;
                this.plantForm.plantcomments = plant.plantcomments;

            },
            //Function addPlandialog to open add-dialog
            addPlantDialog() {
                //Open dialog
                this.editDialog = true;
                //Set dialog in Add-mode
                this.editMode = false;

            },
            //Function to close dialog
            closeDialog() {
                //close dialog
                this.editDialog = false;
                //empty form variables
                this.plantForm.plantid = null;
                this.plantForm.plantname = null;
                this.plantForm.planttype = null;
                this.plantForm.plantfirstwaterdate = null;
                this.plantForm.plantwaterint = null;
                this.plantForm.plantcomments = null;
            },
            //Udate function to send updated plant data.
            updatePlant() {
                //Run Axios put-command with ID that is stored in planform variable planfForm variable
                axios
                .put('https://dt162g-ws.herokuapp.com/plants/' + this.plantForm.plantid, {
                    //Fetch data from form.
                    plantname: this.plantForm.plantname,
                    planttype: this.plantForm.planttype,
                    plantfirstwaterdate: this.plantForm.plantfirstwaterdate,
                    plantwaterint: this.plantForm.plantwaterint,
                    plantcomments: this.plantForm.plantcomments
                })
                .then(res => {
                    //If the plant was updated show alert
                    this.showUpdateAlert = true;
                    //Reload table
                    this.getPlants();
                    //close dialog
                    this.editDialog = false;
                    //close alert after 4sek
                    window.setInterval(() => {
                        this.showUpdateAlert = false;
                    }, 4000)
                })
                .catch(err => {
                    // handle error
                    console.log(err);
                })

            },
            //Function to add a new plant
            addPlant() {
                //Axios add function to add plants from plantForm-variable
                axios
                .post('https://dt162g-ws.herokuapp.com/plants', this.plantForm)
                .then(response => {
                    //If the plant was added show alert
                    this.showPlantAdded = true;
                    //update table
                    this.getPlants();
                    //cloase dialog
                    this.editDialog = false;
                    //close alert after 4sek
                    window.setInterval(() => {
                        this.showPlantAdded = false;
                    }, 4000)
                    
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)

            },

        },
        
    }
</script>

<style scoped>

</style>