import React, { Component } from 'react';
import TreeExample from './Tree';
import Code from './Code';
import Comment from './Comment';
import './App.css';
import 'bulma/css/bulma.css'
import dummy_tree from './sample.json';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/markdown/markdown');

const treeSearch = require('tree-search');


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // base tree
            tree: dummy_tree,
            // each node
            nodeId: 1,
            content: '',
            comment: '',
            // option
            code_options: {
                readOnly: true,
                lineNumbers: true,
                mode: 'javascript',
		        },
            comment_options: {
                mode: 'markdown',
		        }
        };
    }

    onClickNode(nodeData) {
        // code
        this.setState({ content: nodeData.content });
        // comment
        this.setState({ nodeId: nodeData.id });
        this.setState({ comment: nodeData.comments[0] });
    }

    editComment(nodeId, commentData){
        let newTree = JSON.parse(JSON.stringify(this.state.tree));
        const find = treeSearch('childNodes');
        let node = find(newTree, 'id', nodeId);
        node.comments = [commentData];
        this.setState({ tree: newTree });
    }

    render() {
        return (
            <div className="App">
                <div className="columns">
                    <aside className="column is-2 aside hero is-fullheight">
                        <TreeExample
                            tree={this.state.tree}
                            onClickNode={this.onClickNode.bind(this)}
                        />
                    </aside>
                    <div className="column is-6 code hero is-fullheight">
                        <Code
                            content={this.state.content}
                            options={this.state.code_options}
                        />
                    </div>
                    <div className="column is-4 comment hero is-fullheight">
                        <Comment
                            nodeId={this.state.nodeId}
                            comment={this.state.comment}
                            options={this.state.comment_options}
                            editComment={this.editComment.bind(this)}
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
