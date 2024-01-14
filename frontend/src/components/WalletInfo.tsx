import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from './common/molecules/card';
import { Container } from './common/molecules/container';
import { Text } from './common/atoms/text';
import { IWallet } from './HomePage';

const WalletInfo = ({ data }: { data?: IWallet }) => {
  return (
    <Card width="50%" height="75%" flexDirection="column" paddingY="12px" paddingX="24px" marginX="10px" marginY="10px">
      <Container alignItems="center" justifyContent="center" width="100%">
        <Container flexDirection="row" justifyContent="center" width="100%" marginBottom="10px">
          <Text fontWeight="500" padding="0 10px 0 0">
            Name:{' '}
          </Text>
          <Text fontWeight="400" color="#0b823e">
            {data?.name ?? ''}
          </Text>
        </Container>
        <Container flexDirection="row" justifyContent="center" width="100%" marginBottom="10px">
          <Text fontWeight="500" padding="0 10px 0 0">
            Balance:{' '}
          </Text>
          <Text fontWeight="400" color="#0b823e">
            {data?.balance ?? ''}
          </Text>
        </Container>
      </Container>
      <hr />
      <Container alignItems="center" width="100%">
        <Link to="/transactions">Go to Transactions</Link>
      </Container>
    </Card>
  );
};

export default WalletInfo;
