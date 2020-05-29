import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const CUSTOMER_TOKEN_INFO = gql`
  query getCustomerTokenInfo($accessToken: String!) {
    getCustomerTokenInfo(input: { accessToken: $accessToken }) {
      email
    }
  }
`;
const GET_CUSTOMER_BY_EMAIL = gql`
  query getCustomerByEmail($email: String!) {
    getCustomerByEmail(input: { email: $email }) {
      customer {
        customerID
      }
    }
  }
`;

const withCurrentUser = (Component) => {
  return (props) => {
    const [token, setToken] = useState(null);
    useEffect(() => {
      const getToken = async () => {
        let result = await SecureStore.getItemAsync('token');
        setToken(result);
      };
      getToken();
    }, []);

    const { data: tokenInfo, loading: tokenInfoLoading } = useQuery(
      CUSTOMER_TOKEN_INFO,
      {
        variables: { accessToken: token },
      }
    );

    const { data: currentUser, loading: currentUserLoading } = useQuery(
      GET_CUSTOMER_BY_EMAIL,
      {
        variables: { email: tokenInfo?.getCustomerTokenInfo?.email },
        skip: !tokenInfo,
      }
    );

    if (tokenInfoLoading || currentUserLoading) {
      return <ActivityIndicator size='large' color='#000000' />;
    }

    return (
      <Component
        {...props}
        currentUser={currentUser?.getCustomerByEmail?.customer}
        userEmail={tokenInfo?.getCustomerTokenInfo?.email}
      />
    );
  };
};

export default withCurrentUser;
