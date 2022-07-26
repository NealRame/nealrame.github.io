import {
    Link,
    type PageProps,
} from "gatsby"

import styled from "@emotion/styled"

import * as React from "react"

import {
    FontAwesomeIcon,
} from "@fortawesome/react-fontawesome"

import {
    faGithub,
} from "@fortawesome/free-brands-svg-icons"

import {
    Section,
    SectionHeader,
} from "@/components/section"

import {
    ITheme,
} from "@/style"

const ProjectList = styled.ul`
    display: grid;
    gap: .5rem;

    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    list-style: none;

    margin: 0;
    padding: 0;
`

const Project = styled.div`
    background-color: ${props => (props.theme as ITheme).projectItem.colors.background};

    border: 1px solid ${props => (props.theme as ITheme).projectItem.colors.background};
    border-radius: ${props => (props.theme as ITheme).projectItem.borderRadius};

    cursor: pointer;

    display: grid;

    grid-template-rows: min-content 100fr min-content;

    font-size: 1rem;

    padding: ${props => (props.theme as ITheme).projectItem.padding};

    max-height: 320px;

    transform: scale(1, 1);
    transition:
        transform 0.2s ease-in-out,
        border-color 0.2s ease-in-out;

    &:hover {
        border: 1px solid ${props => (props.theme as ITheme).projectItem.colors.border};
        transform: scale(1.04, 1.04);
        transition:
            transform 0.2s ease-in-out,
            border-color 0.2s ease-in-out;
    }
`

const ProjectHeader = styled.header`
    display: flex;

    align-items: baseline;
    justify-content: space-between;
`

const ProjectTitle = styled.h2`
    font-size: 1rem;

    margin: 0;
    padding-bottom: 0;
`

const ProjectFooter = styled.footer`
    font-size: 0.75rem;
`

const ProjectDescription = styled.p`
    overflow: hidden;
`

const Github = ({ repository }: { repository: string }) => {
    return <a href={ `https://github.com/${repository}` } target="_blank" >
        <FontAwesomeIcon icon={ faGithub }/>
    </a>
}

export const Projects = ({ allMdx }: IHomePageDataProps) => {
    const clickHandler = (url: string) => () => window.location.href = url
    return <Section id="projects">
        <SectionHeader>Projects</SectionHeader>
        <ProjectList>
            { allMdx.nodes.map(({ id, frontmatter}) => {
                const url = `/projects/${frontmatter.slug}`
                const { date, description, github, title } = frontmatter

                return <Project key={ id } onClick={ clickHandler(url) }>
                    <ProjectHeader>
                        <ProjectTitle>
                            <Link to={ url }>{ title }</Link>
                        </ProjectTitle>
                        { github && <Github repository={ github }/> }
                    </ProjectHeader>
                    <ProjectDescription>{ description }</ProjectDescription>
                    <ProjectFooter>
                        <span>Posted: { date }</span>
                    </ProjectFooter>
                </Project>
            }) }
        </ProjectList>
    </Section>
}
