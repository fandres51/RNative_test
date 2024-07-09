import React from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    id: Yup.string()
        .required('Campo requerido')
        .min(3, 'Mínimo 3 caracteres')
        .max(10, 'Máximo 10 caracteres'),
    name: Yup.string()
        .required('Campo requerido')
        .min(5, 'Mínimo 5 caracteres')
        .max(100, 'Máximo 100 caracteres'),
    description: Yup.string()
        .required('Campo requerido')
        .min(10, 'Mínimo 10 caracteres')
        .max(200, 'Máximo 200 caracteres'),
    logo: Yup.string()
        .required('Campo requerido'),
    date_release: Yup.date()
        .required('Campo requerido'),
    date_revision: Yup.date()

});

export default function Form(props: any) {

    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false)

    const oneYearLater = new Date(date);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    return (
        <View>
            <Formik
                initialValues={{ 
                    id: props.id? props.id : '', 
                    name: props.name? props.name : '', 
                    description: props.description? props.description : '', 
                    logo: props.logo? props.logo : '', 
                    date_release: props.date_release? props.date_release : date.toISOString().split('T')[0], 
                    date_revision: props.date_revision? props.date_revision : oneYearLater.toISOString().split('T')[0]
                 }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    props.sendData(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, handleReset, setFieldValue }) => (
                    <View style={styles.container}>
                        <Text style={styles.label}>ID</Text>
                        <TextInput
                            onChangeText={handleChange('id')}
                            onBlur={handleBlur('id')}
                            value={values.id}
                            editable={props.id? false : true}
                            style={[
                                styles.input,
                                (errors.id && touched.id) ? styles.errorInput : null
                            ]}
                        ></TextInput>
                        {errors.id && touched.id && <Text style={styles.error}>{String(errors.id)}</Text>}
                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            style={[
                                styles.input,
                                (errors.name && touched.name) ? styles.errorInput : null
                            ]}
                        ></TextInput>
                        {errors.name && touched.name && <Text style={styles.error}>{String(errors.name)}</Text>}
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            onChangeText={handleChange('description')}
                            onBlur={handleBlur('description')}
                            value={values.description}
                            style={[
                                styles.input,
                                (errors.description && touched.description) ? styles.errorInput : null
                            ]}
                        ></TextInput>
                        {errors.description && touched.description && <Text style={styles.error}>{String(errors.description)}</Text>}
                        <Text style={styles.label}>Logo</Text>
                        <TextInput
                            onChangeText={handleChange('logo')}
                            onBlur={handleBlur('logo')}
                            value={values.logo}
                            style={[
                                styles.input,
                                (errors.logo && touched.logo) ? styles.errorInput : null
                            ]}
                        ></TextInput>
                        {errors.logo && touched.logo && <Text style={styles.error}>{String(errors.logo)}</Text>}
                        <Text style={styles.label}>Fecha Liberación</Text>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <TextInput
                                onFocus={() => {
                                    Keyboard.dismiss();
                                    setOpen(true);
                                }}
                                onChangeText={handleChange('date_release')}
                                onBlur={handleBlur('date_release')}
                                value={values.date_release}
                                style={[
                                    styles.input,
                                    (errors.date_release && touched.date_release) ? styles.errorInput : null
                                ]}
                            ></TextInput>
                        </TouchableWithoutFeedback>
                        {errors.date_release && touched.date_release && <Text style={styles.error}>{String(errors.date_release)}</Text>}
                        <Text style={styles.label}>Fecha Revisión</Text>
                        <TextInput
                            onChangeText={handleChange('date_revision')}
                            onBlur={handleBlur('date_revision')}
                            value={values.date_revision}
                            editable={false}
                            style={[
                                styles.input,
                                (errors.date_revision && touched.date_revision) ? styles.errorInput : null
                            ]}
                        ></TextInput>
                        {errors.date_revision && touched.date_revision && <Text style={styles.error}>{String(errors.date_revision)}</Text>}
                        <TouchableOpacity style={[styles.btn, { backgroundColor: '#ffdd00' }]} onPress={() => handleSubmit()} >
                            <Text>Enviar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, { backgroundColor: '#e9ecf3', marginBottom: 32 }]} onPress={() => handleReset()} >
                            <Text>Reiniciar</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={open}
                            mode="date"
                            minimumDate={new Date()}
                            onConfirm={(date) => {
                                setOpen(false);
                                setDate(date);
                                const formattedDate = date.toISOString().split('T')[0];
                                setFieldValue('date_release', formattedDate);

                                const oneYearLater = new Date(date);
                                oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
                                const formattedRevisionDate = oneYearLater.toISOString().split('T')[0];
                                setFieldValue('date_revision', formattedRevisionDate);
                            }}
                            onCancel={() => {
                                setOpen(false);
                            }}
                        />
                    </View>
                )}
            </Formik>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
    },
    input: {
        borderColor: '#bfbfbf',
        borderWidth: 1,
        padding: 12,
        marginVertical: 8,
        borderRadius: 8,
    },
    error: {
        color: 'red',
    },
    errorInput: {
        borderColor: 'red',
    },
    btn: {
        width: '100%',
        padding: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        borderRadius: 8
    }
});