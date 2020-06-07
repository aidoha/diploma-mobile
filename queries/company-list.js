import gql from 'graphql-tag';

export const GET_COMPANIES = gql`
  query GetCompaniesUnderCategory($categoryID: ID!) {
    getBusinessCompaniesUnderCategory(input: { categoryID: $categoryID }) {
      businessCompanies {
        businessCompanyID
        businessCompanyName
        businessCompanyAddress
        businessCompanyImages {
          imageID
          imagePath
        }
      }
    }
  }
`;

export const SEARCH = gql`
  query search($businessCompanyName: String!, $businessCategoryID: ID!) {
    searchBusinessCompany(
      input: {
        businessCompanyName: $businessCompanyName
        businessCategoryID: $businessCategoryID
      }
    ) {
      businessCompanies {
        businessCompanyID
        businessCompanyName
        businessCompanyImages {
          imageID
          imagePath
        }
        businessCompanyAddress
      }
    }
  }
`;
