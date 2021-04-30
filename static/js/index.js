import UploadData from "./screens/UploadData.js"
import MapData from "./screens/MapData.js"
import ReviewData from "./screens/ReviewData.js"

Vue.mixin({ delimiters: ['[{', '}]'] });

new Vue({
    el: '#app',
    data: {
        route: "UploadData",
        files: [],
        parsedFiles: [],
    },
    methods: {
        routeScreen(route) {
            console.log("Routing to " + route);
            this.route = route;
        },
        updateFiles(files) {
            this.files = files;
        },
        updateParsedFiles(files) {
            this.parsedFiles = files;
        }
    },
    components: {
        UploadData,
        MapData,
        ReviewData
    },
    template: `
        <div id="app">
            <UploadData @goTo="routeScreen" @updatedFiles="updateFiles" v-if="route === 'UploadData'"></UploadData> 
            <MapData @goTo="routeScreen" @updatedFiles="updateParsedFiles" v-if="route === 'MapData'" :files="files"></MapData>
            <ReviewData v-if="route === 'ReviewData'" :files="parsedFiles"/>
        </div>
    `
})

// <UploadData @goTo="routeScreen" @updatedFiles="updateFiles" v-if="route === 'UploadData'"></UploadData> 