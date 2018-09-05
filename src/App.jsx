import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons'


const tree = [{id: "1", type: 'file', name: 'foo.txt', content: "This is foo.txt"},
              {id: "2", type: 'file', name: 'bar.txt', content: "This is bar.txt"},
              {id: "3", type: 'directory', name: 'dir1', content: [
                  {id: "4", type: 'file', name: 'homu.txt', content: "This is homu.txt"},
                  {id: "5", type: 'directory', name: 'dir2', content: []}
              ]}
];


class File extends Component {

    _onClick() {
        this.props.onClickNode(this.props);
    }

    render() {
        return (
            <div className="node">
                <div onClick={this._onClick.bind(this)}>
                    <FontAwesomeIcon icon={faFile} />
                    <span>&nbsp;{this.props.entry.name}</span>
                </div>
            </div>
        );
    }
}

class Dir extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    _onClick() {
        console.log("dir clicked");
        console.log(this.props.entry.name);
        this.setState({ expanded: !this.state.expanded });
    }

    render() {

        let entries = [];

        if (this.state.expanded) {
            entries = this.props.entry.content.map((entry, index) => {
                if (entry.type === 'file') {
                    return <File key={index} entry={entry} onClickNode={this.props.onClickNode} />
                } else {
                    return <Dir key={index} entry={entry} onClickNode={this.props.onClickNode} />
                }
            });
        }

        const style = this.state.expanded ? {} : { display: 'none' };
        let icon = faFolder
        if (this.props.entry.type === 'directory') {
            if (this.state.expanded) {
                icon = faFolderOpen;
            }
        }

        return (
            <div className="node">
                <div onClick={this._onClick.bind(this)}>
                    <FontAwesomeIcon icon={icon} />
                    <span>&nbsp;{this.props.entry.name}</span>
                    <ul style={style}>
                        {entries}
                    </ul>
                </div>
            </div>
        );
    }
}


class Tree extends Component {

    _onClickNode(props) {
        this.props.onClickNode(props);
    }


   render() {
       const entries = this.props.tree.map((entry, index) => {
               if (entry.type === 'file') {
                   return <File key={index} entry={entry} onClickNode={this._onClickNode.bind(this)} />
               } else {
                   return <Dir key={index} entry={entry} onClickNode={this._onClickNode.bind(this)} />
               }
           }
       );
       return (
           <ul>{entries}</ul>
       );
    }
}


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
