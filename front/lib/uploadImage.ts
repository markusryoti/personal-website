import axios from 'axios';

async function uploadImage(form) {
  try {
    const res = await axios.post(`${process.env.API_URL}/images`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export default uploadImage;
