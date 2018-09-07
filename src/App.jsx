import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import { Classes, Tree } from "@blueprintjs/core";
import {Controlled as CodeMirror} from 'react-codemirror2'

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/markdown/markdown');


class TreeExample extends Component {
    state = { nodes: INITIAL_TREE };

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

const INITIAL_TREE = [
    {
        id: 1,
        icon: "folder-close",
        isExpanded: true,
        label: "Folder 1",
        childNodes: [
            {
                id: 2,
                icon: "document",
                label: "Item 0",
                content: 'console.log("This is Item 0.");',
            },
            {
                id: 3,
                icon: "folder-close",
                label: "Folder 2",
                childNodes: [
                    {
                        id: 4,
                        icon: "document",
                        label: "Item 1",
                        content: 'console.log("This is Item 1.");',
                    },
                ],
            },
        ],
    },
];

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
            content: 'console.log("empty");\nvar a = 1;\nvar b = 2;',
            comment: "# comment",
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
                        <TreeExample onClickDocument={this.onClickDocument.bind(this)} />
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
