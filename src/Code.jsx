import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'

export default class Code extends Component {

    newComment(lineNumber) {
        this.props.newComment(lineNumber);
    }

    render() {
        return (
            <CodeMirror
                value={this.props.content}
                options={this.props.options}
                onGutterClick={(editor, lineNumber, gutter, event) => {
                    this.newComment(lineNumber);
                }}
                onKeyDown={(editor, event) => {
                    console.log(event);
                }}
            />
        );
    }
}
