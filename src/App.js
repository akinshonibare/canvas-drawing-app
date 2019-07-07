import React from "react";
import "./App.css";
import { Layout } from 'antd';
import DrawingCanvas from "./components/Canvas/Canvas";

const { Header, Footer } = Layout;

function App() {
  return (
    <Layout className="app">
      <Header className="header">Simple Drawing Web Appliation</Header>
      <Layout>
        <DrawingCanvas />
      </Layout>
      <Footer className="footer">Footer</Footer>
    </Layout>
  );
}

export default App;
