import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  state: state,
});

class SetsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({type: 'GET_SETS_REQUESTED', payload: 'FOO'})
  }

  render() {
    return (
      <div> The huns </div>
    )
  }
}

export default connect(mapStateToProps)(SetsContainer);
