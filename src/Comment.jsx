import React, { Component } from 'react';
import { Button, Collapse } from "@blueprintjs/core";
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
                <Button className="comment-button" onClick={this.handleClick}>
                    [{this.props.lineNumber}] {this.state.comment.split('\n')[0]}
                </Button>
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
