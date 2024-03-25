const API_BASE_URL = 'https://openlibrary.org';

export const fetchBooks = async (query: string): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search.json?q=${query}`);
    const data = await response.json();
    return data.docs.map((book: any) => ({
      title: book.title,
      author: book.author_name?.join(', ') || 'Unknown',
      coverImageUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
      genre: book.subject?.join(', ') || 'Unknown',
      publicationYear: book.first_publish_year || 'Unknown',
      description: book.description?.[0] || 'No description available',
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

export const fetchSciFiBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/subjects/sci-fi.json?details=true`,
    );
    const data = await response.json();
    const books: Book[] = data.works.map((work: any) => ({
      ...work,
      title: work.title,
      authors: work.authors.map((author: any) => author.name).join(', '),
      coverImageUrl: `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`,
      genres: work.subject,
      publicationYear: work.first_publish_year || 0,
      description: work.description?.[0] || 'No description available',

    }));
    return books;
  } catch (error) {
    console.error('Error fetching sci-fi books:', error);
    return [];
  }
};

export interface Book {
  title: string;
  author: string;
  coverImageUrl: string;
  genre: string;
  publicationYear: string;
  description: string;
}
