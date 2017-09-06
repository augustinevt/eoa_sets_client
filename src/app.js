import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { Input } from 'eoa-component-library';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div> hello worlde <Input /> </div>
    )
  }
}

export default App;
