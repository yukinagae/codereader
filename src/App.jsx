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
/* const deepCleaner = require('deep-cleaner'); */


export default class App extends Component {

    constructor(props) {
        super(props);

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
        /* 
         *         // TODO: remove all secondaryLabel properties first
         *         let newTree = JSON.parse(JSON.stringify(this.state.tree));
         *         deepCleaner(newTree, ['bookmark']);
         * 
         *         // TODO: set bookmark
         *         const find = treeSearch('childNodes');
         *         let node = find(newTree, 'id', nodeData.id);
         *         node.bookmark = true;
         *         node.secondaryLabel = (<Icon icon="bookmark" />);
         * 
         *         this.setState({ tree: newTree }); */
        /* console.log(this.state); */
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

                        <InputGroup
                            disabled={false}
                            large={false}
                            leftIcon="tag"
                            placeholder="Add Tags"
                        />

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
