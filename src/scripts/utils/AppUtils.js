/* @flow */

export const getRoot = (): Element => {
  let root: ?Element = document.getElementById('root')

  if (!root) {
    root = document.createElement('div')
    root.setAttribute('id', 'root')
    document.body && document.body.appendChild(root)
  }

  return root
}
