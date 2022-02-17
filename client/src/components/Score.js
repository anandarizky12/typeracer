import React from "react";
import { Table, Tag, Space } from "antd";

const getScoredBoard = (players) => {
  const scoreBoard = players.filter((player) => {
    return player.WPM != -1;
  });

  return scoreBoard.sort((a, b) => {
    return b.WPM - a.WPM;
  });
};

function Score({ players }) {
  const columns = [
    {
      title: "Nickname",
      dataIndex: "nickname",
      key: "nickname",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Score/WPM",
      dataIndex: "WPM",
      key: "WPM",
    },
  ];

  const scoreBoard = getScoredBoard(players);

  if (scoreBoard.length === 0) return null;
  return (
    <div>
      <Table columns={columns} dataSource={players} />
      {/* <table>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>WPM</th>
          </tr>
        </thead>
        <tbody>
          {scoreBoard.map((player, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.nickname}</td>
                <td>{player.WPM}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
}

export default Score;

// ReactDOM.render(, mountNode);
