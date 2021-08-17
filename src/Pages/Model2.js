import React, { Component } from 'react'
import ReactDOM from "react-dom";
import { render } from 'react-dom';
import { Stage, Polyline, Shape,Layer, Rect,Ellipse, Text, Circle, Line,Group,Arc,label,Pipe, Label, } from 'react-konva';
import ShapesData from "../Pages/data/shapesData1";





export default class Model2 extends  Component{
    
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
      this.state = {};
      this.shapesObjData=[]
      this.shapelabel=[] 
      //console.log(this.shapesObjData)
      
      
    }

      
    componentDidMount() {
        this.LoadShapes();
      }

      LoadShapes()
      {
        var shapeData=ShapesData.hmipage.shapes.shape
        this.shapesObjData.push(shapeData)
        console.log(shapeData)
        let ciData= ShapesData.hmipage.component_instances.map((ci=> ci))
        this.shapesObjData.push(ciData.map(xx=>xx.shape))
        //console.log(this.myRef.current)
        // let cdData = ShapesData.hmipage.labels.map((cd=>cd))
        // this.shapelabel.push(cdData.map(xy=>xy.shape))
        // console.log(cdData)
      }

      getElementOffset(element, property) {
        property = "offset"+property[0].toUpperCase()+property.slice(1).toLowerCase();
        if (property == "offsetLeft" || property == "offsetTop") {
            var actualOffset = element[property];
            var current = element.offsetParent;
    
            //Look up the node tree to add up all the offset value
            while (current != null) {
                actualOffset += current[property];
                current = current.offsetParent;
            }
            return actualOffset;
        } else if (property == "offsetHeight" || property == "offsetWidth") {
            return element[property];
        }
        return false;
    }


      getXPoint(shape)
      {
        switch(shape.type)
        {
            case "Rectangle":
            return (parseFloat(shape.rectangle.x1)+parseFloat(shape.box.axis_offset_left));
            case "Ellipse":
                return (parseFloat(shape.ellipse.x1)+parseFloat(shape.box.axis_offset_left)+((parseFloat(shape.box.left)+parseFloat(shape.box.right))/2));
                case "Pipe":
                  return (parseFloat(shape.pipe.points.x)+parseFloat(shape.box.axis_offset_left));
              }
      }

      getYPoint(shape)
      {
        switch(shape.type)
        {
            case "Rectangle":
            return (parseFloat(shape.rectangle.y1)+parseFloat(shape.box.axis_offset_top));
            case "Ellipse":
            return (parseFloat(shape.ellipse.y1)+parseFloat(shape.box.axis_offset_top)+((parseFloat(shape.box.top)+parseFloat(shape.box.bottom))/2));
            case "Pipe":
              return (parseFloat(shape.pipe.points.y)+parseFloat(shape.box.axis_offset_top));
        }
      }

      getPloyPoints(shape,parentX,parentY)
      {
        var ptx=[]
       
        switch(shape.type)
        {
            case "Pipe":
               
            ptx=ShapesData.hmipage.shapes.pipe.points.map(o => ({x: o.x, y: o.y}))
            
      
            break;
            case "Polygon":
            ptx=shape.polyline.points.map(o => ({x: o.x, y: o.y}))
            break;

        }

       
        let ptArray=[]
        console.log(ptArray);
        ptx.forEach(element => {
            ptArray.push(parseFloat(element.x)+parseFloat(parentX)+parseFloat(shape.box.axis_offset_left)+((parseFloat(shape.box.left)+parseFloat(shape.box.right))/2))
            ptArray.push(parseFloat(element.y)+parseFloat(parentY)+parseFloat(shape.box.axis_offset_top)+((parseFloat(shape.box.top)+parseFloat(shape.box.bottom))/2))
        });
         
       return ptArray;
      }
     
      renderShapes(shape,obj)
      {

            switch(shape.type)
            {
                case "Rectangle":
                   return <Rect
                    key={shape.object.object_id+Math.random()+"_"+obj.id}
                    id={shape.object.object_id+Math.random()+"_"+obj.id}
                    x={this.getXPoint(shape)+parseFloat(obj.x1)}
                    y={this.getYPoint(shape)+parseFloat(obj.y1)}
                    width={parseFloat(shape.rectangle.x2)}
                    height={parseFloat(shape.rectangle.y2)}
                    fill={shape.fill.fill}
                    strokeWidth={parseFloat(shape.line.line_width)}
                    shadowBlur={10}
                    zIndex={parseFloat(shape.box.z_index)}
                    fillLinearGradientStartPointX={this.getXPoint(shape)+parseFloat(obj.x1)}
                    fillLinearGradientStartPointY={this.getYPoint(shape)+parseFloat(obj.y1)}
                    fillLinearGradientColorStops={1,shape.gradient===undefined?"nofill":shape.gradient.gradient_color}
                    />
                    

                    case "Ellipse":
                      return  <Ellipse
                        key={shape.object.object_id+"Ellipse"+obj.key}
                        id={shape.object.object_id+"_"+shape.ellipse.x2+"c"+obj.key}
                        
                        x={this.getXPoint(shape)+parseFloat(obj.x1)}
                        y={this.getYPoint(shape)+parseFloat(obj.y1)}
                        width={parseFloat(shape.ellipse.x2)}
                        height={parseFloat(shape.ellipse.y2)}
                        fill={shape.fill.fill}
                        shadowBlur={10}
                        strokeWidth={parseFloat(shape.line.line_width)}
                        zIndex={parseFloat(shape.box.z_index)}
                        fillLinearGradientStartPointX={this.getXPoint(shape)+parseFloat(obj.x1)}
                        fillLinearGradientStartPointY={this.getYPoint(shape)+parseFloat(obj.y1)}
                        fillLinearGradientColorStops={1,shape.gradient===undefined?"nofill":shape.gradient.gradient_color}
                        />
                        break;
                        case "Pipe":
                          return   <Line key={"Pipe_"+obj.key}
                          points={this.getPloyPoints(ShapesData.hmipage.shapes,obj.x1,obj.y1)} 
                          fill={ShapesData.hmipage.shapes.fill}
  
                          stroke={ShapesData.hmipage.shapes.line.color}
                          strokeWidth={ShapesData.hmipage.shapes.line.line_width}
                          closed={true}
                          fillLinearGradientStartPointX={this.getXPoint(ShapesData.hmipage.shapes)+parseFloat(obj.x1)}
                          fillLinearGradientStartPointY={this.getYPoint(ShapesData.hmipage.shapes)+parseFloat(obj.y1)}
                          //fillLinearGradientColorStops={1,shape.gradient===undefined?"nofill":shape.gradient.gradient_color}
                      ></Line>
                          break;

                        case "Polygon":
                        return    <Line key={"Polygon_"+obj.key}
                        points={this.getPloyPoints(shape,obj.x1,obj.y1 )} 
                        fill={shape.fill}

                        stroke={shape.line.color}
                        strokeWidth={shape.line.line_width}
                        closed={true}
                        fillLinearGradientStartPointX={this.getXPoint(shape)+parseFloat(obj.x1)}
                        fillLinearGradientStartPointY={this.getYPoint(shape)+parseFloat(obj.y1)}
                        //fillLinearGradientColorStops={1,shape.gradient===undefined?"nofill":shape.gradient.gradient_color}
                    ></Line>
                    case "Labels":
                      return <Label key={"labels_"+obj.key}
                      Text ={ShapesData.hmipage.labels.static_text}
                        fontFamily={ShapesData.hmipage.labels.fontFamily}
                        fontSize={ShapesData.hmipage.labels.fontSize}
                        fill={ShapesData.hmipage.labels.color}
                        shadowBlur={10}
                       
                        zIndex={parseFloat(ShapesData.hmipage.labels.box.z_index)}
                      >

                      </Label>
            }
      }
      // renderShapes(obj){
      
      //               return <label
      //                   Text ={obj }
      //                   fontFamily={}
      //                   fontSize={}
      //                   fill={}
      //                   shadowBlur={10}
      //                   strokeWidth={parseFloat(obj.line.line_width)}
      //                   zIndex={parseFloat(shapelabel.box.z_index)}
      //                   fillLinearGradientStartPointX={this.getXPoint(shapelabel)+parseFloat(obj.x1)}
      //                   fillLinearGradientStartPointY={this.getYPoint(shapelabel)+parseFloat(obj.y1)}
      //                   fillLinearGradientColorStops={1,labels.gradient===unndefined?"nofill":shape.gradient.gradient_color}
      //                   ></label>
                        

      // }

    render() { 

        return(
            <div style={{marginLeft:"500px"}} id="stageContainer">
        <Stage id="konvaStage_11" ref={this.myRef} width={1024} height={800}
            containerId={"stageContainer"}>
            <Layer>
  {ShapesData.hmipage.shapes.map((obj,i) => ( 
                 <Line
                 id={obj.object.object_number}
                key="grp1"
                x={parseFloat(obj.pipe.points.x)}
                x={parseFloat(obj.pipe.points.y)}
               
                zIndex={i}
                fill={"#00D2FF"} 
                draggable={true}
                >
                   
                    </Line>
                ))
                }  

            
                {ShapesData.hmipage.component_instances.map((obj,i) => ( 
                 <Group
                 id={obj.objectNumber}
                key={obj+"Group"+i}
                x={parseFloat(obj.x1)}
                x={parseFloat(obj.y1)}
                width={parseFloat(obj.x2)}
                height={parseFloat(obj.y2)}
               
                fill={"#00D2FF"} 
                draggable={true}
                >
                    {
                        obj.shape.sort((a, b) => parseInt(a.z_index) > parseInt(b.z_index) ? 1 : -1).map((shape)=>(
                                this.renderShapes(shape,obj)
                        ))
                    }
                    </Group>
                ))
                }
                {ShapesData.hmipage.labels.map((obj,i) => ( 
                  <Group>
  
          <Label x={285} y={225} >
                
                  <Text
                  text="TANK A"
                  fontFamily={obj.fontFamily}
                  fontSize={obj.fontSize}
                  fill={obj.color}
                  zIndex={i}
                  />
                   {/* {
                        obj.shape.sort((a, b) => parseInt(a.z_index) > parseInt(b.z_index) ? 1 : -1).map((shape)=>(
                                this.renderShapes(shape,obj)
                        ))
                    } */}
      </Label>
      <Label x={400} y={490} >
                
                  <Text
                  text="TANK B"
                  fontFamily={obj.fontFamily}
                  fontSize={obj.fontSize}
                  fill={obj.color}
                  zIndex={i}
                  />
                   {/* {
                        obj.shape.sort((a, b) => parseInt(a.z_index) > parseInt(b.z_index) ? 1 : -1).map((shape)=>(
                                this.renderShapes(shape,obj)
                        ))
                    } */}
      </Label>
      </Group>
      

      
)
  )  }
                
            </Layer>
      </Stage>  
      </div>
        )
    }
}