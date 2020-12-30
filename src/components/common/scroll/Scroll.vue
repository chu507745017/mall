<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>

    import BScroll from 'better-scroll'

    export default {
        name: "Scroll",
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpload: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                scroll: null,
                message: '我是scroll的参数'
            }
        },
        mounted() {
            //创建Bscroll对象
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                probeType: this.probeType,
            });

            //监听滚动的位置
            this.scroll.on('scroll', (position) => {
                this.$emit('scroll', position);
            });

            //监听scroll滚动到底部
            this.scroll.on('pullingUp', () => {
                this.$emit('pullingUp');
            });

        },
        methods: {
            scrollTo(x, y, time = 300) {
                this.scroll.scrollTo(x, y, time)
            }
        }

    }
</script>

<style scoped>

</style>