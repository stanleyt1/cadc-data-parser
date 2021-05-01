var ProgressBar = {
    data() {
        return {
            states: ['Upload Data', 'Map Data', 'Review', 'Submit']
        }
    },
    props: ['currentState'],
    template: `
        <div class="progress-bar">   
            <h1 v-for="state in states">
                <span v-bind:class="{active: currentState === state}">[{state}]</span>
                <img v-if="state != 'Submit'"  src="static/images/black_arrow_right.png">
            </h1>
        </div>
    `
}

export default ProgressBar;