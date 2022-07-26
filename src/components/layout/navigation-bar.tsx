/** @jsx jsx */
/** @jsxFrag React.Fragment */

import { Link } from "gatsby"

import styled from "@emotion/styled"
import {
    type Theme,
    jsx,
    useTheme,
} from "@emotion/react"

import * as React from "react"

import {
    CSSTransition,
} from "react-transition-group"

import {
    FontAwesomeIcon,
} from "@fortawesome/react-fontawesome"

import {
    faBars,
    faXmark,
} from "@fortawesome/free-solid-svg-icons"

import {
    type ITheme,
    mediaQueryMaxWidth,
    mediaQueryMinWidth,
} from "@/style"

import NavigationPanel from "./navigation-panel"

/* style helpers *************************************************************/

function color<T extends { theme: Theme }>(
    c: keyof ITheme["navigationBar"]["colors"]
): ({ theme }: T) => string {
    return ({ theme }) => (theme as ITheme).navigationBar.colors[c]
}

function fadeDuration<T extends { theme: Theme }>({
    theme
}: T): number {
    return (theme as ITheme).navigationPanel.fadeTransitionDuration
}

function slideDuration<T extends { theme: Theme }>({
    theme
}: T): number {
    return (theme as ITheme).navigationPanel.slideTransitionDuration
}

/*****************************************************************************/

const Button = styled.button`
    display: none;
    ${mediaQueryMaxWidth("small")} {
        display: inline;

        background-color: transparent;
        border: none;
    
        color: ${props => (props.theme as ITheme).navigationPanel.colors.foreground};
    
        cursor: pointer;
        outline: none;
        padding: 0;
    
        z-index: 2;
    
        &:focus {
            color: ${color("focus")};
        }
        &:hover {
            color: ${color("hover")};
        }
    }
`

const Title = styled.h1`
    display: inline;
    
    color: ${color("header")};

    font-family: lores-9-wide, sans-serif;
    font-size: 1.5rem;
    font-weight: 900;

    margin: 0;

    ${mediaQueryMaxWidth("small")} {
        font-family: lores-9-wide, sans-serif;
        font-size: 2rem;
        font-weight: 900;

        text-align: center;
    
        &.enter {
            opacity: 1;
        }
        &.enter-active {
            opacity: 0;
            transition: opacity ${fadeDuration}ms ease-in-out;
        }
        &.enter-done {
            opacity: 0;
        }
        &.exit {
            opacity: 0;
        }
        &.exit-active {
            opacity: 1;
            transition-property: opacity;
            transition-delay: ${slideDuration}ms;
            transition-duration: ${fadeDuration}ms;
            transition-timing-function: ease-in-out;
        }
        &.exit-done {
            opacity: 1;
        }
    }

    & > a {
        color: inherit;
    }
`

const NavigationBarWrapper = styled.div`
    background-color: ${color("background")};

    display: grid;
    grid-template-columns: min-content 100fr;

    align-items: baseline;
    align-content: center;

    box-sizing: border-box;

    padding: 0 1rem;

    height: ${props => (props.theme as ITheme).navigationBar.height};

    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    z-index: 1;

    transition:
        box-shadow ${slideDuration}ms ease-in-out,
        -webkit-box-shadow ${slideDuration}ms ease-in-out;

    &.sticky {
        box-shadow: 0px 0px 16px 8px rgba(0, 0, 0, 0.5);
        -webkit-box-shadow: 0px 0px 16px 8px rgba(0, 0, 0, 0.5);

        transition:
            border-color ${slideDuration}ms ease-in-out,
            box-shadow ${slideDuration}ms ease-in-out,
            -webkit-box-shadow ${slideDuration}ms ease-in-out;

        ${mediaQueryMinWidth("medium")} {
            &::after {
                border-bottom: 1px solid ${color("border")};

                left: 0%;
                right: 0%;

                transition:
                    left ${slideDuration}ms ease-in-out,
                    right ${slideDuration}ms ease-in-out;
            }
        }
    }

    ${mediaQueryMinWidth("medium")} {
        &::after {
            border-bottom: 1px solid ${color("border")};

            content: "";

            display: block;

            position: absolute;
            bottom: 0;
            left: 50%;
            right: 50%;

            transition:
                left ${slideDuration}ms ease-in-out,
                right ${slideDuration}ms ease-in-out;
        }
    }
`

interface INavigationBarProps {
    siteTitle: string
    sticky: boolean
}

const NavigationBar = ({ siteTitle, sticky }: INavigationBarProps) => {
    const theme = useTheme() as ITheme
    const [pageMenuActive, setPageMenuActive] = React.useState(false)

    return <NavigationBarWrapper className={ sticky ? "sticky" : ""}>
        <Button
            onClick={ () => setPageMenuActive(!pageMenuActive) }>
            <FontAwesomeIcon
                icon={ pageMenuActive ? faXmark : faBars }
                size="2x"
                fixedWidth
            />
        </Button>
        <CSSTransition
            in={ pageMenuActive }
            timeout={ fadeDuration({ theme }) + slideDuration({ theme }) }
        ><Title><a href="/">{ siteTitle }</a></Title></CSSTransition>
        <NavigationPanel active={ pageMenuActive }>
            <li><Link onClick={ () => setPageMenuActive(false) } to="/#about">About</Link></li>
            <li><Link onClick={ () => setPageMenuActive(false) } to="/#contact">Contact</Link></li>
            <li><Link onClick={ () => setPageMenuActive(false) } to="/#projects">Projects</Link></li>
        </NavigationPanel>
    </NavigationBarWrapper>
}

export default NavigationBar