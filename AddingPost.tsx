import * as React from "react";
import { StyleSheet, View, Image, Text, Modal } from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const AddingPost = () => {
  return (
   <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
    <View style={styles.addingPost}>
      <View style={styles.addingPostChild} />
      <View style={[styles.bellAlertoutline, styles.iconLayout2]} />
      <View style={[styles.cardMaterialWrapper, styles.cardFlexBox]}>
        <View style={[styles.cardMaterial, styles.cardFlexBox]}>
          <View style={[styles.cardMaterial, styles.cardFlexBox]}>
            <Image
              style={styles.likeIcon}
              resizeMode="cover"
              source={require("../assets/like.png")}
            />
            <Text style={styles.text}>5,233</Text>
          </View>
          <View style={[styles.commentsParent, styles.cardFlexBox]}>
            <Image
              style={styles.likeIcon}
              resizeMode="cover"
              source={require("../assets/comments.png")}
            />
            <Text style={styles.text}>168</Text>
          </View>
          <View style={[styles.commentsParent, styles.cardFlexBox]}>
            <Image
              style={styles.likeIcon}
              resizeMode="cover"
              source={require("../assets/share.png")}
            />
            <Text style={styles.text}>5,233</Text>
          </View>
        </View>
      </View>
      <View style={styles.chevronDoubleUpsolid} />
      <View style={styles.addingPostItem} />
      <Image
        style={[styles.addingPostInner, styles.iconLayout1]}
        resizeMode="cover"
        source={require("../assets/ellipse-37.png")}
      />
      <Image
        style={[styles.vectorIcon, styles.iconLayout1]}
        resizeMode="cover"
        source={require("../assets/vector.png")}
      />
      <Text style={styles.create}>Create</Text>
      <IOSBottomBar5Tabs
        showHomeIndicator={false}
        showTabs={false}
        iOSBottomBar5TabsPosition="absolute"
        iOSBottomBar5TabsWidth="100%"
        iOSBottomBar5TabsHeight="7.38%"
        iOSBottomBar5TabsTop="92.63%"
        iOSBottomBar5TabsRight="-0.83%"
        iOSBottomBar5TabsBottom="0%"
        iOSBottomBar5TabsLeft="0.83%"
        iPhoneUIBottom={1}
        homeIndicatorMarginLeft={-68}
        tabsMarginLeft={-156}
        tabsWidth={308}
        rectangleViewMarginLeft={-154}
        rectangleViewMarginLeft1={-85}
        rectangleViewMarginLeft2={53}
        rectangleViewMarginLeft3={122}
      />
      <Image
        style={[styles.estate43, styles.iconLayout1]}
        resizeMode="cover"
        source={require("../assets/estate-4-3.png")}
      />
      <Image
        style={[styles.groupIcon, styles.iconLayout1]}
        resizeMode="cover"
        source={require("../assets/group.png")}
      />
      <Image
        style={[styles.user63, styles.iconLayout1]}
        resizeMode="cover"
        source={require("../assets/user-6-3.png")}
      />
      <Image
        style={[styles.addBoxIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/add-box.png")}
      />
      <IOSBottomBar5Tabs
        showHomeIndicator={false}
        showTabs={false}
        iOSBottomBar5TabsPosition="absolute"
        iOSBottomBar5TabsWidth="100%"
        iOSBottomBar5TabsHeight="7.38%"
        iOSBottomBar5TabsTop="92.63%"
        iOSBottomBar5TabsRight="-0.83%"
        iOSBottomBar5TabsBottom="0%"
        iOSBottomBar5TabsLeft="0.83%"
        iPhoneUIBottom={1}
        homeIndicatorMarginLeft={-68}
        tabsMarginLeft={-156}
        tabsWidth={308}
        rectangleViewMarginLeft={-154}
        rectangleViewMarginLeft1={-85}
        rectangleViewMarginLeft2={53}
        rectangleViewMarginLeft3={122}
      />
      <Image
        style={[styles.estate43, styles.iconLayout1]}
        resizeMode="cover"
        source={require("../assets/estate-4-4.png")}
      />
      <Image
        style={[styles.groupIcon, styles.iconLayout1]}
        resizeMode="cover"
        source={require("../assets/group.png")}
      />
      <Image
        style={[styles.user63, styles.iconLayout1]}
        resizeMode="cover"
        source={require("../assets/user-6-3.png")}
      />
      <Image
        style={[styles.addBoxIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/add-box1.png")}
      />
      <Image
        style={[styles.accountBalanceWalletIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/account-balance-wallet.png")}
      />
      <Image
        style={[styles.accountBalanceWalletIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/account-balance-wallet.png")}
      />
      <Image
        style={[styles.ellipseIcon, styles.iconLayout1]}
        resizeMode="cover"
        source={require("../assets/ellipse-37.png")}
      />
      <Image
        style={[styles.photooutlineIcon, styles.iconLayout1]}
        resizeMode="cover"
        source={require("../assets/photooutline.png")}
      />
      <Text style={[styles.createAPost, styles.goLiveTypo]}>Create a Post</Text>
      <Text style={[styles.goLive, styles.goLiveTypo]}>Go Live</Text>
      <Text style={[styles.createAPost, styles.goLiveTypo]}>Create a Post</Text>
    </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  iconLayout2: {
    width: "6.67%",
    height: "3%",
  },
  cardFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconLayout1: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  iconLayout: {
    bottom: "1.88%",
    top: "95.13%",
    width: "7.62%",
    maxHeight: "100%",
    maxWidth: "100%",
    height: "3%",
    position: "absolute",
    overflow: "hidden",
  },
  goLiveTypo: {
    color: Color.dimgray,
    fontWeight: "600",
    fontSize: FontSize.size_lgi,
    fontFamily: FontFamily.robotoBold,
    letterSpacing: 0,
    textAlign: "left",
    position: "absolute",
  },
  addingPostChild: {
    height: "96.38%",
    width: "100%",
    top: "3%",
    right: "0%",
    bottom: "0.63%",
    left: "0%",
    backgroundColor: Color.lightgray,
    position: "absolute",
  },
  bellAlertoutline: {
    top: "4.5%",
    right: "2.78%",
    bottom: "92.5%",
    left: "90.56%",
    position: "absolute",
    overflow: "hidden",
  },
  likeIcon: {
    width: 18,
    height: 18,
  },
  text: {
    fontSize: FontSize.regularHeadline_size,
    lineHeight: 20,
    fontFamily: FontFamily.abhayaLibreRegular,
    color: Color.black00000040,
    marginLeft: 3,
    textAlign: "left",
  },
  cardMaterial: {
    alignItems: "center",
  },
  commentsParent: {
    marginLeft: 18,
    alignItems: "center",
  },
  cardMaterialWrapper: {
    height: "4.13%",
    width: "70.83%",
    top: "66.5%",
    right: "14.72%",
    bottom: "29.38%",
    left: "14.44%",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    overflow: "hidden",
  },
  chevronDoubleUpsolid: {
    height: "2.63%",
    width: "6.11%",
    top: "61.69%",
    right: "56.11%",
    bottom: "35.69%",
    left: "37.78%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    overflow: "hidden",
  },
  addingPostItem: {
    height: "31.5%",
    width: "99.72%",
    top: "63.88%",
    right: "-0.56%",
    bottom: "4.63%",
    left: "0.83%",
    borderRadius: 25,
    backgroundColor: Color.white,
    position: "absolute",
  },
  addingPostInner: {
    top: "81.88%",
    bottom: "12.38%",
    left: "15.28%",
    right: "71.11%",
    width: "13.61%",
    height: "5.75%",
    maxWidth: "100%",
  },
  vectorIcon: {
    height: "2.44%",
    width: "5.42%",
    top: "83.5%",
    right: "75.14%",
    bottom: "14.06%",
    left: "19.44%",
  },
  create: {
    height: "3.88%",
    width: "57.22%",
    top: "65.38%",
    left: "21.39%",
    fontSize: FontSize.size_5xl,
    lineHeight: 18,
    fontWeight: "700",
    color: Color.black,
    textAlign: "center",
    fontFamily: FontFamily.robotoBold,
    letterSpacing: 0,
    position: "absolute",
  },
  estate43: {
    top: "95%",
    right: "85.56%",
    bottom: "2%",
    left: "7.78%",
    width: "6.67%",
    height: "3%",
  },
  groupIcon: {
    top: "94.88%",
    right: "23.61%",
    bottom: "2.13%",
    left: "69.72%",
    width: "6.67%",
    height: "3%",
  },
  user63: {
    top: "94.75%",
    right: "5.56%",
    bottom: "2.25%",
    left: "87.78%",
    width: "6.67%",
    height: "3%",
  },
  addBoxIcon: {
    right: "44.6%",
    left: "47.78%",
  },
  accountBalanceWalletIcon: {
    right: "66.55%",
    left: "25.83%",
  },
  ellipseIcon: {
    top: "72.38%",
    bottom: "21.88%",
    left: "15.28%",
    right: "71.11%",
    width: "13.61%",
    height: "5.75%",
    maxWidth: "100%",
  },
  photooutlineIcon: {
    right: "74.72%",
    bottom: "23.13%",
    left: "18.61%",
    top: "73.88%",
    width: "6.67%",
    height: "3%",
  },
  createAPost: {
    left: "35%",
    top: "73.88%",
  },
  goLive: {
    top: "83.25%",
    left: "35.56%",
  },
  addingPost: {
    backgroundColor: "#e9eff7",
    width: 360,
    height: 800,
    overflow: "hidden",
  },
});

export default AddingPost;