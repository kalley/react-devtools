/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

var React = require('react');

import type {DOMEvent} from './types';

class BlurInput extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = {text: this.props.value || ''};
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.value !== this.props.value) {
      this.setState({text: '' + nextProps.value});
    }
  }

  done() {
    if (this.state.text !== (this.props.value || '')) {
      this.props.onChange(this.state.text);
    }
  }

  onKeyDown(e: DOMEvent) {
    if (e.key === 'Enter') {
      this.done();
      return;
    }
  }

  render(): ReactElement {
    return (
      <input
        value={this.state.text}
        ref={i => this.node = i}
        onChange={e => this.setState({text: e.target.value})}
        onBlur={this.done.bind(this)}
        onKeyDown={e => this.onKeyDown(e)}
      />
    );
  }
}

module.exports = BlurInput;
