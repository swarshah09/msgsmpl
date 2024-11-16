
export const formatDate = (date) => {
    const formattedDate = new Date(date);
    const hours = formattedDate.getHours();
    const minutes = formattedDate.getMinutes();

    const ampm = hours >= 12 ? 'pm' : 'am';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    
    return `${displayHours < 10 ? '0' + displayHours : displayHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
}

export const formatDatee = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1;
    const year = formattedDate.getFullYear();

    // Pad day and month with leading zero if needed
    const paddedDay = day < 10 ? '0' + day : day;
    const paddedMonth = month < 10 ? '0' + month : month;

    return `${paddedDay}/${paddedMonth}/${year}`;
};

export const downloadMedia = async (e, originalImage) => {
    e.preventDefault();
    try {
        fetch(originalImage)
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;

            const nameSplit = originalImage.split("/");
            const duplicateName = nameSplit.pop();

            // the filename you want
            a.download = "" + duplicateName + "";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.log('Error while downloading the image ', error))

    } catch (error) {
        console.log('Error while downloading the image ', error);
    }
}