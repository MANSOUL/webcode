import { FileTreeFile } from './interface'

const data: FileTreeFile = {
  id: 'am',
  name: 'webcode',
  children: [
    {
      id: 'ap',
      name: 'src',
      type: 'folder',
      children: [
        {
          id: 'a,',
          name: 'components',
          type: 'folder',
          children: [
            {
              id: 'a/',
              name: 'editor',
              type: 'folder',
              children: [
                {
                  id: 'az',
                  name: 'index.tsx',
                  type: 'file',
                  children: []
                },
                {
                  id: 'ax',
                  name: 'index.less',
                  type: 'file',
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 'af',
          name: 'index.js',
          type: 'file',
          children: []
        },
        {
          id: 'aa',
          name: 'index.css',
          type: 'file',
          children: []
        }
      ]
    },
    {
      id: 'al',
      name: 'packge.json',
      type: 'file',
      children: []
    }
  ],
  type: 'folder'
}

export default data
