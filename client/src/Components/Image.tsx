import React, { useState, useEffect } from 'react'
import { getAllImages, uploadImage } from "../services/Image"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

const Image: React.FC = (): JSX.Element => {

    const [openModal, setOpenModal] = useState<any>({isModalOpen:false, imageToShow:""});

    const handleClose = () => setOpenModal({isModalOpen:false, imageToShow:""});


    const [imageData, setImageData] = useState<any[]>([])
    const [imageMeta, setImageMeta] = useState<any>({});
    const [previewImage, setPreviewImage] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const [currentImage, setCurrentImage] = useState<File>();

    const [search, setSearch] = useState("")


    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");




    const myDebounce = (fn: any, delay: any) => {

        let timer: any;

        return function (...args: any[]) {
            if (timer) clearTimeout(timer);

            timer = setTimeout(() => {

                fn(...args);

            }, delay);
        };
    };





    useEffect(() => {

        const getImages = async () => {

            setLoading(true)
            try {
                const { data } = await getAllImages({ page: currentPage, name: search });

                setImageData(data?.data)
                setImageMeta(data?.meta)
                setError("")

            } catch (error: any) {
                setError(error.response?.data?.message)
            }
            setLoading(false)
        }


        getImages();

    }, [currentPage, search])





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
            const { data } = await uploadImage(formData);

            setImageData(prevImageData => [...prevImageData, data?.data])

        }
    }



    const handlePageChange = (page: number) => {
        if (page < 1 || page > imageMeta?.totalPages) return;

        setCurrentPage(page);
    }


    const handleChange = myDebounce((event: React.ChangeEvent<HTMLInputElement>) => {

        setSearch(event.target.value)

    }, 1000);



    const onImagePreview = (image: HTMLImageElement) => {
        setOpenModal({isModalOpen:true, imageToShow:image});
    }




    if (error) return <p>{error}</p>

    return (
        <div>

            <p>Search....</p>

            <input type="text" name={search} onChange={(e) => handleChange(e)} />
            <label>Search for the image</label>

            <br />
            <br />
            <br />



            <p>upload Image....</p>

            {previewImage && <img src={previewImage} alt="image" />}


            <button onClick={(e) => onSubmit(e)}> Upload</button>

            <input type="file" onChange={e => handleSelectImage(e)} />
            <label>Search for the image</label>

            {loading ? 'loding....' : imageData?.length ? imageData?.map((image: any) => <img key={image._id}
                className='cursor'
                onClick={() => onImagePreview(image.image)}
                src={image.image} alt={image.name} />) : "No Images Uploaded..."}

            <br />
            <br />
            <br />


            <button onClick={() => handlePageChange(currentPage - 1)}>Prev</button>{Array.from({ length: imageMeta?.totalPages }, (_, idx) => ++idx).map((page, index) =>
                <span key={index} className={`m-10 cursor ${currentPage === page ? 'active' : ""}`} onClick={(e) => handlePageChange(page)}>{page}</span>)}<button
                    onClick={() => handlePageChange(currentPage + 1)}>Next</button>



            <Modal
                open={openModal?.isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <img src={openModal?.imageToShow} />
                </Box>

            </Modal>


        </div>
    )
}

export default Image