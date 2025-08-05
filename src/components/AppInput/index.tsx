import type { ReactElement } from 'react';
import {
  useState,
  useMemo,
  useEffect,
  forwardRef,
  isValidElement,
  useCallback,
} from 'react';
import type { ColorValue, TextInputProps, ViewStyle } from 'react-native';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { isUndefined, isString, isFunction } from 'lodash';
import { useAtomValue } from 'jotai';

import { CheckMark } from '~/assets/icons';
import { isRtlAtom } from '~/jotai/localeAtom';
import ThemedText from '../ThemedText';
import { FONTS, getFontFamily } from '~/utils/basic';

interface BaseProps extends Pick<TextInputProps, 'value' | 'style'> {
  mode?: 'text' | 'action';
  placeholder?: string | (() => ReactElement);
  validationMode?: 'onBlur' | 'onInteract' | 'none';
  withCheckMark?: boolean;
  validationMessage?: string;
  optional?: boolean;
  interacted?: boolean;
  placeholderTextColor?: ColorValue;
  borderColor?: ColorValue;
  containerStyle?: ViewStyle | ViewStyle[];
}

interface TextModeProps
  extends BaseProps,
    Omit<
      TextInputProps,
      'placeholder' | 'placeholderTextColor' | 'style' | 'onPress'
    > {
  mode?: 'text';
  onPress?: never;
}

interface ActionModeProps
  extends BaseProps,
    Omit<
      TextInputProps,
      'placeholder' | 'placeholderTextColor' | 'style' | 'onPress'
    > {
  mode: 'action';
  onPress?: () => void;
  onChangeText?: never;
  onFocus?: never;
  onBlur?: never;
}

type Props = TextModeProps | ActionModeProps;

// constants
export const INPUT_BG_COLOR = 'rgba(49, 114, 172, 0.2)';
export const INPUT_BORDER_COLOR = 'rgba(255, 255, 255, 0.3)';
export const PLACEHOLDER_COLOR = '#B6C2FF';
export const REQUIRED_COLOR = '#FF5EB1';
export const ERROR_COLOR = '#FB8484';

const AppInput = forwardRef<TextInput, Props>((props, ref) => {
  const {
    mode = 'text',
    value,
    onChangeText,
    onFocus,
    onBlur,
    placeholder,
    validationMode = 'onBlur',
    withCheckMark = false,
    validationMessage,
    optional = !validationMessage,
    containerStyle,
    style,
    ...rest
  } = props;

  const isRTL = useAtomValue(isRtlAtom);
  const [focused, setFocused] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);

  const fontFamily = useMemo(
    () => getFontFamily(style) || FONTS.normal,
    [style],
  );

  const showError = useMemo(() => {
    if (validationMessage && !focused && isInteracted && !optional) {
      return true;
    }
    if (
      validationMessage &&
      focused &&
      isInteracted &&
      validationMode === 'onInteract'
    ) {
      return true;
    }
    return false;
  }, [validationMessage, focused, isInteracted, optional, validationMode]);

  const borderColor = useMemo(() => {
    if (validationMode === 'none') {
      return props.borderColor || 'transparent';
    }
    if (showError) {
      return ERROR_COLOR;
    }
    if (focused) {
      return '#4688EF';
    }
    if (!isInteracted || (optional && !value)) {
      return INPUT_BORDER_COLOR;
    }
    return '#5F47FF';
  }, [
    validationMode,
    showError,
    focused,
    isInteracted,
    optional,
    value,
    props.borderColor,
  ]);

  const placeholderColor = useMemo(() => {
    if (showError) {
      return ERROR_COLOR;
    }
    return props.placeholderTextColor || '#9EB2ED';
  }, [showError, props.placeholderTextColor]);

  const onPress = useCallback(() => {
    if (isUndefined(props.interacted)) setIsInteracted(true);
    if (mode === 'action' && 'onPress' in props) {
      props.onPress?.();
    }
  }, [props, mode]);

  const renderPlaceholder = useMemo(() => {
    if (isFunction(placeholder)) {
      const element = placeholder();
      return isValidElement(element) ? element : null;
    }
    return null;
  }, [placeholder]);

  useEffect(() => {
    if (!isUndefined(props.interacted)) setIsInteracted(props.interacted);
  }, [props.interacted]);

  return (
    <TouchableOpacity
      style={[containerStyle]}
      onPress={mode === 'action' ? onPress : undefined}
      activeOpacity={mode === 'action' ? 0.5 : 1}>
      {withCheckMark && !showError && value && (
        <View style={styles.checkMark}>
          <CheckMark width={moderateScale(7)} height={moderateScale(6)} />
        </View>
      )}

      <View style={[styles.contentView, { borderColor }, style]}>
        {mode === 'text' && (
          <TextInput
            ref={ref}
            value={value}
            autoCorrect={false}
            textAlign={isRTL ? 'right' : 'left'}
            placeholder={isString(placeholder) ? placeholder : undefined}
            placeholderTextColor={placeholderColor}
            onChangeText={e => {
              console.log('onChangeText');
              if (validationMode === 'onInteract') setIsInteracted(true);
              onChangeText?.(e);
            }}
            onFocus={e => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={e => {
              setFocused(false);
              setIsInteracted(true);
              onBlur?.(e);
            }}
            style={[styles.input, { fontFamily }]}
            {...rest}
          />
        )}
        <View style={styles.textView}>
          {mode === 'action' && (value || isString(placeholder)) && (
            <ThemedText
              style={{ color: value ? '#FFF' : placeholderColor, fontFamily }}>
              {value || (isString(placeholder) ? placeholder : undefined)}
            </ThemedText>
          )}
          {!value && isFunction(placeholder) && renderPlaceholder}
        </View>
      </View>

      {showError && (
        <ThemedText style={styles.validationText}>
          {validationMessage}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
});

export default AppInput;

const styles = StyleSheet.create({
  contentView: {
    height: moderateScale(50),
    backgroundColor: '#2A2565',
    borderWidth: 1,
    borderRadius: moderateScale(8),
  },
  input: {
    flex: 1,
    paddingHorizontal: moderateScale(26),
    color: '#FFF',
    fontSize: 16,
  },
  textView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(26),
    pointerEvents: 'none',
  },
  validationText: {
    fontSize: 12,
    color: ERROR_COLOR,
    marginTop: moderateScale(5),
  },
  checkMark: {
    width: moderateScale(14),
    height: moderateScale(14),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(7),
    backgroundColor: 'rgba(70, 136, 239, 1)',
    position: 'absolute',
    top: -6,
    right: 15,
    zIndex: 10,
  },
});
