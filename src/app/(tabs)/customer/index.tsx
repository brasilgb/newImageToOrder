import { Formik } from "formik";
import { Keyboard, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useCallback, useContext, useState } from "react";
import apisos from "@/services/apisos";
import ListOrder from "@/components/ListOrder";
import { StatusBar } from "expo-status-bar";
import Loading from "@/components/Loading";
import clientesc from "@/schemas/clientesc";
import ListCustomer from "@/components/ListCustomer";
import { AuthContext } from "@/contexts/Auth";
import { } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";

const Customer = () => {
  const { showModal, setShowModal, clientData, setClientData } = useContext(AuthContext);
  const [dataOrder, setDataOrder] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setClientData([]);
    }, []));

  const onsubmit = async ({ resetForm }: any) => {
    setLoading(true);
    await apisos.get(`ordercli/${clientData.id}`)
      .then((res) => {
        setDataOrder(res.data.result);
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setLoading(false);
        Keyboard.dismiss();
      });
  };

  return (
    <>
      <ListCustomer visible={showModal} />
      <Loading visible={loading} />
      <View className="flex-col items-center justify-start">
        <StatusBar style="light" />
        <View className='mt-4 flex-col items-center'>
          <Text className='text-2xl uppercase font-bold text-megb-blue-secundary'>Pesquisar ordens</Text>
          <Text className='text-2xl uppercase font-bold text-megb-blue-secundary'>por cliente</Text>
        </View>
        <View className="w-full">
          <View className='m-4'>
            <Formik
              validationSchema={clientesc}
              initialValues={{
                nome: ""
              }}
              onSubmit={onsubmit}
            >
              {({
                handleChange,
                handleSubmit,
                setFieldTouched,
                touched,
                values,
                errors,
                isValid,
              }) => (
                <View>
                  <Pressable onPress={() => setShowModal(true)}>
                    <View pointerEvents="none" className="mt-6">
                      <Text className="label-form">Cliente</Text>
                      <TextInput
                        className={`input-form `}
                        onChangeText={handleChange("nome")}
                        onBlur={() => setFieldTouched("nome")}
                        value={values.nome = clientData.nome}
                        keyboardType="default"
                      />
                      {touched && errors && (
                        <Text className="self-end pr-6 pt-1 text-base text-red-600">
                          {errors.nome}
                        </Text>
                      )}
                    </View>
                  </Pressable>

                  <View className="flex-row items-center justify-end">
                    <Pressable
                      className={`${!isValid ? "bg-gray-200" : "bg-megb-yellow-primary"} px-8 py-3 rounded-full shadow-md shadow-gray-700`}
                      onPress={handleSubmit as any}
                    >
                      <Text
                        className={`text-xl font-bold ${!isValid ? "text-gray-300" : "text-megb-blue-primary"
                          }`}
                      >
                        Pesquisar
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </Formik>
          </View>
          <ScrollView className='h-96'>
            {dataOrder &&
              <ListOrder data={dataOrder} url="customer" />
            }
          </ScrollView>

        </View>
      </View>
    </>
  );
}
export default Customer;