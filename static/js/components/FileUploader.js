import FileTile from "./FileTile.js"

var FileUploader = {
    data() {
        return {
            files: []
        }
    },
    props: ['title'],
    components: {
        FileTile
    },
    methods: {
        // updates list of files 
        getFiles() {
            const fileInput = $('#file-input');
            this.files = [...fileInput[0].files];
            this.$emit('changedFiles', this.files);
        },

        // activates the file input when div is clicked
        openFiles(event) {
            if (!$(event.target).is("img"))
                $('#file-input').click();
        },

        // gets all dropped files (only excel or csv)
        dropFiles(event) {
            event.preventDefault();
            const pattern = new RegExp("^.+\.(xlsx|xls|csv)$")
            this.files = [...event.dataTransfer.files].filter(file => {
                return pattern.test(file.name);
            });
            this.$emit('changedFiles', this.files);
        },

        // prevents opening files on drop
        dragOver(event) {
            event.preventDefault();
        },

        //removes a file from the list
        deleteFile(fileName) {
            let file = this.files.find(file => file.name === fileName);
            this.files.splice(this.files.indexOf(file), 1);

            this.$emit('changedFiles', this.files);
        }
    },
    template: `
        <div class="file-uploader">
            <h1>[{title}]</h1>
            <div class="drop-area" @click="openFiles" @drop="dropFiles" @dragover="dragOver" v-bind:class="{ready: files.length != 0 }" >
                <input @change="getFiles" id="file-input" type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    multiple />
                    <img v-if="files.length == 0" src="static/images/upload-file-thumbnail.png">
                    <p v-if="files.length == 0">Click or Drag to Upload Files</p>
                    <FileTile v-for="file in files" @removeFile="deleteFile" v-bind:name="file.name" v-bind:key="file.name"></FileTile>
            </div>
        </div>
    `
}

export default FileUploader;
