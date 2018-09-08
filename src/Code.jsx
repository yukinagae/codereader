import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'

export default class Code extends Component {

    render() {
        return (
            <CodeMirror value={this.props.content} options={this.props.options} />
        );
    }
}
