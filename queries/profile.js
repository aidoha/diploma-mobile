import gql from 'graphql-tag';

export const GET_CUSTOMER_EMAIL = gql`
  query RetrieveInfoFromCustomerToken($accessToken: String!) {
    getCustomerTokenInfo(input: { accessToken: $accessToken }) {
      email
    }
  }
`;

export const GET_CUSTOMER_INFO = gql`
  query GetCustomerByEmail($email: String!) {
    getCustomerByEmail(input: { email: $email }) {
      customer {
        customerID
        customerFirstName
        customerSecondName
        customerEmail
        customerPhoneNumber
        customerPhoneNumberPrefix
        createdAt
      }
    }
  }
`;
