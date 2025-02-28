import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; 
import { getBaseUrl } from "../../../../utils/baseURL";

const UploadImage = ({ name, setImage }) => {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");

    // Convert image to Base64
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };

    // Upload a single image
    const uploadSingleImage = async (base64) => {
        setLoading(true);
        try {
            const res = await axios.post(`${getBaseUrl()}/uploadImage`, { image: base64 });
            const imageUrl = res.data;
            setUrl(imageUrl);
            setImage(imageUrl);

            // ✅ SweetAlert2 Success Popup
            Swal.fire({
                title: "Success!",
                text: "Image uploaded successfully",
                icon: "success",
                confirmButtonColor: "#3085d6",
            });

        } catch (error) {
            console.error(error);

            // ❌ SweetAlert2 Error Popup
            Swal.fire({
                title: "Upload Failed",
                text: "There was an error uploading the image. Please try again.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        } finally {
            setLoading(false);
        }
    };

    // Handle file selection
    const uploadImage = async (event) => {
        const files = event.target.files;

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }

        const base64s = [];
        for (let i = 0; i < files.length; i++) {
            const base = await convertBase64(files[i]);
            base64s.push(base);
        }
    };

    return (
        <div>
            <label htmlFor={name} className="font-semibold">Upload Image</label>
            <input
                type="file"
                name={name}
                id={name}
                onChange={uploadImage}
                className="border rounded p-2 mt-2"
            />

            {loading && (
                <div className="mt-2 text-sm text-blue-600">Uploading image...</div>
            )}

            {url && (
                <div className="mt-2 text-sm text-green-600">
                    <p>Image uploaded successfully!</p>
                    <img src={url} alt="Uploaded" className="mt-2 w-32 h-32 object-cover rounded" />
                </div>
            )}
        </div>
    );
};

export default UploadImage;
