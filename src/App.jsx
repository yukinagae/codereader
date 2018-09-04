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
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this.props.entry.name);
    }

    render() {
        return (
            <li onClick={this.handleClick}>
                {this.props.entry.name}
            </li>
        );
    }
}


class Tree extends Component {

   render() {
        const listItems = this.props.tree.map((entry) =>
            <Node key={entry.id} entry={entry} />
        );
        return (
            <ul>{listItems}</ul>
        );
    }
}


class Page extends Component {

    constructor(props) {
        super(props);
        this.state = null;
    }

    render() {
        if (this.state && this.state.file != null) {
            return (<div>{this.state.file.content}</div>);
        } else {
            return (<div>empty!</div>);
        }
    }
}


class App extends Component {

    render() {
        console.log(tree);
        return (
        <div className="App">
            <div className="columns">
                <aside className="column is-2 aside hero is-fullheight">
                    <Tree tree={tree} />
                </aside>
                <div className="column is-10 code hero is-fullheight">
                    <Page />
                </div>
            </div>

        </div>
    );
  }
}

export default App;
