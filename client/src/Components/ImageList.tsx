import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { IImageList } from '../interface/interface';
import Typography from '@mui/material/Typography';


const ImageList: React.FC<IImageList> = ({ index, image, onImagePreview }) => {
    return (
        <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
                sx={{ maxHeight: '100%', display: 'flex', flexDirection: 'column' }}
                className='cursor'
                onClick={() => onImagePreview(image.image)}
            >
                <CardMedia
                    sx={{ height: '20vh' }}
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
    )
}

export default ImageList