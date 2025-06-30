import { View, Text, ActivityIndicator, Modal } from 'react-native'
import React from 'react'

interface LoadingProps {
    visible: boolean;
}

const Loading = (props: LoadingProps) => {
    return (
        <Modal transparent visible={props.visible}>
            <View className="flex-1 items-center justify-center">
            <ActivityIndicator
                size="large"
                color={'#0d3b85'}
                animating={true}
            />
        </View>
        </Modal>
    )
}

export default Loading