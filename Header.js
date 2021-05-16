import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Image style={styles.image}  source={require('../assets/icon.png')}/>
      
    </View>
  )
}

return (
  <View style={styles.header}>
        <Image style={styles.image}  source={require('../assets/sfondo.jpg')}/>
    
  </View>
)
const styles = StyleSheet.create({
  header: {

    backgroundColor: '#000000',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#F3F3F3',
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  image: {
    alignItems: 'center',
    width: 70, height: 70,
    //resizeMode: 'contain'
  }
});

export default Header;
