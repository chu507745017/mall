<template>
    <div id="home">
        <!--头部导航栏-->
        <nav-bar class="home-nav">
            <div slot="center">购物车</div>
        </nav-bar>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"

                :pull-up-load="true" @pullingUp="loadMore">
            <!--轮播图-->
            <home-swiper :banners="banners"></home-swiper>
            <!--推荐-->
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>

            <tab-control :titles="['流行','新款','精选']" class="tab-control" @getIndex="getIndex"></tab-control>
            <goods-list :goods="currentData"></goods-list>
            <!--  .native监听组件根元素的原生事件 -->
            <back-top @click.native="backClick" v-show="isShowBackUp"></back-top>

        </scroll>
    </div>
</template>

<script>

    //没有默认的export ,必须要用大括号接收，（导入的JS文件要用大括号接收）
    import NavBar from 'components/common/navbar/NavBar'
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView'
    import {getHomeMultiData, getHomeGoods} from "@/network/home"
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import Scroll from "components/common/scroll/Scroll"
    import BackTop from 'components/content/backTop/BackTop'


    export default {
        name: "Home",
        components: {
            Scroll,
            NavBar, HomeSwiper, RecommendView, FeatureView,
            TabControl,
            GoodsList,
            BackTop,
        },
        data() {
            return {
                //这个是轮播图
                banners: [],
                //轮播图下面的4个图标按钮
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                currentData: [],
                isShowBackUp: false,
                currentType: 'pop'
            }
        },
        methods: {
            getMultiDataMethod() {
                // 请求多个数据
                getHomeMultiData().then(res => {
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                })
            },
            //请求商品数据通过类型
            getHomeGoodsByType(type) {
                const page = this.goods[type].page + 1;
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page += 1;
                });
            },
            //通过index查询home页面的商品index页面数据
            getIndex(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }
                this.getHomeGoodsByType(this.currentType);
                this.currentData = this.goods[this.currentType].list;
            },
            backClick() {
                //拿到scroll对象的参数 this.$refs.scroll
                this.$refs.scroll.scrollTo()
            },
            contentScroll(position) {
                this.isShowBackUp = (-position.y > 1000)
            },
            loadMore() {
                this.getHomeGoodsByType(this.currentType);
            },
        },
        created() {
            this.getMultiDataMethod();
            this.getIndex();
        },
    }
</script>

<!--scoped 作用域-->
<style scoped>
    #home {
        /*padding-top: 44px;*/
        height: 100vh;
        position: relative;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: #fff;

        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }

    .tab-control {
        position: sticky;
        top: 44px;
        z-index: 9;
    }

    /*.content {*/
    /*overflow: hidden;*/
    /*position: absolute;*/
    /*top: 44px;*/
    /*bottom: 40px;*/
    /*left: 0;*/
    /*right: 0;*/
    /*}*/

    .content {
        height: calc(100% - 93);
        overflow: hidden;
        margin-top: 44px;
    }

</style>