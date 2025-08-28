import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Sentry from '@sentry/react-native';

import type {
  WebViewErrorEvent,
  WebViewHttpErrorEvent,
} from 'react-native-webview/lib/WebViewTypes';

const WebviewScreen = () => {
  const onError = ({ nativeEvent }: WebViewErrorEvent) => {
    const { description, domain, url } = nativeEvent;
    const code = String(nativeEvent.code);

    Sentry.captureEvent({
      message: description,
      level: 'error',
      exception: {
        values: [
          {
            type: `Webview engine error ● code ${code}`,
            value: Platform.OS === 'ios' ? domain : description,
          },
        ],
      },
      tags: {
        source: 'engine',
        error_code: code,
        error_id: Platform.OS === 'ios' ? domain : description,
        url: url || 'unknown',
      },
    });
  };

  const onHttpError = ({ nativeEvent }: WebViewHttpErrorEvent) => {
    const { statusCode, description, url } = nativeEvent;

    Sentry.captureEvent({
      message: description,
      level: 'error',
      exception: {
        values: [
          {
            type: `Webview server error ● code ${statusCode}`,
            value: description,
          },
        ],
      },
      tags: {
        source: 'server',
        error_code: statusCode,
        url: url || 'unknown',
      },
    });
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'http://httpforever.com/about' }}
        onError={onError}
        onHttpError={onHttpError}
        startInLoadingState
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default WebviewScreen;
