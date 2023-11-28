import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { Appbar, Card, Paragraph } from 'react-native-paper';

const TermsAndConditions = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Appbar.Header style={{ backgroundColor: '#72E6FF' }}>
          <View style={styles.customBackAction}>
            <Appbar.BackAction
              onPress={() => {
                console.log('Going back');
                navigation.goBack();
              }}
            />
          </View>
          <View style={styles.appbarTitleContainer}>
            <Text style={styles.appbarTitle}>Terms & Conditions</Text>
          </View>
        </Appbar.Header>

        <Card style={styles.card}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card.Content>
            <Paragraph>
            What is CJOP?
            </Paragraph>
            <Paragraph>
            CJOP (Citizen Journalist Onlinie Platform) is a platform that enable and facilitates instantaneous news reporting as and when it happens, a platform for “breaking news” for all.
            </Paragraph>
            <Paragraph>
            CJOP enable and empower anyone to be a Citizen Journalist reporting news as and when it happens.
            </Paragraph>
            {/*<Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Paragraph>
            <Paragraph>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </Paragraph>
            <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Paragraph>*/}
          </Card.Content>
        </ScrollView>
      </Card>
    </View>

  )
}

export default TermsAndConditions

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E9EFF7',
      height: '100%'
    },
    customBackAction: {
      marginLeft: -10, 
    },
    appbarTitleContainer: {
        flex: 1,
        marginRight: 30,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    appbarTitle: {
    textAlign: 'center', 
    fontSize: 24,
    fontWeight: '500', 
    },
    card: {
        flex: 1,
        margin: 16, 
      }
  })