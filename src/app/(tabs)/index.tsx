import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { AuthContext } from '@/contexts/Auth'
import apisos from "@/services/apisos"
import Loading from '@/components/Loading'

type Props = {}

const Home = (props: Props) => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [dataOrder, setDataOrder] = useState<any>([])

  useEffect(() => {
    const getDataOrder = async () => {
      setLoading(true);
      await apisos.get('allorder')
        .then((res) => {
          const { result } = res.data;
          setDataOrder(result);
        })
        .catch((err) => {
          console.log(err);
        }).finally(() => setLoading(false));
    };
    getDataOrder();
  }, []);

  return (
    <>
    <Loading visible={loading} />
    <View className="flex-1 items-center justify-start px-4">
      <StatusBar style="light" />
      <View className="py-8 flex-col items-center">
        <Text className="text-base text-megb-blue-primary uppercase font-medium">Bem vindo, {user?.nome}</Text>
        <Text className="text-xl text-megb-blue-secundary uppercase font-extrabold mt-3">Auxiliar para ordem de serviço</Text>
      </View>
      <View className="flex-row items-stretch gap-4 ">
        <View className="bg-megb-yellow-primary flex-1 p-3 rounded-md shadow-md shadow-gray-500 border border-white">
          <Text className="text-xl font-medium mb-2">Ordens totais</Text>
          <Text className="text-4xl font-bold text-right">{dataOrder.numorder}</Text>
        </View>
        <View className="bg-megb-blue-secundary flex-1 p-3 rounded-md shadow-md shadow-gray-500">
          <Text className="text-xl text-gray-50 font-medium mb-2">Ordens (AB)</Text>
          <Text className="text-4xl text-gray-50 font-bold text-right">{dataOrder.numabertas}</Text>
        </View>
      </View>

      <View className="flex-row items-stretch gap-4 mt-4">
        <View className="bg-megb-yellow-primary flex-1 p-3 rounded-md shadow-md shadow-gray-500 border border-white">
          <Text className="text-xl font-medium mb-2">Orçamentos (GE)</Text>
          <Text className="text-4xl font-bold text-right">{dataOrder.numgerados}</Text>
        </View>
        <View className="bg-megb-blue-secundary flex-1 p-3 rounded-md shadow-md shadow-gray-500">
          <Text className="text-xl text-gray-50 font-medium mb-2">Orçamentos (AP)</Text>
          <Text className="text-4xl text-gray-50 font-bold text-right">{dataOrder.numaprovados}</Text>
        </View>
      </View>

      <View className="flex-row items-stretch gap-4 mt-4">
        <View className="bg-megb-yellow-primary flex-1 p-3 rounded-md shadow-md shadow-gray-500 border border-white">
          <Text className="text-xl font-medium mb-2">Serv. conc. (CA)</Text>
          <Text className="text-4xl font-bold text-right">{dataOrder.numconcluidosca}</Text>
        </View>
        <View className="bg-megb-blue-secundary flex-1 p-3 rounded-md shadow-md shadow-gray-500">
          <Text className="text-xl text-gray-50 font-medium mb-2">Serv. conc. (NA)</Text>
          <Text className="text-4xl text-gray-50 font-bold text-right">{dataOrder.numconcluidoscn}</Text>
        </View>
      </View>
    </View>
    </>
  )
}

export default Home