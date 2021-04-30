import ProgressBar from "../components/ProgressBar.js"
import FileTable from "../components/FileTable.js"
import Button from "../components/Button.js"
import { parseFile } from "../form-utils.js"


const MapData = {
    data() {
        return {
            parsedFiles: [],
            rawFiles: [],
        }
    },
    props: ['files'],
    mounted: function () {
        this.rawFiles = this.files;
        this.rawFiles.forEach(async (file) => {
            try {
                this.parsedFiles.push(await parseFile(file));
            } catch (error) {
                console.log(error);
            }
        })
    },
    components: {
        ProgressBar,
        FileTable,
        Button,
    },
    methods: {
        updateFiles(headers, index) {

            let temp = [];
            temp = [...this.parsedFiles[index]];
            temp[0] = headers;
            this.parsedFiles[index] = temp;
            this.$emit('updatedFiles', this.parsedFiles)
        }
    },
    template: `
        <div id="map-data">
            <ProgressBar currentState="Map Data"></ProgressBar>
            <h1>Map Column Labels</h1>
            <FileTable v-for="(value, index) in parsedFiles" :key="index" @updatedFile="updateFiles($event, index)"  :parsedFile="value" :rawFile="rawFiles[index]"></FileTable>
            <Button text="Continue to Review" @action="$emit('goTo', 'ReviewData')"></Button>
        </div>
    `
}

export default MapData;