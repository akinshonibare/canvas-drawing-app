import React, { Component } from "react";
import "./Canvas.css";
import { Layout, Button } from "antd";
import { ChromePicker } from "react-color";

const { Sider, Content } = Layout;

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      painting: false,
      color: "#000",
      mode: "pen"
    };
  }

  componentDidMount() {
    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext("2d");

    this.resizeCanvas();

    window.addEventListener("resize", () => {
      this.resizeCanvas();
    });

    this.canvas.addEventListener("mousedown", this.startPosition);
    this.canvas.addEventListener("mouseup", this.finishedPosition);
    this.canvas.addEventListener("mousemove", this.draw);
  }

  resizeCanvas = () => {
    //   this.canvas.height = window.innerHeight;
    //   this.canvas.width = window.innerWidth;

    this.canvas.height = 500;
    this.canvas.width = window.innerWidth - 200;
  };

  startPosition = e => {
    this.setState({
      painting: true
    });
    this.draw(e);
  };

  finishedPosition = () => {
    this.setState({
      painting: false
    });
    this.ctx.beginPath();
  };

  draw = e => {
    if (!this.state.painting) return;

    this.ctx.strokeStyle = this.state.color;
    this.ctx.lineWidth = 5;
    this.ctx.lineCap = "round";

    // this.ctx.lineTo(e.clientX - 250, e.clientY - 60);
    // this.ctx.stroke();
    // this.ctx.beginPath();
    // this.ctx.moveTo(e.clientX - 250, e.clientY - 60);

    if (this.state.mode == "pen") {
      this.ctx.globalCompositeOperation = "source-over";
      this.ctx.lineTo(e.clientX - 250, e.clientY - 60);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(e.clientX - 250, e.clientY - 60);
    } else {
      this.ctx.globalCompositeOperation = "destination-out";
      this.ctx.lineTo(e.clientX - 250, e.clientY - 60);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(e.clientX - 250, e.clientY - 60);
    }
  };

  clearCanvas = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  handleChangeComplete = color => {
    this.setState({ color: color.hex });
    console.log(color.hex);
  };

  switchBrush = () => {
    this.setState({
      mode: this.state.mode === 'pen' ? 'eraser' : 'pen'
    })
  }

  render() {
    return (
      <>
        <Sider className="sider">
          <Button onClick={this.clearCanvas} className="btn">
            clear canvas
          </Button>
          <Button onClick={this.switchBrush} className="btn">
            {this.state.mode === 'pen' ? 'eraser' : 'pen'}
          </Button>
          <ChromePicker
            color={this.state.color}
            onChangeComplete={this.handleChangeComplete}
          />
        </Sider>
        <Content className="canvasContent">
          <canvas id="canvas" ref="canvas" />
        </Content>
      </>
    );
  }
}

export default Canvas;
