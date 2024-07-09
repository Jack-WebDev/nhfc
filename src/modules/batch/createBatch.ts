import { BookStatus } from "@prisma/client";
import { pages } from "next/dist/build/templates/app-page";

type BatchInfo = {
  firstNotice: number;
  batchType: number;
  numberOfBooks: number;
  pagesPerBook: number;
  batchId: number;
  firstBookNumber: number;
};

type BookType = {
  bookNumber: number;
  batchId: number;
  bookType: number;
  firstNotice: number;
  lastNotice: number;
  total: number;
  complete: number;
  officerId: string | undefined;
  status: BookStatus,
  date: Date | undefined,
};

 type BatchType = {
  books: BookType[];
};

function createBooks(batchInfo: BatchInfo) {
  const {
    firstNotice,
    numberOfBooks,
    pagesPerBook,
    batchType,
    batchId,
    firstBookNumber,
  } = batchInfo;
  let books: BookType[] = [];
  let i = 0;
  while (i < numberOfBooks) {
    const newFirstNotice = firstNotice + i * pagesPerBook;
    const newLastNotice = newFirstNotice + pagesPerBook - 1;
    const bookNumber = firstBookNumber + i;

    const book = {
      bookNumber: bookNumber,
      batchId: batchId,
      bookType: batchType,
      firstNotice: newFirstNotice,
      lastNotice: newLastNotice,
      total: pagesPerBook,
      complete: 0,
      officerId: undefined,
      status: BookStatus.New_Stock,
      date: undefined
    };

    books.push(book);

    i++;
  }

  return books;
}

type PageType = {
  bookNumber: number;
  noticeNumber: number;
  check: number;
};

const createPages = (books: BookType[]) => {
  const authCode = 2026;

  let pages: PageType[] = [];

  books.map((book) => {
    let i = 0;
    while (i < book.total) {
      let check = book.firstNotice * 2 + book.bookType + authCode;
      const page = {
        bookNumber: book.bookNumber,
        noticeNumber: book.firstNotice + i,
        check: check + (i - 1) * 2,
      };

      pages.push(page);

      i++;
    }

    return pages;
  });

  return pages;
};

export const createBatch = (batchInfo: BatchInfo) => {
  const books = createBooks(batchInfo);
  const pages = createPages(books);

  return {
    books: books,
    pages: pages,
  };
};


