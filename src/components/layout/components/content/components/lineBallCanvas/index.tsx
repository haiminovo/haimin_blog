import React, { useEffect, useRef, useState } from 'react';
import { getRandom, getRandomColor } from '@/utils/commonUtils';
import style from './index.module.scss';

const initCanvas = (canvas: any, window: any) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 90;
    const ctx = canvas.current.getContext('2d');
    class Point {
        r: number;
        x: number;
        y: number;
        color: string;
        xSpeed: number;
        ySpeed: number;
        lastDrawTime: number | null;
        constructor() {
            this.r = 1;
            this.x = getRandom(0, canvas.width - this.r / 2);
            this.y = getRandom(0, canvas.height - this.r / 2);
            this.color = getRandomColor();
            this.xSpeed = getRandom(-100, 100);
            this.ySpeed = getRandom(-100, 100);
            this.lastDrawTime = null;
        }
        draw() {
            if (this.lastDrawTime) {
                const now = Date.now();
                const t = (now - this.lastDrawTime) / 1000;
                let x = this.x + this.xSpeed * t;
                let y = this.y + this.ySpeed * t;
                if (x - this.r <= 0 || x + this.r >= canvas.width) {
                    x = getRandom(0, canvas.width - this.r / 2);
                    y = getRandom(0, canvas.height - this.r / 2);
                }
                if (y - this.r <= 0 || y + this.r >= canvas.height) {
                    x = getRandom(0, canvas.width - this.r / 2);
                    y = getRandom(0, canvas.height - this.r / 2);
                }
                this.x = x;
                this.y = y;
            }
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
            this.lastDrawTime = Date.now();
        }
    }
    class Graph {
        pointNum: number;
        points: Point[];
        constructor() {
            this.pointNum = 100;
            this.points = new Array(this.pointNum).fill(0).map(() => new Point());
        }
        draw() {
            requestAnimationFrame(() => {
                this.draw();
            });
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.points.forEach((point, index) => {
                point.draw();
                for (let i = index; i < this.points.length; i++) {
                    let targetPoint = this.points[i];
                    if (
                        Math.pow(
                            Math.pow(Math.abs(point.x - targetPoint.x), 2) +
                                Math.pow(Math.abs(point.y - targetPoint.y), 2),
                            0.5
                        ) < 50
                    ) {
                        ctx.moveTo(point.x, point.y);
                        ctx.lineTo(targetPoint.x, targetPoint.y);
                        ctx.strokeStyle = point.color;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });
        }
    }
    const lineBallGraph = new Graph();
    lineBallGraph.draw();
};


export default function LineBallCanvas() {

    const canvasBox: any = useRef();
    const canvas: any = useRef();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const handleResize=()=>{
        setHeight(canvasBox.current.offsetHeight);
        setWidth(canvasBox.current.offsetWidth);
        initCanvas(canvas, window);
    }
    useEffect(() => {
        setHeight(canvasBox.current.offsetHeight);
        setWidth(canvasBox.current.offsetWidth);
        initCanvas(canvas, window);
    }, [canvas]);

    return (
        <div ref={canvasBox} className={style.canvasBox} onResize={handleResize}>
            <canvas width={width} height={height} ref={canvas}/>
        </div>
    );
}
