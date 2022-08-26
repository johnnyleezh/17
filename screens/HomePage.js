import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView 
} from 'react-native';
import { ImageSlider } from "react-native-image-slider-banner";
import ImagedCarouselCard from "react-native-imaged-carousel-card";
import { auth } from '../firebase';

import { Top3Movies } from './data';


export default class HomePage extends Component{

  render() {
    return (
      <SafeAreaView>
        <ScrollView 
          decelerationRate={0.6}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          persistentScrollbar={true}
        >
          <View>
            <Text style={styles.welTxt}>Welcome to Sg. Long Cinema</Text>

            <Text style={styles.aName}>{auth.currentUser?.email}</Text>
          </View>

          
          <ImageSlider 
            data={[
              {img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU'},
              {img: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg'},
              {img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg'}
            ]}

            autoPlay={false}
            onItemChanged={(item) => console.log("item", item)}
            closeIconColor="#fff"
          />

          <View style={styles.groupCarousel}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >

              <ImagedCarouselCard
                text={"Inception"}
                source={{
                  uri: "https://image.tmdb.org/t/p/original/8bxMHkuEzRpIC1YeVhWJKBnj5qq.jpg",
                }}
                style={styles.aCarousel}
                shadowColor="#051934"
              />

              <ImagedCarouselCard
                text={"Minions: The Rise of Gru"}
                source={{
                  uri: "https://dx35vtwkllhj9.cloudfront.net/universalstudios/minions-the-rise-of-gru/images/regions/ca/onesheet.jpg",
                }}
                style={styles.aCarousel}
              />

              <ImagedCarouselCard
                text={"Frozen II"}
                source={{
                  uri: "https://lumiere-a.akamaihd.net/v1/images/p_frozen2_19644_4c4b423d.jpeg",
                }}
                style={styles.aCarousel}
              />
            </ScrollView>
          </View>
          
          <View style={styles.mvPage}>
            <Text style={styles.mvHeader}>Top 3 Movies</Text>
          </View>

          <View style={styles.aMv}>
            {Top3Movies.map((movie, index) => 
              
                <Image 
                  style={styles.mvPoster} 
                  source={{uri: movie.poster}}
                  key={index}
                />

                

            )}
          </View>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create ({
  welTxt: {
    fontSize: 27,
    textAlign: 'center',
  },

  aName: {
    fontSize: 20,

  },

  groupCarousel: {
    backgroundColor: 'black',
  },

  aCarousel: {
    marginLeft: 50,
    marginRight:50,
    width: 300,
    height:500,
    marginBottom: 40,
    marginTop: 40,
    shadowColor:'#051934',
  },

  mvHeader: {
    fontSize: 40,
    fontWeight: '20',
    textAlign: 'center',
    color: 'white',
    padding: 20,
    backgroundColor: 'olive',
  },

  aMv:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%' ,
    backgroundColor: 'black',
  },

  mvPoster: {
    marginTop: 10,
    width: 120,
    height: 200,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
  },
})