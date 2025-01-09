export const convertWordToPDF = async (arrayBuffer) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            body: arrayBuffer
        });

        if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            console.log('PDF ArrayBuffer received:', arrayBuffer);
            return arrayBuffer

            // Create a Blob from the ArrayBuffer and download it as a PDF
            // const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
            // const url = window.URL.createObjectURL(blob);
            // const a = document.createElement('a');
            // a.style.display = 'none';
            // a.href = url;
            // a.download = 'converted.pdf';
            // document.body.appendChild(a);
            // a.click();
            // window.URL.revokeObjectURL(url);
        } else {
            console.error('Failed to convert the document:', await response.json());
        }
    } catch (error) {
        console.error('Failed to convert the document:', error);
    }
}
