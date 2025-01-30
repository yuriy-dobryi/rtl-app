// Use List.Accordion for unique expandable items with separate behavior

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

const ListAccordion = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="Accordions">
      <List.Accordion
        title="Uncontrolled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}>
        <List.Item
          title="First item"
          description={LOREM_TEXT}
          descriptionNumberOfLines={20}
          style={styles.item}
        />
        <List.Item title="Second item" style={styles.item} />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" style={styles.item} />
        <List.Item
          title="Second item"
          description={LOREM_TEXT}
          descriptionNumberOfLines={20}
          style={styles.item}
        />
      </List.Accordion>
    </List.Section>
  );
};

export default ListAccordion;

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
  },
});

const LOREM_TEXT = `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.`;
