import React, { Component } from 'react';
import {TabHeading,Tabs,Tab,Accordion, Container, Header, Left,  Right, Button,  Text,Thumbnail,Content} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {StyleSheet,View, ScrollView,ActivityIndicator,AsyncStorage,TouchableOpacity,Image} from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import Imagecolumn from './Imagecolum'
import axios from 'axios'
import BASE_URL from '../base_url/url'
  const dataArray = [
    { title: "Sorotan Cerita", content: "asdasd"},
  ];
  
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      isLoadingImage:true,
      dataSource:[],
      dataSourceImage:[],
      refreshing:true,
      id_login:'',
      token:'',
      ipaddress:'http://192.168.1.117:5000',
      username:''
    };
  }
  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "white",
        borderWidth:0,
        shadowOpacity:0, }}>
      <Text style={{ fontWeight: "600" }}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="chevron-up" />
          : <Icon style={{ fontSize: 18 }} name="chevron-down" />}
      </View>
    );
  }
  _renderContent(item) {
    return (
    
      <View >
          <View style={{paddingTop:10,paddingBottom:10}}>
        <Text>
          Simpan cerita favorit di profile anda
        </Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Thumbnail large style={{marginRight:10}} source={{uri: 'https://i0.wp.com/zblogged.com/wp-content/uploads/2019/02/FakeDP.jpeg'}} />
        <Thumbnail large style={{marginRight:10}} source={{uri: 'https://i0.wp.com/zblogged.com/wp-content/uploads/2019/02/FakeDP.jpeg'}} />
        <Thumbnail large style={{marginRight:10}} source={{uri: 'https://i0.wp.com/zblogged.com/wp-content/uploads/2019/02/FakeDP.jpeg'}} />
        <Thumbnail large style={{marginRight:10}} source={{uri: 'https://i0.wp.com/zblogged.com/wp-content/uploads/2019/02/FakeDP.jpeg'}} />
        <Thumbnail large style={{marginRight:10}} source={{uri: 'https://i0.wp.com/zblogged.com/wp-content/uploads/2019/02/FakeDP.jpeg'}} />
        </ScrollView>
        </View>
      </View>

    );
  }

  componentDidMount(){
    AsyncStorage.multiGet(['token','id','usernmae'], (error, result) => {
      if (result) {
        this.setState({
          token:result[0][1],
          id_login:result[1][1],
          username:result[2][1]
        })
        Getdata = async () => {
            const response = await axios({
              method: 'post',
              headers: {'Authorization':`Bearer ${this.state.token}`,'content-type': 'application/json'},
              url: `${BASE_URL.URL}/api/get_profile`,
              data: {id: this.state.id_login}
            })
            this.setState({dataSource:response.data[0],isLoadingImage: false,isLoading:false})
        }
        Getdataimage = async () => {
            const response = await axios({
              method: 'post',
              headers: {'Authorization':`Bearer ${this.state.token}`,'content-type': 'application/json'},
              url: `${BASE_URL.URL}/api/get_images`,
              data: {profile_id: this.state.id_login}
            })
            this.setState({dataSourceImage:response.data,isLoadingImage: false,isLoading:false})
        }
        Getdata()
        Getdataimage()
      }
  });
  }
  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    const listImage = this.state.dataSourceImage.map(data=>{
      return(
        <TouchableOpacity  key={data.id} >
          <Image style={{width: 125, height: 125,margin:5}}  source={{uri:`${BASE_URL.URL}/images/${data.images}`}}/>    
        </TouchableOpacity>
      )
    })
  
    return (
      <Container>


        <Header style={{backgroundColor:'white'}}>
          <Left>
            <Text style={{fontWeight:'bold'}}>{this.state.username} <Icon name="chevron-down"/></Text>
          </Left>
          <Right>
            <Button transparent>
              <Icon name='history' style={{fontSize:30}}/>
            </Button>
            <Button transparent>
              <Icon name='bars' style={{fontSize:30}}/>
            </Button>
          </Right>
        </Header>


        <Content>
        <Grid style={{}}>
            <Col style={{paddingTop:20,paddingLeft:20,width:130}}>
              <Thumbnail 
              style={{marginBottom:20}} 
              large 
              source={{uri: `${BASE_URL.URL}/images/${this.state.dataSource.profile_image}`}} />
            </Col>
            <Col style={{justifyContent:'center'}}>
                <Row>
                  <Col style={style.center}>
                    <Text style={style.textBold}>1.234</Text>
                    <Text note>Postingan</Text>
                  </Col>
                  <Col style={style.center}>
                    <Text style={style.textBold}>1.234</Text>
                    <Text note>Pengikut</Text>
                  </Col>
                  <Col style={style.center}>
                    <Text style={style.textBold}>1.234</Text>
                    <Text note>Mengikuti</Text>
                  </Col>
                </Row>
                <Button onPress={()=>{this.props.navigation.navigate('EditBio')}} 
                block 
                small 
                transparent 
                style={style.buttonEditBio}>
                  <Text style={{fontWeight:'bold',color:'black'}}>Edit Profile</Text>
                </Button>
            </Col>
        </Grid>
        <Grid>
        <Col style={{padding:15}}>
          <Text style={{fontWeight:'bold'}}>{this.state.dataSource.name}</Text>
          <Text>{this.state.dataSource.bio}</Text>
          <Text style={{color:'blue'}}>{this.state.dataSource.website}</Text>
        </Col>
        </Grid>
        <Grid>
        <Col style={{padding:15}}>
        <Accordion
            dataArray={dataArray}
            contentStyle={{ backgroundColor: "#ddecf8" }}
            renderHeader={this._renderHeader}
            style={{borderColor:'transparent'}}
            renderContent={this._renderContent}
          />
        </Col>
        </Grid>
        <Grid>
        <Row style={{justifyContent: 'center',}}>
        <Tabs>
          <Tab tabContainerStyle={{ height: 100 }} heading={ <TabHeading style={{backgroundColor:'white'}}><Icon name="th" size={30}/></TabHeading>}>
          <Content>
          <View>
            <Grid>
              <Row style={{flexWrap:'wrap'}}>
                {listImage}
              </Row>
            </Grid>
          </View>
          </Content>
          </Tab>
          <Tab heading={ <TabHeading transparent style={{backgroundColor:'white'}}><Icon name="sticky-note" size={30}/></TabHeading>}>
           <Imagecolumn/>
          </Tab>
          <Tab heading={ <TabHeading transparent style={{backgroundColor:'white'}}><Icon name="id-card" size={30}/></TabHeading>}>
          <View>
            <Grid>
              <Row style={{flexWrap:'wrap'}}>
                {listImage}
              </Row>
            </Grid>
          </View>
          </Tab>
        </Tabs>
        </Row>
        </Grid>
        </Content>

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
  center:{
    justifyContent:'center',
    alignItems:'center'
  },
  buttonEditBio:{
    marginRight:15,
    marginLeft:15,
    borderColor:'gray',
    borderWidth:0.5,
    borderRadius:5
  },
  textBold:{
    fontWeight:'bold'
  }
})