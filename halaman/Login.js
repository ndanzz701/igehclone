import React, { Component } from 'react';
import {Input,Item,Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
import {View,Image,AsyncStorage,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { StackActions, NavigationActions } from 'react-navigation';
import axios from 'axios'
import BASE_URL from '../base_url/url'
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      isValid:'',

    }
  }
  componentDidMount(){
    AsyncStorage.clear()
  }
  
  Login = async () => {
    const response = await axios({
      method: 'post',
      headers: { 'content-type': 'application/json' },
      url: `${BASE_URL.URL}/api/login`,
      data: {username: this.state.username,password: this.state.password}
    })
    if(response.data.status == "success"){
      this.setState({isValid:response.data.id})
      this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ],
      }))
      AsyncStorage.setItem('id', `${response.data.id}`);
      AsyncStorage.setItem('token', response.data.token);
      AsyncStorage.setItem('username', response.data.username);
    }else(
      this.setState({isValid:'false'})
    )
  }
  render() {
    return (
      <Container>
        <Content>

          <View style={style.centerItem}>
            <Image style={style.headerImage} 
            source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'}}/>
          </View>

          <Item regular style={style.centerInput}>
            <Input 
            onChangeText={(text)=>{this.setState({username:text})}} 
            style={{margin:10}}
            placeholder='Phone number, email, username'/>
          </Item>

          <Item regular style={style.centerInput}>
            <Input 
              onChangeText={(text)=>{this.setState({password:text})}} 
              secureTextEntry={true} 
              style={{margin:10}}
              placeholder='Password' />
          </Item>
          
          <Button 
              onPress={() => {this.Login()}} 
              bordered 
              info 
              style={style.buttonLogin}>
              <Text>LOG IN</Text>
          </Button>
          <View style={style.centerItem}>
            {this.state.isValid == 'false'?<Text style={{color:'red'}}>Username atau password salah</Text>:null}
          </View>
          <View style={style.ForgetPassword}>
            <Text>Forget your login details? </Text>
            <Text style={{fontWeight:'bold'}}>Get help sigin in.</Text>
          </View>

          <View style={style.viewLine}>
              <View style={style.line} />
              <Text style={style.insideLine}>OR</Text>
              <View style={style.line} />
          </View>

          <View style={{marginTop:20}}>
          <Button onPress={() => {this.props.navigation.navigate('Home')}} style={style.buttonFB}>
            <Icon name='logo-facebook' style={{fontSize:50,color:'white'}}/>
            <Text style={{fontSize:20}}>Log in as @username</Text>
          </Button>
          </View>
        </Content>
        <Footer>
          <FooterTab style={style.footerTab}>
          <View style={{flexDirection:'row',marginTop:20}}>
            <Text style={{fontSize:15}}>Don't have an account? </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>Sign Up.</Text>
          </View>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const style=StyleSheet.create({
  centerItem:{
    justifyContent:'center',
    alignItems:'center',
  },
  headerImage:{
    resizeMode:'contain',
    width: 280,
    height: 230
  },
  centerInput:{
    width: '90%',
    alignSelf:'center',
    borderRadius:10,
    backgroundColor:'#fafafa',
    margin:10
  },
  buttonLogin:{
    alignItems:'center',
    justifyContent:'center',
    height:70,
    width: '90%',
    alignSelf:'center',
    borderRadius:10,
    marginTop:20,
    backgroundColor:'#fafafa'
  },
  ForgetPassword:{
    flexDirection:'row',
    justifyContent:'center',
    marginTop:20
  },
  viewLine:{
    flexDirection: 'row',
    marginTop:20,
    marginLeft:20,
    marginRight:20
  },
  line:{
    backgroundColor: 'black',
     height: 0.9,
      flex: 1, 
      alignSelf: 'center'
  },
  insideLine:{
    alignSelf:'center', 
    paddingHorizontal:5, 
    fontSize: 24, 
    fontWeight:'bold' 
  },
  buttonFB:{
    alignItems:'center',
    justifyContent:'center',
    height:70,
    width: '90%',
    alignSelf:'center',
    borderRadius:10,
    backgroundColor:'#4299ed'
  },
  footerTab:{
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:1,
    justifyContent:"center"
  }
})
