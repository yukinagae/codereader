import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css'


const tree = [{id: "1", type: 'file', name: 'foo.txt', content: "This is foo.txt"},
              {id: "2", type: 'file', name: 'bar.txt', content: "This is bar.txt"},
              {id: "3", type: 'directory', name: 'dir1', content: [
                  {id: "4", type: 'file', name: 'homu.txt', content: "This is homu.txt"},
                  {id: "5", type: 'directory', name: 'dir2', content: []}
              ]}
];


class Node extends Component {

    constructor(props) {
        super(props);
        this.state = {isToggleOn: false};

        this.selectNode = this.selectNode.bind(this);
    }

    selectNode() {
        this.props.selectNode(this.props);
    }

    render() {
        return (
            <li onClick={this.selectNode}>
                {this.props.entry.name}
            </li>
        );
    }
}


class Tree extends Component {

    constructor(props) {
        super(props);

        this.selectNode = this.selectNode.bind(this);
    }

    selectNode(props) {
        this.props.selectNode(props);
    }


   render() {
       const listItems = this.props.tree.map((entry) =>
           <Node key={entry.id} entry={entry} selectNode={this.selectNode.bind(this)} />
       );
       return (
           <ul>{listItems}</ul>
       );
    }
}


class Page extends Component {

    render() {
        return (<div>{this.props.content}</div>);
    }
}


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tree: tree,
            content: "console.log('Aloha world!');"
        }

        this.selectNode = this.selectNode.bind(this);
    }

    selectNode(props) {
        this.setState({content: props.entry.content});
    }

    render() {
        return (
            <div className="App">
                <div className="columns">
                    <aside className="column is-2 aside hero is-fullheight">
                        <Tree tree={this.state.tree} selectNode={this.selectNode.bind(this)}/>
                    </aside>
                    <div className="column is-10 code hero is-fullheight">
                        <Page content={this.state.content} />
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
