import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";
Yup.setLocale(ptForm);

export default Yup.object().shape({
    email: Yup.string().required("Digite o e-mail"),
    password: Yup.string().required("Digite a senha")
});