import * as React from 'react'
import * as Notifications from 'expo-notifications';
import { View } from 'react-native'
import { Header, Button } from 'react-native-elements'
import { Page, Heading } from '../components/utils'
import { submitToken, Token } from '../services/api';

async function getNotificationToken() {
    const { status } = await Notifications.getPermissionsAsync()
    if (status != 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        if (status != 'granted') {
            alert('Failed to get notifications token')
            return
        }
    }

    const tokenData = await Notifications.getExpoPushTokenAsync()
    const token = tokenData.data;
    console.log({ token });
    return token;
}

const MyScreen: React.FC = () => {
    const [token, setToken] = React.useState<Token | undefined>()

    return (
        <View>
            <Header centerComponent={{ text: 'For you 😎', style: { color: '#fff' } }} />
            <Page>
                <Heading>{token ? `Your number is ${token.id}` : `You don't have number, click to get one!`} </Heading>
                <Button title="Click to get your number"
                    onPress={async () => {
                        const token = await getNotificationToken()
                        if (token) {
                            const storedToken = await submitToken(token)
                            setToken(storedToken)
                        }
                    }} />
            </Page>
        </View>
    )
}

export default MyScreen