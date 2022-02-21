import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Books from './pages/books/books'
import Book from './pages/book/book'
import BookCreate from './pages/bookCreate/bookCreate'
import BookUpdate from './pages/bookUpdate/bookUpdate'
import Catalog from './pages/catalog/catalog'
import Authors from './pages/authors/authors'
import Author from './pages/author/author'
import AuthorCreate from './pages/authorCreate/authorCreate'
import AuthorUpdate from './pages/authorUpdate/authorUpdate'
import Genres from './pages/genres/genres'
import Genre from './pages/genre/genre'
import GenreCreate from './pages/genreCreate/genreCreate'
import GenreUpdate from './pages/genreUpdate/genreUpdate'
import BookInstances from './pages/bookInstances/bookInstances'
import BookInstance from './pages/bookInstance/bookInstance'
import BookInstanceCreate from './pages/bookInstanceCreate/bookInstanceCreate'
import BookInstanceUpdate from './pages/bookInstanceUpdate/bookInstanceUpdate'
import Registration from './pages/registration/registration'
import Login from './pages/login/login'
import ErrorPage404 from './pages/404/404'
import Profile from './pages/profile/profile'
import Admin from './pages/admin/admin'
import { Context } from './index'
import { roles } from './config/config'
import Lend from './pages/lend/lend'

const UseRoutes = () => {
    const { store } = useContext(Context);
    if (store.isAuth) {
        if (store.user.role === roles.viewer) {
            return (
                <Routes>
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/' element={<Catalog />} />
                    <Route path='/catalog' element={<Catalog />} />
                    <Route path='/catalog/books' element={<Books />} ></Route>
                    <Route path='/catalog/books/:bookId' element={<Book />} />
                    <Route path='/catalog/authors' element={<Authors />} />
                    <Route path='/catalog/authors/:authorId' element={<Author />} />
                    <Route path='/catalog/genres' element={<Genres />} />
                    <Route path='/catalog/genres/:genreId' element={<Genre />} />
                    <Route path='/catalog/bookinstances' element={<BookInstances />} />
                    <Route path='/catalog/bookinstances/:bookinstanceId' element={<BookInstance />} />
                    <Route path='*' element={<ErrorPage404 />} />
                </Routes>
            )
        }
        if (store.user.role === roles.editor) {
            return (
                <Routes>
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/' element={<Catalog />} />
                    <Route path='/catalog' element={<Catalog />} />
                    <Route path='/catalog/books' element={<Books />} ></Route>
                    <Route path='/catalog/books/:bookId' element={<Book />} />
                    <Route path='/catalog/book/create' element={<BookCreate />} />
                    <Route path='/catalog/books/:bookId/update' element={<BookUpdate />} />
                    <Route path='/catalog/authors' element={<Authors />} />
                    <Route path='/catalog/authors/:authorId' element={<Author />} />
                    <Route path='/catalog/author/create' element={<AuthorCreate />} />
                    <Route path='/catalog/authors/:authorId/update' element={<AuthorUpdate />} />
                    <Route path='/catalog/genres' element={<Genres />} />
                    <Route path='/catalog/genres/:genreId' element={<Genre />} />
                    <Route path='/catalog/genre/create' element={<GenreCreate />} />
                    <Route path='/catalog/genres/:genreId/update' element={<GenreUpdate />} />
                    <Route path='/catalog/bookinstances' element={<BookInstances />} />
                    <Route path='/catalog/bookinstances/:bookinstanceId' element={<BookInstance />} />
                    <Route path='/catalog/bookinstance/create' element={<BookInstanceCreate />} />
                    <Route path='/catalog/bookinstances/:bookinstanceId/update' element={<BookInstanceUpdate />} />
                    <Route path='*' element={<ErrorPage404 />} />
                </Routes>
            )
        }
        return (
            <Routes>
                <Route path='/admin' element={<Admin />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/' element={<Catalog />} />
                <Route path='/catalog' element={<Catalog />} />
                <Route path='/catalog/books' element={<Books />} ></Route>
                <Route path='/catalog/books/:bookId' element={<Book />} />
                <Route path='/catalog/book/create' element={<BookCreate />} />
                <Route path='/catalog/books/:bookId/update' element={<BookUpdate />} />
                <Route path='/catalog/authors' element={<Authors />} />
                <Route path='/catalog/authors/:authorId' element={<Author />} />
                <Route path='/catalog/author/create' element={<AuthorCreate />} />
                <Route path='/catalog/authors/:authorId/update' element={<AuthorUpdate />} />
                <Route path='/catalog/genres' element={<Genres />} />
                <Route path='/catalog/genres/:genreId' element={<Genre />} />
                <Route path='/catalog/genre/create' element={<GenreCreate />} />
                <Route path='/catalog/genres/:genreId/update' element={<GenreUpdate />} />
                <Route path='/catalog/bookinstances' element={<BookInstances />} />
                <Route path='/catalog/bookinstances/:bookinstanceId' element={<BookInstance />} />
                <Route path='/catalog/bookinstance/create' element={<BookInstanceCreate />} />
                <Route path='/catalog/bookinstances/:bookinstanceId/update' element={<BookInstanceUpdate />} />
                <Route path='/catalog/bookinstances/:bookinstanceId/lend' element={<Lend />} />
                <Route path='*' element={<ErrorPage404 />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path='/' element={<Catalog />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<ErrorPage404 />} />
        </Routes>
    )
}

export default UseRoutes
