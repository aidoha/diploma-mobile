import gql from 'graphql-tag';

export const CUSTOMER_SIGN_IN = gql`
  mutation CreateCustomerToken($email: String!, $password: String!) {
    createCustomerToken(input: { email: $email, password: $password }) {
      token {
        accessToken
      }
    }
  }
`;

export const CUSTOMER_SIGN_UP = gql`
  mutation CreateCustomer(
    $customerFirstName: String!
    $customerSecondName: String!
    $customerEmail: String!
    $customerPassword: String!
    $customerPhoneNumber: String!
    $customerPhoneNumberPrefix: String!
  ) {
    createCustomer(
      input: {
        customerFirstName: $customerFirstName
        customerSecondName: $customerSecondName
        customerEmail: $customerEmail
        customerPassword: $customerPassword
        customerPhoneNumberPrefix: $customerPhoneNumberPrefix
        customerPhoneNumber: $customerPhoneNumber
      }
    ) {
      token {
        accessToken
      }
    }
  }
`;
