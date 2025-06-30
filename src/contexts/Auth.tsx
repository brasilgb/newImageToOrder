import apisos from "@/services/apisos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { createContext, useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

interface SignInProps {
    email: string;
    password: string;
}

export const AuthContext = createContext<any>({} as any);
interface AuthProps {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProps) {
    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [clientData, setClientData] = useState<any>([]);
    const [loginError, setLoginError] = useState<string>("");

    // Armazena usuário no storage
    async function localStorage(data: any) {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }

    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('Auth_user');
            if (storageUser) {
                setUser(JSON.parse(storageUser));
            }
        }
        loadStorage();
    }, []);

    const signIn = useCallback(async ({ email, password }: SignInProps) => {
        setLoading(true);
        await apisos.post('loginuser', {
            "email": email,
            "password": password
        })
            .then((res) => {
                const { result, success } = res.data;
                if (!success) {
                    console.log('erro');
                    return;
                }

                let udata = {
                    id: result.id,
                    nome: result.name,
                };
                localStorage(udata);
                setUser(udata);
                router.replace('/(tabs)');
            })
            .catch((err) => {
                console.log(err);
                setLoginError('E-mail e/ou senha inválidos');
            }).finally(() => setLoading(false));
    }, [])

    async function signOut() {
        Alert.alert(
            'Atenção - Ação de Logout',
            'Você será desconectado, deseja continuar?',
            [
                { text: 'Sim', onPress: () => disconnect() },
                {
                    text: 'Não',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }

    async function disconnect() {
        await AsyncStorage.clear().then(() => {
            setUser(null);
        });
        router.replace('/signin');
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                loading,
                setLoading,
                showModal,
                setShowModal,
                clientData,
                setClientData,
                signIn,
                setLoginError,
                loginError,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}