var Button = {
    data() {
        return {}
    },
    props: {
        text: String,
        isDisabled: Boolean
    },
    template: `
        <button :disabled="isDisabled" class="next-btn" @click="$emit('action')">
            [{text}]
            <img src="/static/assets/white_arrow_right.png">
        </button>
    `
}

export default Button;