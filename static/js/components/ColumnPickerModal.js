

const ColumnPickerModal = {
    data() {
        return {
            selected: "",
        }
    },
    methods: {
        closeModal() {
            this.$emit('closeModal');
            this.selected = "";
        },
        updateAndCloseModal() {
            this.$emit('updateColumn', this.index, this.selected);
            this.$emit('closeModal');
            this.selected = "";
        }
    },
    props: ['visible', 'index', 'headers'],
    template: `
        <div class="modal" v-if="visible">
            <div class="popup">
                <div class="head">
                    <h1>Change Header</h1>
                    <img @click="closeModal" src="static/assets/exit_icon.png" />
                </div>
                <div class="body">
                    <p>Change <span>[{headers[index]}]</span> to: <span>[{selected}]</span></p>
                    <select v-model="selected">
                        <option disabled>Choose a new header</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                    </select>
                </div>
                <div class="footer">
                    <button @click="updateAndCloseModal" :disabled="selected === ''">Submit</button>
                </div>
            </div>
        </div>
    `
}

export default ColumnPickerModal;