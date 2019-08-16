import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { FilmsType } from '../redux/types';

interface listProps {
    films: Array<FilmsType>;
}

@connect((state:any)=>({}),{})
export default class list extends Component<listProps, {}> {
    //在组件创建之前
    public static async getInitialProps(): Promise<{ films: FilmsType }> {//服务器端运行，没有跨域限制，也要防止防盗链
        const res = await axios.get('https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=1925805', {
            headers: {
                "X-Host": "mall.film-ticket.film.list",//设置了防盗链
                "good": "happy"//这是自己设置的，good 值为happy 防盗链
            }
        });
        const { films } = res.data.data;
        return {
            films
        }
    }
    public render() {
        const { films } = this.props;
        return (
            <div>
                <h3>{JSON.stringify(films)}</h3>
            </div>
        )
    }
}