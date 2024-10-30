// components/StaticDocument.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';

Font.register({ family: 'Lato', src: '/fonts/latoRegular.ttf', fontStyle: 'normal', fontWeight: 'normal' });
Font.register({ family: 'Lato', src: '/fonts/latoBold.ttf', fontStyle: 'normal', fontWeight: 'bold' });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 32,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  content: {
    fontSize: 12,
  },

  header: {
    fontSize: 12,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    color: 'black',
    border: '1px solid black',
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'black',
    height: 56,
    width: 110,
    borderRight: '1px solid black',
  },

  identify: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    color: 'black',
    height: 56,
    width: 110,
    borderLeft: '1px solid black',
  },

  identifyTitle: {
    fontWeight: 'bold',
    fontSize: 12,
    
  },
  identifyContent: {
    fontSize: 11,
  },
  
  
});

const StaticDocument = () => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      <View style={styles.header}>
        <Image src={'/pdf_logo.png'} style={styles.logo}></Image>
        <Text>Relatório de Avaliação Técnica de Medidor</Text>
        <View style={styles.identify}>
          <Text style={styles.identifyTitle}>RATM N°</Text>
          <Text style={styles.identifyContent}>7717_2024</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default StaticDocument;
