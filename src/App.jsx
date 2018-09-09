import React, { Component } from 'react';
import TreeExample from './Tree';
import Code from './Code';
import Comment from './Comment';
import { Icon, InputGroup, Spinner } from "@blueprintjs/core";
import './App.css';
import 'bulma/css/bulma.css'
import dummy_tree from './sample.json';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/markdown/markdown');

const treeSearch = require('tree-search');


export default class App extends Component {

    constructor(props) {
        super(props);

        // TODO: set bookmark
        /* const find = treeSearch('childNodes');
         * let node = find(dummy_tree, 'id', 2);
         * node.secondaryLabel = (<Icon icon="bookmark" />); */

        this.state = {
            // base tree
            tree: dummy_tree,
            // each node
            nodeId: 1,
            content: '',
            comments: {},
            // option
            code_options: {
                readOnly: true,
                lineNumbers: true,
                mode: 'javascript',
		        },
            comment_options: {
                mode: 'markdown',
		        },
            // bookmark
            bookmarkId: 4,
            // search
            searchValue: "",
        };

    }

    onClickNode(nodeData) {
        // code
        this.setState({ content: nodeData.content });
        // comment
        this.setState({ nodeId: nodeData.id });
        this.setState({ comments: nodeData.comments });
    }

    editComment(nodeId, lineNumber, commentData){
        let newTree = JSON.parse(JSON.stringify(this.state.tree));
        const find = treeSearch('childNodes');
        let node = find(newTree, 'id', nodeId);

        // TODO: a comment on each line of code
        node.comments[lineNumber] = commentData;
        this.setState({ tree: newTree });
    }

    newComment(lineNumber) {
        let newTree = JSON.parse(JSON.stringify(this.state.tree));
        const find = treeSearch('childNodes');
        let node = find(newTree, 'id', this.state.nodeId);

        node.comments[lineNumber] = "# " + lineNumber;
        this.setState({ tree: newTree });
        this.setState({ comments: node.comments });
    }

    handleSearchChange(e) {
        this.setState({ searchValue: e.target.value });
    }

    render() {

        const maybeSpinner = this.state.searchValue ? <Spinner size={Icon.SIZE_STANDARD} /> : undefined;

        const comments = Object.keys(this.state.comments).map((key) =>
            <Comment
                key={key}
                nodeId={this.state.nodeId}
                lineNumber={key}
                comment={this.state.comments[key]}
                options={this.state.comment_options}
                editComment={this.editComment.bind(this)}
            />
        );
        return (
            <div className="App">
                <div className="columns">
                    <aside className="column is-2 aside">

                        <InputGroup
                            disabled={false}
                            large={false}
                            leftIcon="search"
                            onChange={this.handleSearchChange.bind(this)}
                            placeholder="Search..."
                            rightElement={maybeSpinner}
                            value={this.state.searchValue}
                        />

                        <TreeExample
                            tree={this.state.tree}
                            onClickNode={this.onClickNode.bind(this)}
                        />
                    </aside>
                    <div className="column is-6 code hero is-fullheight">
                        <Code
                            content={this.state.content}
                            options={this.state.code_options}
                            newComment={this.newComment.bind(this)}
                        />
                    </div>
                    <div className="column is-4 comment">
                        {comments}
                    </div>
                </div>

            </div>
        );
    }
}
