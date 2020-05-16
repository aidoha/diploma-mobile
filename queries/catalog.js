import gql from 'graphql-tag';

export const GET_BUSINESS_CATEGORIES = gql`
  query getCategories {
    getBusinessCategories {
      businessCategoryID
      businessCategoryName
    }
  }
`;
