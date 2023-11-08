import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import twitterLogo from '../images/twitter.svg.png'; 
import Icon from 'react-native-vector-icons/FontAwesome';


const Sidebar = () => {
  return (
    <View style={{ flex: 1, margin: 10 }}>
      <ScrollView>
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <TouchableOpacity style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={twitterLogo} style={{ width: 90, height: 90 }} />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 20 }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <Icon name='home' size={20} color='blue'/>
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            
            <Text>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
         
            <Text>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        
            <Text>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          
            <Text>Lists</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
           
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{ backgroundColor: '#0096d2', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginVertical: 10, padding: 10 }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Tweet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Sidebar;
