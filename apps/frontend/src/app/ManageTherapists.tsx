import React from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

function ManageTherapists() {
  return (<h1>Hello world</h1>);
}

export default withAuthenticator(ManageTherapists);
