import { forwardRef, useRef, useImperativeHandle, Ref, useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import '../assets/index.scss';
import Todo2 from '../components/todo2';
import Layout from '../components/layout';
//自定义hooks
function useFriendStatus(count) {
    const [isOnline, setIsOnline] = useState(count);

    useEffect(() => {
        console.log(isOnline);
    });

    return [isOnline, setIsOnline];
}
//渲染todo2这个组件,同时使用forwardRef, useRef, useImperativeHandle对子元素进行获取焦点
function FancyInput(props: any, ref: Ref<any>) {
    const inputRef: React.MutableRefObject<any> = useRef();
    useImperativeHandle(ref, () => ({//注入ref，然后返回一个对象
        focus: () => { inputRef.current.focus(); }//然后父元素可以通过 fancyInputRef来使用
    }));
    return <Input ref={inputRef} />;
}
const ForwardFancyInput = forwardRef(FancyInput);
export default () => {
    const fancyInputRef: React.MutableRefObject<any> = useRef();
    const [count, setCount] = useFriendStatus(10);
    return (
        <Layout>
            <h1>自定义hooks</h1>
            <h2>{count}</h2>
            <Button onClick={() => setCount(count + 1)}>+++</Button>
            <hr />
            <hr />
            <h2>forwardRef, useRef, useImperativeHandle</h2>
            <ForwardFancyInput ref={fancyInputRef} />
            <Button onClick={() => fancyInputRef.current.focus()}>获取子元素焦点</Button>
            <h2>Todo - 2</h2>
            <Todo2 />
        </Layout>);
}
/*
public static async getInitialProps() {//服务器端运行，没有跨域限制，也要防止防盗链
        const res = await axios.get('https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=1925805', {
            headers: {
                "X-Host": "mall.film-ticket.film.list",//设置了防盗链
                "good": "happy"//这是自己设置的，good 值为happy 防盗链
            }
        });
        return {
            films: res.data.data.films
        }
    }
*/