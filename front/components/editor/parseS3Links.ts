import { Text } from 'slate';

/**
 *
 * @param node Node in slate object tree
 * @returns List of image urls found in post
 */
export function parseS3Links(node) {
  if (Text.isText(node)) {
    return;
  }

  if (node.type === 'image') {
    return node.url;
  }

  const children = node.children
    ? node.children.filter((p) => p.children).map((n) => parseS3Links(n))
    : [];

  return children
    .map((child) => {
      if (child.type === 'image') {
        return node.url;
      }
      return '';
    })
    .filter((item: string) => item !== '');
}
