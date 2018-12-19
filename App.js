import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  Text,
  NativeModules,
  findNodeHandle
} from "react-native";

export default class App extends React.Component {
  state = {
    items: Array.apply(null, { length: 20 }).map((value, index) => ({
      id: index + 1,
      active: index === 19
    }))
  };

  handleScrollToCenter = () => {
    if (this.containerRef && this.activeRef) {
      const UIManager = NativeModules.UIManager;
      UIManager.measure(
        findNodeHandle(this.activeRef),
        (activeX, activeY, activeW, activeH) => {
          this.containerRef.scrollTo({ x: 0, y: activeY, animated: true });
        }
      );
    }
  };

  render() {
    return (
      <ScrollView ref={ref => (this.containerRef = ref)}>
        {this.state.items.map(item => (
          <View
            key={item.id}
            ref={ref => {
              if (item.active) {
                this.activeRef = ref;
              }
            }}
            style={StyleSheet.flatten([
              styles.item,
              item.active && styles.active
            ])}
          >
            <Text>{item.id}</Text>
          </View>
        ))}
        <Button onPress={this.handleScrollToCenter} title="Scroll, please" />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 100,
    backgroundColor: "rgba(0, 255, 0, 0.1)",
    justifyContent: "center"
  },
  active: {
    backgroundColor: "rgba(255, 0, 0, 0.4)"
  }
});
