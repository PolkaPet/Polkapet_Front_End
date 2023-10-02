/* eslint-disable no-unused-vars */
import { Loader } from 'semantic-ui-react';

export default function LoaderStatus({ status }) {
  return (
    <div style={{ overflowWrap: 'break-word', color: '#fff' }}>
      {!status || status?.includes('Finalized') ? null : (
        <Loader size="mini" inline active style={{ marginRight: '10px' }} />
      )}
      {status}
    </div>
  );
}
