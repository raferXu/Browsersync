<template>
    <div class="customizedOCRBox">
        <bannerBox :bannerStyle="bannerStyle">
            <div class="bannerTxtBox">
                <h3 class="mainH3 bannerH3">定制化识别服务</h3>
                <a v-if="loginFlag" class="mainBtn" href="manage.html?to=manageCustomDevIndex">申请开通</a>
                <router-link v-else class="mainBtn" to="/login?from=manage_manageCustomDevIndex">申请开通</router-link>
            </div>
        </bannerBox>
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
        <jbSection :jbSectionStyle="stepStyle"></jbSection>
        <!-- <div class="box bg3 stepBox">
            <h3 class="mainH3 tc pb80">使用流程</h3>
            <img class="stepImg" :src="stepSrc" alt="stepImg">
        </div> -->
        <!-- <div class="box">
            <h3 class="mainH3B tc pb80">应用场景</h3>
            <media :mediaData="ocrAppliData[0]"></media>
            <div class="divide"></div>
            <media :mediaData="ocrAppliData[1]"></media>
        </div> -->
        <jbSection>
            <h4 slot="sectionHeaderTitle" class="sectionHeader">应用场景</h4>
            <ul slot="content" class="list">
                <li class="sectionListItem" v-for="(listObj,index) in applicationScenObj.list" :key="index">
                    <listBox :obj="listObj"></listBox>
                </li>
            </ul>
        </jbSection>
        <div class="pt80 pb80 tc">
            <a v-if="loginFlag" class="mainColorBigBtn" href="manage.html?to=manageCustomDevIndex">申请定制化服务</a>
            <router-link v-else class="mainColorBigBtn" to="/login?from=manage_manageCustomDevIndex">申请定制化服务</router-link>
        </div>
    </div>
</template>

<script>
    import bannerBox from '@/components/bannerBox'
    // import media from '@/components/media'
    import standard from '@/components/standard'
    import listItem from '@/components/listItem'
    import listBox from '@/components/listBox'
    import jbSection from '@/components/jbSection'
    export default {
        name: '',
        data() {
            return {
                stepStyle: {
                    height: '371px',
                    backgroundSize: '1920px 371px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundImage: 'url(' + require('../../assets/images/使用流程-定制化识别服务.png') + ')'
                },
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
                // ocrAppliData: [{
                //         title: '1. 金融行业资料电子化',
                //         txt: '用于企业证照、年报、财报、票据等纸质资料的自动识别，支持结构化录入，节约人力成本，提升处理效率',
                //         url: require('../../assets/images/金融行业资料电子化.png'),
                //         imgRight: true
                //     },
                //     {
                //         title: '2. 医疗单据识别',
                //         txt: '用于医疗行业的单据、票据、病例及体检报告等资料的自动识别和结构化整理工作，快速实现电子化入库，减少人工输入过程，提高输入效率',
                //         url: require('../../assets/images/医疗单据识别.png'),
                //         imgRight: false
                //     }
                // ],
                page: 'customizedOCR',
                // bannerSrc: require('../../assets/images/定制化识别服务banner.png'),
                bannerStyle: {
                    backgroundSize: '1920px 500px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundImage: 'url(' + require('../../assets/images/定制化识别服务banner.png') + ')'
                },
                applicationScenObj: {
                    list: [
                    {
                        title: '金融行业资料电子化',
                        text: '用于企业证照、年报、财报、票据等纸质资料的自动识别，支持结构化录入，节约人力成本，提升处理效率。',
                        src: require('../../assets/images/金融行业资料电子化.png')
                    },
                    {
                        title: '医疗单据识别',
                        text: '用于医疗行业的单据、票据、病例及体检报告等资料的自动识别和结构化整理工作，快速实现电子化入库，减少人工输入过程，提高输入效率。',
                        src: require('../../assets/images/医疗单据识别.png')
                    }
                    ]
                },
                // stepSrc: require('../../assets/images/定制化识别服务使用流程.png')
            }
        },
        created() {
            console.log('scrollTo');
            window.scrollTo(0, 0)
        },
        computed: {
            loginFlag: function(){
            let token = this.$store.state.token || localStorage.getItem('token');
            if(!token || token===null || token==='null'){
                return false;
            }else{
                return true;
            }
            }
        },
        components: {
            bannerBox,
            // media,
            standard,
            jbSection,
            listBox,
            listItem
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .box {
        width: 1170px;;
        padding: 80px 0;
        margin: 0 auto;
        text-align: left;
    }
    
    .futBox,
    .stepBox {
        padding-bottom: 80px;
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
