import { Formik } from "formik";
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';
import { useCallback, useState } from "react";
import apisos from "@/services/apisos";
import { Ionicons } from "@expo/vector-icons";
import ListOrder from "@/components/ListOrder";
import { StatusBar } from "expo-status-bar";
import { Link, useFocusEffect } from "expo-router";
import ordersc from "@/schemas/ordersc";
import Loading from "@/components/Loading";

const Order = () => {
  const [dataOrder, setDataOrder] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onsubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);
    await apisos.get(`order/${values.order}`)
      .then((res) => {
        setDataOrder(res.data.result);
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setLoading(false);
        resetForm();
        Keyboard.dismiss();
      });
  };

  return (
    <>
      <Loading visible={loading} />
      <View className="flex-1 flex-col items-center justify-start">
        <StatusBar style="light" />
          <View className='mt-4 flex-col items-center'>
            <Text className='text-2xl uppercase font-bold text-megb-blue-secundary'>Pesquisar uma</Text>
            <Text className='text-2xl uppercase font-bold text-megb-blue-secundary'>ordem de serviço</Text>
          </View>
        <View className="w-full">
          <View className='m-4'>
            <Formik
              validationSchema={ordersc}
              initialValues={{
                order: ""
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
                  <View className="mt-6">
                    <Text className="label-form">Ordem de serviço</Text>
                    <TextInput
                      className={`input-form `}
                      onChangeText={handleChange("order")}
                      onBlur={() => setFieldTouched("order")}
                      value={values.order}
                      keyboardType="numeric"
                    />
                    {touched && errors && (
                      <Text className="self-end pr-6 pt-1 text-base text-red-600">
                        {errors.order}
                      </Text>
                    )}
                  </View>

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

          {dataOrder &&
            <ListOrder data={dataOrder} url="order" />
          }
        </View>
      </View>
    </>

  );
}
export default Order;