import express from 'express';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

import { authenticateToken } from '../../middlewares';

import { uploadFile } from '../../lib/s3';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  upload.single('image'),
  async (req: any, res: any, next: any) => {
    try {
      const file = req.file;
      console.log(file);

      // TODO
      // Upload to s3
      const s3UploadResult = await uploadFile(file);
      // console.log(s3UploadResult);
      const { Location } = s3UploadResult;

      // TODO
      // Add to photos, return photos.id
      // Return to the client, update post_images when post is published

      res.json({ url: Location });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
