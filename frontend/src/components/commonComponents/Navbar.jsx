import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal, Input, Button, Select, message } from "antd";
import { setUser } from "../../redux/UserRedux";
import { loginData, signUpData } from "../../apiCalls/UserCalls";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [signIn, setSignIn] = useState(false);
    const [signUP, setSignUp] = useState(false);



    async function handleFinishSignIn(data) {
        try {
            const res = await loginData(data);
            if (res.name !== undefined) {
                localStorage.setItem('user', JSON.stringify(res))
                dispatch(setUser(res));
                setSignIn(false);
                message.success('LoggedIn Success')
            }
            if (res.role == 'user') {   navigate('/home') }
            else if (res.role == 'doctor') {navigate(`/doctorControls/${res.id}`)}
            else {navigate('/mainadminPage')  }
            console.log(res.role)
        }
        catch (err) {
            message.error("Check Details")
        }
    }

    async function handleFinishSignUp(data) {
        try {
            const res = await signUpData(data);
            setSignUp(false)
            setSignIn(true)
            message.success('SignUp Successful')
            message.info('redirected to signIn')

        }
        catch (err) {
            message.error("User Already Exists")
        }

    }

    function removeuser() {
        dispatch(setUser(null));
        localStorage.removeItem('user');
        message.success('SignOut Successful')
        navigate('/')
    }




    return <section className="h-[13vh] w-[100vw] bg-white flex justify-between px-[3vw] items-center">
        
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwf079S6b6pl0JnwsBINexxt8Kef7ujz0CsVbqB0fGhxxQbcnJ1h_MauB1zyD8mlmSUQU&usqp=CAU" alt="Icon" className="w-[5rem] h-[13vh] bg-green-500" onClick={()=>navigate('/')}/>
        {
            !currentUser?.name ?

                <button className='p-[0.3rem] bg-blue-500 rounded-md w-[7rem] h-[8vh]' onClick={() => { setSignIn(true) }}>SignIn</button> :
                <section className="flex gap-[1rem]"> <p className="underline font-bold" onClick={() => { navigate('/mainadminPage') }}>Hello , {currentUser.name}</p>
                    <Button onClick={() => { removeuser() }}>logout</Button>
                </section>

        }

        <Modal title="Sign Up"
            open={signUP}
            onCancel={() => setSignUp(false)}
            footer={null}
            centered>
            <Form
                layout="vertical"
                onFinish={handleFinishSignUp}>

                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input placeholder="Enter your name" type="text" />
                </Form.Item>

                <Form.Item label="Email" name="email" rules={[{ required: true }]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password" rules={[{ required: true }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item label="I am a" name="role" rules={[{ required: true, message: "Select One" }]}>
                    <Select placeholder="Select Role">
                        <Option value="user">user</Option>
                        <Option value="doctor">Doctor</Option>
                    </Select>
                </Form.Item>

                <Button type="primary" htmlType="submit" >
                    Sign Up
                </Button>

                <p> Already Have Account? <span onClick={() => { setSignUp(false); setSignIn(true) }}> Sign In</span></p>
            </Form>
        </Modal>

        <Modal title="Sign In"
            open={signIn}
            onCancel={() => setSignIn(false)}
            footer={null}>
            <Form
                layout="vertical"
                onFinish={handleFinishSignIn}>
                <Form.Item label="Email" name="email"
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Button type="primary" htmlType="submit" >
                    Sign In
                </Button>
                <p>New User ? <span onClick={() => { setSignIn(false); setSignUp(true) }}>Create Account</span></p>
            </Form>
        </Modal>

    </section>

}