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
