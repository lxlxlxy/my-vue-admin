<template>
    <!-- gutter用于指明列之间的间距，列按照24分格布局 -->
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px;">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="getImgUrl('user')" class="user">
                    <div class="user-info">
                        <p style="font-size: 35px;">Admin</p>
                        <p style="color: #999;">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2024-06-30</span></p>
                    <p>上次登录地点：<span>武汉</span></p>
                </div>
            </el-card>

            <el-card shadow="hover" class="user-table">
                <!-- prop 属性来对应对象中的键名,label属性对应表格的列名 -->
                <el-table :data="tableData">
                    <el-table-column 
                        v-for="(val,key) in tableLabel"
                        :key="key"
                        :prop="key"
                        :label="val"/>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top: 20px;">
            <div class="num">
                <el-card
                    :body-style="{display:'flex',padding:0}"
                    v-for="item in countData"
                    :key="item.name"    
                >
                <component :is="item.icon" class="icons" :style="{background:item.color}"></component>
                <div class="detail">
                    <p class="num">
                        $ {{ item.value }}
                    </p>
                    <p class="txt">
                        $ {{ item.name }}
                    </p>
                </div>

                </el-card>
            </div>
            <el-card class="top-echarts">
                <div ref="echartsTop" style="height: 100%; padding:0"></div>
            </el-card>
            <div class="under-echarts">
                <el-card>
                    <div ref="echartsLeft" style="height: 100%;"></div>
                </el-card>
                <el-card>
                    <div ref="echartsRight" style="height: 100%;"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
import {onMounted, ref,reactive,useTemplateRef,onUnmounted } from 'vue'
import { getTableData , getCountData,getChartData} from '@/api/api'
import * as echarts from 'echarts';
import '@/api/mock.js'

    const tableData=ref([])
    const tableLabel = ref({
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
    })
    //折线图使用的配置
    const xOptions = reactive({
        // 图例文字颜色
        textStyle: {
            color: "#333",
        },
        legend: {},
        grid: {
            left: "20%",
        },
        // 提示框
        tooltip: {
            trigger: "axis",
        },
        xAxis: {
            type: "category", // 类目轴
            data: [],
            axisLine: {
                lineStyle: {
                    color: "#17b3a3",
                },
            },
            axisLabel: {
                interval: 0,
                color: "#333",
            },
        },
        yAxis: [
            {
                type: "value",
                axisLine: {
                    lineStyle: {
                    color: "#17b3a3",
                    },
                },
            },
        ],
        color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
        series: [],
    })
    //柱状图使用的配置
    const barOptions = reactive(JSON.parse(JSON.stringify(xOptions)))
    //饼状图使用的配置
    const pieOptions = reactive({
        tooltip: {
            trigger: "item",
        },
        legend: {},
        color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
        ],
        series: []
    })
    function getImgUrl(user){
        return new URL(`../assets/images/${user}.png`,import.meta.url).href
    }
    const countData=ref([])
    const chartData=ref([])
    const getTable = async ()=> {
        let res=await getTableData()
        console.log('Home Table',res);
            tableData.value=res.tableData
    }
    const getCount=async ()=>{
        let res=await getCountData()
        console.log('Home Count',res);
        countData.value=res
    }
    const echartsTop=useTemplateRef('echartsTop')
    const echartsLeft=useTemplateRef('echartsLeft')
    const echartsRight=useTemplateRef('echartsRight')
    const observer = ref(null)  //监听页面的变化
    const getChart=async ()=>{
        let {orderData,userData,videoData}=await getChartData()
        console.log('Home Chart',orderData);
        //折线图
        xOptions.xAxis.data=orderData.date
        //['苹果'，'小米'，'oppo','一加'，‘魅族’]
        xOptions.series=Object.keys(orderData.data[0]).map(val=>
            {
                return {
                    name:val,
                    data:orderData.data.map(item=>item[val]),
                    type:'line'
                }
            }
        ) 
        const oneEcharts=echarts.init(echartsTop.value)  //初始化容器
        oneEcharts.setOption(xOptions)
        //柱状图
        barOptions.xAxis.data=userData.map(item=>item.date)
        barOptions.series=[
            {
                name:'新增用户',
                data:userData.map(item=>item.new),
                type:'bar'
            },
            {
                name:'活跃用户',
                data:userData.map(item=>item.active),
                type:'bar'
            }
        ]
        const twoEcharts=echarts.init(echartsLeft.value)
        twoEcharts.setOption(barOptions)
        //饼状图
        pieOptions.series=[
            {
                data:videoData,
                type:'pie'
            }
        ]
        const threeEcharts=echarts.init(echartsRight.value)
        threeEcharts.setOption(pieOptions)

        //根据页面的大小变化
        observer.value = new ResizeObserver(() => {
            oneEcharts?.resize()
            twoEcharts?.resize()
            threeEcharts?.resize()
        })
        if (echartsTop.value) {
            observer.value.observe(echartsTop.value)
        }

        if (echartsLeft.value) {
            observer.value.observe(echartsLeft.value)
        }

        if (echartsRight.value) {
            observer.value.observe(echartsRight.value)
        }
    }
    onMounted(()=>{
        getTable()
        getCount()
        getChart()
    })
    onUnmounted(()=>{
        observer.value?.disconnect()
    })

</script>

<style lang="less" scoped>
.home{
    height: 100%;
    overflow: hidden;
    .user{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        img{
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }
        .user-info{
            p{
                line-height: 40px;
            }
        }
    }
    .login-info{
        p{
            line-height: 30px;
            font-size: 14px;
            color: #999;
            span{
                color: #666;
                margin-left:60px;
            }
        }
    }
    .user-table{
        margin-top:20px ;
    }
    .num{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .el-card{
            width: 32%;
            margin-bottom:20px;
        }
        .icons{
            width: 80px;
            height: 80px;
            font-size: 30px;
            text-align: center;
            line-height: 80px;
            color:#fff
        }
        .detail{
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .num{
                font-size: 30px;
                margin-bottom: 10px;
            }
            .txt{
                font-size: 15px;
                text-align: center;
                color:#999
            }
        }
    }
    .top-echarts{
        height: 280px;;
    }
    .under-echarts{
        margin-top:20px;
        display: flex;
        justify-content: space-between;
        .el-card{
            width: 48%;
            height: 240px;
        }

    }
}
    
</style> 