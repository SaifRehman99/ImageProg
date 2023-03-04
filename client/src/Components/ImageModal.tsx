import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { style } from "../utils/helpers"
import {IImageModal} from "../interface/interface"



const ImageModal: React.FC<IImageModal> = ({ openModal, handleClose }): JSX.Element => {
  return (
    <Modal
      open={openModal?.isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">

      <Box sx={style}>
        <img src={openModal?.imageToShow} />
      </Box>

    </Modal>
  )
}

export default ImageModal