import ProgressBar from "../components/ProgressBar.js"
const ReviewData = {
    data() {
        return {}
    },
    components: {
        ProgressBar,
    },
    props: ['files'],
    template: `
        <div id="review-data">
            <ProgressBar currentState="Review"></ProgressBar>
            <h1>Review</h1>
        </div>
    `
}

export default ReviewData;