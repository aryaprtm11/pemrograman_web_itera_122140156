import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from '../components/BookForm/BookForm';

test('menampilkan form tambah buku', () => {
  render(<BookForm />);
  expect(screen.getByText(/Tambah Buku/i)).toBeInTheDocument();
});

test('input judul bisa diisi', () => {
  render(<BookForm />);
  const input = screen.getByLabelText(/Judul:/i);
  fireEvent.change(input, { target: { value: 'Harry Potter' } });
  expect(input.value).toBe('Harry Potter');
});

test('validasi error muncul jika judul kosong', () => {
  render(<BookForm />);
  fireEvent.click(screen.getByRole('button', { name: /Tambah Buku/i }));
  expect(screen.getByText(/wajib diisi/i)).toBeInTheDocument();
});