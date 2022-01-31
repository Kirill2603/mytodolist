import React from "react";
import {Button, Checkbox, Grid, GridItem, Input, InputGroup, InputRightElement, Link} from "@chakra-ui/react";
import { Formik, Field, Form, FormikHelpers } from 'formik';

interface Values {
    email: string;
    password: string;
    rememberMe: boolean;
}

export const LoginForm = () => {

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <>


            <Grid justifyContent={'center'}>

                <GridItem textAlign={"center"} p={2} fontSize={"xl"}>
                    <p>To log in get registered
                        <Link color='teal.500' href={'https://social-network.samuraijs.com/'}> here
                        </Link>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </GridItem>

                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        rememberMe: false,
                    }}
                    onSubmit={(
                        values: Values,
                        {setSubmitting}: FormikHelpers<Values>
                    ) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 500);
                    }}
                >
                    <Form>
                        <GridItem p={2}>
                            <Field as={Input}
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                type="email"
                            />
                        </GridItem>
                        <GridItem p={2}>
                            <InputGroup size='md'>
                                <Field as={Input}
                                    pr='4.5rem'
                                       name="password"
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password'
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </GridItem>
                        <GridItem p={2}>
                            <Field as={Checkbox} type="checkbox" name="rememberMe">
                        Remember me</Field>

                        </GridItem>
                        <GridItem p={2}>
                            <Button type="submit" colorScheme='teal' variant='solid' w={"100%"}>
                                Login
                            </Button>
                        </GridItem>
                    </Form>
                </Formik>
            </Grid>
        </>
    )
}