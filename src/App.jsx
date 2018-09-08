import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import { Classes, Tree } from "@blueprintjs/core";
import {Controlled as CodeMirror} from 'react-codemirror2'

import dummy_tree from './sample.json';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/markdown/markdown');


class TreeExample extends Component {

    constructor(props) {
        super(props);
        this.state = { nodes: this.props.tree };
    }


    render() {
        return (
                <Tree
                    contents={this.state.nodes}
                    onNodeClick={this.handleNodeClick}
                    onNodeCollapse={this.handleNodeCollapse}
                    onNodeExpand={this.handleNodeExpand}
                    className={Classes.ELEVATION_0}
                />
        );
    }

    handleNodeClick = (nodeData, _nodePath, e) => {

        if (nodeData.icon === 'document') {
            this.props.onClickDocument(nodeData);
        }

        const originallySelected = nodeData.isSelected;
        if (!e.shiftKey) {
            this.forEachNode(this.state.nodes, n => (n.isSelected = false));
        }
        nodeData.isSelected = originallySelected == null ? true : !originallySelected;
        this.setState(this.state);
    };

    handleNodeCollapse = (nodeData) => {
        nodeData.isExpanded = false;
        this.setState(this.state);
    };

    handleNodeExpand = (nodeData) => {
        nodeData.isExpanded = true;
        this.setState(this.state);
    };

    forEachNode(nodes, callback) {
        if (nodes == null) {
            return;
        }

        for (const node of nodes) {
            callback(node);
            this.forEachNode(node.childNodes, callback);
        }
    }
}


class Code extends Component {

    render() {
        return (
            <CodeMirror value={this.props.content} options={this.props.options} />
        );
    }
}

class Comment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nodeId: this.props.nodeId,
            comment: this.props.comment,
        }
    }

    editComment(value) {
        console.log("[edit]");
        this.setState({comment: value});
        this.props.editComment(this.state.nodeId, value);
    }

    render() {
        console.log("[render] comment");
        console.log(this.state);
        return (
            <CodeMirror
                value={this.state.comment}
                onBeforeChange={(editor, data, value) => {
                    this.setState({comment: value});
                }}
                onChange={(editor, data, value) => {
                    console.log(value);
                        this.editComment(value);
                }}
                options={this.props.options}
            />
        );
    }
}


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tree: dummy_tree,
            nodeId: 1,
            content: `console.log("empty");
var a = 1;
var b = 2;`,
            comment: `# comment

- a
- b`,
            code_options: {
                readOnly: true,
                lineNumbers: true,
                mode: 'javascript',
		        },
            comment_options: {
                mode: 'markdown',
		        }
        }
    }

    onClickDocument(nodeData) {
        this.setState({ content: nodeData.content });
        this.setState({ nodeId: nodeData.id });
        this.setState({ comment: nodeData.comments[0] });
        console.log('[click in root]');
        console.log(nodeData);
        console.log(this.state);
    }

    editComment(nodeId, commentData) {
        console.log(nodeId);
        console.log(commentData);
    }

    render() {
        return (
            <div className="App">
                <div className="columns">
                    <aside className="column is-2 aside hero is-fullheight">
                        <TreeExample
                            tree={this.state.tree}
                            onClickDocument={this.onClickDocument.bind(this)}
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
