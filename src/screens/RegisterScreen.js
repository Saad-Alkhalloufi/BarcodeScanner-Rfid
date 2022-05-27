import React, {useState} from 'react'
import {View, StyleSheet, TouchableOpacity,ScrollView,KeyboardAvoidingView} from 'react-native'
import {Text} from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import {theme} from '../core/theme'
import {emailValidator} from '../helpers/emailValidator'
import {passwordValidator} from '../helpers/passwordValidator'
import {nameValidator} from '../helpers/nameValidator'
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../casaevents.config";



export default function RegisterScreen({navigation}) {
    const [name, setName] = useState({value: '', error: ''})
    const [email, setEmail] = useState({value: '', error: ''})
    const [password, setPassword] = useState({value: '', error: ''})

    const onSignUpPressed = () => {
        const nameError = nameValidator(name.value)
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError || nameError) {
            setName({...name, error: nameError})
            setEmail({...email, error: emailError})
            setPassword({...password, error: passwordError})
            return
        }

        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                // ..
            });
        
    }


    return (
        <KeyboardAvoidingView   style={styles.container}
        enabled behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
         <ScrollView contentContainerStyle={{flexGrow: 1}}
  keyboardShouldPersistTaps='handled'>
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <Logo/>
            <Header>Create Account</Header>
            <TextInput
                label="Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({value: text, error: ''})}
                error={!!name.error}
                errorText={name.error}
            />
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({value: text, error: ''})}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({value: text, error: ''})}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <Button 
                mode="contained"
                
                    icon="login"
                      
                      
                
                  
                  
                onPress={onSignUpPressed}
                style={{marginTop: 24}}
            >
                Sign In
            </Button>


            <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </Background>
        </ScrollView>
        </KeyboardAvoidingView>
        
        
    )
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    container:{

        flex: 1,
        
    }
})
