<template>
    <div class="customizedOCRBox">
        <bannerBox :bannerSrc="bannerSrc"></bannerBox>
        <div class="bannerTxtBox">
            <h3 class="mainH3 bannerH3">定制化识别服务</h3>
            <!-- <span class="mainBtn">申请开通</span> -->
            <a class="mainBtn" href="manage.html?to=manageCustomDevIndex">申请开通</a>
        </div>
        <div class="box">
            <standard :standardData="standardData"></standard>
        </div>
        <div class="box futBox">
            <h3 class="mainH3B tc pb80">产品特色</h3>
            <ul class="list">
                <li class="item" v-for="(listObj,index) in listData" :key="index">
                    <listItem :listObj="listObj"></listItem>
                </li>
            </ul>
        </div>
        <div class="box bg3 stepBox">
            <h3 class="mainH3 tc pb80">使用流程</h3>
            <img class="stepImg" :src="stepSrc" alt="stepImg">
        </div>
        <div class="box">
            <h3 class="mainH3B tc pb80">应用场景</h3>
            <media :mediaData="ocrAppliData[0]"></media>
            <div class="divide"></div>
            <media :mediaData="ocrAppliData[1]"></media>
        </div>
        <div class="pt160 pb160 tc">
            <!-- <span class="mainColorBigBtn">申请定制化服务</span> -->
            <a class="mainColorBigBtn" href="manage.html?to=manageCustomDevIndex">申请定制化服务</a>
        </div>
    </div>
</template>

<script>
    import bannerBox from '@/components/bannerBox'
    import media from '@/components/media'
    import standard from '@/components/standard'
    import listItem from '@/components/listItem'
    export default {
        name: '',
        data() {
            return {
                listData: [{
                        url: require('../../assets/images/场景多样icon.png'),
                        title: '场景多样',
                        txt: '通过自动裁边、修正倾斜等技术，支持任意背景、任意版面的定制识别'
                    },
                    {
                        url: require('../../assets/images/量身定制icon.png'),
                        title: '量身定制',
                        txt: '自定义模版能根据客户需求，针对任何文档来制作模版，真正实现全场景适配'
                    },
                    {
                        url: require('../../assets/images/简单易用icon.png'),
                        title: '简单易用',
                        txt: '图形化的模版制作页面，通过简单的框选，即可完成模版的制作'
                    }
                ],
                standardData: {
                    title: '功能介绍',
                    txt: '基于强大通用文字识别引擎，快速生成专有模板与算法模型，提供定制化识别服务。可自由选择任意需进行识别的图片与图片上的文字内容，智能识别成为可编辑的文本。',
                    url: require('../../assets/images/定制化识别服务功能介绍.png')
                },
                ocrAppliData: [{
                        title: '1. 金融行业资料电子化',
                        txt: '用于企业证照、年报、财报、票据等纸质资料的自动识别，支持结构化录入，节约人力成本，提升处理效率',
                        url: require('../../assets/images/金融行业资料电子化.png'),
                        imgRight: true
                    },
                    {
                        title: '2. 医疗单据识别',
                        txt: '用于医疗行业的单据、票据、病例及体检报告等资料的自动识别和结构化整理工作，快速实现电子化入库，减少人工输入过程，提高输入效率',
                        url: require('../../assets/images/医疗单据识别.png'),
                        imgRight: false
                    }
                ],
                page: 'customizedOCR',
                bannerSrc: require('../../assets/images/定制化识别服务banner.png'),
                stepSrc: require('../../assets/images/定制化识别服务使用流程.png')
            }
        },
        created() {
            console.log('scrollTo');
            window.scrollTo(0, 0)
        },
        components: {
            bannerBox,
            media,
            standard,
            listItem
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .box {
        padding: 160px 375px 0;
        text-align: left;
    }
    
    .futBox,
    .stepBox {
        padding-bottom: 160px;
    }
    
    .divide {
        height: 80px;
    }
    
    .list {
        display: flex;
        justify-content: space-between;
        border: none;
    }
    
    .item {
        width: 336px;
    }
    
    .stepImg {
        width: 1203px;
    }
</style>
