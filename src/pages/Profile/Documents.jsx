import Document from "./Document"
import { useApi } from "../../contexts/ApiContext"
import { useUser } from "../../contexts/UserContext";
import DocumentUpload from "./DocumentUpload";
import { useRef } from "react";


export default function Documents({ files, setFiles }) {
    const { apiRequest } = useApi();
    const { user } = useUser();
    const inputRef = useRef();

    async function downloadFile(filename) {
        const file = await apiRequest(`http://127.0.0.1/file/${user}/${filename}`, "GET", null, {}, true);
        if(file)
            window.open(file, '_blank', 'noopener,noreferrer');
        else
            console.log("Error");
    }
    
    async function uploadFile(e) {
        const files = e.target.files;
        if (files.length == 0)
            return;

        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf|\.doc|\.docx)$/i;

        for (let i = 0; i < files.length; i++) {
            if (!allowedExtensions.exec(files[i].name)) {
                console.log('Invalid file type');
                e.target.value = '';
                return;
            }
        }

        const allFiles = await apiRequest(`http://127.0.0.1/file/${user}`, "POST", null, {}, false, files);
    
        if(allFiles) {
            setFiles(allFiles);
        } else {
            console.log("Error");
        }
        e.target.value = '';
    }

    async function deleteFile(e, filename) {
        e.stopPropagation();
        const success = await apiRequest(`http://127.0.0.1/file/${user}/${filename}`, "DELETE");
        if(success)
            setFiles(files.filter(e => e != filename));
        else
            console.log("Error");
    }

    function openFileDialog() {
        inputRef.current.click();
    }

    return (
       <div className="m-2 m-lg-5">
            <div className="d-flex flex-row flex-wrap gap-2">
                {files.map((e, i) => <Document key={i} filename={e} downloadFile={downloadFile} deleteFile={deleteFile}/>)}
                <DocumentUpload openFileDialog={openFileDialog} uploadFile={uploadFile} inputRef={inputRef}/>
            </div>
       </div> 
    )
}