import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';

interface BookDetailsProps {
  route: {
    params: {
      title: string;
      author: string;
      description: string;
      image: any;
      publicationYear: number;
      genre: string;
      genres: Array<string>;
    };
  };
}

const BookDetails: React.FC<BookDetailsProps> = ({route}) => {
  const {title, author, description, image, publicationYear, genres} =
    route.params;

  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled={true}>
      <Image source={{uri: image}} style={styles.image} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>By {author}</Text>

      <View style={{flexDirection: 'row'}}>
        <Text style={styles.publicationYear}>{'Publish Year :-  '}</Text>
        <Text style={styles.author}> {publicationYear}</Text>
      </View>
      <Text style={styles.genres}>{'genres'}</Text>


      <Text style={styles.description}>{genres}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 300,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  genres: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  publicationYear: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
});

export default BookDetails;
