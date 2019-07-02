import React, { Component } from 'react';
import { ActionSheet,Container, Header, Left, Body, Right, Button,  Text,Thumbnail, Card, CardItem,Item,Input,Label} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {Image,StyleSheet,View, ScrollView,AsyncStorage,TouchableOpacity} from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import axios from 'axios'
import Modal from "react-native-modal";
import BASE_URL from '../base_url/url'
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token:'',
      id_login:'',
      username:'',
      dataSource:[],
      url:'http://192.168.1.117:5000/',
      isModalVisible: false
    };
    this.deletePost = this.deletePost.bind(this);
  }
  componentDidMount(){
    AsyncStorage.multiGet(['token','id','username'], (error, result) => {
      if (result) {
        this.setState({
          token:result[0][1],
          id_login:result[1][1],
          username:result[2][1],
        })
      this.Getdata()
      }
  });
  }
  Getdata = async () => {
    const response = await axios({
      method: 'post',
      headers: {'Authorization':`Bearer ${this.state.token}`,'content-type': 'application/json'},
      url: `${BASE_URL.URL}/api/get_images`,
      data: {profile_id: this.state.id_login}
    })
     this.setState({dataSource:response.data})
}
  toggleModal = (id) => {
    this.setState({ isModalVisible: {[id]:true} });
  };

  deletePost = async (id) => {
    const response = await axios({
      method: 'delete',
      url: `${BASE_URL.URL}/api/deleteimages`,
      headers:{'Authorization':`Bearer ${this.state.token}`,'content-type': 'application/json'},
      data: {id: id}
    })
   this.setState({isModalVisible:false})
   console.log(response)
   this.Getdata()
}
  render() {
    var gambar = [];
    for(let i = 0; i < 10; i++){
      gambar.push(
        <Row key={i} size={4} style={{ justifyContent:'center' ,backgroundColor:'white',padding:10}}>
        <Thumbnail large source={{uri: 'https://i0.wp.com/zblogged.com/wp-content/uploads/2019/02/FakeDP.jpeg'}} />
        <Text style={{position:'absolute', bottom:5}}>username</Text>
        </Row>
      )
     }

    const source = this.state.dataSource.map(data=>{
      return(
        <Card key={data.id} transparent>
        <CardItem>
          <Left>
            <Thumbnail small source={{uri: `${BASE_URL.URL}/images/${data.profile_image}`}} />
            <Body>
              <Text>{this.state.username}</Text>
              <Text note>dimana atuh dimana</Text>
            </Body>
          </Left>
          <Right>
            <TouchableOpacity onPress={()=>{this.toggleModal(data.id)}}>
            <Icon name="ellipsis-h" style={{fontSize:30}}/>
            </TouchableOpacity>
          </Right>
        </CardItem>
        <CardItem cardBody>
          <Image source={{uri: `${BASE_URL.URL}/images/${data.images}`}} style={{height: 200, width: null, flex: 1}}/>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon name="heart" style={{fontSize:30}}/>
            </Button>
            <Button transparent>
              <Icon active name="comment" style={{fontSize:30}}/>
            </Button>
            <Button transparent>
              <Icon active name="telegram-plane" style={{fontSize:30}}/>
            </Button>
          </Left>
          <Body>
          </Body>
          <Right>
          <Button transparent>
              <Icon active name="bookmark" style={{fontSize:30}}/>
            </Button>
          </Right>
        </CardItem>
        <CardItem footer>
          <Text>930 Suka</Text>
        </CardItem>
        <CardItem>
          <Text style={{fontWeight:'bold'}}>{this.state.username} <Text style={{fontWeight:'normal'}}>{data.caption}</Text></Text>
        </CardItem>
        <CardItem>
          <Text style={{color:'grey'}}>Lihat semua {data.id} komentar </Text>
        </CardItem>
        <CardItem>
        <Thumbnail small source={{uri: `${BASE_URL.URL}/images/${data.profile_image}`}} />
        <Item inlineLabel>
          <Label style={{marginLeft:10, color:'gray'}}>Tambahkan komentar...</Label>
          <Input />
        </Item>
        </CardItem>
        <CardItem>
          <Text note style={{color:'grey'}}>2 hari yang lalu </Text>
        </CardItem>
        <Modal isVisible={this.state.isModalVisible[data.id]} hasBackdrop={false}>
          <View style={styles.content}>
                <Button onPress={()=>{this.deletePost(data.id)}} block iconLeft transparent >
                  <Icon name='trash'  style={{color:'red',fontSize:30}} />
                  <Text>Hapus</Text>
                </Button>
                <Button block iconLeft transparent onPress={()=>{this.setState({isModalVisible:false})}} >
                  <Icon name='times' style={{color:'yellow',fontSize:30}} />
                  <Text>Batal</Text>
                </Button>
          </View>
        </Modal>
      </Card>
      
      )
    })
    return (
      <Container>
        <Header style={{backgroundColor:'white'}}>
          <Left>
            <Button transparent>
              <Icon name='camera' style={{fontSize:30}}/>
            </Button>
          </Left>
          <Body style={style.center}>
          <Button transparent>
              
            </Button>
            <Image style={style.image} source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'}}/>
            <Button transparent>
             
            </Button>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='telegram-plane' style={{fontSize:30}}/>
            </Button>
          </Right>
        </Header>


        <Grid>
          <ScrollView>
            <Row size={20}>
              <Grid>
                <Row size={1} style={{padding:8}}>
                  <View>
                   <Text style={{paddingLeft:10}}>Stories</Text>
                  </View>
                  <Row style={{justifyContent:'flex-end'}}><
                    Text><Icon name='play'/> Watch All</Text>
                  </Row>
                </Row>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Row size={4} style={{ justifyContent: 'center',backgroundColor:'white',padding:10}}>
                  <Thumbnail style={{marginBottom:20}} large source={{uri: 'http://www.pps-vet.co.uk/wp-content/uploads/2018/04/George-Cruchley-profile-pic.png'}} />
                   <Icon style={style.icon} name="plus-circle" />
                  <Text style={{position:'absolute', bottom:5}}>You</Text>
                </Row>
                  {gambar}
                </ScrollView>
              </Grid>
            </Row>
            <Row size={70}>
              <Grid>
                <Col>
                   {source}
                </Col>
              </Grid>
            </Row>
            </ScrollView>
        </Grid>

        
      </Container>
    );
  }
}

const style=StyleSheet.create({
  image:{
    flex: 1,
    alignSelf: 'stretch',  },
  center:{
marginLeft: 80,
    flex:1,
    flexDirection: 'row',
    
  },
  icon:{
    backgroundColor:'white',
    position: 'absolute',
    fontSize:20,
    top:65,left:72,
    color:'#4299ed',
    borderRadius:20,
  }
})
const styles=StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
})