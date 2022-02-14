import React from "react";
// import { useNavigate } from "react-router-dom";
import { Typography, Divider } from "antd";
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { Card } from 'antd';


function GameMenu() {
  // const history = useNavigate();
  const styles = {
    button :{
       marginRight : 10,
    },
    card : {
      border : '2px solid #e8e8e8',
      width: 500
    }
  }
    const history = useNavigate();
    const { Title, Paragraph, Text, Link } = Typography;
  return (
    <div>
       <Card title="Welcome To TypeRicer"  style={styles.card}>
        <Title strong>Game Menu</Title>
        <Button style={styles.button} >Create Room</Button>
        <Button >Join Room</Button>
      </Card>
    </div>
  );
};
export default GameMenu;
