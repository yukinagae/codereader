import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import { Classes, Tree } from "@blueprintjs/core";


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
        console.log(nodeData);
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
            },
            {
                id: 3,
                icon: "folder-close",
                label: "Folder 2",
                childNodes: [
                    {
                        id: 4,
                        icon: "document",
                        label: "Item 1"
                    },
                ],
            },
        ],
    },
];


class Page extends Component {

    render() {
        return (
            <div>{this.props.content}</div>
        );
    }
}


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: "console.log('Aloha world!');"
        }
    }

    render() {
        return (
            <div className="App">
                <div className="columns">
                    <aside className="column is-4 aside hero is-fullheight">
                        <TreeExample />
                    </aside>
                    <div className="column is-8 code hero is-fullheight">
                        <Page content={this.state.content} />
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
