import * as React from 'react'
import styled from 'styled-components'
import { View, Text, TouchableOpacity } from 'react-native'
import { Button, colors, Header, Input } from 'react-native-elements'
import { Page, Heading } from '../components/utils'
import { getToken, sendPushNotification, Token } from '../services/api'

const ButtonContainer = styled(View)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Buggybutton = styled(TouchableOpacity) <{ color?: string }>`
    background-color: ${p => p.color || '#d87081'};
    flex: 48% 0 0;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 10px;
    display: flex;
    height: 150px;
    align-items: center;
    justify-content: center;
    color: white;
`

const SummonButtonText = styled(Text)`
    color: #ffffff;
    font-size: 13px;
`

//const token = 'ExponentPushToken[rBU9UGA4XqVzQhftpSNCqI]';

const OtherScreen: React.FC = () => {
    const [tokenInput, setTokenInput] = React.useState('');
    const [token, setToken] = React.useState<Token | undefined>()

    return (
        <View>
            <Header centerComponent={{ text: 'For me 😋', style: { color: '#fff' } }} />
            <Page>
                {token ?
                    (<View>
                        <Heading>Your number is {token.id} </Heading>
                        <Heading>Able to summon the bear! 🎉</Heading>
                    </View>)
                    :
                    (<View>
                        <Input
                            label="Bear's id"
                            value={tokenInput}
                            onChangeText={setTokenInput}
                            placeholder="Enter the other person's id here"
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                        />
                        <Button title="Verify"
                            onPress={async () => {
                                const storedToken = await getToken(tokenInput)
                                setToken(storedToken)
                            }}
                        />
                    </View>)}


                {token && <View style={{ marginTop: 30 }}>
                    <Heading>🐻 Summoning the bear! 🐻 </Heading>
                    <ButtonContainer>
                        <Buggybutton
                            color="#25aaa3"
                            onPress={() => sendPushNotification(token.token, '😊 Are you ready?', 'Starbound time now!')}>
                            <SummonButtonText>🎠 Reilly, Starbounds!!</SummonButtonText>
                        </Buggybutton>
                        <Buggybutton
                            color="#13a031"
                            onPress={() => sendPushNotification(token.token, '🍳  I am starvingg ', 'Go eat now?')}>
                            <SummonButtonText>🍳 I am hungee..</SummonButtonText>
                        </Buggybutton>
                        <Buggybutton
                            color="#d34931"
                            onPress={() => sendPushNotification(token.token, '🚶‍♀️ Relaxing time', ' Let\'\s walk')}>
                            <SummonButtonText>🚶‍♀️ Wanna walk?</SummonButtonText>
                        </Buggybutton>
                        <Buggybutton
                            color="#253daa"
                            onPress={() => sendPushNotification(token.token, '🚴‍♂️ No more sitting', 'Exercise time starts')}>
                            <SummonButtonText>🚴‍♂️ Exercise time</SummonButtonText>
                        </Buggybutton>
                    </ButtonContainer>
                </View>}

            </Page>
        </View>
    )
}

export default OtherScreen