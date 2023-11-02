import React, { useState } from 'react';
import Swal from 'sweetalert2';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resetData = {
            email: email,
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/login/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resetData),
            });

            if (response.ok) {
                Swal.fire('Password reset email sent successfully.');
            } else {
                Swal.fire('Error sending reset email.');
            }
        } catch (error) {
            console.error('Error sending reset email:', error);
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group mb-2'>
                    <label htmlFor='email' className='form-label text-center'>
                        <h5>Email:</h5>
                    </label>
                    <input
                        type='email'
                        placeholder='Enter your email'
                        className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group mb-2'>
                    <button className='btn btn-success' type='submit'>
                        Send Reset Email
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;
