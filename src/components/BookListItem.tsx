// import {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
// } from 'react-native-reanimated';
import React, {useEffect, useState} from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

interface BookListItemProps {
  book: Book;
}

interface Book {
  id: string;
  title: string;
  authors: string;
  coverImageUrl: any;
  genres: string;
  publicationYear: string;
}

const BookListItem: React.FC<BookListItemProps> = ({book}) => {
  const [liked, setLiked] = useState(false);

  let navigation = useNavigation();

  // const opacity = useSharedValue(0);

  // useEffect(() => {
  //   opacity.value = withTiming(1, {duration: 500});
  // }, []);

  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     opacity: opacity.value,
  //   };
  // });

  useEffect(() => {
    const getLikeStatus = async () => {
      const storedLikeStatus = await AsyncStorage.getItem(`liked-${book.id}`);
      setLiked(storedLikeStatus === 'true');
    };

    getLikeStatus();
  }, [book.id]);

  const toggleLike = async () => {
    const newLikeStatus = !liked;
    setLiked(newLikeStatus);
    await AsyncStorage.setItem(`liked-${book.id}`, String(newLikeStatus));
  };

  const onPress = (data: any) => {
    console.log('🚀 ~ onPress ~ data:', data);
    navigation.navigate('BookDetails', {
      title: data.title,
      author: data.authors,
      description: data.title,
      image: data.coverImageUrl,
      publicationYear: data.publicationYear,
      genres: data.genres,
    });
  };

  return (
    <TouchableOpacity style={[styles.container]} onPress={() => onPress(book)}>
      <Image source={{uri: book.coverImageUrl}} style={styles.coverImage} />
      <View style={styles.details}>
        <Text style={styles.title}>{book?.title}</Text>
        <Text style={styles.author}>{book?.authors}</Text>
        <Text style={styles.genre}>{book?.genres[0]}</Text>
      </View>
      <TouchableOpacity
        onPress={toggleLike}
        style={liked ? styles.liked : styles.unliked}>
        <Text>{liked ? 'Unlike' : 'Like'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default BookListItem;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  coverImage: {
    width: 50,
    height: 70,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  genre: {
    fontSize: 14,
    color: '#666',
  },
  liked: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  unliked: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
});
