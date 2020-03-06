import React from 'react';
import { Input, Button, Select } from 'antd';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      liked: false,
      userInput: '',
    };
  }

  handleClick(param,e) {
    console.log(param)
    this.setState({ 
      liked: !this.state.liked
    });
  }

  inputRef(){
    this.setState(() =>{
      this.refs.theInput.focus();
    })
  }

  render() {
    const text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <div>
        <p onClick={this.handleClick.bind(this,'123')}>
          You {text} this. Click to toggle.
        </p>
        <Input />
        <Select 
          ref="theInput"
        >
          <Option value="0">请选择</Option>
          <Option value="1" title="配件信息不明确">配件信息不明确</Option>
          <Option value="2" title="配件缺货">配件缺货</Option>
        </Select>
        <Button onClick={this.inputRef.bind(this)}>获取input中ref的值</Button>
      </div>
    );
  }
}

export default LikeButton;