import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { signIn } from '../../services/authService'
import { UserContext } from '../../contexts/UserContext'
import { Form, Button, Card, Container, Stack } from 'react-bootstrap';

const SignInForm = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const handleChange = (evt) => {
        setMessage('')
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const signedInUser = await signIn(formData)
            setUser(signedInUser)
            navigate('/')
        } catch (err) {
            setMessage(err.message)
        }
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
            <Card style={{ maxWidth: "400px", width: "100%", padding: "20px", borderRadius: "15px" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign In:</h2>
                        <Form onSubmit={handleSubmit}>
                            
                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name='username'
                                    placeholder="Enter username" 
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    name='password'
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                    <Stack direction='vertical' gap={2} className='mt-4'>
                        <Button
                            type='submit'
                            className='w-100 mt-3'
                            style={{ backgroundColor: "#33AA5E", border: "none", padding: "10px", fontWeight: "600" }}
                            >
                            Sign In
                        </Button>
                        <Button
                            type='button'
                            variant='outline-secondary'
                            className='w-100'
                            onClick={() => navigate('/')}
                            >
                            Cancel
                        </Button>
                    </Stack>

                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SignInForm;
