import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { Input } from 'eoa-component-library';
import { GenFeatureContainer } from './genFeature';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Input />
        <GenFeatureContainer />
      </div>
    )
  }
}

export default App;
