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

export const GET_CUSTOMER_ORDERS = gql`
  query getCustomerOrdersByEmail(
    $email: String!
    # $pagination: PaginationInput!
    $limit: Int!
    $offset: Int!
  ) {
    getBusinessServiceOrdersByEmail(
      input: { email: $email, pagination: { limit: $limit, offset: $offset } }
    ) {
      businessServicesOrders {
        businessServiceID
        createdAt
        businessServiceOrderID
        endAt
        startAt
        clientCommentary
        clientPhoneNumber
        clientPhoneNumberPrefix
        clientFirstName
        businessServiceName
      }
      pagination {
        limit
        offset
        count
      }
    }
  }
`;
