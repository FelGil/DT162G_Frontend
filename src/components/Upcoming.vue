<template>
    <v-container>

        <h3>Plants to be watered today</h3>
        <!-- table -->
        <v-list style="padding: 0px">
            <v-list-item
            link
            v-for="(plant, index) in upcoming"
            :key="index"
            >
            <v-list-item-title>{{plant.plantnextwaterdate}} - {{plant.plantname}}</v-list-item-title>
            </v-list-item>
        </v-list>

    </v-container>
</template>

<script>

    import axios from 'axios';
    import moment from 'moment';

    export default {
        name: 'Upcoming',
        data() {
            return {
            upcoming: [],
            temp:[]
            }
        },
        methods: {

            getData() {
                axios
                .get('https://dt162g-ws.herokuapp.com/plants')
                .then(response => {
                    

                this.temp = response.data;
                const today = new Date().toISOString().slice(0, 10);
                
                this.temp.forEach((element) => {
                    let date = element.plantfirstwaterdate;
                    let dayInterval = element.plantwaterint;
                    let today = new Date().toISOString().slice(0,10);
                    
                    let nextDate = this.calculateNextDueDate(moment(date, 'YYYY-MM-DD'), dayInterval).format('YYYY-MM-DD');
                    //const today = new Date().toISOString().slice(0, 10);
                    console.log(today + " - " + nextDate);
                    if (today == nextDate) {
                        
                        this.upcoming.push ({
                            "plantname": element.plantname,
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
            calculateNextDueDate(initialDueDate, intervalDay) {
                if(moment().diff(initialDueDate) < 0) {
                    return initialDueDate;
                }
                else {
                    let duration = moment.duration(intervalDay, 'days');
                    //return this.calculateNextDueDate(initialDueDate.add(duration), duration);
                    return initialDueDate.add(duration);
                }
            }

        },
        mounted() {
        
            this.getData();
  
        }
        
    }
</script>

<style scoped>

</style>