import React, { PureComponent } from 'react';
import { Button, Input, List } from 'antd';
import { connect } from 'react-redux'
import { addTodo, asyncAddToDo } from '../redux/store';
const Item = List.Item;
const mapStateToProps = state => {
    return ({ todos: state.todos });
};
interface Todo2Props {
    todos?: Array<string>,
    addTodo?: (todo: string) => void;
    asyncAddToDo?: (todo: string) => void;
}
interface Todo2State {
    todo: string;
}
const mapDispatchToProps = { addTodo, asyncAddToDo };
@connect(
    mapStateToProps,
    mapDispatchToProps
)
class Todo2 extends PureComponent< Todo2Props, Todo2State> {
    constructor(props: Todo2Props) {
        super(props);
        this.state = {
            todo: ""
        }
    }
    changeTodo = el => {
        this.setState({
            todo: el.target.value
        });
    }
    //1.2这是给父组件调用的函数
    // childMethod = () => {
    //     console.log(this.state.todo);
    //     return this.state.todo;
    // }
    render() {
        const { todos, addTodo, asyncAddToDo } = this.props;
        const { todo } = this.state;
        const liList = todos.map((todo, index) => (<Item key={index}>{todo}</Item>));
        return (
            <div>
                <div>
                    <Input type="text" defaultValue={todo} onChange={this.changeTodo} />
                    <Button onClick={addTodo.bind(this, todo)} type="primary">添加</Button>
                    <Button onClick={asyncAddToDo.bind(this, todo)} type="danger">async添加</Button>
                </div>
                <List>
                    {liList}
                </List>
            </div>
        );
    }
}
export default Todo2;