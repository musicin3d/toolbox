import Md5Tool from './tools/Md5'


export default [
    {
        title: 'Hashes',
        routes: [
            {
                path: '/md5',
                title: 'MD5',
                render: Md5Tool,
            }
        ]
    }
]