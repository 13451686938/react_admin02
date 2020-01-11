import React,{Component} from 'react';
import { Drawer, Button, Table } from 'antd';

class App extends React.Component {
  state = { visible: true };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Open
        </Button>
        <Drawer
          title="Basic Drawer"
          width={800}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          {/* <Table columns={this.state.columns} dataSource={data} pagination={false}/> */}
        </Drawer>
      </div>
    );
  }
}

export default App