import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useMiniPlayerVisibility } from '../../navigation/useMiniPlayerVisibility';
import { MINI_PLAYER_HEIGHT, MINI_PLAYER_MARGIN } from '../../constants/layout';

interface PlayerAwareContainerProps extends ViewProps {
  children: React.ReactNode;
}

export const PlayerAwareContainer: React.FC<PlayerAwareContainerProps> = ({
  children,
  style,
  ...props
}) => {
  const { isVisible } = useMiniPlayerVisibility();

  return (
    <View
      style={[
        styles.container,
        style,
        isVisible && styles.withMiniPlayer,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  withMiniPlayer: {
    paddingBottom: MINI_PLAYER_HEIGHT + MINI_PLAYER_MARGIN * 2,
  },
});
