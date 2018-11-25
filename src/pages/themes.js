import React from 'react'
import Layout from '../components/layout'
import theme from '../styles/theme.module.scss'
import { Link } from 'gatsby'
import { graphql } from "gatsby"
import {Helmet} from "react-helmet";

const Themes = (props) => {
  const themeList = props.data.allMarkdownRemark;
  const { totalCount } = props.data.allMarkdownRemark;
  const listCount = `${totalCount}`
  
  return (
  <Layout>
    <Helmet>
        <meta charSet="utf-8" />
        <title>BetterDocs | #1 Discord Themes</title>
    </Helmet>
    <div className={theme.themesContainer}
    >

    <section className={theme.contentWrapper}
    >

    <div className={theme.titleBar}>
      <div className={theme.count}>Themes <span>({listCount})</span></div>
      <input className={theme.input} placeholder="Search Themes library"></input>
    </div>

      <div className={theme.mainContent}
        >
          <div className={theme.wrapper}
          >
          {themeList.edges.map(({ node }, i) => (
            <div 
            className={theme.cardWrapper}
            key={node.id}
            >
              <div className={theme.imgContainer}
              >
                <img className={theme.img} alt=""></img>
              </div>
              <a 
              className={theme.author}
              href={node.frontmatter.github}
              target="blank"
              >{node.frontmatter.author} /</a>
                <div className={theme.title}
                >
                <Link 
                to={"themes" + node.fields.slug}>
                {node.frontmatter.title}
                </Link>
                </div>
              <div className={theme.description}
              >
                <p className={theme.p}
                >{node.excerpt}</p>
              </div>
            </div>
          ))}
          <p>
            Themes page WIP.
          </p>
        </div>
      </div>

    </section>


      <section className={theme.sidebarSearch}
      >
        <div className={theme.searchContainer}
        >
        <div className={theme.submitDescription}>
             Want your theme featured?
          </div>
          <Link 
          to="/themes/upload_a_theme/"
          className={theme.submitBtn}
          >
          Submit a Theme
          </Link>
        </div>
        <div className={theme.Results}
        >
        
        </div>
      </section>

    </div>
  </Layout>
)
}

export default Themes;

export const allThemesQuery = graphql`
  query allThemesQuery {
    allMarkdownRemark(filter: { collection: { eq: "themes" } }) {
      group(field: collection) {
        fieldValue
        totalCount
      }
      totalCount
      edges {
        node {
            excerpt
            html
            id
            frontmatter {
                path
                title
                author
                github
                download
                support
                layout
                description
                images {
                  image
                  name
                  }
                }
            fields {
                slug
              }
            }
        }
    }
  }
`