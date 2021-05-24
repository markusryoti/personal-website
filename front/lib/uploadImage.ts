import axios from 'axios';

/**
 * Takes formdata of a binary image and sends that to server.
 * Server will the upload it to AWS S3 and return the url for the image
 * @param form Browser `FormData` object
 */
async function uploadImage(form) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/images`,
    form,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  if (res.status === 200) {
    return res.data;
  }
}

export default uploadImage;
