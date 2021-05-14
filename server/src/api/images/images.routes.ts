import express from 'express';
import multer from 'multer';
import fs from 'fs';

import util from 'util';
const unlinkFile = util.promisify(fs.unlink);

const upload = multer({ dest: 'uploads/' });

import { authenticateToken } from '../../middlewares';
import { uploadFile } from '../../lib/s3';
import Images from './images.model';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  upload.single('image'),
  async (req: any, res: any, next: any) => {
    try {
      const file = req.file;
      const s3UploadResult = await uploadFile(file);
      const { Location } = s3UploadResult;
      await unlinkFile(file.path);

      await Images.query().insert({
        url: Location,
        user_id: req.user.id,
      });

      res.json({ url: Location });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
