import FileUploader from "../components/FileUploader.js"
import Button from "../components/Button.js"
import ProgressBar from "../components/ProgressBar.js"

var UploadData = {
    data() {
        return {
            isDisabled: true,
        }
    },
    components: {
        FileUploader,
        Button,
        ProgressBar
    },
    methods: {
        handleFiles(files) {
            this.isDisabled = !(files.length > 0);
            this.$emit('updatedFiles', files);
        },
    },
    template: `
    <div id="sync-data">
        <ProgressBar currentState="Upload Data"></ProgressBar>
        <h1>Upload Your Data</h1>
        <div id="upload-data">
            <FileUploader @changedFiles="handleFiles" title="Customer Water Usage Data"></FileUploader>
            <FileUploader @changedFiles="handleFiles" title="Rebate Performance Data"></FileUploader>
        </div>  
        <Button @action="$emit('goTo', 'MapData')" text="Continue to Mapping" v-bind:isDisabled="isDisabled"></Button>
    </div> 
`
}

export default UploadData;