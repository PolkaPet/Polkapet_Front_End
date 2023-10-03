import React, { createRef } from 'react';

import { Link } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Dimmer, Loader, Grid, Message } from 'semantic-ui-react';
import { useSubstrateState } from '../substrate-lib';
import AccountSelector from '../AccountSelector';
import { useLocation } from 'react-router-dom';

function Main() {
  const { apiState, apiError, keyringState } = useSubstrateState();

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  );

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  );

  if (apiState === 'ERROR') return message(apiError);
  else if (apiState !== 'READY') return loader('Connecting to Substrate');

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    );
  }

  const contextRef = createRef();

  return (
    <div>
      <div id="header">
        <Link to="/" id="logo">
          Limitless Creature World
        </Link>

        <div id="link-containers">
          <Link to="/">Home</Link>
          <Link to="/mintnft">MintNFT</Link>
          <Link to="/minigame/create">Mini Game</Link>
          <Link to="/world-env">World Env</Link>
          <a
            href="https://google.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Whitepaper
          </a>
          {/* <Link to="/community">Community</Link> */}
          {/* <Link to="/qa">Q&A</Link> */}
          {/* <Link to="/white-paper">White Paper</Link>
          <Link to="/blockchaininfo">Blockchain Info</Link> */}
        </div>
        {/* <div context={contextRef}><AccountSelector /> </div> */}

        <AccountSelector context={contextRef} />
      </div>
    </div>
  );
}

export default function Header() {
  const location = useLocation();
  const loadcanvas = document.getElementById('canvas');
  if (location.pathname === '/game') {
    loadcanvas.style.display = 'block';
  } else {
    loadcanvas.style.display = 'none';
  }
  return <Main />;
}
