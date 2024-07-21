// ! JUST AN EXAMPLE
export default function filesSample() {
  return {
    id: 'userId-username-projectName',
    hash: 'fbb65d54562c1f8abb1f988eacb803c50dffdb3cf1d8bffb5a999e0e48306eaa',
    root: {
      path: '/',
      'index.html':
        '<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Code Fusion</title></head><body></body></html>',
      'style.css': 'body { background-color: #fff; }',
      'script.js': 'console.log("Hello World!")',
      'src/': {
        path: '/src',
        'style.css': 'body { background-color: #fff; }',
        'main.js': 'console.log("Hello World!")',
        'components/': {
          path: '/src/components',
          'style.css': 'body { background-color: #fff; }',
          'script.js': 'console.log("Hello World!")',
          'components/': {
            path: '/src/components/components',
            'style.css': 'body { background-color: #fff; }',
            'script.js': 'console.log("Hello World!")',
          },
        },
      },
      'config/': {
        path: '/config',
        'style.css': 'body { background-color: #fff; }',
        'script.js': 'console.log("Hello World!")',
      },
    },
  }
}
