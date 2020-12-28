<template>
    <div id="home">
        <!--头部导航栏-->
        <nav-bar class="home-nav">
            <div slot="center">购物车</div>
        </nav-bar>
        <!--轮播图-->
        <home-swiper :banners="banners"></home-swiper>
        <!--推荐-->
        <recommend-view :recommends="recommends"></recommend-view>
    </div>
</template>

<script>

    //没有默认的export ,必须要用大括号接收，（导入的JS文件要用大括号接收）
    import NavBar from 'components/common/navbar/NavBar'
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import {getHomeMultiData} from "@/network/home"

    export default {
        name: "Home",
        components: {
            NavBar,HomeSwiper ,RecommendView
        },
        data() {
            return {
                //这个是轮播图
                banners: [],
                //轮播图下面的4个图标按钮
                recommends: [],
            }
        },
        methods: {
            getData() {
                // 请求多个数据
                getHomeMultiData().then(res => {
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                })
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style scoped>
    .home-nav {
        background-color: var(--color-tint);
        color: #fff
    }

</style>