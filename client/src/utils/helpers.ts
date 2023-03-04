export const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    p: 4,
};


export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];


export const myDebounce = (fn: any, delay: any) => {

    let timer: any;

    return function (...args: any[]) {
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {

            fn(...args);

        }, delay);
    };
};
