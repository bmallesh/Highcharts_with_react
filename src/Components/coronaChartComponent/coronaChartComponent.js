import React,{Component} from 'react';
import Highcharts from 'highcharts';
import drilldown from 'highcharts/modules/drilldown';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { render } from '@testing-library/react';

drilldown(Highcharts);

const options = {
    chart:{
        type:"column"
    },
    title:{
        text:"India Corona Chart"
    },
    xAxis:{
        type:"category"
    },
    yAxis:{
        title:{
            text:"Total cases"
        }
    },
    legend: {
        enabled: false
    },
        plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:1f}'
            }
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:2f}</b>active and deths{point.d:2f} of total<br/>'
    },
    series:[
        {
            name:"States",
            colorByPoint:true,
            data:[
                {
                    name:"Andhra Pradesh",
                    y:200,
                    d:4,
                    drilldown: "Andhra Pradesh"
                },
                {
                    name:"Arunachal Pradesh",
                    y:400,
                    drilldown: "Arunachal Pradesh"
                },
                {
                    name:"Assam",
                    y:90,
                    drilldown: "Assam"
                },
                {
                    name:"Bihar",
                    y:100,
                    drilldown: "Bihar"
                },
                {
                    name:"Chandigarh (UT)",
                    y:600,
                    drilldown: "Chandigarh (UT)"
                },
                {
                    name:"Chhattisgarh",
                    y:200,
                    drilldown: "Chhattisgarh"
                },
                {
                    name:"Dadra and Nagar Haveli (UT)",
                    y:100,
                    drilldown: "Dadra and Nagar Haveli (UT)"
                },
                {
                    name:"Daman and Diu (UT)",
                    y:700,
                    drilldown: "Daman and Diu (UT)"
                },
                {
                    name:"Delhi (NCT)",
                    y:1000,
                    drilldown: "Delhi (NCT)"
                },
                {
                    name:"Goa",
                    y:10,
                    drilldown: "Goa"
                },
                {
                    name:"Gujarat",
                    y:50,
                    drilldown: "Gujarat"
                },
                {
                    name:"Haryana",
                    y:100,
                    drilldown: "Haryana"
                },
                {
                    name:"Himachal Pradesh",
                    y:600,
                    drilldown: "Himachal Pradesh"
                },
                {
                    name:"Jammu and Kashmir",
                    y:200,
                    drilldown: "Jammu and Kashmir"
                },
                {
                    name:"Jharkhand",
                    y:100,
                    drilldown: "Jharkhand"
                },
                {
                    name:"Karnataka",
                    y:600,
                    drilldown: "Karnataka"
                },
                {
                    name:"Kerala",
                    y:200,
                    drilldown: "Kerala"
                },
                {
                    name:"Lakshadweep (UT)",
                    y:100,
                    drilldown: "Lakshadweep (UT)"
                },
            ]
        }
    ],
    drilldown: {
        series: [
            {
                name: "Andhra Pradesh",
                id: "Andhra Pradesh",
                colorByPoint:true,
                data: [
                    {name:"Anantapur",y:20},
                    ["Chittoor",50],
                    ["East Godavari",5],
                    ["Guntur",100],
                    ["Krishna",20],
                    ["Kurnool",200],
                    ["Nellore",50],
                    ["Prakasam",100],
                    ["Srikakulam",200],
                    ["Visakhapatnam",300],
                    ["Vizianagaram",150],
                    ["West Godavari",10]
                    ["YSR Kadapa",120]
                ]
            }
        ]
    }
}


class CoronaChart extends Component{
    constructor(props){
        super(props);
        this.state={
            
        }

    }

    componentDidMount(){
        axios.get("https://api.covidindiatracker.com/state_data.json").then((res)=>{
        console.log(res);
        var data=res.data;
        console.log("response")
        var drilldownStates=[];
        var states=[];
        data.map((value,index)=>{
            states.push({
                    name:value.state,
                    y:value.confirmed,
                    active:value.active,
                    drilldown:value.state,
                })
                drilldownStates.push({
                    name:value.state,
                    id:value.state,
                    colorByPoint:true,
                    data:[]

                })
            value.districtData.map((dist,i)=>{
                drilldownStates[index].data.push({name:dist.name,y:dist.confirmed})
            })
        })
        this.setState({
            states,
            drilldownStates
        })
    })
    }


    render(){
        const options1 = {
            chart:{
                type:"column"
            },
            title:{
                text:"India Corona Chart"
            },
            xAxis:{
                type:"category"
            },
            yAxis:{
                title:{
                    text:"Total cases"
                }
            },
            legend: {
                enabled: false
            },
                plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:1f}'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:2f}</b> conformed and active {point.active:2f} <br/>'
            },
            series:[{
                    name:"States",
                    colorByPoint:true,
                    data:this.state.states,
                }],
            drilldown: {
                series:this.state.drilldownStates
            }

        }
        console.log(options1,"state")
        return(
            <div>
            <HighchartsReact highcharts={Highcharts} options={options1}/>
        </div>
        )
    }
}

export default CoronaChart;
