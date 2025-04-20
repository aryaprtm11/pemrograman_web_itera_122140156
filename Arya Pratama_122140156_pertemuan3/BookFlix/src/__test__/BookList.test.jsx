import { render, screen } from '@testing-library/react';
import { BookContext } from '../context/BookContext';
import BookList from '../components/BookList/BookList';

test('menampilkan pesan jika buku kosong', () => {
  render(
    <BookContext.Provider value={{ books: [], filter: 'all', search: '' }}>
      <BookList />
    </BookContext.Provider>
  );
  expect(screen.getByText(/belum ada buku/i)).toBeInTheDocument();
});

test('menampilkan buku jika ada data', () => {
  const dummyBook = {
    id: '1',
    title: 'Test Book',
    author: 'Penulis',
    status: 'milik',
  };

  render(
    <BookContext.Provider value={{ books: [dummyBook], filter: 'all', search: '' }}>
      <BookList />
    </BookContext.Provider>
  );
  expect(screen.getByText(/Test Book/i)).toBeInTheDocument();
});