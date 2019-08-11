import gql from 'graphql-tag'

export const GET_PAGE_DETAILS = gql`
    query getPageDetails($url: String!) {
        getPageDetails(url: $url) {
            title
            htmlVersion
            doctype
            internalLinks
            externalLinks
            links {
                url,
                internal,
                text
            }
        }
    }
`