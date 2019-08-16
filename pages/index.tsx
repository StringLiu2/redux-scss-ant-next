import { useState, useEffect, useReducer, useRef } from 'react';
import { Button, Input } from 'antd';
import '../assets/index.scss';
import Todo from '../components/todo';
import Layout from '../components/layout';

const initialState = { count: 0 };

function reducer(state: typeof initialState, action: any) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + action.number };
        case 'decrement':
            return { count: state.count - action.number };
        case 'reset':
            return init(action.number)
        default:
            throw new Error();
    }
}
function init(initialCount: number): typeof initialState {
    return { count: initialCount };
}
function Index(): JSX.Element {
    const [count, setCount] = useState(100);
    const [number, setNumber] = useState(200);
    useEffect(() => {
        // console.log(a);
        // ;
        // console.log(state);
        // setState(state + 1)
        setNumber(number + count);
        return () => {//这个返回的函数会useEffect在执行之后，下次更新执行前
            console.log(number);
            setNumber(number - count);
        };
    }, [count]);//在count执行的时候才执行这个
    useEffect(() => {
        console.log('这是hook-useEffect')
    }, []);//[] 表示不执行了，那样的话 可以在初始化的时候执行一次 就这样
    const [state, dispatch] = useReducer(reducer, initialState);

    const inputEl = useRef(null);
    const onButtonClick = () => {
        // `current` 指向已挂载到 DOM 上的文本输入元素
        inputEl.current.focus();
    };
    return (
        <Layout>
            {/* 直接内部书写样式 */}
            <h2>{number}</h2>
            <h1>{count}</h1>
            <Button onClick={() => setCount(count + 1)}>点击</Button>
            <style jsx>{`
                       h1{
                           color:red;
                       }
                   `}</style>
            <hr />
            <h2>useReducer</h2>
            <h2>{state.count}</h2>
            <Button onClick={() => dispatch({ type: 'increment', number })}>+</Button>
            <Button onClick={() => dispatch({ type: 'decrement', number: 10 })}>-</Button>
            <Button onClick={() => dispatch({ type: 'reset', number: 10 })}>刷新成10</Button>
            <Input ref={inputEl} type="text" />
            <Button onClick={onButtonClick}>Focus the input</Button>
            <hr />
            <Todo />
        </Layout>
    );
}
export default Index;