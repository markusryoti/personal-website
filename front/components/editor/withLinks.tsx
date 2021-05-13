import CustomEditor from './CustomEditor';

import isUrl from 'is-url';

function withLinks(editor) {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.insertText = (text) => {
    if (text && text.startsWith('http')) {
      console.log('link');

      CustomEditor.wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  return editor;
}

export default withLinks;
