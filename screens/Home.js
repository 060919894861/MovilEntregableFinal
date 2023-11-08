import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';
import { db } from '../firebase-config';
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc
} from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import PersonaLogo from '../screens/images/Person.jpg';
import { Timestamp } from 'firebase/firestore';

const Content = () => {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState('');
  const [newComments, setNewComments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tweets'), (querySnapshot) => {
      const tweetsData = [];

      querySnapshot.forEach((doc) => {
        tweetsData.push({ id: doc.id, ...doc.data() });
      });

      setTweets(tweetsData);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTweet = async () => {
    if (newTweet.trim() !== '') {
      try {
        const tweetData = {
          text: newTweet,
          timestamp: serverTimestamp(),
          comments: [],
        };

        await addDoc(collection(db, 'tweets'), tweetData);

        setNewTweet('');
      } catch (error) {
        console.error('Error al publicar el tweet:', error);
      }
    }
  };

  const handleAddComment = async (tweetId) => {
    if (newComments[tweetId] && newComments[tweetId].trim() !== '') {
      const tweetRef = doc(db, 'tweets', tweetId);

      try {
        const tweetDoc = await getDoc(tweetRef);
        if (tweetDoc.exists()) {
          const existingComments = tweetDoc.data().comments || [];
          const updatedComments = [...existingComments, newComments[tweetId]];
          await updateDoc(tweetRef, {
            comments: updatedComments,
          });
        }
      } catch (error) {
        console.error('Error al agregar comentario:', error);
      }

      // Limpiar el campo de nuevo comentario
      setNewComments({ ...newComments, [tweetId]: '' });
    }
  };

  const formatDate = (timestamp) => {
    if (timestamp instanceof Timestamp) {
      const date = timestamp.toDate();
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      return 'Fecha desconocida';
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', borderWidth: 1, borderColor: 'gray' }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Home</Text>
        <View style={{ marginBottom: 8, flexDirection: 'row' }}>
          <View style={{ width: '12.5%' }}>
            <Image source={PersonaLogo} style={{ width: 48, height: 48, borderRadius: 24 }} />
          </View>
          <View style={{ width: '78.5%', marginLeft: 15 }}>
            <TextInput
              placeholder="What's happening?"
              value={newTweet}
              onChangeText={(text) => setNewTweet(text)}
              style={{ width: '100%', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'gray' }}
            />
          </View>
        </View>
        <View style={{ justifyContent: 'flex-end', marginTop: 8 }}>
          <Button title="Tweet" onPress={handleAddTweet} color="#007aff" style={styles.button} />
        </View>
      </View>
      <View>
        {tweets.map((tweet) => (
          <View key={tweet.id} style={{ backgroundColor: 'white', borderRadius: 8, padding: 16, borderWidth: 1, borderColor: 'gray', marginBottom: 8 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={PersonaLogo} style={{ width: 48, height: 48, borderRadius: 24 }} />
              <View style={{ marginLeft: 16 }}>
                <Text style={{ fontWeight: 'bold' }}>Michell Giraldo</Text>
                <Text style={{ color: 'gray' }}>{formatDate(tweet.timestamp)}</Text>
              </View>
            </View>
            <Text style={{ marginTop: 16 }}>{tweet.text}</Text>
            <View style={{ marginTop: 16 }}>
              {tweet.comments && tweet.comments.map((comment, index) => (
                <Text key={index}>{comment}</Text>
              ))}
            </View>
            <View style={{ flexDirection: 'row', marginTop: 16, borderRadius: 10 }}>
              <TextInput
                placeholder="Add a comment"
                value={newComments[tweet.id] || ''}
                onChangeText={(text) => setNewComments({ ...newComments, [tweet.id]: text })}
                style={{ flex: 1, padding: 6, borderWidth: 1, borderColor: 'gray', borderRadius: 10, marginRight: 8 }}
              />
              <Button title="Add Comment" onPress={() => handleAddComment(tweet.id)} color="#007aff" style={styles.button} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
  },
});

export default Content;








