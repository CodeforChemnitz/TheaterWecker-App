import React, { Component } from 'react'
import { ScrollView, View, Text, Image } from 'react-native';
import styles from '../styles'
import Form from '../components/Form'
import Footer from '../components/Footer'
import Header from '../components/Header'
import api from '../lib/api'


export default class Main extends Component {
  constructor(props) {
    super(props)
  }
  openCodeForChemnitz() {
      console.log("CodeForChemnitz clicked")
  }
  openEmojiOne() {
      console.log("EmojiOne clicked")
  }
  openKulturticket() {
      console.log("Kulturticket clicked")
  }

  render() {
    return (
        <ScrollView style={styles.body}>
            <Header/>
            <View style={styles.card}>
                <View style={styles.p}>
                    <Text style={[styles.baseText, styles.center]}>
                        <Text>Wusstest du, dass du als Chemnitzer Student mit deinem </Text>
                        <Text style={styles.bold}>Studentenausweis</Text> 
                        <Text> 15 Minuten vor Beginn einer Theatervorstellung </Text>
                        <Text style={styles.bold}>kostenlos</Text>
                        <Text> rein kommst, wenn noch Tickets vorhanden sind? </Text>
                        <Text style={styles.cite}>*</Text>
                    </Text>
                </View>
                <View style={styles.p}>
                    <Text style={styles.center}>Lass dich einfach von uns benachrichtigen, wenn kurz vor der Veranstaltung noch Tickets frei sind.</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Form/>
            </View>

            <Footer/>
        </ScrollView>
    )
  }
}
