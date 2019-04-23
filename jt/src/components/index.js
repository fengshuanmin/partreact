/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import BasicForm from './forms/BasicForm';
import BasicTable from './tables/BasicTables';
import AdvancedTable from './tables/AdvancedTables';
import AsynchronousTable from './tables/AsynchronousTable';
import Echarts from './charts/Echarts';
import Recharts from './charts/Recharts';
import Icons from './ui/Icons';
import Buttons from './ui/Buttons';
import Spins from './ui/Spins';
import Modals from './ui/Modals';
import Notifications from './ui/Notifications';
import Tabs from './ui/Tabs';
import Banners from './ui/banners';
import Drags from './ui/Draggable';
import Dashboard from './dashboard/Dashboard';
import Gallery from './ui/Gallery';
import BasicAnimations from './animation/BasicAnimations';
import ExampleAnimations from './animation/ExampleAnimations';



import AuthBasic from './auth/Basic';
import RouterEnter from './auth/RouterEnter';
import Cssmodule from './cssmodule';
import MapUi from './ui/map';
import QueryParams from './extension/QueryParams';





import Smartquotation from '../pages/Smartquotation/Smartquotation';
//商品管理
import GoodsManage from '../pages/GoodsManage/GoodsManage';
import AddGoods from '../pages/GoodsManage/AddGoods';
import Goodupdate from '../pages/GoodsManage/Goodupdate'
import Goodsaddition from '../pages/GoodsManage/addition'
import Rotation from '../pages/GoodsManage/Rotation'
//商品共享
import Stocklist from '../pages/Stock/Stocklist'
import Mystock from '../pages/Stock/Mystock'
//报价记录
import Offerlist from '../pages/Offer/Offerlist'
import Offerdetail from '../pages/Offer/Offerdetail'

import OrdersManage from '../pages/Orders/OrdersManage';
import OrderDetail from '../pages/Orders/OrderDetail';
import PwdSetting from '../pages/User/PwdSetting';
import PersonSetting from '../pages/User/PersonSetting';
import CompanySetting from '../pages/User/CompanySetting';
import AccountSetting from '../pages/User/AccountSetting';


import TEST from '../components/input/CustomInput';

const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});

export default {
    BasicForm, BasicTable, AdvancedTable, AsynchronousTable,
    Echarts, Recharts, Icons, Buttons, Spins, Modals, Notifications,
    Tabs, Banners, Drags, Dashboard, Gallery, BasicAnimations,
    ExampleAnimations, AuthBasic, RouterEnter, WysiwygBundle,
    Cssmodule, MapUi, QueryParams,
    Smartquotation, GoodsManage,
    PwdSetting,PersonSetting,CompanySetting,AccountSetting,OrdersManage,OrderDetail,
    AddGoods,Goodupdate,Rotation,Offerlist,Stocklist,Mystock,Offerdetail,Goodsaddition,
    TEST

}