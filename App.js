import React, { Component } from 'react';
import {
  FlatList,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListItem,
  ListView,
} from 'react-native';
import firebase from 'firebase';
import Item from './src/Item';
import FirebaseClient from './src/FirebaseClient';


const styles = StyleSheet.create({
})

const list = ['Loading...']

export default class App extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      dataSource: this.ds.cloneWithRows(list),
      text: ''
    };

    this.itemsRef = this.getRef().child('items');
    this.renderItem = this.renderItem.bind(this)

  }

  getRef() {
    return FirebaseClient.database().ref();
  }

  setItemsFromFirebase(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.ds.cloneWithRows(items)
      });

    });
  }
  componentDidMount() {
    this.setItemsFromFirebase(this.itemsRef);
  }

  renderItem(item) {
    return (
      <Item item={item} />
    )
  }

  filterSearch(text) {
    const newData = list.filter(function (item) {
      const itemData = item.title.toUpperCase();
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      text: text
    })
  }
  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <TextInput
          placeholder="Search"
          onChangeText={(text) => this.filterSearch(text)}
          value={this.state.text}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderItem} />
      </View>

    )
  };
}

   /* var ds = new FlatList.DataSource({rowHasChanged: (r1,r2) => r1 !== r2 });
    return {ds};
    this.state = {
      text: '',
      dataSource: ds.cloneWithRows(flatListData)
    }*/


 /* filterSearch(text){
    const newData = flatListData.filter(function(item){
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({ 
      dataSource: this.state.dataSource.cloneWithRows(newData),
      text: text
     })

     <TextInput
            onChangeText={(text)=> this.filterSearch(text)}
            value={this.state.text}
             />
  }*/