import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import { Classes, Tree } from "@blueprintjs/core";
import { Controlled as CodeMirror } from 'react-codemirror2'

import dummy_tree from './sample.json';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/markdown/markdown');


class TreeExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: this.props.tree
        };
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

        this.props.onClickNode(nodeData);

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
            comment: this.props.comment,
        };
    }

    componentDidUpdate(prevProps) {
        console.log("[update]");
        console.log(prevProps);
        console.log(this.props);
        if (prevProps.nodeId !== this.props.nodeId || prevProps.comment !== this.props.comment) {
            console.log("change comment");
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
                    console.log("[onbeforechange]");
                    this.setState({comment: value});
                }}
                onChange={(editor, data, value) => {
                    console.log("[onchange]");
                    console.log(value);
                    this.editComment(this.props.nodeId, value);
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
        console.log(nodeData);
    }

    editComment(nodeId, commentData){
        console.log("[edit] root")
        console.log(nodeId);
        console.log(commentData);

        console.log(this.state.tree);
        let newTree = JSON.parse(JSON.stringify(this.state.tree));
        newTree[0].comments = [commentData];
        this.setState({ tree: newTree });
        console.log(this.state.tree);
        this.setState({ nodeId: nodeId });
        this.setState({ comment: commentData });
    }

    render() {
        console.log("[render] root");
        console.log(this.state.tree);
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
