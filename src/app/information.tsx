import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import apisos from '@/services/apisos';
import Loading from '@/components/Loading';
import { statusOrdemByValue } from '@/utils/functions';
import moment from 'moment';

const Information = () => {
    const { order, url } = useLocalSearchParams();
    const height = StatusBar.currentHeight;
    const [dataOrder, setDataOrder] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getDataOrder = async () => {
            setLoading(true);
            await apisos.get(`order/${order}`)
                .then((res) => {
                    const { result } = res.data;
                    setDataOrder(result);
                })
                .catch((err) => {
                    console.log(err);
                }).finally(() => setLoading(false))
        };
        getDataOrder();
    }, [order]);

    return (
        <>
            <Loading visible={loading} />
            <View className='flex-1 bg-gray-200' style={{ paddingTop: height }}>
                <View className='bg-megb-blue-secundary p-4'>
                    <Link asChild href={`/(tabs)/${url === 'order' ? 'order' : 'customer'}`}>
                        <Ionicons name='arrow-back' size={25} color={'#FFF0CE'} />
                    </Link>
                    <View className='py-4 flex-col items-center'>
                        <Text className='text-xl uppercase font-bold text-megb-yellow-secundary'>Informações da ordem de serviço</Text>
                        <View className='flex-row items-end'>
                            <Text className='text-2xl font-bold text-gray-50 mr-2 pb-3'>Nº</Text>
                            <Text className='text-6xl uppercase font-bold text-megb-yellow-primary mt-4'>{order}</Text>
                        </View>
                    </View>
                </View>
                {!loading &&
                    <ScrollView>
                        <View className='bg-white m-4 rounded-md border border-gray-300 p-3 flex-col gap-2'>
                            {dataOrder.map((order: any, idx: number) => (
                                <View key={idx}>
                                    <View className='flex-row'>
                                        <Text className='text-xl font-bold text-megb-blue-secundary mr-2'>Recebimento: </Text>
                                        <Text className='text-xl font-medium'>{moment(order.created_at).format("DD/MM/YYYY HH:mm")}</Text>
                                    </View>
                                    <View className='flex-row'>
                                        <Text className='text-xl font-bold text-megb-blue-secundary mr-2'>Equipamento: </Text>
                                        <Text className='text-xl font-medium'>{(order.equipamento)}</Text>
                                    </View>
                                    <View className='flex-row'>
                                        <Text className='text-xl font-bold text-megb-blue-secundary mr-2'>Modelo: </Text>
                                        <Text className='text-xl font-medium'>{(order.modelo)}</Text>
                                    </View>
                                    <View className='flex-row'>
                                        <Text className='text-xl font-bold text-megb-blue-secundary mr-2'>Status: </Text>
                                        <Text className='text-xl font-medium'>{statusOrdemByValue(order.status)}</Text>
                                    </View>
                                    <View className='flex-col'>
                                        <Text className='text-xl font-bold text-megb-blue-secundary mr-2'>Defeito: </Text>
                                        <Text className='text-xl font-medium'>{(order.defeito)}</Text>
                                    </View>
                                    <View className='flex-col'>
                                        <Text className='text-xl font-bold text-megb-blue-secundary mr-2'>Serviço executado: </Text>
                                        <Text className='text-xl font-medium'>{(order.detalhes)}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                }
            </View>
            <ExpoStatusBar style='light' backgroundColor='#0174BE' />
        </>
    )
}

export default Information