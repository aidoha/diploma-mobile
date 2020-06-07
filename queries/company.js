import gql from 'graphql-tag';

export const GET_COMPANY_SERVICES = gql`
  query getCompanyServices($businessCompanyID: ID!) {
    getBusinessCompanyServices(
      input: { businessCompanyID: $businessCompanyID }
    ) {
      businessCompanyService {
        companyServiceID
        companyServiceName
        companyServicePrice
        companyServiceDuration
      }
    }
  }
`;

export const GET_COMPANY = gql`
  query getCompanyServices($businessCompanyID: ID!) {
    getBusinessCompany(input: { businessCompanyID: $businessCompanyID }) {
      businessCompanyName
      businessCompanyAddress
      businessCompanyImages {
        imageID
        imagePath
      }
    }
  }
`;
