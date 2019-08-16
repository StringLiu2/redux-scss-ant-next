import Haed from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
// import { withRouter } from 'next/router';//withRouter高阶组件，直接使用这个来包裹整个函数/类,就有一些属性
/* 
    1.拦截器 popstate

    有些情况（比如使用custom router），你可能想监听popstate，在路由跳转前做一些动作。
    比如，你可以操作 request 或强制 SSR 刷新
    import Router from 'next/router'

    Router.beforePopState(({ url, as, options }) => {
    // I only want to allow these two routes!
    if (as !== "/" || as !== "/other") {
        // Have SSR render bad routes as a 404.
        window.location.href = as
        return false
    }

    return true
    });

    如果你在beforePopState中返回 false，Router将不会执行popstate事件。

    2.以上Router对象的 API 如下：
        route - 当前路由的String类型
        pathname - 不包含查询内容的当前路径，为String类型
        query - 查询内容，被解析成Object类型. 默认为{}
        asPath - 展现在浏览器上的实际路径，包含查询内容，为String类型
        push(url, as=url) - 页面渲染第一个参数 url 的页面，浏览器栏显示的是第二个参数 url
        replace(url, as=url) - performs a replaceState call with the given url
        beforePopState(cb=function) - 在路由器处理事件之前拦截.

    3.路由事件
        你可以监听路由相关事件。
        下面是事件支持列表：(路由守卫)
            routeChangeStart(url) - 路由开始切换时触发
            routeChangeComplete(url) - 完成路由切换时触发
            routeChangeError(err, url) - 路由切换报错时触发
            beforeHistoryChange(url) - 浏览器 history 模式开始切换时触发
            //以上四个较为常用
            hashChangeStart(url) - 开始切换 hash 值但是没有切换页面路由时触发
            hashChangeComplete(url) - 完成切换 hash 值但是没有切换页面路由时触发
        下面是如何正确使用路由事件routeChangeStart的例子：
        const handleRouteChange = url => {
        console.log('App is changing to: ', url)
        }

        Router.events.on('routeChangeStart', handleRouteChange)

        如果你不想长期监听该事件，你可以用off事件去取消监听：
        Router.events.off('routeChangeStart', handleRouteChange)

    4.浅层路由
        Router.push(href, as, { shallow: true })//加上{ shallow: true }
        允许你改变 URL 但是不执行getInitialProps生命周期。你可以加载相同页面的 URL，得到更新后的路由属性pathname和query，并不失去 state 状态。
*/
// withRouter
// export default ({children,router})=>(//直接包裹组件 就有效果
Router.events.on('routeChangeStart',url => {//这个事件，会绑定到客户端上，就是打印的话 会打印在客户端
    console.log('现在的url:'+ url);
    if(url === "/wk"){
        location.href = "/prompt";//如果点击到上面路由 直接跳转到list
    }
})
export default ({children})=>(
    <div>
        <Haed>
            <title>next 入门-共同头部</title>
            <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Haed>
        <div>
            {/* prefetch:是生产模式才有用，开发环境没有预加载效果   passHref:强行让内部标签获得href属性，跳转
                scroll={false}:可以防止a标签的那种href="#" 强制滚到页顶
            */}
            {/* replace替换路由，没法返回路由 */}
            <Link href="/" prefetch replace><a>主页</a></Link> {/* 里面加一个a标签，Link组件不会被识别成超链接 */}
            {/* {router.prefetch('/')} 这个和上面一样的 */}
            {/* 路由遮盖  as 取别名  */}
            {' '}<Link href="/hello" prefetch scroll={false}><a>hello页面</a></Link> 
            {/* <Link as="/style" href="/nextStyle" prefetch><a>内联样式</a></Link>
            <Link as="/wk" href="/worker" prefetch><a>管理员页面</a></Link> */}
        </div>
        {children}
        <footer>
            版权所有，未经允许，也可以分享。
        </footer>
    </div>
);