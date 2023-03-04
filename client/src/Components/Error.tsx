import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {IError} from "../interface/interface"

const Error:React.FC<IError> = ({errorType, message}):JSX.Element => {
  return (

    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={errorType}>{message}</Alert>
    </Stack>

    
  )
}

export default Error