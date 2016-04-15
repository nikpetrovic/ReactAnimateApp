import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const items = [
    {id: 1, name: 'Milk'},
    {id: 2, name: 'Yogurt'},
    {id: 3, name: 'Orange Juice'}
];

class AnimationShoppingList extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            items: items
        }
    }
    
    handleRemove(i) {
        let newItems = update(this.state.items, {
            $splice: [[i, 1]]
        });
        this.setState({items: newItems});
    }
    
    handleChange(evt) {
        if (evt.key === 'Enter') {
            let newItem = {id: Date.now(), name: evt.target.value};
            let newItems = this.state.items.concat(newItem);
            evt.target.value = '';
            this.setState({items: newItems});
        }
    }
    
    render() {
        let shoppingItems = this.state.items.map((item, i) => (
            <div key={item.id} className="item" onClick={this.handleRemove.bind(this, i)}>
                {item.name}
            </div>
        ));
        
        return (
            <div>
                <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={300} transitionLeaveTimeout={300} transitionAppear={true} transitionAppearTimeout={300}>
                    {shoppingItems}
                </ReactCSSTransitionGroup>
            
                <input type="text" value={this.state.newItem} onKeyDown={this.handleChange.bind(this)} />
            </div>
        );
    }
}

ReactDOM.render(<AnimationShoppingList />, document.getElementById('root'));