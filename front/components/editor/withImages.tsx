import CustomEditor from './CustomEditor';

import isUrl from 'is-url';
import imageExtensions from 'image-extensions';
import uploadImage from './uploadImage';

function withImages(editor) {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  // Drag and drop
  // Could do server upload stuff here
  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          reader.addEventListener('load', async () => {
            const form = new FormData();
            form.append('image', file);

            try {
              const { url } = await uploadImage(form);
              CustomEditor.insertImage(editor, url);
            } catch (error) {
              console.log(error);
            }
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      CustomEditor.insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
}

// This doesn't seem to work
export const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split('.').pop();
  return imageExtensions.includes(ext);
};

export default withImages;
