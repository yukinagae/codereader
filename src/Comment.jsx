import React, { Component } from 'react';
import { Collapse, Icon } from "@blueprintjs/core";
import { Controlled as CodeMirror } from 'react-codemirror2'



export default class Comment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            comment: this.props.comment,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.nodeId !== this.props.nodeId || prevProps.comment !== this.props.comment) {
            this.setState({ comment: this.props.comment });
        }
    }

    editComment(nodeId, lineNumber, value) {
        this.props.editComment(nodeId, lineNumber, value);
    }

    handleClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <div>
                <button className="bp3-button bp3-fill bp3-minimal bp3-intent-primary comment-button" onClick={this.handleClick}>
                    {this.state.isOpen ? <Icon icon="chevron-down" /> : <Icon icon="chevron-right" />} &nbsp;
                    [{this.props.lineNumber}] {this.state.comment.split('\n')[0]}
                </button>
                <Collapse isOpen={this.state.isOpen}>
                <CodeMirror
                    value={this.state.comment}
                        onBeforeChange={(editor, data, value) => {
                            this.setState({comment: value});
                        }}
                        onChange={(editor, data, value) => {
                            this.editComment(this.props.nodeId, this.props.lineNumber, value);
                        }}
                        options={this.props.options}
                    />
                </Collapse>
            </div>
        );
    }
}
