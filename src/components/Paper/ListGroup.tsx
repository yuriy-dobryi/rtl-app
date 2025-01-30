// Use List.AccordionGroup to manage multiple items with only one expanded at a time

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

const ListGroup = () => (
  <View style={styles.container}>
    <List.AccordionGroup>
      <List.Accordion
        title="Accordion 1"
        id="1"
        titleStyle={styles.accordionTitle}
        style={styles.accordion}>
        <List.Item title="Item 1" titleStyle={styles.itemTitle} />
      </List.Accordion>
      <List.Accordion
        title="Accordion 2"
        id="2"
        titleStyle={styles.accordionTitle}
        style={styles.accordion}>
        <List.Item title="Item 2" titleStyle={styles.itemTitle} />
      </List.Accordion>
      <View style={styles.wrapper}>
        <Text style={styles.description}>
          List.Accordion can be wrapped because implementation uses
          React.Context.
        </Text>
        <List.Accordion
          title="Accordion 3"
          id="3"
          titleStyle={styles.accordionTitle}
          style={styles.accordion}>
          <List.Item title="Item 3" titleStyle={styles.itemTitle} />
        </List.Accordion>
      </View>
    </List.AccordionGroup>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  accordion: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  itemTitle: {
    fontSize: 14,
    color: '#555555',
  },
  wrapper: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  description: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default ListGroup;
