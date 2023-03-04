export interface ILayout {
    children: React.ReactNode
}

export interface IError  {
    errorType : "error" | 'warning' | 'info' | 'success',
    message   : string
}


export interface IImageModal {
  openModal: {
    isModalOpen: boolean, imageToShow: string | undefined
  },
  handleClose: () => void
}


export interface IImageList {
    index : number | string;
    image : {
        image: string,
        name : string
    },
    onImagePreview : (image:string | HTMLImageElement) => void
}