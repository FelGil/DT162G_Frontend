<!-- Home-page -->

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
                <!-- Add headers -->
                <h2>Welcome to PlantPal</h2>

                <h3>Plants to be watered today</h3>

              <!-- table to hold the plants that must be watered today-->
                <v-simple-table>
                    <template v-slot:default>
                        <!-- table headers -->
                        <thead>
                            <tr>
                            <th class="text-left">
                                Waterdate
                            </th>
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
                        <!-- table body -->
                        <tbody>
                            <!-- tr with v-for loop, to populate table with fethed data -->
                            <tr
                            v-for="(plant, index) in upcoming"
                            :key="index"
                            >
                            <!-- Add three colums with fethed data -->
                            <td>{{ plant.plantnextwaterdate }}</td>
                            <td>{{ plant.plantname }}</td>
                            <td>{{ plant.planttype }}</td>
                            
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>

              </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    
  import axios from 'axios';
  import moment from 'moment';

  export default {
    name: 'Home',
    data() {
        return {
        upcoming: [],
        temp:[]
        }
    },
    //Functions
    methods: {
        //getDate function to fetch data from database
        getData() {
            //Axios get function
            axios
            .get('https://dt162g-ws.herokuapp.com/plants')
            .then(response => {
            //Push received data to an array
            this.temp = response.data;
            
            //lopp through the fetched data.
            this.temp.forEach((element) => {
                //Get the Plantfirstwaterdate
                let date = element.plantfirstwaterdate;
                //Get the Plantwaterintervall
                let dayInterval = element.plantwaterint;
                //Get todays-date
                let today = new Date().toISOString().slice(0,10);
                //Call function to calculate the next water-date based on the interval and the first water-date.
                let nextDate = this.calculateNextDueDate(moment(date, 'YYYY-MM-DD'), dayInterval).format('YYYY-MM-DD');

                //console.log(today + " - " + nextDate);
                //If the next water-date is equals today push the data to an array, to later show it in the table.
                if (today == nextDate) {
                    
                    this.upcoming.push ({
                        "plantname": element.plantname,
                        "planttype": element.planttype,
                        "plantnextwaterdate": nextDate
                    });
                }

            });

            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false)
        },
        //Function to calculate the next water-date
        calculateNextDueDate(initialDueDate, intervalDay) {
            //diff the date diff is less than 0 return the same date that was inputed
            if(moment().diff(initialDueDate) < 0) {
                return initialDueDate;
            }
            //else calculate the duration and add it to the specified date
            else {
                let duration = moment.duration(intervalDay, 'days');
                //return this.calculateNextDueDate(initialDueDate.add(duration), duration);
                return initialDueDate.add(duration);
            }
        }

    },
    mounted() {
        //Run the getData function on page-load.
        this.getData();

    }
  }
</script>
