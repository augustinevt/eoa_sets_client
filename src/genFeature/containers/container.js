import React from 'react';
import { connect } from 'react-redux';

const getChildren = (manifest, subsets, display) => {
  subsets.forEach( subset => {
  let currentStep;
    manifest.forEach(set => {
      if (set._id === subset) {
        currentStep = set
      }
    })
    if (currentStep) {
      display.push(<div> {currentStep.name} </div>)
    }
    if (currentStep && currentStep.subsets.length > 0) {
      getChildren(manifest, currentStep.subsets, display);
    } else {
      return
    }
  })
}

const mapStateToProps = (state) => ({
  state: state.toJS(),
});

class SetsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.makeSet = this.makeSet.bind(this);
  }

  componentDidMount() {
    this.props.dispatch({type: 'GET_SETS_REQUESTED', payload: 'FOO'})
  }

  showSet() {
    const manifest = this.props.state;
    const display = [];
    const selectedSet = manifest[0];

  if (selectedSet) {

    getChildren(manifest, selectedSet.subsets, display);
  }

    return (
      <div>
        { display }
      </div>
    )
  }

  makeSet() {
    const test = {
      "name": "avoid stupid",
      "root": true,
      "prompt": "foo foo",
      "subsets": []
    }

    this.props.dispatch({type: 'CREATE_SET_REQUESTED', payload: test});
  }

  listSets() {
    const manifest = this.props.state;
    console.log( manifest)
    return Object.keys(manifest).map(set => {
      if (manifest[set].root) {
        return <div> {manifest[set].name} </div>
      }
    })
  }

  render() {
    const list = this.listSets();
    const set = this.showSet();
    return (
      <div>
        <div>
          <h2> List </h2>
          {list}
        </div>
        <div>
          <h2> Single </h2>
          {set}
        </div>
        <div onClick={this.makeSet}>
          CREATE SET
        </div>
      </div>

    )
  }
}

export default connect(mapStateToProps)(SetsContainer);
