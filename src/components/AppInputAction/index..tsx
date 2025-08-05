import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  isValidElement,
} from 'react';
import type { ColorValue, ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { isFunction, isString, isUndefined } from 'lodash';

import { CheckMark } from '~/assets/icons';
import { fontWeightsConfig, getFontWeight } from '~/utils/basic';
import { ERROR_COLOR, INPUT_BORDER_COLOR } from '../AppInput';
import ThemedText from '../ThemedText';

type Props = {
  value?: string;
  placeholder?: string | (() => React.ReactElement);
  onPress?: () => void;
  withValidation?: boolean;
  withCheckMark?: boolean;
  validationMessage?: string;
  optional?: boolean;
  interacted?: boolean;
  placeholderTextColor?: string;
  borderColor?: ColorValue;
  containerStyle?: ViewStyle | ViewStyle[];
  style?: ViewStyle | ViewStyle[];
};

const AppInputAction = (props: Props) => {
  const {
    value,
    placeholder,
    withValidation = true,
    withCheckMark = false,
    validationMessage,
    optional = !validationMessage,
    containerStyle,
    style,
  } = props;
  const [isInteracted, setIsInteracted] = useState(false);

  const fontWeight = getFontWeight(style);
  const fontFamily = useMemo(
    // @ts-ignore
    () => fontWeight && fontWeightsConfig[fontWeight],
    [fontWeight],
  );
  const borderColor = useMemo(() => {
    if (!withValidation) {
      return props.borderColor || 'transparent';
    }
    if (!isInteracted || (optional && !value)) {
      return INPUT_BORDER_COLOR;
    }
    if (validationMessage) {
      return ERROR_COLOR;
    }
    return '#5F47FF';
  }, [
    withValidation,
    isInteracted,
    optional,
    value,
    validationMessage,
    props.borderColor,
  ]);

  const placeholderColor = useMemo(() => {
    if (
      withValidation &&
      isInteracted &&
      !optional &&
      (validationMessage || !value)
    ) {
      return ERROR_COLOR;
    }
    return props.placeholderTextColor || '#9EB2ED';
  }, [
    withValidation,
    isInteracted,
    optional,
    validationMessage,
    value,
    props.placeholderTextColor,
  ]);

  const onPress = useCallback(() => {
    isUndefined(props.interacted) && setIsInteracted(true);
    props.onPress?.();
  }, [props.interacted, props.onPress]);

  const renderPlaceholder = useCallback(() => {
    if (isFunction(placeholder)) {
      const element = placeholder();
      return isValidElement(element) ? element : null;
    }
    return null;
  }, [placeholder]);

  useEffect(() => {
    !isUndefined(props.interacted) && setIsInteracted(props.interacted);
  }, [props.interacted]);

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.5}>
      {withValidation && withCheckMark && !validationMessage && value && (
        <View style={styles.checkMark}>
          <CheckMark width={moderateScale(7)} height={moderateScale(6)} />
        </View>
      )}

      <View style={[styles.contentView, { borderColor }, style]}>
        <ThemedText
          style={{
            color: value ? '#FFF' : placeholderColor,
            fontFamily: fontFamily || fontWeightsConfig.normal,
          }}>
          {value || (isString(placeholder) ? placeholder : renderPlaceholder())}
        </ThemedText>
      </View>

      {withValidation && isInteracted && !optional && validationMessage && (
        <ThemedText style={styles.validationText}>
          {validationMessage}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
};

export default AppInputAction;

const styles = StyleSheet.create({
  contentView: {
    height: moderateScale(50),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(26),
    backgroundColor: '#2A2565',
    borderWidth: 1,
    borderRadius: moderateScale(8),
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
