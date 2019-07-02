import React, { Component } from 'react';
import { View, AsyncStorage,TextInput,TouchableOpacity} from 'react-native';
import {Grid,Row,Col} from 'react-native-easy-grid'
import axios from 'axios'
import {Thumbnail,Item,Label,Input,Text,Picker,Form,Content,Button} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {StackActions, NavigationActions} from 'react-navigation'
import BASE_URL from '../base_url/url'
export default class EditBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataSource:[],
        token:'',
        id_login:'',
        selected:'',
        name:'',
        website:'',
        bio:'',
        email:'',
        phone:'',
        ImageSource: null,
        data: null,
        Image_TAG: '',
        ipaddress:'http://192.168.1.117:5000'

    };
  }
  uploadImageToServer = () => {
 
    RNFetchBlob.fetch('PATCH', `${BASE_URL.URL}/api/editbio`, {
      Authorization: `Bearer ${this.state.token}`,
      'Content-Type': 'multipart/form-data',
      "Accept":"multipart/form-data",
    }, [
        {name: 'file', filename: 'image.png', type: 'image/png', data: this.state.data },
        {name:'name', data:this.state.name},
        {name:'website', data:this.state.website},
        {name:'bio', data:this.state.bio},
        {name:'email', data:this.state.email},
        {name:'phone', data:this.state.phone},
        {name:'gender', data:this.state.selected},
        {name:'id_login', data:this.state.id_login},
      ]).then((resp) => {
        if(resp.data == "success"){
         return this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Profile' })
            ],
          }))
        }
      }).catch((err) => {
        // ...
      })
 
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
          ImageSource: source,
          data: response.data,
          profile_image:'file://'+response.path
        });
        
      }
    });
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  componentDidMount(){
   AsyncStorage.multiGet(['token','id'], (error, result) => {
     if (result) {
       this.setState({
         token:result[0][1],
         id_login:result[1][1]
       })
       Login = async () => {
           const response = await axios({
             method: 'post',
             headers: {'Authorization':`Bearer ${this.state.token}`,'content-type': 'application/json'},
             url: `${BASE_URL.URL}/api/get_profile`,
             data: {id: this.state.id_login}
           })
           this.setState({
                dataSource:response.data[0],isLoadingImage: false,
                isLoading:false,selected:response.data[0].gender,
                name:response.data[0].name,
                website:response.data[0].website,bio:response.data[0].bio,
                email:response.data[0].email,phone:response.data[0].phone,
                profile_image:`${BASE_URL.URL}/images/`+response.data[0].profile_image
        })
        //console.log(response)
       }
       Login()
     }
 });
 }

  render() {
    return (
        <Content>
      <Grid>
          <Row size={20}>
            <Col style={{height:150, alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity 
              style={{alignItems:'center',justifyContent:'center'}} 
              onPress={this.selectPhotoTapped.bind(this)}>
                <Thumbnail large source={{uri: this.state.profile_image}} />
                <Text style={{color:'blue',fontSize:20}}>Edit Foto Profile</Text>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={80}>
            <Col style={{padding:10}}>
              <Text note>Nama</Text>
            <Item last>
              <Input value={this.state.name} onChangeText={(text)=>{this.setState({name:text})}}/>
            </Item>
              <Text note>Situs Web</Text>
            <Item last>
              <Input value={this.state.website} onChangeText={(text)=>{this.setState({website:text})}}/>
            </Item>
              <Text note>Bio</Text>
            <Item last>
              <Input value={this.state.bio} onChangeText={(text)=>{this.setState({bio:text})}}/>
            </Item>
              <Text note>Alamat Email</Text>
            <Item last>
              <Input value={this.state.email} onChangeText={(text)=>{this.setState({email:text})}}/>
            </Item>
              <Text note>Nomor Telepon</Text>
            <Item last>
              <Input value={`${this.state.phone}`} onChangeText={(text)=>{this.setState({phone:text})}}/>
            </Item>
            <Form>
            <Picker
              mode="dropdown"
              iosHeader="Pilih Jenis Kelamin"
              iosIcon={<Icon name="chevron-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            ><Picker.Item label="Laki-Laki" value="Laki-Laki" />
            <Picker.Item label="Perempuan" value="Perempuan" />
          </Picker>
          </Form>
          <Button onPress={()=>{this.uploadImageToServer()}} block success>
            <Text>Save</Text>
          </Button>
            </Col>
          </Row>
      </Grid>
      </Content>
    );
  }
}
