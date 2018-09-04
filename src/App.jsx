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
        this.state = { isToggleOn: false };
    }

    _onClick() {
        this.props.onClickNode(this.props);
    }

    render() {
        return (
            <li onClick={this._onClick.bind(this)}>
                {this.props.entry.name}
            </li>
        );
    }
}


class Tree extends Component {

    _onClickNode(props) {
        this.props.onClickNode(props);
    }


   render() {
       const listItems = this.props.tree.map((entry) =>
           <Node key={entry.id} entry={entry} onClickNode={this._onClickNode.bind(this)} />
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
    }

    _onClickNode(props) {
        this.setState({content: props.entry.content});
    }

    render() {
        return (
            <div className="App">
                <div className="columns">
                    <aside className="column is-2 aside hero is-fullheight">
                        <Tree tree={this.state.tree} onClickNode={this._onClickNode.bind(this)}/>
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
