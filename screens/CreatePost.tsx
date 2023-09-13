import * as React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { FontFamily, Color, Border, FontSize, Padding } from "../GlobalStyles";

const CreatePost = () => {
  return (
    <View style={styles.createPost}>
      <View style={[styles.statusBarandroid, styles.iconsFlexBox]}>
        <View style={styles.androidtime}>
          <View style={styles.androidtime}>
            <Text style={[styles.hours, styles.gTypo]}>09</Text>
            <Text style={[styles.hours, styles.gTypo]}>:</Text>
            <Text style={[styles.hours, styles.gTypo]}>30</Text>
            <Text style={styles.text1}>:</Text>
            <Text style={styles.text1}>00</Text>
          </View>
          <Text style={[styles.pm, styles.gTypo]}>PM</Text>
        </View>
        <View style={[styles.icons, styles.iconsFlexBox]}>
          <Image
            style={styles.androidbluetoothIcon}
            resizeMode="cover"
            source={require("../assets/androidbluetooth.png")}
          />
          <Image
            style={styles.androidwifiIcon}
            resizeMode="cover"
            source={require("../assets/androidwifi.png")}
          />
          <View style={styles.androidcellularSignal}>
            <Text style={[styles.g, styles.gTypo]}>5G</Text>
            <Image
              style={[styles.barsIcon, styles.iconLayout2]}
              resizeMode="cover"
              source={require("../assets/bars1.png")}
            />
          </View>
          <View style={styles.androidbattery}>
            <Image
              style={[styles.outlineIcon, styles.iconLayout2]}
              resizeMode="cover"
              source={require("../assets/outline1.png")}
            />
            <View style={styles.indicator} />
          </View>
        </View>
      </View>
      <Text style={styles.read}>Read</Text>
      <View style={styles.createPostChild} />
      <View style={[styles.iosbottomBar5Tabs, styles.iosbottomPosition]}>
        <View style={[styles.iphoneUi, styles.iphoneUiPosition]}>
          <View style={styles.background} />
          <View style={[styles.homeIndicator, styles.homePosition]}>
            <View style={styles.homeIndicator1} />
          </View>
        </View>
        <View style={[styles.tabs, styles.tabsPosition]}>
          <View style={[styles.tabsChild, styles.tabsChildLayout1]} />
          <View style={[styles.tabsItem, styles.tabsChildLayout]} />
          <View style={[styles.tabsInner, styles.tabsChildLayout]} />
          <View style={[styles.rectangleView, styles.tabsChildLayout]} />
          <View style={[styles.tabsChild1, styles.tabsChildLayout]} />
        </View>
        <View style={[styles.topDivider, styles.iphoneUiPosition]} />
      </View>
      <Image
        style={[styles.estate43, styles.user63Layout]}
        resizeMode="cover"
        source={require("../assets/estate-4-3.png")}
      />
      <Image
        style={[styles.groupIcon, styles.user63Layout]}
        resizeMode="cover"
        source={require("../assets/group.png")}
      />
      <Image
        style={[styles.user63, styles.user63Layout]}
        resizeMode="cover"
        source={require("../assets/user-6-3.png")}
      />
      <Image
        style={[styles.addBoxIcon, styles.iconLayout1]}
        resizeMode="cover"
        source={require("../assets/add-box.png")}
      />
      <View style={[styles.iosbottomBar5Tabs1, styles.iosbottomPosition]}>
        <View style={[styles.iphoneUi, styles.iphoneUiPosition]}>
          <View style={styles.background} />
          <View style={[styles.homeIndicator2, styles.homePosition]}>
            <View style={styles.homeIndicator1} />
          </View>
        </View>
        <View style={[styles.tabs1, styles.tabsPosition]}>
          <View style={[styles.tabsChild2, styles.tabsChildLayout1]} />
          <View style={[styles.tabsChild3, styles.tabsChildLayout]} />
          <View style={[styles.tabsChild4, styles.tabsChildLayout]} />
          <View style={[styles.tabsChild5, styles.tabsChildLayout]} />
          <View style={[styles.tabsChild6, styles.tabsChildLayout]} />
        </View>
        <View style={[styles.topDivider, styles.iphoneUiPosition]} />
      </View>
      <View style={[styles.iosbottomBar5Tabs1, styles.iosbottomPosition]}>
        <View style={[styles.iphoneUi, styles.iphoneUiPosition]}>
          <View style={styles.background} />
          <View style={[styles.homeIndicator2, styles.homePosition]}>
            <View style={styles.homeIndicator1} />
          </View>
        </View>
        <View style={[styles.tabs1, styles.tabsPosition]}>
          <View style={[styles.tabsChild2, styles.tabsChildLayout1]} />
          <View style={[styles.tabsChild3, styles.tabsChildLayout]} />
          <View style={[styles.tabsChild4, styles.tabsChildLayout]} />
          <View style={[styles.tabsChild5, styles.tabsChildLayout]} />
          <View style={[styles.tabsChild6, styles.tabsChildLayout]} />
        </View>
        <View style={[styles.topDivider, styles.iphoneUiPosition]} />
      </View>
      <Image
        style={[styles.estate43, styles.user63Layout]}
        resizeMode="cover"
        source={require("../assets/estate-4-4.png")}
      />
      <Image
        style={[styles.groupIcon, styles.user63Layout]}
        resizeMode="cover"
        source={require("../assets/group.png")}
      />
      <Image
        style={[styles.user63, styles.user63Layout]}
        resizeMode="cover"
        source={require("../assets/user-6-3.png")}
      />
      <Image
        style={[styles.addBoxIcon, styles.iconLayout1]}
        resizeMode="cover"
        source={require("../assets/add-box1.png")}
      />
      <Image
        style={[styles.accountBalanceWalletIcon, styles.iconLayout1]}
        resizeMode="cover"
        source={require("../assets/account-balance-wallet.png")}
      />
      <Image
        style={[styles.accountBalanceWalletIcon, styles.iconLayout1]}
        resizeMode="cover"
        source={require("../assets/account-balance-wallet.png")}
      />
      <View style={[styles.headingBar, styles.headingBarPosition]}>
        <View style={styles.background3} />
        <Text style={styles.create}>Create</Text>
        <Image
          style={styles.leftArrowIcon}
          resizeMode="cover"
          source={require("../assets/left-arrow-icon.png")}
        />
      </View>
      <Image
        style={[styles.createPostItem, styles.iconLayout2]}
        resizeMode="cover"
        source={require("../assets/ellipse-15.png")}
      />
      <Text style={[styles.pixsellz, styles.pixsellzTypo]}>Pixsellz</Text>
      <Text style={styles.writeYourText}>Write your text here</Text>
      <Image
        style={[styles.paperclipIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/paperclip.png")}
      />
      <Image
        style={[styles.sendIcon, styles.iconLayout2]}
        resizeMode="cover"
        source={require("../assets/send.png")}
      />
      <Image
        style={[styles.photooutlineIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/photooutline1.png")}
      />
      <Image
        style={[styles.cameraoutlineIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/cameraoutline.png")}
      />
      <View style={styles.rectangleParent}>
        <View style={[styles.groupChild, styles.barsIconPosition]} />
        <Image
          style={[styles.chevronDoubleUpoutlineIcon, styles.iconLayout2]}
          resizeMode="cover"
          source={require("../assets/chevrondoubleupoutline.png")}
        />
        <Text
          style={[styles.selectCategories, styles.pixsellzTypo]}
        >{`Select Categories `}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconsFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  gTypo: {
    textAlign: "left",
    fontFamily: FontFamily.robotoRegular,
    color: Color.black,
  },
  iconLayout2: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  iosbottomPosition: {
    right: "-0.83%",
    top: "92.63%",
    height: "7.38%",
    bottom: "0%",
    position: "absolute",
  },
  iphoneUiPosition: {
    left: 0,
    right: 0,
    top: 1,
    position: "absolute",
  },
  homePosition: {
    height: 5,
    width: 134,
    left: "50%",
    bottom: 9,
    display: "none",
    position: "absolute",
  },
  tabsPosition: {
    height: 32,
    top: 15,
    left: "50%",
    display: "none",
    position: "absolute",
  },
  tabsChildLayout1: {
    width: 32,
    backgroundColor: Color.greenPrimary,
    height: 32,
    borderRadius: Border.br_81xl,
    left: "50%",
    top: 0,
    position: "absolute",
  },
  tabsChildLayout: {
    backgroundColor: Color.gray02,
    width: 32,
    height: 32,
    borderRadius: Border.br_81xl,
    left: "50%",
    top: 0,
    position: "absolute",
  },
  user63Layout: {
    width: "6.67%",
    maxHeight: "100%",
    maxWidth: "100%",
    height: "3%",
    position: "absolute",
    overflow: "hidden",
  },
  iconLayout1: {
    top: "95.13%",
    width: "7.62%",
    bottom: "1.88%",
    maxHeight: "100%",
    maxWidth: "100%",
    height: "3%",
    position: "absolute",
    overflow: "hidden",
  },
  headingBarPosition: {
    right: "0%",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  pixsellzTypo: {
    fontWeight: "600",
    fontFamily: FontFamily.robotoBold,
    textAlign: "left",
    position: "absolute",
  },
  iconLayout: {
    bottom: "10.88%",
    top: "86.13%",
    width: "6.67%",
    maxHeight: "100%",
    maxWidth: "100%",
    height: "3%",
    position: "absolute",
    overflow: "hidden",
  },
  barsIconPosition: {
    bottom: "0%",
    height: "100%",
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
  },
  hours: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.robotoRegular,
  },
  text1: {
    display: "none",
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_xs,
  },
  androidtime: {
    flexDirection: "row",
  },
  pm: {
    marginLeft: 2,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.robotoRegular,
  },
  androidbluetoothIcon: {
    width: 14,
    height: 14,
  },
  androidwifiIcon: {
    width: 17,
    height: 15,
    marginLeft: 8,
  },
  g: {
    fontSize: FontSize.size_7xs,
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  barsIcon: {
    bottom: "0%",
    height: "100%",
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
  },
  androidcellularSignal: {
    width: 18,
    height: 16,
    marginLeft: 8,
    overflow: "hidden",
  },
  outlineIcon: {
    height: "109.09%",
    width: "105.41%",
    top: "-4.55%",
    right: "-2.7%",
    bottom: "-4.55%",
    left: "-2.7%",
  },
  indicator: {
    height: "72.73%",
    width: "75.68%",
    top: "13.64%",
    right: "16.22%",
    bottom: "13.64%",
    left: "8.11%",
    borderRadius: Border.br_11xs,
    backgroundColor: Color.black,
    position: "absolute",
  },
  androidbattery: {
    width: 19,
    height: 11,
    marginLeft: 8,
  },
  icons: {
    justifyContent: "flex-end",
  },
  statusBarandroid: {
    bottom: "97%",
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_9xs,
    justifyContent: "space-between",
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
    top: "0%",
    height: "3%",
    alignItems: "center",
    backgroundColor: Color.white,
  },
  read: {
    left: "45.56%",
    fontSize: FontSize.size_xl,
    lineHeight: 16,
    fontFamily: FontFamily.robotoMedium,
    color: Color.white,
    fontWeight: "500",
    top: "94.88%",
    textAlign: "left",
    position: "absolute",
  },
  createPostChild: {
    height: "4.63%",
    width: "43.33%",
    top: "93.5%",
    right: "27.5%",
    left: "29.17%",
    borderRadius: Border.br_11xl,
    backgroundColor: Color.skyblue,
    bottom: "1.88%",
    position: "absolute",
  },
  background: {
    backgroundColor: Color.gray_100,
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
  },
  homeIndicator1: {
    marginLeft: -67,
    borderRadius: Border.br_81xl,
    height: 5,
    width: 134,
    left: "50%",
    bottom: 0,
    backgroundColor: Color.black,
    position: "absolute",
  },
  homeIndicator: {
    marginLeft: -68,
  },
  iphoneUi: {
    bottom: 1,
  },
  tabsChild: {
    marginLeft: -154,
  },
  tabsItem: {
    marginLeft: -85,
  },
  tabsInner: {
    marginLeft: -16,
  },
  rectangleView: {
    marginLeft: 53,
  },
  tabsChild1: {
    marginLeft: 122,
  },
  tabs: {
    marginLeft: -156,
    width: 308,
  },
  topDivider: {
    backgroundColor: Color.silver,
    height: 1,
  },
  iosbottomBar5Tabs: {
    left: "0.83%",
    width: "100%",
  },
  estate43: {
    top: "95%",
    right: "85.56%",
    bottom: "2%",
    left: "7.78%",
  },
  groupIcon: {
    right: "23.61%",
    bottom: "2.13%",
    left: "69.72%",
    top: "94.88%",
    width: "6.67%",
  },
  user63: {
    top: "94.75%",
    right: "5.56%",
    bottom: "2.25%",
    left: "87.78%",
  },
  addBoxIcon: {
    right: "44.6%",
    left: "47.78%",
  },
  homeIndicator2: {
    marginLeft: -67.5,
  },
  tabsChild2: {
    marginLeft: -155.5,
  },
  tabsChild3: {
    marginLeft: -85.5,
  },
  tabsChild4: {
    marginLeft: -15.5,
  },
  tabsChild5: {
    marginLeft: 53.5,
  },
  tabsChild6: {
    marginLeft: 123.5,
  },
  tabs1: {
    marginLeft: -157.5,
    width: 311,
  },
  iosbottomBar5Tabs1: {
    width: "100.83%",
    left: "0%",
  },
  accountBalanceWalletIcon: {
    right: "66.55%",
    left: "25.83%",
  },
  background3: {
    width: 414,
    height: 138,
    top: 0,
    left: 0,
    backgroundColor: Color.skyblue,
    position: "absolute",
  },
  create: {
    top: 20,
    left: 150,
    fontSize: FontSize.size_3xl,
    letterSpacing: -1,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: FontFamily.robotoBold,
    color: Color.white,
    position: "absolute",
  },
  leftArrowIcon: {
    bottom: 32,
    left: 30,
    width: 8,
    height: 14,
    position: "absolute",
  },
  headingBar: {
    height: "9%",
    top: "3.63%",
    bottom: "87.38%",
    left: "0%",
    overflow: "hidden",
  },
  createPostItem: {
    height: "10.25%",
    width: "23.61%",
    top: "25.13%",
    right: "73.06%",
    bottom: "64.63%",
    left: "3.33%",
  },
  pixsellz: {
    top: "28.88%",
    fontSize: FontSize.size_lgi,
    letterSpacing: 0,
    color: Color.gray_200,
    left: "32.78%",
  },
  writeYourText: {
    height: "27.38%",
    width: "83.89%",
    top: "38.88%",
    fontSize: FontSize.size_mid,
    letterSpacing: -0.1,
    fontFamily: FontFamily.interMedium,
    color: Color.darkgray,
    left: "5.28%",
    fontWeight: "500",
    textAlign: "left",
    position: "absolute",
  },
  paperclipIcon: {
    right: "74.17%",
    left: "19.17%",
  },
  sendIcon: {
    height: "4.24%",
    width: "9.42%",
    top: "85.5%",
    right: "9.19%",
    bottom: "10.26%",
    left: "81.39%",
  },
  photooutlineIcon: {
    right: "60.56%",
    left: "32.78%",
  },
  cameraoutlineIcon: {
    right: "88.06%",
    left: "5.28%",
  },
  groupChild: {
    borderRadius: 10,
    backgroundColor: "#f3f4f6",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    position: "absolute",
  },
  chevronDoubleUpoutlineIcon: {
    height: "54.55%",
    width: "8.33%",
    top: "30.84%",
    right: "7.29%",
    bottom: "14.61%",
    left: "84.38%",
  },
  selectCategories: {
    top: "21.75%",
    left: "4.17%",
    fontSize: 14,
    lineHeight: 24,
    color: Color.black,
    fontWeight: "600",
  },
  rectangleParent: {
    height: "5.5%",
    width: "80%",
    top: "15.38%",
    right: "10%",
    bottom: "79.13%",
    left: "10%",
    position: "absolute",
  },
  createPost: {
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.white,
  },
});

export default CreatePost;