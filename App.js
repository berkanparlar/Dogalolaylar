import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Marker } from 'react-native-maps'
import axios, { Axios } from 'axios';
import MapView from "react-native-map-clustering";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      loading: true
    }
  }

  componentDidMount() {
    axios.get('https://eonet.gsfc.nasa.gov/api/v3/events')
      .then((res) => {
        this.setState({
          events: res.data.events,
          loading: false
        })
      })
      .catch((e) => console.log(e))
  }
  render() {
    const {loading, events} = this.state
    
    return (
      <View>
        {loading
          ?
          <Text>Yükleniyor</Text>
          :
          <MapView
            initialRegion={{
              latitude: 41.0030108,
              longitude: 28.7955343,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.mapContanier}
          >
            {
              events.map(
                item=>{ 
                  return(
                  <Marker
                  coordinate={{
                  
                    latitude:item.geometry[0].coordinates[1],
                    longitude:item.geometry[0].coordinates[0]
                  }}
                  title={item.title}
                  description={item.categories[0].title}
                  >
                   
                  </Marker>
                  )
                }
              )
            }
            
          </MapView>
        }
      </View>

    )
  }
}
const styles = StyleSheet.create({
  mapContanier: {
    width: '100%',
    height:'100%'
  }
})