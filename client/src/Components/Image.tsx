/**
 * Import React and States
 */
import { useState, useEffect } from 'react'


/**
 * Importing Component Here
 */

import Error from './Error';
import ImageModal from './ImageModal';


/**
 * Importing Helpers/Utility/Custom functions here
 */

import { getAllImages, uploadImage } from "../services/Image"
import { SUPPORTED_FORMATS, myDebounce } from "../utils/helpers"


/**
 * Imports from MUI Library
 */

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ImageList from './ImageList';



const Image: React.FC = (): JSX.Element => {

    /**
       * Component States Below
    **/


    // open/close image modal
    const [openModal, setOpenModal] = useState<any>({ isModalOpen: false, imageToShow: "" });
    
    // image data from API
    const [imageData, setImageData] = useState<any[]>([])
    const [imageMeta, setImageMeta] = useState<any>({});

    // Image Preview when upload ( temp view on screen after selecting image )
    const [previewImage, setPreviewImage] = useState("")

    // Pagination Page
    const [currentPage, setCurrentPage] = useState(1)

    // file object here, to sending to client
    const [currentImage, setCurrentImage] = useState<File>();

    // name wise searching of image
    const [search, setSearch] = useState("")


    // Loading and error states
    const [loading, setLoading] = useState<boolean>(false);
    const [imageUploading, setImageUploading] = useState<boolean>(false);
    const [error, setError] = useState("");



    // Handler for closing of image modal
    const handleClose = () => setOpenModal({ isModalOpen: false, imageToShow: "" });



    // getting all images from API
    const getImages = async ({ page, name }: {
        page: number;
        name: string;
    }): Promise<void> => {

        setLoading(true)
        try {
            const { data } = await getAllImages({ page, name });

            setImageData(data?.data)
            setImageMeta(data?.meta)
            setError("")

        } catch (error: any) {
            setError(error.response?.data?.message)
        }
        setLoading(false)
    }




    useEffect(() => {

        getImages({ page: currentPage, name: search });

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
                setError('File should be in image format');
                return;
            }

            setPreviewImage(URL.createObjectURL(image));
            setCurrentImage(image)
            setError("")

        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };




    // Submit handler, before sending form data to API
    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        if (currentImage) {

            try {

            setImageUploading(true)

            //  Form Data here
            let formData = new FormData();
            formData.append('file', currentImage);

            // create image Blob Here
            await uploadImage(formData);

            getImages({ page: currentPage, name: search });

            setPreviewImage("");
            setImageUploading(false)
            } catch (error:any) {
            
            setError(error)
            setImageUploading(false)

            }
        }
    }


    // Pagination Handler
    const handlePageChange = (page: number) => {
        if (page < 1 || page > imageMeta?.totalPages) return;
        setCurrentPage(page);
    }


    // While searching via name, using debounce here to minimize the Database hits
    const handleChange = myDebounce((event: React.ChangeEvent<HTMLInputElement>) => {

        setSearch(event.target.value)


    }, 1000);



    // image preview on modal
    const onImagePreview = (image: string | HTMLImageElement) => setOpenModal({ isModalOpen: true, imageToShow: image });



    return (
        <div>

            {error && <Error errorType={'error'} message={error} />}
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        {/* Header  */}
                        <Typography
                            component="h3"
                            variant="h3"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            ImageProg 🚀
                        </Typography>
                        <Typography variant="h6" align="center" color="text.secondary" paragraph>
                            ImageProg is a professional Image Uploder, do it and view it.
                        </Typography>


                        {/* Search */}
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                            }}
                        >
                            <TextField fullWidth label="Search" id="fullWidth" onChange={(e) => handleChange(e)}
                                placeholder="Search via name..." variant="standard" />
                        </Box>




                        {/* Image upload button */}
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >

                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" name="myFile" onChange={e => handleSelectImage(e)} />
                                <PhotoCamera />
                            </IconButton>

                            {previewImage && (<>
                                <img src={previewImage} alt="image" className="uploadPreview"/>
                                <br/>
                                <LoadingButton data-testid="UploadBtn" loading={imageUploading} loadingIndicator="Uploading..." variant="contained" endIcon={<SendIcon />} onClick={(e) => onSubmit(e)}>
                                    Upload
                                </LoadingButton>
                            </>)}
                        </Stack>



                    </Container>
                </Box>


                <Container sx={{ py: 8 }} maxWidth="md">

                    {/* image Boxes */}
                    <Grid container spacing={3}>
                        {loading ? <span className="loader"></span> : imageData?.length ?


                            imageData?.map((image, index) => ( <ImageList onImagePreview={onImagePreview} index={index} image={image} />)) : <Error errorType={'warning'} message={'No Images Found...'} />}
                    </Grid>



                  {/* Pagination View */}
                    <Stack spacing={2} mt={11} sx={{ alignItems: 'center' }}>
                        <Pagination count={imageMeta?.totalPages} variant="outlined" color="primary" onChange={(event: React.ChangeEvent<unknown>, page: number) => {
                            handlePageChange(page)
                        }} />
                    </Stack>

                </Container>
            </main>
              


               {/* Modal */}
            <ImageModal handleClose={handleClose} openModal={openModal} />
        </div>
    )
}

export default Image;