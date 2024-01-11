import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import { PaletteMode } from '@mui/material'

// A custom theme for this app
const toroTheme = (mode: PaletteMode) => {
    return createTheme({
        palette: {
            mode,
            primary: {
                light: '#d01e2e',
                main: '#CD2027',
                dark: '#8e0000',
                contrastText: '#fff',
            },
            secondary: {
                light: '#5C5C5C',
                main: '#333333',
                dark: '#0c0c0c',
                contrastText: '#fff',
            },
            critical: {
                light: '#f64b2d',
                main: '#BB0000',
                dark: '#830000',
                contrastText: '#fff',
            },
            error: {
                light: '#FF7C4C',
                main: '#DC4A20',
                dark: '#A30E00',
                contrastText: '#fff',
            },
            warning: {
                light: '#FFF451',
                main: '#FFC20A',
                dark: '#C79200',
                contrastText: '#000',
            },
            info: {
                light: '#5686E8',
                main: '#005AB5',
                dark: '#003284',
                contrastText: '#fff',
            },
            success: {
                light: '#7CECDB',
                main: '#45B9A9',
                dark: '#00887A',
                contrastText: '#000',
            },
            background: {
                default: grey[100],
                paper: '#fff',
            },
            ...(mode === 'dark' && {
                background: {
                    default: grey[800],
                    paper: '#000',
                },
            }),
            text: {
                ...(mode === 'light'
                    ? {
                          primary: grey[900],
                          secondary: grey[800],
                      }
                    : {
                          primary: '#fff',
                          secondary: grey[500],
                      }),
            },
        },
    })
}

declare module '@mui/material/styles' {
    interface Palette {
        critical: Palette['primary']
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        critical?: PaletteOptions['primary']
    }
}

export default toroTheme
