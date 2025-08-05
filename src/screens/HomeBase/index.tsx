import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Chip,
  Divider,
  FAB,
  ProgressBar,
} from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';

import { languageCodeAtom, SupportedLanguageCode } from '~/jotai/localeAtom';
import useChangeLanguage from '~/hooks/useChangeLanguage';
import BannerTransaction from '~/components/Paper/BannerTransaction';
import ThemedText from '~/components/ThemedText';
import Container from '~/components/Container';
import { Collapsible } from '~/components/Collapsible';
import HeaderBar from '~/components/Paper/HeaderBar';
import SvgExample from '~/components/Svg';
import { Colors } from '~/theme';
import useTheme, { type ColorScheme } from '~/hooks/useTheme';
import DataTableExamle from '~/components/Paper/DateTable';
import DialogActions from '~/components/Paper/DialogActions';
import DialogScrollArea from '~/components/Paper/DialogScrollArea';
import DrawerSection from '~/components/Paper/DrawerSection';
import FabGroup from '~/components/Paper/FabGroup';
import HelperTextExample from '~/components/Paper/HelperTextExample';
import ListGroup from '~/components/Paper/ListGroup';
import ListAccordion from '~/components/Paper/ListAccordion';
import DropdownSelector from '~/components/Paper/DropdownSelector';
import ModalExample from '~/components/Paper/ModalExample';
import RadiobuttonGroup from '~/components/Paper/RadiobuttonGroup';
import SearchbarExample from '~/components/Paper/SearchbarExample';
import SegmentedButtonsExample from '~/components/Paper/SegmentedButtonsExample';
import SnackbarExample from '~/components/Paper/SnackbarExample';
import SwitchExample from '~/components/Paper/SwitchExample';
import Input from '~/components/Paper/Input';
import ToggleButtonRow from '~/components/Paper/ToggleButtonRow';
import TooltipExample from '~/components/Paper/TooltipExample';
import AppInput from '~/components/AppInput';

export type SwitchButtonProps = {
  code: SupportedLanguageCode;
  isSelected: boolean;
  onPress: () => void;
};

const SwitchButton = ({ code, isSelected, onPress }: SwitchButtonProps) => {
  const theme = useTheme();
  const styles = styling(theme);

  return (
    <Pressable
      style={[styles.switchBtn, isSelected && { backgroundColor: 'green' }]}
      onPress={onPress}>
      <ThemedText style={styles.switchBtnText}>{code}</ThemedText>
    </Pressable>
  );
};

const HomeBase = () => {
  const { t } = useTranslation();
  const languageCode = useAtomValue(languageCodeAtom);
  const { changeLanguage, isProcessing } = useChangeLanguage();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isCheckboxPressing, setIsCheckboxPressing] = useState(false);
  const [isChipPressing, setIsChipPressing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const theme = useTheme();
  const styles = styling(theme);

  return (
    <Container style={[styles.container]}>
      {isProcessing ? (
        <ActivityIndicator color="black" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <Collapsible title="Language Switcher">
            <View style={styles.switchView}>
              <ThemedText style={styles.welcomeText}>{t('welcome')}</ThemedText>
              <SwitchButton
                code={SupportedLanguageCode.EN}
                isSelected={languageCode === 'en'}
                onPress={() =>
                  changeLanguage({ code: SupportedLanguageCode.EN })
                }
              />
              <SwitchButton
                code={SupportedLanguageCode.DE}
                isSelected={languageCode === 'de'}
                onPress={() =>
                  changeLanguage({ code: SupportedLanguageCode.DE })
                }
              />
              <SwitchButton
                code={SupportedLanguageCode.AR}
                isSelected={languageCode === 'ar'}
                onPress={() =>
                  changeLanguage({
                    code: SupportedLanguageCode.AR,
                    isRtl: true,
                  })
                }
              />
            </View>
          </Collapsible>

          <Collapsible title="Avatar Icon">
            <Avatar.Icon
              size={50}
              icon={'share'}
              color="red"
              style={{ backgroundColor: '#1C325B', alignSelf: 'center' }}
            />
          </Collapsible>

          <Collapsible title="Avatar Text">
            <Avatar.Text
              size={50}
              label={'AT'}
              color="#00CDD1"
              style={{ backgroundColor: '#1C325B', alignSelf: 'center' }}
            />
          </Collapsible>

          <Collapsible title="Badge">
            <View style={styles.badgeView}>
              <Fontisto name="email" size={28} color="#00CDD1" />
              <Badge size={18} style={styles.badgeIcon}>
                4
              </Badge>
            </View>
          </Collapsible>

          <Collapsible title="Banner Transaction">
            <BannerTransaction />
          </Collapsible>

          <Collapsible title="Appbar">
            <HeaderBar />
          </Collapsible>

          <Collapsible title="SVG">
            <SvgExample />
          </Collapsible>

          <Collapsible title="Button">
            <Button
              icon="clock"
              loading
              mode="contained-tonal"
              uppercase
              onPress={() => console.log('Pressed')}>
              Press me
            </Button>
          </Collapsible>

          <Collapsible title="Checkbox">
            <Pressable
              onPress={() => setIsCheckboxChecked(!isCheckboxChecked)}
              onPressIn={() => setIsCheckboxPressing(true)}
              onPressOut={() => setIsCheckboxPressing(false)}
              style={[
                styles.row,
                styles.checkboxRow,
                isCheckboxPressing && { backgroundColor: 'rgba(0,0,0,.3)' },
              ]}>
              <ThemedText h3>Label</ThemedText>
              <Checkbox.Android
                status={isCheckboxChecked ? 'checked' : 'unchecked'}
                color="#e8def8"
                uncheckedColor="#e8def8"
                pointerEvents="none"
              />
            </Pressable>
          </Collapsible>

          <Collapsible title="Chip">
            <Chip
              selected={true}
              showSelectedCheck
              icon="share"
              closeIcon={() => (
                <AntDesign name="close" size={18} color="black" />
              )}
              onPress={() => null}
              onClose={() => null}
              onPressIn={() => setIsChipPressing(true)}
              onPressOut={() => setIsChipPressing(false)}
              style={[
                styles.chipView,
                isChipPressing && { backgroundColor: '#D3D4D9' },
              ]}
              textStyle={styles.chipText}
              rippleColor="transparent">
              Example Chip
            </Chip>
          </Collapsible>

          <Collapsible title="Data Table">
            <DataTableExamle />
          </Collapsible>

          <Collapsible title="Dialog actions">
            <DialogActions />
          </Collapsible>

          <Collapsible title="Dialog scroll area">
            <DialogScrollArea />
          </Collapsible>

          <Collapsible title="Divider">
            <View style={{ rowGap: 10 }}>
              <View>
                <ThemedText>Lemon</ThemedText>
                <Divider style={styles.divider} />
              </View>
              <View>
                <ThemedText>Mango</ThemedText>
                <Divider style={styles.divider} />
              </View>
              <View>
                <ThemedText>Apple</ThemedText>
                <Divider style={styles.divider} />
              </View>
            </View>
          </Collapsible>

          <Collapsible title="Drawer">
            <DrawerSection />
          </Collapsible>

          <Collapsible title="FAB">
            <FAB
              customSize={48}
              label="plus"
              icon="plus"
              color="green"
              // loading={true}
              onPress={() => console.log('Pressed')}
              mode="elevated"
              uppercase
              style={styles.fab}
            />
          </Collapsible>

          <Collapsible title="FAB Group">
            <FabGroup />
          </Collapsible>

          <Collapsible title="Helper Text">
            <HelperTextExample />
          </Collapsible>

          <Collapsible title="List Group">
            <ListGroup />
          </Collapsible>

          <Collapsible title="List Accordion">
            <ListAccordion />
          </Collapsible>

          <Collapsible title="Menu">
            <DropdownSelector />
          </Collapsible>

          <Collapsible title="Modal">
            <ModalExample />
          </Collapsible>

          <Collapsible title="Progress Bar">
            <ProgressBar
              progress={0.2}
              color="green"
              // indeterminate
            />
          </Collapsible>

          <Collapsible title="Radiobutton Group">
            <RadiobuttonGroup />
          </Collapsible>

          <Collapsible title="Searchbar">
            <SearchbarExample />
          </Collapsible>

          <Collapsible title="Segmented Buttons">
            <SegmentedButtonsExample />
          </Collapsible>

          <Collapsible title="Snackbar">
            <SnackbarExample />
          </Collapsible>

          <Collapsible title="Switch">
            <SwitchExample />
          </Collapsible>

          <Collapsible title="Input">
            <Input />
          </Collapsible>

          <Collapsible title="Toggle Button Group">
            <ToggleButtonRow />
          </Collapsible>

          <Collapsible title="Tooltip">
            <TooltipExample />
          </Collapsible>

          <Collapsible title="App Input">
            <AppInput
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Your password"
              autoCapitalize="none"
              secureTextEntry
              validationMessage={
                !inputValue ? 'This field cannot be empty!' : undefined
              }
              validationMode="onInteract"
            />
          </Collapsible>
        </ScrollView>
      )}
    </Container>
  );
};

export default HomeBase;

const styling = (t: ColorScheme) =>
  StyleSheet.create({
    container: {
      padding: 16,
      paddingTop: 50,
      backgroundColor: Colors[t].screen,
    },
    contentContainer: { rowGap: 16 },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcomeText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'green',
    },
    switchView: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      columnGap: 16,
    },
    switchBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      backgroundColor: '#1C325B',
      borderRadius: 20,
    },
    switchBtnText: {
      color: 'white',
      fontWeight: 'bold',
    },
    badgeView: {
      width: 44,
      height: 40,
      justifyContent: 'flex-end',
      alignSelf: 'center',
    },
    badgeIcon: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    checkboxRow: {
      justifyContent: 'space-between',
      paddingLeft: 18,
      paddingRight: 10,
      borderRadius: 8,
      columnGap: 10,
    },
    chipView: {
      alignSelf: 'flex-start',
      justifyContent: 'center',
      height: 40,
      paddingLeft: 2,
      borderRadius: 12,
    },
    chipText: {
      marginLeft: 10,
      marginRight: 0,
      paddingRight: 8,
    },
    divider: { marginTop: 6 },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: '#FFD7DB',
    },
  });
