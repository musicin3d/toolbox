import Md5 from './tools/Md5'
import EjsToHbs from './tools/EjsToHbs'


export default [
    {
        title: 'Hashes',
        routes: [
            {
                path: '/md5',
                title: 'MD5',
                render: Md5,
            }
        ]
    },
    {
        title: 'Transpilers',
        routes: [
            {
                path: '/ejs-hbs',
                title: 'EJS to HBS',
                render: EjsToHbs,
            }
        ]
    },
]