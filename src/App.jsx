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


class Tree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        const listItems = this.props.value.map((entry) =>
            <li key={entry.id}>
                {entry.name}
            </li>
        );
        return (
            <ul>{listItems}</ul>
        );
    }
}


class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        console.log(this.props.value);
        return (
            <div>
                {this.props.value.content}
            </div>
        );
    }
}


class App extends Component {
    render() {
        console.log(tree);
        return (
        <div className="App">
            <div className="columns">
                <aside className="column is-2 aside hero is-fullheight">
                    <Tree value={tree} />
                </aside>
                <div className="column is-10 code hero is-fullheight">
                    <Page value={tree[0]} />
                </div>
            </div>

        </div>
    );
  }
}

export default App;
