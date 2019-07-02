import React, { Component } from 'react';
import { View , Image,ActivityIndicator} from 'react-native';
import { Left, Body, Right, Button, Text,Thumbnail, Card, CardItem,} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class PotoKebawah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      dataSource:[]
    };
  }
  componentDidMount(){
    return fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=3938098895.1677ed0.967ab605692a46069fffc4e56f1dbbd2')
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.data)
      this.setState({
        isLoading: false,
        dataSource: responseJson.data,
      });
    })
    .catch((error) =>{
      console.error(error);
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
    const listImage = this.state.dataSource.map(data=>{
      return(
        <Card key={data.id}>
        <CardItem>
          <Left>
            <Thumbnail small source={{uri: data.user.profile_picture}} />
            <Body>
              <Text>{data.user.username}</Text>
            </Body>
          </Left>
          <Right>
            <Icon name="ellipsis-h" style={{fontSize:30}}/>
          </Right>
        </CardItem>
        <CardItem cardBody>
          <Image source={{uri: data.images.standard_resolution.url}} style={{height: 200, width: null, flex: 1}}/>
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
          <Text>{data.likes.count} Suka</Text>
        </CardItem>
        <CardItem>
          <Text style={{fontWeight:'bold'}}>{data.user.username} <Text style={{fontWeight:'normal'}}>{data.caption.text}</Text></Text>
        </CardItem>
        <CardItem>
          <Text style={{color:'grey'}}>Lihat semua {data.comments.count} komentar </Text>
        </CardItem>
        <CardItem>
     <View>
     <Text style={{fontWeight:'bold'}}>username <Text style={{fontWeight:'normal'}}>follback ya..<Text style={{color:'blue'}}>@mangjuned</Text></Text></Text>
     <Text style={{fontWeight:'bold'}}>username2 <Text style={{fontWeight:'normal'}}>follback aku juga ya..</Text></Text>
     </View>
        </CardItem>
        <CardItem>
          <Text note style={{color:'grey'}}>2 hari yang lalu </Text>
        </CardItem>
      </Card>
      )
    })
    return (
      <View>
        {listImage}
      </View>
    );
  }
}
