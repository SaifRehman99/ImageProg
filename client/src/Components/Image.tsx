import React, { useState, useEffect } from 'react'
import { getAllImages, uploadImage } from "../services/Image"


const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

const Image: React.FC = (): JSX.Element => {

    const [imageData, setImageData] = useState<any[]>([])
    const [imageMeta, setImageMeta] = useState({});
    const [previewImage, setPreviewImage] = useState("")

    const [currentImage, setCurrentImage] = useState<File>();


    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("")


    useEffect(() => {

        const getImages = async () => {
            setLoading(true)
            try {
                const { data } = await getAllImages();

                setImageData(data?.data)
                setImageMeta(data?.meta)
                setError("")

            } catch (error: any) {
                setError(error.response?.data?.message)
            }
            setLoading(false)
        }

        getImages();
    }, [])





    // Image Upload Handler
    const handleSelectImage = async (event: React.ChangeEvent<HTMLInputElement>) => {

        const target = event.target.files as FileList;

        const image = (target as FileList)[0];


        if (!image) {
            return;
        }

        try {
            // IF FILE IF GREATER THAN > 3MB
            if (image.size > 3000000) {
                console.log('File size should not exceed 3MB');
                return;
            }

            // IF FILE DOES NOT SUPPORT FORMAT
            if (!SUPPORTED_FORMATS.includes(image.type)) {
                console.log('File should be in image format');
                return;
            }

            setPreviewImage(URL.createObjectURL(image));
            setCurrentImage(image)



            // Memory management
            // Each time you call createObjectURL(), a new object URL is created, even if you've already created one for the same object. Each of these must be released by calling URL.revokeObjectURL() when you no longer need them.

            // URL.revokeObjectURL(image)
            // img = "";
            // image = "";

            // ============================================================ //
        } catch (error: any) {
            setLoading(false);
        }
    };


    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {


        if (currentImage) {

            //  Form Data here
            let formData = new FormData();
            formData.append('file', currentImage);

            // create image Blob Here
            const { data} = await uploadImage(formData);

            setImageData(prevImageData => [...prevImageData, data?.data])

        }
    }



    if (error) return <p>{error}</p>

    return (
        <div>

            <p>Search....</p>

            <input type="text" />
            <label>Search for the image</label>

            <br />
            <br />
            <br />



            <p>upload Image....</p>

            {previewImage && <img src={previewImage} alt="image" />}


            <button onClick={(e) => onSubmit(e)}> Upload</button>

            <input type="file" onChange={e => handleSelectImage(e)} />
            <label>Search for the image</label>

            {loading ? 'loding....' : imageData?.length ? imageData?.map((image: any) => <img key={image._id} src={image.image} alt={image.name} />) : "No Images Uploaded..."}
        </div>
    )
}

export default Image