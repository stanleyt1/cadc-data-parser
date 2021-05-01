
const FileTile = {
    props: ['name'],
    template: `  
            <div class="file-tile">
                <div>
                    <img src="../../static/images/file_thumbnail.png">
                    <h1 >[{name}]</h1>
                </div>
                <button @click="$emit('removeFile', name)">
                    <img src="../../static/images/exit_icon.png">
                </button>
            </div>
            `
}

export default FileTile;
