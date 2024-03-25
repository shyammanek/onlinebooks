import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import BookListItem from '../BookListItem';
import {Book, fetchBooks, fetchSciFiBooks} from '../../services/api';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const fetchBooksAll = async () => {
    const fetchedBooks = await fetchSciFiBooks();
    console.log("🚀 ~ fetchBooksAll ~ fetchedBooks:", fetchedBooks)
    setLoading(false);
    setBooks(fetchedBooks);
  };

  useEffect(() => {
    setLoading(true);
    fetchBooksAll();
  }, []);

  useEffect(() => {
    if (books.length <= 0) {
      fetchBooksAll();
    }
  }, []);

  const handleSearch = async (query: string) => {
    const fetchedBooks = await fetchBooks(query);
    setBooks(fetchedBooks);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search books"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => handleSearch(searchQuery)}
      />

      {loading ? (
        <View>
          <ActivityIndicator style={styles.loader} size="large" color="#0000ff" animating={loading} />
            <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={books}
          keyExtractor={item => item.title}
          renderItem={({item}) => <BookListItem book={item} />}
          ListFooterComponent={<View style={{marginBottom: 20}} />}
          ListEmptyComponent={<Text>No books found</Text>}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loader:{
    marginTop: Dimensions.get('window').height / 2 - 50,
  }
});

export default HomeScreen;
