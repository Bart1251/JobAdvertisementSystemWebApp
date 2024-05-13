

export default function DocumentUpload({ openFileDialog, uploadFile, inputRef }) {
    return (
        <div onClick={openFileDialog} className="rounded oveflow-hidden border border-dark-subtle bg-secondary-subtle p-1" style={{maxWidth: 150}}>
            <input type="file" ref={inputRef} onChange={uploadFile} className="d-none" multiple/>
            <i className="bi bi-plus" style={{fontSize: 150}}/>
            <p className="text-center">Nowy</p>
        </div>
    )
}