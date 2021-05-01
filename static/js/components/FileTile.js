
const FileTile = {
    props: ['name'],
    template: `  
            <div class="file-tile">
                <div>
                    <img src="../../assets/file_thumbnail.png">
                    <h1 >[{name}]</h1>
                </div>
                <button @click="$emit('removeFile', name)">
                    <img src="../../assets/exit_icon.png">
                </button>
            </div>
            `
}

export default FileTile;
