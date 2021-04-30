import ColumnPickerModal from "../components/ColumnPickerModal.js"

const TableHead = {
    data() {
        return {

        }
    },
    methods: {
        statusExtraction(index) {
            return this.status[index];
        }
    },
    props: ['rowData', 'status'],
    template: ` 
    <tr class=table-head>
        <td v-for="(value, index) in rowData" :class="statusExtraction(index)"@click="$emit('openModal', index)">
            <img src="/static/assets/file_edit_icon.png">
            [{value}]        
        </td>
    </tr>
    `
}

const TableRow = {
    data() {
        return {}
    },
    props: ['rowData'],
    template: ` 
        <tr class="table-row">
            <td v-for="(value, index) in rowData">[{value}]</td>
        </tr>
    `
}

const FileTable = {
    data() {
        return {
            status: [],
            isVisible: false,
            index: -1,
            headers: [],
            numValid: 0
        }
    },
    props: ['parsedFile', 'rawFile'],
    components: {
        TableHead,
        TableRow,
        ColumnPickerModal
    },
    mounted: function () {
        this.headers = this.parsedFile[0];
        this.numValid = 0;
        let headers = new Set();
        const desiredHeaders = new Set(["due", "firstName", "lastName"]);
        // push status of every column to this.status
        for (let i = 0; i < this.headers.length; i++) {
            let element = this.headers[i];
            if (headers.has(element)) {
                this.status.push("duplicate");
            } else {
                if (desiredHeaders.has(element)) {
                    this.numValid++;
                    this.status.push("valid");
                    headers.add(element);
                } else {
                    this.status.push("invalid");
                }
            }
        };
    },
    methods: {
        calculateStatus() {
            this.numValid = 0;
            let headers = new Set();
            const desiredHeaders = new Set(["due", "firstName", "lastName"]);
            let temp = [];
            // push status of every column to this.status
            for (let i = 0; i < this.headers.length; i++) {
                let element = this.headers[i];
                if (headers.has(element)) {
                    temp.push("duplicate");
                } else {
                    if (desiredHeaders.has(element)) {
                        temp.push("valid");
                        this.numValid++;
                        headers.add(element);
                    } else {
                        temp.push("invalid");
                    }
                }
            };

            this.status = temp;
            console.log(this.status);
        },
        showModal(index) {
            this.index = index;
            this.isVisible = true;
        },
        hideModal() {
            this.isVisible = false;
        },
        updateColumn(index, newHeader) {
            let temp = [...this.headers];
            temp[index] = newHeader;
            this.headers = temp;
            this.calculateStatus();
            this.$emit('updatedFile', this.headers);
        }
    },
    template: `
        <div class="file-table">
            <ColumnPickerModal @closeModal="hideModal" @updateColumn="updateColumn" :visible="isVisible" :headers="headers" :index="index"></ColumnPickerModal>
            <h1>We found <span>[{parsedFile.length}]</span> rows in <span>[{rawFile.name}]</span></h1>
            <div class="table-container">
                <table class="table">
                    <TableHead @openModal="showModal" :rowData="headers" :status="status"></TableHead>
                    <TableRow v-for="index in 5" :key="index" :rowData="parsedFile[index]"></TableRow>
                </table>
            </div>
            <p><span>[{numValid}]</span> out of <span>[{parsedFile[0].length}]</span> columns will  be imported </p>
        </div>
    `
}

export default FileTable;