import './App.css'
import {useRef, useState} from "react";
import {ACTIONS} from "./actions_onSelect.js";
import {Pointer_Icon} from "./assets/Pointer_Icon.jsx";
import {Rectangle_Icon} from "./assets/Rectangle_Icon.jsx";
import {Circle_Icon} from "./assets/Circle_Icon.jsx";
import {Arrow_Icon} from "./assets/Arrow_Icon.jsx";
import {Pencil_Icon} from "./assets/Pencil_Icon.jsx";
import {Arrow, Circle, Layer, Line, Rect, Stage, Transformer} from "react-konva";
import {v4 as uuidv4} from 'uuid';

function App() {
    const [selectedStage, setSelectedStage] = useState(ACTIONS.SELECT)
    const [rectangles, setRectangles] = useState([]);
    const [circles, setCircles] = useState([]);
    const [arrows, setArrows] = useState([]);
    const [scribbles, setScribbles] = useState([]);


    const stageRef = useRef()
    const isPainting = useRef()
    const transformerRef = useRef()
    const shapeId = useRef()
    const isDraggable = selectedStage === ACTIONS.SELECT;

    const onPointerDown = (e) => {
        if (selectedStage === ACTIONS.SELECT)  return;
        const stage = stageRef.current
        const {x,y} = stage.getPointerPosition();
        const id = uuidv4();

        shapeId.current = id;
        isPainting.current = true;

        if (selectedStage === ACTIONS.RECTANGLE) {
            setRectangles((rectangles)=>[
                ...rectangles,{
                    id,
                    x,
                    y,
                    width: 12,
                    height: 12
                }
            ])
        } else if (selectedStage === ACTIONS.CIRCLE) {
            setCircles((circles=>[
                ...circles,{
                    id,
                    x,
                    y,
                    radius: 20
                }
            ]))
        } else if (selectedStage === ACTIONS.ARROW) {
            setArrows((arrows=>[
                ...arrows,{
                    id,
                    points: [x,y,x+8,y+8]
                }
            ]))
        } else if (selectedStage === ACTIONS.SCRIBBLE) {
            setScribbles((scribbles=>[
                ...scribbles,{
                    id,
                    points: [x ,y]
                }
            ]))
        }

    }
    const onPointerMove = (e) => {
        if (selectedStage === ACTIONS.SELECT || !isPainting.current) return
        const stage = stageRef.current
        const {x,y} = stage.getPointerPosition();

        if (selectedStage === ACTIONS.RECTANGLE) {
            setRectangles((rectangles)=> rectangles.map((rectangle)=>{
                if (rectangle.id === shapeId.current) {
                    return {
                        ...rectangle,
                        width: x - rectangle.x,
                        height: y - rectangle.y,

                    }
                }
                return rectangle
            }))
        } else if (selectedStage === ACTIONS.CIRCLE) {
            setCircles((circles)=> circles.map((circle)=>{
               if (circle.id === shapeId.current) {
                   return {
                       ...circle,
                       radius: Math.sqrt(Math.pow(x - circle.x,2) + Math.pow(y - circle.y,2))
                   }
               }
               return circle
            }))
        } else if (selectedStage === ACTIONS.ARROW) {
            setArrows((arrows)=> arrows.map((arrow)=>{
                if (arrow.id === shapeId.current) {
                    return {
                        ...arrow,
                        points: [arrow.points[0],arrow.points[1],x,y]
                    }
                }
                return arrow
            }))
        } else if (selectedStage === ACTIONS.SCRIBBLE) {
            setScribbles((scribbles)=> scribbles.map((scribble)=>{
               if (scribble.id === shapeId.current) {
                   return {
                       ...scribble,
                       points:[...scribble.points,x,y]
                   }
               }
               return scribble
            }))
        }
    }
    const onPointerUp = () => { isPainting.current = false;}
    function onClick(e) {
        if (action !== ACTIONS.SELECT) return;
        const target = e.currentTarget;
        transformerRef.current.nodes([target]);
    }
  return (
      <div className={'top-element'}>
          <div className={'tool-bar-parent'}>
              <div className={selectedStage === ACTIONS.SELECT ? "selected-tool" : "tool-wrapper"}
                   onClick={() => setSelectedStage(ACTIONS.SELECT)}>
                  <Pointer_Icon/>
              </div>

              <div className={selectedStage === ACTIONS.RECTANGLE ? "selected-tool" : "tool-wrapper"}
                   onClick={() => setSelectedStage(ACTIONS.RECTANGLE)}>
                  <Rectangle_Icon/>
              </div>

              <div className={selectedStage === ACTIONS.CIRCLE ? "selected-tool" : "tool-wrapper"}
                   onClick={() => setSelectedStage(ACTIONS.CIRCLE)}>
                  <Circle_Icon/>
              </div>

              <div className={selectedStage === ACTIONS.ARROW ? "selected-tool" : "tool-wrapper"}
                   onClick={() => setSelectedStage(ACTIONS.ARROW)}>
                  <Arrow_Icon/>
              </div>

              <div className={selectedStage === ACTIONS.SCRIBBLE ? "selected-tool" : "tool-wrapper"}
                   onClick={() => setSelectedStage(ACTIONS.SCRIBBLE)}>
                  <Pencil_Icon/>
              </div>

              {/*<div className={selectedStage===ACTIONS.ERA ? "tool-wrapper": "selected-tool"} onClick={() => setSelectedStage(ACTIONS.ERA)}>*/}
              {/*    <Eraser_Icon />*/}
              {/*</div>*/}

          </div>
            <Stage
                ref={stageRef}
                width={window.innerWidth}
                height={window.innerHeight}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
            >
                <Layer>
                    <Rect
                        x={0}
                        y={0}
                        width={window.innerWidth}
                        height={window.innerHeight}
                        fill={'#ffffff'}
                        id={'background'}
                        // onClick={()=>{transformerRef.current.nodes([])}}
                    />
                    {rectangles.map((rectangle)=> (
                        <Rect
                            key={rectangle.id}
                            x={rectangle.x}
                            y={rectangle.y}
                            stroke={"black"}
                            strokeWidth={2}
                            height={rectangle.height}
                            width={rectangle.width}
                            draggable={isDraggable}
                            onClick={onClick}
                        />
                    ))}
                    {circles.map((circle)=> (
                        <Circle
                            key={circle.id}
                            x={circle.x}
                            y={circle.y}
                            stroke={"black"}
                            strokeWidth={2}
                            radius={circle.radius}
                            draggable={isDraggable}
                            onClick={onClick}
                        />
                    ))}
                    {arrows.map((arrow)=>(
                        <Arrow
                            points={arrow.points}
                            stroke={"black"}
                            strokeWidth={2}
                            draggable={isDraggable}
                            onClick={onClick}
                        />
                    ))}
                    {scribbles.map((scribble)=>(
                        <Line
                            key={scribble.id}
                            points={scribble.points}
                            stroke={"black"}
                            strokeWidth={2}
                            lineCap="round"
                            lineJoin="round"
                            draggable={isDraggable}
                            onClick={onClick}
                        />
                    ))}
                    <Transformer ref={transformerRef} />
                </Layer>
            </Stage>
      </div>

  )
}

export default App
