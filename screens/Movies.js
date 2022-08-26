import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { movies } from './data';

export default class Movies extends Component {
  render() {
    return (

        <ScrollView 
        decelerationRate={0.6}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
        >
          <View style={styles.mvPage}>
            <Text style={styles.mvHeader}>Now Showing</Text>
          </View>

          <View style={styles.aMv}>
          
            {movies.map((movie, index) => 
              <View key = {index}>
                <TouchableOpacity
                  onPress={()=>{alert("you clicked me")}}
                >
                  <Image 
                    style={styles.mvPoster} 
                    source={{uri: movie.poster}}
                  />
                </TouchableOpacity>

                <Text 
                style={styles.mvTitle} 
                numberOfLines={1} 
                ellipsizeMode="tail"
                >
                  {movie.title}
                </Text>

                <Text 
                  style={styles.mvGenre} 
                  numberOfLines={1} 
                 ellipsizeMode="tail"
                >
                  {movie.genre}
                </Text>
              </View>
            )}
          </View>

        </ScrollView>
    );
  }
}

onTestPress = () => {
  this.props.navigator.push('Home');
}

const styles = StyleSheet.create ({
  mvPage: {
    fontSize: 25,
  },

  mvHeader: {
    backgroundColor: 'olive',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '20',
    padding: 20,
  },

  container: {
    paddingTop: 20,
    marginTop: 8,
    maxHeight: 800,
  },

  ScrollView: {
    marginHorizontal: 20,
  },


  scrollContent: {
    flexDirection: 'column', 
    justifyContent: 'space-between',
  },

  aMv:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'black',
  },

  mvPoster: {
    width: 120,
    height: 200,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
  },

  mvTitle: {
    fontSize: 18,
    color: 'white',
    margin: 5,
    flexDirection:'column',
    flex: 1,
    flexWrap: 'wrap',
    width: 100,
    textAlign:'left',
  },

  mvGenre: {
    color: '#BBBBBB',
    fontSize: 12,
    marginBottom: 20,
    textAlign:'left',
    flexWrap: 'wrap',
    flex: 1,
    flexDirection:'column',
    width: 100,
    marginLeft: 5,
  },
});