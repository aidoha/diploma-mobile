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
