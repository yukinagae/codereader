import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'


export default class Comment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comment: this.props.comment,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.nodeId !== this.props.nodeId || prevProps.comment !== this.props.comment) {
            this.setState({ comment: this.props.comment });
        }
    }

    editComment(nodeId, value) {
        this.props.editComment(nodeId, value);
    }

    render() {
        return (
            <CodeMirror
                value={this.state.comment}
                onBeforeChange={(editor, data, value) => {
                        this.setState({comment: value});
                }}
                onChange={(editor, data, value) => {
                        this.editComment(this.props.nodeId, value);
                }}
                options={this.props.options}
            />
        );
    }
}
