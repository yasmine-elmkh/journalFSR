export const convertToBase64 = (img) => {
    if(!img.files[0]) return null ;

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(img.files[0]);
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = err => {
            reject(err)
        };
    });
}
