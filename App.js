import React, {useEffect, useState} from 'react'
import {Provider} from 'react-native-paper'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {theme} from './src/core/theme'
import {auth} from './casaevents.config';






import {
    StartScreen,
    LoginScreen,
    RegisterScreen,
    ResetPasswordScreen,
    Dashboard,
    ReaderBarcode,
    Rfid,
    
    
} from './src/screens'
import Tabs from './Navigation/tabs'
import {AuthProvider} from "./src/providers/AuthContext";
import {onAuthStateChanged} from "@firebase/auth";





const Stack = createStackNavigator()

export default function App() {
    


    // Initialize Firebase

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
    }, [])

    return (
         
            
                
        
        <Provider theme={theme}>
            
            <NavigationContainer>
                <AuthProvider value={{currentUser}}>
                    {!currentUser ? (
                        
                        <Stack.Navigator
                            initialRouteName="StartScreen"
                            screenOptions={{
                                headerShown: false,
                            }}
                        >
                            
                            <Stack.Screen name="StartScreen" component={StartScreen}/>
                            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                            <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
                            <Stack.Screen
                                name="ResetPasswordScreen"
                                component={ResetPasswordScreen}
                                
                            />
                            
                            
                        </Stack.Navigator>
                    ) : (
                        <Tabs />
                    
                    )}
                          
                </AuthProvider>
            </NavigationContainer>
        </Provider>
    )
}
