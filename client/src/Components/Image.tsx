import React, {useState, useEffect} from 'react'
import {getAllImages} from "../services/Image"

const Image:React.FC = (): JSX.Element => {

    const [imageData, setImageData] = useState([])
    const [imageMeta, setImageMeta] = useState({});

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("")


    useEffect(() => {

        const getImages = async () => {
            setLoading(true)
            try {
               const {data} = await getAllImages();

               setImageData(data?.data)
               setImageMeta(data?.meta)
               setError("")

            } catch (error:any) {
                setError(error.response?.data?.message)
            }
            setLoading(false)
        }

        getImages()
    }, [])


    if(error) return <p>{error}</p>
    
  return (
    <div>{loading ? 'loding....' : imageData?.length ? imageData?.map((image:any) => <img key={image._id} src={image.image} alt={image.name} /> ) : "No Images Uploaded..." }</div>
  )
}

export default Image