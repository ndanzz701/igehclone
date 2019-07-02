import React, { Component } from 'react';
import { View, Text, Image , TouchableOpacity,AsyncStorage} from 'react-native';
import {Grid,Row,Col} from 'react-native-easy-grid'
import {Content,Item,Input,Button} from 'native-base'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {StackActions, NavigationActions} from 'react-navigation'
import BASE_URL from '../base_url/url'
export default class SelectImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_image:'http://cdn.onlinewebfonts.com/svg/img_133373.png',
      caption:'',
      token:'',
      id_profile:''
    };
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      storageOptions: {
        skipBackup: true
      }
    };
 
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
 
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
 
        this.setState({
          data: response.data,
          profile_image:'file://'+response.path
        });
        
      }
    });
  }

  uploadImageToServer = () => {
 
    RNFetchBlob.fetch('POST', `${BASE_URL.URL}/api/upload`, {
      Authorization: `Bearer ${this.state.token}`,
      'Content-Type': 'multipart/form-data',
      "Accept":"multipart/form-data",
    }, [
        {name: 'file', filename: 'image.png', type: 'image/png', data: this.state.data },
        {name:'caption', data:this.state.caption},
        {name:'id_profile', data:this.state.id_profile},
      ]).then((resp) => {
        if(resp.data == "success"){
         return this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Home' })
            ],
          }))
        }
      }).catch((err) => {
        // ...
      })
 
  }
  componentDidMount(){
    AsyncStorage.multiGet(['token','id'], (error, result) => {
      if (result) {
        this.setState({
          token:result[0][1],
          id_profile:result[1][1]
        })
      }
  });
  }
  render() {
    return (
      <Content>
        <Grid>
          <Col>
            <Col size={25} style={{alignItems:'center',padding:10}}>
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
               <Image style={{width: 210, height: 200}} source={{uri: this.state.profile_image}}/>
              </TouchableOpacity>
            </Col>
            <Col size={75}>
              <Col style={{padding:10}}>
                <Item regular>
                  <Input onChangeText={(text)=>{this.setState({caption:text})}} multiline={true} numberOfLines={4} placeholder='Caption'/>
                </Item>
              </Col>
              <Col style={{padding:10}}>
                <Button onPress={()=>{this.uploadImageToServer()}} block success>
                  <Text style={{color:'white'}}>Kirim</Text>
                </Button>
              </Col>
            </Col>
          </Col> 
        </Grid>
      </Content>
    );
  }
}
