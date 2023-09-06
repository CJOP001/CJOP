import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Color, Border } from "../GlobalStyles";

type IOSBottomBar5TabsType = {
  showHomeIndicator?: boolean;
  showTabs?: boolean;

  /** Style props */
  iOSBottomBar5TabsPosition?: string;
  iOSBottomBar5TabsWidth?: number | string;
  iOSBottomBar5TabsHeight?: number | string;
  iOSBottomBar5TabsTop?: number | string;
  iOSBottomBar5TabsRight?: number | string;
  iOSBottomBar5TabsBottom?: number | string;
  iOSBottomBar5TabsLeft?: number | string;
  iPhoneUIBottom?: number | string;
  homeIndicatorMarginLeft?: number | string;
  tabsMarginLeft?: number | string;
  tabsWidth?: number | string;
  rectangleViewMarginLeft?: number | string;
  rectangleViewMarginLeft1?: number | string;
  rectangleViewMarginLeft2?: number | string;
  rectangleViewMarginLeft3?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const IOSBottomBar5Tabs = ({
  showHomeIndicator,
  showTabs,
  iOSBottomBar5TabsPosition,
  iOSBottomBar5TabsWidth,
  iOSBottomBar5TabsHeight,
  iOSBottomBar5TabsTop,
  iOSBottomBar5TabsRight,
  iOSBottomBar5TabsBottom,
  iOSBottomBar5TabsLeft,
  iPhoneUIBottom,
  homeIndicatorMarginLeft,
  tabsMarginLeft,
  tabsWidth,
  rectangleViewMarginLeft,
  rectangleViewMarginLeft1,
  rectangleViewMarginLeft2,
  rectangleViewMarginLeft3,
}: IOSBottomBar5TabsType) => {
  const iOSBottomBar5TabsStyle = useMemo(() => {
    return {
      ...getStyleValue("position", iOSBottomBar5TabsPosition),
      ...getStyleValue("width", iOSBottomBar5TabsWidth),
      ...getStyleValue("height", iOSBottomBar5TabsHeight),
      ...getStyleValue("top", iOSBottomBar5TabsTop),
      ...getStyleValue("right", iOSBottomBar5TabsRight),
      ...getStyleValue("bottom", iOSBottomBar5TabsBottom),
      ...getStyleValue("left", iOSBottomBar5TabsLeft),
    };
  }, [
    iOSBottomBar5TabsPosition,
    iOSBottomBar5TabsWidth,
    iOSBottomBar5TabsHeight,
    iOSBottomBar5TabsTop,
    iOSBottomBar5TabsRight,
    iOSBottomBar5TabsBottom,
    iOSBottomBar5TabsLeft,
  ]);

  const iPhoneUIStyle = useMemo(() => {
    return {
      ...getStyleValue("bottom", iPhoneUIBottom),
    };
  }, [iPhoneUIBottom]);

  const homeIndicatorStyle = useMemo(() => {
    return {
      ...getStyleValue("marginLeft", homeIndicatorMarginLeft),
    };
  }, [homeIndicatorMarginLeft]);

  const tabsStyle = useMemo(() => {
    return {
      ...getStyleValue("marginLeft", tabsMarginLeft),
      ...getStyleValue("width", tabsWidth),
    };
  }, [tabsMarginLeft, tabsWidth]);

  const rectangleViewStyle = useMemo(() => {
    return {
      ...getStyleValue("marginLeft", rectangleViewMarginLeft),
    };
  }, [rectangleViewMarginLeft]);

  const rectangleView1Style = useMemo(() => {
    return {
      ...getStyleValue("marginLeft", rectangleViewMarginLeft1),
    };
  }, [rectangleViewMarginLeft1]);

  const rectangleView2Style = useMemo(() => {
    return {
      ...getStyleValue("marginLeft", rectangleViewMarginLeft2),
    };
  }, [rectangleViewMarginLeft2]);

  const rectangleView3Style = useMemo(() => {
    return {
      ...getStyleValue("marginLeft", rectangleViewMarginLeft3),
    };
  }, [rectangleViewMarginLeft3]);

  return (
    <View style={[styles.iosbottomBar5Tabs, iOSBottomBar5TabsStyle]}>
      <View style={[styles.iphoneUi, styles.iphoneUiPosition, iPhoneUIStyle]}>
        <View style={styles.background} />
        {showHomeIndicator && (
          <View style={[styles.homeIndicator, homeIndicatorStyle]}>
            <View style={styles.homeIndicator1} />
          </View>
        )}
      </View>
      {showTabs && (
        <View style={[styles.tabs, tabsStyle]}>
          <View style={[styles.tabsChild, rectangleViewStyle]} />
          <View
            style={[styles.tabsItem, styles.tabsLayout, rectangleView1Style]}
          />
          <View style={[styles.tabsInner, styles.tabsLayout]} />
          <View
            style={[
              styles.rectangleView,
              styles.tabsLayout,
              rectangleView2Style,
            ]}
          />
          <View
            style={[styles.tabsChild1, styles.tabsLayout, rectangleView3Style]}
          />
        </View>
      )}
      <View style={[styles.topDivider, styles.iphoneUiPosition]} />
    </View>
  );
};

const styles = StyleSheet.create({
  iphoneUiPosition: {
    left: 0,
    right: 0,
    top: 1,
    position: "absolute",
  },
  tabsLayout: {
    backgroundColor: Color.gray02,
    width: 32,
    height: 32,
    borderRadius: Border.br_81xl,
    left: "50%",
    top: 0,
    position: "absolute",
  },
  background: {
    backgroundColor: Color.gray_100,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
  },
  homeIndicator1: {
    marginLeft: -67,
    backgroundColor: Color.black,
    borderRadius: Border.br_81xl,
    height: 5,
    width: 134,
    left: "50%",
    bottom: 0,
    position: "absolute",
  },
  homeIndicator: {
    marginLeft: -67.5,
    bottom: 9,
    height: 5,
    width: 134,
    left: "50%",
    position: "absolute",
  },
  iphoneUi: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 1,
    position: "absolute",
  },
  tabsChild: {
    marginLeft: -160,
    backgroundColor: Color.greenPrimary,
    width: 32,
    height: 32,
    borderRadius: Border.br_81xl,
    left: "50%",
    top: 0,
    position: "absolute",
  },
  tabsItem: {
    marginLeft: -88,
  },
  tabsInner: {
    marginLeft: -16,
  },
  rectangleView: {
    marginLeft: 56,
  },
  tabsChild1: {
    marginLeft: 128,
  },
  tabs: {
    marginLeft: -161.5,
    top: 15,
    width: 320,
    height: 32,
    left: "50%",
    position: "absolute",
  },
  topDivider: {
    backgroundColor: Color.silver,
    height: 1,
    left: 0,
    right: 0,
    top: 1,
    position: "absolute",
  },
  iosbottomBar5Tabs: {
    width: 375,
    height: 84,
  },
});

export default IOSBottomBar5Tabs;