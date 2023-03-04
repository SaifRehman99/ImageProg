import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Typography from '@mui/material/Typography';
import {ILayout} from "../interface/interface"




const Layout: React.FC<ILayout> = ({ children }) => {
    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Image Prog
                    </Typography>
                </Toolbar>
            </AppBar>

            {children}
        </>
    )
}

export default Layout