import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Container, Content, List, ListItem,Footer,FooterTab,Item,Input,Button,Form} from 'native-base'
import axios from 'axios'
export default class Api extends Component {
  constructor(props) {
    super(props);
    this.state = {
        getData:[],
        insertNama:'',
        textNama:''
    };
  }
  getData(){
    axios.get('http://192.168.7.1:5000/haisayang').then((res)=>{
        this.setState({getData:res.data})
    })
  }
  
  insertData(){
    axios({
        method: 'post',
        url: 'http://192.168.7.1:5000/haijuga',
        data: {
          nama: this.state.insertNama,
        }
      });
      this.getData()
  }

  componentDidMount(){
        this.getData()
  }

  render() {
    return (
     <Container>
         <Content>
             <List>
                {this.state.getData.map(data=>(
                    <ListItem key={data.id}>
                        <Text>Nama: {data.nama}</Text>
                    </ListItem>
                ))}
             </List>
         </Content>
         <Form>
            <Item>
              <Input placeholder="Nama" value={this.state.insertNama} onChangeText={(data)=>{this.setState({insertNama:data})}} />
            </Item>
            <Button success full onPress={()=>{
                this.insertData()
                this.setState({insertNama:''})
                }}><Text>Input</Text></Button>
          </Form>
     </Container>
    );
  }
}
