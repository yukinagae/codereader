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
        )
    }
}


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: `console.log("empty");
var a = 1;
var b = 2;`,
            comment: `# comment

- aa
- bb
- cc`,
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
    }

    render() {
        return (
            <div className="App">
                <div className="columns">
                    <aside className="column is-2 aside hero is-fullheight">
                        <TreeExample tree={dummy_tree} onClickDocument={this.onClickDocument.bind(this)} />
                    </aside>
                    <div className="column is-6 code hero is-fullheight">
                        <Code content={this.state.content} options={this.state.code_options} />
                    </div>
                    <div className="column is-4 comment hero is-fullheight">
                        <CodeMirror
                            value={this.state.comment}
                            onBeforeChange={(editor, data, value) => {
                                    this.setState({comment: value});
                            }}
                            onChange={(editor, data, value) => {
                            }}
                            options={this.state.comment_options}
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
