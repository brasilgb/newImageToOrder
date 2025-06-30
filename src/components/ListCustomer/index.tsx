import { View, Text, Modal, TextInput, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import apisos from '@/services/apisos';
import { FlashList } from "@shopify/flash-list";
import { AuthContext } from '@/contexts/Auth';

interface CustomerProps {
    visible: boolean;
}

const ListCustomer = ({ visible }: CustomerProps) => {
    const { clientData, setClientData, setShowModal } = useContext(AuthContext);
    const [filterSearch, setFilterSearch] = useState<any>([]);
    const [customerOrder, setCustomerOrder] = useState<any>([]);
    const [customerValue, setCustomerValue] = useState<string>("");

    useEffect(() => {
        const getCustomerOrder = async () => {
            await apisos.get('clientes')
                .then((res) => {
                    const { result } = res.data;
                    setCustomerOrder(result);
                    setFilterSearch(result);

                })
        };
        getCustomerOrder();
    }, []);

    const handleClientId = (data: any) => {
        setClientData(data);
        setShowModal(false);
    }

    const renderItem = ({ item }: any) => (
        <Pressable key={item.id} className='py-1'
            onPress={() => handleClientId({ "nome": item.nome, "id": item.id })}
        >
            <Text className='text-lg'>{item.nome}</Text>
        </Pressable>
    );

    const handleSearch = (value: any) => {
        const client = value.toLowerCase();
        const result = customerOrder.filter((cl: any) => (cl.nome.toLowerCase().includes(client)));
        setFilterSearch(result);
    };

    useEffect(() => {
        const filter = customerOrder.cliente;
        if (filter === "") {
            setFilterSearch([]);
        }
    }, [customerOrder]);

    return (
        <Modal transparent visible={visible} statusBarTranslucent animationType="fade">
            <View className='flex-1 bg-[#00000077]'>
                <View className='flex-1 bg-gray-100 m-10 rounded-md shadow-lg shadow-gray-800 p-2'>
                    <View>
                        <TextInput
                            className='py-2 px-8 rounded-lg text-lg bg-white  border border-gray-200 placeholder:text-slate-400 shadow-md shadow-slate-500'
                            onChangeText={e => handleSearch(e)}
                            placeholder='Digite o nome'
                        />
                    </View>
                    <View className='flex-1'>
                        <FlashList
                            data={filterSearch}
                            renderItem={renderItem}
                            estimatedItemSize={50}
                            keyboardShouldPersistTaps={'always'}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ListCustomer