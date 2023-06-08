/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    corePlugins: {
        container: false
    },
    theme: {
        extend: {
            colors: {
                orange: '#ee4d2d'
            },
            backgroundImage: {
                registerImage: "url('https://down-vn.img.susercontent.com/file/sg-11134004-7qvfs-lh39gro4enef63')"
            }
        }
    },
    plugins: [
        plugin(({ addComponents, theme }) => {
            addComponents({
                '.container': {
                    maxWidth: theme('columns.7xl'),
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: theme('spacing.4'),
                    paddingRight: theme('spacing.4')
                }
            })
        })
    ]
}
