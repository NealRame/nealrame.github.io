import Color from "color"

import {
    Theme
} from "@emotion/react"

export type IMediaQueryBreakpoint = "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"

export type IMediaQueryTypes = "screen"
    | "print"
    | "speech"
    | "tv"
    | "embedded"
    | "projection"
    | "handheld"
    | "braille"
    | "aural"
    | "all"

export type IColorKey = "background"
    | "border"
    | "foreground"
    | "link"
    | "header"

export interface INagivationBarTheme {
    colors: {
        background: string
        foreground: string
        border: string
        focus: string
        header: string
        hover: string
    },
    height: number | string,
    padding: number | string,
}

export interface INagivationPanelTheme {
    colors: {
        background: string
        foreground: string
    }
    fadeTransitionDuration: number
    slideTransitionDuration: number
}

export interface ISocialBarTheme {
    colors: {
        border: string
    }
    gap: number | string
    width: number | string
}

export interface IContentSectionTheme {
    colors: {
        border: string
        index: string
    }
    fontSizes: {
        index: number | string
    }
    headerMargin: number | string
    padding: number | string
}

export interface IError404Theme {
    colors: {
        foreground: string
        ghost: string
    }
    padding: number | string
}

export interface ITypewriterTheme {
    colors: {
        foreground: string
    }
}

export interface ITheme extends Theme {
    breakpoints: {
        [key in IMediaQueryBreakpoint]: number
    }
    colors: {
        [key in IColorKey]: string
    }
    navigationBar: INagivationBarTheme
    navigationPanel: INagivationPanelTheme
    socialBar: ISocialBarTheme
    contentSection: IContentSectionTheme
    error404: IError404Theme
    typewriter: ITypewriterTheme
}

export const color1 = Color("#0e0f10").hex()
export const color2 = Color("#cbcac5").hex()
export const color3 = Color("#6296b6").hex()
export const color4 = Color("#aff1fe").hex()
export const color5 = Color("#fa5c5c").hex()

export const theme: ITheme = {
    breakpoints: {
        small: 640,
        medium: 768,
        large: 1024,
        xlarge: 1280,
        xxlarge: 1440,
    },
    colors: {
        background: color1,
        border: color2,
        foreground: color3,
        header: color2,
        link: color4,
    },
    navigationBar: {
        colors: {
            background: color1,
            border: Color(color1).lighten(0.75).hex(),
            foreground: color3,
            header: color5,
            hover: color4,
            focus: color4,
        },
        height: "4rem",
        padding: "1rem",
    },
    navigationPanel: {
        colors: {
            background: color1,
            foreground: color4,
        },
        fadeTransitionDuration: 200,
        slideTransitionDuration: 400,
    },
    error404: {
        colors: {
            foreground: color3,
            ghost: Color(color1).lighten(.75).hex(),
        },
        padding: "5rem 3rem 0",
    },
    contentSection: {
        colors: {
            border: Color(color1).lighten(3).hex(),
            index: color4,
        },
        fontSizes: {
            index: "1rem",
        },
        headerMargin: "0 0 2rem",
        padding: "5rem 3rem 0",
    },
    socialBar: {
        colors: {
            border: color4,
        },
        gap: "1rem",
        width: "3rem",
    },
    typewriter: {
        colors: {
            foreground: Color(color4).lighten(0.05).hex(),
        }
    }
}
