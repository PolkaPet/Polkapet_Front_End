/* eslint-disable no-unused-vars */
import { Loader } from 'semantic-ui-react';

export default function LoaderStatus({ status }) {
  return (
    <div style={{ overflowWrap: 'break-word' }}>
      {!status || status?.includes('Finalized') ? null : (
        <Loader size="mini" inline active />
      )}
      {console.log('status', status)}
      {status}
    </div>
  );
}
