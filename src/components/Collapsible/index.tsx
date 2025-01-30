import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import { Colors } from '~/theme';
import ThemedText from '../ThemedText';
import ThemedView from '../ThemedView';

type Props = {
  title: string;
  onOpen?: () => void;
  onClose?: () => void;
};

export function Collapsible({
  children,
  title,
  onOpen,
  onClose,
}: PropsWithChildren & Props) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => {
          setIsOpen(value => !value);
          if (isOpen) onClose?.();
          else onOpen?.();
        }}
        activeOpacity={0.8}>
        <Entypo
          name="chevron-right"
          size={36}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />
        <ThemedText h2 tPrimary>
          {title}
        </ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
