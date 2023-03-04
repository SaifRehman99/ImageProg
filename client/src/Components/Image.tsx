import { useState, useEffect } from 'react'
import Error from './Error';
import { getAllImages, uploadImage } from "../services/Image"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Pagination from '@mui/material/Pagination';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { SUPPORTED_FORMATS, myDebounce } from "../utils/helpers"
import ImageModal from './ImageModal';


const Image: React.FC = (): JSX.Element => {

    const [openModal, setOpenModal] = useState<any>({ isModalOpen: false, imageToShow: "" });

    const handleClose = () => setOpenModal({ isModalOpen: false, imageToShow: "" });


    const [imageData, setImageData] = useState<any[]>([])
    const [imageMeta, setImageMeta] = useState<any>({});
    const [previewImage, setPreviewImage] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const [currentImage, setCurrentImage] = useState<File>();

    const [search, setSearch] = useState("")


    const [loading, setLoading] = useState<boolean>(false);
    const [imageUploading, setImageUploading] = useState<boolean>(false);
    const [error, setError] = useState("");



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
                console.log('File should be in image format');
                return;
            }

            setPreviewImage(URL.createObjectURL(image));
            setCurrentImage(image)

        } catch (error: any) {
            setLoading(false);
        }
    };




    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        if (currentImage) {

            setImageUploading(true)

            //  Form Data here
            let formData = new FormData();
            formData.append('file', currentImage);

            // create image Blob Here
            await uploadImage(formData);

            getImages({ page: currentPage, name: search });

            setPreviewImage("");
            setImageUploading(false)
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
        setOpenModal({ isModalOpen: true, imageToShow: image });
    }




    if (error) return <Error errorType={'error'} message={error} />

    return (
        <div>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
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


                        <Box
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                            }}
                        >
                            <TextField fullWidth label="Search" id="fullWidth" name={search} onChange={(e) => handleChange(e)}
                                placeholder="Search via name..." variant="standard" />
                        </Box>



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
                                <img src={previewImage} alt="image" />
                                <LoadingButton loading={imageUploading} loadingIndicator="Uploading..." variant="contained" endIcon={<SendIcon />} onClick={(e) => onSubmit(e)}>
                                    Upload
                                </LoadingButton>
                            </>)}


                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">

                    <Grid container spacing={3}>
                        {loading ? <span className="loader"></span> : imageData?.length ?


                            imageData?.map((image, index) => (

                                <Grid item key={index} xs={12} sm={6} md={4}>
                                    <Card
                                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                        className='cursor'
                                        onClick={() => onImagePreview(image.image)}
                                    >
                                        <CardMedia
                                            sx={{ height: 'auto' }}
                                            component="img"
                                            image={image.image}
                                            alt={image.name}
                                        />
                                        <CardContent sx={{ height: '20%' }}>
                                            <Typography gutterBottom variant="h6" component="h6">
                                                {image.name}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )) : "No Images Uploaded..."}
                    </Grid>


                    <Stack spacing={2} mt={11} sx={{ alignItems: 'center' }}>
                        <Pagination count={imageMeta?.totalPages} variant="outlined" color="primary" onChange={(event: React.ChangeEvent<unknown>, page: number) => {
                            handlePageChange(page)
                        }} />
                    </Stack>

                </Container>
            </main>


            <ImageModal handleClose={handleClose} openModal={openModal} />
        </div>
    )
}

export default Image;