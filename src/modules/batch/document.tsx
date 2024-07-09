"use client";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { BookType } from "@/schema";
import { batchTypeString } from "./batchType";
import { styles } from "./documentStyles";
import { User } from "..";
import { formatDate } from "@/lib";

export function ReportDocument(props: ReportDocumentProps) {
  const { books, type } = props;


  return (
    <Document style={styles.document}>
      <Page size="A4" wrap={false} style={styles.page}>
        <View style={styles.container}>
          <View style={styles.headerSection}>
            <Text style={styles.title}>Notice Book register</Text>
            <Text style={styles.pageNumber}>Page number</Text>
            {/* <Text style={styles.logo}>AS Fines</Text> */}
          </View>

          <View style={styles.reportInfo}>
            <Text style={styles.reportInfoTitle}>Selection Criteria</Text>
            <View style={styles.reportInfoSection}>
              <View style={styles.reportInfoSubSection}>
                <View style={styles.reportInfoSubSectionGroup}>
                  <Text style={styles.reportInfoSubSectionItem}>
                    Printing option
                  </Text>
                  <Text style={styles.reportInfoSubSectionItem}>:{type}</Text>
                </View>

                <View style={styles.reportInfoSubSectionGroup}>
                  <Text style={styles.reportInfoSubSectionItem}>
                    First book notice no
                  </Text>
                  <Text style={styles.reportInfoSubSectionItem}>
                    :{books[0].firstNotice}
                  </Text>
                </View>
              </View>
              <View style={styles.reportInfoSubSection}>
                <View style={styles.reportInfoSubSectionGroup}>
                  <Text style={styles.reportInfoSubSectionItem}>Book type</Text>
                  <Text style={styles.reportInfoSubSectionItem}>
                    :{batchTypeString(books[0].bookType)}
                  </Text>
                </View>

                <View style={styles.reportInfoSubSectionGroup}>
                  <Text style={styles.reportInfoSubSectionItem}>
                    Last Book Notice n0
                  </Text>
                  <Text style={styles.reportInfoSubSectionItem}>
                    :{books[books.length - 1].lastNotice}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.reportInfoSection}>
              <View style={styles.reportInfoSubSectionGroup}>
                <Text style={styles.reportInfoSubSectionItem}>Notice type</Text>
                <Text style={styles.reportInfoSubSectionItem}>
                  :{books[0].bookType}
                </Text>
              </View>
              <View style={styles.reportInfoSubSectionGroup}>
                <Text style={styles.reportInfoSubSectionItem}>
                  First notice no
                </Text>
                <Text style={styles.reportInfoSubSectionItem}>
                  :{books[0].firstNotice}
                </Text>
              </View>
            </View>
          </View>

          {type === "First Print" ? (
            <InitialReport books={books} />
          ) : (
            <LatestUpdate books={books} />
          )}
        </View>
      </Page>
    </Document>
  );
}

function InitialReport(props: InitialReportProps) {
  const { books } = props;

  return (
    <View style={styles.books}>
      {books &&
        books.map((book) => (
          <View key={book.bookNumber} style={styles.book}>
            <View style={styles.bookLeftSection}>
              <View style={styles.bookSectionTop}>
                <View style={styles.bookSectionTopRow}>
                  <View style={styles.bookSectionTopRowKey}>
                    <Text style={styles.keyText}>Notice book type:</Text>
                  </View>
                  <View style={styles.bookSectionTopRowValue}>
                    <Text style={styles.valueText}>{book.bookType}</Text>
                  </View>
                </View>
                <View style={styles.bookSectionTopRow}>
                  <View style={styles.bookSectionTopRowKey}>
                    <Text style={styles.keyText}>Book no:</Text>
                  </View>
                  <View style={styles.bookSectionTopRowValue}>
                    <Text style={styles.valueText}>{book.bookNumber}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.bookSectionBottom}>
                <View style={styles.bookSectionBottomColumn}>
                  <View style={styles.bookSectionBottomColumnKey}>
                    <Text style={styles.keyText}>Officer:</Text>
                  </View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                </View>
                <View style={styles.bookSectionBottomColumn}>
                  <View style={styles.bookSectionBottomColumnKey}>
                    <Text style={styles.keyText}>Isues date:</Text>
                  </View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                </View>
                <View style={styles.bookSectionBottomColumnLast}>
                  <View style={styles.bookSectionBottomColumnKey}>
                    <Text style={styles.keyText}>Sigh: Issue</Text>
                  </View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                </View>
              </View>
            </View>
            <View style={styles.bookRightSection}>
              <View style={styles.bookSectionTop}>
                <View style={styles.bookSectionTopRow}>
                  <View style={styles.bookSectionTopRowKey}>
                    <Text style={styles.keyText}>First notice number:</Text>
                  </View>
                  <View style={styles.bookSectionTopRowValue}>
                    <Text style={styles.valueText}>{book.firstNotice}</Text>
                  </View>
                </View>
                <View style={styles.bookSectionTopRow}>
                  <View style={styles.bookSectionTopRowKey}>
                    <Text style={styles.keyText}>Last notice number:</Text>
                  </View>
                  <View style={styles.bookSectionTopRowValue}>
                    <Text style={styles.valueText}>{book.lastNotice}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.bookSectionBottom}>
                <View style={styles.bookSectionBottomColumn}>
                  <View style={styles.bookSectionBottomColumnKey}>
                    <Text style={styles.keyText}>Official:</Text>
                  </View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                </View>
                <View style={styles.bookSectionBottomColumn}>
                  <View style={styles.bookSectionBottomColumnKey}>
                    <Text style={styles.keyText}>Hand in date:</Text>
                  </View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                </View>
                <View style={styles.bookSectionBottomColumn}>
                  <View style={styles.bookSectionBottomColumnKey}>
                    <Text style={styles.keyText}>Last notice <br /> used</Text>
                  </View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                </View>
                <View style={styles.bookSectionBottomColumnLast}>
                  <View style={styles.bookSectionBottomColumnKey}>
                    <Text style={styles.keyText}>Sigh: Hand in</Text>
                  </View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                </View>
              </View>
            </View>
          </View>
        ))}
    </View>
  );
}

function LatestUpdate(props: LatestUpdateProps) {
  const { books } = props;
    
  return (
    <View style={styles.books}>
      {books &&
        books.map((book) => (
          <View key={book.bookNumber} style={styles.book}>
            <View style={styles.bookLeftSection}>
              <View style={styles.bookSectionTop}>
                <View style={styles.bookSectionTopRow}>
                  <View style={styles.bookSectionTopRowKey}>
                    <Text style={styles.keyText}>Notice book type:</Text>
                  </View>
                  <View style={styles.bookSectionTopRowValue}>
                    <Text style={styles.valueText}>{book.bookType}</Text>
                  </View>
                </View>
                <View style={styles.bookSectionTopRow}>
                  <View style={styles.bookSectionTopRowKey}>
                    <Text style={styles.keyText}>Book no:</Text>
                  </View>
                  <View style={styles.bookSectionTopRowValue}>
                    <Text style={styles.valueText}>{book.bookNumber}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.bookSectionBottom}>
                <View style={styles.bookSectionBottomColumn}>
                  <View style={styles.bookSectionBottomColumnKey}>
                    <Text style={styles.keyText}>Officer:</Text>
                  </View>
                  <View style={styles.bookSectionBottomColumnValue}>
                    <Text style={styles.valueText}>{book.officerId && <User userId={book.officerId} type="document"/>}</Text>
                  </View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                </View>
                <View style={styles.bookSectionBottomColumn}>
                  <View style={styles.bookSectionBottomColumnKey}>
                    <Text style={styles.keyText}>Isues date:</Text>
                  </View>
                  <View style={styles.bookSectionBottomColumnValue}>
                    <Text style={styles.valueText} >{book.status !== "New_Stock" && book?.date && formatDate(book?.date.toISOString())}</Text>
                  </View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                </View>
                <View style={styles.bookSectionBottomColumnLast}>
                  <View style={styles.bookSectionBottomColumnKey}>
                    <Text style={styles.keyText}>Sigh: Issue</Text>
                  </View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                </View>
              </View>
            </View>
            <View style={styles.bookRightSection}>
              <View style={styles.bookSectionTop}>
                <View style={styles.bookSectionTopRow}>
                  <View style={styles.bookSectionTopRowKey}>
                    <Text style={styles.keyText}>First notice number:</Text>
                  </View>
                  <View style={styles.bookSectionTopRowValue}>
                    <Text style={styles.valueText}>{book.firstNotice}</Text>
                  </View>
                </View>
                <View style={styles.bookSectionTopRow}>
                  <View style={styles.bookSectionTopRowKey}>
                    <Text style={styles.keyText}>Last notice number:</Text>
                  </View>
                  <View style={styles.bookSectionTopRowValue}>
                    <Text style={styles.valueText}>{book.lastNotice}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.bookSectionBottom}>
                <View style={styles.bookSectionBottomColumn}>
                  <View style={styles.bookSectionBottomColumnKey}>
                    <Text style={styles.keyText}>Official:</Text>
                  </View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                </View>
                <View style={styles.bookSectionBottomColumn}>
                  <View style={styles.bookSectionBottomColumnKey}>
                    <Text style={styles.keyText}>Hand in date:</Text>
                  </View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                </View>
                <View style={styles.bookSectionBottomColumn}>
                  <View style={styles.bookSectionBottomColumnKey}>
                    <Text style={styles.keyText}>Last notice <br /> used</Text>
                  </View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                </View>
                <View style={styles.bookSectionBottomColumnLast}>
                  <View style={styles.bookSectionBottomColumnKey}>
                    <Text style={styles.keyText}>Sigh: Hand in</Text>
                  </View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                  <View style={styles.bookSectionBottomColumnValue}></View>
                </View>
              </View>
            </View>
          </View>
        ))}
    </View>
  );
}

type InitialReportProps = {
  books: BookType[];
};

type LatestUpdateProps = {
  books: BookType[];
};

type ReportDocumentProps = {
  type: string;
  books: BookType[];
};
