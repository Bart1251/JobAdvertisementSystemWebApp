

export default function Document({ filename, downloadFile, deleteFile }) {
    return (
        <div onClick={() => downloadFile(filename)} className="rounded oveflow-hidden border border-dark-subtle bg-secondary-subtle p-1" style={{maxWidth: 150}}>
            <i className="bi bi-x-lg" onClick={(e) => deleteFile(e, filename)}/>
            <i className={"bi bi-file-earmark-" + ((filename?.split('.').pop()) == "pdf" ? "pdf" : filename?.split('.').pop() == "doc" || filename?.split('.').pop() == "docx" ? "word" : "image")} style={{fontSize: 150}}/>
            <p className="text-center text-break">{filename}</p>
        </div>
    )
}