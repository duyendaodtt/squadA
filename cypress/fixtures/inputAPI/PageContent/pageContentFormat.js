query {
  page_content_format(where: { url: ${url} }) {
    items {
      ... on Article {
        contentTypeUid
        createdAt
        title
        summary
        url
        publishedDate
        termSelector {
          primaryTerm
        }
        featuredImageGroup {
          imageAltText
          featuredImage {
            url
          }
        }
        contributor {
          title
          contributorName
          contributorDescription
          url
          contributorImage {
            image {
              url
            }
            imageAltText
          }
        }
      }
      ... on Document {
        contentTypeUid
        createdAt
        title
        summary
        url
        publishedDate
        termSelector {
          primaryTerm
        }
        featuredImageGroup {
          imageAltText
          featuredImage {
            url
          }
        }
         contributor {
          title
          contributorName
          contributorDescription
          url
          contributorName
          contributorImage {
            image {
              url
            }
            imageAltText
          }
        }
      }
      ... on Video {
        contentTypeUid
        createdAt
        title
        summary
        url
        publishedDate
        termSelector {
          primaryTerm
        }
        featuredImageGroup {
          imageAltText
          featuredImage {
            url
          }
        }
         contributor {
          title
          contributorName
          contributorDescription
          url
          contributorName
          contributorImage {
            image {
              url
            }
            imageAltText
          }
        }
      }
      ... on Slideshow {
        contentTypeUid
        createdAt
        title
        summary
        url
        publishedDate
        termSelector {
          primaryTerm
        }
        featuredImageGroup {
          imageAltText
          featuredImage {
            url
          }
        }
         contributor {
          title
          contributorName
          contributorDescription
          url
          contributorName
          contributorImage {
            image {
              url
            }
            imageAltText
          }
        }
      }
      ... on Webinar {
        contentTypeUid
        createdAt
        title
        summary
        url
        publishedDate
        termSelector {
          primaryTerm
        }
        featuredImageGroup {
          imageAltText
          featuredImage {
            url
          }
        }
         contributor {
          title
          contributorName
          contributorDescription
          url
          contributorImage {
            image {
              url
            }
            imageAltText
          }
        }
      }
      ... on Podcast {
        contentTypeUid
        createdAt
        title
        summary
        url
        publishedDate
        termSelector {
          primaryTerm
        }
        featuredImageGroup {
          imageAltText
          featuredImage {
            url
          }
        }
        contributor {
          title
          contributorName
          contributorDescription
          url
          contributorImage {
            image {
              url
            }
            imageAltText
          }
        }
      }
    }
    meta {
      pagination {
        limit
        page
        total
        totalPage
      }
      entry {
        createdAt
        createdBy
        locale
        pageDescription
        seo {
          canonicalUrl
          metaDescription
          metaTitle
          noIndex
        }
        title
        uid
        updatedAt
        updatedBy
        url
      }
    }
  }
}