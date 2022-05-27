import React, {useState} from 'react'
import {TouchableOpacity, StyleSheet,Platform, View,KeyboardAvoidingView,ScrollView} from 'react-native'
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
import {signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "../../casaevents.config";


export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState({value: '', error: ''})
    const [password, setPassword] = useState({value: '', error: ''})

    const onLoginPressed = () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({...email, error: emailError})
            setPassword({...password, error: passwordError})
            return
        }

        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((res) => {
                console.log(res)
                console.log('User logged-in successfully!')
                
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
            <Header>Welcome back.</Header>
            
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
            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPasswordScreen')}
                >
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <Button mode="contained" icon='login' onPress={onLoginPressed}>
                Login
            </Button>
            <View style={styles.row}>
                <Text>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
            
        </Background>
        </ScrollView>
        </KeyboardAvoidingView>
        
    )
}

const styles = StyleSheet.create({
    
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
        
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
        
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
        
    },
    container:{

        flex: 1,
        
    }
})
