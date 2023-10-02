/* eslint-disable no-unused-vars */
import { Dimmer, Loader } from 'semantic-ui-react';

export default function LoaderStatus({ status, color = '#fff' }) {
  return (
    <div
      style={{
        overflowWrap: 'break-word',
        color,
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {!status || status?.includes('Finalized') ? null : (
        <div
          style={{
            backgroundColor: 'lightblue',
            borderRadius: '100%',
            display: 'flex',
            marginRight: '10px',
          }}
        >
          <Loader
            color="blue"
            size="mini"
            inline
            active
            style={{
              color: 'blue',
              borderRadius: '100%',
              margin: '1px',
            }}
          />
        </div>
      )}

      {status}
    </div>
  );
}
