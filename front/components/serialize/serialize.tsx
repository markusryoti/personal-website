import { Text } from 'slate';

/**
 *
 * @param node Slate document node
 * @returns HTML string that can be injected to a post
 */
function serialize(node) {
  if (Text.isText(node)) {
    let string = node.text;
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    return string;
  }

  const children = node.children
    .filter((p) => p.children || p.text)
    .map((n) => serialize(n))
    .join('');

  switch (node.type) {
    case 'h1':
      return `<h1>${children}</h1>`;
    case 'h2':
      return `<h2>${children}</h2>`;
    case 'h3':
      return `<h3>${children}</h3>`;
    case 'h4':
      return `<h4>${children}</h4>`;
    case 'h5':
      return `<h5>${children}</h5>`;
    case 'h6':
      return `<h6>${children}</h6>`;
    case 'link':
      return `<a href=${node.url} target="_blank">${children}</a>`;
    case 'code':
      return ` <pre>
                <code>${children}</code>
               </pre>`;
    case 'quote':
      return `<blockquote >${children}</blockquote>`;
    case 'image':
      return `<img src=${node.url} alt=''/>`;
    case 'ordered-list':
      return `<ol>${children}</ol>`;
    case 'bullet-list':
      return `<ul>${children}</ul>`;
    case 'list-item':
      return `<li>${children}</li>`;
    default:
      return `<p>${children}</p>`;
  }
}

export default serialize;
