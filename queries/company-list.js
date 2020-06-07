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
