import { useState, useRef } from "react"
import { FaPaperclip } from "react-icons/fa"
const Description = ({ setIsValid, updateJobData }) => {
    const fileInputRef = useRef(null);
    const [description, setDescription] = useState("")
    let attachmentUrl = "https://google.com/text.txt"
    const changeDes = (text) => {
        setDescription(text)
        setIsValid(text.length > 10)
        updateJobData({
            "description": {
                text: text,
                attachmentUrl: attachmentUrl
            }
        })
    }
    const handleFileChange = (event) => {
        // Handle the file(s) selected by the user
        const files = event.target.files;
        console.log(files);
        // Process the files here (e.g., uploading to a server)
    };
    const handleFileUpload = () => {
        fileInputRef.current.click(); // Triggers the hidden file input click event
    }
    return (
        <div className="flex flex-col gap-3">
            <p className="font-semibold"> Describe what you need   </p>
            <textarea onChange={(e) => changeDes(e.target.value)} id="" cols="10" rows="10" placeholder="Already have a description? Paste it here"
                className="sm:w-1/2 outline-none border p-4 rounded-md">
            </textarea>
            <div>
                <p className="font-semibold inline">    Attach your file   </p>
                <FaPaperclip className="font-extrabold text-2xl inline ml-4 cursor-pointer" onClick={handleFileUpload} />
                <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
            </div>
        </div>
    )
}

export default Description