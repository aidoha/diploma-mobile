import gql from 'graphql-tag';

export const GET_COMPANY_SERVCE = gql`
  query getCompanyService($companyServiceID: ID!) {
    getCompanyService(input: { companyServiceID: $companyServiceID }) {
      companyServiceName
      companyServiceDuration
      companyServicePrice
      businessServiceName
    }
  }
`;
